import assert from "node:assert/strict";
import test from "node:test";
import { startPropertyReview } from "../assistant-property.js";
import { assistantRoutes } from "../assistant-routes.js";
import { assistantCaseContext, frameworkReply } from "../assistant-reasoning.js";
import { newCase, selectedSourceStatus } from "../investment-assistant.js";
import { effectiveContext } from "../assistant-context.js";
import { analyzeSevenStageDeal } from "../server.js";

const input = () => ({ projectName: "Synthetic private property", area: "Synthetic micro-area", askingPrice: "450000", sourceUrl: "https://example.com/private-test-reference" });

test("a private property needs no catalogue and preserves finances without inventing market evidence", () => {
  const item = newCase("user:one");
  item.working = { revision: 3, dealCard: { expectedRent: "9999" }, financialProfile: { monthlyIncome: "8000", currentDebt: "0" }, financialBasis: { monthlyIncome: "net_declared" }, evidence: { identity: { note: "Old property inputs", date: "2026-01-01" } }, dcfContext: { terminalCapRate: "1%" } };
  startPropertyReview(item, input());
  assert.equal(item.selected.origin, "user_supplied");
  assert.equal(item.selected.availability, "unknown");
  assert.equal(item.selected.observedAt, undefined, "Input-recording time is not a market observation date.");
  assert.equal(item.selected.grossYield, null);
  assert.deepEqual(item.selected.facts, []);
  assert.equal(item.stage, "site_visit");
  assert.ok(item.tasks.every(task => task.status === "open"));
  assert.equal(item.working.revision, 4);
  assert.equal(item.working.financialProfile.monthlyIncome, "8000");
  assert.equal(item.working.financialProfile.currentDebt, "0");
  assert.equal(item.working.financialBasis.monthlyIncome, "net_declared");
  assert.equal(item.working.dealCard.expectedRent, undefined);
  assert.deepEqual(item.working.evidence, {});
  assert.deepEqual(item.working.dcfContext, {});
  item.working.dealCard.askingPrice = "430000";
  assert.equal(item.selected.askingPrice, 450000);
  assert.equal(item.selected.dealCard.askingPrice, "450000");
  assert.match(item.messages.at(-1).content, /have not opened or checked/);
});

test("unknown price and absent reference remain unknown, not zero or a made-up listing", () => {
  const item = newCase("user:one");
  startPropertyReview(item, { projectName: "Synthetic property", area: "Example area" });
  assert.equal(item.selected.askingPrice, null);
  assert.equal(item.selected.sourceUrl, "");
  assert.equal(effectiveContext(item).dealCard.askingPrice, undefined);
  const status = selectedSourceStatus(item, { sources: [], listings: [] });
  assert.equal(status.status, "unverified");
  assert.match(status.note, /supplied this property privately/);
  const context = assistantCaseContext(item, { sources: [], listings: [] });
  assert.equal(context.selected.origin, "user_supplied");
  assert.equal(context.selected.recordedAt, item.selected.recordedAt);
  assert.match(frameworkReply("What should I check?", item, { sources: [], listings: [] }), /counter-case/);
  assert.doesNotMatch(frameworkReply("What should I check?", item, { sources: [], listings: [] }), /no longer available/);
  assert.match(frameworkReply("What is the rent?", item, { sources: [], listings: [] }), /rent or purchase price is missing/);
});

test("forged source claims, malformed values and unsafe reference URLs are rejected atomically", () => {
  for (const bad of [null, [], { ...input(), origin: "published_catalogue" }, { ...input(), facts: [] },
    { ...input(), projectName: "" }, { ...input(), area: {} }, { ...input(), area: "a".repeat(121) },
    { ...input(), askingPrice: 0 }, { ...input(), askingPrice: true }, { ...input(), askingPrice: "5e5" },
    { ...input(), askingPrice: "450,000" }, { ...input(), askingPrice: 1e10 },
    ...[false, {}, "javascript:alert(1)", "https://secret:password@example.com/", "https://127.0.0.1/private"].map(sourceUrl => ({ ...input(), sourceUrl }))]) {
    const item = newCase("user:one"), before = structuredClone(item);
    assert.throws(() => startPropertyReview(item, bad));
    assert.deepEqual(item, before);
  }
});

test("property selection cannot replace a chosen property or interrupt an active intake or search", () => {
  const selected = newCase("user:one"); startPropertyReview(selected, input());
  assert.throws(() => startPropertyReview(selected, input()), error => error.statusCode === 409);
  const finance = newCase("user:one"); finance.profileDraft = { answers: {} };
  assert.throws(() => startPropertyReview(finance, input()), /financial intake/);
  for (const status of ["queued", "running"]) {
    const searching = newCase("user:one"); searching.job = { status };
    assert.throws(() => startPropertyReview(searching, input()), /current search/);
  }
  const finished = newCase("user:one"); finished.job = { status: "completed" };
  startPropertyReview(finished, input());
  assert.equal(finished.job.status, "completed", "Prior completed search remains history, not new source proof.");
});

test("private-property API is scoped, versioned, exportable and never calls a provider or publishes a listing", async () => {
  const original = newCase("user:one");
  let db = { brain: { answers: [{ text: "Founder sentinel" }] }, assistant: { cases: [original], sources: [], listings: [] } }, calls = 0;
  const provider = async () => { calls++; throw new Error("No external call expected"); };
  async function request(action, body, { user = "one", method = "POST", origin = "http://localhost" } = {}) {
    let response;
    try {
      await assistantRoutes({
        req: { method, headers: { host: "localhost", origin } }, res: {}, url: new URL(`http://localhost/api/assistant/cases/${original.id}${action ? "/" + action : ""}`), db: structuredClone(db), actor: { user: { id: user } },
        send: (_, status, value) => { response = { status, ...value }; }, readBody: async () => body,
        readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, analyze: analyzeSevenStageDeal,
        allowRequest: () => true, llmEnabled: () => true, requestLlmText: provider, reply: provider, storeKind: "json", ephemeral: true
      });
    } catch (error) { response = { status: error.statusCode, error: error.message }; }
    return response;
  }
  assert.equal((await request("property", { revision: 0, property: input() }, { user: "two" })).status, 404);
  assert.equal((await request("property", { revision: 0, property: input() }, { origin: "https://unrelated.example" })).status, 403);
  assert.equal((await request("property", { revision: 99, property: input() })).status, 409);
  const selected = await request("property", { revision: 0, property: input(), allowAi: true, selected: { origin: "owner_checked" } });
  assert.equal(selected.status, 200);
  assert.equal(selected.case.sourceStatus.status, "unverified");
  assert.equal(selected.case.scope, undefined);
  assert.equal(selected.case.toolContext.dealCard.askingPrice, "450000");
  const reply = await request("message", { revision: selected.case.revision, message: "Explain the main risk", allowAi: false });
  assert.equal(reply.status, 200);
  assert.match(reply.case.messages.at(-1).content, /came from you/);
  assert.equal(reply.case.brief.area, "", "A selected private property must not fall back into search-brief extraction.");
  const exported = await request("export", undefined, { method: "GET" });
  assert.equal(exported.case.selected.origin, "user_supplied");
  assert.deepEqual(db.assistant.sources, []); assert.deepEqual(db.assistant.listings, []);
  assert.deepEqual(db.brain.answers, [{ text: "Founder sentinel" }]);
  assert.equal(calls, 0);
  assert.equal((await request("", undefined, { method: "DELETE" })).deleted, true);
  assert.equal((await request("export", undefined, { method: "GET" })).status, 404);
});
