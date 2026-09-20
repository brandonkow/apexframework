const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function historySummary(value) {
  const section = (label, entries, render) => Array.isArray(entries) && entries.length ? `<details><summary>${label} (${entries.length})</summary>${entries.filter(item => item && typeof item === "object").map(render).join("")}</details>` : "";
  const note = item => `<article><b>${escape(item.title || item.kind || "Earlier note")}</b><p>${escape(item.note || item.description || "No note recorded")}</p><small>${escape(item.checkedAt || item.at || item.date || "Date not recorded")}${item.status ? ` / Earlier declared status: ${escape(item.status)}` : ""}</small></article>`;
  return section("Earlier conversation", value.messages, item => `<article><small>Recorded ${escape(item.role || "message")} / ${escape(item.at || "date unknown")}</small><p>${escape(item.content)}</p></article>`)
    + section("Check and action notes", value.tasks, note)
    + section("Private observations", value.evidence, note)
    + section("Recorded monthly outcomes", value.outcomes, item => `<article><b>${escape(item.month)}</b><p>Earlier recorded cash flow: ${escape(item.cashFlow ?? "Unknown")}. Recheck the original costs and evidence before using this outcome.</p></article>`)
    + section("File notes (no original files)", value.attachments, item => `<article><b>${escape(item.filename)}</b><p>${escape(item.review?.note || "No reviewed note recorded")}</p></article>`)
    + '<details data-full-recovery><summary>Full imported record</summary><p>Includes source snapshots, earlier thesis records and technical fields. Historical declarations are not current verification.</p><pre class="assistant-file-text"></pre></details>';
}

export function createRecoveryView(host, { run, request, accept }) {
  host.querySelector(".assistant-more").insertAdjacentHTML("beforeend", '<button type="button" id="investmentRestoreOpen">Restore a backup</button>');
  host.querySelector(".assistant-casebar").insertAdjacentHTML("afterend", `<section id="investmentRecovery" class="assistant-property" hidden aria-label="Restore investigation backup"><h2>Restore a private backup</h2><p>Review the contents first. Your current investigation will not be overwritten. The file is sent to Apex for validation, never to an AI provider.</p><form id="investmentRecoveryForm"><label>Investigation export (JSON, up to 2 MB)<input type="file" accept=".json,application/json" required></label><button type="submit">Preview backup</button><button type="button" data-recovery-cancel>Cancel</button></form><div id="investmentRecoveryPreview" role="status"></div><button type="button" id="investmentRestoreConfirm" class="primary-button" hidden>Restore as a separate investigation</button></section>`);
  host.querySelector("#investmentMessages").insertAdjacentHTML("afterend", '<details id="investmentArchive" class="assistant-files" hidden><summary>Imported history / unverified</summary><p>Reference only. These old conversations, actions and notes do not drive current checks or calculations. Original files and sharing permissions are not included.</p><div data-recovery-history></div></details>');
  const pane = host.querySelector("#investmentRecovery"), form = pane.querySelector("form"), fileInput = form.querySelector("input"), output = pane.querySelector("#investmentRecoveryPreview"), confirm = pane.querySelector("#investmentRestoreConfirm"), history = host.querySelector("#investmentArchive");
  let backup = null, token = "", epoch = 0, currentId = "", currentHistory = null;
  const invalidate = () => { epoch++; backup = null; token = ""; confirm.hidden = true; output.textContent = ""; };
  const view = {
    reset() { invalidate(); pane.hidden = true; form.reset(); },
    render(item) {
      history.hidden = !item?.recovery;
      const nextId = item?.id || "";
      if (currentId !== nextId) { view.reset(); history.open = false; history.querySelector("[data-recovery-history]").textContent = ""; currentId = nextId; }
      currentHistory = item?.recovery?.history || null;
    }
  };
  history.addEventListener("toggle", () => {
    const body = history.querySelector("[data-recovery-history]");
    if (!history.open || !currentHistory) { body.textContent = ""; return; }
    body.innerHTML = historySummary(currentHistory);
    const full = body.querySelector("[data-full-recovery]");
    full.addEventListener("toggle", () => { full.querySelector("pre").textContent = full.open ? JSON.stringify(currentHistory, null, 2) : ""; });
  });
  host.querySelector("#investmentRestoreOpen").addEventListener("click", () => {
    if (host.getAttribute("aria-busy") === "true") return;
    host.querySelector(".assistant-more").open = false;
    pane.hidden = false; fileInput.focus(); pane.scrollIntoView({ block: "nearest" });
  });
  fileInput.addEventListener("change", invalidate);
  pane.querySelector("[data-recovery-cancel]").addEventListener("click", () => { view.reset(); host.querySelector(".assistant-more").open = true; host.querySelector("#investmentRestoreOpen").focus(); });
  form.addEventListener("submit", event => {
    event.preventDefault(); invalidate();
    const active = epoch, file = fileInput.files[0];
    void run(async () => {
      if (!file || file.size > 2 * 1024 * 1024) throw new Error("Choose an investigation JSON export no larger than 2 MB.");
      let parsed;
      try { parsed = JSON.parse(await file.text()); } catch { throw new Error("This file is not valid JSON. Choose an Apex investigation export."); }
      if (active !== epoch) return;
      const { preview } = await request("/api/assistant/restore", { action: "preview", backup: parsed });
      if (active !== epoch) return;
      backup = parsed; token = preview.token;
      output.innerHTML = `<h3>${escape(preview.title)}</h3><p>Exported ${escape(preview.exportedAt)} / ${escape(preview.stage.replaceAll("_", " "))}</p><p>${preview.messages} earlier messages / ${preview.files} file records (originals not included).</p><p>${escape(preview.notice)}</p>`;
      confirm.hidden = false; confirm.focus();
    });
  });
  confirm.addEventListener("click", () => {
    if (!backup || !token) return;
    const active = epoch, body = { action: "restore", backup, previewToken: token };
    void run(async () => {
      const result = await request("/api/assistant/restore", body);
      if (active !== epoch) return;
      view.reset(); accept(result);
    });
  });
  return view;
}
