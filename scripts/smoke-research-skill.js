import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildResearchStudy } from "../research-study.js";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillScripts = path.join(repoDir, "skills", "research-residential-markets", "scripts");
const python = process.env.PYTHON || "python";

function run(script, args) {
  const result = spawnSync(python, [path.join(skillScripts, script), ...args], { cwd: repoDir, encoding: "utf8" });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) throw new Error(`${script} failed with exit code ${result.status}.`);
}

function scores(value) {
  return { buyer_similarity: value, location_accessibility: value, product_tenure: value, size_total_price: value, timing: value, scale_density: value, brand_positioning: value };
}

async function main() {
  const root = await mkdtemp(path.join(os.tmpdir(), "apex-research-skill-"));
  const studyDir = path.join(root, "bayan-lepas-smoke");
  try {
    run("init_study.py", ["--output", root, "--study-id", "bayan-lepas-smoke", "--study-name", "Bayan Lepas Smoke Study", "--market", "Penang", "--country", "Malaysia", "--cutoff", "2026-06-30", "--product", "Condominium"]);
    const config = JSON.parse(await readFile(path.join(studyDir, "study-config.json"), "utf8"));
    config.decision_statement = "Test the Apex research integration with controlled residential evidence.";
    config.geographies = { macro_region: "Northern Malaysia", jurisdiction: "Penang", submarkets: ["Bayan Lepas"], site_catchment: "Bayan Lepas", competitive_market: "Southwest Penang high-rise" };
    config.human_gates = { scope: "approved", evidence: "approved", recommendation: "approved", issuance: "approved" };
    const evidence = [
      { evidence_id: "ev-supply", claim: "Official supply snapshot records 10000 existing and 2000 incoming units.", geography: "Bayan Lepas", source_type: "official", source_reference: "Official supply snapshot", source_date: "2026-06-15", accessed_date: "2026-06-20", confidence: 0.98, verification_status: "verified", materiality: "critical" },
      { evidence_id: "ev-transaction", claim: "Validated subsale evidence records an achieved RM500000 transaction.", geography: "Bayan Lepas", project_id: "direct-project", source_type: "validated-database", source_reference: "Validated transaction database", source_date: "2026-05-20", accessed_date: "2026-06-20", confidence: 0.9, verification_status: "verified", materiality: "material" }
    ];
    const supply = [
      { record_id: "existing", period_year: 2026, geography: "Bayan Lepas", property_type: "Condominium", status: "existing", units: 10000, source_ids: ["ev-supply"] },
      { record_id: "incoming", period_year: 2026, geography: "Bayan Lepas", property_type: "Condominium", status: "incoming", units: 2000, source_ids: ["ev-supply"] }
    ];
    const transactions = [
      { transaction_id: "tx-1", date: "2026-05-20", project_id: "direct-project", geography: "Bayan Lepas", property_type: "Condominium", market_type: "secondary", record_kind: "individual", price: 500000, currency: "MYR", price_basis: "achieved", source_ids: ["ev-transaction"] }
    ];
    const projects = [
      { project_id: "direct-project", project_name: "Direct Project", geography: "Bayan Lepas", product_type: "Condominium", total_units: 800, units_released: 800, verified_sales: 700, performance_class: "strong", comparable_scores: scores(4.5), source_ids: ["ev-transaction"] },
      { project_id: "control-project", project_name: "Control Project", geography: "Bayan Lepas", product_type: "Condominium", total_units: 1000, units_released: 1000, verified_sales: 500, performance_class: "weak", comparable_scores: scores(3.5), source_ids: ["ev-supply"] }
    ];
    await Promise.all([
      writeFile(path.join(studyDir, "study-config.json"), `${JSON.stringify(config, null, 2)}\n`),
      writeFile(path.join(studyDir, "evidence", "evidence.jsonl"), `${evidence.map((item) => JSON.stringify(item)).join("\n")}\n`),
      writeFile(path.join(studyDir, "data", "supply.json"), `${JSON.stringify(supply, null, 2)}\n`),
      writeFile(path.join(studyDir, "data", "transactions.json"), `${JSON.stringify(transactions, null, 2)}\n`),
      writeFile(path.join(studyDir, "data", "projects.json"), `${JSON.stringify(projects, null, 2)}\n`)
    ]);
    run("calculate_metrics.py", [studyDir]);
    run("score_comparables.py", [studyDir]);
    run("validate_study.py", [studyDir, "--strict"]);
    run("export_study_bundle.py", [studyDir]);
    const bundle = JSON.parse(await readFile(path.join(studyDir, "outputs", "bayan-lepas-smoke-apex-bundle.json"), "utf8"));
    const study = buildResearchStudy(bundle);
    console.log(JSON.stringify({ id: study.id, evidence: study.summary.evidenceRecords, pipelinePressure: study.summary.pipelinePressure, direct: study.summary.directComparables, control: study.summary.controlComparables }));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
