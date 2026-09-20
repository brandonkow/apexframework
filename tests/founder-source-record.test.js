import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { parseFounderRecord } from "../scripts/import-founder-answers.js";
import { applyProposedLinks, proposeLinks } from "../scripts/link-belief-sources.js";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const exec = promisify(execFile);

test("founder maintenance CLIs execute on Windows paths and dry runs leave the source and seed untouched", async () => {
  const databasePath = path.join(repoDir, "data", "db.json"), sourcePath = path.join(repoDir, "docs", "FOUNDER_407_QA.md");
  const before = await readFile(databasePath), source = await readFile(sourcePath);
  const imported = await exec(process.execPath, [path.join(repoDir, "scripts", "import-founder-answers.js")], { cwd: repoDir });
  assert.match(imported.stdout, /Parsed 407 answers/); assert.match(imported.stdout, /Dry run/);
  const linked = await exec(process.execPath, [path.join(repoDir, "scripts", "link-belief-sources.js")], { cwd: repoDir });
  assert.match(linked.stdout, /Founder answers: 407/); assert.match(linked.stdout, /Dry run/);
  assert.deepEqual(await readFile(databasePath), before); assert.deepEqual(await readFile(sourcePath), source);
});

test("automatic source linking never replaces manual decisions and cannot revive stale singular links", () => {
  const manual = { id: "manual", sourceQuestionIds: ["S1-17"], sourceQuestionId: "S1-17", sourceQuote: "Confirmed by owner", sourceLinkMethod: "manual" };
  const stale = { id: "stale", sourceQuestionIds: ["S1-10"], sourceQuestionId: "S1-10", sourceQuote: "Old", sourceLinkMethod: "auto" };
  const automatic = { id: "automatic", sourceQuestionId: "S1-11", claim: "Do not change the claim" };
  const input = [manual, stale, automatic], original = structuredClone(input);
  const result = applyProposedLinks(input, [{ beliefId: "manual", confident: true, questionIds: ["S1-99"], quote: "Wrong auto overwrite" }, { beliefId: "automatic", confident: true, questionIds: ["S1-12"], quote: "Proposed excerpt" }]);
  assert.deepEqual(result.beliefs[0], manual);
  assert.deepEqual(result.beliefs[1], { id: "stale" });
  assert.equal(result.beliefs[2].sourceQuestionId, "S1-12");
  assert.equal(result.beliefs[2].claim, automatic.claim);
  assert.equal(result.applied, 1); assert.equal(result.cleared, 1);
  assert.deepEqual(input, original);
});

async function loadDb() {
  return JSON.parse(await readFile(path.join(repoDir, "data", "db.json"), "utf8"));
}

test("the founder interview record parses to all 407 answers", async () => {
  const markdown = await readFile(path.join(repoDir, "docs", "FOUNDER_407_QA.md"), "utf8");
  const answers = parseFounderRecord(markdown);
  assert.equal(answers.length, 407, "the record must hold exactly 407 answered questions");

  const byStage = answers.reduce((counts, item) => {
    const stage = item.questionId.split("-")[0];
    counts[stage] = (counts[stage] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(byStage, { S1: 124, S2: 20, S3: 20, S4: 27, S5: 20, S6: 29, S7: 27, EX: 140 });

  assert.equal(new Set(answers.map((item) => item.questionId)).size, 407, "question ids must be unique");
  assert.ok(answers.every((item) => item.answer), "every question must carry an answer");
  // The unanswered Stage 1 Section L block is an appendix and must stay outside the count.
  assert.ok(!answers.some((item) => item.questionId === "S1-125"), "appendix questions must not be imported");
});

test("parsing is deterministic, so re-import cannot duplicate or reorder answers", async () => {
  const markdown = await readFile(path.join(repoDir, "docs", "FOUNDER_407_QA.md"), "utf8");
  assert.deepEqual(parseFounderRecord(markdown), parseFounderRecord(markdown));
});

test("the seeded database carries the founder answers with their rule files", async () => {
  const db = await loadDb();
  const founder = db.brain.answers.filter((item) => item.source === "founder-interview-2026");
  assert.equal(founder.length, 407);
  assert.ok(founder.every((item) => item.ruleFile), "each answer must name the rule file written from it");

  const priceBand = founder.find((item) => item.questionId === "S1-17");
  assert.match(priceBand.answer, /400k to 500k/, "the founder's own price band must survive verbatim");
  assert.equal(priceBand.ruleFile, "docs/MY_INVESTMENT_FRAMEWORK.md");

  // Deferred answers are still answers: they record that the founder handed the
  // rule to Apex rather than that the question was skipped.
  const deferred = founder.filter((item) => item.deferred);
  assert.ok(deferred.length >= 20 && deferred.length <= 40, `unexpected deferral count ${deferred.length}`);
});

test("beliefs are traceable back to the answers that produced them", async () => {
  const db = await loadDb();
  const traced = db.brain.beliefs.filter((item) => item.sourceQuestionIds?.length);
  assert.ok(traced.length >= 45, `expected most beliefs traced, got ${traced.length}`);
  assert.ok(traced.every((item) => item.sourceQuote), "a traced belief must keep a verbatim excerpt");

  const answerIds = new Set(db.brain.answers.map((item) => item.questionId));
  for (const belief of traced) {
    for (const questionId of belief.sourceQuestionIds) {
      assert.ok(answerIds.has(questionId), `${belief.id} cites missing question ${questionId}`);
    }
  }

  const priceBand = db.brain.beliefs.find((item) => item.id === "stage-1c-price-band-liquidity");
  assert.deepEqual(priceBand.sourceQuestionIds, ["S1-17"]);
  assert.match(priceBand.sourceQuote, /400k to 500k/);
});

test("the matcher links a belief to the right question and refuses ambiguous ones", async () => {
  const db = await loadDb();
  const answers = db.brain.answers.filter((item) => item.source === "founder-interview-2026");
  const pick = (id) => db.brain.beliefs.filter((item) => item.id === id);

  const [traffic] = proposeLinks(pick("stage-1b-relevant-human-traffic"), answers);
  assert.equal(traffic.confident, true);
  assert.deepEqual(traffic.questionIds, ["S1-11"], "human traffic must map to the traffic question, not a general lesson");

  // A belief spanning adjacent answers in one section should collect all of them.
  const [discount] = proposeLinks(pick("stage-1c-discount-premium-discipline"), answers);
  assert.equal(discount.multiSource, true);
  assert.ok(discount.questionIds.includes("S1-22"), "the discount rule must cite the discount question");

  // A belief with no real textual anchor must stay unlinked rather than guess.
  const invented = [{
    id: "invented-belief",
    scope: "Stage 1 selection",
    claim: "Zzz qqq xyzzy plugh frobnicate.",
    evidenceFor: "",
    confidence: 50
  }];
  const [noMatch] = proposeLinks(invented, answers);
  assert.equal(noMatch.confident, false, "an unanchored belief must not be given a source");
  assert.deepEqual(noMatch.questionIds, []);
});
