import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { once } from "node:events";
import { validateImport, cleanBrief, interpretBrief, discover, pastDate, newCase, stageTasks, recordTask } from "../investment-assistant.js";
import { analyzeSevenStageDeal } from "../server.js";

const now = Date.now(), today = new Date(now).toISOString().slice(0, 10);
const ago = days => new Date(now - days * 86400000).toISOString();
function bundle() {
  return { version: 1, source: { id: "test-catalogue", name: "LOCAL TEST FIXTURE", permission: "owner_authorized", permissionReference: "Synthetic records for local tests, never production", publish: true, coverage: "Synthetic Bayan Lepas only" }, listings: [{ id: "unit-1", projectName: "Synthetic Test Residence", area: "Bayan Lepas", state: "Penang", propertyType: "condo", askingPrice: 440000, bedrooms: 3, sizeSqft: 950, unitKey: "A-12-03", sourceUrl: "https://example.com/test-only/1", observedAt: today, availability: "available", facts: [{ kind: "signed_rent", value: 2600, unitSpecific: true, verification: "owner_checked", sourceUrl: "https://example.com/test-only/rent", observedAt: today, description: "Synthetic signed rent for test only." }] }] };
}
function catalogue(input = bundle()) { const { source, listings } = validateImport(input); return { sources: [source], listings }; }
const brief = { area: "Penang", goal: "rental_income", budgetMax: 500000, propertyType: "condo", bedroomsMin: 2 };

test("discovery distinguishes evidence from claims and uses the existing engine", () => {
  const data = catalogue();
  const result = discover(brief, data, analyzeSevenStageDeal);
  assert.equal(result.candidates.length, 1);
  const candidate = result.candidates[0];
  assert.equal(candidate.status, "investigate");
  assert.equal(candidate.grossYield, 7.09);
  assert.deepEqual(candidate.framework.dimensions, analyzeSevenStageDeal(candidate.dealCard, {}).dimensions);
  assert.ok(candidate.gaps.some(gap => /financing/.test(gap)));
  assert.ok(candidate.gaps.some(gap => /completed transactions/.test(gap)));
  data.listings[0].facts[0].kind = "advertised_rent";
  assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates[0].grossYield, null);
  data.listings[0].facts[0].kind = "signed_rent";
  data.listings[0].facts[0].unitSpecific = false;
  assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates[0].dealCard.expectedRent, "");
});

test("imported maintenance and sinking fund map to the engine's combined monthly charge", () => {
  const data = catalogue();
  for (const [kind, value] of [["maintenance", 300], ["sinking_fund", 30]]) data.listings[0].facts.push({ kind, value, verification: "owner_checked", observedAt: today, sourceUrl: "https://example.com/qa-only/cost", description: "Synthetic monthly charge for testing" });
  assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates[0].dealCard.maintenance, "330");
  data.listings[0].facts.pop();
  assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates[0].dealCard.maintenance, "", "Missing sinking fund must not be silently treated as zero.");
});

test("empty, stale, withdrawn and unpermitted coverage never manufactures matches", () => {
  assert.equal(discover(brief, { sources: [], listings: [] }, analyzeSevenStageDeal).candidates.length, 0);
  for (const mutate of [data => data.sources[0].publish = false, data => data.listings[0].observedAt = ago(31), data => data.listings[0].availability = "withdrawn", data => data.listings[0].askingPrice = 700000]) {
    const data = catalogue(); mutate(data);
    assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates.length, 0);
  }
});

test("duplicate-unit evidence cannot hide an adverse title or management record", () => {
  const data = catalogue();
  data.listings.push({ ...structuredClone(data.listings[0]), id: "different-source:same-unit", sourceUrl: "https://example.com/test-only/2", facts: [{ kind: "title", observedAt: today, adverse: true }] });
  const result = discover(brief, data, analyzeSevenStageDeal);
  assert.equal(result.candidates.length, 0);
  assert.equal(result.excluded.adverse, 1);
  assert.equal(result.excluded.duplicate, 1);
});

test("a newer withdrawal and conflicting prices survive duplicate screening", () => {
  const data = catalogue();
  data.listings.push({ ...structuredClone(data.listings[0]), id: "other:withdrawn", sourceUrl: "https://example.com/test-only/withdrawn", availability: "withdrawn" });
  assert.equal(discover(brief, data, analyzeSevenStageDeal).candidates.length, 0);
  data.listings[1].availability = "available"; data.listings[1].askingPrice = 490000;
  assert.ok(discover(brief, data, analyzeSevenStageDeal).candidates[0].gaps.some(gap => /Different current asking prices/.test(gap)));
});

test("catalogue import validates permission, dates, links and untrusted shapes", () => {
  for (const mutate of [raw => raw.source.publish = false, raw => raw.source.permissionReference = "", raw => raw.listings[0].sourceUrl = "javascript:alert(1)", raw => raw.listings[0].observedAt = "2099-01-01", raw => raw.listings[0].observedAt = "2026-02-30", raw => raw.listings[0] = null, raw => raw.listings[0].askingPrice = true, raw => raw.listings[0].facts = "bad", raw => raw.listings[0].facts = [null]]) {
    const raw = bundle(); mutate(raw); assert.throws(() => validateImport(raw), error => error.statusCode === 400);
  }
  assert.equal(pastDate("2026-02-30"), "");
  assert.equal(cleanBrief({ budgetMax: true }).budgetMax, null);
});

test("basic brief helper retains known context without inventing finances", () => {
  const parsed = interpretBrief("Find a rental condo in Penang under RM500k", {});
  assert.equal(parsed.budgetMax, 500000); assert.equal(parsed.area, "Penang"); assert.equal(parsed.goal, "rental_income");
  assert.equal(interpretBrief("3 bedrooms", parsed).budgetMax, 500000);
  assert.equal(interpretBrief("I'm new to this", {}).budgetMax, null);
  assert.deepEqual(Object.keys(parsed).sort(), ["area", "bedroomsMin", "budgetMax", "goal", "notes", "propertyType"].sort());
});

test("site checks need dated evidence and remain user-declared progress", () => {
  const item = newCase("test"); item.tasks = stageTasks("site_visit");
  assert.throws(() => recordTask(item, item.tasks[0].id, { status: "done" }));
  recordTask(item, item.tasks[0].id, { status: "done", note: "Visited and observed the unit directly.", checkedAt: today });
  assert.equal(item.tasks[0].status, "done"); assert.equal(item.revision, 1);
  recordTask(item, item.tasks[0].id, { status: "open" });
  assert.equal(item.tasks[0].status, "open");
});

test("private discovery lifecycle persists, resumes and rejects cross-user edits", { timeout: 60000 }, async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "apex-assistant-test-"));
  const probe = net.createServer(); probe.listen(0, "127.0.0.1"); await once(probe, "listening"); const port = probe.address().port; await new Promise(resolve => probe.close(resolve));
  let child;
  const base = `http://127.0.0.1:${port}`;
  const env = { ...process.env, PORT: String(port), HOST: "127.0.0.1", ESTATELAB_DATA_DIR: dir, DATABASE_URL: "", VERCEL: "", APEX_ASSISTANT_BACKGROUND: "false", OPENROUTER_API_KEY: "", OPENAI_API_KEY: "", LLM_API_KEY: "", ESTATELAB_OWNER_TOKEN: "local-assistant-test-owner-only" };
  async function start() {
    child = spawn(process.execPath, ["server.js"], { cwd: new URL("../", import.meta.url), env, stdio: "pipe" });
    let logs = ""; child.stderr.on("data", data => logs += data);
    for (let attempt = 0; attempt < 100; attempt++) {
      if (child.exitCode !== null) throw new Error(logs);
      try { if ((await fetch(base + "/api/health")).ok) return; } catch {}
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error("Assistant test server failed to start: " + logs);
  }
  async function stop() { if (child?.exitCode === null) { const done = once(child, "exit"); child.kill(); await done; } }
  t.after(async () => { await stop(); await rm(dir, { recursive: true, force: true }); });
  await start();
  async function request(route, body, { cookie = "", owner = false, method = body ? "POST" : "GET", headers = {} } = {}) {
    const response = await fetch(base + route, { method, headers: { "content-type": "application/json", cookie, ...(owner ? { "x-estatelab-owner-token": env.ESTATELAB_OWNER_TOKEN } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, cookie: response.headers.get("set-cookie")?.split(";")[0], data: await response.json() };
  }
  assert.equal((await request("/api/owner/discovery", bundle())).status, 403);
  assert.equal((await request("/api/owner/discovery", bundle(), { owner: true })).status, 200);
  const created = await request("/api/assistant/cases", {}), guest = created.cookie;
  assert.match(guest, /^apex_investment_guest=/);
  let item = created.data.case;
  assert.equal(item.scope, undefined);
  async function action(name, data = {}, cookie = guest) {
    const result = await request(`/api/assistant/cases/${item.id}/${name}`, { revision: item.revision, ...data }, { cookie });
    if (result.data.case) item = result.data.case;
    return result;
  }
  assert.equal((await action("message", { message: "Find a rental condo in Penang under RM500k" })).status, 200);
  assert.equal(item.brief.budgetMax, 500000);
  assert.equal((await action("profile", { action: "start" })).status, 200);
  await action("message", { message: "net income 8000; debt repayments 1500; purchase cash 60k; reserve 6 months" });
  assert.equal(item.working, undefined);
  assert.equal((await action("profile", { action: "confirm" })).status, 200);
  assert.equal((await action("confirm", { brief })).status, 200);
  const id = item.id;
  assert.equal((await request(`/api/assistant/cases/${id}`)).status, 404);
  assert.equal((await request(`/api/assistant/cases/${id}/step`, { revision: -1, jobId: item.job.id }, { cookie: guest })).status, 409);
  assert.equal((await action("step", { jobId: item.job.id })).status, 200);
  await stop(); await start();
  item = (await request(`/api/assistant/cases/${id}`, null, { cookie: guest })).data.case;
  assert.equal(item.job.step, 1);
  await action("step", { jobId: item.job.id }); await action("step", { jobId: item.job.id });
  assert.equal(item.job.status, "completed"); assert.equal(item.results.candidates.length, 1);
  await action("select", { listingId: item.results.candidates[0].id });
  assert.equal(item.stage, "site_visit");
  assert.equal(item.toolContext.financialProfile.monthlyIncome, "8000");
  assert.equal(item.toolContext.dealCard.askingPrice, "440000", "Selecting a property must seed its source inputs even when finances were confirmed first.");
  assert.equal(item.working.financialBasis.monthlyIncome, "net_declared");
  assert.equal((await action("task", { taskId: item.tasks[0].id, status: "done", note: "Observed the site and layout in person.", checkedAt: today })).status, 200);
  assert.equal((await action("milestone", { action: "plan", taskId: item.tasks[1].id, plan: { responsibility: "management", dueDate: today, dateKind: "target", dependsOn: [], contactLabel: "Private building contact" } })).status, 200);
  await stop(); await start();
  item = (await request(`/api/assistant/cases/${id}`, null, { cookie: guest })).data.case;
  assert.equal(item.tasks[1].plan.contactLabel, "Private building contact");
  await action("stage", { stage: "rental", note: "Owner reports that the purchase and handover were completed separately." });
  assert.equal(item.tasks.find(task => task.id === "site_visit:management").plan.dueDate, today);
  assert.equal((await action("outcome", { month: today.slice(0, 7), rentReceived: true, totalCosts: 2200 })).status, 400);
  await action("outcome", { month: today.slice(0, 7), rentReceived: 2500, totalCosts: 2200, note: "Includes actual loan and monthly holding costs." });
  assert.equal(item.outcomes[0].cashFlow, 300);
  assert.equal((await request(`/api/assistant/cases/${id}/stage`, { revision: item.revision, stage: "review", note: "Cross-site attack should fail." }, { cookie: guest, headers: { origin: "https://attacker.example" } })).status, 403);
  const account = await request("/api/auth/register", { displayName: "Test Member", email: "assistant-user@example.com", password: "Long-Local-Test-2026!" });
  const accountCookie = account.cookie;
  assert.equal((await request(`/api/assistant/cases/${id}`, null, { cookie: accountCookie })).status, 404);
  assert.equal((await request("/api/assistant/adopt", {}, { cookie: `${accountCookie}; ${guest}` })).data.imported, 1);
  assert.equal((await request(`/api/assistant/cases/${id}`, null, { cookie: accountCookie })).status, 200);
  assert.equal((await request(`/api/assistant/cases/${id}`, null, { cookie: guest })).status, 404);
  const exported = await request("/api/me/export", null, { cookie: accountCookie });
  assert.equal(exported.data.investigations[0].id, id);
  assert.equal(exported.data.investigations[0].scope, undefined);
  assert.equal(exported.data.investigations[0].working.financialProfile.monthlyIncome, "8000");
  assert.equal(exported.data.investigations[0].tasks.find(task => task.id === "site_visit:management").plan.contactLabel, "Private building contact");
  assert.equal((await request(`/api/assistant/cases/${id}`, null, { method: "DELETE", cookie: accountCookie })).status, 200);
  assert.equal((await request(`/api/assistant/cases/${id}`, null, { cookie: accountCookie })).status, 404);
});
