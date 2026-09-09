const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const today = () => new Date().toISOString().slice(0, 10);

export function createPrivateFilesView(host, { run, onResolve }) {
  host.querySelector("#investmentComposer").insertAdjacentHTML("beforebegin", '<details id="investmentFiles" class="assistant-files" hidden><summary>Private evidence <span id="investmentFileCount"></span></summary><div id="investmentFileBody"></div></details>');
  const pane = host.querySelector("#investmentFiles"), body = host.querySelector("#investmentFileBody");
  let currentId = "", signature = "", latestItem, latestStatus;
  const drafts = new Map();
  pane.addEventListener("input", event => {
    const form = event.target.closest("[data-file-review]"); if (!form) return;
    const id = form.dataset.fileReview, values = Object.fromEntries(new FormData(form));
    drafts.set(id, { ...values, revision: Number(form.dataset.revision), baseline: drafts.get(id)?.baseline || JSON.stringify(latestItem.attachments.find(file => file.id === id)) });
  });
  pane.addEventListener("submit", event => {
    event.preventDefault(); const form = event.target, values = Object.fromEntries(new FormData(form));
    if (form.id === "investmentUploadForm") {
      const file = form.querySelector('[type="file"]').files[0];
      void run("", async () => {
        if (!file || file.size > 2 * 1024 * 1024) throw new Error("Choose a non-empty supported file no larger than 2 MB.");
        const bytes = new Uint8Array(await file.arrayBuffer()); let binary = "";
        for (let i = 0; i < bytes.length; i += 16384) binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
        return { filename: file.name, mimeType: file.type, contentBase64: btoa(binary), consentStore: values.consentStore === "on", revision: Number(form.dataset.revision) };
      });
    } else if (form.dataset.fileReview) {
      void run(`${form.dataset.fileReview}/review`, async () => ({ note: values.note, checkedAt: values.checkedAt, confirmReviewed: values.confirmReviewed === "on", revision: Number(form.dataset.revision) }));
    }
  });
  pane.addEventListener("click", event => {
    const button = event.target.closest("[data-file-action]"); if (!button) return;
    const card = button.closest("[data-file-id]"), id = card.dataset.fileId, revision = Number(card.dataset.revision);
    if (["saved-note", "local-note"].includes(button.dataset.fileAction)) {
      if (button.dataset.confirm !== "true") { button.dataset.confirm = "true"; button.textContent = button.dataset.fileAction === "saved-note" ? "Confirm discard my unsaved note" : "Confirm review latest file with my note"; return; }
      if (button.dataset.fileAction === "saved-note") drafts.delete(id);
      else { const draft = drafts.get(id); draft.baseline = JSON.stringify(latestItem.attachments.find(file => file.id === id)); draft.revision = latestItem.revision; draft.confirmReviewed = ""; }
      signature = ""; view.render(latestItem, latestStatus); onResolve?.(); return;
    }
    if (button.dataset.fileAction === "read") void run(`${id}/read`, async () => ({ consentAi: card.querySelector('[data-file-consent]').checked, revision }));
    if (button.dataset.fileAction === "delete") {
      if (button.dataset.confirm !== "true") { button.dataset.confirm = "true"; button.textContent = "Confirm delete file and linked note"; return; }
      void run(id, async () => ({ action: "delete", revision }));
    }
  });
  const view = {
    accept(route) { if (route.endsWith("/review") || (route && !route.includes("/"))) drafts.delete(route.split("/")[0]); },
    render(item, status) {
      latestItem = item; latestStatus = status;
      pane.hidden = !item || Boolean(item.profileIntake);
      if (!item) { currentId = ""; signature = ""; drafts.clear(); body.innerHTML = ""; return; }
      if (currentId !== item.id) { pane.open = false; signature = ""; drafts.clear(); currentId = item.id; }
      const next = JSON.stringify([item.id, item.attachments || [], status?.files, status?.llm]);
      host.querySelector("#investmentFileCount").textContent = item.attachments?.length ? `(${item.attachments.length})` : "";
      // Unrelated chat updates do not erase a half-written file review. Its
      // original revision stays attached so a stale submit cannot overwrite work.
      if (signature === next) {
        for (const node of body.querySelectorAll("[data-revision]")) {
          const draft = drafts.get(node.dataset.fileReview);
          if (!draft || draft.baseline === JSON.stringify(item.attachments.find(file => file.id === node.dataset.fileReview))) { node.dataset.revision = item.revision; if (draft) draft.revision = item.revision; }
        }
        return;
      }
      signature = next;
      body.innerHTML = `<p class="assistant-caption">${escape(status?.files?.notice || "Checking private storage...")}</p><p class="assistant-caption">Redact identity, bank-account and contact details, faces and location metadata you do not want to share. Apex does not scan files for malware; upload only trusted files. Files never enter the owner's shared framework.</p>
        <form id="investmentUploadForm" data-revision="${item.revision}"><label>Document or photo<input type="file" accept=".txt,.pdf,.docx,.png,.jpg,.jpeg" required ${!status?.files?.enabled ? "disabled" : ""}></label><label class="assistant-consent"><input name="consentStore" type="checkbox" required> I have permission to store this file privately in this investigation.</label><button type="submit" ${!status?.files?.enabled ? "disabled" : ""}>Attach file</button><small>Up to 2 MB per file. Text extraction runs on Apex's server without an AI provider. PDF scans require manual review or a separately uploaded page photo.</small></form>
        ${(item.attachments || []).map(file => `<details data-file-id="${escape(file.id)}" data-revision="${item.revision}"><summary>${escape(file.filename)} <small>${file.review ? "Reviewed note" : "Needs review"}</small></summary><p class="assistant-caption">${escape(file.mimeType)} / ${Math.ceil(file.size / 1024)} KB / uploaded ${file.uploadedAt.slice(0, 10)}</p><a href="/api/assistant/cases/${encodeURIComponent(item.id)}/files/${encodeURIComponent(file.id)}" download>Download original</a><p class="assistant-caption">${escape(file.extraction.coverage)}</p>${file.extraction.text ? `<details><summary>Unreviewed extracted text</summary><pre class="assistant-file-text">${escape(file.extraction.text)}</pre></details>` : ""}
          <details><summary>Optional AI reading</summary><p class="assistant-caption">Sends this photo, or up to 12,000 extracted text characters, plus the filename to the configured provider. It may incur API charges. Compatibility and accuracy are not guaranteed; it cannot certify condition, tenancy or title.</p><label class="assistant-consent"><input type="checkbox" data-file-consent> I consent to this file reading by the configured AI provider.</label><button type="button" data-file-action="read" ${!status?.llm ? "disabled" : ""}>Request AI draft</button>${!status?.llm ? '<p class="assistant-caption">AI is not configured. You can review the file yourself below.</p>' : ""}${file.aiError ? `<p role="status">${escape(file.aiError)}</p>` : ""}${file.aiDraft ? `<p class="assistant-caption">Unverified AI draft / ${escape(file.aiDraft.provider)} / ${file.aiDraft.at.slice(0, 10)}</p><p>${escape(file.aiDraft.summary)}</p><ul>${file.aiDraft.observations.map(note => `<li>${escape(note)}</li>`).join("")}</ul><p>${file.aiDraft.questions.map(escape).join("<br>")}</p>` : ""}</details>
          <form data-file-review="${escape(file.id)}" data-revision="${item.revision}"><label>Your review note<textarea name="note" minlength="12" maxlength="2000" required placeholder="What does the original establish, and what is still uncertain?">${escape(file.review?.note || "")}</textarea></label><label>Date checked<input name="checkedAt" type="date" max="${today()}" required value="${file.review?.checkedAt.slice(0, 10) || today()}"></label><label class="assistant-consent"><input name="confirmReviewed" type="checkbox" required> I reviewed the original and this note. It is not independent verification.</label><button type="submit">Keep reviewed note</button></form><button type="button" data-file-action="delete">Delete file</button></details>`).join("")}`;
      for (const [id, draft] of drafts) {
        const file = item.attachments?.find(file => file.id === id), form = body.querySelector(`[data-file-review="${id}"]`); if (!file || !form) continue;
        const changed = draft.baseline !== JSON.stringify(file);
        if (!changed) draft.revision = item.revision;
        form.dataset.revision = draft.revision;
        form.elements.note.value = draft.note || ""; form.elements.checkedAt.value = draft.checkedAt || today(); form.elements.confirmReviewed.checked = !changed && draft.confirmReviewed === "on";
        if (changed) form.insertAdjacentHTML("beforebegin", '<p role="status">This file changed elsewhere. Your unsaved note is preserved below. Review the latest saved version before choosing.</p><button type="button" data-file-action="local-note">Keep my unsaved note</button><button type="button" data-file-action="saved-note">Use saved note</button>');
      }
    }
  };
  return view;
}
