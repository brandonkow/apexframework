import { randomUUID } from "node:crypto";
import { addEvent, fail, isoNow, message, publicUrl, stageTasks } from "./investment-assistant.js";
import { effectiveContext } from "./assistant-context.js";

function requiredText(value, label) {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 120 || /[\u0000-\u001f\u007f]/.test(value)) fail(`Provide a ${label} between 2 and 120 characters.`);
  return value.trim();
}

export function startPropertyReview(item, input) {
  if (item.selected) fail("This investigation already has a property. Start a new investigation for another one.", 409);
  if (item.profileDraft) fail("Finish or cancel the financial intake before choosing a property.", 409);
  if (["queued", "running"].includes(item.job?.status)) fail("Stop or finish the current search before choosing your own property.", 409);
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("Provide the property you want to review.");
  if (Object.keys(input).some(key => !["projectName", "area", "askingPrice", "sourceUrl"].includes(key))) fail("Supply only the property name, area, optional asking price and optional reference link.");
  const projectName = requiredText(input.projectName, "property name"), area = requiredText(input.area, "micro-area");
  let askingPrice = null;
  if (input.askingPrice !== undefined && input.askingPrice !== null && input.askingPrice !== "") {
    if (!["string", "number"].includes(typeof input.askingPrice) || !/^\d+(?:\.\d{1,2})?$/.test(String(input.askingPrice))) fail("Use a positive RM amount without commas for the asking price, or leave it blank.");
    askingPrice = Number(input.askingPrice);
    if (!Number.isFinite(askingPrice) || askingPrice <= 0 || askingPrice > 1e9) fail("Use a positive asking price no greater than RM1 billion, or leave it blank.");
  }
  const hasUrl = input.sourceUrl !== undefined && input.sourceUrl !== null && input.sourceUrl !== "";
  const sourceUrl = hasUrl ? publicUrl(input.sourceUrl) : "";
  if (hasUrl && (typeof input.sourceUrl !== "string" || input.sourceUrl.length > 1500 || !sourceUrl)) fail("Use a public HTTPS reference link without login credentials, or leave it blank.");
  const dealCard = { projectName, area, ...(askingPrice !== null ? { askingPrice: String(askingPrice) } : {}) };
  const previous = effectiveContext(item), financialBasis = item.working?.financialBasis, at = isoNow();
  const selected = {
    id: `private:${randomUUID()}`, origin: "user_supplied", sourceId: "", sourceUrl,
    projectName, area, askingPrice, availability: "unknown", recordedAt: at, selectedAt: at,
    facts: [], grossYield: null, status: "investigate", dealCard,
    gaps: ["Check completed transactions for comparable units", "Verify achieved rent and all holding costs", "Inspect the unit, building management and competing supply", "Have title, seller authority and financing checked"],
    counterCase: "The property or price may appeal to you, but achieved rent, building quality and the future buyer pool are still unverified. A familiar name is not evidence of value."
  };
  item.selected = selected;
  item.stage = "site_visit";
  item.tasks = stageTasks(item.stage);
  // Property-specific assumptions restart; the separately confirmed financial profile survives.
  item.working = { dealCard: { ...dealCard }, financialProfile: previous.financialProfile, evidence: {}, dcfContext: {}, revision: (item.working?.revision || 0) + 1, updatedAt: at, status: "user_declared" };
  if (financialBasis) item.working.financialBasis = { ...financialBasis };
  message(item, "assistant", `Let's review ${projectName} in ${area}. This is your private starting point, not an owner-published or verified listing.${askingPrice === null ? " The asking price is still unknown." : " The price you entered is an asking-price assumption, not market value."}\n\nThe counter-case: ${selected.counterCase}\n\nNext: bring a recent completed sale from the same project or its closest substitute. The valuation tools can hold the figures you know; missing details stay unresolved.${sourceUrl ? " I have stored your reference link but have not opened or checked it." : ""}`);
  addEvent(item, "private-property", `${projectName} supplied for private investigation. Not published, searched, verified or approved for purchase.`);
  return selected;
}
