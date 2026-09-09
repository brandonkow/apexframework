# Investigation learning

## One private record, not another dashboard

After selecting a permitted candidate, open **Thesis & learning** in its continuing investigation. Four compact actions cover thesis, actual outcomes, review and optional sharing. The old outcome form has moved here; it is not duplicated. The existing report-based Decision Journal remains for saved assessment reports. Neither feature silently copies the other or changes the 407 founder answers.

1. Lock a thesis, contrary case and falsifier. Expected monthly rent and full monthly outgoings are optional; blank means unknown. The current saved tool inputs are retained with the version. Resolve unsaved tool edits first.
2. Record monthly rent received and all outgoings, including loan payments, recurring charges, vacancy and repair costs as applicable. Zero rent is a recorded outcome, not a missing month. Correcting a month replaces its current actual record.
3. Choose a locked thesis and ending month, preview the deterministic comparison, then confirm a private review with an alternative explanation and the next evidence needed.
4. Optionally submit a separately written, redacted lesson proposal. This requires an account, explicit guest adoption where relevant, and unchecked-by-default sharing consent. Private learning is useful without submission.

Theses and saved review snapshots are immutable. New views need another version. Lock time is the actual server time, never a supplied historical date. Past-start, post-purchase or known-outcome theses are labelled retrospective; a user-declared earlier stage does not prove a genuine pre-purchase prediction. Personal observations are not independent verification.

## Calculation and evidence boundaries

Comparisons use recorded months from the start through the selected ending month. Missing months are named and excluded, not silently filled with zero. Expected cash flow is `(expected monthly rent - expected monthly outgoings) * recorded month count`; the difference is actual minus expected. Unknown expected amounts keep the expectation and difference unknown. Current-month comparisons warn that the month may be incomplete.

This is user-declared cash flow, not net yield, market value, verified investment performance or proof of skill. A profitable result can still reflect luck or excessive risk. A poor result can reflect temporary timing rather than a wrong thesis. The user must supply evidence to distinguish them.

Each preview fingerprints its thesis ID, ending month and actual outcome records. Saving a review requires that current fingerprint and the investigation revision. Corrections keep the original review snapshot but mark it outdated. An outdated review cannot be shared. Owner approval rejects a pending proposal whose underlying review changed or disappeared. A later source change is flagged on an approved proposal for owner reassessment; it does not silently rewrite the already-approved public wording.

## Owner-controlled shared knowledge

**Owner Studio > Intelligence hub > Lesson proposals** reuses the existing owner-token control. Only explicitly shared claim, scope, supporting evidence, contrary evidence and falsifier are shown, plus status and the owner's decision. No account ID, case ID, tenant identity, private file, source note, complete review or financial profile is exposed through this endpoint.

The contributor and owner must remove identifying details and confirm permission to share any facts in their edited text. This is explicit human review, not automatic PII detection. The owner may decline with a reason or approve edited text as a **contested hypothesis**, with a review date and proposal provenance. Approval does not overwrite founder answers. Contributed hypotheses stay out of response guidance until separately confirmed through the existing Belief Review workflow. Its low initial confidence is a provisional editorial setting, not a probability or statistical estimate.

Pending proposals can be withdrawn. Deleting an investigation removes its unapproved proposals and private learning, and unlinks approved proposals from the private case. The contributor is told before consent that already-approved public text and the separately reviewed belief can remain. Retirement of that belief is an owner action. Downloaded exports and information previously viewed or copied cannot be recalled.

## Storage, concurrency and limits

- Case learning lives in the existing scoped assistant state. PostgreSQL persists it through the existing `estatelab_core.assistant` column; no new table or separate account is required.
- Fresh-read, optimistic writes save case and proposal together. Owner approval saves the decision and one belief atomically; duplicate/stale approval returns 409. Concurrent unrelated writes are retried, not overwritten.
- Browser drafts survive ordinary re-renders, tab switches within the learning panel and conflict refreshes. Changed saved inputs require explicit draft review or discard, with consent and comparison rechecked. These unsent drafts are in memory only; a full reload, case switch or authentication change clears them. Saved versions remain in the configured store and private export.
- Initial bounds: 12 theses, 36 reviews, 120 months per comparison, five pending proposals per account, 500 proposals total. This is a bounded initial workflow, not an unlimited archival or queue service.
- No LLM is called for locking, arithmetic, saving reviews, sharing or approval. Subsequent explicitly opted-in reasoning can use the active case's private thesis and latest reviewed outcome as untrusted context. It does not train model weights or automatically generalise lessons across users.
- Ephemeral deployments still warn about temporary storage. Code delivery does not configure a production database, a private object store, a provider key or a permitted property feed.

## Verification

`tests/assistant-learning.test.js` covers immutable versions, retrospective labels, missing/zero months, current previews, corrected-outcome warnings, account consent, private/owner boundaries, withdrawal/deletion, duplicate approval, concurrency and guidance eligibility. Protected framework hashes run separately.

`node scripts/learning-browser-check.mjs` uses an isolated local server and synthetic records only. It checks the actual thesis/outcome/review UI, account adoption, cross-account refusal, opt-in sharing, the owner queue, normalized belief metadata, stale draft recovery, export, restart, deletion, duplicate IDs and 320/390/768/1440 layouts. It never publishes test listings or proposals to production.
