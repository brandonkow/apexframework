# Apex Code Audit - 20 September 2026

## Scope and baseline

Repository: `brandonkow/apexframework`, branch `main`.

The audit started from upstream `6ae69c9c6370ad73e8ff661568a34456494df748` (the founder-record and source-traceability update). It was fast-forwarded, not recreated or cherry-picked. Earlier feature work was saved separately before reviewing this baseline.

This is a repository-wide syntax/data/dependency scan, the full automated suite, targeted manual review of high-risk paths, and an interactive desktop/mobile walkthrough. It is not a claim that every line, every user workflow, every browser, or every financial/legal assumption has been exhaustively verified.

Manual review focused on API/deployment error handling, calculator inputs and DCF evidence, workbook output boundaries, owner provenance maintenance, catalogue identity, private investigation routing and storage, test isolation, and the migrated frontend. Existing automated tests also cover authentication, private files, account separation, concurrent writes, ownership plans, research, billing, source boundaries and response behaviour.

No LLM was connected or enabled. Provider tests use local synthetic fixtures. No production user data was submitted or changed during testing.

## Defects fixed

| Priority | Finding and consequence | Correction and regression coverage |
| --- | --- | --- |
| P1 | An explicit 0% loan margin became 80% or 90% borrowing, and explicit zero costs could be replaced with defaults or older card values. | Preserve zero in calculator/DCF input mapping; test all-cash costs, debt service, context overrides and deal analysis through HTTP. |
| P1 | DCF percentage strings such as `1%`, `0.5%` and `-1%` were interpreted as fractions, materially changing returns or adjustments. | Respect an explicit percent suffix while retaining numeric fractional inputs; test positive, negative and sub-one percentages against the unchanged template economics. |
| P1 | Future/invalid comparable dates, repeated sale rows and zero-weight entries could count toward the evidence threshold. | Validate calendar dates against the valuation date, enforce the existing 24-month boundary, exclude duplicate sale details and zero-weight rows, and show exclusion reasons. These checks do not independently verify a user's evidence claim. |
| P1 | Tests could inherit real database, provider, billing or persistent-storage settings from the launch shell or local environment file. | `npm test` now launches in a fresh temporary directory, removes service settings and disables local environment loading. Tests explicitly configure their own synthetic services. |
| P2 | Vercel's adapter lacked the Node host's error boundary; invalid input could become a generic deployment error instead of a bounded JSON response. | Handle errors at the shared request entry point; test the real Vercel adapter for invalid calculator values, malformed JSON, invalid DCF input and cross-origin changes. |
| P2 | Both founder maintenance commands silently did nothing on Windows because of invalid file-URL comparison. | Use `pathToFileURL` for entry-point detection; run both actual CLIs in dry-run mode and verify source/seed bytes are unchanged. |
| P2 | Automatic belief-source linking could overwrite an owner's manual source and leave a stale singular source ID behind. | Preserve manual decisions before applying automatic suggestions; synchronize or clear both ID representations. No write-mode source relinking was performed on the real seed. |
| P2 | Catalogue IDs were checked before trimming/truncation, allowing distinct raw IDs to become one stored identity. | Detect duplicates using the normalized stored ID; test whitespace and overlength collisions. |
| P2 | DCF buyer cash flow continued subtracting debt repayments after a short loan had been repaid. | Stop annual repayments at maturity; test cash flow after repayment. The fixed workbook explicitly rejects schedules it cannot reproduce. |
| P2 | Workbook exports could retain an old DSCR cache for an all-cash buyer or silently omit comparables beyond the template's four slots. | Clear unavailable formula caches; reject unsupported export scenarios instead of presenting a mismatched workbook. The original template file is unchanged. |
| P2 | The frontend turned unavailable DSCR/IRR values into zero. DCF result styles were also missing after UI migration. | Share tested display formatters; restore readable result sections and responsive metric cards. Add an accessible name to the mobile workspace selector. |

## Verification

- Baseline before fixes: 168 tests passed.
- Coverage run after the principal fixes: 180 tests passed, no failures or skips. Reported line coverage was 55.08%, branch coverage 72.45%, function coverage 58.99% for the instrumented files. This measurement does not combine all spawned-server/browser execution and is not a whole-product coverage guarantee.
- Final full regression run, including the additional duplicate-comparable test: **181 passed, 0 failed, 0 skipped**, exit code 0 (`npm test`, approximately 232 seconds).
- Repository-wide parse scan: 90 JavaScript/MJS files and 16 JSON files, no failures.
- `npm run check` and `npm run build:journey`: passed. The generated bundle is included with the source changes.
- `npm audit --json`: no known vulnerabilities reported in the installed dependency graph. This is not proof of absence of vulnerabilities.
- Public local smoke checks passed: app shell, health, assistant status, plan listing and owner-access boundary.
- Interactive checks: beginner conversation, property inputs, DCF calculation, explicit 0% borrowing, owner login/read-only belief review and owner-token clearing. No browser error logs were observed in the tested session.
- Responsive checks at 320, 390, 768 and 1440 pixels: no document-level horizontal overflow on the tested valuation/assistant views; the DCF result cards visibly stack at narrow widths. Mobile workspace navigation has an accessible name.
- All 15 hash-protected founder/framework documents remain unchanged, including the 407-answer record. `data/db.json` is unchanged. Test fixtures and the owner walkthrough did not publish any new knowledge.

One earlier final-run attempt completed only part of the suite before Windows returned `spawn EINVAL` for subsequent test processes. That attempt is not counted as a passing run. The complete rerun above passed without disabling or skipping any test.

## Remaining gaps

1. **Production storage is temporary.** The read-only production status check on this date reported `storage: json`, `durable: false` and disabled private uploads. A separate persistent Apex database and private object storage are still required before relying on durable account memory or uploaded originals. Framework-only calculation does not require a database.
2. **There is no published property feed yet.** Production reported zero sources and zero current listings. Apex can review user-supplied properties but cannot truthfully claim whole-market discovery coverage.
3. **Founder-derived beliefs are not all provenance-confirmed.** The local seeded Owner Studio reported 20 beliefs needing a source answer confirmed by hand and 75 never verified. Matching text is a source suggestion, not proof that a derived rule is correct. The immutable answers were not rewritten to close these gaps.
4. **Coverage is incomplete, especially in legacy code.** The large `server.js` and workspace feature module remain substantial maintenance risks. Existing unit/integration tests and this walkthrough do not cover every branch or interaction. Expand behaviour-level coverage before large refactors; do not use a green suite as proof of a bug-free product.
5. **Financial outputs remain screening estimates.** Comparable verification is user/owner-declared; external sale records and current legal/tax schedules were not independently re-certified in this code audit. The five-year Excel template still has explicit export limits. Human evidence review and qualified advice remain necessary.
6. **Not every dependency is the latest release.** The audit found newer releases of `@vercel/functions`, `esbuild`, `pg` and `three`. Known-vulnerability checks were clean; unrequested major/minor dependency migrations were not mixed into these bug fixes.
7. **Infrastructure integration is not proven by mocks.** Embedded PostgreSQL permission tests and private-storage adapter tests passed, but they do not constitute a live integration test of the user's future separate Apex database or object store. No paid resources or unrelated Supabase project were changed.

## Delivery boundary

This change set contains audit fixes and regression tests only. The saved catalogue-preview/recovery feature work remains separate and is not being represented as shipped. The next feature build must start from the audited main branch, preserve the founder record, retain explicit evidence gaps, and keep LLM use disabled until requested.
