import { addEvent, assistantState, catalogueCoverage, discover, fail, isoNow, message } from "./investment-assistant.js";

const activeJobs = new Map();
const conflict = error => error?.name === "StorageConflictError";
export const searchPending = item => ["queued", "running"].includes(item?.job?.status);

export function advanceSearch(item, data, analyze) {
  if (!searchPending(item)) return false;
  if (Date.now() - Date.parse(item.job.createdAt) > 24 * 3600000) {
    item.job.status = "failed";
    item.job.error = "Search expired. Confirm the brief to start again with current evidence.";
  } else {
    item.job.status = "running";
    item.job.attempts++;
    if (item.job.step === 0) item.job.coverage = catalogueCoverage(data);
    if (item.job.step === 1) item.results = discover(item.brief, data, analyze);
    if (item.job.step === 2) {
      // Recheck at completion so a withdrawn source cannot survive an interrupted search.
      item.results = discover(item.brief, data, analyze);
      item.job.status = "completed";
      message(item, "assistant", item.results.message);
    }
    item.job.step++;
  }
  item.job.updatedAt = isoNow();
  addEvent(item, "search", item.job.status === "completed" ? "Search completed against the published catalogue." : "Search step recorded.");
  return true;
}

// A slow model response may overlap writes to other cases. Merge only this case,
// never a stale whole-database snapshot, and never overwrite an edit to this case.
export async function saveCase(item, expectedRevision, { readDb, writeDb }) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await readDb(), data = assistantState(db);
    const index = data.cases.findIndex(value => value.id === item.id && value.scope === item.scope);
    if (index < 0) fail("This investigation was deleted or moved. Reload your investigations.", 409);
    if (data.cases[index].revision !== expectedRevision) fail("This investigation changed. Reload it before continuing.", 409);
    data.cases[index] = item;
    try { await writeDb(db); return; }
    catch (error) { if (!conflict(error) || attempt === 5) throw error; }
  }
}

export async function runSearch(caseId, jobId, { readDb, writeDb, analyze }) {
  const deadline = Date.now() + 20000;
  for (let attempt = 0; attempt < 12 && Date.now() < deadline; attempt++) {
    const db = await readDb(), data = assistantState(db);
    const item = data.cases.find(value => value.id === caseId);
    if (!item || item.job?.id !== jobId || !searchPending(item)) return;
    try { advanceSearch(item, data, analyze); }
    catch {
      item.job.status = "failed";
      item.job.updatedAt = isoNow();
      item.job.error = "The evidence checks could not finish. Confirm the brief to retry; no recommendation was issued.";
      item.results = null;
      addEvent(item, "search", "Search failed before a supported result was available.");
    }
    try { await writeDb(db); }
    catch (error) {
      if (!conflict(error)) throw error;
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }
  // A bounded worker may be interrupted. The next authenticated case read resumes
  // its persisted checkpoint, rather than silently claiming the job completed.
}

export function resumeSearch(item, dependencies, defer) {
  if (typeof defer !== "function" || !searchPending(item)) return;
  const key = `${item.id}:${item.job.id}`;
  let work = activeJobs.get(key);
  if (!work) {
    work = runSearch(item.id, item.job.id, dependencies)
      .catch(() => { console.warn("Apex search interrupted; the saved checkpoint can resume on the next case read."); })
      .finally(() => { activeJobs.delete(key); });
    activeJobs.set(key, work);
  }
  defer(work);
}
