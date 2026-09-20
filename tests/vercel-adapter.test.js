import assert from "node:assert/strict";
import { once } from "node:events";
import http from "node:http";
import test from "node:test";
import vercelRouter from "../api/router.js";

test("Vercel adapter returns bounded JSON errors with the same status as the Node host", async t => {
  const server = http.createServer((req, res) => {
    req.query = { __apex_path: new URL(req.url, "http://localhost").pathname.slice(5) };
    void vercelRouter(req, res);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [route, body, status, headers] of [
    ["tools/deal-costs", JSON.stringify({ price: true }), 400, {}],
    ["tools/affordability", "{malformed", 400, {}],
    ["tools/residential-dcf", JSON.stringify({ valuation: { asOf: "invalid" } }), 400, {}],
    ["assistant/cases", "{}", 403, { origin: "https://attacker.example" }]
  ]) {
    const response = await fetch(`${base}/api/${route}`, { method: "POST", headers: { "content-type": "application/json", ...headers }, body });
    assert.equal(response.status, status, route);
    assert.match(response.headers.get("content-type"), /application\/json/);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(typeof (await response.json()).error, "string");
  }
});
