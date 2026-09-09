import { malaysiaDate } from "../../assistant-calendar.js";
const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const stages = { site_visit: "Site visit", transaction: "Transaction", handover: "Handover", rental: "Rental", review: "Holding review" };
const date = malaysiaDate;

export function createMilestonesView(host, { run, clearError }) {
  let item, status, caseId = "", selectedId = "", filter = "", signature = "", stage = "";
  const drafts = new Map();
  const snapshot = () => JSON.stringify(item.tasks);
  function values(form) { const data = new FormData(form); return { ...Object.fromEntries(data), dependsOn: data.getAll("dependsOn") }; }
  host.addEventListener("input", event => {
    const form = event.target.closest("[data-milestone-form]"); if (!form) return;
    const key = form.dataset.milestoneForm;
    drafts.set(key, { values: values(form), revision: Number(form.dataset.revision), baseline: drafts.get(key)?.baseline || snapshot() });
  });
  host.addEventListener("change", event => {
    if (event.target.id === "investmentPlanStage") { filter = event.target.value; signature = ""; view.render(item, status); }
    if (event.target.name === "suggestion" && event.target.value) {
      const [stage, index] = event.target.value.split(":"), suggestion = status?.actionSuggestions?.[stage]?.[Number(index)], form = event.target.form;
      if (!suggestion) return;
      if (form.elements.title.value || form.elements.prompt.value) { event.target.value = ""; return; }
      form.elements.stage.value = stage; form.elements.title.value = suggestion[0]; form.elements.prompt.value = suggestion[1]; form.elements.responsibility.value = suggestion[2];
      form.elements.title.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  host.addEventListener("click", event => {
    const button = event.target.closest("[data-milestone-open], [data-milestone-resolve]"); if (!button) return;
    if (button.dataset.milestoneOpen) { selectedId = button.dataset.milestoneOpen; signature = ""; view.render(item, status); host.querySelector("#investmentActions h3")?.focus(); return; }
    if (button.dataset.confirm !== "yes") { button.dataset.confirm = "yes"; button.textContent = button.dataset.milestoneResolve === "saved" ? "Confirm discard this unsaved draft" : "Confirm re-review my draft against the latest record"; return; }
    const key = button.dataset.draftKey, draft = drafts.get(key);
    if (button.dataset.milestoneResolve === "saved") drafts.delete(key);
    else if (draft) { draft.baseline = snapshot(); draft.revision = item.revision; draft.values.confirmDate = ""; }
    signature = ""; view.render(item, status); clearError?.();
  });
  host.addEventListener("submit", event => {
    const form = event.target.closest("[data-milestone-form]"); if (!form) return;
    event.preventDefault(); event.stopPropagation();
    const key = form.dataset.milestoneForm, data = values(form), revision = Number(form.dataset.revision);
    const plan = { responsibility: data.responsibility, contactLabel: data.contactLabel, dueDate: data.dueDate, dateKind: data.dateKind, dateReference: data.dateReference, confirmDate: data.confirmDate === "on", dependsOn: data.dependsOn };
    const body = key.startsWith("check:") ? { taskId: form.dataset.taskId, status: data.status, note: data.note, checkedAt: data.checkedAt, sourceUrl: data.sourceUrl } : key === "add" ? { action: "add", stage: data.stage, title: data.title, prompt: data.prompt, plan } : { action: "plan", taskId: form.dataset.taskId, plan };
    void run(key.startsWith("check:") ? "task" : "milestone", { ...body, revision }, key);
  });
  function planFields(task) {
    const plan = task?.plan || {}, roles = status?.responsibilities || { unassigned: "Not assigned", self: "Me", lawyer: "Lawyer", agent: "Agent", banker: "Banker", management: "Management", contractor: "Contractor", tenant: "Tenant", other: "Other" };
    return `<div class="assistant-field-grid"><label>Responsible person<select name="responsibility">${Object.entries(roles).map(([key, label]) => `<option value="${key}" ${(plan.responsibility || "unassigned") === key ? "selected" : ""}>${escape(label)}</option>`).join("")}</select></label><label>Private name or label (optional)<input name="contactLabel" maxlength="80" value="${escape(plan.contactLabel || "")}" placeholder="No identity numbers or bank details"></label><label>Date (optional)<input name="dueDate" type="date" min="1990-01-01" max="2100-12-31" value="${escape(plan.dueDate || "")}"></label><label>Date basis<select name="dateKind"><option value="target">My planning target</option><option value="confirmed" ${plan.dateKind === "confirmed" ? "selected" : ""}>I checked this date</option></select></label></div><label>Date reference (required for a checked date)<textarea name="dateReference" maxlength="500" placeholder="Document, clause or professional confirmation; include any unresolved conditions">${escape(plan.dateReference || "")}</textarea></label><label class="assistant-consent"><input name="confirmDate" type="checkbox"> For a checked date, I confirmed the exact date and reference myself.</label><details><summary>Prerequisite checks (optional)</summary><p class="assistant-caption">An action cannot be completed while a prerequisite is unresolved. Apex does not infer contractual dependencies.</p>${item.tasks.filter(value => value.id !== task?.id).map(value => `<label class="assistant-consent"><input type="checkbox" name="dependsOn" value="${escape(value.id)}" ${plan.dependsOn?.includes(value.id) ? "checked" : ""}>${escape(stages[value.id.split(":")[0]])}: ${escape(value.title)} (${escape(value.status)})</label>`).join("") || '<p class="assistant-caption">No existing checks yet.</p>'}</details>`;
  }
  function editor(task) {
    if (selectedId === "add") return `<section class="assistant-next"><h3 tabindex="-1">Add an ownership action</h3><form data-milestone-form="add" data-revision="${item.revision}"><label>Start with a suggestion (optional)<select name="suggestion"><option value="">Write my own action</option>${Object.entries(status?.actionSuggestions || {}).map(([stage, entries]) => `<optgroup label="${escape(stages[stage])}">${entries.map(([title], index) => `<option value="${stage}:${index}">${escape(title)}</option>`).join("")}</optgroup>`).join("")}</select></label><p class="assistant-caption">Suggestions fill empty drafts only. Review and adapt them; no date or professional instruction is assumed.</p><label>Stage<select name="stage">${Object.entries(stages).map(([key, label]) => `<option value="${key}" ${key === item.stage ? "selected" : ""}>${label}</option>`).join("")}</select></label><label>Action<input name="title" minlength="4" maxlength="120" required placeholder="e.g. Confirm the actual loan disbursement date"></label><label>What would establish completion?<textarea name="prompt" minlength="12" maxlength="500" required placeholder="Evidence or confirmation needed; no assumed approval"></textarea></label><details><summary>Responsibility, date and prerequisites</summary>${planFields(null)}</details><button type="submit" class="primary-button">Add action</button></form></section>`;
    if (!task) return '<p class="assistant-next">No open check is recorded for this stage. Earlier unresolved actions remain in your plan.</p>';
    const row = item.ownershipPlan.rows.find(value => value.id === task.id), closed = ["done", "cancelled"].includes(task.status);
    return `<section class="assistant-next"><small>${task.id === item.ownershipPlan.nextId ? "NEXT USEFUL ACTION" : "SELECTED ACTION"}</small><h3 tabindex="-1">${escape(task.title)}</h3><p>${escape(task.prompt)}</p><p class="assistant-caption">${escape(stages[row.stage])} / ${escape(row.responsibility)}${row.contactLabel ? ` (${escape(row.contactLabel)})` : ""} / ${row.dueDate ? `${escape(row.dueDate)} (${escape(row.dateKind)}, ${escape(row.timing)})` : "Date not set"}</p>${row.waitingFor.length ? `<p class="candidate-gap">Waiting for: ${row.waitingFor.map(value => escape(value.title)).join(", ")}. Resolve these before recording completion.</p>` : ""}${task.status === "blocked" ? `<p class="candidate-gap">Blocked: ${escape(task.note)}</p>` : ""}
      <form id="investmentTaskForm" data-milestone-form="check:${escape(task.id)}" data-task-id="${escape(task.id)}" data-revision="${item.revision}"><label>Progress<select name="status">${closed ? '<option value="open">Reopen for review</option>' : `<option value="done" ${row.waitingFor.length ? "disabled" : ""}>Checked / complete</option><option value="blocked" ${row.waitingFor.length ? "selected" : ""}>Blocked / waiting</option><option value="open">Keep open</option>${task.custom ? '<option value="cancelled">Cancel this custom action</option>' : ""}`}</select></label><label>${closed ? "Reason to reopen" : "What did you check, or what is blocking progress?"}<textarea name="note" required minlength="12" maxlength="1500" placeholder="Dated observation, document or professional feedback"></textarea></label><div class="assistant-field-grid"><label>Date checked<input type="date" name="checkedAt" required max="${date()}" value="${date()}"></label><label>Source link (optional)<input type="url" name="sourceUrl" placeholder="https://..."></label></div><button type="submit" class="primary-button">${closed ? "Reopen action" : "Record this check"}</button><p class="assistant-caption">Your declaration, not independent verification. No messages or reminders are sent.</p></form>
      ${!closed ? `<details id="investmentTaskPlan"><summary>Responsibility &amp; date</summary><form data-milestone-form="plan:${escape(task.id)}" data-task-id="${escape(task.id)}" data-revision="${item.revision}">${planFields(task)}<button type="submit">Save action plan</button></form></details>` : ""}<details><summary>Saved record &amp; history</summary><p>${escape(task.status)} / ${escape(task.checkedAt?.slice(0, 10) || "No checked date")}<br>${escape(task.note || "No observation yet")}</p>${task.plan?.dateReference ? `<p>Date reference: ${escape(task.plan.dateReference)}</p>` : ""}${[...(task.history || [])].reverse().map(value => `<p>${escape(value.at?.slice(0, 10))}: ${escape(value.status)} / ${escape(value.note)}</p>`).join("")}${[...(task.planHistory || [])].reverse().map(value => `<p>Previous plan: ${escape(value.dueDate || "Undated")} / ${escape(value.responsibility)} / ${escape(value.dateReference)}</p>`).join("")}</details></section>`;
  }
  const view = {
    accept(key) { drafts.delete(key); if (key === "add" || key.startsWith("check:")) selectedId = ""; signature = ""; },
    render(nextItem, nextStatus) {
      item = nextItem; status = nextStatus;
      if (!item?.selected) { caseId = ""; selectedId = ""; signature = ""; drafts.clear(); return; }
      if (caseId !== item.id) { caseId = item.id; selectedId = ""; filter = item.stage; stage = item.stage; signature = ""; drafts.clear(); }
      if (stage !== item.stage) { stage = item.stage; selectedId = ""; filter = item.stage; }
      const root = host.querySelector("#investmentActions"); if (!root) return;
      const task = item.tasks.find(task => task.id === selectedId) || item.tasks.find(task => task.id === item.ownershipPlan.nextId);
      const open = [...root.querySelectorAll("details[open][id]")].map(node => node.id);
      signature = snapshot();
      root.innerHTML = `${item.ownershipPlan.attention.length ? `<div class="assistant-plan-attention"><b>Needs attention</b>${item.ownershipPlan.attention.map(row => `<button type="button" data-milestone-open="${escape(row.id)}">${escape(row.title)} / ${row.blocked ? "waiting" : escape(row.timing)}${row.dueDate ? ` / ${escape(row.dueDate)}` : ""}</button>`).join("")}</div>` : ""}${editor(task)}<details id="investmentActionList"><summary>Action plan / ${item.ownershipPlan.openCount} open</summary><p class="assistant-caption">Plan dates as of ${escape(item.ownershipPlan.asOf)} / Malaysia time. Plans are private; assigning a role does not contact that person. Check legal deadlines with your professional.</p><label>Stage<select id="investmentPlanStage"><option value="all" ${filter === "all" ? "selected" : ""}>All stages</option>${Object.entries(stages).map(([key, label]) => `<option value="${key}" ${filter === key ? "selected" : ""}>${label}</option>`).join("")}</select></label><div class="assistant-plan-list">${item.ownershipPlan.rows.filter(row => filter === "all" || row.stage === filter).map(row => `<button type="button" data-milestone-open="${escape(row.id)}"><b>${escape(row.title)}</b><small>${escape(row.status)} / ${escape(row.responsibility)} / ${escape(row.dueDate || "Undated")}${row.timing === "overdue" ? " / overdue" : ""}</small></button>`).join("") || '<p>No recorded actions in this stage.</p>'}</div><button type="button" data-milestone-open="add">Add an action</button></details>`;
      for (const form of root.querySelectorAll("[data-milestone-form]")) {
        const key = form.dataset.milestoneForm, draft = drafts.get(key); if (!draft) continue;
        const changed = draft.baseline !== signature;
        if (!changed) draft.revision = item.revision;
        form.dataset.revision = draft.revision;
        for (const element of form.elements) if (element.name && Object.hasOwn(draft.values, element.name)) {
          if (element.type === "checkbox") element.checked = element.name === "dependsOn" ? draft.values.dependsOn.includes(element.value) : !changed && draft.values[element.name] === "on";
          else element.value = draft.values[element.name];
        }
        if (changed) form.insertAdjacentHTML("beforebegin", `<p role="status">The action plan changed elsewhere. Your unsaved draft is preserved. Compare it with the saved record before continuing.</p><button type="button" data-milestone-resolve="local" data-draft-key="${escape(key)}">Review my draft</button><button type="button" data-milestone-resolve="saved" data-draft-key="${escape(key)}">Use saved record</button>`);
      }
      for (const id of open) { const details = root.querySelector(`#${id}`); if (details) details.open = true; }
    }
  };
  return view;
}
