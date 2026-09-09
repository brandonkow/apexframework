import { createContextSync, contextOf } from "./context-sync.js";
import { createPrivateFilesView } from "./files.js";

const $ = selector => document.querySelector(selector);
const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const cash = value => new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(value);
const labels = { rental_income: "Rental income", appreciation: "Capital appreciation", own_stay: "My own home", balanced: "A balance", discovery: "Discovery", site_visit: "Site visit", transaction: "Transaction", handover: "Handover", rental: "Rental", review: "Holding review" };
const date = () => new Date().toISOString().slice(0, 10);

export function createAssistant({ openTool, useProperty, notify, onContextSaved, onContextState, onInvestigationDeleted }) {
  const host = $("#investmentAssistant");
  let current = null, status = null, busy = false, generation = 0, timer, cases = [], editing = false;
  const requestControllers = new Set(), syncStates = new Map();
  const sync = createContextSync({ request, onSaved(id, item) {
    onContextSaved?.(id, item);
    if (current?.id === id) current = item;
  }, onState(id, value, error) {
    syncStates.set(id, { value, error: error?.message || "" });
    onContextState?.(id, value, error);
    if (current?.id === id) renderSyncNotice();
  } });
  host.innerHTML = `<header class="assistant-intro"><div class="assistant-orb" aria-hidden="true"><span>A</span></div><p class="eyebrow">YOUR PROPERTY THINKING PARTNER</p><h1>A clearer way forward.</h1><p>Tell me what you want property investment to do for you.</p></header>
    <div class="assistant-casebar"><label><span class="sr-only">Your investigations</span><select id="investmentCaseSelect" aria-label="Your investigations"><option>No saved investigation</option></select></label><button id="investmentNew" type="button">New investigation</button><button id="investmentExport" type="button" hidden>Export</button><details class="assistant-more"><summary>More</summary><button id="investmentDelete" type="button">Delete this investigation</button><button id="investmentAccount" type="button">Account &amp; private memory</button></details></div>
    <p id="investmentStorage" class="assistant-storage"></p><button id="investmentAdopt" class="secondary-button" hidden>Import my guest investigations</button>
    <div id="investmentMessages" class="assistant-messages" role="log" aria-label="Investment conversation"></div>
    <section id="investmentBrief" class="assistant-brief" aria-label="Search brief" hidden></section>
    <section id="investmentRun" class="assistant-run" aria-label="Search progress" hidden></section>
    <section id="investmentResults" class="assistant-results" aria-label="Property shortlist" hidden></section>
    <section id="investmentProperty" class="assistant-property" aria-label="Your continuing property investigation" hidden></section>
    <section id="investmentFinance" class="assistant-finance" aria-label="Financial conversation" hidden></section>
    <p id="investmentError" class="error-note" role="alert"></p>
    <form id="investmentComposer" class="assistant-composer"><label class="sr-only" for="investmentInput">Talk to Apex</label><textarea id="investmentInput" rows="2" maxlength="2000" placeholder="Find a rental property in Penang that fits my situation..." required></textarea><button type="submit" class="primary-button">Send <span aria-hidden="true">&#8599;</span></button></form>
    <div class="assistant-composer-meta"><label><input id="investmentAi" type="checkbox"> Use AI reasoning</label><span id="investmentModel">Checking connection</span><button id="investmentProfileStart" type="button">Check my buying power</button><button id="investmentVoice" type="button">Speak</button></div>
    <details class="assistant-boundaries"><summary>What happens with my information?</summary><p>Your confirmed brief guides the search; it does not prove affordability. Turning on AI sends submitted messages and relevant case context to the configured provider. Your private observations never update the shared founder framework. Site visits, professional checks and external commitments still need people.</p><p id="investmentCoverage"></p></details>`;
  host.querySelector(".assistant-more").insertAdjacentHTML("beforeend", '<button id="investmentCleanup" type="button" hidden>Retry private file cleanup</button><p id="investmentCleanupNotice" class="assistant-caption" role="status"></p>');
  const files = createPrivateFilesView(host, { onResolve: () => { $("#investmentError").textContent = ""; }, run: (route, makeBody) => safely(async () => {
    const id = current?.id, epoch = generation; if (!id) return;
    const body = await makeBody();
    const result = await request(`/api/assistant/cases/${id}/files${route ? "/" + route : ""}`, body);
    if (epoch !== generation || current?.id !== id) return;
    files.accept(route); current = result.case; render(); renderCleanup(result.pendingFileDeletes);
  }) });
  function renderCleanup(count) {
    if (count === undefined) return;
    host.classList.toggle("has-file-cleanup", Boolean(count));
    $("#investmentCleanup").hidden = !count;
    $("#investmentCleanupNotice").textContent = count ? `${count} original-file cleanup(s) still pending. Files are not accessible through deleted records. Retry after a few minutes; the server retains a cleanup record.` : "";
  }

  async function request(path, body, method = body ? "POST" : "GET") {
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 60000);
    requestControllers.add(controller);
    try {
      const response = await fetch(path, { method, headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined, signal: controller.signal });
      const payload = await response.json();
      if (!response.ok) throw Object.assign(new Error(payload.error || "The request could not be completed."), { status: response.status });
      return payload;
    } catch (error) { if (error.name === "AbortError") throw new Error("Request interrupted. Reload the investigation to check what was saved before retrying."); throw error; }
    finally { clearTimeout(timeout); requestControllers.delete(controller); }
  }
  function lock(value) {
    busy = value;
    $("#investmentComposer button").disabled = value;
    for (const id of ["investmentCaseSelect", "investmentNew", "investmentDelete"]) $("#" + id).disabled = value;
    host.setAttribute("aria-busy", String(value));
  }
  function showError(error) { $("#investmentError").textContent = error.message || String(error); }
  async function refreshList() {
    const epoch = generation, result = await request("/api/assistant/cases");
    if (epoch !== generation) return;
    cases = result.cases;
    host.classList.toggle("no-cases", !cases.length && !current);
    $("#investmentCaseSelect").innerHTML = cases.length ? cases.map(item => `<option value="${escape(item.id)}" ${current?.id === item.id ? "selected" : ""}>${escape(item.title)} / ${escape(labels[item.stage])}</option>`).join("") : '<option value="">No saved investigation</option>';
  }
  function render() {
    $("#investmentExport").hidden = !current;
    $("#investmentDelete").hidden = !current;
    const log = $("#investmentMessages"), wasAtEnd = log.scrollHeight - log.scrollTop - log.clientHeight < 60;
    log.innerHTML = (current?.messages || []).map(item => `<article class="assistant-message ${item.role === "user" ? "from-user" : "from-apex"}"><small>${item.role === "user" ? "YOU" : `APEX / ${item.mode === "llm" ? "AI + FRAMEWORK" : "FRAMEWORK"}`}</small><p>${escape(item.content)}</p></article>`).join("");
    if (wasAtEnd) log.scrollTop = log.scrollHeight;
    host.classList.toggle("has-conversation", Boolean(current?.messages.length));
    const briefHost = $("#investmentBrief"), brief = current?.brief;
    briefHost.hidden = !current || Boolean(current.selected || current.profileIntake) || !Boolean(brief?.area || brief?.goal || brief?.budgetMax);
    if (brief && !briefHost.hidden) briefHost.innerHTML = `<details ${!current.confirmedAt || editing ? "open" : ""}><summary>Your search brief <span>${current.confirmedAt && !editing ? "Confirmed" : "Please review"}</span></summary><form id="investmentBriefForm"><div class="assistant-field-grid"><label>Location<input name="area" required maxlength="120" value="${escape(brief.area)}" placeholder="Town, neighbourhood or state"></label><label>Purpose<select name="goal" required><option value="">Choose your objective</option>${Object.entries(labels).slice(0, 4).map(([key, label]) => `<option value="${key}" ${brief.goal === key ? "selected" : ""}>${label}</option>`).join("")}</select></label><label>Search ceiling (RM)<input name="budgetMax" type="number" min="1" max="1000000000" required value="${brief.budgetMax ?? ""}" inputmode="decimal"></label><label>Property type<select name="propertyType">${[["any", "Open to residential options"], ["condo", "Condominium"], ["serviced_apartment", "Serviced apartment"], ["landed", "Landed"]].map(([key, label]) => `<option value="${key}" ${brief.propertyType === key ? "selected" : ""}>${label}</option>`).join("")}</select></label></div><p class="assistant-caption">Confirm what I understood. This is a search range, not loan approval or a recommendation to spend it.</p><button type="submit" class="primary-button">${current.confirmedAt ? "Search again with this brief" : "Confirm & find candidates"}</button></form></details>`;
    const run = current?.job;
    $("#investmentRun").hidden = !run;
    if (run) $("#investmentRun").innerHTML = `<div><span class="live-dot"></span><b>${escape(run.status === "completed" ? "Search complete" : run.status === "cancelled" ? "Search stopped" : run.status === "failed" ? "Search needs attention" : run.labels[Math.min(run.step, 2)])}</b><small>${Math.min(run.step, 3)} / 3</small></div>${["queued", "running"].includes(run.status) ? '<button type="button" data-investment-action="cancel">Stop search</button>' : ""}<p>${escape(run.error || "Uses the published catalogue only. You can use other tools while this runs; return here to see the result.")}</p>`;
    const results = current?.results;
    $("#investmentResults").hidden = !results || Boolean(current?.selected || current?.profileIntake) || run?.status !== "completed";
    if (results) $("#investmentResults").innerHTML = `<header><p class="eyebrow">${results.coverage.current} CURRENT RECORDS / ${results.coverage.sources.length} PUBLISHED SOURCES</p><h2>${results.candidates.length ? "Worth a closer look" : "No supported match yet"}</h2><p>${escape(results.message)}</p></header><div class="assistant-shortlist">${results.candidates.map(candidate => `<article class="assistant-candidate"><span class="status-pill">INVESTIGATE</span><h3>${escape(candidate.projectName)}</h3><p>${escape(candidate.area)} / ${escape(candidate.propertyType.replaceAll("_", " "))}</p><strong>${cash(candidate.askingPrice)}</strong><small>Asking price / checked ${candidate.observedAt.slice(0, 10)}</small><p>${escape(candidate.reasons[0])}</p><p class="candidate-gap">${escape(candidate.gaps[0])}</p><details><summary>Evidence &amp; contrary case</summary><p>${escape(candidate.counterCase)}</p><ul>${candidate.gaps.map(gap => `<li>${escape(gap)}</li>`).join("")}</ul><a href="${escape(candidate.sourceUrl)}" target="_blank" rel="noopener noreferrer">Original listing</a>${candidate.facts.map(fact => `<p><a href="${escape(fact.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(fact.kind.replaceAll("_", " "))}</a> / ${fact.observedAt.slice(0, 10)} / ${escape(fact.verification.replaceAll("_", " "))}<br>${escape(fact.description)}</p>`).join("")}</details><button type="button" class="primary-button" data-investment-select="${escape(candidate.id)}">Investigate this property</button></article>`).join("")}</div><details><summary>Search coverage and exclusions</summary><p>${escape(results.rankingBasis)}</p><p>${Object.entries(results.excluded).map(([key, value]) => `${escape(key)}: ${value}`).join(" / ")}</p><p>${escape(results.coverage.limit)}</p><p>${results.coverage.sources.map(source => `${escape(source.name)}: ${escape(source.coverage || "Coverage not specified")}`).join("<br>")}</p></details>`;
    renderProperty();
    renderFinance();
    files.render(current, status);
  }
  function renderFinance() {
    const pane = $("#investmentFinance"), intake = current?.profileIntake;
    pane.hidden = !intake;
    $("#investmentProfileStart").hidden = Boolean(intake);
    $("#investmentProfileStart").textContent = current?.working?.financialProfile && Object.keys(current.working.financialProfile).length ? "Review my buying power" : "Check my buying power";
    $("#investmentInput").placeholder = intake ? "Your answer, or skip..." : "Find a rental property in Penang that fits my situation...";
    if (!intake) return;
    pane.innerHTML = `<header><b>Your financial draft</b><small>${intake.answered} / 4 answered</small></header><p class="assistant-caption">Saved figures stay unchanged until you confirm. Skipped fields replace earlier figures with unknowns. This intake uses no AI provider.</p>
      <details ${intake.pending ? "" : "open"}><summary>Review figures</summary><dl>${intake.rows.map(row => `<div><dt>${escape(row.label)}</dt><dd>${row.state === "pending" ? "Not answered" : row.state === "skipped" ? "Unknown / skipped" : row.key === "cashReserveMonths" ? `${escape(row.value)} months` : cash(Number(row.value))}</dd></div>`).join("")}</dl></details>
      ${intake.stale ? '<p class="error-note" role="status">Saved inputs changed while this draft was open. Restart the conversation to review the current version. Nothing has been overwritten.</p>' : ""}
      <div class="assistant-finance-actions">${intake.pending ? '<button type="button" data-profile-action="skip">Skip this question</button>' : `<button type="button" class="primary-button" data-profile-action="confirm" ${!intake.canConfirm || intake.stale ? "disabled" : ""}>Confirm &amp; save profile</button>`}<button type="button" data-profile-action="restart">Start these questions again</button><button type="button" data-profile-action="cancel">Cancel intake</button></div><details><summary>How to correct a figure</summary><p class="assistant-caption">Use the chat with labels, for example: net income 8000; debt repayments 1500; purchase cash 60k; reserve 6 months. Reserve means essential expenses after the purchase, not salary. To remove a draft answer, restart and skip that question.</p></details>`;
  }
  function renderProperty() {
    const pane = $("#investmentProperty"), property = current?.selected;
    pane.hidden = !property || Boolean(current?.profileIntake);
    if (pane.hidden) return;
    const tasks = current.tasks.filter(task => task.id.startsWith(current.stage + ":"));
    const next = tasks.find(task => task.status !== "done");
    pane.innerHTML = `<header><p class="eyebrow">ONE PROPERTY / A CONTINUING INVESTIGATION</p><h2>${escape(property.projectName)}</h2><p>${escape(labels[current.stage])} / ${escape(property.area)}</p><button type="button" class="secondary-button" data-investment-action="numbers">Open the valuation tools</button></header>
      <p id="investmentSyncNotice" class="assistant-caption" role="status"></p><div id="investmentSyncActions" hidden><details><summary>Review the differences</summary><div id="investmentSyncDiff"></div></details><button type="button" data-investment-action="retry-sync">Retry saving</button><button type="button" data-investment-action="download-context">Export unsaved inputs</button><button type="button" data-investment-action="keep-context">Keep my tool edits</button><button type="button" data-investment-action="reload-context">Use the saved inputs</button></div>
      ${current.working ? `<details><summary>Working assumptions / saved ${current.working.updatedAt.slice(0, 10)}</summary><p>Tool edits are private user-declared inputs. They do not change the original listing snapshot or prove the claims.</p><p>Working price: ${escape(current.working.dealCard.askingPrice || "Not provided")} / Working rent: ${escape(current.working.dealCard.expectedRent || "Not provided")} / Income: ${escape(current.working.financialProfile.monthlyIncome || "Not provided")}</p></details>` : ""}
      ${current.sourceStatus && current.sourceStatus.status !== "current" ? `<p class="candidate-gap" role="status">${escape(current.sourceStatus.note)}</p>` : ""}
      ${next ? `<section class="assistant-next"><small>NEXT USEFUL ACTION</small><h3>${escape(next.title)}</h3><p>${escape(next.prompt)}</p><form id="investmentTaskForm"><input type="hidden" name="taskId" value="${escape(next.id)}"><label>What did you check?<textarea name="note" required minlength="12" maxlength="1500" placeholder="Your observation, document or professional feedback"></textarea></label><div class="assistant-field-grid"><label>Date checked<input type="date" name="checkedAt" required max="${date()}" value="${date()}"></label><label>Source link (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label></div><button type="submit" class="primary-button">Record this check</button><p class="assistant-caption">Recorded as your declaration, not independent verification.</p></form></section>` : '<p class="assistant-next">Your checks for this stage are recorded. Review unresolved risks before making a commitment.</p>'}
      <details><summary>All checks and evidence</summary>${current.tasks.map(task => `<p><b>${escape(task.title)}</b> / ${escape(task.status)}<br>${escape(task.note || "Not yet recorded")}${task.status === "done" ? `<br><button type="button" data-reopen-task="${escape(task.id)}">Reopen check</button>` : ""}</p>`).join("")}<form id="investmentEvidenceForm"><label>Add a private observation<textarea name="note" required minlength="12" maxlength="2000"></textarea></label><label>Date<input type="date" name="checkedAt" required max="${date()}" value="${date()}"></label><label>Source (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label><button type="submit">Keep this evidence</button></form>${current.evidence.map(item => `<p>${escape(item.note)}<br><small>${item.checkedAt.slice(0, 10)} / user declared</small></p>`).join("")}</details>
      <details><summary>Move to another ownership stage</summary><form id="investmentStageForm"><label>Current situation<select name="stage">${Object.entries(labels).slice(5).map(([key, value]) => `<option value="${key}" ${key === current.stage ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>What changed, and what remains unresolved?<textarea name="note" required minlength="12" maxlength="1000"></textarea></label><button type="submit">Update my stage</button><p class="assistant-caption">This records your progress, not approval to transact. Apex does not sign, pay, book or contact anyone automatically.</p></form></details>
      <details><summary>Actual rental and holding outcomes</summary><form id="investmentOutcomeForm"><div class="assistant-field-grid"><label>Month<input name="month" type="month" required max="${date().slice(0, 7)}" value="${date().slice(0, 7)}"></label><label>Rent received (RM)<input name="rentReceived" type="number" step="0.01" min="0" required></label><label>All monthly outgoings (RM)<input name="totalCosts" type="number" step="0.01" min="0" required></label><label>Notes<input name="note" maxlength="1000" placeholder="Vacancy, repairs, loan and recurring charges"></label></div><button type="submit">Record actual outcome</button></form>${current.outcomes.map(outcome => `<p>${escape(outcome.month)} / ${cash(outcome.cashFlow)} cash flow<br>${escape(outcome.note)}</p>`).join("")}</details>
      <details><summary>Decision history</summary>${current.events.slice().reverse().map(event => `<p>${escape(event.description)}<br><small>${event.at.slice(0, 10)}</small></p>`).join("")}</details>`;
    renderSyncNotice();
  }
  function renderSyncNotice() {
    const node = $("#investmentSyncNotice"); if (!node) return;
    const state = syncStates.get(current?.id);
    const issue = state && ["conflict", "unsaved"].includes(state.value);
    node.textContent = issue ? `${state.value === "conflict" ? "Working inputs changed elsewhere." : "Tool edits are not saved to the investigation."} ${state.error} Your local copy remains in the tools; export it before choosing the saved version.` : state && ["pending", "saving"].includes(state.value) ? "Saving working inputs to this investigation..." : current?.working ? "The assistant and tools use the same saved working inputs." : "The original source snapshot is preserved when you edit assumptions in the tools.";
    $("#investmentSyncActions").hidden = !issue;
    if (issue) {
      const local = sync.pending(current.id), saved = current.toolContext || {};
      $("#investmentSyncDiff").innerHTML = local ? Object.keys(local).flatMap(scope => Array.from(new Set([...Object.keys(local[scope] || {}), ...Object.keys(saved[scope] || {})])).filter(key => JSON.stringify(local[scope]?.[key]) !== JSON.stringify(saved[scope]?.[key])).map(key => `<p><b>${escape(key.replace(/([A-Z])/g, " $1"))}</b><br>Your tool edit: ${escape(typeof local[scope]?.[key] === "object" ? JSON.stringify(local[scope][key]) : local[scope]?.[key] ?? "Not provided")}<br>Saved: ${escape(typeof saved[scope]?.[key] === "object" ? JSON.stringify(saved[scope][key]) : saved[scope]?.[key] ?? "Not provided")}</p>`)).join("") : "No pending tool copy is available.";
    }
  }
  async function load(id) { const epoch = generation, result = await request(`/api/assistant/cases/${id}`); if (epoch !== generation) return; current = result.case; editing = false; render(); }
  async function action(name, body = {}) {
    if (!current) return;
    if (sync.hasPending(current.id)) { await sync.flush(current.id); await load(current.id); }
    const epoch = generation, id = current.id;
    const response = await request(`/api/assistant/cases/${id}/${name}`, { ...body, revision: current.revision });
    if (epoch !== generation || current?.id !== id) return;
    current = response.case; render();
    if (name === "message" || name === "profile") $("#investmentMessages").scrollTop = $("#investmentMessages").scrollHeight;
    if (name === "profile" && body.action === "confirm") { sync.accept(current); if (current.selected) useProperty(current, { replace: true }); }
  }
  async function safely(work) {
    if (busy) return;
    lock(true); $("#investmentError").textContent = "";
    try { await work(); await refreshList(); }
    catch (error) { showError(error); if (error.status === 409 && current) await load(current.id).catch(showError); }
    finally { lock(false); schedule(); }
  }
  function schedule() {
    clearTimeout(timer);
    if (!current?.job || !["queued", "running"].includes(current.job.status)) return;
    timer = setTimeout(() => {
      if (busy) { schedule(); return; }
      void safely(() => status?.backgroundMode === "server" ? load(current.id) : action("step", { jobId: current.job.id }));
    }, status?.backgroundMode === "server" ? 1800 : 650);
  }
  async function create() { const epoch = generation, result = await request("/api/assistant/cases", {}); if (epoch !== generation) return; current = result.case; editing = false; render(); }
  async function refresh() {
    generation++; clearTimeout(timer); sync.reset(); syncStates.clear(); for (const controller of requestControllers) controller.abort(); current = null; render();
    const epoch = generation, result = await request("/api/assistant/status");
    if (epoch !== generation) return;
    status = result;
    renderCleanup(status.files?.pendingDeletes || 0);
    $("#investmentStorage").textContent = status.storageNotice;
    $("#investmentModel").textContent = status.llm ? "AI available / opt in to use" : "Framework mode / AI not configured";
    $("#investmentAi").checked = false; $("#investmentAi").disabled = !status.llm;
    $("#investmentCoverage").textContent = `${status.coverage.current} current records from ${status.coverage.sources.length} published sources. ${status.coverage.limit} ${status.background}`;
    $("#investmentAdopt").hidden = !status.guestDraftAvailable;
    await refreshList();
    if (cases.length) { await load(cases[0].id); schedule(); }
  }
  $("#investmentComposer").addEventListener("submit", event => { event.preventDefault(); const input = $("#investmentInput"), value = input.value.trim(); if (!value) return; void safely(async () => { if (!current) await create(); await action("message", { message: value, allowAi: $("#investmentAi").checked, editBrief: editing }); input.value = ""; }); });
  host.addEventListener("submit", event => {
    const id = event.target.id;
    const route = { investmentBriefForm: "confirm", investmentTaskForm: "task", investmentStageForm: "stage", investmentOutcomeForm: "outcome", investmentEvidenceForm: "evidence" }[id];
    if (!route) return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.target));
    void safely(async () => { await action(route, route === "confirm" ? { brief: { ...current.brief, ...values } } : { ...values, ...(route === "task" ? { status: "done" } : {}) }); editing = false; render(); });
  });
  host.addEventListener("click", event => {
    const button = event.target.closest("button"); if (!button) return;
    if (button.dataset.profileAction) void safely(async () => { await action("profile", { action: button.dataset.profileAction }); if (current.profileIntake?.pending) $("#investmentInput").focus(); });
    if (button.dataset.investmentSelect) void safely(async () => { await action("select", { listingId: button.dataset.investmentSelect }); useProperty(current); });
    if (button.dataset.investmentAction === "cancel") void safely(() => action("cancel", { jobId: current.job.id }));
    if (button.dataset.investmentAction === "numbers") { if (useProperty(current) !== false) void openTool("valuation"); }
    if (button.dataset.investmentAction === "retry-sync") void safely(async () => { await sync.flush(current.id); await load(current.id); });
    if (button.dataset.investmentAction === "keep-context") {
      if (button.dataset.confirm !== current.id) { button.dataset.confirm = current.id; button.textContent = "Confirm: replace saved assumptions with my tool edits"; return; }
      void safely(async () => { await sync.keepLocal(current); await load(current.id); useProperty(current, { replace: true }); });
    }
    if (button.dataset.investmentAction === "download-context") {
      const pending = sync.pending(current.id); if (!pending) return;
      const url = URL.createObjectURL(new Blob([JSON.stringify({ format: "apex-unsaved-context.v1", investigationId: current.id, context: pending }, null, 2)], { type: "application/json" }));
      const link = document.createElement("a"); link.href = url; link.download = `apex-unsaved-inputs-${date()}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    if (button.dataset.investmentAction === "reload-context") {
      if (button.dataset.confirm !== current.id) { button.dataset.confirm = current.id; button.textContent = "Confirm: replace local tool edits with saved inputs"; return; }
      void safely(async () => { await load(current.id); sync.accept(current); useProperty(current, { replace: true }); });
    }
    if (button.dataset.reopenTask) void safely(() => action("task", { taskId: button.dataset.reopenTask, status: "open" }));
  });
  $("#investmentNew").addEventListener("click", () => void safely(create));
  $("#investmentProfileStart").addEventListener("click", () => void safely(async () => { if (!current) await create(); await action("profile", { action: "start" }); $("#investmentInput").focus(); }));
  $("#investmentCaseSelect").addEventListener("change", event => void safely(() => load(event.target.value)));
  $("#investmentAccount").addEventListener("click", () => void openTool("account"));
  $("#investmentCleanup").addEventListener("click", () => void safely(async () => { const result = await request("/api/assistant/cleanup", {}); renderCleanup(result.pendingFileDeletes); }));
  $("#investmentAdopt").addEventListener("click", () => void safely(async () => { await request("/api/assistant/adopt", {}); await refresh(); }));
  $("#investmentExport").addEventListener("click", () => {
    if (!current) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify({ format: "apex-investigation.v1", exportedAt: new Date().toISOString(), case: current }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `apex-investigation-${date()}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (current.attachments?.length) notify("JSON export includes file notes and extraction, not the original bytes. Download originals individually from Private evidence.");
  });
  $("#investmentDelete").addEventListener("click", event => {
    if (!current || busy) return;
    if (event.target.dataset.confirm !== current.id) { event.target.dataset.confirm = current.id; event.target.textContent = "Confirm delete: chat, evidence, outcomes and linked tool inputs"; return; }
    void safely(async () => { const id = current.id; const result = await request(`/api/assistant/cases/${id}`, null, "DELETE"); sync.forget(id); onInvestigationDeleted?.(id); current = null; render(); renderCleanup(result.pendingFileDeletes); event.target.textContent = "Delete this investigation"; event.target.dataset.confirm = ""; });
  });
  let recognition;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  $("#investmentVoice").hidden = !Recognition;
  $("#investmentVoice").addEventListener("click", () => {
    if (recognition) { recognition.stop(); return; }
    recognition = new Recognition(); recognition.lang = "en-MY";
    recognition.onresult = event => { $("#investmentInput").value = Array.from(event.results).map(result => result[0].transcript).join(" "); };
    recognition.onerror = () => showError(new Error("Voice input is unavailable. You can type your message instead."));
    recognition.onend = () => { recognition = null; $("#investmentVoice").textContent = "Speak"; };
    recognition.start(); $("#investmentVoice").textContent = "Stop listening";
  });
  document.addEventListener("apex:auth", () => { recognition?.stop(); void refresh().catch(showError); });
  void refresh().catch(showError);
  return {
    holdContext(candidate, investigation) { sync.hold(candidate.investigationId, investigation.working?.revision || 0, candidate); },
    queueContext(candidate) {
      if (!candidate?.investigationId) return;
      sync.register(candidate.investigationId, candidate.assistantRevision || 0, candidate.assistantSynced || {});
      sync.queue(candidate.investigationId, candidate.assistantRevision || 0, contextOf(candidate));
    },
    async prepareTools(candidate) {
      if (!candidate?.investigationId) return;
      const epoch = generation;
      sync.register(candidate.investigationId, candidate.assistantRevision || 0, candidate.assistantSynced || {});
      if (candidate.assistantPending || sync.hasPending(candidate.investigationId)) {
        sync.queue(candidate.investigationId, candidate.assistantRevision || 0, contextOf(candidate));
        try { await sync.flush(candidate.investigationId); } catch { return; }
      }
      try {
        const result = await request(`/api/assistant/cases/${candidate.investigationId}`);
        if (epoch !== generation) return;
        if (!candidate.assistantSynced && JSON.stringify(contextOf(candidate)) !== JSON.stringify(contextOf(result.case.toolContext))) { sync.hold(candidate.investigationId, result.case.working?.revision || 0, candidate); return; }
        if (!sync.hasPending(candidate.investigationId)) { sync.accept(result.case); useProperty(result.case, { replace: true }); }
      } catch (error) { if (epoch === generation) { onContextState?.(candidate.investigationId, "unsaved", error); notify("Could not refresh this investigation. The tools retain this browser's copy; do not treat it as the latest saved version."); } }
    },
    async resume(id) {
      if (id) {
        try { await sync.flush(id); } catch (error) { showError(error); }
        try { await load(id); } catch (error) { showError(error); }
      } else if (current) await load(current.id).catch(showError);
      this.show(); schedule();
    },
    show() { host.hidden = false; document.body.classList.add("assistant-active"); document.body.classList.remove("workspace-active"); $("#workbench").hidden = true; document.querySelectorAll("[data-area]").forEach(button => button.setAttribute("aria-current", button.dataset.area === "assistant" ? "page" : "false")); history.replaceState(null, "", "#assistant"); },
    hide() { host.hidden = true; document.body.classList.remove("assistant-active"); recognition?.stop(); }
  };
}

export function installCataloguePanel(host) {
  host.querySelector("#workspacePanels").insertAdjacentHTML("beforeend", `<section data-surface="catalogue" class="studio-surface" hidden><header><span><small>OWNER ONLY</small><b>Published discovery sources</b></span></header><p>Publish only records you are permitted to redistribute. This catalogue is separate from private evidence and the founder's 407 answers.</p><form id="catalogueForm"><label>Owner token<input id="catalogueToken" type="password" autocomplete="off"></label><label>Permitted source export (JSON)<input id="catalogueFile" type="file" accept=".json,application/json"></label><p>A complete import replaces that source's earlier records, so withdrawn listings do not remain active.</p><button type="submit" class="primary-button">Validate &amp; publish source</button><button type="button" id="catalogueRefresh">Refresh coverage</button><a href="/assistant/catalogue-template.json" download>Download an empty import template</a></form><p id="catalogueMessage" role="status"></p><div id="catalogueSources"></div></section>`);
  async function request(method = "GET", body) {
    const response = await fetch("/api/owner/discovery", { method, headers: { "content-type": "application/json", "x-estatelab-owner-token": $("#catalogueToken").value || $("#ownerIntelToken")?.value || "" }, body: body ? JSON.stringify(body) : undefined });
    const result = await response.json(); if (!response.ok) throw new Error(result.error || "Catalogue request failed."); return result;
  }
  async function refresh() {
    const result = await request();
    $("#catalogueSources").innerHTML = `<p>${result.coverage.current} current listings / ${result.coverage.records} total records.</p>${result.sources.map(source => `<article><h3>${escape(source.name)}</h3><p>${escape(source.coverage)} / ${escape(source.permission)}</p><p>${escape(source.permissionReference)}</p><button type="button" data-unpublish="${escape(source.id)}">Unpublish this source</button></article>`).join("")}`;
  }
  $("#catalogueRefresh").addEventListener("click", () => void refresh().catch(error => { $("#catalogueMessage").textContent = error.message; }));
  $("#catalogueForm").addEventListener("submit", async event => {
    event.preventDefault(); const file = $("#catalogueFile").files[0], button = event.target.querySelector('[type="submit"]'); button.disabled = true;
    try { if (!file || file.size > 4 * 1024 * 1024) throw new Error("Choose a JSON source export under 4 MB."); const result = await request("POST", JSON.parse(await file.text())); $("#catalogueMessage").textContent = `Published ${result.imported} records. Import validates structure, not the truth of source claims.`; await refresh(); }
    catch (error) { $("#catalogueMessage").textContent = error.message; }
    finally { button.disabled = false; }
  });
  $("#catalogueSources").addEventListener("click", async event => {
    const button = event.target.closest("[data-unpublish]"); if (!button) return;
    if (button.dataset.confirm !== "true") { button.dataset.confirm = "true"; button.textContent = "Confirm unpublish"; return; }
    try { await request("DELETE", { sourceId: button.dataset.unpublish }); await refresh(); } catch (error) { $("#catalogueMessage").textContent = error.message; }
  });
}
