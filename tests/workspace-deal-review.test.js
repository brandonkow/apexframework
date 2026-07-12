import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { KnowledgeService } from "../knowledge.js";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const serviceToken = "workspace-test-token-with-at-least-24-characters";

test("private deal retrieval can remain local when embeddings are configured", async () => {
  const service = new KnowledgeService({ objectDir: os.tmpdir(), apiKey: "configured-but-unused" });
  let embedCalls = 0;
  service.embed = async () => {
    embedCalls += 1;
    return [[1, 0]];
  };

  const result = await service.retrieve("residential price evidence", [{
    id: "document-1",
    content: "Residential price evidence from a completed transaction.",
    embedding: [1, 0]
  }], 4, { allowEmbedding: false });

  assert.equal(embedCalls, 0);
  assert.equal(result.mode, "lexical");
  assert.equal(result.matches[0].id, "document-1");
});

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
  for (let attempt = 0; attempt < 60; attempt += 1) {
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

async function post(baseUrl, body, token = serviceToken) {
  const response = await fetch(`${baseUrl}/api/internal/residential-deal-review`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(body)
  });
  return { response, payload: await response.json() };
}

test("workspace residential review is service-authenticated and versioned", async (t) => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "apex-workspace-review-"));
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(repoDir, "server.js")], {
    cwd: repoDir,
    env: {
      ...process.env,
      PORT: String(port),
      ESTATELAB_DATA_DIR: dataDir,
      ESTATELAB_OWNER_TOKEN: "owner-test-token",
      APEX_WORKSPACE_SERVICE_TOKEN: serviceToken,
      OPENAI_API_KEY: "",
      OPENROUTER_API_KEY: ""
    },
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

  const healthResponse = await fetch(`${baseUrl}/api/health`);
  const health = await healthResponse.json();
  assert.equal(health.releaseVersion, "10.1.0");
  assert.equal(health.engineVersion, "Apex v10.10");
  assert.equal(health.revision, "development");

  const unauthorized = await post(baseUrl, {}, "");
  assert.equal(unauthorized.response.status, 401);

  const wrongContract = await post(baseUrl, {
    contractVersion: "residential-deal-review.v0",
    assetClass: "residential",
    dealCard: {},
    financialProfile: {}
  });
  assert.equal(wrongContract.response.status, 400);

  const nonResidential = await post(baseUrl, {
    contractVersion: "residential-deal-review.v1",
    assetClass: "industrial",
    dealCard: { projectName: "Factory", propertyType: "Detached factory", askingPrice: 2_000_000 },
    financialProfile: {}
  });
  assert.equal(nonResidential.response.status, 400);

  const result = await post(baseUrl, {
    contractVersion: "residential-deal-review.v1",
    requestId: "workspace-run-1",
    assetClass: "residential",
    dealCard: {
      projectName: "Example Residence",
      area: "Petaling Jaya",
      propertyType: "Condominium",
      askingPrice: 500_000,
      conservativeFairValue: 520_000,
      expectedRent: 2_300,
      maintenance: 350,
      estimatedInstallment: 2_100,
      comparableTransactions: "1 to 2",
      comparableSource: "Official completed transaction",
      comparableRecency: "6-12 months",
      comparableMatchQuality: "Same project",
      comparablePriceRange: "RM480000 - RM530000",
      comparableAdjustmentNotes: "Adjusted for floor, view, and renovation.",
      siteVisit: "Not yet",
      legalCheck: "Pending"
    },
    financialProfile: {
      monthlyIncome: 12_000,
      currentDebt: 2_000,
      cashAvailable: 150_000,
      cashReserveMonths: 8,
      riskStyle: "Conservative",
      investmentGoal: "Hybrid own-stay and investment",
      experienceLevel: "Beginner",
      guidanceMode: "Guided",
      preferredOutput: "Full report",
      confidenceComfort: "Conservative"
    },
    evidence: [{
      id: "comp-1",
      category: "comparable",
      title: "Completed same-project transaction",
      sourceType: "official",
      sourceUrl: "https://example.com/evidence/comp-1",
      observedAt: "2026-06-01",
      verificationStatus: "verified",
      notes: "Same layout and similar floor.",
      amount: 510_000
    }]
  });

  assert.equal(result.response.status, 200);
  assert.equal(result.payload.packet.contractVersion, "residential-deal-review.v1");
  assert.equal(result.payload.packet.requestId, "workspace-run-1");
  assert.equal(result.payload.packet.engineVersion, "Apex v10.10");
  assert.ok(["PROCEED_TO_OFFER", "SHORTLIST", "INVESTIGATE", "PAUSE", "REJECT"].includes(result.payload.packet.recommendation));
  assert.equal(result.payload.packet.evidence.lanes.length, 6);
  assert.ok(result.payload.packet.sources.some((source) => source.id === "comp-1" && source.type === "buyer_evidence"));
  assert.equal(result.payload.packet.sources.find((source) => source.id === "comp-1").url, "https://example.com/evidence/comp-1");
});
