import { createHash } from "node:crypto";
import { assistantState, catalogueCoverage, fail, validateImport } from "./investment-assistant.js";

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().filter(key => key !== "importedAt").map(key => [key, stable(value[key])]));
  return value;
}
const encoded = value => JSON.stringify(stable(value));

export function previewCatalogue(raw, data, now = Date.now()) {
  const payload = validateImport(raw, now), id = payload.source.id;
  const previous = data.listings.filter(item => item.sourceId === id);
  const oldSource = data.sources.find(source => source.id === id) || null;
  if (!oldSource && data.sources.length >= 50) fail("Keep the initial catalogue within 50 sources.");
  if (data.listings.length - previous.length + payload.listings.length > 10000) fail("The catalogue is limited to 10,000 records. Narrow the coverage before importing.");
  const before = new Map(previous.map(item => [item.id, item])), after = new Map(payload.listings.map(item => [item.id, item]));
  const added = payload.listings.filter(item => !before.has(item.id));
  const changed = payload.listings.filter(item => before.has(item.id) && encoded(before.get(item.id)) !== encoded(item));
  const removed = previous.filter(item => !after.has(item.id));
  const current = catalogueCoverage({ sources: [payload.source], listings: payload.listings }, now).current;
  const token = createHash("sha256").update(encoded({ payload, oldSource, previous: previous.slice().sort((a, b) => a.id.localeCompare(b.id)) })).digest("hex");
  return { payload, preview: { token, sourceId: id, sourceName: payload.source.name, replacing: Boolean(oldSource), previous: previous.length, total: payload.listings.length, added: added.length, changed: changed.length, unchanged: payload.listings.length - added.length - changed.length, removed: removed.length, current, excluded: payload.listings.length - current, removedExamples: removed.slice(0, 5).map(item => ({ id: item.id, projectName: item.projectName })), permission: payload.source.permission, permissionReference: payload.source.permissionReference } };
}

export async function publishCatalogue(raw, token, { readDb, writeDb }) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await readDb(), data = assistantState(db);
    const { payload, preview } = previewCatalogue(raw, data);
    if (token !== undefined && token !== preview.token) fail("The source or import changed after preview. Preview again before publishing.", 409);
    data.sources = [...data.sources.filter(source => source.id !== payload.source.id), payload.source];
    data.listings = [...data.listings.filter(item => item.sourceId !== payload.source.id), ...payload.listings];
    try { await writeDb(db); return { imported: payload.listings.length, source: payload.source, coverage: catalogueCoverage(data) }; }
    catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}
