# Continuing ownership action plan

The assistant's existing stage checks are now the action plan. There is no second task database or separate dashboard. The next action stays visible; responsibilities, dates, prerequisites and history expand only when needed. The original framework documents and founder answers are unchanged.

## What is recorded

- Core site, transaction, handover, tenancy and holding-review checks keep their IDs and evidence requirements. Existing records load without a migration; missing plans mean unassigned and undated.
- A user may record a responsible role and optional private label. Assignment is a private declaration, not an instruction sent to that person.
- Dates remain unknown until entered. A personal planning target is distinct from a date the user checked against a document or professional. Checked dates require an explicit confirmation and meaningful reference on every save. Apex never calculates a contractual deadline from customary periods or changes it because a later stage was selected.
- Date-only plans use Asia/Kuala_Lumpur. Overdue means an open action has a recorded date before today's Malaysian date, not proof of contractual default. The response includes its `asOf` date; reload or another request refreshes it. There is no reminder scheduler or external calendar synchronization.
- Users can add a custom action to any ownership stage, with a title and a description of what would establish completion. A case holds at most 60 total actions. Exact active title duplicates within a stage are rejected.
- Open, blocked, completed and cancelled records require appropriate evidence or reasons. Only custom actions can be cancelled. A core framework check stays unresolved rather than disappearing because it is inconvenient.

## Dependencies and changes

Up to eight prerequisite checks may be selected from the same investigation. Unknown IDs, self-dependencies, duplicates and cycles are rejected. Cancellation of a prerequisite does not satisfy it. A dependent action cannot be recorded complete until its prerequisites are complete or the user explicitly revises the plan.

Reopening, blocking or cancelling a prerequisite invalidates completed dependent actions transitively. Their earlier observations remain in history; they become blocked pending another review. Completing the prerequisite again does not silently re-complete them. Completed or cancelled actions must be reopened before their plans can change. Stage changes retain prior plans, custom actions and unresolved checks; they do not confer investment or legal approval.

Each task retains up to 20 earlier check records and 20 prior plans, in addition to the case's bounded event history. These are operational records, not an immutable legal audit archive. Export important records and original documents separately.

## Assistant and interface

The next current-stage action is selected deterministically by timing, not model guesswork. Overdue, due-today and blocked actions from other stages appear in a compact attention list. The action list can be filtered by stage. Only one action editor is shown at a time; users can choose another action without changing ownership stage. Optional stage-specific suggestions populate an empty draft only, with no invented dates and no save until confirmed.

The model receives the active case's plan, dates, waiting checks and explicit execution limits. Framework-only deadline questions use the same records and disclose that no professional has been contacted. A planner action never calls an AI provider or changes financial assumptions, listing facts or the shared knowledge base.

Unsent action and planning drafts remain in the current browser view while switching actions or handling unrelated chat changes. A concurrent task change preserves the draft but requires explicit review against the latest record. Reusing the draft resets date confirmation. A page reload, investigation switch or account change clears unsent drafts. Only a successful save is durable, subject to the configured database.

## API and verification

`POST /api/assistant/cases/:id/milestone` accepts `action: add` or `plan`, an expected case `revision` and a validated `plan`. `POST .../task` records progress. Both use the existing scope, origin and stale-write guards. API responses derive `ownershipPlan`; callers cannot forge its due-status calculation. Export, explicit guest adoption and deletion reuse the case lifecycle.

Tests cover unknown dates, confirmed-date consent, Malaysia midnight, malformed inputs, scope, source preservation, bounded custom tasks, dependency cycles, transitive reopening, history, model context and no provider calls. `node scripts/milestone-browser-check.mjs` verifies suggestions, scheduling, a dependent custom action, completion and reopening, stale-plan recovery, reload, deadline replies and four viewport widths. It uses its own isolated local server so normal production request limits stay enabled. No synthetic actions are added to production.

Persistent production storage, real source coverage and live configured-model quality remain deployment gates. This action plan does not sign agreements, send notices, book inspections, pay bills or replace legal or technical inspections.
