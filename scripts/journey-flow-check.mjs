import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { completeCandidate } from "../tests/fixtures/journey-candidate.js";
import { LEVELS } from "../public/journey/levels.js";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const base = process.env.JOURNEY_CHECK_URL || "http://127.0.0.1:3210";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Full-flow fixtures must only be submitted to a local test server.");
const fields = JSON.parse(readFileSync(new URL("../public/journey/fields.json", import.meta.url)));
const full = completeCandidate();
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => {
    if (request.url().endsWith("/api/journey/evaluate")) {
      assert.deepEqual(Object.keys(request.postDataJSON().candidate).sort(), ["dealCard", "evidence", "financialProfile"]);
    }
  });
  // Exercise the same forms without WebGL, including the illustrated fallback.
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return /^webgl/.test(type) ? null : original.call(this, type, ...args);
    };
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector('body[data-ready="true"]');
  assert.equal(await page.locator("body").evaluate(node => node.classList.contains("flat-view")), true);
  const firstId = await page.locator("#candidateSelect").inputValue();
  for (const [index, level] of LEVELS.entries()) {
    await page.locator('[data-action="enter"]').click();
    for (const point of level.checkpoints) {
      for (const key of point.fields) {
        const value = full[fields[key].scope][key];
        if (value === undefined) continue;
        const input = page.locator(`[data-field="${key}"]`);
        if (fields[key].options.length) await input.selectOption(value);
        else await input.fill(value);
      }
      await page.locator('[data-proof="note"]').fill(full.evidence[point.id].note);
      await page.locator('[data-proof="date"]').fill(full.evidence[point.id].date);
      const response = page.waitForResponse(r => r.url().endsWith("/api/journey/evaluate") && r.request().method() === "POST");
      await page.locator('#checkpointForm button[type="submit"]').click();
      assert.equal((await response).status(), 200);
      await page.waitForSelector('#levelPanel[aria-busy="false"]');
      assert.equal(await page.locator("#checkpointError").count(), point === level.checkpoints.at(-1) ? 0 : 1);
    }
    assert.equal(await page.locator("#levelStatus").innerText(), "CLEARED", level.id);
    assert.equal(await page.locator("#levelsPassed").innerText(), String(index + 1).padStart(2, "0"));
    console.log("cleared", index + 1, level.id);
    if (index < 6) await page.locator('[data-action="next"]').click();
  }
  await page.locator('[data-action="report"]').click();
  await page.locator('[data-dialog-action="run-report"]').click();
  await page.waitForSelector(".report-body", { timeout: 100000 });
  assert.match(await page.locator("#dialogContent").innerText(), /SHORTLIST/);
  assert.equal(await page.locator(".report-mode").innerText(), "FRAMEWORK ONLY");
  await page.locator("#dialogClose").click();
  await page.locator('[data-action="report"]').click();
  assert.equal(await page.locator(".report-body").count(), 1, "Reopening a saved report does not consume another report allowance");
  await page.locator("#dialogClose").click();
  await page.locator("#compareButton").click();
  await page.waitForSelector(".compare-card");
  assert.match(await page.locator("#dialogContent").innerText(), /strongest average/);
  await page.locator("#dialogClose").click();
  await page.locator("#assistantButton").click();
  await page.locator("#journeyChatInput").fill("What should I double-check about management before buying this property?");
  await page.locator('#journeyChatForm button[type="submit"]').click();
  await page.waitForSelector(".chat-message:not(.user)", { timeout: 100000 });
  assert.equal(await page.locator(".chat-message:not(.user) small").innerText(), "FRAMEWORK ONLY");
  await page.locator("#dialogClose").click();
  const download = page.waitForEvent("download");
  await page.locator("#exportButton").click();
  assert.match((await download).suggestedFilename(), /apex-journey-.*\.json/);
  await page.locator("#newCandidate").click();
  await page.waitForSelector('#levelPanel[aria-busy="false"]');
  assert.equal(await page.locator("#candidateSelect option").count(), 2);
  assert.equal(await page.locator("#levelsPassed").innerText(), "00");
  await page.locator('[data-action="enter"]').click();
  await page.locator('[data-field="projectName"]').fill("Second isolated candidate");
  await page.locator("#candidateSelect").selectOption(firstId);
  await page.waitForFunction(() => document.querySelector("#levelsPassed").textContent === "07");
  await page.locator('[data-checkpoint="1"]').click();
  await page.locator('[data-field="comparableSource"]').selectOption("");
  assert.equal(await page.locator("#levelsPassed").innerText(), "00");
  assert.equal(await page.locator('[data-level="6"]').getAttribute("aria-disabled"), "true");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector('body[data-ready="true"]');
  assert.equal(await page.locator("#levelsPassed").innerText(), "00");
  await page.locator("#resetButton").click();
  await page.locator('[data-dialog-action="reset"]').click();
  assert.equal(await page.locator("#candidateSelect option").count(), 2);
  await page.locator("#candidateSelect").selectOption({ label: "Second isolated candidate" });
  await page.locator('[data-action="enter"]').click();
  assert.equal(await page.locator('[data-field="projectName"]').inputValue(), "Second isolated candidate");
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}px`);
    assert.equal(await page.locator("#workspaceLink").isVisible(), true);
  }
  assert.deepEqual(errors, []);
  console.log("PASS: all 18 checkpoints, 7 levels, report, chat, comparison, export, isolation, invalidation, reset, fallback and responsive widths.");
} finally { await browser.close(); }
