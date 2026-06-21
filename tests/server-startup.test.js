import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("server binds to an externally reachable host for Render", async () => {
  const server = await readFile(path.join(repoDir, "server.js"), "utf8");
  assert.match(server, /const HOST = String\([^\n]+"0\.0\.0\.0"/);
  assert.match(server, /server\.listen\(PORT, HOST,/);
});
