#!/usr/bin/env node
// Parses docs/FOUNDER_407_QA.md into structured brain.answers records.
//
// The markdown record is the authority. This script is deterministic: running it
// again on an unchanged record produces identical output, so the import can be
// re-applied after the founder corrects an answer without creating duplicates.
//
//   node scripts/import-founder-answers.js            # print a summary
//   node scripts/import-founder-answers.js --write    # seed data/db.json

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RECORD_PATH = path.join(repoDir, "docs", "FOUNDER_407_QA.md");
const DB_PATH = path.join(repoDir, "data", "db.json");
const EXPECTED_TOTAL = 407;

const STAGE_LABELS = {
  S1: "Stage 1 - Property Selection",
  S2: "Stage 2 - Investor Suitability",
  S3: "Stage 3 - Financing And Deal Structure",
  S4: "Stage 4 - Holding Power And Asset Management",
  S5: "Stage 5 - Portfolio Strategy And Scaling",
  S6: "Stage 6 - Market Intelligence And Timing",
  S7: "Stage 7 - Decision Journal And Second-Brain Learning",
  EX: "Execution Calibration"
};

const STAGE_RULE_FILES = {
  S1: "docs/MY_INVESTMENT_FRAMEWORK.md",
  S2: "docs/INVESTOR_MANDATE_PROFILE.md",
  S3: "docs/DEAL_STRUCTURING_FINANCING.md",
  S4: "docs/HOLDING_POWER_ASSET_MANAGEMENT.md",
  S5: "docs/PORTFOLIO_STRATEGY_SCALING.md",
  S6: "docs/MARKET_INTELLIGENCE_TIMING.md",
  S7: "docs/DECISION_JOURNAL_LEARNING.md",
  EX: "docs/EXECUTION_CALIBRATION.md"
};

// An answer that hands the question back is still a real answer: it records that
// the founder delegated the rule rather than that the question went unasked.
const DEFERRAL = /^(you decide|you (?:can )?research|research online|not sure|i leave)/i;

export function parseFounderRecord(markdown) {
  const answers = [];
  let section = "";
  let current = null;

  const close = () => {
    if (!current) return;
    current.answer = current.answer.join("\n").replace(/\s+$/, "").trim();
    answers.push(current);
    current = null;
  };

  for (const line of String(markdown).split("\n")) {
    const question = line.match(/^#### ((?:S[1-7]|EX)-\d+)\.\s*(.+?)\s*$/);
    if (question) {
      close();
      const [, id, text] = question;
      current = { id, stage: id.split("-")[0], section, question: text, answer: [] };
      continue;
    }
    const heading = line.match(/^#{1,3} (.+?)\s*$/);
    if (heading) {
      close();
      if (/^[A-Z]\. /.test(heading[1])) section = heading[1];
      continue;
    }
    if (/^---\s*$/.test(line)) {
      close();
      continue;
    }
    if (current) current.answer.push(line);
  }
  close();

  return answers.map((item) => ({
    id: `founder-${item.id}`,
    questionId: item.id,
    createdAt: "2026-06-27T00:00:00.000Z",
    category: STAGE_LABELS[item.stage] || item.stage,
    section: item.section,
    question: item.question,
    answer: item.answer,
    source: "founder-interview-2026",
    ruleFile: STAGE_RULE_FILES[item.stage] || "",
    deferred: DEFERRAL.test(item.answer)
  }));
}

async function main() {
  const markdown = await readFile(RECORD_PATH, "utf8");
  const answers = parseFounderRecord(markdown);

  const byStage = answers.reduce((counts, item) => {
    counts[item.stage || item.questionId.split("-")[0]] = (counts[item.questionId.split("-")[0]] || 0) + 1;
    return counts;
  }, {});
  const duplicates = answers.length - new Set(answers.map((item) => item.questionId)).size;
  const empty = answers.filter((item) => !item.answer).length;

  console.log(`Parsed ${answers.length} answers (expected ${EXPECTED_TOTAL})`);
  console.log("By stage:", JSON.stringify(byStage));
  console.log(`Deferred to Apex: ${answers.filter((item) => item.deferred).length}`);
  console.log(`Duplicate ids: ${duplicates} | Empty answers: ${empty}`);

  if (answers.length !== EXPECTED_TOTAL) throw new Error(`Expected ${EXPECTED_TOTAL} answers, parsed ${answers.length}.`);
  if (duplicates) throw new Error("The record contains duplicate question ids.");
  if (empty) throw new Error("The record contains a question with no answer.");

  if (!process.argv.includes("--write")) {
    console.log("\nDry run. Pass --write to seed data/db.json.");
    return;
  }

  const db = JSON.parse(await readFile(DB_PATH, "utf8"));
  db.brain ||= {};
  const existing = Array.isArray(db.brain.answers) ? db.brain.answers : [];
  const kept = existing.filter((item) => item.source !== "founder-interview-2026");
  db.brain.answers = [...answers, ...kept];
  await writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);
  console.log(`\nSeeded data/db.json: ${answers.length} founder answers, ${kept.length} other answers retained.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
