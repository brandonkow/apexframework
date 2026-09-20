#!/usr/bin/env node
import path from "node:path";
import { pathToFileURL } from "node:url";

const usage = "node scripts/smoke-test.js [URL] [--require-durable] [--require-private-files] [--framework-only] [--expect-revision COMMIT]";

export function smokeOptions(args, env = {}) {
  const options = { baseUrl: env.APEX_SMOKE_URL || "http://localhost:3000", ownerToken: env.APEX_SMOKE_OWNER_TOKEN || env.ESTATELAB_OWNER_TOKEN || "" };
  let hasUrl = false;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--require-durable") options.requireDurable = true;
    else if (arg === "--require-private-files") options.requirePrivateFiles = true;
    else if (arg === "--framework-only") options.frameworkOnly = true;
    else if (arg === "--expect-revision") {
      const revision = args[++index];
      if (!/^[a-f0-9]{7,40}$/i.test(revision || "")) throw new Error("Expected a 7-40 character hexadecimal commit ID.");
      options.expectedRevision = revision.toLowerCase();
    } else if (arg.startsWith("--") || hasUrl) throw new Error(`Usage: ${usage}`);
    else { options.baseUrl = arg; hasUrl = true; }
  }
  let url;
  try { url = new URL(options.baseUrl); } catch { throw new Error("Use a valid HTTP(S) origin, without credentials or query parameters."); }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("Use an HTTPS origin (HTTP is allowed for loopback only), without credentials, paths or query parameters.");
  }
  options.baseUrl = url.origin;
  return options;
}

export async function runSmoke(options, { fetchImpl = fetch, write = console.log, timeoutMs = 10000 } = {}) {
  const failures = [];
  const pass = (label, detail) => write(`PASS ${label} - ${detail}`);
  const fail = (label, detail) => { failures.push(label); write(`FAIL ${label} - ${detail}`); };
  const warn = (label, detail) => write(`WARN ${label} - ${detail}`);
  const gate = (condition, required, label, detail) => condition ? pass(label, detail) : (required ? fail : warn)(label, detail);

  async function request(label, pathname, { json = true, headers = {}, validate } = {}) {
    try {
      // Never follow redirects with the optional owner credential, and bound slow hosts.
      const response = await fetchImpl(`${options.baseUrl}${pathname}`, {
        method: "GET", headers, redirect: "error", signal: AbortSignal.timeout(timeoutMs), cache: "no-store"
      });
      const payload = json ? await response.json() : await response.text();
      if (!validate(response, payload)) { fail(label, `unexpected response ${response.status}`); return null; }
      pass(label, `${response.status}`);
      return payload;
    } catch {
      // Provider bodies/errors can contain credentials or private infrastructure details.
      fail(label, "request failed, timed out, redirected or returned invalid content");
      return null;
    }
  }

  write(`Apex read-only smoke test: ${options.baseUrl}`);
  await request("app shell", "/", { json: false, validate: (response, text) => response.status === 200 && /Apex Analytic|orbCore|chatForm/.test(text) });
  const health = await request("health", "/api/health", { validate: (response, payload) => (
    response.status === 200 && payload?.status === "ok" && payload.app === "apex-analytic"
    && typeof payload.releaseVersion === "string" && Boolean(payload.releaseVersion)
    && typeof payload.engineVersion === "string" && Boolean(payload.engineVersion)
    && ["json", "postgres"].includes(payload.storage)
  ) });
  if (options.expectedRevision) {
    const actual = typeof health?.revision === "string" && /^[a-f0-9]{40}$/i.test(health.revision) ? health.revision.toLowerCase() : "";
    if (actual.startsWith(options.expectedRevision)) pass("deployed commit", actual);
    else fail("deployed commit", "missing or different revision; wait for the intended deployment");
  }

  const assistant = await request("assistant status", "/api/assistant/status", { validate: (response, payload) => (
    response.status === 200 && typeof payload?.durable === "boolean" && typeof payload.llm === "boolean"
    && ["json", "postgres"].includes(payload.storage) && typeof payload.files?.enabled === "boolean"
    && Array.isArray(payload.coverage?.sources)
    && Number.isSafeInteger(payload.coverage.records) && payload.coverage.records >= 0
    && Number.isSafeInteger(payload.coverage.current) && payload.coverage.current >= 0 && payload.coverage.current <= payload.coverage.records
  ) });
  if (health && assistant) {
    if (health.storage !== assistant.storage) fail("storage consistency", "health and assistant disagree; recheck after deployment settles");
    const durable = health.storage === "postgres" && assistant.storage === "postgres" && assistant.durable === true;
    gate(durable, options.requireDurable || options.requirePrivateFiles, "persistent storage", durable
      ? "PostgreSQL reported; hosted restart, isolation and restore checks still required"
      : "durable PostgreSQL storage is not confirmed; export important investigations");
    gate(durable && assistant.files.enabled, options.requirePrivateFiles, "private originals", durable && assistant.files.enabled
      ? "uploads reported enabled; private upload/download/deletion still need an authorized test"
      : "durable database and private object storage are not both confirmed");
  }
  if (assistant) {
    if (options.frameworkOnly && assistant.llm) fail("framework-only mode", "a reasoning provider is available; remove its configuration while LLM integration is deferred");
    else pass("reasoning availability", assistant.llm ? "provider configured; no model was called or evaluated" : "framework-only; no reasoning provider configured");
    if (assistant.coverage.current > 0 && assistant.coverage.sources.length > 0) pass("catalogue availability", `${assistant.coverage.current} current records; permission, accuracy and micro-market coverage need review`);
    else warn("catalogue availability", "no current published discovery coverage; private property review remains available");
  }
  await request("billing plans", "/api/billing/plans", { validate: (response, payload) => response.status === 200 && Array.isArray(payload?.plans) && payload.plans.length >= 3 });
  await request("owner boundary", "/api/owner/export", { validate: (response) => response.status === 403 });
  if (options.ownerToken) {
    await request("owner ops", "/api/owner/ops", {
      headers: { "x-estatelab-owner-token": options.ownerToken },
      validate: (response, payload) => response.status === 200 && Array.isArray(payload?.checks)
    });
  } else write("SKIP owner ops - optional APEX_SMOKE_OWNER_TOKEN is not set.");

  write("Scope: status reads only, not proof of saved-case durability, account isolation, backup restoration, document safety or market evidence quality.");
  write(failures.length ? `Read-only smoke test failed (${failures.length} checks).` : "Read-only smoke test passed; review WARN and remaining acceptance checks before relying on production records.");
  return { ok: failures.length === 0, failures };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const result = await runSmoke(smokeOptions(process.argv.slice(2), process.env));
    process.exitCode = result.ok ? 0 : 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
