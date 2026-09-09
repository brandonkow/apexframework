# Assistant-led property discovery

## Product direction

The default homepage is a conversation-led investment assistant. The seven-stage 3D framework is optional under Explore. The existing 407 founder answers and deterministic assessment engine are unchanged. This work builds on Claude's `eabf2db` belief-review scheduling commit, not a duplicate or replacement of it.

The first operational path is: conversational search brief -> user confirmation -> published catalogue search -> evidence-led shortlist -> selected property -> site visit -> transaction -> handover -> rental -> holding review. The later stages record human actions and evidence; a stage change does not imply approval, inspection or legal completion.

## Publication and evidence

Owner Studio / Discovery catalogue accepts version 1 JSON exports. No synthetic listing is bundled into production. Only explicitly published source records participate; private owner documents and observations are not automatically converted into public listings. Importing validates structure, not truth or the existence of a licence.

Each source requires `id`, `name`, `permission` (`licensed`, `owner_authorized` or `public_reuse`), `permissionReference`, `coverage` and explicit `publish: true`. The empty download defaults publication to false. Each import completely replaces its source's previous snapshot. Unpublish removes that source from future searches.

Each listing needs:

```json
{
  "id": "stable-source-listing-id",
  "projectName": "ACTUAL PROJECT NAME",
  "area": "ACTUAL AREA",
  "state": "ACTUAL STATE",
  "propertyType": "condo",
  "askingPrice": 0,
  "bedrooms": 3,
  "sizeSqft": 0,
  "unitKey": "ONLY IF THE ACTUAL UNIT IS IDENTIFIABLE",
  "tenure": "VERIFY FROM SOURCE",
  "sourceUrl": "https://REPLACE-WITH-ACTUAL-SOURCE",
  "observedAt": "YYYY-MM-DD",
  "availability": "unknown",
  "facts": []
}
```

This is a schema illustration, not market data; its zero price, placeholder date and unknown availability intentionally cannot qualify. Property types are `condo`, `serviced_apartment` and `landed`. Fact kinds: `transaction`, `signed_rent`, `advertised_rent`, `maintenance`, `sinking_fund`, `management`, `unit_position`, `supply`, `title`. Each fact requires kind, description, sourceUrl and observedAt. Optional numeric value, `unitSpecific`, `adverse` and `verification: owner_checked` describe the owner's published evidence. Do not put tenant identity, private leases, bank statements or personal contact information into this public catalogue.

Available listings expire from discovery after 30 days. Transaction evidence is used for 180 days, other facts for 90 days. These are explicit operational freshness defaults, not amendments to the founder framework. Actual signed rent must be unit-specific and owner-checked to populate rent calculations. Advertised rent never becomes achieved rent. Unit identity allows duplicate removal; similar layouts alone do not establish that two listings refer to the same unit. Adverse title/management/unit-position evidence in another matching record is not hidden by deduplication.

Search applies the confirmed location, ceiling, type and bedroom constraints. Matching candidates are ordered by evidence completeness, not promised returns or cheapness. The existing seven-stage engine runs on the sourced inputs with unknown finances left blank. Results remain `investigate`, never automatic buy approval. No match is a valid result. The first screen shows up to three candidates and discloses total matches, searched sources, exclusions and unresolved evidence.

## Privacy and persistence

`GET /api/assistant/status` reports coverage, LLM availability, account state and storage durability. `GET/POST /api/assistant/cases` and case-scoped `message`, `confirm`, `step`, `cancel`, `select`, `stage`, `task`, `evidence`, `outcome` and `export` operations manage investigations. Changes require a matching case revision. A user cannot choose another user's scope or send forged ranked candidates. Candidate selection rechecks current publication and freshness.

Guest access uses a random, HttpOnly, SameSite=Strict cookie with a hashed storage scope. Accounts use their authenticated user ID. Signing in does not copy guest data; `POST /api/assistant/adopt` is an explicit action. Account export includes investigations. Case deletion removes its conversation, tasks, evidence, results and outcomes. Personal records do not modify shared knowledge or train a model.

The additive PostgreSQL migration stores assistant state in `estatelab_core.assistant`. JSON remains a local fallback. Vercel's local JSON is explicitly temporary, not durable production storage. Configure `DATABASE_URL` before relying on production accounts. AI brief extraction requires explicit opt-in, is schema-validated and needs a configured provider key. Failure falls back transparently to basic extraction and editable confirmation.

## Background execution and response controls

Confirmed searches run three bounded server steps. The Vercel adapter registers the work with `@vercel/functions` `waitUntil`; Node deployments keep the promise on the running process. The browser polls status rather than driving the search. Work is still subject to the function lifetime: this is not a permanent worker, scheduled market monitoring or a notification service. An interrupted job resumes from its persisted checkpoint on the next authorized case read. Exporting a case does not trigger work. `APEX_ASSISTANT_BACKGROUND=false` explicitly selects the older browser-driven mode for testing or unsupported hosts.

The worker rechecks current sources at completion. Optimistic storage conflicts retry from fresh state, and a concurrent cancellation, deletion or replacement cannot be overwritten by an old worker. Case writes merge only the changed investigation, preserving unrelated account and source updates. A same-case conflict is rejected with 409 rather than losing a user's work. Selected properties retain their original thesis snapshot, with a separate current-source notice when publication, price, evidence or freshness changes.

The basic parser does not convert salary, cash reserves or monthly rent into a purchase-price ceiling. Ambiguous and negated preferences require review. Model-extracted briefs have explicit type/range validation, including nullable missing values. AI is opt-in for each request, and malformed output or provider failure falls back to framework mode. The active case's dated checks, private observations and actual outcomes are passed as untrusted context to the existing reasoning pipeline, not published as shared knowledge. Short answers retain the current view, principal reason, contrary case and next action. Greetings are handled without unnecessary model calls. These are response controls and tested fallbacks, not a guarantee that a configured model cannot make errors.

## One continuing working copy

`POST /api/assistant/cases/:id/context` accepts the complete working `dealCard`, `financialProfile`, checkpoint `evidence` and `dcfContext`, with `contextRevision`. This revision is separate from conversation/search progress. Writes validate through the existing journey field contract, preserve unrelated concurrent changes and reject stale working revisions. Unrecognised DCF fields and invalid shapes are rejected. User-entered comparable verification remains a user declaration, not an independent check.

The selected listing is an immutable source snapshot. A separate, editable working copy drives the tools and assistant reasoning. Clearing an input leaves it unknown; it does not fall back to the original number. Imported maintenance plus sinking fund map to the existing engine's single combined monthly-charge field. Missing sinking fund is not treated as zero.

Linked tool edits are debounced, saved to the private investigation and restored on reload. Explicit sync status distinguishes saved, pending, unsaved and conflicting copies. Local pending drafts survive browser reload; authentication changes invalidate in-flight UI callbacks. Conflicts offer a difference review, an export of unsaved inputs and explicit choices to retain local edits or load saved inputs. Neither choice modifies the source snapshot. Earlier browser copies without sync history require review before replacement. Deleting the investigation also removes its linked tool copy on this device; previously downloaded exports are not erased.

Official execution reference: [Vercel Functions package: waitUntil](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package). Background promises have the same execution timeout as the function.

## Conversational financial intake

`Check my buying power` (or that phrase in chat) starts four private questions: reliable take-home monthly income, existing monthly debt repayments, purchase cash separate from the emergency fund, and emergency reserve measured in months of essential expenses. Users can answer one at a time, supply labelled figures together, ask for an explanation, skip, cancel or restart. No model provider is called during intake. Generic monthly-income values entered through older tools are not silently reclassified as take-home income.

The versioned case holds an unconfirmed `profileDraft`, separate from saved working inputs. `POST /api/assistant/cases/:id/profile` accepts `start`, `skip`, `cancel`, `restart` or `confirm`; chat supplies draft answers. Confirmation is an explicit UI action, not inferred from a vague "yes". It requires an answer or skip for all four questions and at least one supplied figure. Skipped fields become unknown, not zero or a silently reused prior amount. Other financial preferences, property inputs, checkpoint evidence and DCF assumptions remain unchanged. Search ceiling is never inferred from income or changed by this process.

Inputs use deterministic, bounded extraction. Gross salary, annual totals, loan balances, unlabelled mixed figures, ranges, duplicate labels and unclear statements do not become committed values. Drafts survive reload in the configured store and are included in private export/delete. Cancellation removes the draft but does not erase previously submitted conversation messages; this is stated in the UI response. The existing AI opt-in can share relevant conversation history on later reasoning requests; a context marker forbids treating unconfirmed draft figures as confirmed finances.

The draft captures the working-context revision at its start. Concurrent tool edits or selection of a property invalidate confirmation; the draft remains available for review/restart rather than overwriting newer inputs. Confirmed values populate the same linked tools. Selecting a property after financial intake seeds the property inputs from its original source without losing the profile. Income and reserve basis metadata remain user-declared and are invalidated when the corresponding field is edited through generic tools. None of this is income verification, lender approval or a recommendation to spend the maximum search budget.

## Current delivery boundaries

- No permitted live feed was supplied. The owner requested prepared owner-managed imports. Coverage therefore starts empty, not fabricated.
- Confirmed searches can finish after the page is closed, within the server execution window. Durable storage is required for reliable cross-instance/redeployment recovery. Continuous monitoring and notifications are not implemented.
- The shared tools and assistant use one versioned working copy, including confirmed conversational financial intake. Private document/photo workflows have storage and consent gates. Existing ownership checks carry responsibilities, dates and dependencies; private thesis/outcome reviews and consented owner-reviewed lesson proposals are documented in `INVESTIGATION_LEARNING.md`.
- Scenario tests cover greetings, affordability boundaries, gross-versus-net yield, actual cash flow, source changes, context isolation, AI consent and malformed/provider-failure fallbacks. Live configured-provider answer quality remains unverified while production has no key. Provider availability is not a quality guarantee.
- Production needs an AI key, owner token and durable storage. Code deployment does not migrate Render data.

## Verification

`node --test --test-concurrency=1 tests/*.test.js` includes framework hashes, real decision-engine use, malformed input, stale/adverse/duplicate evidence, cookie/account isolation, explicit adoption, revision conflicts, durable case restart, background cancellation/deletion/replacement, unrelated-write preservation, response scenarios, outcome arithmetic and export/delete tests.

`node scripts/assistant-browser-check.mjs` creates and tears down an isolated local server. Synthetic sources never go to production. It verifies the empty catalogue, natural brief, server-driven search, shortlist, site check, persistence, tool handoff, optional 3D, owner catalogue and rental workflow at 320/390/768/1440 widths. PostgreSQL contract tests cover the additive state column; a live production database remains a separate deployment gate.

The browser test also edits income, rent and DCF assumptions through the actual tools, reloads them, verifies their use in the assistant's reply, introduces a conflicting remote edit and checks explicit recovery without overwriting the original source. `tests/assistant-context.test.js` covers working-copy validation, reset semantics, unrelated storage conflicts, coalesced edits and authentication invalidation.

`tests/assistant-profile.test.js` covers staged and multi-field intake, gross-versus-net ambiguity, unknown-versus-zero, cancellation, explicit confirmation, stale drafts, account scoping, forged body fields, provider-call prevention and income-basis invalidation. The assistant browser test completes intake before discovery, reloads an unconfirmed draft, selects a sourced property with the confirmed profile, then updates finances conversationally after editing tools. It verifies those changes reach the actual profile controls while preserving DCF assumptions, with no empty search form interrupting intake.

## Completion gates from the accepted recommendation

The ownership extension is documented in `OWNERSHIP_ACTION_PLAN.md`. `node scripts/milestone-browser-check.mjs` exercises the real editor, responsibility/date suggestions, prerequisite checks, transitive reopening and stale-plan recovery independently of the longer discovery browser suite, without disabling request limits.

These gates reflect the assistant-first recommendation accepted in this task; they are not additional version releases.

| Requirement | Current evidence / remaining gate |
| --- | --- |
| One assistant-first entry; optional 3D; no compulsory framework questionnaire | Delivered; desktop/mobile browser checks |
| Establish objective, location and financial comfort through conversation | Search brief and four-step confirmed financial intake delivered; private API and desktop/mobile workflow tests |
| Permitted discovery in a well-covered micro-market | Owner-managed imports delivered; real pilot coverage unavailable until permitted records are supplied |
| Identity, duplicate, freshness and asking-versus-achieved evidence checks | Domain tests and local synthetic discovery workflow; real source sample still required |
| Framework calculations, contrary case and a small explained shortlist | Existing engine reused; scenario and browser tests; live configured-model quality remains unverified |
| Recoverable background progress, cancellation and bounded AI use | Three persisted server search steps and bounded per-request tokens/rate limits; continuous monitoring not claimed |
| Private, continuing property record with editable assumptions | Versioned working-context API and end-to-end sync tests; production database still required |
| Collect private documents/photos with permission | Case-scoped originals, bounded local extraction, explicit optional AI reading and reviewed notes delivered; local API/browser tests; production storage and live-model quality still required |
| Carry evidence, responsibilities and dates through transaction, handover and tenancy | Existing checks extended with optional responsibilities, confirmed or target dates, custom actions, dependencies and transitive reopening; scoped API and desktop/mobile tests; durable production storage remains a gate |
| Compare the thesis with actual outcomes and propose owner-approved lessons | Immutable thesis/review snapshots, missing-month arithmetic, stale-source warnings, optional redacted sharing and owner-only contested hypotheses delivered; unit and isolated browser/API/restart tests; real longitudinal evidence and durable production storage remain gates |
| Keep the 407 founder inputs unchanged and avoid external commitments without approval | Protected-file hashes and scoped APIs; no automatic payments, messages or bookings |
| Direct-main delivery preserving Claude's commit, followed by production checks | Git ancestry, test results and deployed revision checked at each delivery |
