import { malaysiaDate } from "../../assistant-calendar.js";

const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const cash = value => value == null ? "Unknown" : new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" }).format(value);
const month = () => malaysiaDate().slice(0, 7);
const notes = (name, label, placeholder = "") => `<label>${label}<textarea name="${name}" required minlength="12" maxlength="${name === "scope" ? 300 : 1500}" placeholder="${placeholder}"></textarea></label>`;
const consent = (name, label) => `<label class="assistant-consent"><input type="checkbox" name="${name}" required>${label}</label>`;
const proposalFields = () => notes("claim", "Proposed lesson", "Remove names, addresses, tenant details and private financial figures") + notes("scope", "Where might this apply?", "Keep the claim narrow; one case is not a market rule") + notes("evidenceFor", "Evidence that supports it", "Only information you have permission to share") + notes("evidenceAgainst", "Contrary evidence or limitations") + notes("falsifier", "What would disprove it?");

export function createLearningView(host, { run, clearError }) {
  let item, status, caseId = "", mode = "lock", preview = null, pending = false;
  const drafts = new Map();
  const baseline = () => JSON.stringify({ learning: item.learning, outcomes: item.outcomes, working: item.toolContext, stage: item.stage });
  const values = form => Object.fromEntries(new FormData(form));
  async function send(route, body, key) {
    if (pending) return;
    pending = true; view.render(item, status);
    try { await run(route, body, key); }
    finally { pending = false; view.render(item, status); }
  }
  host.addEventListener("input", event => {
    const form = event.target.closest("[data-learning-form]"); if (!form) return;
    const key = form.dataset.learningForm;
    drafts.set(key, { values: values(form), revision: Number(form.dataset.revision), baseline: drafts.get(key)?.baseline || baseline() });
    if (key === "review" && ["thesisId", "throughMonth"].includes(event.target.name)) {
      preview = null;
      form.querySelector('[name="confirmReview"]')?.closest("label").remove();
      form.querySelector('[data-learning-save-review]')?.remove();
      form.querySelector(".learning-comparison")?.remove();
    }
  });
  host.addEventListener("click", event => {
    const button = event.target.closest("[data-learning-mode], [data-learning-resolve], [data-learning-withdraw]"); if (!button) return;
    if (pending) return;
    if (button.dataset.learningMode) { mode = button.dataset.learningMode; view.render(item, status); return; }
    if (button.dataset.confirm !== "yes") { button.dataset.confirm = "yes"; button.textContent = button.dataset.learningWithdraw ? "Confirm withdrawal" : button.dataset.learningResolve === "discard" ? "Confirm discard unsaved draft" : "Confirm re-review draft against the latest saved record"; return; }
    if (button.dataset.learningWithdraw) { void send("learning", { action: "withdraw", proposalId: button.dataset.learningWithdraw, revision: item.revision }, "withdraw"); return; }
    const key = button.dataset.key, draft = drafts.get(key);
    if (button.dataset.learningResolve === "discard") drafts.delete(key);
    else if (draft) {
      draft.baseline = baseline(); draft.revision = item.revision;
      for (const name of Object.keys(draft.values)) if (name.startsWith("confirm") || name.startsWith("consent")) delete draft.values[name];
    }
    preview = null; view.render(item, status); clearError?.();
  });
  host.addEventListener("submit", event => {
    const form = event.target.closest("[data-learning-form]"); if (!form) return;
    event.preventDefault(); event.stopPropagation();
    if (pending) return;
    const key = form.dataset.learningForm, fields = values(form), revision = Number(form.dataset.revision);
    drafts.set(key, { values: fields, revision, baseline: drafts.get(key)?.baseline || baseline() });
    const intent = event.submitter?.dataset.learningIntent;
    const body = { ...fields, revision, action: key, confirmLock: fields.confirmLock === "on", confirmReview: fields.confirmReview === "on", consentShare: fields.consentShare === "on" };
    if (key === "review") {
      if (intent === "preview") { body.action = "preview"; void send("learning", body, "preview"); return; }
      body.previewHash = preview?.comparison.previewHash;
    }
    if (key === "share") body.submission = Object.fromEntries(["claim", "scope", "evidenceFor", "evidenceAgainst", "falsifier"].map(name => [name, fields[name]]));
    void send(key === "outcome" ? "outcome" : "learning", body, key);
  });
  function comparison(value) {
    return `<section class="learning-comparison" aria-label="Recorded outcome comparison"><h4>Compare before concluding</h4><p>${escape(value.startMonth)} to ${escape(value.throughMonth)} / ${value.recordedMonths} recorded month(s)</p><dl><div><dt>Rent received</dt><dd>${cash(value.actualRent)}</dd></div><div><dt>Declared outgoings</dt><dd>${cash(value.actualCosts)}</dd></div><div><dt>Actual cash flow</dt><dd>${cash(value.actualCashFlow)}</dd></div><div><dt>Expected cash flow for those same months</dt><dd>${cash(value.expectedCashFlow)}</dd></div><div><dt>Actual minus expected</dt><dd>${cash(value.cashFlowGap)}</dd></div></dl><p>Missing months: ${escape(value.missingMonths.join(", ") || "None")}. Missing is not zero.</p>${value.includesCurrentMonth ? '<p class="candidate-gap">Includes the current month; it may be incomplete.</p>' : ""}<p class="assistant-caption">${escape(value.boundary)}</p></section>`;
  }
  function formBody(state) {
    if (mode === "lock") return `<h3>Record the thesis before seeing the result</h3><p class="assistant-caption">Earlier versions stay unchanged. A record entered after purchase or with past outcomes is labelled retrospective, not a prediction.</p>${notes("claim", "Why this property?", "The demand, holding plan and exit you expect")}${notes("counterCase", "Strongest reason you could be wrong")}${notes("falsifier", "What evidence would make you change course?")}<div class="assistant-field-grid"><label>Start month<input name="startMonth" type="month" required value="${month()}"></label><label>Expected monthly rent (RM, optional)<input name="expectedMonthlyRent" type="number" min="0" max="10000000" step="0.01"></label><label>Expected monthly outgoings (RM, optional)<input name="expectedMonthlyCosts" type="number" min="0" max="10000000" step="0.01"></label></div><p class="assistant-caption">Include loan payments, recurring charges and your repair allowance. Leave unknown amounts blank; this is cash flow, not yield.</p>${consent("confirmLock", "Keep this version and its saved working inputs unchanged, with today's actual recording time.")}<button type="submit">Lock thesis v${state.theses.length + 1}</button>`;
    if (mode === "outcome") return `<h3>Actual rental and holding outcomes</h3><p class="assistant-caption">Recording an existing month corrects it. Earlier review snapshots remain unchanged and will be flagged as outdated.</p><div class="assistant-field-grid"><label>Month<input name="month" type="month" required max="${month()}" value="${month()}"></label><label>Rent received (RM)<input name="rentReceived" type="number" step="0.01" min="0" required></label><label>All monthly outgoings (RM)<input name="totalCosts" type="number" step="0.01" min="0" required></label><label>Notes<input name="note" maxlength="1000" placeholder="Vacancy, repairs, loan and recurring charges"></label></div><button type="submit">Record actual outcome</button>`;
    if (mode === "review") return `<h3>What did the result teach you?</h3>${state.theses.length ? `<div class="assistant-field-grid"><label>Locked thesis<select name="thesisId" required>${state.theses.slice().reverse().map(row => `<option value="${row.id}">v${row.version} / ${escape(row.lockedAt.slice(0, 10))}${row.retrospective ? " / retrospective" : ""}</option>`).join("")}</select></label><label>Review through<input name="throughMonth" type="month" max="${month()}" required value="${month()}"></label></div><button type="submit" data-learning-intent="preview" formnovalidate>Compare recorded months</button>${preview ? comparison(preview.comparison) : '<p class="assistant-caption">Compare first. You can then record what happened and challenge the explanation.</p>'}${notes("conclusion", "What happened compared with the thesis?")}${notes("alternative", "Could luck, timing or execution explain the result?")}${notes("lesson", "What is the limited lesson, not a universal rule?")}${notes("nextEvidence", "What evidence would test this lesson next?")}${preview?.comparison.recordedMonths ? `${consent("confirmReview", "I reviewed the actual amounts, missing months and alternative explanation.")}<button type="submit" data-learning-save-review>Save private review</button>` : ""}` : '<p>Lock a dated thesis and record at least one monthly outcome first.</p>'}`;
    return `<h3>Propose a lesson to the owner</h3><p class="assistant-caption">Optional. Only the text below is submitted. Do not include identities, unit addresses, confidential documents or private financial details. The owner cannot open your case from this queue. Approved public text can remain after you delete the private case.</p>${!status?.authenticated ? '<p>Sign in and explicitly import this investigation before submitting a lesson.</p>' : state.reviews.length ? `<label>Private review<select name="reviewId" required>${state.reviews.slice().reverse().map(row => `<option value="${row.id}" ${row.outcomesChanged ? "disabled" : ""}>Review v${row.version}${row.outcomesChanged ? " / outcomes changed; re-review first" : ""}</option>`).join("")}</select></label>${proposalFields()}${consent("consentShare", "Share only my edited proposal text with the owner for review and possible publication as a separate hypothesis.")}<button type="submit">Submit for owner review</button>` : '<p>Save a private outcome review first.</p>'}`;
  }
  const view = {
    accept(key, result) {
      if (key === "preview") { preview = { comparison: result.comparison, thesisId: result.thesisId }; return; }
      drafts.delete(key); preview = null;
    },
    render(next, nextStatus) {
      item = next; status = nextStatus;
      if (!item?.selected) { caseId = ""; drafts.clear(); preview = null; return; }
      const state = item.learningView || { theses: [], reviews: [], proposals: [] };
      if (caseId !== item.id) { caseId = item.id; drafts.clear(); preview = null; mode = state.theses.length ? "outcome" : "lock"; }
      const root = host.querySelector("#investmentLearning"); if (!root) return;
      const openIds = [...root.querySelectorAll("details[open][id]")].map(node => node.id);
      const draft = drafts.get(mode), changed = draft && draft.baseline !== baseline();
      if (changed) preview = null;
      root.innerHTML = `<details id="investmentLearningPanel"><summary>Thesis &amp; learning <small>${state.theses.length} thesis / ${state.reviews.length} review</small></summary><p class="assistant-caption">Private case learning. This does not train a model or change the founder framework.</p><nav class="learning-modes" aria-label="Thesis and learning actions">${[["lock", "Thesis"], ["outcome", "Outcomes"], ["review", "Review"], ["share", "Share a lesson"]].map(([key, label]) => `<button type="button" data-learning-mode="${key}" aria-pressed="${mode === key}">${label}</button>`).join("")}</nav>${changed ? `<p role="status">Saved inputs or outcomes changed. Your draft is preserved below. Review the saved history before continuing.</p><button type="button" data-learning-resolve="review" data-key="${mode}">Review my draft</button><button type="button" data-learning-resolve="discard" data-key="${mode}">Discard draft</button>` : ""}<form id="${mode === "outcome" ? "investmentOutcomeForm" : "investmentLearningForm"}" data-learning-form="${mode}" data-revision="${item.revision}">${formBody(state)}</form><details id="investmentLearningHistory"><summary>Saved thesis, actuals &amp; reviews</summary>${state.theses.slice().reverse().map(row => `<article><h4>Thesis v${row.version} / ${row.retrospective ? "Retrospective record" : "User-declared thesis"}</h4><small>Recorded ${escape(row.lockedAt)} / starts ${escape(row.startMonth)}</small><p>${escape(row.claim)}</p><p>Contrary case: ${escape(row.counterCase)}</p><p>Invalidated by: ${escape(row.falsifier)}</p><p>Monthly rent ${cash(row.expectedMonthlyRent)} / outgoings ${cash(row.expectedMonthlyCosts)}</p></article>`).join("")}${item.outcomes.map(row => `<p>${escape(row.month)} / rent ${cash(row.rentReceived)} / costs ${cash(row.totalCosts)} / cash flow ${cash(row.cashFlow)}<br>${escape(row.note)}</p>`).join("")}${state.reviews.slice().reverse().map(row => `<article><h4>Private review v${row.version}</h4>${row.outcomesChanged ? '<p class="candidate-gap">Outcomes changed after this review. Preserve it as history, not current evidence.</p>' : ""}<p>${escape(row.conclusion)}</p><p>Alternative: ${escape(row.alternative)}</p><p>Lesson: ${escape(row.lesson)}</p><p>Next evidence: ${escape(row.nextEvidence)}</p>${comparison(row.comparison)}</article>`).join("") || '<p>No saved review yet.</p>'}</details>${state.proposals.length ? `<details id="investmentLearningReceipts"><summary>Shared proposal receipts</summary>${state.proposals.map(row => `<article><b>${escape(row.status)}</b><p>${escape(row.submission?.claim || row.decision?.publication?.claim || "Submitted text removed")}</p>${row.decision ? `<p>Owner: ${escape(row.decision.note)}</p>` : ""}${row.status === "pending" ? `<button type="button" data-learning-withdraw="${row.id}">Withdraw pending proposal</button>` : ""}</article>`).join("")}</details>` : ""}</details>`;
      const form = root.querySelector("[data-learning-form]");
      if (draft) {
        if (!changed) draft.revision = item.revision;
        form.dataset.revision = draft.revision;
        for (const element of form.elements) if (element.name && Object.hasOwn(draft.values, element.name)) {
          if (element.type === "checkbox") element.checked = !changed && draft.values[element.name] === "on";
          else element.value = draft.values[element.name];
        }
      }
      if (changed) for (const button of form.querySelectorAll('button[type="submit"]')) button.disabled = true;
      if (pending) for (const element of root.querySelectorAll("button, input, textarea, select")) element.disabled = true;
      for (const id of openIds) { const details = root.querySelector(`#${id}`); if (details) details.open = true; }
    }
  };
  return view;
}
