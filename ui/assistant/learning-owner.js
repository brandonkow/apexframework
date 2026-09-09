const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const fields = { claim: "Proposed lesson", scope: "Limited scope", evidenceFor: "Supporting evidence", evidenceAgainst: "Contrary evidence / limitations", falsifier: "What would disprove it?" };

export function installLearningOwner(host) {
  const root = host.querySelector("#ownerLearningProposals"), tokenInput = host.querySelector("#ownerIntelToken");
  let proposals = [], busy = false, epoch = 0;
  const drafts = new Map();
  function reset() { epoch++; proposals = []; drafts.clear(); root.innerHTML = ""; root.hidden = true; }
  tokenInput.addEventListener("input", reset);
  host.querySelector("#ownerIntelClearToken").addEventListener("click", reset);
  document.addEventListener("apex:auth", reset);
  function render(message = "") {
    root.hidden = false;
    root.innerHTML = `<h3>Shared lesson proposals</h3><p>Only the contributor's explicitly shared text is shown. Private cases, documents and financial profiles are not included. Check the evidence and remove identifying details before approving.</p><p class="assistant-caption">Approval creates a contested hypothesis, not a founder rule. It remains excluded from answer guidance until you separately confirm it through Belief Review. The 407 founder answers stay unchanged.</p><p role="status">${escape(message)}</p>${proposals.length ? proposals.slice().reverse().map(row => {
      const draft = drafts.get(row.id), stale = draft && draft.revision !== row.revision;
      const text = draft?.values || row.decision?.publication || row.submission || {};
      return `<details data-owner-proposal="${row.id}"><summary>${escape(row.status)} / ${escape(row.submission?.claim || row.decision?.publication?.claim || "Withdrawn")}</summary>${row.sourceChanged ? '<p class="error-note">The underlying review changed or is unavailable. Do not approve; request a new proposal.</p>' : ""}${row.status === "pending" ? `<form data-owner-learning="${row.id}" data-revision="${draft?.revision ?? row.revision}">${stale ? '<p role="status">This proposal changed. Your unsaved text is retained below, but cannot be submitted.</p>' : ""}${Object.entries(fields).map(([key, label]) => `<label>${label}<textarea name="${key}" required minlength="12" maxlength="${key === "scope" ? 300 : 1500}">${escape(text[key])}</textarea></label>`).join("")}<label>Your decision reason<textarea name="note" required minlength="12" maxlength="1000">${escape(text.note)}</textarea></label><label class="assistant-consent"><input type="checkbox" name="confirmPublish"> I checked privacy and permissions; publish only this edited text as a provisional hypothesis.</label><div class="learning-modes"><button type="submit" value="approve" ${stale || row.sourceChanged ? "disabled" : ""}>Approve as hypothesis</button><button type="submit" value="decline" formnovalidate ${stale ? "disabled" : ""}>Decline with reason</button></div></form>` : `<p>${escape(row.decision?.note || "No owner decision recorded")}</p>${draft ? '<p>An unsent local draft exists. It was not applied to this decision.</p><details><summary>Unsent draft for comparison</summary>' + Object.entries(draft.values).filter(([key]) => !key.startsWith("confirm")).map(([key, value]) => `<p>${escape(key)}: ${escape(value)}</p>`).join("") + '</details>' : ""}${Object.entries(fields).map(([key, label]) => `<p><b>${label}</b><br>${escape(text[key])}</p>`).join("")}`}</details>`;
    }).join("") : '<p>No proposals waiting for review.</p>'}`;
  }
  async function request(body) {
    const token = tokenInput.value.trim(); if (!token) throw new Error("Enter your existing owner token above first.");
    const response = await fetch("/api/owner/lessons", { method: body ? "POST" : "GET", headers: { "content-type": "application/json", "x-estatelab-owner-token": token }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(30000) });
    const result = await response.json();
    if (!response.ok) throw Object.assign(new Error(result.error || "Could not review proposals."), { status: response.status });
    return result;
  }
  async function refresh() {
    if (busy) return; busy = true; const generation = epoch;
    try { const result = await request(); if (generation !== epoch) return; proposals = result.proposals; render(); }
    catch (error) { if (generation === epoch) render(error.message); }
    finally { busy = false; }
  }
  host.querySelector("#ownerIntelLessons").addEventListener("click", () => void refresh());
  root.addEventListener("input", event => {
    const form = event.target.closest("[data-owner-learning]"); if (!form) return;
    drafts.set(form.dataset.ownerLearning, { revision: Number(form.dataset.revision), values: Object.fromEntries(new FormData(form)) });
  });
  root.addEventListener("submit", async event => {
    const form = event.target.closest("[data-owner-learning]"); if (!form) return;
    event.preventDefault(); event.stopPropagation(); if (busy) return;
    const values = Object.fromEntries(new FormData(form)), id = form.dataset.ownerLearning, generation = epoch;
    const body = { action: event.submitter?.value, proposalId: id, proposalRevision: Number(form.dataset.revision), note: values.note, confirmPublish: values.confirmPublish === "on", publication: Object.fromEntries(Object.keys(fields).map(key => [key, values[key]])) };
    drafts.set(id, { revision: body.proposalRevision, values }); busy = true;
    for (const element of form.elements) element.disabled = true;
    try {
      const result = await request(body); if (generation !== epoch) return;
      drafts.delete(id); proposals = proposals.map(row => row.id === id ? result.proposal : row);
      render(body.action === "approve" ? "Saved as a contested hypothesis. Use Belief Review for further validation; it is not answer guidance yet." : "Proposal declined. No shared belief was created.");
    } catch (error) {
      if (generation !== epoch) return;
      if (error.status === 409) { try { proposals = (await request()).proposals; } catch {} }
      if (generation !== epoch) return;
      render(error.message); root.querySelector(`[data-owner-proposal="${id}"]`)?.setAttribute("open", "");
    } finally { busy = false; }
  });
}
