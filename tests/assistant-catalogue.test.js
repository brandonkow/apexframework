import test from "node:test";
import assert from "node:assert/strict";
import { previewCatalogue, publishCatalogue } from "../assistant-catalogue.js";
import { validateImport } from "../investment-assistant.js";

const today = new Date().toISOString().slice(0, 10);
function bundle() {
  return { version: 1, source: { id: "preview-test", name: "SYNTHETIC TEST ONLY", permission: "owner_authorized", permissionReference: "Only synthetic local test records", publish: true }, listings: [1, 2].map(id => ({ id: String(id), projectName: "Synthetic preview project", area: "Test area", state: "Penang", propertyType: "condo", askingPrice: 450000, sourceUrl: `https://example.com/test/${id}`, observedAt: today, availability: "available" })) };
}
function store(raw = bundle()) {
  const { source, listings } = validateImport(raw);
  let db = { sentinel: "unchanged", assistant: { cases: [], sources: [source], listings } };
  return { readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, get: () => db };
}
test("catalogue preview shows additions, changes, removals and excluded records without publishing", () => {
  const deps = store(), before = structuredClone(deps.get()), raw = bundle();
  raw.listings[0].askingPrice = 400000; raw.listings[1].id = "3"; raw.listings[1].availability = "unknown";
  const { preview } = previewCatalogue(raw, deps.get().assistant);
  assert.equal(preview.added, 1); assert.equal(preview.changed, 1); assert.equal(preview.removed, 1); assert.equal(preview.unchanged, 0);
  assert.equal(preview.current, 1); assert.equal(preview.excluded, 1); assert.equal(preview.removedExamples[0].id, "preview-test:2");
  assert.deepEqual(deps.get(), before);
  assert.equal(preview.token, previewCatalogue(raw, deps.get().assistant, Date.now() + 1000).preview.token);
});
test("publishing binds the preview to both payload and existing source, preserving other sources", async () => {
  const deps = store(), raw = bundle(), token = previewCatalogue(raw, deps.get().assistant).preview.token;
  const stalePayload = structuredClone(raw); stalePayload.listings[0].askingPrice = 1;
  await assert.rejects(publishCatalogue(stalePayload, token, deps), error => error.statusCode === 409);
  const updated = await deps.readDb(); updated.assistant.sources[0].permissionReference = "Changed permission declaration"; await deps.writeDb(updated);
  await assert.rejects(publishCatalogue(raw, token, deps), /changed after preview/);
  const nextToken = previewCatalogue(raw, deps.get().assistant).preview.token;
  const other = bundle(); other.source.id = "other-source";
  const normalized = validateImport(other), db = await deps.readDb(); db.assistant.sources.push(normalized.source); db.assistant.listings.push(...normalized.listings); await deps.writeDb(db);
  const result = await publishCatalogue(raw, nextToken, deps);
  assert.equal(result.imported, 2); assert.equal(deps.get().assistant.listings.length, 4); assert.equal(deps.get().sentinel, "unchanged");
});
test("conflicting catalogue writes retry fresh state and invalidate a changed-source preview", async () => {
  const deps = store(), raw = bundle(), token = previewCatalogue(raw, deps.get().assistant).preview.token, write = deps.writeDb;
  let attempts = 0;
  deps.writeDb = async value => {
    if (++attempts === 1) { const changed = await deps.readDb(); changed.assistant.listings[0].askingPrice = 499999; await write(changed); throw Object.assign(new Error("Conflict"), { name: "StorageConflictError" }); }
    await write(value);
  };
  await assert.rejects(publishCatalogue(raw, token, deps), /changed after preview/);
  assert.equal(deps.get().assistant.listings[0].askingPrice, 499999);
});
test("empty replacement is explicit and normalized IDs cannot collide", () => {
  const deps = store(), raw = bundle(); raw.listings = [];
  const { preview } = previewCatalogue(raw, deps.get().assistant);
  assert.equal(preview.removed, 2); assert.equal(preview.total, 0);
  for (const ids of [[" unit ", "unit"], ["x".repeat(100) + "a", "x".repeat(100) + "b"]]) {
    const duplicate = bundle(); duplicate.listings.forEach((item, index) => item.id = ids[index]);
    assert.throws(() => validateImport(duplicate), /duplicate.*normalization/);
  }
});
