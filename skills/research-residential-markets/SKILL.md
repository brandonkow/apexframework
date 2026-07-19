---
name: research-residential-markets
description: Automate developer-focused residential and high-rise market research with traceable evidence, structured supply-demand data, comparable-project scoring, deterministic pricing and absorption metrics, exception-based quality gates, development recommendations, and report drafting. Use for residential market studies, market validation, highest-and-best-use support, project positioning, unit-mix and pricing studies, competitor surveys, launch strategy, absorption analysis, or when converting property-market documents and datasets into an investment- or development-ready report for any geography.
---

# Research Residential Markets

Build evidence-led residential market studies while minimizing routine human analyst work. Treat the evidence database and deterministic calculations as authoritative; use AI for acquisition, classification, interpretation, drafting, and adversarial review.

## Core operating rule

Use a human-on-the-loop model:

1. Ask a human to approve only material scope choices, unresolved evidence conflicts, material commercial assumptions, and the final recommendation.
2. Continue autonomously through routine research, extraction, normalization, calculation, chart planning, drafting, and QA.
3. Never invent missing market evidence. Record the gap, lower confidence, seek another source, or route the issue to the exception queue.
4. Keep bookings, verified sales, gross prices, net prices, asking prices, and achieved prices distinct.
5. Make every material claim traceable to an evidence record.

## Start a study

Create a controlled study workspace outside the skill directory:

```powershell
python scripts/init_study.py --output <workspace> --study-id <slug> --study-name "<name>" --market "<market>" --country "<country>" --cutoff YYYY-MM-DD
```

The script creates configuration, evidence, data, analysis, draft, and output folders plus starter JSON files and report templates.

If an existing study already has a controlled evidence store, continue from it instead of reinitializing.

## Run the workflow

### 1. Frame the decision

Capture the site, development concept, decision questions, geographic scope, segments, time periods, data cut-off, commercial constraints, and required outputs in `study-config.json`.

Default to reasonable analytical boundaries, but route material choices to human Gate 1 when they could change the recommendation:

- subject site and planning basis;
- proposed product or scale;
- primary and secondary market geography;
- launch and completion period;
- target buyer or occupier;
- minimum commercial return or immovable design constraint.

Read [methodology.md](references/methodology.md) when scoping, selecting analyses, positioning the market cycle, or preparing recommendations.

### 2. Plan sources before collecting data

Create a source plan by analytical question. Prefer:

1. official statistics, planning, regulatory, and transaction sources;
2. audited or professionally validated databases;
3. official developer materials and statutory disclosures;
4. timestamped primary surveys and site inspections;
5. portals, advertisements, and media as discovery or corroboration sources.

Browse for current market evidence. Do not rely on model memory for current prices, transactions, regulations, pipelines, sales rates, or public-office information. Record publication date, reference period, access date, geography, and source location.

Read [source-strategy.md](references/source-strategy.md) when designing research coverage or adapting the workflow to a new country.

### 3. Build the evidence store

Store atomic claims in `evidence/evidence.jsonl`. Store normalized records in:

- `data/supply.json`
- `data/transactions.json`
- `data/projects.json`

Use the schemas under `references/schemas/`. Read [data-model.md](references/data-model.md) before adding new fields or reconciling definitions.

Every material data record must reference one or more evidence IDs. Preserve source wording in the evidence claim or notes when ambiguity matters.

### 4. Validate before interpreting

Run:

```powershell
python scripts/validate_study.py <study-directory>
```

Use `--strict` before issuing a final report. The validator checks schema shape, referential integrity, dates, price and area logic, sales and booking constraints, data-cut-off breaches, and evidence confidence. It writes `analysis/validation-report.json`.

Do not draft a material conclusion from records with critical errors. Use warnings with explicit caveats. Route unresolved critical conflicts to human Gate 2.

Read [quality-gates.md](references/quality-gates.md) when resolving exceptions or setting issuance thresholds.

### 5. Calculate metrics deterministically

Run:

```powershell
python scripts/calculate_metrics.py <study-directory>
python scripts/score_comparables.py <study-directory>
```

Use the generated JSON outputs as the numerical basis for analysis. Do not replace script results with informal arithmetic in narrative text.

Required analytical sequence:

1. demand drivers and affordability;
2. existing supply and market structure;
3. future supply and completion pressure;
4. transaction volume, value, price, geography, and segment;
5. overhang, unsold inventory, and months of supply;
6. secondary-market price support;
7. new-project net pricing and sales velocity;
8. direct, aspirational, control, and contextual comparables;
9. market gap and product-positioning tests;
10. market-cycle position and outlook;
11. development strategy and scenarios.

### 6. Select comparables without outcome bias

Score candidate projects from 0 to 5 for buyer similarity, location and accessibility, product and tenure, size and total price, timing, scale and density, and brand or positioning.

Include:

- direct comparables with high substitution similarity;
- aspirational comparables supporting a credible premium or differentiated strategy;
- control comparables with meaningful similarity and weak performance;
- contextual projects only when needed to explain the wider market.

Document overrides and reasons. Never select only successful premium projects.

### 7. Draft from evidence, not page order

Use `assets/templates/report-outline.md` as the main structure. Draft in this working order:

1. tables, metrics, and chart specifications;
2. comparable matrix and project profiles;
3. factual page commentary;
4. market gaps and positioning;
5. trends, cycle, and outlook;
6. development recommendation;
7. scenarios and risk triggers;
8. executive summary last.

Write each analytical page as:

```text
Observation -> Explanation -> Development implication -> Caveat
```

Move detailed project profiles to the appendix unless they are necessary to understand the decision.

### 8. Quantify the development recommendation

Conclude with:

- proceed, conditional proceed, redesign, defer, or stop;
- target buyer and occupier;
- product type and positioning;
- recommended scale and density range;
- unit mix and saleable-area ranges;
- net launch price and price-per-area range;
- monthly and annual sales velocity;
- phase sizes and release sequence;
- launch and completion window;
- facilities, parking, lift, and operating-cost implications;
- base, upside, and downside cases;
- monitoring, repricing, redesign, deferral, and stop triggers.

Trace each recommendation to evidence and state assumptions. Route material commercial assumptions and recommendation disagreements to human Gate 3.

### 9. Red-team and issue

Run an independent AI review that attempts to disprove the preferred recommendation. Test:

- comparable-selection bias;
- price-basis inconsistencies;
- sales-versus-booking confusion;
- optimistic absorption;
- pipeline omissions;
- affordability weakness;
- investor concentration;
- conclusions that depend on a single source;
- results that change materially when outliers are removed.

Rerun validation after material data changes. Issue only when strict validation passes or all remaining exceptions are explicitly accepted at human Gate 4.

## Human gates

Keep senior human involvement limited to:

- **Gate 1 - scope:** approve material scope and commercial constraints;
- **Gate 2 - evidence:** resolve critical contradictions or unavailable decisive evidence;
- **Gate 3 - recommendation:** challenge price, velocity, scale, phasing, and target buyer;
- **Gate 4 - issuance:** accept residual risk and sign off the final decision.

Do not stop for nonmaterial preferences. Record them and continue with the most defensible assumption.

## Resource map

- [methodology.md](references/methodology.md): analytical stages, outputs, market-cycle logic, and recommendation design.
- [data-model.md](references/data-model.md): definitions, fields, schemas, and record relationships.
- [source-strategy.md](references/source-strategy.md): source hierarchy, collection planning, and geographic adaptation.
- [quality-gates.md](references/quality-gates.md): confidence treatment, exceptions, red-team tests, and issuance requirements.
- `references/schemas/`: machine-readable JSON schemas.
- `references/rules/`: confidence and comparable-scoring configuration.
- `assets/templates/`: inception, project-profile, recommendation, and report templates.
- `scripts/init_study.py`: initialize a study workspace.
- `scripts/validate_study.py`: validate data and create the exception queue.
- `scripts/calculate_metrics.py`: calculate market, pricing, and absorption metrics.
- `scripts/score_comparables.py`: score and classify comparable projects.

## Completion standard

Do not call a study complete until:

- material claims have evidence IDs;
- critical calculations come from deterministic outputs;
- sales and bookings remain separate;
- gross, net, asking, and achieved price bases remain clear;
- geography and data periods are explicit;
- direct, aspirational, and control evidence are represented;
- recommendations are quantified and traceable;
- downside conditions and triggers are stated;
- strict validation passes or residual exceptions are approved.
