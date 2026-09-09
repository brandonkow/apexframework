import { createHash, randomUUID } from "node:crypto";
import { addEvent, assistantState, fail, isoNow, text } from "./investment-assistant.js";
import { effectiveContext } from "./assistant-context.js";
import { malaysiaDate } from "./assistant-calendar.js";

const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const rounded = value => Math.round((value + Number.EPSILON) * 100) / 100;
function month(value) {
  if (typeof value !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value) || value < "1990-01" || value > "2100-12") fail("Use a valid calendar month.");
  return value;
}
function optionalMoney(value) {
  if (value == null || value === "") return null;
  if (!["number", "string"].includes(typeof value) || !/^\d+(?:\.\d{1,2})?$/.test(String(value)) || Number(value) > 1e7) fail("Use a non-negative monthly amount with at most two decimal places, or leave it unknown.");
  return Number(value);
}
function required(value, label, max = 1500) {
  if (typeof value !== "string" || value.trim().length > max) fail(`Use text of at most ${max} characters for ${label}.`);
  const result = text(value, max); if (result.length < 12) fail(`Record ${label} in enough detail to review later.`); return result;
}
export function learningState(item) { return item.learning || { theses: [], reviews: [] }; }
export function beliefEligibleForGuidance(belief) { return belief.status !== "retired" && (!belief.learningProposalId || belief.status === "active"); }
export function compareThesis(item, thesis, throughMonth, now = Date.now()) {
  const end = month(throughMonth), todayMonth = malaysiaDate(now).slice(0, 7);
  if (end < thesis.startMonth || end > todayMonth) fail("Choose an outcome month from the thesis start through the current month.");
  const months = [];
  for (let cursor = thesis.startMonth; cursor <= end;) {
    months.push(cursor); if (months.length > 120) fail("Review no more than 120 months at a time.");
    const [year, number] = cursor.split("-").map(Number); cursor = number === 12 ? `${year + 1}-01` : `${year}-${String(number + 1).padStart(2, "0")}`;
  }
  const outcomes = item.outcomes.filter(row => months.includes(row.month)).slice().sort((a, b) => a.month.localeCompare(b.month));
  const count = outcomes.length, rent = rounded(outcomes.reduce((sum, row) => sum + row.rentReceived, 0)), costs = rounded(outcomes.reduce((sum, row) => sum + row.totalCosts, 0));
  const expectedRent = thesis.expectedMonthlyRent == null ? null : rounded(thesis.expectedMonthlyRent * count);
  const expectedCosts = thesis.expectedMonthlyCosts == null ? null : rounded(thesis.expectedMonthlyCosts * count);
  return { startMonth: thesis.startMonth, throughMonth: end, recordedMonths: count, missingMonths: months.filter(value => !outcomes.some(row => row.month === value)), includesCurrentMonth: end === todayMonth, actualRent: count ? rent : null, actualCosts: count ? costs : null, actualCashFlow: count ? rounded(rent - costs) : null, expectedCashFlow: count && expectedRent != null && expectedCosts != null ? rounded(expectedRent - expectedCosts) : null, cashFlowGap: count && expectedRent != null && expectedCosts != null ? rounded(rent - costs - expectedRent + expectedCosts) : null, outcomes: structuredClone(outcomes), outcomeHash: digest(outcomes), previewHash: digest({ thesisId: thesis.id, end, outcomes }), boundary: "Compares only recorded months, not unrecorded months treated as zero. User-declared cash flow is not net yield, valuation, verified performance or proof of causality." };
}
function submissionFields(raw) {
  return { claim: required(raw.claim, "the proposed lesson"), scope: required(raw.scope, "its limited scope", 300), evidenceFor: required(raw.evidenceFor, "supporting evidence"), evidenceAgainst: required(raw.evidenceAgainst, "the contrary case or evidence limitation"), falsifier: required(raw.falsifier, "what would disprove the lesson") };
}
export function reviewChanged(item, review) {
  const thesis = learningState(item).theses.find(value => value.id === review.thesisId);
  return !thesis || compareThesis(item, thesis, review.comparison.throughMonth).outcomeHash !== review.comparison.outcomeHash;
}
export function learningView(item, data = { lessonProposals: [] }) {
  const state = learningState(item), thesis = state.theses.at(-1), currentMonth = malaysiaDate().slice(0, 7);
  const monthIndex = value => Number(value.slice(0, 4)) * 12 + Number(value.slice(5));
  const canCompare = thesis && thesis.startMonth <= currentMonth && monthIndex(currentMonth) - monthIndex(thesis.startMonth) < 120;
  return { ...state, currentComparison: canCompare ? compareThesis(item, thesis, currentMonth) : null, reviews: state.reviews.map(review => ({ ...review, outcomesChanged: reviewChanged(item, review) })), proposals: (data.lessonProposals || []).filter(value => value.caseId === item.id && (!item.scope || value.scope === item.scope)).map(value => ({ id: value.id, reviewId: value.reviewId, status: value.status, submittedAt: value.submittedAt, submission: value.submission, decision: value.decision || null, beliefId: value.beliefId || null })) };
}
function caseAction(item, data, body, authenticated) {
  if (!item.selected) fail("Select a property before keeping its thesis and lessons.");
  item.learning ||= { theses: [], reviews: [] };
  const state = item.learning;
  if (body.action === "lock") {
    if (body.confirmLock !== true) fail("Confirm that this dated thesis will be retained unchanged. Later changes require another version.");
    if (state.theses.length >= 12) fail("This investigation already holds 12 thesis versions.");
    const startMonth = month(body.startMonth), nowMonth = malaysiaDate().slice(0, 7);
    const thesis = { id: randomUUID(), version: state.theses.length + 1, lockedAt: isoNow(), startMonth, expectedMonthlyRent: optionalMoney(body.expectedMonthlyRent), expectedMonthlyCosts: optionalMoney(body.expectedMonthlyCosts), claim: required(body.claim, "the investment thesis"), counterCase: required(body.counterCase, "the strongest contrary case"), falsifier: required(body.falsifier, "the evidence that would invalidate it"), recordedStage: item.stage, retrospective: startMonth < nowMonth || ["handover", "rental", "review"].includes(item.stage) || item.outcomes.some(row => row.month >= startMonth), workingSnapshot: structuredClone(effectiveContext(item)), selectedId: item.selected.id, sourceSnapshotHash: digest(item.selected), status: "user_declared" };
    if (startMonth > `${Number(nowMonth.slice(0, 4)) + 2}-${nowMonth.slice(5)}`) fail("Keep a new thesis start within two years of today.");
    state.theses.push(thesis);
    addEvent(item, "thesis", `Thesis v${thesis.version} locked at the actual recording time${thesis.retrospective ? "; retrospective/post-purchase record, not a pre-purchase forecast" : "; user-declared, not verified pre-purchase evidence"}.`);
  } else if (body.action === "review") {
    if (state.reviews.length >= 36) fail("This investigation already holds 36 outcome reviews.");
    const thesis = state.theses.find(value => value.id === body.thesisId); if (!thesis) fail("Choose a locked thesis from this investigation.");
    const comparison = compareThesis(item, thesis, body.throughMonth);
    if (body.previewHash !== comparison.previewHash) fail("Compare the current recorded months before confirming this review.", 409);
    if (!comparison.recordedMonths) fail("Record at least one actual monthly outcome before drawing a lesson.");
    if (body.confirmReview !== true) fail("Confirm you reviewed the recorded outcomes, missing months and contrary explanation.");
    const review = { id: randomUUID(), version: state.reviews.length + 1, thesisId: thesis.id, reviewedAt: isoNow(), comparison, conclusion: required(body.conclusion, "what happened"), alternative: required(body.alternative, "an alternative explanation, including luck or execution"), lesson: required(body.lesson, "the bounded lesson"), nextEvidence: required(body.nextEvidence, "the next evidence needed to test it"), status: "private_user_reviewed" };
    state.reviews.push(review); addEvent(item, "learning_review", `Outcome review v${review.version} saved privately; not model training, shared knowledge or proof that the thesis is correct.`);
  } else if (body.action === "share") {
    if (!authenticated) fail("Sign in and import this investigation before submitting a lesson for owner review.", 401);
    if (body.consentShare !== true) fail("Explicitly consent to sharing only the edited proposal text with the owner, and to possible publication after owner approval.");
    const review = state.reviews.find(value => value.id === body.reviewId); if (!review) fail("Choose your recorded outcome review.");
    if (reviewChanged(item, review)) fail("The actual outcomes changed after this review. Record a new review before sharing a lesson.", 409);
    data.lessonProposals ||= [];
    if (data.lessonProposals.filter(value => value.scope === item.scope && value.status === "pending").length >= 5 || data.lessonProposals.length >= 500) fail("The proposal queue is full. Review or withdraw pending proposals first.");
    if (data.lessonProposals.some(value => value.caseId === item.id && value.reviewId === review.id && value.status !== "withdrawn")) fail("This review already has a submitted proposal. Its receipt is shown below.", 409);
    const proposal = { id: randomUUID(), scope: item.scope, caseId: item.id, reviewId: review.id, reviewHash: digest(review), revision: 0, submittedAt: isoNow(), status: "pending", submission: submissionFields(body.submission || {}), consent: { share: true, publishAfterOwnerApproval: true, at: isoNow() } };
    data.lessonProposals.push(proposal); addEvent(item, "lesson_proposal", "Edited lesson text submitted for owner review by explicit consent. Private source files, finances and full case records were not submitted.");
  } else if (body.action === "withdraw") {
    const proposal = data.lessonProposals?.find(value => value.id === body.proposalId && value.scope === item.scope && value.caseId === item.id);
    if (!proposal || proposal.status !== "pending") fail("Only a pending proposal can be withdrawn. Approved hypotheses are managed by the owner.", 409);
    proposal.status = "withdrawn"; proposal.submission = null; proposal.revision++; proposal.withdrawnAt = isoNow();
    addEvent(item, "lesson_withdrawal", "Pending lesson proposal withdrawn before approval.");
  } else fail("Choose a learning action.");
}
export async function saveLearning(caseId, scope, revision, body, authenticated, deps) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await deps.readDb(), data = assistantState(db), item = data.cases.find(value => value.id === caseId && value.scope === scope);
    if (!item || item.revision !== revision) fail("This investigation changed or was deleted. Reload before saving the learning record.", 409);
    caseAction(item, data, body, authenticated);
    try { await deps.writeDb(db); return { item, data }; } catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}
export function publicProposal(proposal, data) {
  const item = data.cases.find(value => value.id === proposal.caseId && value.scope === proposal.scope), review = item && learningState(item).reviews.find(value => value.id === proposal.reviewId);
  return { id: proposal.id, revision: proposal.revision, status: proposal.status, submittedAt: proposal.submittedAt, submission: proposal.submission, decision: proposal.decision || null, beliefId: proposal.beliefId || null, sourceChanged: Boolean(proposal.status === "pending" && !review || item && (!review || digest(review) !== proposal.reviewHash || reviewChanged(item, review))) };
}
export async function decideProposal(body, deps) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await deps.readDb(), data = assistantState(db), proposal = data.lessonProposals?.find(value => value.id === body.proposalId);
    if (!proposal) fail("Proposal not found.", 404);
    if (proposal.status !== "pending" || body.proposalRevision !== proposal.revision) fail("This proposal has already changed or been decided. Reload the queue.", 409);
    if (!["approve", "decline"].includes(body.action)) fail("Choose approve or decline.");
    const note = required(body.note, "the owner's review reason", 1000);
    if (body.action === "approve") {
      if (body.confirmPublish !== true) fail("Explicitly confirm publication of the edited, privacy-checked hypothesis.");
      if (publicProposal(proposal, data).sourceChanged) fail("The contributing outcome record changed. Request a new review before publishing this hypothesis.", 409);
      const fields = submissionFields(body.publication || {});
      const belief = deps.normalizeBelief({ ...fields, id: randomUUID(), status: "contested", confidence: 25, createdAt: isoNow(), nextReview: new Date(Date.now() + 90 * 86400000).toISOString(), reviewIntervalDays: 90, learningProposalId: proposal.id });
      db.brain.beliefs.push(belief); proposal.beliefId = belief.id;
      proposal.decision = { note, publication: fields, at: isoNow(), status: "owner_approved_hypothesis" }; proposal.status = "approved";
    } else { proposal.status = "declined"; proposal.decision = { note, at: isoNow(), status: "owner_declined" }; }
    proposal.revision++;
    try { await deps.writeDb(db); return publicProposal(proposal, data); } catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}
export function removeLearningProposals(data, caseId, scope) {
  data.lessonProposals = (data.lessonProposals || []).filter(value => {
    if (value.caseId !== caseId || value.scope !== scope) return true;
    if (value.status !== "approved") return false;
    value.scope = ""; value.caseId = ""; value.reviewId = ""; value.reviewHash = ""; value.submission = null;
    return true;
  });
}
