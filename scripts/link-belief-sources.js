#!/usr/bin/env node
// Proposes belief -> founder-answer links by matching each belief against the
// interview record, then writes the confident ones into data/db.json.
//
// Precision matters more than coverage here: a wrong provenance link is worse
// than an absent one, because it would let a rule cite words the founder never
// said about it. Only matches that clear the score gap are written; the rest are
// listed for manual confirmation.
//
//   node scripts/link-belief-sources.js            # report proposals
//   node scripts/link-belief-sources.js --write    # apply confident links

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DB_PATH = path.join(repoDir, "data", "db.json");

// Belief ids and scopes name their stage; that narrows the candidate pool before
// any text scoring, which is what keeps unrelated same-word matches out.
const STAGE_PATTERNS = [
  [/^stage-?1|stage 1/i, "S1"],
  [/^mandate|investor mandate|stage 2/i, "S2"],
  [/^financing|stage 3|deal structur/i, "S3"],
  [/^stage-?4|holding power/i, "S4"],
  [/^stage-?5|portfolio/i, "S5"],
  [/^stage-?6|market intelligence/i, "S6"],
  [/^stage-?7|journal|decision journal/i, "S7"],
  [/^execution|^framework-|sourcing|negotiat/i, "EX"]
];

const STOPWORDS = new Set(`a an the and or but if then than that this these those is are was were be been being do does did
of to in on at by for with from as it its into about over under not no yes can cannot should would could may might will
what which who whom when where why how you your i my me we our they them their he she his her more most less least very
only just also even still well good bad high low new old same other some any all each every both few many much
property investment investor buy buying bought sell selling purchase price market area unit`.split(/\s+/));

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9%.\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^[-.]+|[-.]+$/g, ""))
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function stageFor(belief) {
  const haystack = `${belief.id} ${belief.scope}`;
  for (const [pattern, stage] of STAGE_PATTERNS) {
    if (pattern.test(haystack)) return stage;
  }
  return "";
}

function buildIdf(answers) {
  const documentFrequency = new Map();
  for (const answer of answers) {
    for (const term of new Set(tokenize(`${answer.question} ${answer.answer}`))) {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    }
  }
  const total = answers.length;
  return (term) => Math.log(total / (1 + (documentFrequency.get(term) || 0)));
}

function overlap(beliefTerms, terms, idf) {
  let score = 0;
  const matched = new Set();
  for (const term of terms) {
    if (!beliefTerms.has(term)) continue;
    // A shared rare term (a threshold, a place, a tenure word) is real evidence of
    // provenance; a shared common term is close to none.
    score += idf(term);
    matched.add(term);
  }
  // Without length normalization a long rambling answer outscores the precise one,
  // because it simply contains more terms to collide with.
  return { score: score / Math.sqrt(Math.max(terms.size, 4)), matched };
}

function scoreMatch(beliefTerms, answer, idf) {
  const question = overlap(beliefTerms, new Set(tokenize(answer.question)), idf);
  const body = overlap(beliefTerms, new Set(tokenize(answer.answer)), idf);
  // The belief was written as the rule for a specific question, so agreement with
  // the question text is the stronger provenance signal.
  return {
    score: question.score * 2 + body.score,
    matches: new Set([...question.matched, ...body.matched]).size
  };
}

function firstSentence(text, limit = 300) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" ")) || cut}...`;
}

export function proposeLinks(beliefs, answers, { minScore = 1.6, minRatio = 1.45, minMatches = 3 } = {}) {
  const idf = buildIdf(answers);
  return beliefs.map((belief) => {
    const stage = stageFor(belief);
    const pool = stage ? answers.filter((answer) => answer.questionId.startsWith(`${stage}-`)) : answers;
    const beliefTerms = new Set(tokenize(`${belief.claim} ${belief.evidenceFor} ${belief.scope}`));
    const ranked = pool
      .map((answer) => ({ answer, ...scoreMatch(beliefTerms, answer, idf) }))
      // One shared rare word can outscore everything on its own, which is a
      // coincidence rather than provenance. Require several terms to agree.
      .filter((entry) => entry.matches >= minMatches)
      .sort((left, right) => right.score - left.score);
    const best = ranked[0];
    const runnerUp = ranked[1];
    // Close rivals mean one of two things. If they sit in the same interview
    // section, the belief genuinely draws on several adjacent answers and all of
    // them are its source. If they are scattered, the match is ambiguous and the
    // belief is better left unlinked than wrongly attributed.
    const rivals = ranked.filter((entry) => entry.score >= minScore && entry.score >= best.score * 0.8);
    const sameSection = rivals.length > 1
      && rivals.every((entry) => entry.answer.section && entry.answer.section === best.answer.section);
    const clearMargin = !runnerUp || runnerUp.score === 0
      || best.score / Math.max(runnerUp.score, 0.001) >= minRatio;
    const decisive = Boolean(best) && best.score >= minScore && (clearMargin || sameSection);
    const linked = decisive ? (sameSection ? rivals : [best]).slice(0, 4) : [];
    return {
      beliefId: belief.id,
      stage,
      claim: firstSentence(belief.claim, 90),
      confident: decisive,
      multiSource: decisive && linked.length > 1,
      score: Number((best?.score || 0).toFixed(2)),
      runnerUpScore: Number((runnerUp?.score || 0).toFixed(2)),
      questionIds: linked.map((entry) => entry.answer.questionId),
      quote: decisive ? firstSentence(best.answer.answer) : "",
      matchedQuestion: best ? firstSentence(best.answer.question, 80) : ""
    };
  });
}

export function applyProposedLinks(beliefs, proposals) {
  const byId = new Map(proposals.filter(item => item.confident).map(item => [item.beliefId, item]));
  let applied = 0, cleared = 0;
  const linkedBeliefs = beliefs.map(belief => {
    if (belief.sourceLinkMethod === "manual") return belief;
    const link = byId.get(belief.id);
    if (link) {
      applied++;
      return { ...belief, sourceQuestionIds: link.questionIds, sourceQuestionId: link.questionIds[0] || "", sourceQuote: link.quote, sourceLinkMethod: "auto" };
    }
    if (belief.sourceQuestionIds?.length || belief.sourceQuestionId) {
      cleared++;
      const { sourceQuestionIds, sourceQuestionId, sourceQuote, sourceLinkMethod, ...rest } = belief;
      return rest;
    }
    return belief;
  });
  return { beliefs: linkedBeliefs, applied, cleared };
}

async function main() {
  const db = JSON.parse(await readFile(DB_PATH, "utf8"));
  const answers = (db.brain?.answers || []).filter((item) => item.source === "founder-interview-2026");
  const beliefs = db.brain?.beliefs || [];
  if (!answers.length) throw new Error("No founder answers found. Run scripts/import-founder-answers.js --write first.");

  const proposals = proposeLinks(beliefs, answers);
  const confident = proposals.filter((item) => item.confident);

  console.log(`Beliefs: ${beliefs.length} | Founder answers: ${answers.length}`);
  console.log(`Confident links: ${confident.length} | Needs manual review: ${proposals.length - confident.length}`);
  console.log("\nSample of proposed links:");
  for (const item of confident.slice(0, 8)) {
    console.log(`  ${item.beliefId}`);
    console.log(`    -> ${item.questionIds.join(", ")} (score ${item.score} vs ${item.runnerUpScore})`);
    console.log(`    Q: ${item.matchedQuestion}`);
    console.log(`    A: ${firstSentence(item.quote, 100)}`);
  }
  const unlinked = proposals.filter((item) => !item.confident);
  if (unlinked.length) {
    console.log(`\nUnlinked (${unlinked.length}) - confirm these by hand:`);
    for (const item of unlinked) console.log(`  ${item.beliefId} (best ${item.score} vs ${item.runnerUpScore})`);
  }

  if (!process.argv.includes("--write")) {
    console.log("\nDry run. Pass --write to apply the confident links.");
    return;
  }

  const { beliefs: linkedBeliefs, applied, cleared } = applyProposedLinks(beliefs, proposals);
  db.brain.beliefs = linkedBeliefs;
  await writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);
  console.log(`\nApplied ${applied} source links to data/db.json.`);
  if (cleared) console.log(`Cleared ${cleared} stale auto-link(s) no longer proposed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
