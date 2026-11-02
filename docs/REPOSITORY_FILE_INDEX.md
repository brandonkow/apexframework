# Apex Repository File Index

Companion to [Apex: User Map And Amendment Guide](REPOSITORY_MAP.md). This lists every Git-tracked file in source snapshot `ab59e8524de5ddf3a085ee574c368e204e8ffc03`.

The inspected source snapshot contains 178 tracked files. This guide and index add two more documentation files, for **180 tracked files** in the repository after this map is committed. Files are listed exactly as Git paths. Generated public bundles are included so users can distinguish delivered output from editable source.

Local dependencies, secrets, build output not tracked by Git, temporary files and Git internals are excluded.

## Project setup and main services

- `.env.example`
- `.gitattributes`
- `.gitignore`
- `README.md`
- `assistant-calendar.js`
- `assistant-catalogue.js`
- `assistant-context.js`
- `assistant-file-worker.js`
- `assistant-files.js`
- `assistant-jobs.js`
- `assistant-learning.js`
- `assistant-milestones.js`
- `assistant-profile.js`
- `assistant-property.js`
- `assistant-reasoning.js`
- `assistant-recovery.js`
- `assistant-routes.js`
- `brain-engine.js`
- `dcf-engine.js`
- `dcf-workbook.js`
- `environment.js`
- `investment-assistant.js`
- `journey-engine.js`
- `knowledge.js`
- `object-storage.js`
- `package-lock.json`
- `package.json`
- `render.yaml`
- `research-study.js`
- `server.js`
- `storage.js`
- `structured-response.js`
- `vercel.json`

## Hosting adapters

- `api/router.js`

## 3D design source assets

- `assets/blender/apex-world.blend`

## Integration data contracts

- `contracts/residential-deal-review.v1.schema.json`

## Owner controlled knowledge seed

- `data/db.json`

## Guides, specifications and framework records

- `docs/REPOSITORY_MAP.md`
- `docs/REPOSITORY_FILE_INDEX.md`
- `docs/APEX_DECISION_STANDARD.md`
- `docs/ASSISTANT_DISCOVERY.md`
- `docs/AUTHENTICATION.md`
- `docs/BRAIN_ENGINE.md`
- `docs/CODE_AUDIT_2026-09-20.md`
- `docs/DEAL_STRUCTURING_FINANCING.md`
- `docs/DECISION_JOURNAL_LEARNING.md`
- `docs/DEVELOPMENT_CASE_LIBRARY.md`
- `docs/EXECUTION_CALIBRATION.md`
- `docs/FOUNDER_407_QA.md`
- `docs/FOUNDER_SOURCE_TRACEABILITY.md`
- `docs/FRAMEWORK_ENHANCEMENT_AUDIT.md`
- `docs/FRAMEWORK_ENHANCEMENT_QUESTIONS.md`
- `docs/FRAMEWORK_GAP_ANALYSIS.md`
- `docs/FRAMEWORK_OVERVIEW.md`
- `docs/HOLDING_POWER_ASSET_MANAGEMENT.md`
- `docs/INVESTIGATION_LEARNING.md`
- `docs/INVESTOR_MANDATE_PROFILE.md`
- `docs/JARVIS_FULL_STACK.md`
- `docs/JOURNEY_3D.md`
- `docs/MARKET_INTELLIGENCE_TIMING.md`
- `docs/MARKET_OBSERVATION_OPERATIONS.md`
- `docs/MONETIZATION.md`
- `docs/MY_INVESTMENT_FRAMEWORK.md`
- `docs/OWNERSHIP_ACTION_PLAN.md`
- `docs/PORTFOLIO_STRATEGY_SCALING.md`
- `docs/POSTGRESQL.md`
- `docs/PRIVATE_INVESTIGATION_FILES.md`
- `docs/PRODUCTION_OPERATIONS.md`
- `docs/RAG.md`
- `docs/RESEARCH_STUDY_INTEGRATION.md`
- `docs/RESIDENTIAL_DCF.md`
- `docs/RESIDENTIAL_DEAL_REVIEW_API.md`
- `docs/SECOND_BRAIN.md`

## Demonstration inputs

- `examples/engine-candidate.json`

## Browser delivered interface, generated bundle and static assets

- `public/assistant/assistant.css`
- `public/assistant/catalogue-template.json`
- `public/index.html`
- `public/journey/app.js`
- `public/journey/assets/apex-world.glb`
- `public/journey/assets/world-poster.png`
- `public/journey/fields.json`
- `public/journey/journey.css`
- `public/journey/levels.js`
- `public/journey/workspace.css`

## Retrieval seed corpus

- `rag/corpus.json`

## Build, import, validation and browser acceptance tools

- `scripts/assistant-browser-check.mjs`
- `scripts/build-journey-fields.py`
- `scripts/build-journey-world.py`
- `scripts/build-journey.js`
- `scripts/import-founder-answers.js`
- `scripts/journey-browser-check.mjs`
- `scripts/journey-flow-check.mjs`
- `scripts/learning-browser-check.mjs`
- `scripts/link-belief-sources.js`
- `scripts/local-browser-suite.mjs`
- `scripts/milestone-browser-check.mjs`
- `scripts/run-brain.js`
- `scripts/run-tests.js`
- `scripts/smoke-research-skill.js`
- `scripts/smoke-test.js`
- `scripts/workspace-browser-check.mjs`

## Residential research method, schemas and reusable study templates

- `skills/research-residential-markets/SKILL.md`
- `skills/research-residential-markets/agents/openai.yaml`
- `skills/research-residential-markets/assets/templates/development-recommendation.md`
- `skills/research-residential-markets/assets/templates/inception-brief.md`
- `skills/research-residential-markets/assets/templates/project-profile.md`
- `skills/research-residential-markets/assets/templates/report-outline.md`
- `skills/research-residential-markets/references/data-model.md`
- `skills/research-residential-markets/references/methodology.md`
- `skills/research-residential-markets/references/quality-gates.md`
- `skills/research-residential-markets/references/rules/comparable-weights.json`
- `skills/research-residential-markets/references/rules/confidence-rules.json`
- `skills/research-residential-markets/references/schemas/evidence.schema.json`
- `skills/research-residential-markets/references/schemas/project.schema.json`
- `skills/research-residential-markets/references/schemas/study-config.schema.json`
- `skills/research-residential-markets/references/schemas/supply.schema.json`
- `skills/research-residential-markets/references/schemas/transaction.schema.json`
- `skills/research-residential-markets/references/source-strategy.md`
- `skills/research-residential-markets/scripts/calculate_metrics.py`
- `skills/research-residential-markets/scripts/export_study_bundle.py`
- `skills/research-residential-markets/scripts/init_study.py`
- `skills/research-residential-markets/scripts/schema_utils.py`
- `skills/research-residential-markets/scripts/score_comparables.py`
- `skills/research-residential-markets/scripts/validate_study.py`

## Excel valuation template

- `templates/residential-high-rise-buyer-dcf.xlsx`

## Automated tests and synthetic fixtures

- `tests/assistant-catalogue.test.js`
- `tests/assistant-context.test.js`
- `tests/assistant-decision-boundary.test.js`
- `tests/assistant-files.test.js`
- `tests/assistant-jobs.test.js`
- `tests/assistant-learning.test.js`
- `tests/assistant-milestones.test.js`
- `tests/assistant-profile.test.js`
- `tests/assistant-property.test.js`
- `tests/assistant-reasoning.test.js`
- `tests/assistant-recovery.test.js`
- `tests/auth-flow.test.js`
- `tests/billing-reports.test.js`
- `tests/brain-engine.test.js`
- `tests/dcf-engine.test.js`
- `tests/dcf-format.test.js`
- `tests/deal-report.test.js`
- `tests/decision-journal.test.js`
- `tests/environment.test.js`
- `tests/fixtures/engine-network-guard.js`
- `tests/fixtures/journey-candidate.js`
- `tests/founder-source-record.test.js`
- `tests/frontend-contract.test.js`
- `tests/investment-assistant.test.js`
- `tests/journey.test.js`
- `tests/market-intelligence.test.js`
- `tests/object-storage.test.js`
- `tests/postgres-private-access.test.js`
- `tests/private-file-provider.test.js`
- `tests/production-phase.test.js`
- `tests/protected-framework.test.js`
- `tests/provider-routing.test.js`
- `tests/research-study.test.js`
- `tests/response-quality.test.js`
- `tests/security-and-costs.test.js`
- `tests/server-startup.test.js`
- `tests/smoke-test.test.js`
- `tests/storage.test.js`
- `tests/structured-response.test.js`
- `tests/vercel-adapter.test.js`
- `tests/workspace-deal-review.test.js`

## Editable browser application source

- `ui/assistant/assistant.js`
- `ui/assistant/context-sync.js`
- `ui/assistant/files.js`
- `ui/assistant/learning-owner.js`
- `ui/assistant/learning.js`
- `ui/assistant/milestones.js`
- `ui/assistant/property-entry.js`
- `ui/assistant/recovery.js`
- `ui/journey/app.js`
- `ui/journey/world.js`
- `ui/workspace/dcf-format.js`
- `ui/workspace/features.js`
- `ui/workspace/panels.html`
- `ui/workspace/workspace.js`
