import test from "node:test";
import assert from "node:assert/strict";
import { assistantRoutes } from "../assistant-routes.js";
import { assistantCaseContext, conciseAssistantReply, frameworkReply, socialReply } from "../assistant-reasoning.js";
import { cleanBrief, interpretBrief, newCase, selectedSourceStatus, stageTasks, validBriefResponse } from "../investment-assistant.js";

const catalogue = { sources: [{ id: "qa", publish: true }], listings: [] };
function selectedCase() {
  const item = newCase("user:test");
  item.stage = "rental";
  item.tasks = stageTasks("rental");
  item.selected = { id: "qa:1", sourceId: "qa", projectName: "SYNTHETIC TEST ONLY", availability: "available", askingPrice: 480000, observedAt: new Date().toISOString(), facts: [], gaps: ["Actual costs"], counterCase: "Resale demand is unproven.", grossYield: 6 };
  return item;
}

test("brief extraction never treats income, reserves or rent as a purchase budget", () => {
  for (const query of ["My income is RM8000", "I have cash savings of RM80000", "Rent is RM2500", "My rental budget is RM2500", "My rent is under RM2500", "RM2500 per month", "I don't want a condo"]) {
    const brief = interpretBrief(query, {}, "budgetMax");
    assert.equal(brief.budgetMax, null, query);
    assert.equal(brief.propertyType, "any", query);
  }
  assert.equal(interpretBrief("My budget is RM500k").budgetMax, 500000);
  assert.equal(interpretBrief("500k", {}, "budgetMax").budgetMax, 500000);
  assert.equal(interpretBrief("Under RM500k but my salary is RM8000").budgetMax, 500000);
});

test("the AI brief contract rejects wrong types, extra fields and impossible amounts", () => {
  const valid = { ...cleanBrief(), budgetMax: 500000 };
  assert.equal(validBriefResponse(JSON.stringify(valid)), true);
  for (const invalid of [{ ...valid, goal: [] }, { ...valid, budgetMax: true }, { ...valid, budgetMax: -1 }, { ...valid, bedroomsMin: 1.5 }, { ...valid, notes: {} }, { ...valid, scope: "owner" }]) assert.equal(validBriefResponse(JSON.stringify(invalid)), false);
});

test("greetings, uncertain returns and financial capacity get relevant, short replies", () => {
  const item = selectedCase(), data = { ...catalogue, listings: [item.selected] };
  for (const query of ["Hi!", "Hey there", "Good morning Apex", "Salam", "Thank you!"]) {
    assert.ok(socialReply(query), query);
    assert.doesNotMatch(frameworkReply(query, item, data), /counter-case|gross yield|next unresolved/i);
  }
  assert.match(frameworkReply("Is appreciation guaranteed?", item, data), /cannot guarantee/);
  assert.match(frameworkReply("Can I afford it?", item, data), /not proof of buying power/);
  assert.match(frameworkReply("Is this yield net?", item, data), /not net return/);
  item.outcomes.push({ month: "2026-01", rentReceived: 2500, totalCosts: 2300, cashFlow: 200 });
  assert.match(frameworkReply("What is my cash flow?", item, data), /RM200.*RM2500.*RM2300/);
  assert.match(frameworkReply("Will you train yourself?", item, data), /does not retrain/);
});

test("selected snapshots do not hide unpublished, stale or changed sources", () => {
  const item = selectedCase(), data = structuredClone({ ...catalogue, listings: [item.selected] });
  assert.equal(selectedSourceStatus(item, data).status, "current");
  data.sources[0].publish = false;
  assert.equal(selectedSourceStatus(item, data).status, "unavailable");
  data.sources[0].publish = true;
  data.listings[0].askingPrice++;
  assert.equal(selectedSourceStatus(item, data).status, "recheck");
  data.listings[0].observedAt = "2000-01-01T00:00:00Z";
  assert.match(selectedSourceStatus(item, data).note, /freshness/);
  assert.equal(item.selected.askingPrice, 480000, "Original thesis must remain unchanged.");
  const conflict = structuredClone(item.selected);
  conflict.id = "qa:conflict";
  conflict.facts = [{ adverse: true, kind: "title", observedAt: new Date().toISOString() }];
  const conflictingData = { ...catalogue, listings: [item.selected, conflict] };
  assert.match(selectedSourceStatus(item, conflictingData).note, /adverse/);
});

test("model context includes the active case's dated observations and outcomes, not another account", () => {
  const item = selectedCase();
  item.evidence.push({ note: "Observed lift delays in person.", checkedAt: "2026-01-01", status: "user_declared" });
  item.outcomes.push({ month: "2026-01", cashFlow: -300, status: "user_declared" });
  const context = assistantCaseContext(item, { ...catalogue, cases: [{ scope: "another-owner", evidence: ["PRIVATE SECRET"] }] });
  assert.equal(context.privateObservations[0].note, item.evidence[0].note);
  assert.equal(context.actualOutcomes[0].cashFlow, -300);
  assert.match(context.evidenceBoundary, /not independent verification/);
  assert.doesNotMatch(JSON.stringify(context), /PRIVATE SECRET|user:test/);
});

test("assistant concise replies keep the contrary case and the next action", () => {
  const reply = conciseAssistantReply({ mode: "llm", answer: "long answer", structured: { currentView: "Not ready to buy.", reasons: ["Rent is unverified."], counterCase: ["The price may still be attractive."], nextSteps: ["Check achieved rent."], questions: ["Do you have a signed tenancy comparable?"] } }, "fallback");
  assert.match(reply, /Not ready.*\n\nRent.*\n\nThe counter-case.*\n\nNext:/);
  assert.equal(conciseAssistantReply({ mode: "framework", answer: "generic" }, "case-specific fallback"), "case-specific fallback");
});

test("AI use is opt-in and malformed model extraction falls back without corrupting the brief", async () => {
  let db = { assistant: { ...catalogue, cases: [newCase("user:test")] } }, called = 0;
  const id = db.assistant.cases[0].id;
  async function sendMessage(body) {
    let response;
    await assistantRoutes({
      req: { method: "POST", headers: { host: "localhost" } }, res: {}, url: new URL(`http://localhost/api/assistant/cases/${id}/message`), db: structuredClone(db), actor: { user: { id: "test" } },
      send: (_, status, data) => { response = { status, data }; }, readBody: async () => ({ ...body, revision: db.assistant.cases[0].revision }),
      readDb: async () => structuredClone(db), writeDb: async next => { db = structuredClone(next); }, allowRequest: () => true, llmEnabled: () => true,
      requestLlmText: async () => { called++; return { text: JSON.stringify({ ...cleanBrief(), budgetMax: true }) }; },
      reply: async () => { called++; throw new Error("Provider unavailable"); }
    });
    return response;
  }
  await sendMessage({ message: "Find a rental condo in Penang under RM500k", allowAi: false });
  assert.equal(called, 0);
  await sendMessage({ message: "My budget is RM450k", allowAi: true });
  assert.equal(called, 1);
  assert.equal(db.assistant.cases[0].brief.budgetMax, 450000);
  assert.match(db.assistant.cases[0].messages.at(-1).content, /AI interpretation is unavailable/);
  await sendMessage({ message: "Can I afford this?", allowAi: true });
  assert.equal(called, 2);
  assert.match(db.assistant.cases[0].messages.at(-1).content, /not proof of buying power/);
  assert.equal(db.assistant.cases[0].messages.at(-1).mode, "framework");
});
