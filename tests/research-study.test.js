import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { buildResearchStudy, validateResearchStudyBundle } from "../research-study.js";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OWNER_TOKEN = "research-owner-token-1234567890";

function researchBundle() {
  return {
    format: "apex-research-study.v1",
    exported_at: "2026-07-01T00:00:00Z",
    study_config: {
      study_id: "bayan-lepas-2026",
      study_name: "Bayan Lepas High-Rise 2026",
      market: "Penang",
      country: "Malaysia",
      data_cutoff: "2026-06-30",
      decision_statement: "Test rental resilience and incoming supply risk in Bayan Lepas high-rise projects.",
      geographies: {
        macro_region: "Northern Malaysia",
        jurisdiction: "Penang",
        submarkets: ["Bayan Lepas"],
        site_catchment: "Bayan Lepas employment catchment",
        competitive_market: "Southwest Penang high-rise"
      },
      product_scope: ["Condominium", "Serviced residence"],
      target_buyers: ["Owner occupiers", "Retail investors"],
      human_gates: { scope: "approved", evidence: "approved", recommendation: "approved", issuance: "approved" }
    },
    evidence: [
      {
        evidence_id: "ev-supply",
        claim: "The latest verified Bayan Lepas snapshot records 10000 existing units and 2000 incoming units.",
        value: 2000,
        unit: "units",
        geography: "Bayan Lepas",
        source_type: "official",
        source_reference: "Official housing supply table 2026-Q2",
        source_date: "2026-06-15",
        accessed_date: "2026-06-20",
        confidence: 0.99,
        verification_status: "verified",
        materiality: "critical"
      },
      {
        evidence_id: "ev-rent",
        claim: "Corroborated agent survey evidence places achieved two-bedroom rent near RM2600 per month.",
        value: 2600,
        unit: "RM/month",
        geography: "Bayan Lepas",
        project_id: "evidence-residence",
        source_type: "primary-survey",
        source_reference: "Three-agent achieved-rent survey, June 2026",
        source_date: "2026-06-18",
        accessed_date: "2026-06-20",
        confidence: 0.95,
        verification_status: "corroborated",
        materiality: "material"
      },
      {
        evidence_id: "ev-transaction",
        claim: "A validated transaction record shows an achieved price of RM500000 for a comparable unit.",
        value: 500000,
        unit: "RM",
        geography: "Bayan Lepas",
        project_id: "evidence-residence",
        source_type: "validated-database",
        source_reference: "Validated subsale transaction database",
        source_date: "2026-05-20",
        accessed_date: "2026-06-20",
        confidence: 0.95,
        verification_status: "verified",
        materiality: "supporting"
      }
    ],
    supply: [
      { record_id: "s-existing", period_year: 2026, geography: "Bayan Lepas", property_type: "High-rise residential", status: "existing", units: 10000, source_ids: ["ev-supply"] },
      { record_id: "s-incoming", period_year: 2026, geography: "Bayan Lepas", property_type: "High-rise residential", status: "incoming", units: 2000, source_ids: ["ev-supply"] }
    ],
    transactions: [
      { transaction_id: "tx-1", date: "2026-05-20", project_id: "evidence-residence", geography: "Bayan Lepas", property_type: "Condominium", market_type: "secondary", record_kind: "individual", price: 500000, currency: "MYR", price_basis: "achieved", source_ids: ["ev-transaction"] }
    ],
    projects: [
      {
        project_id: "evidence-residence",
        project_name: "Evidence Residence",
        geography: "Bayan Lepas",
        product_type: "Condominium",
        total_units: 800,
        units_released: 800,
        verified_sales: 720,
        performance_class: "strong",
        source_ids: ["ev-rent", "ev-transaction"],
        comparable_scores: { buyer_similarity: 4.5, location_accessibility: 4.5, product_tenure: 4.5, size_total_price: 4.5, timing: 4.5, scale_density: 4, brand_positioning: 4 }
      },
      {
        project_id: "control-residence",
        project_name: "Control Residence",
        geography: "Bayan Lepas",
        product_type: "Condominium",
        total_units: 1000,
        units_released: 1000,
        verified_sales: 550,
        performance_class: "weak",
        source_ids: ["ev-supply"],
        comparable_scores: { buyer_similarity: 3.5, location_accessibility: 3.5, product_tenure: 3.5, size_total_price: 3.5, timing: 3, scale_density: 3, brand_positioning: 3 }
      }
    ],
    metrics: {
      study_id: "bayan-lepas-2026",
      data_cutoff: "2026-06-30",
      supply: { latest_totals: { existing: 10000, incoming: 2000 }, future_units: 2000, pipeline_pressure: 0.2 },
      transactions: { periods: [] },
      projects: { summary: { project_count: 2 } }
    },
    comparable_scores: {
      classification_counts: { direct: 1, control: 1 },
      projects: [
        { project_id: "evidence-residence", classification: "direct" },
        { project_id: "control-residence", classification: "control" }
      ]
    },
    validation: { strict_mode: true, summary: { critical_errors: 0, warnings: 0, information: 0, evidence_records: 3, supply_records: 2, transaction_records: 1, project_records: 2 } }
  };
}

async function freePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const address = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return address.port;
}

async function waitForHealth(baseUrl, child) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Test server exited with code ${child.exitCode}.`);
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // Startup is still in progress.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Test server did not become ready.");
}

async function request(baseUrl, pathname, { method = "GET", body, owner = false, client = false } = {}) {
  const headers = {};
  if (owner) headers["x-estatelab-owner-token"] = OWNER_TOKEN;
  if (client) headers["x-estatelab-client-id"] = "research-study-test";
  if (body !== undefined) headers["content-type"] = "application/json";
  const response = await fetch(`${baseUrl}${pathname}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  return { response, payload: response.status === 204 ? null : await response.json() };
}

test("research bundle validation caps confidence and enforces final human approval", () => {
  const bundle = researchBundle();
  assert.equal(validateResearchStudyBundle(bundle).valid, true);
  const study = buildResearchStudy(bundle, "2026-07-01T00:00:00Z");
  assert.equal(study.evidence.find((item) => item.evidence_id === "ev-supply").effective_confidence, 0.98);
  assert.equal(study.evidence.find((item) => item.evidence_id === "ev-rent").effective_confidence, 0.75);
  assert.equal(study.summary.pipelinePressure, 0.2);

  bundle.study_config.human_gates.issuance = "pending";
  const rejected = validateResearchStudyBundle(bundle);
  assert.equal(rejected.valid, false);
  assert.ok(rejected.errors.some((item) => item.code === "human-gate-pending"));
});

test("owner research studies are private, durable, retrievable, and included in reports", async (t) => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "apex-research-"));
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(repoDir, "server.js")], {
    cwd: repoDir,
    env: { ...process.env, PORT: String(port), ESTATELAB_DATA_DIR: dataDir, ESTATELAB_OWNER_TOKEN: OWNER_TOKEN, OPENAI_API_KEY: "", OPENROUTER_API_KEY: "" },
    stdio: "ignore"
  });

  t.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await new Promise((resolve) => child.once("exit", resolve));
    }
    await rm(dataDir, { recursive: true, force: true });
  });

  await waitForHealth(baseUrl, child);
  assert.equal((await request(baseUrl, "/api/owner/research/studies")).response.status, 403);

  const invalid = researchBundle();
  invalid.study_config.human_gates.issuance = "pending";
  const invalidImport = await request(baseUrl, "/api/owner/research/studies/import", { method: "POST", owner: true, body: invalid });
  assert.equal(invalidImport.response.status, 422);
  assert.ok(invalidImport.payload.issues.some((item) => item.code === "human-gate-pending"));

  const created = await request(baseUrl, "/api/owner/research/studies/import", { method: "POST", owner: true, body: researchBundle() });
  assert.equal(created.response.status, 201);
  assert.equal(created.payload.study.id, "bayan-lepas-2026");
  assert.equal(created.payload.study.summary.evidenceRecords, 3);

  const list = await request(baseUrl, "/api/owner/research/studies", { owner: true });
  assert.equal(list.payload.summary.studies, 1);
  assert.equal(list.payload.summary.evidenceRecords, 3);

  const status = await request(baseUrl, "/api/jarvis/status");
  assert.equal(status.payload.knowledge.researchStudies, 1);

  const chat = await request(baseUrl, "/api/jarvis/query", {
    method: "POST",
    client: true,
    body: { query: "What does verified Bayan Lepas research say about Evidence Residence rent and incoming supply?" }
  });
  assert.equal(chat.response.status, 200);
  assert.ok(chat.payload.sources.some((source) => source.type === "research"));
  assert.match(chat.payload.answer, /Verified market research/i);

  const deal = await request(baseUrl, "/api/jarvis/analyze-deal", {
    method: "POST",
    client: true,
    body: {
      dealCard: { area: "Bayan Lepas, Penang", projectName: "Evidence Residence", propertyType: "Condominium", askingPrice: "RM500000", expectedRent: "RM2600" },
      financialProfile: { monthlyIncome: "RM9000", cashReserve: "12 months" }
    }
  });
  assert.equal(deal.response.status, 200);
  assert.ok(deal.payload.sources.some((source) => source.type === "research"));
  assert.ok(deal.payload.analysis.researchIntelligence.summary.matched > 0);
  assert.equal(deal.payload.analysis.sourceTransparency.sources.find((source) => source.type === "research").status, "used");

  const backup = await request(baseUrl, "/api/owner/export?chunks=true", { owner: true });
  assert.equal(backup.payload.counts.researchStudies, 1);
  assert.equal(backup.payload.knowledge.researchStudies.length, 1);

  const duplicate = await request(baseUrl, "/api/owner/research/studies/import", { method: "POST", owner: true, body: researchBundle() });
  assert.equal(duplicate.response.status, 409);
  const replacement = await request(baseUrl, "/api/owner/research/studies/import?replace=true", { method: "POST", owner: true, body: researchBundle() });
  assert.equal(replacement.response.status, 200);
  assert.equal(replacement.payload.replaced, true);

  const deleted = await request(baseUrl, "/api/owner/research/studies/bayan-lepas-2026", { method: "DELETE", owner: true });
  assert.equal(deleted.response.status, 204);
  assert.equal((await request(baseUrl, "/api/owner/research/studies", { owner: true })).payload.summary.studies, 0);
});
