"""Run with Blender --background --python scripts/build-journey-world.py."""
import bpy
import math
import random
from pathlib import Path
from mathutils import Vector

random.seed(23)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/journey/assets"
OUT.mkdir(parents=True, exist_ok=True)
(ROOT / "assets/blender").mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)


def material(name, color, metallic=0.0, roughness=0.45, emission=0.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*color, 1)
        bsdf.inputs["Emission Strength"].default_value = emission
    return m


stone = material("Warm porcelain", (0.76, 0.79, 0.70), 0.15)
dark = material("Midnight mineral", (0.026, 0.065, 0.068), 0.45)
trim = material("Champagne alloy", (0.48, 0.39, 0.22), 0.75, 0.25)
glass = material("Smoked jade glazing", (0.07, 0.24, 0.24), 0.65, 0.19)
green = material("Sculpted greenery", (0.13, 0.31, 0.24))
water = material("Reflecting pool", (0.09, 0.24, 0.24), 0.72, 0.14)
glow = material("Warm window light", (0.83, 0.68, 0.39), 0.1, 0.35, 1.5)
route = material("Illuminated route", (0.30, 0.68, 0.52), 0.4, 0.35, 1.2)


def finish(obj, name, mat, parent=None):
    obj.name = name
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
    return obj


def box(name, loc, size, mat, parent=None, bevel=0.03):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = obj.modifiers.new("Soft architectural edges", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        bpy.ops.object.modifier_apply(modifier=mod.name)
    return finish(obj, name, mat, parent)


def cylinder(name, loc, radius, depth, mat, parent=None, vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    return finish(bpy.context.object, name, mat, parent)


def sphere(name, loc, radius, mat, parent=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, radius=radius, location=loc)
    return finish(bpy.context.object, name, mat, parent)


def ring(name, loc, radius, thickness, mat, parent=None):
    bpy.ops.mesh.primitive_torus_add(major_segments=48, minor_segments=8, location=loc, major_radius=radius, minor_radius=thickness)
    return finish(bpy.context.object, name, mat, parent)


def tube(name, points, thickness, mat, parent=None):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = thickness
    curve.bevel_resolution = 2
    spline = curve.splines.new("POLY")
    spline.points.add(len(points)-1)
    for p, co in zip(spline.points, points):
        p.co = (*co, 1)
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
    return obj


def tree(x, y, z, parent):
    cylinder("Trunk", (x, y, z+0.15), 0.035, 0.3, trim, parent, 8)
    sphere("Canopy", (x, y, z+0.45), 0.22, green, parent)


positions = [(-7, -2, 0), (-3.3, 3.5, 0.5), (2.5, 4.6, 1), (7, 0.2, 0.4), (5, -5.3, 0.9), (-0.1, -7.4, 1.3), (-6, -7, 1.1)]
names = ["district", "compass", "vault", "residence", "portfolio", "horizon", "summit"]

for i, (x, y, z) in enumerate(positions):
    root = bpy.data.objects.new(f"District_{i}", None)
    root["level"] = names[i]
    bpy.context.collection.objects.link(root)
    cylinder("Floating foundation", (x, y, z-0.42), 1.95, 0.7, dark, root, 64)
    cylinder("Foundation edge", (x, y, z-0.1), 1.98, 0.075, trim, root, 64)
    cylinder("Landscape terrace", (x, y, z), 1.9, 0.12, stone, root, 64)
    ring("Route docking ring", (x, y, z+0.07), 1.82, 0.025, route, root)
    for angle in [-0.6, 0.2, 0.85, 2.5, 3.3]:
        tree(x+1.49*math.cos(angle), y+1.49*math.sin(angle), z+0.08, root)
    box("Arrival walk", (x, y-1.35, z+0.10), (0.7, 0.8, 0.06), dark, root)
    if i == 0:
        for j, (dx, dy, h) in enumerate([(-0.65, 0.18, 2.05), (0.12, 0.65, 3.0), (0.85, 0.2, 2.45)]):
            box("Condominium core", (x+dx, y+dy, z+h/2), (0.56, 0.66, h), glass, root)
            for f in range(int(h/0.24)):
                box("Balcony slab", (x+dx, y+dy, z+0.18+f*0.24), (0.7, 0.78, 0.055), stone, root, 0.015)
                if f%3 == 0:
                    box("Occupied window", (x+dx, y+dy-0.337, z+0.29+f*0.24), (0.32, 0.018, 0.1), glow, root, 0)
        box("Shared courtyard pool", (x+0.15, y-0.8, z+0.11), (1.25, 0.42, 0.025), water, root)
    elif i == 1:
        cylinder("Compass pavilion", (x, y+0.1, z+0.8), 0.96, 1.4, glass, root)
        cylinder("Pavilion roof", (x, y+0.1, z+1.54), 1.12, 0.14, stone, root)
        for a in range(12):
            angle = a*math.tau/12
            box("Pavilion column", (x+0.99*math.cos(angle), y+0.1+0.99*math.sin(angle), z+0.79), (0.09, 0.09, 1.45), trim, root)
        needle = box("Compass needle", (x, y+0.1, z+1.69), (0.08, 1.55, 0.07), route, root)
        needle.rotation_euler.z = -0.5
    elif i == 2:
        box("Vault building", (x, y+0.25, z+1.05), (1.65, 1.13, 2.0), dark, root)
        for a in range(8):
            box("Vault fins", (x-0.88+a*0.25, y+0.25, z+1.05), (0.1, 1.4, 2.15), trim, root)
        door = ring("Vault portal", (x, y-0.52, z+1.1), 0.55, 0.1, stone, root)
        door.rotation_euler.x = math.pi/2
        for a in range(4):
            box("Entry step", (x, y-0.6-a*0.2, z+0.28-a*0.06), (1.05, 0.21, 0.08), stone, root)
    elif i == 3:
        for dx in [-0.85, 0.85]:
            box("Residence wing", (x+dx, y, z+0.73), (0.52, 1.6, 1.4), stone, root)
            box("Ribbon glazing", (x+dx, y-0.81, z+0.78), (0.38, 0.035, 0.62), glass, root)
        box("Garden bridge", (x, y+0.62, z+1.3), (2.3, 0.42, 0.45), glass, root)
        box("Garden water", (x, y-0.18, z+0.15), (0.91, 0.9, 0.06), water, root)
        for dx in [-0.8, 0.8]:
            box("Solar terrace", (x+dx, y+0.1, z+1.49), (0.65, 1.8, 0.11), dark, root)
    elif i == 4:
        for j, (dx, dy, h) in enumerate([(-0.7, 0, 1.5), (0.1, 0.5, 2.2), (0.82, 0.05, 1.75)]):
            box("Portfolio tower", (x+dx, y+dy, z+h/2), (0.65, 0.7, h), glass, root)
            box("Portfolio roof", (x+dx, y+dy, z+h), (0.76, 0.83, 0.12), stone, root)
            for a in range(4):
                box("Vertical facade", (x+dx-0.3+a*0.2, y+dy-0.37, z+h/2), (0.04, 0.04, h), trim, root, 0)
        tube("Portfolio connector", [(x-0.7, y, z+0.7), (x+0.1, y+0.5, z+0.7), (x+0.82, y+0.05, z+0.7)], 0.06, route, root)
    elif i == 5:
        cylinder("Observatory drum", (x, y+0.2, z+0.75), 1, 1.35, stone, root)
        dome = sphere("Observatory dome", (x, y+0.2, z+1.4), 1.02, glass, root)
        dome.scale.z = 0.85
        ring("Dome equator", (x, y+0.2, z+1.4), 1.035, 0.035, trim, root)
        scope = cylinder("Telescope", (x, y-0.3, z+2.02), 0.15, 1.3, trim, root, 24)
        scope.rotation_euler.x = 0.85
        box("Observatory door", (x, y-0.82, z+0.57), (0.5, 0.07, 0.8), dark, root)
    else:
        for j in range(4):
            width = 1.32-j*0.22
            box("Summit tier", (x, y+0.2, z+0.44+j*0.74), (width, width, 0.84), stone, root)
            box("Summit light", (x, y+0.2-width/2-0.02, z+0.44+j*0.74), (0.17, 0.035, 0.65), glow, root)
        ring("Summit halo", (x, y+0.2, z+3.55), 0.5, 0.05, trim, root)
    # Consolidate static meshes by material inside each district to limit draw calls.
    for mat in [stone, dark, trim, glass, green, water, glow, route]:
        objects = [o for o in list(root.children) if o.type == "MESH" and o.data.materials[0] == mat]
        if not objects:
            continue
        bpy.ops.object.select_all(action="DESELECT")
        for obj in objects:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = objects[0]
        bpy.ops.object.join()
        bpy.context.object.name = f"Architecture_{i}_{mat.name}"
    beacon = ring(f"Beacon_{i}", (x, y, z+3.8 if i == 6 else z+3.3), 0.22, 0.025, route)
    beacon.rotation_euler.x = 0.45
    beacon.rotation_euler.z = 0
    beacon.keyframe_insert(data_path="rotation_euler", frame=1)
    beacon.rotation_euler.z = math.tau
    beacon.keyframe_insert(data_path="rotation_euler", frame=241)

for i in range(6):
    a, b = Vector(positions[i]), Vector(positions[i+1])
    points = []
    for step in range(25):
        t = step/24
        p = a.lerp(b, t)
        p.z -= 0.13 + 0.2*math.sin(t*math.pi)
        points.append(tuple(p))
    tube(f"Route_{i}", points, 0.035, route)

# Central navigation monument.
cylinder("Central plinth", (0, -0.3, -0.7), 1.25, 0.25, dark)
ring("Navigation orbit", (0, -0.3, -0.49), 1.07, 0.025, trim)
box("A left", (-0.2, -0.3, 0.22), (0.13, 0.14, 1.15), stone).rotation_euler.y = 0.33
box("A right", (0.2, -0.3, 0.22), (0.13, 0.14, 1.15), stone).rotation_euler.y = -0.33
box("A cross", (0, -0.3, 0.09), (0.37, 0.14, 0.10), trim)

scene = bpy.context.scene
scene.frame_start, scene.frame_end = 1, 240
scene.render.fps = 30
scene.frame_set(1)
bpy.ops.export_scene.gltf(filepath=str(OUT / "apex-world.glb"), export_format="GLB", export_animations=True, export_cameras=False, export_lights=False, export_extras=True)

# A matching poster doubles as the no-WebGL view.
floor = material("Atmospheric floor", (0.018, 0.036, 0.038), 0.25, 0.65)
box("Poster floor", (0, 0, -1.25), (200, 200, 0.1), floor, bevel=0)
world = bpy.data.worlds.new("Midnight studio")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.08, 0.13, 0.15, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.5
scene.world = world
for name, loc, power, color, size in [
    ("Softbox", (-5, -4, 15), 2400, (0.84, 0.94, 1), 10),
    ("Sunset rim", (6, 8, 10), 3200, (1, 0.8, 0.55), 8),
    ("Mint fill", (-10, 7, 6), 1600, (0.51, 1, 0.81), 7),
]:
    data = bpy.data.lights.new(name, "AREA")
    data.energy, data.color, data.shape, data.size = power, color, "DISK", size
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = loc
    obj.rotation_euler = (Vector((0, -1, 0))-obj.location).to_track_quat("-Z", "Y").to_euler()
bpy.ops.object.camera_add(location=(19, -26, 25))
camera = bpy.context.object
camera.rotation_euler = (Vector((0, -1, 0))-camera.location).to_track_quat("-Z", "Y").to_euler()
camera.data.type, camera.data.ortho_scale = "ORTHO", 25
scene.camera = camera
scene.render.engine = "CYCLES"
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.render.resolution_x, scene.render.resolution_y = 1500, 1100
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUT / "world-poster.png")
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / "assets/blender/apex-world.blend"), compress=True)
bpy.ops.render.render(write_still=True)
print("APEX_WORLD_COMPLETE")
