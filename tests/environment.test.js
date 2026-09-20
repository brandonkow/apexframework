import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { loadLocalEnvironment, parseEnvironmentFile } from "../environment.js";
import { isolatedTestEnvironment } from "../scripts/run-tests.js";

test("local environment parser handles comments, export syntax, and quoted values", () => {
  assert.deepEqual(parseEnvironmentFile(`
# comment
OPENROUTER_API_KEY=sk-test # local only
export LLM_PROVIDER=openrouter
QUOTED="hello world"
SINGLE='literal # value'
INVALID-KEY=skip
`), {
    OPENROUTER_API_KEY: "sk-test",
    LLM_PROVIDER: "openrouter",
    QUOTED: "hello world",
    SINGLE: "literal # value"
  });
});

test("local environment loading never overrides launch environment values", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "apex-env-"));
  const file = path.join(directory, ".env");
  const keys = ["APEX_TEST_EXISTING", "APEX_TEST_NEW", "ESTATELAB_DISABLE_ENV_FILE"];
  const before = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  process.env.APEX_TEST_EXISTING = "from-launch";
  delete process.env.APEX_TEST_NEW;
  delete process.env.ESTATELAB_DISABLE_ENV_FILE;
  await writeFile(file, "APEX_TEST_EXISTING=from-file\nAPEX_TEST_NEW=loaded\n", "utf8");
  try {
    const result = loadLocalEnvironment(file);
    assert.deepEqual(result, { loaded: true, count: 1 });
    assert.equal(process.env.APEX_TEST_EXISTING, "from-launch");
    assert.equal(process.env.APEX_TEST_NEW, "loaded");
  } finally {
    for (const key of keys) {
      if (before[key] === undefined) delete process.env[key];
      else process.env[key] = before[key];
    }
    await rm(directory, { recursive: true, force: true });
  }
});

test("test runner isolates production services, credentials and persistent data", () => {
  const env = isolatedTestEnvironment({ Path: "test-path", DATABASE_URL: "test-only-db", PGHOST: "test-only-host", LLM_API_KEY: "test-only-key", OPENROUTER_API_KEY: "test-only-key", ESTATELAB_DATA_DIR: "do-not-use", APEX_BILLING_WEBHOOK_SECRET: "test-only", VERCEL: "1", RENDER: "true", NODE_OPTIONS: "--require=do-not-use", PORT: "9999" }, "synthetic-test-directory");
  assert.equal(env.Path, "test-path");
  assert.equal(env.ESTATELAB_DATA_DIR, "synthetic-test-directory");
  assert.equal(env.ESTATELAB_DISABLE_ENV_FILE, "true");
  for (const key of ["DATABASE_URL", "PGHOST", "LLM_API_KEY", "OPENROUTER_API_KEY", "APEX_BILLING_WEBHOOK_SECRET", "VERCEL", "RENDER", "NODE_OPTIONS", "PORT"]) assert.equal(env[key], undefined, key);
});
