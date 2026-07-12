#!/usr/bin/env node

const baseInput = process.argv[2] || process.env.APEX_SMOKE_URL || "http://localhost:3000";
const ownerToken = process.env.APEX_SMOKE_OWNER_TOKEN || process.env.ESTATELAB_OWNER_TOKEN || "";
const baseUrl = baseInput.replace(/\/$/, "");
const failures = [];

function pass(label, detail = "") {
  console.log(`PASS ${label}${detail ? ` - ${detail}` : ""}`);
}

function fail(label, detail) {
  failures.push(`${label}: ${detail}`);
  console.error(`FAIL ${label} - ${detail}`);
}

async function fetchText(label, pathname, validate) {
  try {
    const response = await fetch(`${baseUrl}${pathname}`);
    const text = await response.text();
    const detail = validate(response, text);
    if (detail === true || typeof detail === "string") pass(label, typeof detail === "string" ? detail : `${response.status}`);
    else fail(label, `unexpected response ${response.status}`);
  } catch (error) {
    fail(label, error.message);
  }
}

async function fetchJson(label, pathname, { headers = {}, validate } = {}) {
  try {
    const response = await fetch(`${baseUrl}${pathname}`, { headers });
    const payload = await response.json().catch(() => ({}));
    const detail = validate(response, payload);
    if (detail === true || typeof detail === "string") pass(label, typeof detail === "string" ? detail : `${response.status}`);
    else fail(label, `unexpected response ${response.status}`);
  } catch (error) {
    fail(label, error.message);
  }
}

console.log(`Apex smoke test target: ${baseUrl}`);

await fetchText("app shell", "/", (response, text) => (
  response.status === 200 && /Apex Analytic|orbCore|chatForm/.test(text)
    ? "HTML loaded"
    : false
));

await fetchJson("health", "/api/health", {
  validate: (response, payload) => (
    response.status === 200
      && payload.status === "ok"
      && payload.app === "apex-analytic"
      && payload.releaseVersion
      && payload.engineVersion
      ? `${payload.releaseVersion} / ${payload.engineVersion} / ${payload.revision || "unknown revision"} / ${payload.storage || "storage"} storage`
      : false
  )
});

await fetchJson("assistant status", "/api/jarvis/status", {
  validate: (response, payload) => (
    response.status === 200 && payload.status
      ? payload.status
      : response.status === 200
  )
});

await fetchJson("billing plans", "/api/billing/plans", {
  validate: (response, payload) => (
    response.status === 200 && Array.isArray(payload.plans) && payload.plans.length >= 3
      ? `${payload.plans.length} plans`
      : false
  )
});

await fetchJson("owner boundary", "/api/owner/export", {
  validate: (response) => response.status === 403 ? "owner token required" : false
});

if (ownerToken) {
  await fetchJson("owner ops", "/api/owner/ops", {
    headers: { "x-estatelab-owner-token": ownerToken },
    validate: (response, payload) => (
      response.status === 200 && Array.isArray(payload.checks)
        ? `${payload.status}: ${payload.summary?.ready || 0} ready / ${payload.summary?.warning || 0} warning / ${payload.summary?.missing || 0} blocked`
        : false
    )
  });
} else {
  console.log("SKIP owner ops - set APEX_SMOKE_OWNER_TOKEN to test owner-only production readiness.");
}

if (failures.length) {
  console.error("\nApex smoke test failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nApex smoke test passed.");
