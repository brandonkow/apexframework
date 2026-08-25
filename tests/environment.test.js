import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { loadLocalEnvironment, parseEnvironmentFile } from "../environment.js";

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
  const keys = ["APEX_TEST_EXISTING", "APEX_TEST_NEW"];
  const before = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  process.env.APEX_TEST_EXISTING = "from-launch";
  delete process.env.APEX_TEST_NEW;
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
