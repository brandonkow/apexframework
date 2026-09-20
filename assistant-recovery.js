import { createHash, randomUUID } from "node:crypto";
import { addEvent, assistantState, cleanBrief, fail, isoNow, message, newCase, publicUrl, stageTasks, STAGES } from "./investment-assistant.js";
import { effectiveContext, validateWorkingContext } from "./assistant-context.js";

export const MAX_BACKUP_BYTES = 2 * 1024 * 1024;
const object = value => value && typeof value === "object" && !Array.isArray(value);
const forbidden = /^(?:__proto__|prototype|constructor|scope|storageId|storageKey|password|.*token|.*secret|.*apiKey)$/i;

// Imported history is inert: never restore identities, permissions, jobs or
// verification into live workflow state, and never include it in model context.
function archive(value, budget = { nodes: 0 }, depth = 0) {
  if (++budget.nodes > 30000 || depth > 20) fail("The backup history is too complex to restore.");
  if (value === null || ["boolean", "number"].includes(typeof value)) return value;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(item => archive(item, budget, depth + 1));
  if (!object(value)) fail("Invalid backup history.");
  return Object.fromEntries(Object.keys(value).sort().filter(key => !forbidden.test(key)).map(key => [key, archive(value[key], budget, depth + 1)]));
}

export function previewRecovery(backup) {
  if (!object(backup) || backup.format !== "apex-investigation.v1" || !object(backup.case)) fail("Choose an Apex investigation JSON export, not a catalogue or an unsaved-input file.");
  if (Buffer.byteLength(JSON.stringify(backup)) > MAX_BACKUP_BYTES) fail("Investigation backups must be no larger than 2 MB.");
  const raw = backup.case;
  if (!object(raw.brief) || (raw.selected != null && !object(raw.selected)) || (raw.working != null && !object(raw.working))) fail("The backup has invalid investigation inputs.");
  const brief = cleanBrief(raw.brief);
  const working = validateWorkingContext(effectiveContext(raw));
  const evidence = working.evidence;
  working.evidence = {};
  for (const comparable of working.dcfContext.comparables || []) comparable.verified = false;
  let selected = null;
  if (raw.selected) {
    const { projectName, area } = raw.selected;
    if (typeof projectName !== "string" || !projectName.trim() || projectName.length > 160 || typeof area !== "string" || !area.trim() || area.length > 120) fail("The backup needs a valid property name and area.");
    const price = raw.selected.askingPrice;
    selected = { projectName: projectName.trim(), area: area.trim(), askingPrice: typeof price === "number" && Number.isFinite(price) && price > 0 && price <= 1e9 ? price : null, sourceUrl: publicUrl(raw.selected.sourceUrl) };
  }
  const stage = selected && STAGES.includes(raw.stage) && raw.stage !== "discovery" ? raw.stage : selected ? "site_visit" : "discovery";
  const history = {};
  for (const key of ["messages", "events", "tasks", "outcomes", "evidence", "learning", "attachments", "selected", "profileDraft", "recovery"]) if (raw[key] !== undefined) history[key] = raw[key];
  history.workingEvidence = evidence;
  history.originalWorking = raw.working || null;
  const normalized = { brief, working, selected, stage, history: archive(history), exportedAt: typeof backup.exportedAt === "string" ? backup.exportedAt.slice(0, 40) : "Unknown" };
  const token = createHash("sha256").update(JSON.stringify(archive(normalized))).digest("hex");
  return { normalized, preview: { token, title: selected?.projectName || brief.area || "Investigation", stage, exportedAt: normalized.exportedAt, messages: Array.isArray(raw.messages) ? raw.messages.length : 0, files: Array.isArray(raw.attachments) ? raw.attachments.length : 0, notice: "Creates a separate private investigation. Saved inputs return as unverified assumptions. Checks and evidence gates reopen; the search stays stopped. Old conversations, actions, outcomes and file notes remain in imported history, not live approvals or calculations. Original files, sharing approvals and account access are not restored." } };
}

export async function restoreInvestigation(backup, token, scope, limit, { readDb, writeDb }) {
  const { normalized: value, preview } = previewRecovery(backup);
  if (token !== preview.token) fail("Preview this backup before restoring it.", 409);
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await readDb(), data = assistantState(db), owned = data.cases.filter(item => item.scope === scope);
    const existing = owned.find(item => item.recovery?.token === token);
    if (existing) return { item: existing, data, alreadyRestored: true };
    if (owned.length >= limit) fail("Export and delete an unused investigation before restoring another.");
    if (data.cases.length >= 10000) fail("Investigation storage is at capacity. Please contact the owner.", 503);
    const item = newCase(scope), at = isoNow();
    item.brief = value.brief;
    item.working = { ...structuredClone(value.working), revision: 1, updatedAt: at, status: "user_declared" };
    if (value.selected) item.selected = { ...value.selected, id: `private:${randomUUID()}`, origin: "user_supplied", sourceId: "", availability: "unknown", recordedAt: at, selectedAt: at, facts: [], grossYield: null, status: "investigate", dealCard: { projectName: value.selected.projectName, area: value.selected.area }, gaps: ["Recheck source, condition, achieved rent and title against current evidence"], counterCase: "This restored property and its inputs have not been independently verified. Earlier conclusions may no longer hold." };
    item.stage = value.stage; item.tasks = stageTasks(value.stage);
    item.recovery = { token, at, exportedAt: value.exportedAt, status: "unverified_import", history: value.history };
    message(item, "assistant", "Your private backup is restored. The saved figures are back, but old conclusions still need fresh evidence. Checks are open again and no search has restarted.\n\nYou can read earlier conversations, actions and file notes under Imported history. Original files and sharing approvals were not restored.\n\nNext: review the saved assumptions in the tools, then recheck the evidence before proceeding.");
    addEvent(item, "recovery", "Backup explicitly restored. Historical claims do not establish source verification, completed checks or permission to publish.");
    data.cases.push(item);
    try { await writeDb(db); return { item, data, alreadyRestored: false }; }
    catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}
