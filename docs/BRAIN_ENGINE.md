# Database-free brain engine

## What this build does

The `apex.brain.v1` entry point evaluates one supplied property and financial profile without starting the web server, opening a database, saving a conversation or contacting an LLM. Supabase setup is not required to develop or run it.

It reuses `analyzeSevenStageDeal` and the existing journey evidence gates. It does not copy or alter the rules, add a new scoring framework, or edit the protected 407 founder answers. The scoring implementation still lives in `server.js`; `brain-engine.js` is a read-only adapter, not a newly independent npm package. File-storage service construction is deferred until an application operation actually needs it, so incomplete Supabase settings do not block pure assessments.

This evaluates the current implementation of the framework. It does not claim that every nuance of all 407 answers is encoded in deterministic rules, nor does it retrieve new owner evidence, research live listings or conduct a site visit.

## Run it

From the repository root after installing the existing dependencies:

```powershell
npm run engine -- --file examples/engine-candidate.json --text
```

The example is explicitly synthetic, has missing evidence and finances, and must not qualify as a purchase recommendation. It is outside production catalogue data and is never imported into the application.

For machine-readable JSON, call Node directly so npm's script banner is not mixed into the output:

```powershell
node scripts/run-brain.js --file examples/engine-candidate.json
Get-Content -Raw .\candidate.json | node scripts/run-brain.js
node scripts/run-brain.js --schema
```

`--help` lists supported options. Input is one UTF-8 JSON object, limited to 256 KiB. The CLI skips the repository `.env` file and never uses provider or database credentials. Exit code 0 means evaluation completed, not that the property passed. Invalid input or execution failure returns 1 without echoing raw private input or a stack trace.

## Use from another Node module

```js
import { evaluateBrain, formatBrainReview } from "./brain-engine.js";

const result = evaluateBrain({
  dealCard: { askingPrice: "400000", expectedRent: "2500" },
  financialProfile: {},
  evidence: {}
});
console.log(formatBrainReview(result));
```

Only `dealCard`, `financialProfile` and `evidence` are accepted. `--schema` or `engineInputSchema()` returns the current field names, options and checkpoint IDs. Unknown/misplaced fields are rejected rather than silently discarded. Missing fields remain unknown. Dates and notes still need to satisfy the existing journey gates; supplying a note does not independently verify its contents.

Each result contains:

- The contract/engine versions, `mode: framework`, `persistence: none`, and a SHA-256 hash of normalized inputs. The hash identifies those inputs; it is not proof that the evidence is true or that all future engine versions will return the same result.
- An organized review: current view, strongest counter-case, hard stops, recommendation blockers, evidence/checkpoint gaps and next checks.
- The unchanged detailed analysis, including property quality versus investor suitability, calculations, assumptions, scenarios and the evidence assessment.
- The existing journey's checkpoint results and screening qualification. Even a qualified shortlist means further verification, not automatic purchase, loan approval or a legal opinion.

The existing confidence number is explicitly labelled a rule-based score, not a calibrated probability of profit. Evidence remains caller-supplied and is not magically verified by the engine. The full JSON includes supplied property and financial details; protect it like any other private report. Writing or sharing stdout through another program is the caller's responsibility.

## What remains separate

The full website retains its existing accounts, owner-only knowledge, private investigations, background work and optional model integrations. This build does not change the website into an anonymous stateless service, remove billing/access controls, hide storage warnings or add another public endpoint. The module API is a local programming interface, not an unauthenticated hosted API.

Durable storage is still needed before relying on cross-device memory, saved investigations or uploads in production. PostgreSQL/Supabase is one implementation, not a requirement of the framework. A live LLM key is separately required for model-assisted reasoning; this runner deliberately makes no model calls. No model is trained by evaluating a candidate.

## Verification

`tests/brain-engine.test.js` compares results with the existing scoring engine, verifies hard-stop precedence, incomplete evidence, input isolation, stable normalized hashes, defensive schema copies, strict input limits and CLI error handling. A child-process test denies filesystem writes, forbids socket/fetch access and supplies broken database/object/provider settings. Successful evaluation must create no files and make no external call.

These tests demonstrate engine-only execution, not hosted persistence or live-model quality. The existing full suite separately checks application behavior and byte-for-byte founder-file protection.
