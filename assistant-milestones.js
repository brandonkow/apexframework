import { randomUUID } from "node:crypto";
import { STAGES, addEvent, fail, isoNow, text } from "./investment-assistant.js";
import { malaysiaDate, planDate } from "./assistant-calendar.js";
export { malaysiaDate, planDate } from "./assistant-calendar.js";

export const RESPONSIBILITIES = { unassigned: "Not assigned", self: "Me", agent: "Agent", lawyer: "Lawyer", banker: "Banker", management: "Management", contractor: "Contractor", tenant: "Tenant", other: "Other" };
export const ACTION_SUGGESTIONS = {
  site_visit: [["Repeat the visit at a different time", "Record changes in noise, lift waits, traffic and common-area condition during the second physical visit.", "self"], ["Request management records", "Review available fee collection and maintenance records; keep missing documents and unresolved questions explicit.", "management"]],
  transaction: [["Confirm the completion timetable", "Ask the conveyancing professional to identify the applicable written dates, conditions and extension process for this transaction.", "lawyer"], ["Check disbursement readiness", "Obtain written status on outstanding financing documents and conditions; distinguish readiness from funds actually released.", "banker"]],
  handover: [["Follow up a recorded defect", "Compare the dated defect record with the repair response and inspect the result before recording resolution.", "contractor"], ["Confirm utilities and access", "Check actual account transfer or connection status, deposits, keys and access devices against the handover record.", "self"]],
  rental: [["Review the tenancy before expiry", "Check the actual agreement dates, tenant intentions, local achieved rent and required notice with the relevant professional.", "self"], ["Arrange a permitted condition check", "Agree access under the tenancy, record dated condition and repairs, and avoid unannounced entry or automatic messages.", "agent"]],
  review: [["Review actual holding costs", "Compare received rent with the loan, recurring charges, vacancy and repairs for a complete recorded period.", "self"], ["Recheck the exit assumptions", "Review current transactions, competing supply and selling costs against the original thesis before changing the strategy.", "self"]]
};
export function unmetDependencies(item, task) {
  return (task.plan?.dependsOn || []).filter(id => item.tasks.find(value => value.id === id)?.status !== "done");
}
function cleanPlan(item, taskId, raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail("Provide an action plan.");
  if (typeof raw.responsibility !== "string" || !Object.hasOwn(RESPONSIBILITIES, raw.responsibility)) fail("Choose who is responsible, or leave it unassigned.");
  const dueDate = planDate(raw.dueDate), dateKind = dueDate ? raw.dateKind : "unknown", dateReference = text(raw.dateReference, 500);
  if (dueDate && !["target", "confirmed"].includes(dateKind)) fail("Label this as a personal target or a date you checked against a document or professional.");
  if (dateKind === "confirmed" && (raw.confirmDate !== true || dateReference.length < 12)) fail("Confirm the date and record its document or professional reference. Apex does not determine contractual deadlines.");
  const dependsOn = raw.dependsOn ?? [];
  if (!Array.isArray(dependsOn) || dependsOn.length > 8 || dependsOn.some(id => typeof id !== "string" || id === taskId || !item.tasks.some(task => task.id === id)) || new Set(dependsOn).size !== dependsOn.length) fail("Choose up to eight different prerequisite checks from this investigation.");
  function reachesTarget(id, seen = new Set()) {
    if (id === taskId) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return (item.tasks.find(task => task.id === id)?.plan?.dependsOn || []).some(next => reachesTarget(next, seen));
  }
  if (dependsOn.some(id => reachesTarget(id))) fail("These prerequisites form a circular dependency.");
  return { responsibility: raw.responsibility, contactLabel: text(raw.contactLabel, 80), dueDate, dateKind, dateReference: dueDate ? dateReference : "", dependsOn, at: isoNow(), status: "user_declared" };
}
export function changeMilestone(item, body) {
  if (!item.selected) fail("Select a property before planning its ownership actions.");
  if (!["add", "plan"].includes(body.action)) fail("Choose add or plan.");
  let task = item.tasks.find(task => task.id === body.taskId);
  if (body.action === "add") {
    if (!STAGES.slice(1).includes(body.stage)) fail("Choose an ownership stage.");
    const title = text(body.title, 120), prompt = text(body.prompt, 500);
    if (title.length < 4 || prompt.length < 12) fail("Describe the action and what would establish that it is complete.");
    if (item.tasks.length >= 60) fail("Keep this investigation within 60 actions.");
    if (item.tasks.some(task => task.id.startsWith(body.stage + ":") && task.status !== "cancelled" && task.title.toLowerCase() === title.toLowerCase())) fail("That action already exists in this stage.", 409);
    task = { id: `${body.stage}:custom-${randomUUID()}`, title, prompt, custom: true, status: "open", note: "", checkedAt: "", sourceUrl: "" };
  } else {
    if (!task) fail("Action not found in this investigation.", 404);
    if (["done", "cancelled"].includes(task.status)) fail("Reopen the action before changing its plan. The earlier record will remain in its history.");
  }
  const plan = cleanPlan(item, task.id, body.plan);
  if (task.plan) task.planHistory = [...(task.planHistory || []), task.plan].slice(-20);
  task.plan = plan;
  if (body.action === "add") item.tasks.push(task);
  addEvent(item, "milestone", `${task.title}: ${RESPONSIBILITIES[plan.responsibility]}${plan.dueDate ? ` / ${plan.dueDate} (${plan.dateKind})` : " / date unknown"}. A private plan, not a notification or professional instruction.`);
}
export function ownershipPlan(item, now = Date.now()) {
  const today = malaysiaDate(now), week = malaysiaDate(now + 7 * 86400000);
  const rows = item.tasks.map(task => {
    const active = !["done", "cancelled"].includes(task.status), due = task.plan?.dueDate;
    const waitingFor = unmetDependencies(item, task).map(id => ({ id, title: item.tasks.find(value => value.id === id)?.title || "Missing prerequisite" }));
    return { id: task.id, stage: task.id.split(":")[0], title: task.title, status: task.status, responsibility: RESPONSIBILITIES[task.plan?.responsibility] || RESPONSIBILITIES.unassigned, contactLabel: task.plan?.contactLabel || "", dueDate: due || "", dateKind: task.plan?.dateKind || "unknown", timing: !active ? "closed" : !due ? "undated" : due < today ? "overdue" : due === today ? "today" : due <= week ? "soon" : "scheduled", waitingFor, blocked: task.status === "blocked" || waitingFor.length > 0, needsRecheck: task.status === "done" && waitingFor.length > 0 };
  });
  const order = { overdue: 0, today: 1, soon: 2, undated: 3, scheduled: 4, closed: 5 };
  const sorted = rows.slice().sort((a, b) => order[a.timing] - order[b.timing] || (a.dueDate || "9999").localeCompare(b.dueDate || "9999"));
  const next = sorted.find(row => row.stage === item.stage && !["done", "cancelled"].includes(row.status));
  return { asOf: today, timezone: "Asia/Kuala_Lumpur", nextId: next?.id || null, rows, attention: sorted.filter(row => ["overdue", "today"].includes(row.timing) || row.blocked || row.needsRecheck).slice(0, 5), openCount: rows.filter(row => !["done", "cancelled"].includes(row.status)).length, overdueCount: rows.filter(row => row.timing === "overdue").length, boundary: "Private user-declared plans. Dates are not legal determinations. No automatic reminders, calendar entries, payments, bookings or messages." };
}
