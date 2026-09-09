import { addEvent, fail, isoNow, message } from "./investment-assistant.js";
import { effectiveContext, validateWorkingContext } from "./assistant-context.js";

const FIELDS = [
  { key: "monthlyIncome", label: "Monthly take-home income", max: 1e7, question: "What is your reliable monthly take-home income, after deductions? Leave out uncertain bonuses. You can give an RM amount or say skip." },
  { key: "currentDebt", label: "Existing monthly debt repayments", max: 1e7, question: "How much do you pay each month on existing loans and other debt? I need the monthly repayment, not the outstanding loan balance. Say 0 if none, or skip." },
  { key: "cashAvailable", label: "Cash set aside for this purchase", max: 1e9, question: "How much cash can you set aside for this purchase, including its fees and furnishing, without touching your emergency fund? Do not include money you still need to borrow. An RM amount or skip is fine." },
  { key: "cashReserveMonths", label: "Emergency reserve after purchase (months)", max: 120, question: "After setting aside that purchase cash, how many months of essential household expenses and debt repayments would your emergency fund cover? Include the proposed property's outgoings when known. Give months, not an RM balance, or say skip." }
];
const keys = FIELDS.map(field => field.key);
const amount = "(?:RM\\s*)?(?:\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.\\d{1,2})?\\s*(?:k|m)?";
const aliases = [
  "(?:monthly\\s+)?(?:net(?:\\s+(?:monthly|salary))?|take[- ]?home)(?:\\s+income|\\s+pay)?",
  "(?:(?:existing|monthly)\\s+)?(?:debt\\s+repayments?|loan\\s+repayments?|monthly\\s+repayments?)",
  "(?:purchase\\s+cash|cash\\s+(?:available|set\\s+aside)\\s+for\\s+(?:the\\s+|this\\s+)?purchase)",
  "(?:(?:emergency|cash)\\s+)?reserve"
];

export const profileActive = item => Boolean(item.profileDraft);
export const requestsProfile = content => /^(?:please\s+)?(?:check (?:my )?(?:buying power|affordability)|help me (?:check|understand) (?:my )?(?:buying power|affordability)|(?:start|update) (?:my )?financial profile)[.!?]*$/i.test(content.trim());
const nextField = draft => FIELDS.find(field => !Object.hasOwn(draft.answers, field.key));

function numberFrom(value, field) {
  if (field.key === "cashReserveMonths" && /^RM/i.test(value.trim())) return null;
  const clean = value.trim().replace(/^RM\s*/i, "").replaceAll(",", "").replace(/\s+/g, "");
  const suffix = clean.match(/[km]$/i)?.[0]?.toLowerCase();
  if (field.key === "cashReserveMonths" && suffix) return null;
  const number = Number(clean.replace(/[km]$/i, "")) * (suffix === "k" ? 1000 : suffix === "m" ? 1e6 : 1);
  return Number.isFinite(number) && number >= 0 && number <= field.max ? String(Math.round(number * 100) / 100) : null;
}

export function profileView(item) {
  const draft = item.profileDraft;
  if (!draft) return null;
  const next = nextField(draft);
  return {
    pending: next?.key || "", question: next?.question || "Review these figures before saving. They are your declarations, not verified buying power.",
    answered: Object.keys(draft.answers).length,
    stale: draft.baseRevision !== (item.working?.revision || 0),
    canConfirm: !next && Object.values(draft.answers).some(value => value !== null),
    rows: FIELDS.map(field => ({ key: field.key, label: field.label, value: draft.answers[field.key] ?? null, state: !Object.hasOwn(draft.answers, field.key) ? "pending" : draft.answers[field.key] === null ? "skipped" : "declared" }))
  };
}

export function startProfile(item) {
  if (item.profileDraft) fail("A financial conversation is already open. Continue it, cancel it, or explicitly restart it.");
  item.profileDraft = { answers: {}, baseRevision: item.working?.revision || 0, startedAt: isoNow() };
  message(item, "assistant", `Let's work through four essentials. Your saved profile stays unchanged until you confirm. Skipped fields will be saved as unknown, not zero; other preferences stay as they are. Don't share identity documents or account numbers here.\n\n${FIELDS[0].question}`);
  addEvent(item, "profile", "Private financial intake started; saved assumptions unchanged.");
}

export function profileAction(item, action) {
  if (action === "start") { startProfile(item); return; }
  if (!item.profileDraft) fail("Start a financial conversation first.");
  if (action === "cancel" || action === "restart") {
    delete item.profileDraft;
    if (action === "restart") { startProfile(item); return; }
    message(item, "assistant", "Financial intake cancelled. Your saved profile is unchanged. Submitted messages remain in this private conversation; delete the investigation to remove them.");
    addEvent(item, "profile", "Financial intake cancelled without changing the saved profile.");
    return;
  }
  if (action === "skip") { answerProfile(item, "skip"); return; }
  if (action !== "confirm") fail("Choose a valid financial-intake action.");
  const view = profileView(item);
  if (view.stale) fail("Working inputs changed since this financial conversation began. Your draft is retained. Restart from the current saved version before confirming.", 409);
  if (!view.canConfirm) fail("Answer or skip each question and provide at least one figure before confirming.");
  const working = effectiveContext(item), profile = { ...working.financialProfile };
  for (const key of keys) {
    delete profile[key];
    if (item.profileDraft.answers[key] !== null) profile[key] = item.profileDraft.answers[key];
  }
  const confirmedAt = isoNow();
  item.working = { ...validateWorkingContext({ ...working, financialProfile: profile }), revision: (item.working?.revision || 0) + 1, updatedAt: confirmedAt, status: "user_declared",
    financialBasis: { ...(profile.monthlyIncome !== undefined ? { monthlyIncome: "net_declared" } : {}), ...(profile.cashReserveMonths !== undefined ? { cashReserveMonths: "essential_expenses_declared" } : {}), confirmedAt }
  };
  delete item.profileDraft;
  message(item, "assistant", "Saved. The assistant and property tools now use these confirmed inputs. They are still self-reported, and I have not raised your search ceiling or approved a loan. Next, we need a property's full costs and proposed instalment to test whether you can hold it through a weaker rental period.");
  addEvent(item, "profile", "User confirmed the financial inputs. Skipped fields remain unknown; search ceiling and source evidence unchanged.");
}

export function answerProfile(item, content) {
  const draft = item.profileDraft;
  if (!draft) return false;
  const clean = content.trim(), next = nextField(draft);
  if (/^(?:cancel|stop)(?: (?:the |this |my )?(?:financial )?(?:intake|profile|questions))?[.!]?$/i.test(clean)) { profileAction(item, "cancel"); return true; }
  if (/^(?:why(?: do you (?:ask|need (?:this|that)))?|what (?:does (?:this|that) mean|is take[- ]?home income)|help)[.!?]?$/i.test(clean)) {
    message(item, "assistant", `These figures help separate your search budget from the cash and monthly commitments you can actually carry. Take-home income is what remains after deductions. The reserve is money left for essential expenses, not money also allocated to the purchase. You can skip any answer; I will keep it unknown.\n\n${profileView(item).question}`);
    addEvent(item, "profile", "Financial-input meaning explained without changing the draft.");
    return true;
  }
  const zeroPhrases = { monthlyIncome: /^(?:I have )?no (?:income|salary)[.!]?$/i, currentDebt: /^(?:I have )?no (?:debt|loans?|repayments?)[.!]?$/i, cashAvailable: /^(?:I have )?no (?:purchase )?cash[.!]?$/i, cashReserveMonths: /^(?:I have )?no (?:emergency )?(?:fund|reserve)[.!]?$/i };
  if (/^(?:skip|not sure|unknown|prefer not to say)[.!]?$/i.test(clean)) {
    if (next) draft.answers[next.key] = null;
  } else if (next && zeroPhrases[next.key].test(clean)) {
    draft.answers[next.key] = "0";
  } else {
    const parts = clean.split(/\n|;|,(?!\d)/).map(part => part.trim()).filter(Boolean), found = {}, issues = [];
    let allLabelled = true;
    for (const part of parts) {
      const index = aliases.findIndex(alias => new RegExp(`^(?:my\\s+)?${alias}\\b`, "i").test(part));
      if (index < 0) { allLabelled = false; continue; }
      const field = FIELDS[index];
      const units = index === 3 ? "\\s*months?" : "(?:\\s*(?:per month|a month|monthly|/month))?";
      const match = part.match(new RegExp(`^(?:my\\s+)?${aliases[index]}\\s*(?::|=|is)?\\s*(${amount})${units}[.]?$`, "i"));
      const value = match ? numberFrom(match[1], field) : null;
      if (value === null || Object.hasOwn(found, field.key)) issues.push(field.label);
      else found[field.key] = value;
    }
    if (!allLabelled && parts.length === 1 && next && !Object.keys(found).length && !issues.length) {
      const suffix = next.key === "cashReserveMonths" ? "(?:\\s*months?)?" : "(?:\\s*(?:per month|a month|monthly|/month))?";
      const match = clean.match(new RegExp(`^(${amount})${suffix}[.]?$`, "i"));
      const value = match && !(next.key === "cashReserveMonths" && /^RM/i.test(match[1])) ? numberFrom(match[1], next) : null;
      if (value !== null) { found[next.key] = value; allLabelled = true; }
    }
    if (!allLabelled || issues.length || !Object.keys(found).length) {
      message(item, "assistant", `I haven't changed your draft from that message. I need one clear amount, not a range, annual total or gross salary. You can answer one question at a time, or label several figures as net income, debt repayments, purchase cash and reserve (months), separated by semicolons.\n\n${profileView(item).question}`);
      addEvent(item, "profile", "Ambiguous financial input left uncommitted.");
      return true;
    }
    Object.assign(draft.answers, found);
  }
  message(item, "assistant", profileView(item).question);
  addEvent(item, "profile", "Financial draft updated; explicit confirmation still required.");
  return true;
}
