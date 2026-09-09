import test from "node:test";
import assert from "node:assert/strict";
import { newCase } from "../investment-assistant.js";
import { saveLearning, compareThesis, learningView, publicProposal, decideProposal } from "../assistant-learning.js";
import { deleteInvestigation } from "../assistant-context.js";
import { assistantRoutes } from "../assistant-routes.js";
import { beliefEligibleForGuidance } from "../assistant-learning.js";

test("owner approval alone does not turn a contributed hypothesis into answer guidance", () => {
  assert.equal(beliefEligibleForGuidance({ status: "contested", learningProposalId: "proposal" }), false);
  assert.equal(beliefEligibleForGuidance({ status: "active", learningProposalId: "proposal" }), true);
  assert.equal(beliefEligibleForGuidance({ status: "retired", learningProposalId: "proposal" }), false);
  assert.equal(beliefEligibleForGuidance({ status: "active" }), true);
});

const lock = { action: "lock", startMonth: "2026-01", expectedMonthlyRent: 2500, expectedMonthlyCosts: 2200, claim: "The unit can sustain rent with a broad tenant market.", counterCase: "Newer competing stock may remove the rent premium.", falsifier: "Sustained achieved rent below the full holding cost.", confirmLock: true };
const submission = { claim: "Test rent resilience against comparable newer supply.", scope: "One Malaysian high-rise rental case, not all housing.", evidenceFor: "Two user-declared monthly observations support a review.", evidenceAgainst: "Missing months and unknown seasonality limit the inference.", falsifier: "A larger comparable sample consistently contradicts this pattern." };
function fixture() {
  const item = newCase("user:one"); item.selected = { id: "qa:1", projectName: "PRIVATE SUBJECT", facts: [], selectedAt: new Date().toISOString() }; item.stage = "rental";
  item.outcomes = [{ id: "jan", month: "2026-01", rentReceived: 2400, totalCosts: 2200, cashFlow: 200, note: "PRIVATE NOTE" }, { id: "mar", month: "2026-03", rentReceived: 0, totalCosts: 2300, cashFlow: -2300, note: "Vacancy" }];
  let db = { assistant: { cases: [item], listings: [], sources: [] }, brain: { beliefs: [], answers: [{ protected: true }] } };
  const deps = { readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, normalizeBelief: value => value };
  async function act(body, authenticated = true) { const latest = db.assistant.cases[0]; return saveLearning(latest.id, latest.scope, latest.revision, body, authenticated, deps); }
  return { deps, act, latest: () => structuredClone(db.assistant.cases[0]), db: () => structuredClone(db) };
}
async function reviewed(f) {
  await f.act(lock); const item = f.latest(), thesis = item.learning.theses[0], comparison = compareThesis(item, thesis, "2026-03");
  await f.act({ action: "review", thesisId: thesis.id, throughMonth: "2026-03", previewHash: comparison.previewHash, conclusion: "Recorded monthly cash flow fell below the planned level.", alternative: "Vacancy and timing may explain the difference rather than poor building quality.", lesson: "Test a longer period before assuming the rent premium is durable.", nextEvidence: "Collect signed rents and all costs for the missing months.", confirmReview: true });
  return f.latest().learning.reviews[0];
}
async function shared(f) { const review = await reviewed(f); await f.act({ action: "share", reviewId: review.id, consentShare: true, submission }); return f.db().assistant.lessonProposals[0]; }
test("locked versions retain actual recording time, immutable working inputs and retrospective labels", async () => {
  const f = fixture(); await f.act(lock); const old = f.latest().learning.theses[0];
  assert.equal(old.retrospective, true); assert.equal(old.expectedMonthlyRent, 2500); assert.equal(old.version, 1);
  await f.act({ ...lock, expectedMonthlyRent: 2300 });
  assert.deepEqual(f.latest().learning.theses[0], old); assert.equal(f.latest().learning.theses[1].version, 2);
  for (const change of [{ claim: {} }, { claim: "a".repeat(1501) }, { confirmLock: false }, { expectedMonthlyCosts: true }, { expectedMonthlyRent: "RM2k" }, { expectedMonthlyCosts: -1 }, { startMonth: "2026-13" }, { startMonth: "2099-01" }]) await assert.rejects(f.act({ ...lock, ...change }));
  assert.deepEqual(f.db().brain, { beliefs: [], answers: [{ protected: true }] });
});
test("comparison keeps missing months unknown, includes a zero-rent month and never calls cash flow a yield", async () => {
  const f = fixture(); await f.act(lock); const item = f.latest(), view = compareThesis(item, item.learning.theses[0], "2026-03");
  assert.equal(view.recordedMonths, 2); assert.deepEqual(view.missingMonths, ["2026-02"]);
  assert.equal(view.actualCashFlow, -2100); assert.equal(view.expectedCashFlow, 600); assert.equal(view.cashFlowGap, -2700);
  assert.match(view.boundary, /not net yield/);
  const unknown = compareThesis(item, { ...item.learning.theses[0], expectedMonthlyCosts: null }, "2026-03"); assert.equal(unknown.cashFlowGap, null);
  assert.throws(() => compareThesis(item, item.learning.theses[0], "2099-01"));
});
test("reviews require a current preview and retain their original outcome snapshot after corrections", async () => {
  const f = fixture(), review = await reviewed(f), db = f.db(); db.assistant.cases[0].outcomes[0].rentReceived = 999;
  await f.deps.writeDb(db);
  assert.equal(learningView(f.latest()).reviews[0].outcomesChanged, true);
  assert.equal(f.latest().learning.reviews[0].comparison.actualRent, 2400);
  await assert.rejects(f.act({ action: "share", reviewId: review.id, consentShare: true, submission }), error => error.statusCode === 409);
});
test("sharing requires account and explicit consent and exposes only the edited proposal", async () => {
  const f = fixture(), review = await reviewed(f);
  await assert.rejects(f.act({ action: "share", reviewId: review.id, consentShare: true, submission }, false), error => error.statusCode === 401);
  await assert.rejects(f.act({ action: "share", reviewId: review.id, submission }));
  await f.act({ action: "share", reviewId: review.id, consentShare: true, submission });
  const proposal = f.db().assistant.lessonProposals[0], publicView = publicProposal(proposal, f.db().assistant);
  assert.doesNotMatch(JSON.stringify(publicView), /PRIVATE SUBJECT|PRIVATE NOTE|user:one|caseId|reviewId|2500|2200/);
  assert.deepEqual(publicView.submission, submission); assert.equal(f.db().brain.beliefs.length, 0);
  await assert.rejects(f.act({ action: "share", reviewId: review.id, consentShare: true, submission }), error => error.statusCode === 409);
});
test("owner approval publishes one contested hypothesis and cannot duplicate or rewrite the foundation", async () => {
  const f = fixture(), proposal = await shared(f), request = { proposalId: proposal.id, proposalRevision: 0, action: "approve", note: "Reviewed the redacted claim, boundaries and contrary explanation.", confirmPublish: true, publication: submission };
  await assert.rejects(decideProposal({ ...request, confirmPublish: false }, f.deps));
  await decideProposal(request, f.deps); const belief = f.db().brain.beliefs[0];
  assert.equal(belief.status, "contested"); assert.equal(belief.learningProposalId, proposal.id); assert.equal(belief.reviewIntervalDays, 90);
  assert.deepEqual(f.db().brain.answers, [{ protected: true }]);
  await assert.rejects(decideProposal(request, f.deps), error => error.statusCode === 409); assert.equal(f.db().brain.beliefs.length, 1);
});
test("withdrawal and deleted investigations defeat pending approvals; approved public text can outlive private deletion", async () => {
  const f = fixture(), proposal = await shared(f);
  await f.act({ action: "withdraw", proposalId: proposal.id });
  assert.equal(f.db().assistant.lessonProposals[0].submission, null);
  await assert.rejects(decideProposal({ proposalId: proposal.id, proposalRevision: 0, action: "approve" }, f.deps));
  const other = fixture(), pending = await shared(other), item = other.latest();
  await deleteInvestigation(item.id, item.scope, other.deps);
  assert.equal(other.db().assistant.lessonProposals.length, 0);
  await assert.rejects(decideProposal({ proposalId: pending.id }, other.deps), error => error.statusCode === 404);
  const approved = fixture(), p = await shared(approved), record = approved.latest();
  await decideProposal({ proposalId: p.id, proposalRevision: 0, action: "approve", note: "Reviewed and accepted as a narrow testable hypothesis.", confirmPublish: true, publication: submission }, approved.deps);
  await deleteInvestigation(record.id, record.scope, approved.deps);
  const retained = approved.db().assistant.lessonProposals[0]; assert.equal(retained.caseId, ""); assert.equal(retained.scope, ""); assert.equal(retained.submission, null); assert.equal(approved.db().brain.beliefs.length, 1);
});
test("case changes and outcome corrections cannot be overwritten by slow proposal saves", async () => {
  const f = fixture(), proposal = await shared(f), db = f.db(); db.assistant.cases[0].outcomes[0].totalCosts++;
  await f.deps.writeDb(db);
  assert.equal(publicProposal(proposal, f.db().assistant).sourceChanged, true);
  await assert.rejects(decideProposal({ proposalId: proposal.id, proposalRevision: 0, action: "approve", note: "Attempted approval after the source changed.", confirmPublish: true, publication: submission }, f.deps), error => error.statusCode === 409);
  const item = f.latest(); await f.act(lock);
  await assert.rejects(saveLearning(item.id, item.scope, item.revision, lock, true, f.deps), error => error.statusCode === 409);
});
test("learning endpoints are scoped, owner-gated and reject malformed bodies without model use", async () => {
  const f = fixture(); let calls = 0;
  async function request(path, body, user = "one", ownerAuthorized = false, method = "POST") {
    let result; const deps = { ...f.deps, req: { method, headers: { host: "localhost", origin: "http://localhost" } }, res: {}, url: new URL("http://localhost" + path), db: f.db(), actor: { user: { id: user } }, send: (_, status, data) => { result = { status, ...data }; }, readBody: async () => body, allowRequest: () => true, ownerAuthorized, llmEnabled: () => true, requestLlmText: () => { calls++; } };
    try { await assistantRoutes(deps); } catch (error) { result = { status: error.statusCode }; } return result;
  }
  const path = `/api/assistant/cases/${f.latest().id}/learning`;
  assert.equal((await request(path, { ...lock, revision: 0 }, "two")).status, 404);
  assert.equal((await request(path, null)).status, 400);
  assert.equal((await request(path, { ...lock, revision: 0 })).status, 200);
  assert.equal((await request("/api/owner/lessons", null, "one", false, "GET")).status, 403);
  assert.equal((await request("/api/owner/lessons", null, "one", true, "GET")).status, 200);
  assert.equal(calls, 0);
});

test("old thesis snapshots do not prevent case reads or export when an automatic comparison exceeds ten years", () => {
  const item = fixture().latest(); item.learning = { theses: [{ id: "old", startMonth: "1990-01" }], reviews: [] };
  assert.equal(learningView(item).currentComparison, null);
});

test("approval retries preserve unrelated writes and cannot defeat a concurrent withdrawal", async () => {
  const f = fixture(), proposal = await shared(f), write = f.deps.writeDb;
  const request = { proposalId: proposal.id, proposalRevision: 0, action: "approve", note: "Review the counter-case before generalising this lesson.", confirmPublish: true, publication: submission };
  let injected = false;
  f.deps.writeDb = async db => {
    if (!injected) { injected = true; const latest = f.db(); latest.unrelated = "keep this concurrent change"; await write(latest); throw Object.assign(new Error("conflict"), { name: "StorageConflictError" }); }
    return write(db);
  };
  await decideProposal(request, f.deps);
  assert.equal(f.db().unrelated, "keep this concurrent change"); assert.equal(f.db().brain.beliefs.length, 1);
  const other = fixture(), pending = await shared(other), writeOther = other.deps.writeDb;
  other.deps.writeDb = async () => {
    const latest = other.db(); latest.assistant.lessonProposals[0].status = "withdrawn"; latest.assistant.lessonProposals[0].revision++;
    await writeOther(latest); throw Object.assign(new Error("conflict"), { name: "StorageConflictError" });
  };
  await assert.rejects(decideProposal({ ...request, proposalId: pending.id }, other.deps), error => error.statusCode === 409);
  assert.equal(other.db().brain.beliefs.length, 0);
});
