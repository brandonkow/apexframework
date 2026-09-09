import { validateJourneyCandidate } from "./journey-engine.js";
import { addEvent, assistantState, fail, isoNow } from "./investment-assistant.js";

const dcfKeys = new Set(["year1Occupancy", "stabilizedOccupancy", "annualRentGrowth", "holdingPeriodYears", "discountRate", "terminalCapRate", "loanToValue", "mortgageInterestRate", "loanTermYears", "otherMonthlyIncome", "marketRentEvidence", "operatingCostEvidence", "discountRateBasis", "terminalCapRateBasis"]);
const compKeys = new Set(["projectName", "transactionDate", "salePrice", "floorArea", "totalAdjustment", "source", "verified", "armsLength", "evidenceType"]);
const object = value => value && typeof value === "object" && !Array.isArray(value);

function fields(raw, allowed, booleans = []) {
  if (!object(raw)) fail("Provide an object of working assumptions.");
  const result = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!allowed.has(key)) fail(`Unrecognised assumption: ${key}.`);
    if (value === null || value === "" || value === undefined) continue;
    if (booleans.includes(key)) {
      if (typeof value !== "boolean") fail(`Use true or false for ${key}.`);
      result[key] = value;
    } else {
      if (!["string", "number"].includes(typeof value) || String(value).length > 1000 || (typeof value === "number" && !Number.isFinite(value))) fail(`Invalid value for ${key}.`);
      result[key] = String(value).trim();
    }
  }
  return result;
}

export function validateWorkingContext(raw) {
  if (!object(raw)) fail("Provide the working property context.");
  for (const scope of ["dealCard", "financialProfile", "evidence", "dcfContext"]) if (raw[scope] !== undefined && !object(raw[scope])) fail(`Invalid ${scope}.`);
  let candidate;
  const adapted = raw.dealCard?.sinkingFund !== undefined ? { ...raw, dealCard: effectiveContext({ selected: { dealCard: raw.dealCard } }).dealCard } : raw;
  try { candidate = validateJourneyCandidate(adapted); }
  catch (error) { fail(error.message); }
  const dcf = raw.dcfContext || {}, { comparables, ...inputs } = dcf;
  candidate.dcfContext = fields(inputs, dcfKeys);
  if (comparables !== undefined) {
    if (!Array.isArray(comparables) || comparables.length > 3) fail("Keep at most three working DCF comparables.");
    candidate.dcfContext.comparables = comparables.map(item => fields(item, compKeys, ["verified", "armsLength"]));
  }
  return candidate;
}

export function effectiveContext(item) {
  if (item.working) {
    const { dealCard = {}, financialProfile = {}, evidence = {}, dcfContext = {} } = item.working;
    return structuredClone({ dealCard, financialProfile, evidence, dcfContext });
  }
  const dealCard = { ...item.selected?.dealCard };
  // Earlier imported snapshots kept these charges separate, while the existing
  // engine's maintenance input means maintenance plus sinking fund.
  if (dealCard.sinkingFund !== undefined) {
    dealCard.maintenance = dealCard.maintenance !== "" && dealCard.sinkingFund !== "" ? String(Number(dealCard.maintenance) + Number(dealCard.sinkingFund)) : "";
    delete dealCard.sinkingFund;
  }
  return { dealCard, financialProfile: {}, evidence: {}, dcfContext: {} };
}

export async function updateWorkingContext(caseId, scope, version, raw, { readDb, writeDb }) {
  if (!Number.isInteger(version) || version < 0) fail("Provide the working-context revision.");
  const values = validateWorkingContext(raw);
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await readDb(), data = assistantState(db);
    const item = data.cases.find(value => value.id === caseId && value.scope === scope);
    if (!item) fail("Investigation not found in this account or guest session.", 404);
    if ((item.working?.revision || 0) !== version) fail("The working assumptions changed elsewhere. Review the saved version before replacing them.", 409);
    const previous = effectiveContext(item);
    if (JSON.stringify(previous) === JSON.stringify(values)) return { item, data };
    const changes = Object.keys(values).filter(key => JSON.stringify(previous[key]) !== JSON.stringify(values[key]));
    item.working = { ...values, revision: version + 1, updatedAt: isoNow(), status: "user_declared" };
    addEvent(item, "assumptions", `Working ${changes.join(", ")} updated. The original source snapshot is unchanged; new inputs are user declarations, not independently verified facts.`);
    try { await writeDb(db); return { item, data }; }
    catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}

export async function deleteInvestigation(caseId, scope, { readDb, writeDb }) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const db = await readDb(), data = assistantState(db);
    data.cases = data.cases.filter(item => item.id !== caseId || item.scope !== scope);
    try { await writeDb(db); return; }
    catch (error) { if (error.name !== "StorageConflictError" || attempt === 5) throw error; }
  }
}
