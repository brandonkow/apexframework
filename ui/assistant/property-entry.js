const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function createPropertyEntry(host, { submit, changed }) {
  const pane = host.querySelector("#investmentManual");
  let opened = false, draft = {};
  pane.addEventListener("input", event => {
    if (event.target.name) draft[event.target.name] = event.target.value;
  });
  pane.addEventListener("submit", event => {
    if (event.target.id !== "investmentManualForm") return;
    event.preventDefault();
    submit(Object.fromEntries(new FormData(event.target)));
  });
  pane.addEventListener("click", event => {
    if (!event.target.closest("[data-manual-cancel]")) return;
    api.reset(); changed(); host.querySelector("#investmentManualStart").focus();
  });
  const api = {
    isOpen: () => opened,
    open(item) {
      opened = true;
      const known = item?.toolContext?.dealCard || {};
      draft = { projectName: known.projectName || "", area: known.area || item?.brief?.area || "", askingPrice: /^\d+(?:\.\d{1,2})?$/.test(known.askingPrice || "") ? known.askingPrice : "", sourceUrl: "" };
      pane.innerHTML = "";
    },
    reset() { opened = false; draft = {}; pane.innerHTML = ""; pane.hidden = true; },
    render(item, busy) {
      if (item?.selected) api.reset();
      const searching = ["queued", "running"].includes(item?.job?.status);
      const start = host.querySelector("#investmentManualStart");
      start.hidden = Boolean(item?.selected || item?.profileIntake || opened);
      start.disabled = busy || searching;
      start.title = searching ? "Stop or finish the search before reviewing your own property." : "Start a private review without a published listing.";
      pane.hidden = !opened || Boolean(item?.selected || item?.profileIntake);
      if (pane.hidden) return;
      if (!pane.querySelector("form")) pane.innerHTML = `<header><p class="eyebrow">YOUR PROPERTY / PRIVATE REVIEW</p><h2>What are you considering?</h2></header>
        <form id="investmentManualForm"><div class="assistant-field-grid">
        <label>Property or project name<input name="projectName" required minlength="2" maxlength="120" value="${escape(draft.projectName)}" autocomplete="off"></label>
        <label>Area / neighbourhood<input name="area" required minlength="2" maxlength="120" value="${escape(draft.area)}" autocomplete="off"></label>
        <label>Asking price (RM, optional)<input name="askingPrice" type="number" min="0.01" max="1000000000" step="0.01" inputmode="decimal" value="${escape(draft.askingPrice)}"></label>
        <label>Reference link (optional)<input name="sourceUrl" type="url" maxlength="1500" placeholder="https://..." value="${escape(draft.sourceUrl)}"></label>
        </div><p class="assistant-caption">Only the name and area are needed. This starts fresh property assumptions while keeping your saved finances. Your link is recorded, not opened or verified; nothing is published to the shared knowledge base.</p>
        <p class="assistant-caption">This draft is not saved until you confirm. Temporary-storage warnings still apply.</p>
        <div class="assistant-finance-actions"><button type="submit" class="primary-button">Start private review</button><button type="button" data-manual-cancel>Cancel</button></div></form>`;
      for (const control of pane.querySelectorAll("input, button")) control.disabled = busy || searching;
    }
  };
  return api;
}
