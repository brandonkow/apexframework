import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

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

async function jsonRequest(baseUrl, pathname, { method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-estatelab-client-id": "provider-routing-test"
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return { response, payload: await response.json() };
}

test("OpenRouter uses its free router and reports the model that actually answered", async (t) => {
  const captured = [];
  const providerPort = await freePort();
  const provider = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    captured.push({
      url: req.url,
      authorization: req.headers.authorization,
      title: req.headers["x-title"],
      body: JSON.parse(Buffer.concat(chunks).toString("utf8"))
    });
    const truncated = captured.length === 1;
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      model: "anthropic/claude-test-resolved",
      choices: [{
        finish_reason: truncated ? "length" : "stop",
        message: {
          role: "assistant",
          content: truncated ? '{"currentView":"Possible shortlist' : JSON.stringify({
            currentView: "Possible shortlist, but rent and exit evidence are still too weak for approval.",
            confidence: "Low",
            reasons: ["The asking price is within the stated range, but price alone does not prove value."],
            counterCase: ["The achieved rent may be below the advertised figure."],
            evidenceGaps: ["Recent completed transactions and signed rent."],
            alternativeAngle: ["Borrowing capacity may be more valuable than this specific unit."],
            nextSteps: ["Verify rent and transaction evidence before negotiating."],
            questions: ["What is the all-in monthly holding cost?"]
          })
        }
      }]
    }));
  });
  await new Promise((resolve, reject) => {
    provider.once("error", reject);
    provider.listen(providerPort, "127.0.0.1", resolve);
  });

  const dataDir = await mkdtemp(path.join(os.tmpdir(), "estatelab-openrouter-"));
  const appPort = await freePort();
  const baseUrl = `http://127.0.0.1:${appPort}`;
  const child = spawn(process.execPath, [path.join(repoDir, "server.js")], {
    cwd: repoDir,
    env: {
      ...process.env,
      PORT: String(appPort),
      ESTATELAB_DATA_DIR: dataDir,
      OPENAI_API_KEY: "",
      OPENROUTER_API_KEY: "test-openrouter-key",
      LLM_MODEL: "LLM_MODEL=deepseek/deepseek-v4-flash",
      LLM_BASE_URL: `http://127.0.0.1:${providerPort}`
    },
    stdio: "ignore"
  });

  t.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await new Promise((resolve) => child.once("exit", resolve));
    }
    await new Promise((resolve) => provider.close(resolve));
    await rm(dataDir, { recursive: true, force: true });
  });

  await waitForHealth(baseUrl, child);
  const before = await jsonRequest(baseUrl, "/api/jarvis/status");
  assert.equal(before.payload.llm.provider, "openrouter");
  assert.equal(before.payload.llm.configuredModel, "openrouter/free");
  assert.equal(before.payload.llm.resolvedModel, null);
  assert.deepEqual(before.payload.llm.privacy, { dataCollection: "deny", zeroDataRetention: false });

  const session = await jsonRequest(baseUrl, "/api/jarvis/sessions", { method: "POST", body: {} });
  const answer = await jsonRequest(baseUrl, "/api/jarvis/query", {
    method: "POST",
    body: {
      sessionId: session.payload.session.id,
      query: "Should I buy a RM500k condo if the advertised rent is RM2,500?",
      financialProfile: { guidanceMode: "Concise", preferredOutput: "Short answer" }
    }
  });
  assert.equal(answer.response.status, 200);
  assert.equal(answer.payload.mode, "llm");
  assert.equal(answer.payload.provider, "openrouter");
  assert.equal(answer.payload.model, "anthropic/claude-test-resolved");
  assert.match(answer.payload.answer, /^Current view\nPossible shortlist/);
  assert.match(answer.payload.answer, /Strongest counter-case\n- The achieved rent may be below the advertised figure\./);
  assert.match(answer.payload.answer, /Blind spot \/ alternative angle/);
  assert.equal(answer.payload.message.mode, "llm");
  assert.equal(answer.payload.message.provider, "openrouter");
  assert.equal(answer.payload.message.model, "anthropic/claude-test-resolved");
  assert.equal(captured.length, 2);
  assert.equal(captured[0].url, "/chat/completions");
  assert.equal(captured[0].authorization, "Bearer test-openrouter-key");
  assert.equal(captured[0].title, "Apex Analytic");
  assert.equal(captured[0].body.model, "openrouter/free");
  assert.equal(captured[0].body.messages[0].role, "system");
  assert.match(captured[0].body.messages[1].content, /RESPONSE PERSONA/);
  assert.match(captured[0].body.messages[1].content, /Concise mode/);
  assert.equal(captured[0].body.provider.data_collection, "deny");
  assert.equal(captured[0].body.provider.require_parameters, true);
  assert.equal(captured[0].body.response_format.type, "json_schema");
  assert.equal(captured[0].body.response_format.json_schema.strict, true);
  assert.ok(captured[0].body.response_format.json_schema.schema.required.includes("alternativeAngle"));
  assert.ok(captured[1].body.max_tokens > captured[0].body.max_tokens);
  assert.match(captured[1].body.messages[0].content, /previous draft was incomplete/i);
  assert.match(captured[1].body.messages[0].content, /valid JSON that matches it/i);

  const after = await jsonRequest(baseUrl, "/api/jarvis/status");
  assert.equal(after.payload.llm.resolvedModel, "anthropic/claude-test-resolved");
  assert.ok(after.payload.llm.lastUsedAt);
});
