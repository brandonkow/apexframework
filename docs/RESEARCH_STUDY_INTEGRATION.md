# Verified Market Research Integration

## Purpose

This integration adds dated external market evidence without changing the founder-authored framework. The decision order is fixed:

1. The protected founder framework controls deterministic rules, scorecards, blockers, and hard stops.
2. Strictly validated market studies add current evidence, comparable projects, supply, transactions, and calculated metrics.
3. The configured reasoning model may synthesize or challenge the evidence, but it cannot edit the framework or override a hard stop.

Public users can retrieve relevant approved evidence through normal chat and Deal Reports. Only the owner token can import, replace, list, or delete research studies.

## Build A Study

The research workflow is versioned in `skills/research-residential-markets`.

```powershell
python skills/research-residential-markets/scripts/init_study.py `
  --output .research-work `
  --study-id penang-high-rise-2026 `
  --study-name "Penang High-Rise Residential 2026" `
  --market "Penang" `
  --country "Malaysia" `
  --cutoff 2026-06-30 `
  --product "Condominium" `
  --product "Serviced residence"
```

Complete the generated study records using the schemas and methodology in the skill. Evidence must be atomic and traceable. Supply, transaction, and project records must reference valid evidence IDs.

## Calculate And Approve

```powershell
python skills/research-residential-markets/scripts/calculate_metrics.py .research-work/penang-high-rise-2026
python skills/research-residential-markets/scripts/score_comparables.py .research-work/penang-high-rise-2026
python skills/research-residential-markets/scripts/validate_study.py .research-work/penang-high-rise-2026 --strict
```

Strict validation requires all four human gates in `study-config.json` to be `approved` or `not-required`:

- `scope`
- `evidence`
- `recommendation`
- `issuance`

Do not approve a gate merely to make validation pass. Approval represents an owner or reviewer decision.

## Export And Import

```powershell
python skills/research-residential-markets/scripts/export_study_bundle.py .research-work/penang-high-rise-2026
```

The exporter writes `outputs/<study-id>-apex-bundle.json`. In Apex Analytic:

1. Open `OWNER`.
2. Load the owner token.
3. Expand `VERIFIED MARKET RESEARCH`.
4. Select `IMPORT JSON` and choose the exported bundle.

An existing study ID is never overwritten silently. Review the new data cut-off and sources, then use the inline `REPLACE STUDY` action.

## Safety Rules

- Imported confidence is capped by source type and verification status.
- Critical evidence needs at least 0.80 effective confidence.
- Material evidence needs at least 0.60 effective confidence.
- Rejected evidence cannot support supply, transaction, or project records.
- The importer requires non-empty evidence, supply, transaction, and project datasets.
- The importer requires calculated metrics, comparable scoring, a successful strict report, and all human gates approved.
- Research is included in owner backup, restore, content versioning, and public provenance labels.
- Source dates older than two years are marked stale during retrieval.

## Response Contract

When a study matches a question, Apex separates:

- founder framework judgment;
- verified market research;
- owner observations and case opinions;
- user assumptions and private memory;
- AI inference.

The normal decision response should still surface the current view, strongest reason, counter-case, missing proof, and next action. A research match raises evidence quality; it does not turn a general market study into proof for a specific unit.
