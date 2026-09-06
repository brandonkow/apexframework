import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { evaluateJourney, validateJourneyCandidate } from "../journey-engine.js";
import { analyzeSevenStageDeal } from "../server.js";
import { LEVELS, PREFERENCE_FIELDS, checkpointMissing } from "../public/journey/levels.js";

const fields = JSON.parse(readFileSync(new URL("../public/journey/fields.json", import.meta.url), "utf8"));

import { completeCandidate } from "./fixtures/journey-candidate.js";

test("Vercel routes the homepage ahead of its existing static index", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.deepEqual(config.redirects.find(route => route.source === "/"), { source: "/", destination: "/journey.html", permanent: false });
  assert.equal(config.outputDirectory, "public");
  assert.match(config.functions["api/router.js"].includeFiles, /public\/journey\/fields\.json/);
});

test("every existing input appears exactly once in the journey or preference roles", () => {
  const keys = [...LEVELS.flatMap(level => level.checkpoints.flatMap(point => point.fields)), ...PREFERENCE_FIELDS];
  assert.equal(new Set(keys).size, keys.length);
  assert.deepEqual([...keys].sort(), Object.keys(fields).sort());
  assert.equal(LEVELS.length, 7);
});

test("an empty or forged-complete journey cannot unlock later levels", () => {
  const result = evaluateJourney({ dealCard: {}, financialProfile: {}, completed: 7, qualified: true }, analyzeSevenStageDeal);
  assert.equal(result.completed, 0);
  assert.equal(result.qualified, false);
  assert.ok(result.levels.slice(1).every(level => level.status === "locked"));
});

test("all checkpoints require a dated evidence trail", () => {
  const candidate = completeCandidate();
  for (const level of LEVELS) for (const point of level.checkpoints) assert.deepEqual(checkpointMissing(candidate, point, fields), [], point.id);
  candidate.evidence.identity.date = "2099-01-01";
  assert.ok(checkpointMissing(candidate, LEVELS[0].checkpoints[0], fields).includes("evidenceDate"));
  candidate.evidence.identity.date = "2026-02-30";
  assert.ok(checkpointMissing(candidate, LEVELS[0].checkpoints[0], fields).includes("evidenceDate"));
});

test("a fully evidenced candidate uses the real seven-stage engine", () => {
  const candidate = completeCandidate();
  const result = evaluateJourney(candidate, analyzeSevenStageDeal);
  const analysis = analyzeSevenStageDeal(candidate.dealCard, candidate.financialProfile);
  assert.equal(result.verdict, analysis.verdict);
  assert.deepEqual(result.dimensions, analysis.dimensions);
  assert.equal(result.completed, 7, JSON.stringify(result.levels));
  assert.equal(result.qualified, analysis.verdict === "SHORTLIST");
  assert.equal(result.qualified, true);
});

test("each level can be cleared in sequence without needing locked fields", () => {
  const full = completeCandidate();
  const candidate = { dealCard: {}, financialProfile: {}, evidence: {} };
  for (const [index, level] of LEVELS.entries()) {
    for (const point of level.checkpoints) {
      for (const key of point.fields) candidate[fields[key].scope][key] = full[fields[key].scope][key];
      candidate.evidence[point.id] = full.evidence[point.id];
    }
    assert.equal(evaluateJourney(candidate, analyzeSevenStageDeal).completed, index + 1, level.id);
  }
});

test("editing earlier evidence removes downstream passes and eligibility", () => {
  const candidate = completeCandidate();
  delete candidate.dealCard.comparableSource;
  const result = evaluateJourney(candidate, analyzeSevenStageDeal);
  assert.equal(result.completed, 0);
  assert.equal(result.qualified, false);
  assert.ok(result.levels.slice(1).every(level => level.status === "locked"));
});

test("a real structural hard stop defeats completed forms", () => {
  const candidate = completeCandidate();
  candidate.dealCard.unitPosition = "Unfavourable";
  candidate.dealCard.managementQuality = "Weak";
  const result = evaluateJourney(candidate, analyzeSevenStageDeal);
  assert.equal(result.qualified, false);
  assert.equal(result.levels[0].status, "blocked");
  assert.ok(result.hardStops.length);
});

test("invalid types, arbitrary select values and negative amounts fail validation", () => {
  assert.throws(() => validateJourneyCandidate({ dealCard: { askingPrice: -2 } }), /non-negative/);
  assert.throws(() => validateJourneyCandidate({ dealCard: { askingPrice: "1,,000" } }), /non-negative/);
  assert.throws(() => validateJourneyCandidate({ financialProfile: { monthlyIncome: [] } }), /Invalid/);
  assert.throws(() => validateJourneyCandidate({ dealCard: { unitPosition: "injected-pass" } }), /valid/);
  assert.equal(validateJourneyCandidate({ financialProfile: { currentDebt: 0 } }).financialProfile.currentDebt, "0");
});
