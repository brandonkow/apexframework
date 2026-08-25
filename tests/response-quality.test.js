import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { retrieveJarvisAnswer } from "../server.js";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const db = JSON.parse(await readFile(path.join(repoDir, "data", "db.json"), "utf8"));
const emptyKnowledge = {
  version: 4,
  documents: [],
  chunks: [],
  retrievalEvents: [],
  projects: [],
  observations: [],
  developmentCases: [],
  researchStudies: [],
  ownerRestoreEvents: [],
  ownerRollbackSnapshots: [],
  ownerBackupEvents: [],
  ownerBackupReminderEvents: []
};

async function answer(query, priorMessages = []) {
  const session = { messages: [...priorMessages, { role: "user", content: query }] };
  return retrieveJarvisAnswer(query, db.brain, session, {}, emptyKnowledge, [], []);
}

function assertDecisionBrief(result) {
  assert.match(result.answer, /^Current view\n/);
  assert.match(result.answer, /What supports it/);
  assert.match(result.answer, /Strongest counter-case/);
  assert.match(result.answer, /What would change the view/);
  assert.match(result.answer, /Blind spot \/ alternative angle/);
  assert.match(result.answer, /Next best move/);
  assert.match(result.answer, /Questions for you/);
}

test("comparison questions receive a portfolio trade-off rather than generic cheap-property advice", async () => {
  const result = await answer("Compare buying one RM600k condo with three RM200k flats.");
  assertDecisionBrief(result);
  assert.match(result.answer, /Do not choose by property count or unit price/);
  assert.match(result.answer, /borrowing capacity and management attention/i);
});

test("booking-fee questions produce a decision-changing evidence gate", async () => {
  const result = await answer("What evidence should I collect before paying the booking fee?");
  assertDecisionBrief(result);
  assert.match(result.answer, /exact booking-fee refund terms/i);
  assert.doesNotMatch(result.answer, /rent can cover installment plus recurring charges/i);
});

test("catalyst enthusiasm is challenged with pricing, execution, and a no-catalyst case", async () => {
  const result = await answer("I love this project and the agent says prices will jump after the new LRT. Challenge my view.");
  assertDecisionBrief(result);
  assert.match(result.answer, /already embedded in today's price/i);
  assert.match(result.answer, /Test the no-catalyst case/i);
  assert.match(result.answer, /thesis wrong or show that it is already fully priced/i);
});

test("a substantive current question is not polluted by an unrelated prior assistant answer", async () => {
  const result = await answer("What evidence should I collect before paying the booking fee?", [
    { role: "user", content: "Explain marked-up financing." },
    { role: "jarvis", content: "A lender-knowledge test is required for artificial pricing." }
  ]);
  assert.match(result.answer, /booking-fee refund terms/i);
  assert.doesNotMatch(result.answer, /artificial pricing|lender deception/i);
});
