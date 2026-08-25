import assert from "node:assert/strict";
import test from "node:test";
import { formatStructuredAnswer, parseStructuredAnswer } from "../structured-response.js";

test("structured decision briefs parse, normalize, and format consistently", () => {
  const parsed = parseStructuredAnswer(JSON.stringify({
    currentView: "Investigate, but do not commit yet.",
    confidence: "Medium",
    reasons: ["Demand appears broad."],
    counterCase: ["Nearby supply may weaken rent."],
    evidenceGaps: ["Recent completed transactions."],
    alternativeAngle: ["Keeping borrowing capacity may be more valuable."],
    nextSteps: ["Verify achieved rent."],
    questions: ["What is the reserve after purchase?"]
  }));
  assert.equal(parsed.confidence, "Medium");
  assert.match(formatStructuredAnswer(parsed), /^Current view\nInvestigate/);
  assert.match(formatStructuredAnswer(parsed), /Strongest counter-case/);
  assert.match(formatStructuredAnswer(parsed), /Blind spot \/ alternative angle/);
});

test("malformed or empty decision briefs are rejected", () => {
  assert.equal(parseStructuredAnswer("not json"), null);
  assert.equal(parseStructuredAnswer('{"confidence":"High"}'), null);
});
