import { LEVELS, OPTIONAL_FIELDS, checkpointMissing, valueFor } from "../../public/journey/levels.js";
import { createWorld } from "./world.js";
import { createWorkspace } from "../workspace/workspace.js";
import { createAssistant } from "../assistant/assistant.js";
let workspace, assistant, worldLoading = false;

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const brand = value => String(value ?? "").replace(/EstateLab|Jarvis/gi, "Apex");
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => crypto.randomUUID();
const store = { read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }, write(key, value) { localStorage.setItem(key, JSON.stringify(value)); } };
let fields = {};
let clientId = store.read("apex.journey.client", null);
if (!clientId) { try { clientId = localStorage.getItem("estatelab.jarvis.clientId"); if (clientId) store.write("apex.journey.client", clientId); } catch {} }
if (!/^[\w-]{16,128}$/.test(clientId || "")) { clientId = uid(); try { store.write("apex.journey.client", clientId); } catch {} }
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
const state = { candidates: [], active: "", level: 0, checkpoint: null, evaluation: null, busy: false, revision: 0, paused: motionQuery.matches, flat: false, storageKey: null, world: null, noticeTimer: null };

function notify(message, persistent = false) {
  clearTimeout(state.noticeTimer);
  $("#notice").textContent = brand(message);
  if (!persistent) state.noticeTimer = setTimeout(() => { $("#notice").textContent = ""; }, 6500);
}

function makeCandidate() {
  return { id: uid(), dealCard: {}, financialProfile: {}, evidence: {}, report: null, sessionId: null, chat: [], modified: new Date().toISOString() };
}

function current() { return state.candidates.find(candidate => candidate.id === state.active); }
function evaluationInput(candidate) {
  return { dealCard: candidate.dealCard, financialProfile: candidate.financialProfile, evidence: candidate.evidence };
}

function save() {
  if (!state.storageKey) return;
  try {
    store.write(state.storageKey, { candidates: state.candidates, active: state.active });
    $("#saveStatus").textContent = "Saved in this browser. Your framework stays owner-controlled.";
  } catch { $("#saveStatus").textContent = "Browser storage is unavailable. Export your journey to keep a copy."; }
}

function invalidate() {
  state.revision++;
  state.evaluation = null;
  current().report = null;
  current().modified = new Date().toISOString();
  $("#levelStatus").textContent = "RECHECK NEEDED";
  save();
  renderCandidates();
  renderRail();
}

async function api(url, body, timeout = 35000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { method: body ? "POST" : "GET", headers: { "content-type": "application/json", "x-estatelab-client-id": clientId }, body: body ? JSON.stringify(body) : undefined, signal: controller.signal });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("Apex is taking longer to respond. Your work is saved; please try again.");
    throw error;
  } finally { clearTimeout(timer); }
}

function levelResult(index = state.level) { return state.evaluation?.levels?.[index]; }
function canOpen(index) { return index === 0 || ["active", "review", "blocked", "passed"].includes(levelResult(index)?.status); }

function renderCandidates() {
  const select = $("#candidateSelect");
  select.innerHTML = state.candidates.map((candidate, i) => `<option value="${escape(candidate.id)}">${escape(candidate.dealCard.projectName || candidate.dealCard.area || `Property ${i + 1}`)}</option>`).join("");
  select.value = state.active;
  $("#compareCount").textContent = state.candidates.length;
}

function renderRail() {
  $("#levelRail").innerHTML = LEVELS.map((level, i) => {
    const status = levelResult(i)?.status || (i === 0 ? "active" : "locked");
    const text = ({ passed: "Cleared", active: "Explore", review: "Evidence needed", blocked: "Resolve issue", locked: "Locked" })[status];
    return `<button type="button" data-level="${i}" class="${state.level === i ? "active" : ""}" aria-current="${state.level === i ? "step" : "false"}" aria-disabled="${!canOpen(i)}" aria-label="Level ${i + 1}: ${escape(level.subject)}. ${text}."><span class="rail-number">${status === "passed" ? "&#10003;" : String(i + 1).padStart(2, "0")}</span><span><b>${escape(level.short)}</b><small>${text}</small></span></button>`;
  }).join("");
  $("#levelsPassed").textContent = String(state.evaluation?.completed || 0).padStart(2, "0");
  state.world?.update(state.evaluation?.levels || LEVELS.map((_, i) => ({ status: i === 0 ? "active" : "locked" })));
}

function renderOverview() {
  const level = LEVELS[state.level];
  const result = levelResult();
  const completed = level.checkpoints.filter(point => !checkpointMissing(current(), point, fields).length).length;
  const passed = result?.status === "passed";
  const gate = result?.status === "blocked" || result?.status === "review";
  let action = `<button class="primary-button" data-action="enter">${completed ? "Continue investigation" : "Enter this level"}<span aria-hidden="true">&#8599;</span></button>`;
  if (passed && state.level < 6) action = `<button class="primary-button" data-action="next">Continue to ${escape(LEVELS[state.level + 1].title)} <span aria-hidden="true">&#8594;</span></button>`;
  if (state.level === 6 && passed) action = `<button class="primary-button" data-action="report">Get the decision report <span aria-hidden="true">&#8599;</span></button>`;
  $("#levelContent").innerHTML = `
    <p class="level-lead">${escape(level.description)}</p>
    <div class="panel-progress"><span>${completed} of ${level.checkpoints.length} checkpoints recorded</span><span>${Math.round(completed / level.checkpoints.length * 100)}%</span></div>
    <div class="progress-track"><span style="width:${completed / level.checkpoints.length * 100}%"></span></div>
    ${gate ? `<div class="gate-result bad"><b>${result.status === "blocked" ? "Pause at this level" : "The evidence needs another look"}</b><p>${escape(result.blockers?.[0] || result.summary)}</p><button class="secondary-button" data-action="challenge">Ask Apex what to check</button></div>` : ""}
    ${passed ? `<div class="gate-result good"><b>Level cleared</b><p>${escape(result.summary)}</p></div>` : ""}
    <ol class="checkpoint-list">${level.checkpoints.map((point, index) => {
      const done = !checkpointMissing(current(), point, fields).length;
      return `<li><button type="button" data-checkpoint="${index}"><span class="step-icon ${done ? "complete" : ""}">${done ? "&#10003;" : String(index + 1).padStart(2, "0")}</span><span>${escape(point.title)}</span><span class="step-arrow" aria-hidden="true">&#8599;</span></button></li>`;
    }).join("")}</ol>
    ${action}
    ${completed === level.checkpoints.length && !passed ? '<button class="secondary-button" data-action="check" style="width:100%;margin-top:10px">Check this level</button>' : ""}
    <p class="mentor-note">${escape(level.lesson)}</p>`;
}

function fieldMarkup(key) {
  const field = fields[key];
  const value = valueFor(current(), key, fields);
  const required = OPTIONAL_FIELDS.has(key) ? "" : "required";
  const label = `<span>${escape(field.label)}${required ? "" : "<small>optional</small>"}</span>`;
  if (field.options.length) return `<label class="field">${label}<select name="${key}" data-field="${key}" ${required}><option value="">Select what the evidence shows</option>${field.options.map(option => `<option value="${escape(option.value)}" ${value === option.value ? "selected" : ""}>${escape(option.label)}</option>`).join("")}</select></label>`;
  const isNote = /Notes|Thesis|Criterion|Concern|Screening|Reason|Preparation|Commitment/.test(key);
  const inputMode = field.inputMode === "numeric" ? "numeric" : field.inputMode === "decimal" ? "decimal" : "text";
  return `<label class="field">${label}${isNote ? `<textarea data-field="${key}" name="${key}" maxlength="500" placeholder="${escape(field.placeholder)}" ${required}>${escape(value)}</textarea>` : `<input data-field="${key}" name="${key}" value="${escape(value)}" inputmode="${inputMode}" maxlength="500" placeholder="${escape(field.placeholder)}" ${required}>`}</label>`;
}

function renderCheckpoint() {
  const level = LEVELS[state.level];
  const point = level.checkpoints[state.checkpoint];
  const proof = current().evidence[point.id] || {};
  $("#levelContent").innerHTML = `<button class="back-button" data-action="overview">&#8592; Level overview</button>
    <form class="checkpoint-form" id="checkpointForm">
      <h3>${escape(point.title)}</h3><p>${escape(point.prompt)}</p>
      ${point.fields.map(fieldMarkup).join("")}
      <div class="proof-block"><p>Leave a trace of your reasoning. For financial inputs, record the basis of your calculation.</p>
      <label class="field"><span>Evidence or calculation notes</span><textarea name="proofNote" data-proof="note" minlength="12" maxlength="1500" required placeholder="Source, document, observation or calculation. Say what is still uncertain.">${escape(proof.note || "")}</textarea></label>
      <label class="field"><span>Date checked</span><input name="proofDate" data-proof="date" type="date" max="${today()}" value="${escape(proof.date || "")}" required></label></div>
      <p class="source-line">Framework: ${escape(point.source)}.</p>
      <p id="checkpointError" class="error-note" role="alert"></p>
      <div class="form-actions"><button type="submit" class="primary-button">Save &amp; check <span aria-hidden="true">&#8594;</span></button></div>
    </form>`;
}

function renderPanel() {
  const level = LEVELS[state.level];
  const status = levelResult()?.status || "active";
  $("#levelEyebrow").textContent = `LEVEL ${String(state.level + 1).padStart(2, "0")} / 07`;
  $("#levelTitle").textContent = level.title;
  $("#levelSubject").textContent = level.subject.toUpperCase();
  $("#levelStatus").textContent = ({ active: "OPEN", passed: "CLEARED", review: "REVIEW", blocked: "PAUSED", locked: "LOCKED" })[status];
  $("#levelStatus").dataset.status = status;
  if (state.checkpoint === null) renderOverview(); else renderCheckpoint();
  $("#levelPanel").setAttribute("aria-busy", String(state.busy));
}

function selectLevel(index) {
  if (state.busy || workspace?.isBusy()) return;
  if (!canOpen(index)) { notify("Clear the earlier levels first. Each decision builds on the evidence before it."); return; }
  state.level = index;
  state.checkpoint = null;
  renderPanel(); renderRail();
  state.world?.focus(index);
  $("#levelPanel").scrollTop = 0;
  if (innerWidth < 800) $("#levelPanel").scrollIntoView({ behavior: state.paused ? "instant" : "smooth", block: "start" });
}

async function evaluate() {
  const id = state.active, revision = state.revision;
  const result = await api("/api/journey/evaluate", { candidate: evaluationInput(current()) });
  if (id !== state.active || revision !== state.revision) return null;
  state.evaluation = result;
  renderRail();
  return result;
}

async function checkCurrent() {
  if (state.busy || workspace?.isBusy()) return;
  state.busy = true;
  $("#levelPanel").setAttribute("aria-busy", "true");
  try {
    const previous = state.evaluation?.completed || 0;
    const result = await evaluate();
    if (!result) return;
    save();
    const firstIncomplete = LEVELS[state.level].checkpoints.findIndex(point => checkpointMissing(current(), point, fields).length);
    if (firstIncomplete >= 0 && state.checkpoint !== null) state.checkpoint = firstIncomplete;
    else state.checkpoint = null;
    renderPanel();
    $("#levelPanel").scrollTop = 0;
    if (result.completed > previous) notify(`${LEVELS[state.level].title} cleared. The next level is open.`);
    else if (firstIncomplete < 0) notify(levelResult()?.status === "passed" ? "This level is cleared." : "Evidence saved. Review the level feedback before proceeding.");
    else notify("Checkpoint saved. Continue with the next piece of evidence.");
  } catch (error) {
    const errorNode = $("#checkpointError");
    if (errorNode) errorNode.textContent = error.message;
    else notify(error.message, true);
  } finally { state.busy = false; $("#levelPanel").setAttribute("aria-busy", "false"); }
}

function openDialog(title, content, eyebrow = "YOUR INVESTIGATION") {
  $("#dialogTitle").textContent = title;
  $("#dialogEyebrow").textContent = eyebrow;
  $("#dialogContent").innerHTML = content;
  if (!$("#workspaceDialog").open) $("#workspaceDialog").showModal();
}

function exportCandidate() {
  const payload = { product: "Apex Property Journey", version: 1, exportedAt: new Date().toISOString(), candidate: current(), assessment: state.evaluation };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url; link.download = `apex-journey-${today()}.json`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function compare() {
  if (state.busy || workspace?.isBusy()) return;
  openDialog("Which property earns its place?", '<p role="status">Rechecking each candidate against the same framework...</p>', "YOUR PROPERTY COLLECTION");
  try {
    const results = [];
    for (const candidate of state.candidates) results.push(await api("/api/journey/evaluate", { candidate: evaluationInput(candidate) }));
    const qualified = results.map((result, i) => ({ result, i })).filter(item => item.result.qualified).sort((a, b) => (b.result.dimensions || []).reduce((s, d) => s + d.score, 0) - (a.result.dimensions || []).reduce((s, d) => s + d.score, 0));
    const leading = qualified[0];
    const score = item => item.result.dimensions.reduce((sum, dimension) => sum + dimension.score, 0);
    const leaders = leading ? qualified.filter(item => score(item) === score(leading)) : [];
    const intro = leaders.length > 1 ? `${leaders.map(item => item.result.candidateName).join(", ")} share the highest framework score. There is no clear winner from these scores alone. Compare the cash-flow assumptions, exit risks and strength of the evidence before choosing.` : leading ? `${leading.result.candidateName} has the strongest average across the four framework dimensions among your qualified candidates. Review its counter-case before deciding.` : "No candidate has cleared every level and the final evidence gate yet. The comparison shows where each investigation needs work.";
    $("#dialogContent").innerHTML = `<p>${escape(intro)}</p><div class="compare-grid">${results.map((result, i) => `<article class="compare-card"><small>${result.qualified ? "QUALIFIED FOR SHORTLIST REVIEW" : "INVESTIGATION IN PROGRESS"}</small><h3>${escape(result.candidateName)}</h3><p>${result.completed} / 7 levels cleared</p>${result.dimensions.map(dimension => `<div class="score-row"><span>${escape(dimension.label)}</span><b>${dimension.score}/100</b></div>`).join("")}<p>${escape(result.hardStops[0] || result.blockers[0] || result.counterThesis)}</p><button class="secondary-button" data-switch="${escape(state.candidates[i].id)}">Open journey</button></article>`).join("")}</div><p class="source-line">Scores reflect your supplied inputs. Evidence quality, hard stops and the investor's situation take priority over the average.</p>`;
  } catch (error) { $("#dialogContent").textContent = error.message; }
}

function askApex(prompt = "") { workspace.setCandidate(current()); void workspace.open("chat", { prompt }); }

async function decisionReport() {
  if (state.busy || workspace.isBusy()) return;
  workspace.setCandidate(current());
  await workspace.open("chat", { analyze: true });
}

async function switchCandidate(id) {
  if (state.busy || workspace?.isBusy() || !state.candidates.some(candidate => candidate.id === id)) { renderCandidates(); return; }
  window.speechSynthesis?.cancel();
  state.active = id; state.level = 0; state.checkpoint = null; state.evaluation = null; state.revision++;
  workspace?.setCandidate(current());
  save(); renderCandidates(); renderPanel(); renderRail(); state.world?.overview();
  try { await evaluate(); renderPanel(); } catch (error) { notify(error.message); }
}

function bindEvents() {
  $("#candidateSelect").addEventListener("change", event => switchCandidate(event.target.value));
  $("#levelRail").addEventListener("click", event => { const button = event.target.closest("[data-level]"); if (button) selectLevel(Number(button.dataset.level)); });
  $("#levelContent").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button || state.busy) return;
    if (button.dataset.checkpoint !== undefined) { state.checkpoint = Number(button.dataset.checkpoint); renderPanel(); state.world?.focus(state.level, true); $("#levelPanel").scrollTop = 0; return; }
    switch (button.dataset.action) {
      case "overview": state.checkpoint = null; renderPanel(); state.world?.focus(state.level); break;
      case "enter": { const points = LEVELS[state.level].checkpoints; state.checkpoint = Math.max(0, points.findIndex(point => checkpointMissing(current(), point, fields).length)); renderPanel(); state.world?.focus(state.level, true); break; }
      case "next": selectLevel(state.level + 1); break;
      case "check": checkCurrent(); break;
      case "challenge": askApex(`Help me resolve the ${LEVELS[state.level].subject} level. ${levelResult()?.blockers?.[0] || levelResult()?.summary || "What evidence am I missing?"}`); break;
      case "report": decisionReport(); break;
    }
  });
  $("#levelContent").addEventListener("input", event => {
    const input = event.target;
    if (input.dataset.field) current()[fields[input.dataset.field].scope][input.dataset.field] = input.value;
    else if (input.dataset.proof) {
      const id = LEVELS[state.level].checkpoints[state.checkpoint].id;
      current().evidence[id] ||= {};
      current().evidence[id][input.dataset.proof] = input.value;
    } else return;
    invalidate();
  });
  $("#levelContent").addEventListener("submit", event => { event.preventDefault(); checkCurrent(); });
  $("#newCandidate").addEventListener("click", () => {
    if (state.busy || workspace?.isBusy()) return;
    if (state.candidates.length >= 4) { notify("Keep up to four active properties. Export and reset one to start another."); return; }
    const candidate = makeCandidate(); state.candidates.push(candidate); switchCandidate(candidate.id);
  });
  $("#compareButton").addEventListener("click", compare);
  $("#assistantButton").addEventListener("click", () => askApex());
  $("#exportButton").addEventListener("click", exportCandidate);
  $("#resetButton").addEventListener("click", () => {
    if (state.busy || workspace?.isBusy()) return;
    openDialog("Reset this property?", '<p>This clears the selected property\'s inputs, checkpoint notes, browser chat and local report. Other properties and your account history remain available.</p><div class="dialog-actions"><button class="secondary-button" data-dialog-action="cancel">Keep my progress</button><button class="primary-button" data-dialog-action="reset">Clear this property</button></div>');
  });
  $("#dialogClose").addEventListener("click", () => { window.speechSynthesis?.cancel(); $("#workspaceDialog").close(); });
  $("#workspaceDialog").addEventListener("close", () => window.speechSynthesis?.cancel());
  $("#dialogContent").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.switch && !state.busy) { $("#workspaceDialog").close(); switchCandidate(button.dataset.switch); }
    if (button.dataset.dialogAction === "cancel") $("#workspaceDialog").close();
    if (button.dataset.dialogAction === "reset" && !state.busy) {
      const i = state.candidates.findIndex(candidate => candidate.id === state.active);
      state.candidates[i] = makeCandidate(); $("#workspaceDialog").close(); switchCandidate(state.candidates[i].id);
    }
    if (button.dataset.dialogAction === "export") exportCandidate();
    if (button.dataset.dialogAction === "print") window.print();
  });
  $("#resetView").addEventListener("click", () => state.world?.overview());
  $("#motionToggle").addEventListener("click", () => {
    state.paused = !state.paused; state.world?.pause(state.paused); updateViewButtons();
  });
  $("#mapToggle").addEventListener("click", () => {
    state.flat = !state.flat; document.body.classList.toggle("flat-view", state.flat); state.world?.flat(state.flat); updateViewButtons();
  });
  motionQuery.addEventListener("change", event => { state.paused = event.matches; state.world?.pause(state.paused); updateViewButtons(); });
  window.addEventListener("pagehide", () => { save(); window.speechSynthesis?.cancel(); state.world?.dispose(); });
  window.addEventListener("pageshow", event => { if (event.persisted) location.reload(); });
}

function updateViewButtons() {
  $("#motionToggle").textContent = state.paused ? "Resume motion" : "Pause motion";
  $("#motionToggle").setAttribute("aria-pressed", String(state.paused));
  $("#mapToggle").textContent = state.flat ? "3D view" : "List view";
  $("#mapToggle").setAttribute("aria-pressed", String(state.flat));
}

function restoreScope(userId) {
  state.userId = userId || null;
  state.storageKey = `apex.journey.v1:${userId || `guest-${clientId}`}`;
  const stored = store.read(state.storageKey, {});
  state.candidates = (Array.isArray(stored.candidates) ? stored.candidates : []).filter(candidate => candidate && typeof candidate.id === "string" && candidate.dealCard && candidate.financialProfile && candidate.evidence).slice(0, 4).map(candidate => ({ ...candidate, chat: Array.isArray(candidate.chat) ? candidate.chat.slice(-40) : [] }));
  if (!state.candidates.length) state.candidates.push(makeCandidate());
  state.active = state.candidates.some(candidate => candidate.id === stored.active) ? stored.active : state.candidates[0].id;
  state.level = 0; state.checkpoint = null; state.evaluation = null; state.revision++;
}

function loadWorld() {
  if (state.world || worldLoading) return;
  worldLoading = true;
  createWorld({ selectLevel, notify, reducedMotion: state.paused }).then(world => {
    state.world = world; world.pause(state.paused || document.body.classList.contains("workspace-active") || document.body.classList.contains("assistant-active")); renderRail(); updateViewButtons();
  }).catch(() => {
    document.body.classList.add("flat-view");
    $("#worldLoading").hidden = true;
    notify("The illustrated map is available while 3D is unavailable. Your checkpoint forms still work.");
  });
}

async function init() {
  fields = await api("/journey/fields.json", null, 20000);
  let user;
  try { user = (await api("/api/auth/me", null, 12000)).user; }
  catch { notify("Account connection is unavailable. The journey will use this browser's guest space."); }
  restoreScope(user?.id);
  workspace = createWorkspace({ getCandidate: current, notify, onVisibility(open) {
    state.world?.pause(open || state.paused);
    if (!open) {
      loadWorld();
      renderPanel();
      void evaluate().then(() => { if (!canOpen(state.level)) { state.level = 0; state.checkpoint = null; } renderPanel(); }).catch(error => notify(error.message));
    }
  } });
  assistant = createAssistant({ openTool: surface => workspace.open(surface), notify, useProperty(investigation) {
    if (!investigation?.selected) return;
    let candidate = state.candidates.find(candidate => candidate.investigationId === investigation.id);
    if (!candidate) {
      const empty = state.candidates.findIndex(candidate => !Object.keys(candidate.dealCard).length && !Object.keys(candidate.financialProfile).length && !candidate.messages?.length);
      if (state.candidates.length >= 4 && empty < 0) { notify("Export and reset an unused tool property slot first. Your investigation remains saved.", true); return; }
      candidate = { ...makeCandidate(), investigationId: investigation.id, dealCard: { ...investigation.selected.dealCard } };
      if (empty >= 0) state.candidates[empty] = candidate; else state.candidates.push(candidate);
    }
    state.active = candidate.id; state.evaluation = null; state.level = 0; state.checkpoint = null; state.revision++;
    workspace.setCandidate(current()); save(); renderCandidates(); renderPanel(); renderRail();
  } });
  document.addEventListener("apex:leave-assistant", () => assistant.hide());
  document.querySelector('[data-area="assistant"]').addEventListener("click", () => { if (workspace.isBusy() || state.busy) { notify("Let the current tool request finish first."); return; } assistant.show(); state.world?.pause(true); });
  document.addEventListener("apex:context", event => {
    const input = event.detail;
    const candidate = current();
    if (input.candidateId !== candidate.id) return;
    const changed = JSON.stringify(candidate.dealCard) !== JSON.stringify(input.dealCard) || JSON.stringify(candidate.financialProfile) !== JSON.stringify(input.financialProfile);
    candidate.dealCard = input.dealCard; candidate.financialProfile = input.financialProfile; candidate.dcfContext = input.dcfContext;
    if (input.sessionId !== undefined) { if (candidate.sessionId !== input.sessionId) candidate.report = null; candidate.sessionId = input.sessionId; }
    if (input.messages) candidate.messages = input.messages.slice(-40);
    if (changed) invalidate(); else save();
    if (input.report) { candidate.report = input.report; save(); }
  });
  document.addEventListener("apex:busy", event => {
    for (const id of ["candidateSelect", "newCandidate", "compareButton"]) $("#" + id).disabled = event.detail;
  });
  document.addEventListener("apex:recover-draft", event => {
    if (state.busy || workspace.isBusy()) return;
    const emptySlot = state.candidates.findIndex(candidate => !Object.keys(candidate.dealCard).length && !Object.keys(candidate.financialProfile).length && !Object.keys(candidate.evidence).length && !candidate.messages?.length && !candidate.chat?.length);
    if (state.candidates.length >= 4 && emptySlot < 0) { notify("Export and reset an unused property before recovering another draft."); return; }
    const candidate = makeCandidate();
    for (const [key, field] of Object.entries(fields)) {
      const value = event.detail?.[field.scope]?.[key];
      if (typeof value === "string" || typeof value === "number") candidate[field.scope][key] = String(value).slice(0, 500);
    }
    if (emptySlot >= 0) state.candidates[emptySlot] = candidate;
    else state.candidates.push(candidate);
    void switchCandidate(candidate.id).then(() => workspace.open("deal"));
    try { localStorage.setItem("apex.workspace.recovered", "true"); } catch {}
    document.querySelector(".draft-recovery")?.remove();
    notify("Earlier inputs recovered as a separate property. Recheck the evidence before proceeding.");
  });
  document.addEventListener("apex:auth", event => {
    const id = event.detail?.id || null;
    if (state.userId === id) return;
    save(); restoreScope(id); workspace.setCandidate(current());
    renderCandidates(); renderPanel(); renderRail(); save();
    void evaluate().then(renderPanel).catch(error => notify(error.message));
  });
  renderCandidates(); renderPanel(); renderRail(); updateViewButtons(); bindEvents(); save();
  try { await evaluate(); renderPanel(); } catch (error) { notify(error.message, true); }
  document.body.dataset.ready = "true";
  if (!location.hash || location.hash === "#assistant") assistant.show();
  else if (location.hash === "#journey") { assistant.hide(); loadWorld(); }
  else workspace.restoreRoute();
}

init().catch(error => {
  notify(`The journey could not finish loading: ${error.message}. Please reload to reconnect. Your saved property data is retained.`, true);
});
