export const STRUCTURED_ANSWER_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["currentView", "confidence", "reasons", "counterCase", "evidenceGaps", "alternativeAngle", "nextSteps", "questions"],
  properties: {
    currentView: { type: "string" },
    confidence: { type: "string", enum: ["Low", "Medium", "High"] },
    reasons: { type: "array", items: { type: "string" }, maxItems: 4 },
    counterCase: { type: "array", items: { type: "string" }, maxItems: 3 },
    evidenceGaps: { type: "array", items: { type: "string" }, maxItems: 4 },
    alternativeAngle: { type: "array", items: { type: "string" }, maxItems: 2 },
    nextSteps: { type: "array", items: { type: "string" }, maxItems: 4 },
    questions: { type: "array", items: { type: "string" }, maxItems: 3 }
  }
};

function concise(value, maxLength = 600) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function stringList(value, limit) {
  return Array.isArray(value) ? value.map((item) => concise(item, 420)).filter(Boolean).slice(0, limit) : [];
}

export function normalizeStructuredAnswer(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const currentView = concise(value.currentView, 800);
  if (!currentView) return null;
  const confidence = ["Low", "Medium", "High"].includes(value.confidence) ? value.confidence : "Low";
  return {
    currentView,
    confidence,
    reasons: stringList(value.reasons, 4),
    counterCase: stringList(value.counterCase, 3),
    evidenceGaps: stringList(value.evidenceGaps, 4),
    alternativeAngle: stringList(value.alternativeAngle, 2),
    nextSteps: stringList(value.nextSteps, 4),
    questions: stringList(value.questions, 3)
  };
}

export function parseStructuredAnswer(text) {
  const clean = String(text || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");
  if (firstBrace < 0 || lastBrace <= firstBrace) return null;
  try {
    return normalizeStructuredAnswer(JSON.parse(clean.slice(firstBrace, lastBrace + 1)));
  } catch {
    return null;
  }
}

function section(title, items) {
  const lines = stringList(items, 4);
  return lines.length ? `${title}\n${lines.map((item) => `- ${item}`).join("\n")}` : "";
}

export function formatStructuredAnswer(value) {
  const answer = normalizeStructuredAnswer(value);
  if (!answer) return "";
  return [
    `Current view\n${answer.currentView}\nConfidence: ${answer.confidence}`,
    section("What supports it", answer.reasons),
    section("Strongest counter-case", answer.counterCase),
    section("What would change the view", answer.evidenceGaps),
    section("Blind spot / alternative angle", answer.alternativeAngle),
    section("Next best move", answer.nextSteps),
    section("Questions for you", answer.questions)
  ].filter(Boolean).join("\n\n");
}
