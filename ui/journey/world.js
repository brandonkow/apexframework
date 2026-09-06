import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { LEVELS } from "../../public/journey/levels.js";

export async function createWorld({ selectLevel, notify, reducedMotion }) {
  const canvas = document.querySelector("#worldCanvas");
  const wrap = document.querySelector("#worldWrap");
  const loading = document.querySelector("#worldLoading");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    loading.hidden = true;
    canvas.hidden = true;
    document.body.classList.add("flat-view");
    document.querySelector("#worldHint").textContent = "Illustrated view. All levels work below.";
    return { focus() {}, update() {}, pause() {}, overview() {}, flat() {}, dispose() {} };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1.4 : 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  room.dispose();
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 150);
  const homeTarget = new THREE.Vector3(1.7, 0.4, 1.8);
  const homeOffset = new THREE.Vector3(13, 18, 21);
  camera.position.copy(homeTarget).add(homeOffset);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(homeTarget);
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.065;
  controls.minDistance = 10;
  controls.maxDistance = 62;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.18;
  controls.enablePan = false;
  controls.rotateSpeed = 0.45;
  controls.zoomSpeed = 0.7;
  scene.add(new THREE.HemisphereLight(0xd5eee4, 0x264444, 1.5));
  const sun = new THREE.DirectionalLight(0xffddb0, 2.5);
  sun.position.set(4, 12, -8);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x9be3c5, 1.3);
  fill.position.set(-8, 8, 5);
  scene.add(fill);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 64;
  const context = shadowCanvas.getContext("2d");
  const gradient = context.createRadialGradient(32, 32, 3, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0,0,0,0.65)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient; context.fillRect(0, 0, 64, 64);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  for (const level of LEVELS) {
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(level.position[0], -1.2, level.position[2]);
    scene.add(shadow);
  }

  const selection = new THREE.Mesh(new THREE.RingGeometry(2.05, 2.10, 80), new THREE.MeshBasicMaterial({ color: 0xa4dec4, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
  selection.rotation.x = -Math.PI / 2;
  selection.position.set(...LEVELS[0].position);
  selection.position.y += 0.1;
  scene.add(selection);
  const markers = LEVELS.map((level, i) => {
    const marker = document.createElement("span");
    marker.className = "world-marker";
    marker.textContent = String(i + 1).padStart(2, "0");
    document.querySelector("#worldMarkers").append(marker);
    return marker;
  });
  const hits = LEVELS.map((level, i) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 3.7, 16), new THREE.MeshBasicMaterial({ visible: false }));
    mesh.position.set(...level.position);
    mesh.position.y += 1.5;
    mesh.userData.level = i;
    scene.add(mesh);
    return mesh;
  });
  let world, mixer, traveling, selected = 0, paused = reducedMotion, flat = false, pointerStart, dragging = false;
  let last = 0;
  let lastRendered = 0;
  let needsRender = true;
  let disposed = false;
  const target = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const resize = () => {
    const { width, height } = wrap.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    needsRender = true;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(wrap);
  resize();
  controls.addEventListener("start", () => { traveling = null; });
  controls.addEventListener("change", () => { needsRender = true; });
  canvas.addEventListener("pointerdown", event => { pointerStart = [event.clientX, event.clientY]; dragging = false; });
  canvas.addEventListener("pointermove", event => {
    if (pointerStart && Math.hypot(event.clientX - pointerStart[0], event.clientY - pointerStart[1]) > 6) dragging = true;
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    canvas.style.cursor = raycaster.intersectObjects(hits)[0] ? "pointer" : "grab";
  });
  canvas.addEventListener("pointerup", event => {
    if (!pointerStart || dragging) { pointerStart = null; return; }
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(hits)[0];
    if (hit) selectLevel(hit.object.userData.level);
    pointerStart = null;
  });
  canvas.addEventListener("keydown", event => {
    const offset = camera.position.clone().sub(controls.target);
    if (["ArrowLeft", "ArrowRight"].includes(event.key)) offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), event.key === "ArrowLeft" ? -0.13 : 0.13);
    else if (["+", "=", "ArrowUp"].includes(event.key)) offset.multiplyScalar(0.9);
    else if (["-", "ArrowDown"].includes(event.key)) offset.multiplyScalar(1.1);
    else return;
    event.preventDefault();
    traveling = null;
    offset.clampLength(10, 62);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  });
  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    wrap.classList.remove("world-ready");
    loading.hidden = true;
    flat = true;
    renderer.setAnimationLoop(null);
    notify("The 3D view paused. Your checkpoint forms and progress are still available.");
  });
  function travel(destination, offset) {
    needsRender = true;
    if (paused) { controls.target.copy(destination); camera.position.copy(destination).add(offset); controls.update(); return; }
    traveling = { from: controls.target.clone(), to: destination, fromCamera: camera.position.clone(), toCamera: destination.clone().add(offset), start: performance.now() };
  }
  function render(now) {
    if (disposed) return;
    if (paused && !needsRender && !traveling) return;
    if (now - lastRendered < 1000 / (paused ? 15 : 30)) return;
    lastRendered = now;
    const delta = Math.min((now - last) / 1000 || 0, 0.05);
    last = now;
    if (document.hidden || flat) return;
    if (!paused && mixer) mixer.update(delta);
    if (traveling) {
      const t = Math.min((now - traveling.start) / 1150, 1);
      const ease = t * t * (3 - 2 * t);
      controls.target.lerpVectors(traveling.from, traveling.to, ease);
      camera.position.lerpVectors(traveling.fromCamera, traveling.toCamera, ease);
      if (t === 1) traveling = null;
    }
    if (!paused) selection.material.opacity = 0.7 + Math.sin(now / 750) * 0.18;
    controls.update();
    LEVELS.forEach((level, i) => {
      target.set(...level.position).add(new THREE.Vector3(0, 0.2, 1.6)).project(camera);
      markers[i].style.left = `${(target.x / 2 + 0.5) * canvas.clientWidth}px`;
      markers[i].style.top = `${(-target.y / 2 + 0.5) * canvas.clientHeight}px`;
      markers[i].hidden = target.z > 1;
    });
    renderer.render(scene, camera);
    needsRender = false;
  }
  renderer.setAnimationLoop(render);
  try {
    const model = await new GLTFLoader().loadAsync("/journey/assets/apex-world.glb");
    world = model.scene;
    needsRender = true;
    scene.add(world);
    mixer = new THREE.AnimationMixer(world);
    model.animations.forEach(clip => mixer.clipAction(clip).play());
    wrap.classList.add("world-ready");
    wrap.dataset.meshes = String(model.scene.getObjectsByProperty("isMesh", true).length);
    loading.hidden = true;
  } catch {
    loading.hidden = true;
    canvas.hidden = true;
    markers.forEach(marker => marker.hidden = true);
    flat = true;
    notify("Using the illustrated map while the 3D asset is unavailable. All levels still work.");
  }
  return {
    focus(index, close = false) {
      selected = index;
      selection.position.set(...LEVELS[index].position).y += 0.12;
      markers.forEach((marker, i) => { marker.dataset.active = String(i === index); });
      const levelTarget = new THREE.Vector3(...LEVELS[index].position);
      travel(close ? levelTarget.add(new THREE.Vector3(1, 1, 0)) : homeTarget.clone(), close ? homeOffset.clone().multiplyScalar(0.53) : homeOffset.clone());
    },
    update(levels) {
      needsRender = true;
      markers.forEach((marker, i) => { marker.dataset.locked = String(levels?.[i]?.status === "locked"); marker.dataset.active = String(i === selected); });
    },
    pause(value) { paused = value; needsRender = true; controls.enableDamping = !value; if (traveling) { controls.target.copy(traveling.to); camera.position.copy(traveling.toCamera); traveling = null; } },
    overview() { travel(homeTarget.clone(), homeOffset.clone()); },
    flat(value) { flat = value; needsRender = true; wrap.classList.toggle("world-ready", !value && Boolean(world)); canvas.hidden = value; },
    dispose() { disposed = true; observer.disconnect(); controls.dispose(); renderer.setAnimationLoop(null); scene.traverse(object => { object.geometry?.dispose(); if (object.material) for (const mat of [object.material].flat()) mat.dispose(); }); env.dispose(); renderer.dispose(); }
  };
}
