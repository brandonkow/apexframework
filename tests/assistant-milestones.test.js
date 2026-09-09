import test from "node:test";
import assert from "node:assert/strict";
import { newCase, stageTasks, recordTask } from "../investment-assistant.js";
import { changeMilestone, ownershipPlan, planDate, malaysiaDate } from "../assistant-milestones.js";
import { assistantRoutes } from "../assistant-routes.js";
import { frameworkReply, assistantCaseContext } from "../assistant-reasoning.js";

const today = new Date().toISOString().slice(0, 10);
function item() { const record = newCase("user:one"); record.stage = "transaction"; record.selected = { projectName: "SYNTHETIC QA ONLY", facts: [] }; record.tasks = stageTasks(record.stage); return record; }
const plan = (overrides = {}) => ({ responsibility: "lawyer", dueDate: "", dateKind: "target", dependsOn: [], ...overrides });
const schedule = (record, task, value) => changeMilestone(record, { action: "plan", taskId: task.id, plan: value });
const complete = (record, task) => recordTask(record, task.id, { status: "done", note: "Checked the original and recorded this synthetic confirmation.", checkedAt: today });

test("ownership plans retain unknown dates and do not assign or infer deadlines automatically", () => {
  const record = item(), original = structuredClone(record.selected);
  assert.equal(ownershipPlan(record).rows[0].dueDate, "");
  assert.equal(ownershipPlan(record).rows[0].responsibility, "Not assigned");
  schedule(record, record.tasks[0], plan());
  assert.equal(record.tasks[0].plan.dateKind, "unknown");
  assert.deepEqual(record.selected, original);
  assert.equal(record.tasks[0].status, "open");
  assert.equal(record.working, undefined);
});
test("checked dates require explicit confirmation and meaningful reference, targets never become legal dates", () => {
  const record = item(), task = record.tasks[0];
  for (const raw of [plan({ dueDate: "2026-02-30" }), plan({ dueDate: true }), plan({ responsibility: ["lawyer"] }), plan({ dueDate: "2027-01-01", dateKind: "confirmed" }), plan({ dueDate: "2027-01-01", dateKind: "confirmed", confirmDate: true, dateReference: "SPA" })]) assert.throws(() => schedule(record, task, raw));
  schedule(record, task, plan({ dueDate: "2027-01-01", dateKind: "confirmed", confirmDate: true, dateReference: "Lawyer's dated letter referring to the signed agreement." }));
  assert.equal(task.plan.dateKind, "confirmed");
  schedule(record, task, plan({ dueDate: "2027-01-03" }));
  assert.equal(task.planHistory[0].dueDate, "2027-01-01");
  assert.equal(task.plan.dateKind, "target");
  assert.throws(() => planDate("2027-01-01T00:00:00Z"));
});
test("Malaysia date boundaries and overdue ordering are deterministic across stages", () => {
  const now = Date.parse("2026-09-09T17:00:00Z"), record = item();
  assert.equal(malaysiaDate(now), "2026-09-10");
  schedule(record, record.tasks[0], plan({ dueDate: "2026-09-11" }));
  schedule(record, record.tasks[1], plan({ dueDate: "2026-09-10" }));
  const other = stageTasks("handover")[0]; record.tasks.push(other);
  schedule(record, other, plan({ dueDate: "2026-09-09" }));
  const view = ownershipPlan(record, now);
  assert.equal(view.nextId, record.tasks[1].id);
  assert.equal(view.attention[0].id, other.id);
  assert.equal(view.overdueCount, 1);
  assert.equal(view.rows[0].timing, "soon");
  recordTask(record, record.tasks[0].id, { status: "done", note: "Checked after midnight in Malaysia, not a future local date.", checkedAt: "2026-09-10" }, now);
  assert.equal(record.tasks[0].checkedAt, "2026-09-10");
  assert.throws(() => recordTask(record, record.tasks[1].id, { status: "done", note: "Cannot confirm an observation in the future.", checkedAt: "2026-09-11" }, now));
});
test("custom actions are bounded and deduplicated; framework checks cannot be cancelled", () => {
  const record = item();
  const body = { action: "add", stage: "handover", title: "Check all keys", prompt: "Compare handed-over keys against the signed inventory.", plan: plan({ responsibility: "self" }) };
  changeMilestone(record, body); const task = record.tasks.at(-1);
  assert.equal(task.custom, true); assert.ok(task.id.startsWith("handover:"));
  assert.throws(() => changeMilestone(record, body));
  assert.throws(() => recordTask(record, record.tasks[0].id, { status: "cancelled", note: "Unwanted framework check should not be cancellable.", checkedAt: today }));
  recordTask(record, task.id, { status: "cancelled", note: "The parties changed the handover arrangement after review.", checkedAt: today });
  assert.equal(task.status, "cancelled");
  assert.throws(() => schedule(record, task, plan()));
  recordTask(record, task.id, { status: "open" });
  assert.equal(task.history.at(-1).status, "cancelled");
  while (record.tasks.length < 60) record.tasks.push({ id: `review:custom-${record.tasks.length}`, title: "Synthetic filler", status: "open" });
  assert.throws(() => changeMilestone(record, { ...body, title: "Extra action beyond the limit" }));
});
test("dependencies reject foreign IDs and cycles, and reopening invalidates dependent completion transitively", () => {
  const record = item(), [a, b, c] = record.tasks;
  schedule(record, b, plan({ dependsOn: [a.id] })); schedule(record, c, plan({ dependsOn: [b.id] }));
  for (const dependsOn of [[a.id], [c.id], ["other-case:task"], [b.id, b.id], "bad"]) assert.throws(() => schedule(record, a, plan({ dependsOn })));
  assert.throws(() => complete(record, b));
  complete(record, a); complete(record, b); complete(record, c);
  recordTask(record, a.id, { status: "blocked", note: "The lawyer withdrew the earlier confirmation pending another check.", checkedAt: today });
  assert.equal(b.status, "blocked"); assert.equal(c.status, "blocked");
  assert.equal(b.history.at(-1).status, "done"); assert.equal(c.checkedAt, "");
  assert.throws(() => complete(record, c));
  complete(record, a); complete(record, b); complete(record, c);
  assert.equal(ownershipPlan(record).openCount, 0);
});
test("blocked and completed observations retain history and scheduling survives stage changes", () => {
  const record = item(), task = record.tasks[0]; schedule(record, task, plan({ dueDate: "2027-01-01" }));
  recordTask(record, task.id, { status: "blocked", note: "Waiting for the requested original documents to arrive.", checkedAt: today });
  complete(record, task);
  assert.equal(task.history[0].status, "blocked");
  assert.equal(stageTasks("transaction", record.tasks)[0].plan.dueDate, "2027-01-01");
  assert.throws(() => schedule(record, task, plan()));
});
test("milestone context and deadline replies distinguish private records from external execution", () => {
  const record = item(), task = record.tasks[0]; schedule(record, task, plan({ dueDate: "2020-01-01", contactLabel: "My conveyancer" }));
  const db = { listings: [], sources: [] }, reply = frameworkReply("What deadline is next?", record, db);
  assert.match(reply, /overdue/); assert.match(reply, /My conveyancer/); assert.match(reply, /have not contacted anyone/);
  assert.equal(assistantCaseContext(record, db).ownershipPlan.overdueCount, 1);
  assert.equal(assistantCaseContext(record, db).ownershipPlan.rows[0].dateKind, "target");
});
test("post-purchase guidance follows the recorded ownership stage without treating it as verified", () => {
  const record = item(); record.stage = "handover"; record.tasks = stageTasks("handover");
  const data = { listings: [], sources: [] };
  const response = frameworkReply("How should I move forward?", record, data);
  assert.match(response, /at handover/); assert.match(response, /declared progress, not independent confirmation/);
  assert.match(response, /Photograph issues/); assert.match(response, /does not prove that defects/);
  assert.doesNotMatch(response, /keep .* under investigation, not approved for purchase/);
  recordTask(record, record.tasks[0].id, { status: "blocked", note: "The contractor is waiting for the original defect report.", checkedAt: today });
  assert.match(frameworkReply("How should I move forward?", record, data), /Resolve the recorded blocker/);
});
test("milestone API enforces scope, origin and revision, exports plans and never calls the provider", async () => {
  const record = item(); let db = { assistant: { cases: [record], sources: [], listings: [] } }, calls = 0;
  async function request(route, body, { user = "one", origin = "http://localhost", method = "POST" } = {}) {
    let result; const current = structuredClone(db);
    const deps = { req: { method, headers: { host: "localhost", origin } }, res: {}, url: new URL(`http://localhost/api/assistant/cases/${record.id}/${route}`), db: current, actor: { user: { id: user } }, send: (_, status, data) => { result = { status, ...data }; }, readBody: async () => body, readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, llmEnabled: () => true, requestLlmText: () => { calls++; }, reply: () => { calls++; }, allowRequest: () => true };
    try { await assistantRoutes(deps); } catch (error) { result = { status: error.statusCode, error: error.message }; } return result;
  }
  const body = { revision: 0, action: "plan", taskId: record.tasks[0].id, plan: plan({ dueDate: "2027-01-01" }) };
  assert.equal((await request("milestone", body, { user: "two" })).status, 404);
  assert.equal((await request("milestone", body, { origin: "https://evil.example" })).status, 403);
  let result = await request("milestone", body); assert.equal(result.status, 200); assert.equal(result.case.ownershipPlan.rows[0].responsibility, "Lawyer");
  assert.equal((await request("milestone", body)).status, 409);
  result = await request("export", undefined, { method: "GET" });
  assert.equal(result.case.tasks[0].plan.dueDate, "2027-01-01"); assert.equal(result.case.scope, undefined); assert.equal(calls, 0);
});
