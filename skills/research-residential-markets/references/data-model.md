# Data Model and Definitions

## Contents

1. Record relationships
2. Study configuration
3. Evidence records
4. Supply records
5. Transaction records
6. Project records
7. Definitions
8. Extension rules

## 1. Record relationships

Use evidence records as the traceability layer:

```text
evidence_id <- source_ids in supply records
evidence_id <- source_ids in transaction records
evidence_id <- source_ids in project records
```

Store atomic source-backed claims in `evidence/evidence.jsonl`. Store normalized analytical records in JSON arrays under `data/`.

Schemas:

- `schemas/study-config.schema.json`
- `schemas/evidence.schema.json`
- `schemas/supply.schema.json`
- `schemas/transaction.schema.json`
- `schemas/project.schema.json`

## 2. Study configuration

Required fields:

- `study_id`: stable lowercase slug.
- `study_name`: human-readable title.
- `market`: primary city or market.
- `country`: country.
- `data_cutoff`: ISO date.
- `decision_statement`: development question.
- `geographies`: macro region, jurisdiction, submarkets, site catchment, competitive market.
- `product_scope`: included residential products and segments.
- `human_gates`: gate owners and approval status.

Optional fields include site coordinates, land area, tenure, planning basis, proposed scale, target launch, target completion, target buyers, and commercial constraints.

## 3. Evidence records

Required fields:

- `evidence_id`: unique identifier.
- `claim`: atomic claim or source statement.
- `source_type`: controlled category.
- `source_reference`: document, URL, interview, or database reference.
- `source_date`: source publication or survey date.
- `accessed_date`: date acquired.
- `confidence`: 0 to 1.
- `verification_status`: verified, corroborated, single-source, disputed, or rejected.

Recommended fields:

- `value` and `unit`;
- `geography`;
- `project_id`;
- `evidence_location` such as page, table, row, or paragraph;
- `notes` preserving ambiguity or source wording;
- `materiality`: critical, material, or supporting.

Use one record per claim when claims have different confidence, sources, dates, or meanings.

## 4. Supply records

Required fields:

- `record_id`;
- `period_year`;
- `geography`;
- `property_type`;
- `status`: existing, incoming, or planned;
- `units`;
- `source_ids`.

Recommended fields:

- `submarket`;
- `tenure`;
- `project_id`;
- `expected_completion`;
- `delivery_confidence`;
- `segment`;
- `notes`.

Do not aggregate incoming and planned supply without retaining status. Planned supply can have materially lower delivery confidence.

## 5. Transaction records

Required fields:

- `transaction_id`;
- `date`;
- `geography`;
- `property_type`;
- `market_type`: primary or secondary;
- `record_kind`: individual or aggregate;
- `currency`;
- `source_ids`.

Recommended fields:

- `project_id`;
- `submarket`;
- `area_sqft`;
- `price_psf`;
- individual `price`;
- aggregate `volume` and `total_value`;
- aggregate `median_price` and `median_price_psf`, where published;
- aggregate `period_label`, `period_start`, `period_end`, `period_coverage`, and `comparison_group`;
- `bedrooms`;
- `tenure`;
- `price_basis`: gross, net, asking, achieved, or unknown;
- `segment`;
- `notes`.

Calculate `price_psf` from price and area where both are reliable. Do not use asking-price records as achieved transactions.

## 6. Project records

Required fields:

- `project_id`;
- `project_name`;
- `geography`;
- `product_type`;
- `total_units`;
- `source_ids`.

Recommended identity and physical fields:

- developer, location, coordinates, submarket;
- tenure and title;
- blocks, storeys, units per floor, lifts, parking;
- unit mix and size range;
- facilities and furnishing;
- launch date and expected completion.

Recommended performance and pricing fields:

- units released;
- verified sales;
- reported bookings;
- recent-period sales;
- survey date;
- gross and net price ranges;
- size range and net price-per-area range;
- maintenance and sinking fund;
- remaining inventory;
- target buyer;
- rental evidence.

Comparable fields:

- `comparable_scores`: seven 0-to-5 similarity scores;
- `performance_class`: strong, average, weak, or unknown;
- `comparison_role_override`: direct, aspirational, control, contextual, or excluded;
- `override_reason`.

## 7. Definitions

| Term | Controlled meaning |
|---|---|
| Existing supply | Completed units at the data cut-off |
| Incoming supply | Units under construction with a completion program |
| Planned supply | Approved or announced units not yet under construction |
| Future supply | State explicitly whether incoming only or incoming plus planned |
| Verified sale | Executed sale, where verification permits |
| Booking | Reserved unit not confirmed as a sale |
| Remaining inventory | Total or released units less verified sales; state basis |
| Overhang | Applicable official definition; not automatically all unsold stock |
| Gross price | Published price before discounts and incentives |
| Net effective price | Price after disclosed discounts and incentives |
| Asking price | Advertised seller or developer price |
| Achieved price | Verified transaction price |
| Saleable area | Pricing-area basis explicitly defined |
| Sales rate | Verified sales divided by released or total units; state denominator |
| Absorption | Units sold in a stated period |

## 8. Extension rules

When adding fields:

1. Update the corresponding schema.
2. Update the validator if the field creates a new integrity rule.
3. Define the field and units here.
4. Preserve backward compatibility where reasonable.
5. Avoid duplicating the same fact under different names.
6. Keep raw source wording in evidence records and normalized values in data records.
