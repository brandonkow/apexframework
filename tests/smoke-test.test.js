import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { runSmoke, smokeOptions } from "../scripts/smoke-test.js";

const revision = "018c8c177878573e71ccb71b72b0772472f2ec7c";
function responses({ durable = false, files = false, llm = false, current = 0, healthStorage, statusStorage } = {}) {
  const storage = durable ? "postgres" : "json";
  return {
    "/": [200, "<title>Apex Analytic</title>"],
    "/api/health": [200, { status: "ok", app: "apex-analytic", releaseVersion: "10.6.0", engineVersion: "1", revision, storage: healthStorage || storage }],
    "/api/assistant/status": [200, { durable, storage: statusStorage || storage, llm, files: { enabled: files }, coverage: { sources: current ? [{ id: "synthetic" }] : [], records: current, current } }],
    "/api/billing/plans": [200, { plans: [{}, {}, {}] }],
    "/api/owner/export": [403, { error: "Owner only" }],
    "/api/owner/ops": [200, { checks: [] }]
  };
}
async function check(args = [], state = {}, alter) {
  const logs = [], requests = [], routes = responses(state);
  const options = smokeOptions(["https://apex.example", ...args], { APEX_SMOKE_OWNER_TOKEN: "private-owner-secret" });
  const result = await runSmoke(options, {
    write: line => logs.push(line),
    fetchImpl: async (url, init) => {
      requests.push({ url, init });
      assert.equal(init.method, "GET");
      assert.equal(init.redirect, "error");
      assert.ok(init.signal instanceof AbortSignal);
      const pathname = new URL(url).pathname;
      const [status, body] = alter?.(pathname, routes) || routes[pathname];
      return new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
    }
  });
  assert.equal(logs.join("\n").includes("private-owner-secret"), false);
  assert.deepEqual(requests.filter(item => item.init.headers["x-estatelab-owner-token"]).map(item => new URL(item.url).pathname), ["/api/owner/ops"]);
  return { ...result, output: logs.join("\n") };
}

test("smoke options validate the target and never echo credentials", () => {
  assert.equal(smokeOptions([], {}).baseUrl, "http://localhost:3000");
  assert.equal(smokeOptions(["https://apex.example/", "--expect-revision", "018C8C1"], {}).expectedRevision, "018c8c1");
  for (const args of [["https://user:secret@example.com"], ["https://example.com?key=secret"], ["https://example.com/private"], ["http://example.com"], ["file:///secret"], ["invalid-secret"], ["--expect-revision"], ["--unknown-secret"], ["https://example.com", "secret"]]) {
    assert.throws(() => smokeOptions(args, {}), error => !error.message.includes("secret"));
  }
});

test("ordinary smoke distinguishes temporary storage from strict production readiness", async () => {
  const basic = await check();
  assert.equal(basic.ok, true);
  assert.match(basic.output, /WARN persistent storage/);
  assert.match(basic.output, /WARN private originals/);
  assert.match(basic.output, /no current published discovery coverage/);
  const strict = await check(["--require-durable", "--framework-only"]);
  assert.equal(strict.ok, false);
  assert.ok(strict.failures.includes("persistent storage"));
});

test("durability, revision, private files and deferred AI are independent gates", async () => {
  const ready = await check(["--require-durable", "--framework-only", "--expect-revision", revision.slice(0, 7)], { durable: true });
  assert.equal(ready.ok, true);
  assert.match(ready.output, /hosted restart, isolation and restore checks still required/);
  assert.match(ready.output, /WARN private originals/);
  assert.equal((await check(["--require-private-files"], { durable: true })).ok, false);
  assert.equal((await check(["--require-private-files"], { files: true })).ok, false);
  assert.equal((await check(["--require-private-files"], { durable: true, files: true, current: 2 })).ok, true);
  assert.ok((await check(["--framework-only"], { durable: true, llm: true })).failures.includes("framework-only mode"));
  assert.ok((await check(["--expect-revision", "aaaaaaa"])).failures.includes("deployed commit"));
  assert.ok((await check([], { durable: true, healthStorage: "json" })).failures.includes("storage consistency"));
});

test("unexpected status data, authentication exposure and malformed JSON fail closed", async () => {
  for (const body of [null, {}, "not-json", { ...responses()["/api/assistant/status"][1], durable: "true" }]) {
    assert.ok((await check(["--require-durable"], {}, pathname => pathname === "/api/assistant/status" ? [200, body] : null)).failures.includes("assistant status"));
  }
  assert.ok((await check([], {}, pathname => pathname === "/api/owner/export" ? [200, {}] : null)).failures.includes("owner boundary"));
  const output = [];
  const result = await runSmoke(smokeOptions([], {}), { write: line => output.push(line), fetchImpl: async () => { throw new Error("private-network-secret"); } });
  assert.equal(result.ok, false);
  assert.equal(output.join("\n").includes("private-network-secret"), false);
});

test("actual smoke CLI returns failure for temporary storage and does not follow redirects", async t => {
  const routes = responses(), visited = [];
  const server = http.createServer((req, res) => {
    visited.push(req.url);
    if (req.url === "/api/owner/ops") { res.writeHead(302, { location: "/redirected-private" }); res.end(); return; }
    const [status, body] = routes[req.url] || [404, {}];
    res.writeHead(status, { "content-type": typeof body === "string" ? "text/html" : "application/json" });
    res.end(typeof body === "string" ? body : JSON.stringify(body));
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const child = spawn(process.execPath, [fileURLToPath(new URL("../scripts/smoke-test.js", import.meta.url)), `http://127.0.0.1:${server.address().port}`, "--require-durable"], {
    env: { ...process.env, APEX_SMOKE_OWNER_TOKEN: "private-owner-secret" }, stdio: ["ignore", "pipe", "pipe"]
  });
  t.after(() => { if (child.exitCode === null) child.kill(); });
  let output = "";
  child.stdout.on("data", chunk => { output += chunk; });
  child.stderr.on("data", chunk => { output += chunk; });
  const code = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", resolve); });
  assert.equal(code, 1);
  assert.match(output, /FAIL persistent storage/);
  assert.match(output, /FAIL owner ops/);
  assert.equal(visited.includes("/redirected-private"), false);
  assert.equal(output.includes("private-owner-secret"), false);
});

test("slow status reads time out rather than hanging the readiness check", async t => {
  const server = http.createServer(() => {});
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => { server.closeAllConnections(); return new Promise(resolve => server.close(resolve)); });
  const result = await runSmoke(smokeOptions([`http://127.0.0.1:${server.address().port}`], {}), { write: () => {}, timeoutMs: 25 });
  assert.equal(result.ok, false);
  assert.ok(result.failures.includes("assistant status"));
});
