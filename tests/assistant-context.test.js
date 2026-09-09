import test from "node:test";
import assert from "node:assert/strict";
import { effectiveContext, updateWorkingContext, validateWorkingContext, deleteInvestigation } from "../assistant-context.js";
import { newCase, addEvent } from "../investment-assistant.js";
import { StorageConflictError } from "../storage.js";
import { createContextSync } from "../ui/assistant/context-sync.js";

function fixture() {
  const item = newCase("user:one");
  item.selected = { dealCard: { projectName: "SYNTHETIC TEST", askingPrice: "450000", expectedRent: "2400", maintenance: "300", sinkingFund: "30" } };
  let db = { _storageRevision: 0, assistant: { cases: [item], sources: [], listings: [] } };
  return { item, readDb: async () => structuredClone(db), writeDb: async next => {
    if (next._storageRevision !== db._storageRevision) throw new StorageConflictError();
    db = structuredClone({ ...next, _storageRevision: db._storageRevision + 1 });
  } };
}
const context = value => ({ dealCard: { askingPrice: String(value) }, financialProfile: {}, evidence: {}, dcfContext: {} });

test("working context combines legacy charges and never mutates the source", async () => {
  const store = fixture(), original = structuredClone(store.item.selected);
  const working = effectiveContext(store.item);
  assert.equal(working.dealCard.maintenance, "330");
  assert.equal(validateWorkingContext({ dealCard: store.item.selected.dealCard }).dealCard.maintenance, "330");
  working.dealCard.expectedRent = "2200";
  working.financialProfile = { monthlyIncome: "8000", currentDebt: "1500", cashReserveMonths: "6" };
  const { item } = await updateWorkingContext(store.item.id, "user:one", 0, working, store);
  assert.deepEqual(item.selected, original);
  assert.equal(effectiveContext(item).dealCard.expectedRent, "2200");
  assert.equal(item.working.status, "user_declared");
  assert.equal(item.working.revision, 1);
  assert.equal(item.working.financialProfile.monthlyIncome, "8000");
  assert.match(item.events.at(-1).description, /original source snapshot is unchanged/);
});

test("clearing tool fields keeps them unknown instead of silently restoring source values", async () => {
  const store = fixture();
  const { item } = await updateWorkingContext(store.item.id, "user:one", 0, { dealCard: {}, financialProfile: {}, evidence: {}, dcfContext: {} }, store);
  assert.deepEqual(effectiveContext(item).dealCard, {});
  assert.equal(item.selected.dealCard.askingPrice, "450000");
});

test("working inputs and comparables are validated, and forged assessments are not accepted", () => {
  for (const raw of [{ dealCard: [] }, { financialProfile: { monthlyIncome: true } }, { dealCard: { expectedRent: "-100" } }, { financialProfile: { riskStyle: "Sure win" } }, { dcfContext: { comparables: {} } }, { dcfContext: { comparables: [{ verified: "true" }] } }, { dcfContext: { hiddenOwnerSecret: "x" } }]) assert.throws(() => validateWorkingContext(raw));
  assert.deepEqual(validateWorkingContext({ verdict: "BUY", qualified: true, dealCard: { askingPrice: "450000" } }).dealCard, { askingPrice: "450000" });
  assert.equal(validateWorkingContext({ dcfContext: { comparables: [{ verified: true, source: "User supplied transaction reference" }] } }).dcfContext.comparables[0].verified, true);
});

test("context revision isolates case work from search activity but rejects stale tool writes", async () => {
  const store = fixture(), changed = await store.readDb();
  addEvent(changed.assistant.cases[0], "search", "Another search checkpoint.");
  await store.writeDb(changed);
  const saved = await updateWorkingContext(store.item.id, "user:one", 0, context(400000), store);
  assert.equal(saved.item.revision, 2);
  await assert.rejects(updateWorkingContext(store.item.id, "user:one", 0, context(390000), store), error => error.statusCode === 409);
  await assert.rejects(updateWorkingContext(store.item.id, "user:two", 1, context(390000), store), error => error.statusCode === 404);
});

test("unrelated storage conflicts preserve both records", async () => {
  const store = fixture();
  let first = true;
  await updateWorkingContext(store.item.id, "user:one", 0, context(400000), {
    ...store, writeDb: async db => {
      if (first) { first = false; const other = await store.readDb(); other.assistant.cases.push(newCase("user:two")); await store.writeDb(other); }
      await store.writeDb(db);
    }
  });
  assert.equal((await store.readDb()).assistant.cases.length, 2);
});

test("sync coalesces edits and saves changes made during an in-flight request with the next revision", async () => {
  const requests = [], saved = [];
  let resolveFirst;
  const sync = createContextSync({ delay: 100000, onState() {}, onSaved: (_, item) => saved.push(item), request: async (_, body) => {
    requests.push(body);
    if (requests.length === 1) await new Promise(resolve => { resolveFirst = resolve; });
    return { case: { working: { ...body.context, revision: body.contextRevision + 1 } } };
  } });
  sync.register("one", 0, context(450000));
  sync.queue("one", 0, context(440000));
  sync.queue("one", 0, context(430000));
  const work = sync.flush("one");
  sync.queue("one", 0, context(420000));
  resolveFirst(); await work;
  assert.equal(requests.length, 2);
  assert.equal(requests[0].context.dealCard.askingPrice, "430000");
  assert.equal(requests[1].contextRevision, 1);
  assert.equal(requests[1].context.dealCard.askingPrice, "420000");
  assert.equal(saved.length, 2);
  assert.equal(sync.hasPending("one"), false);
  sync.reset();
});

test("a sync conflict never automatically overwrites the remote version", async () => {
  let count = 0;
  const sync = createContextSync({ delay: 100000, onState() {}, onSaved() {}, request: async () => { count++; throw Object.assign(new Error("Changed elsewhere"), { status: 409 }); } });
  sync.register("one", 0, context(450000));
  sync.queue("one", 0, context(440000));
  await assert.rejects(sync.flush("one"));
  sync.queue("one", 0, context(430000));
  await assert.rejects(sync.flush("one"));
  assert.equal(count, 1);
  assert.equal(sync.hasPending("one"), true);
  sync.accept({ id: "one", working: { revision: 2 }, toolContext: context(420000) });
  assert.equal(sync.hasPending("one"), false);
  sync.reset();
});

test("logging out invalidates in-flight sync callbacks", async () => {
  const applied = [];
  let resolve;
  const sync = createContextSync({ delay: 100000, onState() {}, onSaved: (_, item) => applied.push(item), request: () => new Promise(done => { resolve = done; }) });
  sync.register("one", 0, context(450000)); sync.queue("one", 0, context(440000));
  const work = sync.flush("one"); sync.reset();
  resolve({ case: { working: { revision: 1 } } }); await work;
  assert.deepEqual(applied, []);
});

test("explicitly keeping local edits uses the reviewed revision and preserves an exportable pending copy", async () => {
  let requestBody;
  const sync = createContextSync({ delay: 100000, onState() {}, onSaved() {}, request: async (_, body) => { requestBody = body; return { case: { working: { revision: body.contextRevision + 1 } } }; } });
  sync.hold("one", 0, context(440000));
  const exported = sync.pending("one"); exported.dealCard.askingPrice = "FORGED";
  assert.equal(sync.pending("one").dealCard.askingPrice, "440000");
  await sync.keepLocal({ id: "one", working: { revision: 3 }, toolContext: context(460000) });
  assert.equal(requestBody.contextRevision, 3);
  assert.equal(requestBody.context.dealCard.askingPrice, "440000");
  assert.equal(sync.hasPending("one"), false);
  sync.reset();
});

test("deleting an investigation survives a concurrent save and old writes cannot recreate it", async () => {
  const store = fixture();
  let first = true;
  await deleteInvestigation(store.item.id, "user:one", {
    ...store, writeDb: async db => {
      if (first) { first = false; await updateWorkingContext(store.item.id, "user:one", 0, context(400000), store); }
      await store.writeDb(db);
    }
  });
  assert.equal((await store.readDb()).assistant.cases.length, 0);
  await assert.rejects(updateWorkingContext(store.item.id, "user:one", 1, context(390000), store), error => error.statusCode === 404);
});
