import { readFileSync } from "node:fs";
import { LEVELS, NUMERIC_FIELDS, checkpointMissing, valueFor } from "./public/journey/levels.js";

const fields = JSON.parse(readFileSync(new URL("./public/journey/fields.json", import.meta.url), "utf8"));

export function validateJourneyCandidate(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Provide a candidate object.");
  const candidate = { dealCard: {}, financialProfile: {}, evidence: {} };
  for (const [key, field] of Object.entries(fields)) {
    const value = raw[field.scope]?.[key];
    if (value === undefined || value === null || value === "") continue;
    if (!["string", "number"].includes(typeof value)) throw new Error(`Invalid ${field.label}.`);
    const text = String(value).trim();
    if (text.length > 500) throw new Error(`${field.label} must be under 500 characters.`);
    if (field.options.length && !field.options.some(option => option.value === text)) throw new Error(`Select a valid ${field.label.toLowerCase()}.`);
    if (NUMERIC_FIELDS.has(key) && !/^(?:RM\s*)?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?\s*(?:k|m)?(?:\s*(?:\/month|\/year|sf|sqft|years?|months?))?$/i.test(text)) throw new Error(`Use a non-negative amount for ${field.label}.`);
    candidate[field.scope][key] = text;
  }
  for (const level of LEVELS) for (const point of level.checkpoints) {
    const proof = raw.evidence?.[point.id];
    if (proof && typeof proof === "object") candidate.evidence[point.id] = {
      note: String(proof.note ?? "").slice(0, 1500), date: String(proof.date ?? "").slice(0, 10)
    };
  }
  return candidate;
}

export function evaluateJourney(raw, analyze) {
  const candidate = validateJourneyCandidate(raw);
  const analysis = analyze(candidate.dealCard, candidate.financialProfile);
  let previousPassed = true;
  const levels = LEVELS.map((level, index) => {
    const stage = analysis.stages.find(item => item.number === index + 1);
    const checkpoints = level.checkpoints.map(point => {
      const missing = checkpointMissing(candidate, point, fields);
      return { id: point.id, complete: !missing.length, missing };
    });
    const completed = checkpoints.filter(item => item.complete).length;
    const stageStops = (analysis.hardStops || []).filter(item => item.startsWith(`Stage ${index + 1}:`));
    const ready = completed === checkpoints.length;
    const blocked = stageStops.length > 0 || (ready && stage?.status === "risk");
    const passed = previousPassed && ready && !blocked && stage?.status === "pass";
    const status = !previousPassed ? "locked" : blocked ? "blocked" : passed ? "passed" : ready ? "review" : "active";
    const result = { id: level.id, status, score: stage?.score ?? 0, summary: stage?.summary || "", completed, total: checkpoints.length, checkpoints, blockers: stageStops };
    previousPassed = passed;
    return result;
  });
  const completed = levels.filter(level => level.status === "passed").length;
  return {
    version: "journey.v1", levels, completed, total: LEVELS.length,
    qualified: completed === LEVELS.length && analysis.verdict === "SHORTLIST" && !(analysis.hardStops || []).length && !(analysis.recommendationBlockers || []).length,
    verdict: analysis.verdict, summary: analysis.summary,
    hardStops: analysis.hardStops || [], blockers: analysis.recommendationBlockers || [],
    dimensions: analysis.dimensions, counterThesis: analysis.counterThesis,
    evidence: analysis.evidenceEngine?.summary || "Evidence still needs review.",
    candidateName: valueFor(candidate, "projectName", fields) || valueFor(candidate, "area", fields) || "Untitled property"
  };
}
