import test from "node:test";
import assert from "node:assert/strict";
import { advanceSearch, resumeSearch, runSearch, saveCase } from "../assistant-jobs.js";
import { addEvent, newCase } from "../investment-assistant.js";
import { StorageConflictError } from "../storage.js";

function fixture() {
  const item = newCase("guest:test");
  item.brief = { area: "Penang", goal: "rental_income", budgetMax: 500000, propertyType: "any" };
  item.job = { id: "test-job", status: "queued", step: 0, attempts: 0, createdAt: new Date().toISOString() };
  let state = { _storageRevision: 0, assistant: { sources: [], listings: [], cases: [item] }, other: "preserve me" };
  return {
    item,
    readDb: async () => structuredClone(state),
    writeDb: async next => {
      if (next._storageRevision !== state._storageRevision) throw new StorageConflictError();
      state = structuredClone({ ...next, _storageRevision: state._storageRevision + 1 });
    },
    analyze: () => ({ verdict: "investigate" })
  };
}

test("server search finishes without browser step requests and duplicate workers do not duplicate completion", async () => {
  const store = fixture(), promises = [];
  resumeSearch(store.item, store, promise => promises.push(promise));
  resumeSearch(store.item, store, promise => promises.push(promise));
  assert.equal(promises[0], promises[1]);
  await Promise.all(promises);
  let item = (await store.readDb()).assistant.cases[0];
  assert.equal(item.job.status, "completed");
  assert.equal(item.job.step, 3);
  assert.equal(item.results.candidates.length, 0);
  assert.equal(item.messages.length, 1);
  await runSearch(item.id, item.job.id, store);
  item = (await store.readDb()).assistant.cases[0];
  assert.equal(item.messages.length, 1);
});

test("interrupted searches resume persisted steps and expired searches fail explicitly", async () => {
  const store = fixture(), db = await store.readDb();
  advanceSearch(db.assistant.cases[0], db.assistant, store.analyze);
  await store.writeDb(db);
  await runSearch(store.item.id, store.item.job.id, store);
  assert.equal((await store.readDb()).assistant.cases[0].job.status, "completed");
  const expired = fixture(), old = await expired.readDb();
  old.assistant.cases[0].job.createdAt = "2000-01-01T00:00:00Z";
  await expired.writeDb(old);
  await runSearch(expired.item.id, expired.item.job.id, expired);
  const result = (await expired.readDb()).assistant.cases[0];
  assert.equal(result.job.status, "failed");
  assert.equal(result.results, null);
});

test("a concurrent cancellation wins over an in-flight search step", async () => {
  const store = fixture();
  let first = true;
  await runSearch(store.item.id, store.item.job.id, {
    ...store,
    writeDb: async db => {
      if (first) {
        first = false;
        const cancelled = await store.readDb();
        cancelled.assistant.cases[0].job.status = "cancelled";
        addEvent(cancelled.assistant.cases[0], "search", "User cancelled.");
        await store.writeDb(cancelled);
      }
      await store.writeDb(db);
    }
  });
  const item = (await store.readDb()).assistant.cases[0];
  assert.equal(item.job.status, "cancelled");
  assert.equal(item.job.step, 0);
  assert.equal(item.messages.length, 0);
});

test("deleted and replaced searches cannot be recreated by an old worker", async () => {
  for (const mutate of [data => data.cases = [], data => data.cases[0].job.id = "new-job"]) {
    const store = fixture(), db = await store.readDb();
    mutate(db.assistant);
    await store.writeDb(db);
    await runSearch(store.item.id, "test-job", store);
    assert.deepEqual(await store.readDb(), { ...db, _storageRevision: 1 });
  }
});

test("case save retries unrelated writes without losing them", async () => {
  const store = fixture(), edit = structuredClone(store.item);
  addEvent(edit, "conversation", "User question.");
  let first = true;
  await saveCase(edit, 0, {
    ...store,
    writeDb: async db => {
      if (first) {
        first = false;
        const other = await store.readDb();
        other.other = "concurrent update";
        other.assistant.cases.push(newCase("user:another-person"));
        await store.writeDb(other);
      }
      await store.writeDb(db);
    }
  });
  const saved = await store.readDb();
  assert.equal(saved.other, "concurrent update");
  assert.equal(saved.assistant.cases.length, 2);
  assert.equal(saved.assistant.cases[0].revision, 1);
});

test("case save cannot overwrite another edit, ownership transfer or deletion", async () => {
  for (const mutate of [data => data.cases[0].revision++, data => data.cases[0].scope = "user:new-owner", data => data.cases = []]) {
    const store = fixture(), changed = await store.readDb();
    mutate(changed.assistant);
    await store.writeDb(changed);
    await assert.rejects(saveCase(store.item, 0, store), error => error.statusCode === 409);
  }
});
