# Founder Source Traceability

## Why this exists

Every rule in the protected framework files was written from a founder interview:
407 questions answered between 2026-06-16 and 2026-06-27. For most of the project's
life that record lived outside the repository. Six implementation documents cited
"the 407 founder answers" as the authority, and the authority was not filed
anywhere, so no rule could be checked against what was actually said.

`docs/FOUNDER_407_QA.md` is now that record, committed and hash-protected. This
document explains how it connects to the rules.

## The chain

```
docs/FOUNDER_407_QA.md      the interview, verbatim, immutable
        |
        |  scripts/import-founder-answers.js --write
        v
brain.answers[407]          structured records, one per question
        |
        |  scripts/link-belief-sources.js --write
        v
belief.sourceQuestionIds    which answers produced this rule
belief.sourceQuote          a verbatim excerpt kept inside the belief
```

The quote is deliberately duplicated into each belief. If the record is ever lost
again, the provenance survives inside the belief rather than dying with the file.

## The record

407 answered questions across eight blocks, matching the contents table in the
record itself:

| Block | Questions | Rules written into |
|---|---:|---|
| Stage 1 - Property Selection | 124 | `docs/MY_INVESTMENT_FRAMEWORK.md` |
| Stage 2 - Investor Suitability | 20 | `docs/INVESTOR_MANDATE_PROFILE.md` |
| Stage 3 - Financing And Deal Structure | 20 | `docs/DEAL_STRUCTURING_FINANCING.md` |
| Stage 4 - Holding Power And Asset Management | 27 | `docs/HOLDING_POWER_ASSET_MANAGEMENT.md` |
| Stage 5 - Portfolio Strategy And Scaling | 20 | `docs/PORTFOLIO_STRATEGY_SCALING.md` |
| Stage 6 - Market Intelligence And Timing | 29 | `docs/MARKET_INTELLIGENCE_TIMING.md` |
| Stage 7 - Decision Journal And Second-Brain Learning | 27 | `docs/DECISION_JOURNAL_LEARNING.md` |
| Execution Calibration (A-M) | 140 | `docs/EXECUTION_CALIBRATION.md` |

28 answers hand the question back ("You decide", "research online"). They are kept
as given and flagged `deferred`, because a delegated rule is a different fact from
an unasked question: it tells Apex the founder chose not to set that boundary.

The 20 Stage 1 Section L questions in the appendix were never answered individually
and are excluded from the 407 and from the import.

## Linking rules to answers

`scripts/link-belief-sources.js` proposes links by scoring each belief against the
answers in its stage. Precision is the priority: a wrong provenance link is worse
than none, because it would let a rule cite words the founder never said about it.
Three guards enforce that.

- **Question text weighted double.** A belief was written as the rule for a specific
  question, so agreement with the question is stronger evidence than agreement with
  the answer prose.
- **Length normalization.** Without it a long rambling answer outscores the precise
  one simply by containing more terms to collide with.
- **At least three matching terms.** One shared rare word can outscore everything on
  its own, which is coincidence rather than provenance.

Where several close rivals sit in the same interview section, the matcher proposes
up to four of them as possible sources. Text similarity does not establish that
the belief genuinely came from those answers. Where close rivals are scattered,
the belief is left unlinked for manual confirmation.

The script is idempotent: re-running it reproduces the same database exactly. It
clears auto-links it can no longer stand behind, and never touches a link a person
confirmed by hand (`sourceLinkMethod: "manual"`, set whenever a link arrives through
`PATCH /api/brain/beliefs/:id`).

Seed state: **56 of 76 beliefs have suggested source links**, 18 of them to several
answers. None of these seed links is owner-confirmed. The other 20 have no proposed
link. Owner Studio distinguishes suggested links from owner-confirmed attribution;
neither is proof that an investment rule has been validated against real outcomes.

## The review loop

Tracing says where a rule came from. It does not say whether the rule is still
true. Every belief carries `nextReview`, on an interval weighted by how much damage
the belief would do if wrong: 180 days at 90%+ confidence, 90 days once contested,
365 days otherwise.

`GET /api/owner/beliefs/review` returns the queue, ordered overdue first, then
contested, then never-verified high-confidence beliefs. Closing a review requires a
note recording what real case was checked, so each cycle attaches fresh evidence
rather than a recollection. Owner Studio surfaces the queue behind BELIEF REVIEW.

At the time of writing, 75 of 76 beliefs have never been verified against a real
case since they were authored. That is the honest starting position.

## Questions added to the rotation, and questions deliberately left out

Two questions were added to the owner thinking-question rotation because they
change what gets bought:

- **`leasehold-financing-cliff`** - the framework judges tenure as freehold versus
  leasehold, but it is the remaining years that close the next buyer's financing and
  shrink the exit pool. S1-107 sets 90 years as acceptable; the cliff below that is
  unrecorded.
- **`building-age-at-exit`** - S1-2 rejects high-rise older than 10 years and S1-5
  sets a 3-7 year hold, so a property bought at age 5 is sold at age 8-12. The longer
  end of that range crosses the founder's entry-age preference. An entry filter is
  not automatically an exit rule; the acceptable exit-age conditions still need
  clarification.

A further twelve questions were drafted and deliberately excluded. They covered
personal-shock risk, estate and succession planning, asset-class opportunity cost,
and terminal value. They are real gaps, but they sit downstream of the purchase
decision rather than inside it, and the selection framework is not the right home
for them. They belong to a future portfolio-and-succession module, not to the
question set that decides whether a property is the right buy.

## Re-running the import

If the founder corrects an answer, edit `docs/FOUNDER_407_QA.md`, update its hash in
`tests/protected-framework.test.js`, then:

```bash
node scripts/import-founder-answers.js          # verify the record still parses to 407
node scripts/import-founder-answers.js --write  # reseed brain.answers
node scripts/link-belief-sources.js             # review proposed links
node scripts/link-belief-sources.js --write     # apply them
npm test
```

Both scripts are safe to re-run. The import replaces only records tagged
`founder-interview-2026` and leaves answers captured in the app untouched.
