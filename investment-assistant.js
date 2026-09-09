import { createHash, randomUUID } from "node:crypto";

export const isoNow = () => new Date().toISOString();
export const text = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";
const amount = (value, max = 1e9) => (typeof value !== "number" && typeof value !== "string") || String(value).trim() === "" ? null : Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= max ? Number(value) : null;
const key = value => text(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const fingerprint = value => createHash("sha256").update(value).digest("hex").slice(0, 24);
export function fail(message, statusCode = 400) { throw Object.assign(new Error(message), { statusCode }); }
export function pastDate(value, now = Date.now()) {
  const valueText = text(value, 40);
  const stamp = Date.parse(valueText);
  return Number.isFinite(stamp) && stamp <= now && stamp >= Date.UTC(1990, 0, 1) && new Date(stamp).toISOString().slice(0, 10) === valueText.slice(0, 10) ? new Date(stamp).toISOString() : "";
}
export function publicUrl(value) {
  try {
    const url = new URL(text(value, 1500));
    if (url.protocol !== "https:" || url.username || url.password || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|\[|172\.(1[6-9]|2\d|3[01])\.)/i.test(url.hostname)) return "";
    url.hash = "";
    return url.href;
  } catch { return ""; }
}
export function assistantState(db) {
  db.assistant ||= { version: 1, sources: [], listings: [], cases: [] };
  for (const name of ["sources", "listings", "cases"]) if (!Array.isArray(db.assistant[name])) db.assistant[name] = [];
  return db.assistant;
}

export const GOALS = ["rental_income", "appreciation", "own_stay", "balanced"];
export const TYPES = ["condo", "serviced_apartment", "landed", "any"];
export function cleanBrief(raw = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) raw = {};
  return {
    area: text(raw.area, 120), goal: GOALS.includes(raw.goal) ? raw.goal : "",
    budgetMax: amount(raw.budgetMax), propertyType: TYPES.includes(raw.propertyType) ? raw.propertyType : "any",
    bedroomsMin: amount(raw.bedroomsMin, 20), notes: text(raw.notes, 1000)
  };
}
export function briefQuestion(brief) {
  if (!brief.area) return "Where would you like me to look? A town or neighbourhood is enough to start.";
  if (!brief.goal) return "What should this property do for you: rental income, appreciation, your own home, or a balance?";
  if (!brief.budgetMax) return "What purchase-price ceiling should I use? This sets the search range, not a conclusion about what you can afford.";
  return "Review the search brief below. I will compare available evidence, explain the trade-offs, and leave unverified claims unresolved.";
}
export function interpretBrief(message, previous = {}, pending = "") {
  const brief = cleanBrief(previous), lower = message.toLowerCase();
  // Without a model, do not silently reinterpret negated preferences as positive ones.
  if (/\b(?:not|don't|do not|avoid|except|excluding)\b/i.test(message)) return brief;
  const places = ["Bayan Lepas", "Bayan Baru", "Tanjung Tokong", "Tanjung Bungah", "George Town", "Georgetown", "Butterworth", "Bukit Mertajam", "Penang", "Kuala Lumpur", "Selangor", "Petaling Jaya", "Shah Alam", "Subang Jaya", "Cyberjaya", "Klang", "Puchong", "Cheras"];
  const place = places.find(place => lower.includes(place.toLowerCase()));
  if (place) brief.area = place;
  else if (pending === "area" && message.length <= 80 && message.split(/\s+/).length <= 6 && !/[?]/.test(message) && !/\b(hi|hello|hey|help|thanks|thank|morning|evening|afternoon|salam|i|want|need|looking|find|buy|invest|property|properties|not|don't)\b/i.test(message)) brief.area = message;
  if (/own.?stay|my own home|live in|for myself/.test(lower)) brief.goal = "own_stay";
  else if (/balanc|both rent.*appreciat/.test(lower)) brief.goal = "balanced";
  else if (/appreciat|capital growth/.test(lower)) brief.goal = "appreciation";
  else if (/rent|cash.?flow|income/.test(lower)) brief.goal = "rental_income";
  const price = lower.match(/(?:budget\s*(?:is|of|:)?|purchase price\s*(?:is|of|:)?|below|under|up to|ceiling\s*(?:is|of|:)?)\s*(?:rm\s*)?([\d,]+(?:\.\d+)?)\s*(k|m|million)?\b/) || (pending === "budgetMax" ? lower.match(/^\s*(?:rm\s*)?([\d,]+(?:\.\d+)?)\s*(k|m|million)?\s*$/) : null);
  const amountContext = price ? lower.slice(0, price.index) : "";
  const nonPurchaseAmount = /(?:rent|rental|salary|income|cash reserve|savings|furnishing|renovation|repayment|instalment|installment)(?:\s+(?:is|of|a|my|monthly|total)){0,3}\s*$/.test(amountContext);
  if (price && !nonPurchaseAmount) brief.budgetMax = amount(Number(price[1].replaceAll(",", "")) * (price[2] === "k" ? 1000 : ["m", "million"].includes(price[2]) ? 1e6 : 1));
  if (/serviced? apart|serviced? residen/.test(lower)) brief.propertyType = "serviced_apartment";
  else if (/condo/.test(lower)) brief.propertyType = "condo";
  else if (/landed|terrace|bungalow/.test(lower)) brief.propertyType = "landed";
  const beds = lower.match(/(\d+)\s*(?:bed|br\b)/);
  if (beds) brief.bedroomsMin = amount(beds[1], 20);
  return brief;
}
export const BRIEF_SCHEMA = {
  type: "object", additionalProperties: false, required: ["area", "goal", "budgetMax", "propertyType", "bedroomsMin", "notes"],
  properties: {
    area: { type: "string" }, goal: { type: "string", enum: ["", ...GOALS] }, budgetMax: { type: ["number", "null"] },
    propertyType: { type: "string", enum: TYPES }, bedroomsMin: { type: ["number", "null"] }, notes: { type: "string" }
  }
};

export function validBriefResponse(value) {
  try {
    const parsed = JSON.parse(value), keys = Object.keys(BRIEF_SCHEMA.properties);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      && Object.keys(parsed).length === keys.length && keys.every(k => Object.hasOwn(parsed, k))
      && typeof parsed.area === "string" && parsed.area.length <= 120
      && ["", ...GOALS].includes(parsed.goal) && TYPES.includes(parsed.propertyType)
      && (parsed.budgetMax === null || (typeof parsed.budgetMax === "number" && parsed.budgetMax > 0 && parsed.budgetMax <= 1e9))
      && (parsed.bedroomsMin === null || (Number.isInteger(parsed.bedroomsMin) && parsed.bedroomsMin >= 0 && parsed.bedroomsMin <= 20))
      && typeof parsed.notes === "string" && parsed.notes.length <= 1000;
  } catch { return false; }
}

export function validateImport(body, now = Date.now()) {
  if (body?.version !== 1 || !Array.isArray(body.listings) || body.listings.length > 2000) fail("Use a version 1 catalogue containing at most 2,000 listings.");
  const raw = body.source || {};
  if (raw.publish !== true || !["licensed", "owner_authorized", "public_reuse"].includes(raw.permission) || text(raw.permissionReference).length < 12) fail("Confirm permission to publish these records and supply the permission reference. Importing is not proof of licensing.");
  if (!/^[a-z0-9_-]{3,60}$/.test(raw.id || "") || !text(raw.name)) fail("A source needs a stable lowercase ID and a name.");
  const source = { id: raw.id, name: text(raw.name, 160), permission: raw.permission, permissionReference: text(raw.permissionReference, 1000), publish: true, importedAt: new Date(now).toISOString(), coverage: text(raw.coverage, 240) };
  const seen = new Set();
  const listings = body.listings.map((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(`Listing ${index + 1} must be an object.`);
    const sourceUrl = publicUrl(raw.sourceUrl), observedAt = pastDate(raw.observedAt, now);
    if (!text(raw.id) || !text(raw.projectName) || !text(raw.area) || !text(raw.state) || !TYPES.slice(0, -1).includes(raw.propertyType) || !sourceUrl || !observedAt || !amount(raw.askingPrice)) fail(`Listing ${index + 1}: provide ID, project, area, state, residential type, positive asking price, HTTPS source and a valid past date.`);
    if (seen.has(raw.id)) fail(`Listing ${index + 1}: duplicate source listing ID.`);
    seen.add(raw.id);
    const id = `${source.id}:${text(raw.id, 100)}`;
    if (raw.facts !== undefined && !Array.isArray(raw.facts)) fail(`Listing ${index + 1}: facts must be an array.`);
    const facts = (raw.facts || []).slice(0, 40).map(fact => {
      if (!fact || typeof fact !== "object") fail(`Listing ${index + 1}: invalid fact.`);
      if (!["transaction", "signed_rent", "advertised_rent", "maintenance", "sinking_fund", "management", "unit_position", "supply", "title"].includes(fact.kind) || !pastDate(fact.observedAt, now) || !publicUrl(fact.sourceUrl) || !text(fact.description, 600)) fail(`Listing ${index + 1}: every fact needs a recognised evidence kind, description, source and past date.`);
      return { id: fingerprint(`${id}|${fact.kind}|${fact.sourceUrl}|${fact.observedAt}`), kind: fact.kind, value: amount(fact.value), description: text(fact.description, 600), sourceUrl: publicUrl(fact.sourceUrl), observedAt: pastDate(fact.observedAt, now), verification: fact.verification === "owner_checked" ? "owner_checked" : "source_claim", unitSpecific: fact.unitSpecific === true, adverse: fact.adverse === true };
    });
    return { id, sourceId: source.id, projectName: text(raw.projectName, 160), area: text(raw.area, 120), state: text(raw.state, 80), propertyType: raw.propertyType, askingPrice: amount(raw.askingPrice), bedrooms: amount(raw.bedrooms, 20), sizeSqft: amount(raw.sizeSqft, 1e6), unitKey: text(raw.unitKey, 80), tenure: text(raw.tenure, 100), sourceUrl, observedAt, availability: ["available", "withdrawn", "unknown"].includes(raw.availability) ? raw.availability : "unknown", facts, importedAt: source.importedAt };
  });
  return { source, listings };
}
const ageDays = (date, now) => (now - Date.parse(date)) / 86400000;
export function catalogueCoverage(catalogue, now = Date.now()) {
  const sources = catalogue.sources.filter(source => source.publish);
  const ids = new Set(sources.map(source => source.id));
  const listings = catalogue.listings.filter(item => ids.has(item.sourceId));
  return { sources: sources.map(({ id, name, coverage, importedAt }) => ({ id, name, coverage, importedAt })), records: listings.length, current: listings.filter(item => item.availability === "available" && ageDays(item.observedAt, now) <= 30).length, limit: "Only owner-published sources are searched. Asking prices and source claims are not completed transactions or independent verification." };
}
export function discover(brief, catalogue, analyze, now = Date.now()) {
  const coverage = catalogueCoverage(catalogue, now), allowed = new Set(coverage.sources.map(source => source.id));
  const excluded = { stale: 0, unavailable: 0, outsideBrief: 0, duplicate: 0, adverse: 0 };
  const seen = new Set(), candidates = [];
  const searchArea = key(key(brief.area) === "kl" ? "Kuala Lumpur" : brief.area);
  const available = catalogue.listings.filter(listing => allowed.has(listing.sourceId));
  const identityFor = listing => listing.unitKey ? key(`${listing.projectName}|${listing.area}|${listing.unitKey}`) : listing.sourceUrl;
  const relatedByIdentity = new Map();
  for (const listing of available) {
    const identity = identityFor(listing);
    if (!relatedByIdentity.has(identity)) relatedByIdentity.set(identity, []);
    relatedByIdentity.get(identity).push(listing);
  }
  for (const listing of available.slice().sort((a, b) => b.observedAt.localeCompare(a.observedAt))) {
    if (!allowed.has(listing.sourceId)) continue;
    if (ageDays(listing.observedAt, now) > 30) { excluded.stale++; continue; }
    if (listing.availability !== "available") { excluded.unavailable++; continue; }
    if (!key(`${listing.area} ${listing.state} ${listing.projectName}`).includes(searchArea) || listing.askingPrice > brief.budgetMax || (brief.propertyType !== "any" && listing.propertyType !== brief.propertyType) || (brief.bedroomsMin && (listing.bedrooms == null || listing.bedrooms < brief.bedroomsMin))) { excluded.outsideBrief++; continue; }
    // Known unit identity permits cross-source deduplication; similar layouts alone do not.
    const identity = identityFor(listing);
    if (seen.has(identity)) { excluded.duplicate++; continue; }
    seen.add(identity);
    const fresh = listing.facts.filter(fact => ageDays(fact.observedAt, now) <= (fact.kind === "transaction" ? 180 : 90));
    const related = relatedByIdentity.get(identity);
    if (related.some(other => other.availability === "withdrawn" && other.observedAt >= listing.observedAt)) { excluded.unavailable++; continue; }
    if (related.some(other => other.facts.some(fact => ageDays(fact.observedAt, now) <= 90 && fact.adverse && ["management", "title", "unit_position"].includes(fact.kind)))) { excluded.adverse++; continue; }
    const rent = fresh.find(fact => fact.kind === "signed_rent" && fact.verification === "owner_checked" && fact.unitSpecific && fact.value > 0);
    const maintenance = fresh.find(fact => fact.kind === "maintenance" && fact.value != null);
    const sinking = fresh.find(fact => fact.kind === "sinking_fund" && fact.value != null);
    const dealCard = { projectName: listing.projectName, area: listing.area, propertyType: listing.propertyType === "condo" ? "Condo" : listing.propertyType === "landed" ? "Landed" : "Serviced apartment", askingPrice: String(listing.askingPrice), floorArea: listing.sizeSqft ? String(listing.sizeSqft) : "", tenure: listing.tenure, expectedRent: rent ? String(rent.value) : "", maintenance: maintenance && sinking ? String(maintenance.value + sinking.value) : "" };
    const gaps = ["Confirm your financing capacity and cash reserve", "Visit the actual unit and verify management, layout and condition", "Review unit-level title and transactionability with a qualified professional"];
    if (new Set(related.filter(other => ageDays(other.observedAt, now) <= 30).map(other => other.askingPrice)).size > 1) gaps.unshift("Different current asking prices exist for this unit. Confirm the live offer before comparing value");
    if (!rent) gaps.unshift("Obtain current, achieved rent for a comparable unit; advertised rent is not proof");
    if (!fresh.some(fact => fact.kind === "transaction" && fact.verification === "owner_checked")) gaps.unshift("Check recent completed transactions and adjust for this unit");
    if (!maintenance || !sinking) gaps.push("Confirm maintenance, sinking fund and other holding costs");
    const grossYield = rent ? Math.round(rent.value * 12 / listing.askingPrice * 10000) / 100 : null;
    const fit = Math.min(100, 40 + new Set(fresh.filter(fact => fact.verification === "owner_checked").map(fact => fact.kind)).size * 5 + (listing.bedrooms != null ? 5 : 0) + (rent ? 10 : 0));
    candidates.push({ ...listing, dealCard, grossYield, fit, status: "investigate", reasons: [`Within your RM${brief.budgetMax.toLocaleString("en-MY")} search ceiling`, `Matches ${brief.area}${brief.propertyType === "any" ? "" : ` and ${brief.propertyType.replaceAll("_", " ")}`}`, rent ? "A current, unit-specific rent record was marked checked by the owner" : "Rent still needs verification"], counterCase: "The price fits your search, but unknown building quality, total costs or weak resale demand could overturn the case. A cheaper listing is not necessarily better value.", gaps });
  }
  candidates.sort((a, b) => b.fit - a.fit || a.id.localeCompare(b.id));
  for (const candidate of candidates.slice(0, 3)) {
    const assessment = analyze(candidate.dealCard, {});
    candidate.framework = { verdict: assessment.verdict, hardStops: assessment.hardStops || [], dimensions: assessment.dimensions || [] };
  }
  return { at: new Date(now).toISOString(), coverage, excluded, totalMatches: candidates.length, candidates: candidates.slice(0, 3), message: !coverage.records ? "No published listing coverage is available yet. I cannot name opportunities without sources." : !candidates.length ? "None of the current published listings cleared this search. I have not lowered your criteria to force a match." : `I found ${candidates.length} candidate${candidates.length === 1 ? "" : "s"} within the published coverage. These are leads to investigate, not buy recommendations.`, rankingBasis: "Evidence completeness among matching listings, not promised return or a valuation. Unknowns remain unresolved." };
}

export const STAGES = ["discovery", "site_visit", "transaction", "handover", "rental", "review"];
const TASKS = {
  site_visit: [["unit", "Walk through the actual unit", "Check layout, refuse-room/lift position, leakage, noise and view. Record observations, not brochure promises."], ["management", "Test management and the shared spaces", "Ask about arrears and maintenance, observe lifts and security, and visit at a different time of day."], ["comparables", "Verify the price and achieved rent", "Keep asking prices, completed transactions and signed rent separate; record dated sources."]],
  transaction: [["lawyer", "Have the title and seller checked", "A qualified conveyancing professional should confirm title, restrictions, encumbrances and ability to transfer."], ["finance", "Confirm financing and cash reserves", "Use the written offer and all-in costs. Bank approval does not establish investment suitability."], ["milestones", "Record contractual deadlines", "Confirm dates with your lawyer. Apex cannot infer binding deadlines from general practice."]],
  handover: [["defects", "Inspect and record defects", "Photograph issues, dates and responsibility; confirm the applicable notice process with the relevant professional."], ["utilities", "Plan utilities and furnishing", "Obtain actual deposits and quotes. Set a tenant-led budget before spending."], ["inventory", "Record the condition and inventory", "Keep a dated condition record before occupation or tenancy."]],
  rental: [["tenant", "Screen the proposed tenancy", "Use consistent identity, affordability, reference and behaviour checks. Do not infer reliability from nationality or income group."], ["agreement", "Review the tenancy and inventory", "Have obligations, deposits, access and remedies checked. Nothing is signed or sent automatically."], ["cashflow", "Record the actual monthly outcome", "Record rent received, vacancy, repairs and all holding costs. Compare outcomes with the original thesis."]],
  review: [["thesis", "Revisit the original investment thesis", "Compare expected and actual rent, costs, condition and liquidity. Profit alone does not prove a sound decision."], ["alternatives", "Compare holding, selling and refinancing", "Recheck evidence and costs. Appreciation and a successful refinance are not guaranteed."], ["lesson", "Propose a lesson for review", "Keep the observation and contrary evidence. Your private lesson does not rewrite the founder framework."]]
};
export function stageTasks(stage, previous = []) {
  return (TASKS[stage] || []).map(([id, title, prompt]) => ({ id: `${stage}:${id}`, title, prompt, status: "open", note: "", checkedAt: "", sourceUrl: "", ...previous.find(task => task.id === `${stage}:${id}`) }));
}
export function newCase(scope) {
  return { id: randomUUID(), scope, revision: 0, createdAt: isoNow(), updatedAt: isoNow(), brief: cleanBrief(), confirmedAt: "", messages: [], stage: "discovery", tasks: [], results: null, selected: null, job: null, events: [], outcomes: [], evidence: [] };
}
export function publicCase(item) {
  const { scope, ...result } = item;
  return result;
}

export function selectedSourceStatus(item, data, now = Date.now()) {
  if (!item.selected) return null;
  const selected = item.selected;
  const current = data.listings.find(listing => listing.id === selected.id);
  const source = data.sources.find(source => source.id === selected.sourceId && source.publish);
  const allowed = new Set(data.sources.filter(source => source.publish).map(source => source.id));
  const sameUnit = listing => selected.unitKey ? key(`${listing.projectName}|${listing.area}|${listing.unitKey}`) === key(`${selected.projectName}|${selected.area}|${selected.unitKey}`) : listing.sourceUrl === selected.sourceUrl;
  const conflicting = data.listings.filter(listing => allowed.has(listing.sourceId) && sameUnit(listing)).some(listing =>
    (listing.availability === "withdrawn" && listing.observedAt >= selected.observedAt)
    || listing.facts.some(fact => fact.adverse && ["management", "title", "unit_position"].includes(fact.kind) && ageDays(fact.observedAt, now) <= 90));
  let status = "current", note = "The listing remains current in the published catalogue. Availability and price still need confirmation; this is not purchase approval.";
  if (!source || !current || current.availability !== "available") {
    status = "unavailable";
    note = "The selected listing is no longer available in the published catalogue. Your investigation is retained as history; recheck the source before proceeding.";
  } else if (conflicting) {
    status = "recheck";
    note = "A published record for this unit reports a withdrawal or adverse title, management or unit-position evidence. Resolve that conflict before proceeding.";
  } else if (ageDays(current.observedAt, now) > 30) {
    status = "recheck";
    note = "The selected listing has passed the 30-day discovery freshness window. Obtain a current source before relying on its price or availability.";
  } else if (current.askingPrice !== selected.askingPrice || JSON.stringify(current.facts) !== JSON.stringify(selected.facts)) {
    status = "recheck";
    note = "The published price or evidence has changed since selection. Your original snapshot is preserved; review the current source before committing.";
  }
  return { status, note, checkedAt: new Date(now).toISOString() };
}
export function addEvent(item, type, description) {
  item.events = [...item.events, { id: randomUUID(), type, description: text(description, 1000), at: isoNow() }].slice(-150);
  item.revision++; item.updatedAt = isoNow();
}
export function message(item, role, content, mode = "framework") {
  item.messages = [...item.messages, { id: randomUUID(), role, content: text(content, 3500), mode, at: isoNow() }].slice(-40);
}
export function recordTask(item, taskId, input) {
  const task = item.tasks.find(task => task.id === taskId);
  if (!task) fail("Task not found.", 404);
  if (!["open", "done"].includes(input.status)) fail("Task status must be open or done.");
  const note = text(input.note, 1500), checkedAt = pastDate(input.checkedAt);
  if (input.status === "done" && (note.length < 12 || !checkedAt)) fail("Record what was checked and a valid past date. Completion is your declaration, not independent verification.");
  Object.assign(task, { status: input.status, note, checkedAt, sourceUrl: publicUrl(input.sourceUrl) });
  addEvent(item, "task", `${task.title}: ${task.status}. ${note}`);
}
