import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { evaluateBrain, engineInputSchema, formatBrainReview, ENGINE_INPUT_LIMIT } from "../brain-engine.js";
import { analyzeSevenStageDeal } from "../server.js";
import { completeCandidate } from "./fixtures/journey-candidate.js";

const repo = fileURLToPath(new URL("../", import.meta.url));
const runner = path.join(repo, "scripts", "run-brain.js");
const guard = pathToFileURL(path.join(repo, "tests", "fixtures", "engine-network-guard.js")).href;

function cli(args = [], input = "{}", extra = {}) {
  return spawnSync(process.execPath, [runner, ...args], {
    cwd: repo, input, encoding: "utf8", timeout: 10000, maxBuffer: 2 * 1024 * 1024,
    env: { ...process.env, ESTATELAB_DISABLE_ENV_FILE: "true" }, ...extra
  });
}

test("engine-only analysis is the existing seven-stage result, with explicit evidence and memory boundaries", () => {
  const input = completeCandidate();
  const before = structuredClone(input);
  const result = evaluateBrain(input);
  assert.equal(result.contract, "apex.brain.v1");
  assert.equal(result.mode, "framework");
  assert.equal(result.persistence, "none");
  assert.deepEqual(result.analysis, analyzeSevenStageDeal(input.dealCard, input.financialProfile));
  assert.equal(result.review.screeningQualified, true);
  assert.equal(result.review.verdict, result.analysis.verdict);
  assert.equal(result.review.counterCase, result.analysis.counterThesis);
  assert.equal(result.review.assessmentConfidence.score, result.analysis.confidence);
  assert.match(result.review.assessmentConfidence.meaning, /not a calibrated probability/);
  assert.match(result.evidenceNotice, /not independently verified/);
  assert.deepEqual(input, before);
  assert.deepEqual(result.review.checkpointGaps, []);
  assert.match(formatBrainReview(result), /Strongest counter-case/);
});

test("missing proof stays unknown and a cheap deal cannot override the original hard stops", () => {
  const missing = evaluateBrain({ financialProfile: { currentDebt: 0 } });
  assert.equal(missing.journey.completed, 0);
  assert.equal(missing.review.screeningQualified, false);
  assert.equal(missing.analysis.context.financialProfile.currentDebt, "0");
  assert.equal(missing.analysis.context.financialProfile.monthlyIncome, undefined);
  assert.ok(missing.review.recommendationBlockers.length);
  assert.ok(missing.review.checkpointGaps.length);
  const bad = completeCandidate();
  bad.dealCard.askingPrice = "200000";
  bad.dealCard.managementQuality = "Weak";
  bad.dealCard.unitPosition = "Unfavourable";
  const stopped = evaluateBrain(bad);
  assert.equal(stopped.review.screeningQualified, false);
  assert.deepEqual(stopped.review.hardStops, analyzeSevenStageDeal(bad.dealCard, bad.financialProfile).hardStops);
  assert.ok(stopped.review.hardStops.length);
  assert.match(formatBrainReview(stopped), /Stop before proceeding/);
});

test("each run is isolated and canonical inputs have a stable hash without a saved session", () => {
  const input = completeCandidate();
  const first = evaluateBrain(input);
  const reversed = { evidence: input.evidence, financialProfile: input.financialProfile, dealCard: Object.fromEntries(Object.entries(input.dealCard).reverse()) };
  assert.equal(evaluateBrain(reversed).inputHash, first.inputHash);
  input.dealCard.projectName = "Different synthetic property";
  assert.notEqual(evaluateBrain(input).inputHash, first.inputHash);
  const clean = evaluateBrain({});
  assert.deepEqual(clean.analysis.context.dealCard, {});
  assert.doesNotMatch(JSON.stringify(clean), /Different synthetic property/);
  assert.equal(first.analysis.context.dealCard.projectName, "Test Residence");
});

test("engine inputs fail explicitly instead of silently losing unknown, malformed or oversized fields", () => {
  const invalid = [null, [], "price 400k", { qualified: true }, { financialProfile: [] },
    { dealCard: { inventedScore: 100 } }, { financialProfile: { askingPrice: 100 } },
    { dealCard: { askingPrice: -1 } }, { dealCard: { propertyAge: true } },
    { evidence: { fakeCheck: {} } }, { evidence: { identity: { verified: true } } },
    { evidence: { identity: { note: {} } } }, { evidence: { identity: { note: "a".repeat(1501) } } },
    { dealCard: { projectName: "a".repeat(501) } }, { dealCard: { projectName: "a".repeat(ENGINE_INPUT_LIMIT) } }
  ];
  for (const input of invalid) assert.throws(() => evaluateBrain(input), { code: "INVALID_ENGINE_INPUT" });
  const circular = {}; circular.dealCard = circular;
  assert.throws(() => evaluateBrain(circular), /serializable/);
  const future = completeCandidate(); future.evidence.identity.date = "2099-01-01";
  assert.equal(evaluateBrain(future).review.screeningQualified, false);
});

test("schema describes existing fields and callers cannot mutate the validation contract", () => {
  const schema = engineInputSchema();
  assert.equal(schema.fields.askingPrice.scope, "dealCard");
  assert.ok(schema.checkpoints.find(point => point.id === "identity").fields.includes("projectName"));
  schema.scopes.push("bypass");
  schema.fields.askingPrice.scope = "bypass";
  schema.checkpoints[0].fields.length = 0;
  assert.throws(() => evaluateBrain({ bypass: {} }), /Unknown/);
  assert.equal(engineInputSchema().fields.askingPrice.scope, "dealCard");
  assert.ok(engineInputSchema().checkpoints[0].fields.length);
});

test("runner works with filesystem writes denied, network forbidden and broken database/object/provider settings", async t => {
  const directory = await mkdtemp(path.join(tmpdir(), "apex-engine-readonly-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const run = spawnSync(process.execPath, ["--permission", `--allow-fs-read=${repo}`, "--import", guard, runner], {
    cwd: directory, encoding: "utf8", input: JSON.stringify(completeCandidate()), timeout: 10000, maxBuffer: 2 * 1024 * 1024,
    env: {
      ...process.env, NODE_OPTIONS: "", NODE_COMPILE_CACHE: "", ESTATELAB_DISABLE_ENV_FILE: "true",
      DATABASE_URL: "postgres://invalid:invalid@127.0.0.1:1/no_database",
      ESTATELAB_DATA_DIR: directory, ESTATELAB_OBJECT_DIR: path.join(directory, "objects"),
      ESTATELAB_SUPABASE_URL: "http://incomplete-object-config.invalid",
      ESTATELAB_SUPABASE_SERVICE_ROLE_KEY: "", ESTATELAB_OBJECT_BUCKET: "",
      LLM_PROVIDER: "openrouter", LLM_API_KEY: "synthetic-unused-key", OPENAI_API_KEY: "synthetic-unused-key",
      LLM_BASE_URL: "http://127.0.0.1:1"
    }
  });
  assert.equal(run.error, undefined);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(JSON.parse(run.stdout).mode, "framework");
  assert.deepEqual(await readdir(directory), [], "No state, files or memory should be created.");
});

test("CLI supports file, stdin, schema and readable output, and rejects malformed input without echoing private text", () => {
  const file = cli(["--file", "examples/engine-candidate.json"]);
  assert.equal(file.status, 0, file.stderr);
  assert.equal(JSON.parse(file.stdout).review.screeningQualified, false);
  const text = cli(["--text"], "{}");
  assert.equal(text.status, 0, text.stderr); assert.match(text.stdout, /no saved memory/);
  const schema = cli(["--schema"]);
  assert.equal(schema.status, 0, schema.stderr); assert.equal(JSON.parse(schema.stdout).contract, "apex.brain.v1");
  const invalid = cli([], "private-salary-sentinel {broken-json");
  assert.equal(invalid.status, 1); assert.equal(invalid.stdout, "");
  assert.doesNotMatch(invalid.stderr, /private-salary-sentinel/);
  assert.equal(cli([], Buffer.from([0x7b, 0x22, 0x61, 0x22, 0x3a, 0x22, 0xff, 0x22, 0x7d])).status, 1);
  assert.equal(cli([], "a".repeat(ENGINE_INPUT_LIMIT + 1)).status, 1);
  assert.equal(cli(["--schema", "--text"]).status, 1);
  const missing = cli(["--file", "private-missing-file-sentinel.json"]);
  assert.equal(missing.status, 1); assert.doesNotMatch(missing.stderr, /private-missing-file-sentinel/);
});
