# Quality Gates and Exception Management

## Contents

1. Confidence treatment
2. Exception severity
3. Human gates
4. Automated checks
5. Red-team tests
6. Issuance standard

## 1. Confidence treatment

Default treatment:

| Confidence | Treatment |
|---:|---|
| 0.80-1.00 | Include automatically if definitions match |
| 0.60-0.79 | Include with caveat or corroboration request |
| Below 0.60 | Exclude from decisive conclusions or route to exception |

Confidence does not override contradiction. A high-confidence record can still be incompatible with another source because of different dates, definitions, or geographies.

## 2. Exception severity

### Critical

- missing decisive source;
- contradictory material price, sales, supply, or planning evidence;
- sales exceeding units released or total units;
- material data after the cut-off;
- unsupported recommendation price or velocity;
- inconsistent price or area basis that changes the conclusion;
- final report claim without traceable evidence.

Critical exceptions block final issuance unless explicitly accepted.

### Warning

- single-source material claim;
- medium-confidence evidence;
- missing optional field;
- older evidence used with a caveat;
- approximate project completion or survey date;
- limited rental evidence in a mainly owner-occupier study.

Warnings do not automatically block analysis.

### Information

- formatting improvement;
- nonmaterial missing detail;
- explanatory note or optional follow-up.

## 3. Human gates

### Gate 1 - Scope

Approve only choices that could change the study answer: geography, site, product, scale, buyer, timing, or commercial constraints.

### Gate 2 - Evidence

Review critical contradictions, unavailable decisive evidence, and low-confidence facts used in material conclusions. Present the competing evidence, estimated effect, and recommended treatment.

### Gate 3 - Recommendation

Challenge price, velocity, scale, density, unit mix, target buyer, and phasing. Show sensitivity rather than asking for general approval.

### Gate 4 - Issuance

Accept residual exceptions and approve the final decision. Do not ask the human to repeat automated checks.

## 4. Automated checks

Validate:

- required fields and types;
- evidence ID uniqueness;
- cross-file evidence references;
- ISO dates and data-cut-off compliance;
- nonnegative units, price, and area;
- sales and release constraints;
- gross-versus-net price logic;
- reported bookings remain distinct;
- transaction price-per-area consistency;
- comparable score ranges and overrides;
- presence of direct, aspirational, and control evidence;
- deterministic metric generation;
- source and period labels in outputs.

## 5. Red-team tests

Attempt to disprove the recommendation:

1. Remove aspirational comparables.
2. Remove price and velocity outliers.
3. Substitute net or achieved prices for advertised prices.
4. Treat all bookings as unconfirmed.
5. Delay pipeline completions into the subject completion year.
6. Reduce transaction depth and monthly absorption.
7. Increase direct-competitor overlap.
8. Test affordability at higher financing cost.
9. Reduce rental or occupancy assumptions.
10. Check whether one source or project drives the conclusion.

Record whether each test changes the decision, product, price, scale, or timing.

## 6. Issuance standard

Issue only when:

- strict validation passes or residual critical exceptions are accepted;
- material claims have evidence IDs;
- calculations are reproducible;
- price and area bases are explicit;
- bookings and sales remain separate;
- comparable groups are balanced;
- recommendations are quantified and traceable;
- base, upside, and downside cases are present;
- monitoring and intervention triggers are defined;
- limitations are visible to the decision-maker.
