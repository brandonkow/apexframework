import assert from "node:assert/strict";
import test from "node:test";
import { MAX_BACKUP_BYTES, previewRecovery, restoreInvestigation } from "../assistant-recovery.js";
import { assistantCaseContext } from "../assistant-reasoning.js";
import { assistantRoutes } from "../assistant-routes.js";
import { newCase, publicCase, selectedSourceStatus } from "../investment-assistant.js";
import { startPropertyReview } from "../assistant-property.js";
import { analyzeSevenStageDeal } from "../server.js";

function backup() {
  const item = newCase("user:original");
  startPropertyReview(item, { projectName: "Synthetic recovery test", area: "Example area", askingPrice: 450000 });
  item.working.financialProfile = { monthlyIncome: "8000", currentDebt: "0" };
  item.working.financialBasis = { monthlyIncome: "net_declared" };
  item.working.dealCard.expectedRent = "2500";
  item.working.evidence = { identity: { note: "Old claimed verification", date: "2026-01-01" } };
  item.working.dcfContext = { discountRate: "6", comparables: [{ projectName: "Test comparable", verified: true }] };
  item.tasks[0].status = "done";
  item.tasks[0].note = "Historical inspection note";
  item.attachments = [{ id: "old-file", filename: "test.txt", storageKey: "private/original", storageId: "private-id", review: { note: "Old file observation" } }];
  item.learning = { theses: [{ id: "old-thesis", verdict: "BUY" }], reviews: [{ proposalId: "owner-approved-id" }] };
  item.job = { id: "old-job", status: "running" };
  return { format: "apex-investigation.v1", exportedAt: "2026-09-14T00:00:00.000Z", case: item };
}
function store() {
  let db = { brain: { answers: ["Founder sentinel"] }, assistant: { cases: [], sources: [], listings: [], lessonProposals: [] } };
  return { readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, get: () => db };
}

test("backup preview is deterministic, read-only and warns about recovery limits", () => {
  const input = backup(), original = structuredClone(input), a = previewRecovery(input), b = previewRecovery(input);
  assert.equal(a.preview.token, b.preview.token);
  assert.equal(a.preview.files, 1);
  assert.match(a.preview.notice, /Original files, sharing approvals and account access are not restored/);
  assert.deepEqual(input, original);
  assert.equal(a.normalized.history.attachments[0].storageKey, undefined);
  assert.equal(a.normalized.history.originalWorking.financialBasis.monthlyIncome, "net_declared");
});

test("restore preserves assumptions and inert history without inheriting authority or live outcomes", async () => {
  const input = backup(), deps = store(), token = previewRecovery(input).preview.token;
  const { item } = await restoreInvestigation(input, token, "user:recipient", 20, deps);
  assert.notEqual(item.id, input.case.id);
  assert.equal(item.scope, "user:recipient");
  assert.equal(item.working.financialProfile.monthlyIncome, "8000");
  assert.equal(item.working.financialProfile.currentDebt, "0");
  assert.equal(item.working.dealCard.expectedRent, "2500");
  assert.equal(item.working.financialBasis, undefined);
  assert.deepEqual(item.working.evidence, {});
  assert.equal(item.working.dcfContext.comparables[0].verified, false);
  assert.ok(item.tasks.every(task => task.status === "open"));
  assert.deepEqual(item.outcomes, []); assert.deepEqual(item.evidence, []);
  assert.equal(item.attachments, undefined); assert.equal(item.learning, undefined); assert.equal(item.job, null);
  assert.equal(item.selected.origin, "user_supplied");
  assert.equal(selectedSourceStatus(item, deps.get().assistant).status, "unverified");
  assert.deepEqual(item.selected.facts, []);
  assert.equal(item.recovery.history.tasks[0].note, "Historical inspection note");
  assert.equal(item.recovery.history.attachments[0].review.note, "Old file observation");
  assert.doesNotMatch(JSON.stringify(assistantCaseContext(item, deps.get().assistant)), /Old file observation|owner-approved-id|Historical inspection note/);
  assert.deepEqual(deps.get().brain.answers, ["Founder sentinel"]);
  assert.deepEqual(deps.get().assistant.sources, []); assert.deepEqual(deps.get().assistant.lessonProposals, []);
});

test("restore retry is idempotent per scope, rejects stale previews and enforces case capacity", async () => {
  const input = backup(), deps = store(), token = previewRecovery(input).preview.token;
  await assert.rejects(restoreInvestigation(input, "forged", "user:a", 1, deps), error => error.statusCode === 409);
  const first = await restoreInvestigation(input, token, "user:a", 1, deps);
  const retry = await restoreInvestigation(input, token, "user:a", 1, deps);
  assert.equal(first.item.id, retry.item.id); assert.equal(retry.alreadyRestored, true);
  const secondScope = await restoreInvestigation(input, token, "user:b", 1, deps);
  assert.notEqual(secondScope.item.id, first.item.id);
  input.case.brief.area = "Another area";
  await assert.rejects(restoreInvestigation(input, token, "user:a", 1, deps), /Preview/);
  await assert.rejects(restoreInvestigation(input, previewRecovery(input).preview.token, "user:a", 1, deps), /unused investigation/);
});

test("malformed, unsupported, oversized or over-deep backups fail before any writes", () => {
  for (const input of [null, [], {}, { format: "apex-unsaved-context.v1", case: {} }, { format: "apex-investigation.v1", case: { brief: [] } }]) assert.throws(() => previewRecovery(input));
  const huge = backup(); huge.case.messages = ["x".repeat(MAX_BACKUP_BYTES)]; assert.throws(() => previewRecovery(huge), /2 MB/);
  const deep = backup(); let nested = deep.case.learning;
  for (let i = 0; i < 22; i++) nested = nested.child = {};
  assert.throws(() => previewRecovery(deep), /too complex/);
  const malformed = backup(); malformed.case.working.financialProfile.monthlyIncome = true;
  assert.throws(() => previewRecovery(malformed), /Invalid/);
  const poisoned = backup(); poisoned.case.events = [JSON.parse('{"__proto__":{"polluted":true},"scope":"user:owner","apiKey":"do-not-retain","description":"Useful old event"}')];
  const history = previewRecovery(poisoned).normalized.history;
  assert.deepEqual(history.events, [{ description: "Useful old event" }]); assert.equal({}.polluted, undefined);
});

test("re-exported recovery retains archived notes while keeping gates open and unknown price unknown", async () => {
  const input = backup(), deps = store(); input.case.selected.askingPrice = null; delete input.case.working.dealCard.askingPrice;
  const { item } = await restoreInvestigation(input, previewRecovery(input).preview.token, "user:a", 20, deps);
  const again = { format: input.format, exportedAt: input.exportedAt, case: publicCase(item) };
  const second = await restoreInvestigation(again, previewRecovery(again).preview.token, "user:b", 20, deps);
  assert.equal(second.item.selected.askingPrice, null);
  assert.equal(second.item.working.dealCard.askingPrice, undefined);
  assert.equal(second.item.recovery.history.recovery.history.attachments[0].review.note, "Old file observation");
  assert.ok(second.item.tasks.every(task => task.status === "open"));
});

test("storage conflict retry preserves unrelated changes and cannot duplicate the recovered case", async () => {
  const deps = store(), input = backup(), write = deps.writeDb; let calls = 0;
  deps.writeDb = async value => {
    if (++calls === 1) { const changed = await deps.readDb(); changed.unrelated = "keep"; await write(changed); throw Object.assign(new Error("Conflict"), { name: "StorageConflictError" }); }
    await write(value);
  };
  await restoreInvestigation(input, previewRecovery(input).preview.token, "user:a", 20, deps);
  assert.equal(deps.get().unrelated, "keep"); assert.equal(deps.get().assistant.cases.length, 1);
});

test("recovery API stays scoped and framework-only, including a preview with no writes", async () => {
  const deps = store(), input = backup(); let calls = 0;
  const provider = () => { calls++; throw new Error("Unexpected provider call"); };
  async function request(route, body, { user = "recipient", method = "POST", origin = "http://localhost" } = {}) {
    let response;
    try {
      await assistantRoutes({ req: { method, headers: { host: "localhost", origin } }, res: {}, url: new URL(`http://localhost${route}`), db: await deps.readDb(), actor: { user: { id: user } }, send: (_, status, value) => { response = { status, ...value }; }, readBody: async () => body, ...deps, analyze: analyzeSevenStageDeal, allowRequest: () => true, llmEnabled: () => true, requestLlmText: provider, reply: provider, storeKind: "json", ephemeral: true });
    } catch (error) { response = { status: error.statusCode, error: error.message }; }
    return response;
  }
  assert.equal((await request("/api/assistant/restore", { action: "preview", backup: input }, { origin: "https://other.example" })).status, 403);
  const preview = await request("/api/assistant/restore", { action: "preview", backup: input });
  assert.equal(preview.status, 200); assert.equal(deps.get().assistant.cases.length, 0);
  const restored = await request("/api/assistant/restore", { action: "restore", backup: input, previewToken: preview.preview.token, scope: "user:owner" });
  assert.equal(restored.status, 201); assert.equal(restored.case.scope, undefined);
  assert.equal(restored.case.sourceStatus.status, "unverified");
  assert.equal((await request(`/api/assistant/cases/${restored.case.id}`, null, { user: "different", method: "GET" })).status, 404);
  assert.equal(calls, 0);
});
