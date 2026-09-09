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

## Current delivery boundaries

- No permitted live feed was supplied. The owner requested prepared owner-managed imports. Coverage therefore starts empty, not fabricated.
- Search steps are checkpointed server-side and resume after reload/server restart with durable storage. The browser drives these bounded requests while the application is open, including while using other tools. An independent closed-browser worker and notifications are still outstanding; do not call this unattended monitoring.
- The shared tool handoff creates or reuses a separate property slot. Full bidirectional syncing of subsequent tool edits, financial-profile discovery, private document extraction and outcome-to-belief proposals are follow-on requirements, not completed capabilities.
- Existing model responses still need a broader scenario-based quality audit and a live configured-provider check. Provider availability is not a quality guarantee.
- Production needs an AI key, owner token and durable storage. Code deployment does not migrate Render data.

## Verification

`node --test --test-concurrency=1 tests/*.test.js` includes framework hashes, real decision-engine use, malformed input, stale/adverse/duplicate evidence, cookie/account isolation, explicit adoption, revision conflicts, durable case restart, outcome arithmetic and export/delete tests.

`node scripts/assistant-browser-check.mjs` creates and tears down an isolated local server. Synthetic sources never go to production. It verifies the empty catalogue, natural brief, search, shortlist, site check, persistence, tool handoff, optional 3D, owner catalogue and rental workflow at 320/390/768/1440 widths. PostgreSQL contract tests cover the additive state column; a live production database remains a separate deployment gate.
