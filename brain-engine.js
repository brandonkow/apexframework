import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { analyzeSevenStageDeal } from "./server.js";
import { evaluateJourney, validateJourneyCandidate } from "./journey-engine.js";
import { LEVELS } from "./public/journey/levels.js";

export const ENGINE_CONTRACT = "apex.brain.v1";
export const ENGINE_INPUT_LIMIT = 256 * 1024;
const fields = JSON.parse(readFileSync(new URL("./public/journey/fields.json", import.meta.url), "utf8"));
const checkpoints = LEVELS.flatMap(level => level.checkpoints);
const checkpointIds = new Set(checkpoints.map(point => point.id));
const scopes = ["dealCard", "financialProfile", "evidence"];
const evidenceNotice = "Inputs and evidence notes are caller-supplied, not independently verified. A shortlist is permission to investigate further, not approval to buy.";
const confidenceNotice = "This is the existing rule-based assessment score, not a calibrated probability of profit or independent verification.";

export class EngineInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "EngineInputError";
    this.code = "INVALID_ENGINE_INPUT";
  }
}

function record(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && [Object.prototype, null].includes(Object.getPrototypeOf(value));
}

function normalizeInput(input) {
  if (!record(input)) throw new EngineInputError("Provide a JSON object with dealCard, financialProfile and optional evidence.");
  let serialized;
  try { serialized = JSON.stringify(input); } catch { throw new EngineInputError("Input must be JSON serializable."); }
  if (Buffer.byteLength(serialized, "utf8") > ENGINE_INPUT_LIMIT) throw new EngineInputError("Input exceeds 256 KiB.");
  if (Object.keys(input).some(key => !scopes.includes(key))) throw new EngineInputError("Unknown top-level field. Only dealCard, financialProfile and evidence are accepted.");
  for (const scope of scopes) {
    if (input[scope] === undefined) continue;
    if (!record(input[scope])) throw new EngineInputError(`${scope} must be an object.`);
    if (scope === "evidence") {
      for (const [id, proof] of Object.entries(input.evidence)) {
        if (!checkpointIds.has(id)) throw new EngineInputError("Unknown evidence checkpoint; consult the engine schema.");
        if (!record(proof) || Object.keys(proof).some(key => !["note", "date"].includes(key))) throw new EngineInputError("Each evidence checkpoint accepts only note and date.");
        if (proof.note !== undefined && (typeof proof.note !== "string" || proof.note.length > 1500)) throw new EngineInputError("Evidence notes must be text of at most 1500 characters.");
        if (proof.date !== undefined && (typeof proof.date !== "string" || proof.date.length > 10)) throw new EngineInputError("Evidence dates must be text in YYYY-MM-DD format.");
      }
    } else if (Object.keys(input[scope]).some(key => fields[key]?.scope !== scope)) {
      throw new EngineInputError(`Unknown or misplaced ${scope} field; consult the engine schema.`);
    }
  }
  try { return validateJourneyCandidate(input); } catch (error) { throw new EngineInputError(error.message); }
}

export function engineInputSchema() {
  return {
    contract: ENGINE_CONTRACT,
    maxBytes: ENGINE_INPUT_LIMIT,
    scopes: [...scopes],
    fields: structuredClone(fields),
    checkpoints: checkpoints.map(({ id, title, fields: keys, source }) => ({ id, title, fields: [...keys], source })),
    notice: "Supply only known inputs. Missing values remain missing. Dates and notes record your checks; they do not prove a check happened."
  };
}

// Reuse the live engine without calling its handler/ready lifecycle, storage or provider functions.
// Keeping this bridge avoids a second copy of the founder's scoring rules.
export function evaluateBrain(input = {}) {
  const candidate = normalizeInput(input);
  const analysis = analyzeSevenStageDeal(candidate.dealCard, candidate.financialProfile);
  const journey = evaluateJourney(candidate, () => analysis);
  const checkpointGaps = journey.levels.flatMap(level => level.checkpoints.filter(point => !point.complete)
    .map(point => ({ checkpoint: point.id, missing: point.missing })));
  return {
    contract: ENGINE_CONTRACT,
    engineVersion: analysis.engineVersion,
    mode: "framework",
    persistence: "none",
    inputHash: createHash("sha256").update(JSON.stringify(candidate)).digest("hex"),
    evidenceNotice,
    review: {
      verdict: analysis.verdict,
      currentView: analysis.summary,
      counterCase: analysis.counterThesis,
      assessmentConfidence: { score: analysis.confidence, meaning: confidenceNotice },
      hardStops: [...analysis.hardStops],
      recommendationBlockers: [...analysis.recommendationBlockers],
      evidenceGaps: [...analysis.missingEvidence],
      checkpointGaps,
      nextSteps: [...analysis.nextActions],
      screeningQualified: journey.qualified
    },
    analysis,
    journey
  };
}

export function formatBrainReview(result) {
  const { review } = result;
  const list = (title, items) => items.length ? `${title}\n${items.map(item => `- ${item}`).join("\n")}` : "";
  return [
    `Apex / framework only / no saved memory`,
    `Current view: ${review.verdict}\n${review.currentView}`,
    `Strongest counter-case\n${review.counterCase}`,
    list("Stop before proceeding", review.hardStops),
    list("Recommendation blockers", review.recommendationBlockers),
    list("Next checks", review.nextSteps),
    `Checkpoint progress: ${result.journey.completed}/${result.journey.total} stages cleared from supplied inputs.`,
    `Assessment score: ${review.assessmentConfidence.score}/100. ${confidenceNotice}`,
    evidenceNotice
  ].filter(Boolean).join("\n\n");
}
