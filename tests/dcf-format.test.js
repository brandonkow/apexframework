import assert from "node:assert/strict";
import test from "node:test";
import { dcfPercent, dcfDscr } from "../ui/workspace/dcf-format.js";

test("DCF displays unavailable ratios separately from genuine zero values", () => {
  for (const value of [null, undefined, "", false, NaN, Infinity]) {
    assert.equal(dcfPercent(value), "Not available");
    assert.equal(dcfDscr(value), "N/A");
  }
  assert.equal(dcfPercent(0), "0.0%");
  assert.equal(dcfPercent(0.005), "0.5%");
  assert.equal(dcfDscr(0), "0.00x");
  assert.equal(dcfDscr(1.25), "1.25x");
});
