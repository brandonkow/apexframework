import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const output = path.resolve(process.env.ASSISTANT_QA_OUTPUT || "../../outputs/apex-assistant");
const dir = await mkdtemp(path.join(os.tmpdir(), "apex-learning-browser-"));
const probe = net.createServer(); probe.listen(0, "127.0.0.1"); await once(probe, "listening"); const port = probe.address().port; await new Promise(resolve => probe.close(resolve));
const base = `http://127.0.0.1:${port}`, owner = "local-learning-browser-owner";
const env = { ...process.env, PORT: String(port), HOST: "127.0.0.1", ESTATELAB_DATA_DIR: dir, DATABASE_URL: "", VERCEL: "", OPENAI_API_KEY: "", OPENROUTER_API_KEY: "", LLM_API_KEY: "", ESTATELAB_OWNER_TOKEN: owner };
let child, browser, logs = "";
async function start() {
  child = spawn(process.execPath, ["server.js"], { cwd: new URL("../", import.meta.url), env, stdio: "pipe" });
  child.stderr.on("data", data => logs += data);
  for (let i = 0; i < 100; i++) { try { if ((await fetch(base + "/api/health")).ok) return; } catch {} await new Promise(resolve => setTimeout(resolve, 50)); }
  throw new Error("Test server not ready: " + logs);
}
async function stop() { if (child?.exitCode === null) { const done = once(child, "exit"); child.kill(); await done; } }
try {
  await start(); await mkdir(output, { recursive: true });
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 950 }, reducedMotion: "reduce" }), errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() === 429) errors.push("Rate limit reached: " + response.url()); });
  const imported = await fetch(base + "/api/owner/discovery", { method: "POST", headers: { "content-type": "application/json", "x-estatelab-owner-token": owner }, body: JSON.stringify({ version: 1, source: { id: "learning-fixture", name: "SYNTHETIC LOCAL QA ONLY", permission: "owner_authorized", permissionReference: "Local browser fixture, never market data", publish: true, coverage: "Synthetic Penang records" }, listings: [{ id: "one", projectName: "PRIVATE SYNTHETIC SUBJECT", area: "Bayan Lepas", state: "Penang", propertyType: "condo", askingPrice: 440000, sourceUrl: "https://example.com/qa-only/learning", observedAt: new Date().toISOString(), availability: "available", facts: [] }] }) });
  assert.equal(imported.status, 200);
  let record = (await (await page.request.post(base + "/api/assistant/cases", { data: {} })).json()).case;
  const caseId = record.id;
  async function reload() { record = (await (await page.request.get(`${base}/api/assistant/cases/${caseId}`)).json()).case; return record; }
  async function action(route, data) {
    const response = await page.request.post(`${base}/api/assistant/cases/${caseId}/${route}`, { data: { ...data, revision: record.revision } });
    const body = await response.json(); assert.equal(response.status(), 200, JSON.stringify(body)); record = body.case; return body;
  }
  await action("confirm", { brief: { area: "Penang", goal: "rental_income", budgetMax: 500000, propertyType: "condo" } });
  for (let i = 0; i < 40 && record.job.status !== "completed"; i++) { await new Promise(resolve => setTimeout(resolve, 100)); await reload(); }
  assert.equal(record.job.status, "completed");
  await action("select", { listingId: record.results.candidates[0].id });
  await action("stage", { stage: "rental", note: "The owner reports completing purchase and handover separately." });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#investmentLearningPanel > summary").click();
  const form = page.locator("#investmentLearningForm");
  await form.locator('[name="claim"]').fill("I expect dependable rental cash flow from proven local demand.");
  await form.locator('[name="counterCase"]').fill("New nearby supply could draw tenants away even if the unit is well maintained.");
  await form.locator('[name="falsifier"]').fill("Sustained achieved rent below recurring outgoings would invalidate the holding plan.");
  await form.locator('[name="startMonth"]').fill("2026-01");
  await form.locator('[name="expectedMonthlyRent"]').fill("2500");
  await form.locator('[name="expectedMonthlyCosts"]').fill("2200");
  await form.locator('[name="confirmLock"]').check();
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(() => document.querySelector("#investmentLearningHistory")?.textContent.includes("Thesis v1"));
  assert.match(await page.locator("#investmentLearningHistory").textContent(), /Retrospective record/);
  await page.locator('[data-learning-mode="outcome"]').click();
  for (const [month, rent, costs] of [["2026-01", "2400", "2200"], ["2026-03", "0", "2300"]]) {
    const outcome = page.locator("#investmentOutcomeForm");
    await outcome.locator('[name="month"]').fill(month); await outcome.locator('[name="rentReceived"]').fill(rent); await outcome.locator('[name="totalCosts"]').fill(costs);
    await outcome.locator('[name="note"]').fill("PRIVATE test note, never share this with the owner.");
    await outcome.locator('button[type="submit"]').click();
    await page.waitForFunction(month => document.querySelector("#investmentLearningHistory")?.textContent.includes(month + " / rent"), month);
  }
  await page.locator('[data-learning-mode="review"]').click();
  await form.locator('[name="throughMonth"]').fill("2026-03");
  await form.locator('[data-learning-intent="preview"]').click();
  await page.waitForSelector("#investmentLearningForm .learning-comparison");
  assert.match(await form.locator(".learning-comparison").innerText(), /2026-02/);
  assert.match(await form.locator(".learning-comparison").innerText(), /2 recorded month/);
  await form.locator('[name="conclusion"]').fill("The two recorded months underperformed; February is still unknown.");
  await form.locator('[name="alternative"]').fill("Timing and tenant turnover may explain more than the building quality.");
  await form.locator('[name="lesson"]').fill("Check holding capacity through a vacancy, not only advertised gross yield.");
  await form.locator('[name="nextEvidence"]').fill("Collect the missing month and compare achieved rents before generalising.");
  await form.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(output, "assistant-learning-viewport.png") });
  await form.locator('[name="confirmReview"]').check();
  await form.locator('[data-learning-save-review]').click();
  await page.waitForFunction(() => document.querySelector("#investmentLearningHistory")?.textContent.includes("Private review v1"));
  await reload(); assert.equal(record.learning.reviews[0].comparison.actualCashFlow, -2100);
  assert.equal(record.learning.reviews[0].comparison.cashFlowGap, -2700);
  await page.locator('[data-learning-mode="share"]').click();
  assert.match(await form.innerText(), /Sign in and explicitly import/);
  const registered = await page.request.post(base + "/api/auth/register", { data: { displayName: "Local learning tester", email: "learning@example.com", password: "Local-Only-Long-Test-2026!" } });
  assert.equal(registered.status(), 201, await registered.text());
  assert.equal((await page.request.get(`${base}/api/assistant/cases/${caseId}`)).status(), 404);
  assert.equal((await page.request.post(base + "/api/assistant/adopt", { data: {} })).status(), 200);
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#investmentLearningPanel > summary").click();
  await page.locator('[data-learning-mode="share"]').click();
  const shared = { claim: "Test holding power against achieved rent, including vacant months.", scope: "One illustrative high-rise rental case; not a market-wide rule.", evidenceFor: "Two user-recorded months included one empty month and continuing outgoings.", evidenceAgainst: "One month is missing and tenant turnover could explain the weakness.", falsifier: "A longer complete record could contradict the initial conclusion." };
  for (const [name, value] of Object.entries(shared)) await form.locator(`[name="${name}"]`).fill(value);
  assert.equal(await form.locator('[name="consentShare"]').isChecked(), false);
  await form.locator('[name="consentShare"]').check(); await form.locator('button[type="submit"]').click();
  await page.waitForSelector("#investmentLearningReceipts");
  await reload(); const proposalId = record.learningView.proposals[0].id;
  assert.equal((await page.request.get(base + "/api/owner/lessons")).status(), 403);
  const other = await browser.newContext();
  const anotherUser = await other.request.post(base + "/api/auth/register", { data: { displayName: "Other tester", email: "other-learning@example.com", password: "Local-Only-Long-Test-2026!" } });
  assert.equal(anotherUser.status(), 201);
  assert.equal((await other.request.get(`${base}/api/assistant/cases/${caseId}`)).status(), 404); await other.close();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.locator("#investmentLearningHistory").evaluate(node => node.open = true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Learning overflow at ${width}`);
    await page.screenshot({ path: path.join(output, `assistant-learning-${width}.png`), fullPage: true });
  }
  const ownerPage = await browser.newPage({ viewport: { width: 390, height: 950 }, reducedMotion: "reduce" });
  ownerPage.on("pageerror", error => errors.push(error.message));
  await ownerPage.goto(base + "/#owner/owner", { waitUntil: "networkidle" });
  await ownerPage.locator("#ownerIntelToken").fill(owner);
  await ownerPage.locator("#ownerIntelLessons").click();
  const ownerPanel = ownerPage.locator("#ownerLearningProposals");
  await ownerPage.locator(`[data-owner-proposal="${proposalId}"] > summary`).click();
  assert.doesNotMatch(await ownerPanel.innerText(), /PRIVATE SYNTHETIC SUBJECT|PRIVATE test note|2400|2200/);
  const ownerForm = ownerPage.locator(`[data-owner-learning="${proposalId}"]`);
  await ownerForm.locator('[name="note"]').fill("Reviewed limitations; retain this as an unverified, narrow hypothesis.");
  await ownerForm.locator('[name="confirmPublish"]').check();
  await ownerForm.scrollIntoViewIfNeeded();
  await ownerPage.screenshot({ path: path.join(output, "assistant-owner-learning-viewport.png") });
  await ownerForm.locator('button[value="approve"]').click();
  await ownerPage.waitForFunction(() => document.querySelector("#ownerLearningProposals")?.textContent.includes("Saved as a contested hypothesis"));
  let db = JSON.parse(await readFile(path.join(dir, "db.json"), "utf8"));
  const belief = db.brain.beliefs.find(row => row.learningProposalId === proposalId);
  assert.equal(belief.status, "contested"); assert.ok(belief.nextReview); assert.equal(belief.reviewIntervalDays, 90);
  const repeat = await ownerPage.request.post(base + "/api/owner/lessons", { headers: { "x-estatelab-owner-token": owner }, data: { action: "approve", proposalId, proposalRevision: 0, publication: shared, note: "Trying to approve the same proposal twice.", confirmPublish: true } });
  assert.equal(repeat.status(), 409);
  for (const width of [320, 390, 768, 1440]) {
    await ownerPage.setViewportSize({ width, height: 950 });
    await ownerPage.locator(`[data-owner-proposal="${proposalId}"]`).evaluate(node => node.open = true);
    assert.equal(await ownerPage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Owner proposal overflow at ${width}`);
    await ownerPage.screenshot({ path: path.join(output, `assistant-owner-learning-${width}.png`), fullPage: true });
  }
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#investmentLearningPanel > summary").click();
  await page.locator('[data-learning-mode="review"]').click();
  await form.locator('[name="throughMonth"]').fill("2026-03");
  await form.locator('[name="conclusion"]').fill("Local review draft to preserve across a concurrent correction.");
  await reload(); await action("outcome", { month: "2026-03", rentReceived: 2000, totalCosts: 2300, note: "Corrected the actual receipt after checking the bank record." });
  await form.locator('[data-learning-intent="preview"]').click();
  await page.waitForSelector('[data-learning-resolve="review"]');
  assert.equal(await form.locator('[name="conclusion"]').inputValue(), "Local review draft to preserve across a concurrent correction.");
  assert.match(await page.locator("#investmentLearningHistory").textContent(), /Outcomes changed after this review/);
  await page.locator('[data-learning-resolve="review"]').click(); await page.locator('[data-learning-resolve="review"]').click();
  await form.locator('[data-learning-intent="preview"]').click();
  await page.waitForSelector("#investmentLearningForm .learning-comparison");
  assert.equal(await form.locator('[name="confirmReview"]').isChecked(), false);
  assert.equal(await form.locator('[name="conclusion"]').inputValue(), "Local review draft to preserve across a concurrent correction.");
  const exported = await page.request.get(base + "/api/me/export");
  assert.equal(exported.status(), 200); assert.equal((await exported.json()).investigations[0].learningView.proposals[0].status, "approved");
  await stop(); await start(); await reload();
  assert.equal(record.learning.reviews.length, 1); assert.equal(record.learningView.reviews[0].outcomesChanged, true);
  assert.equal((await page.request.delete(`${base}/api/assistant/cases/${caseId}`)).status(), 200);
  const retained = await ownerPage.request.get(base + "/api/owner/lessons", { headers: { "x-estatelab-owner-token": owner } });
  const publicRecord = (await retained.json()).proposals[0];
  assert.equal(publicRecord.submission, null); assert.equal(publicRecord.status, "approved"); assert.equal(publicRecord.sourceChanged, false);
  db = JSON.parse(await readFile(path.join(dir, "db.json"), "utf8"));
  assert.equal(db.brain.beliefs.filter(row => row.learningProposalId === proposalId).length, 1);
  assert.equal(db.assistant.cases.length, 0);
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id)); assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(errors, []);
  console.log("PASS thesis lock, zero/missing months, preview, private review, consent, adoption, owner-only hypothesis, duplicate approval, conflict recovery, export, restart, deletion and mobile layouts");
} finally {
  await browser?.close(); await stop();
  const resolved = path.resolve(dir);
  assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith("apex-learning-browser-"));
  await rm(resolved, { recursive: true, force: true });
}
