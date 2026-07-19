# Residential High-Rise DCF

Apex Analytic includes a deterministic five-year DCF workflow for testing whether a residential high-rise purchase price is supported by sustainable rental income and verified completed sales.

The calculator adapts `templates/residential-high-rise-buyer-dcf.xlsx`. It does not change the founder-authored framework or its 407-question source record.

## What The Result Means

- **Income-based screening value**: DCF output based on rent, occupancy, owner costs, discount rate, and terminal capitalization. This is not market value by itself.
- **Reconciled screening indication**: the average of the income approach and adjusted sales comparison approach when at least three eligible completed sales are supplied but other evidence is incomplete.
- **Evidence-supported indicative market value**: shown only when there are at least three recent verified arm's-length transactions, supported achieved rent, current JMB or MC cost evidence, and written rationales for the discount and terminal capitalization rates.

Asking prices, advertised rents, stale transactions, and unverified or non-arm's-length sales do not satisfy the market-evidence gate.

## User Workflow

1. Open **Deal** and enter the project, area, asking price, expected monthly rent, all-in monthly maintenance plus sinking fund, and floor area.
2. Expand **DCF / Value Model** inside the same Deal card.
3. Enter occupancy, growth, financing, and evidence assumptions.
4. Add three completed comparable sales with transaction dates, prices, floor areas, sources, and adjustments.
5. Select **Calculate DCF** to add a structured value card to the conversation.
6. Select **Download Excel** to generate the populated five-year workbook.

The workbook contains Summary, Residential DCF, Comparison Approach, and Sources & Guidance sheets. Formula caches are populated for reliable previews, and Excel is instructed to recalculate the workbook when opened.

## Core Calculation

The property value is calculated before financing and personal tax:

```text
Effective gross income
- owner operating expenses
= net operating income

DCF value
= present value of forecast NOI
+ present value of net terminal sale proceeds
```

Mortgage payments, acquisition cash, DSCR, cash-on-cash return, simplified income tax, RPGT screening, and levered equity IRR are reported separately because they affect the buyer's return rather than the unlevered property value.

## API

`POST /api/tools/residential-dcf` returns the structured calculation.

`POST /api/tools/residential-dcf/workbook` returns an `.xlsx` download using the same inputs and result.

Both endpoints accept `dealCard`, `financialProfile`, and `valuation` objects. The workbook endpoint uses the attached template's fixed five-year horizon.

## Guardrails

- A purchase price, floor area, monthly market rent, discount rate, and terminal capitalization rate are required.
- The discount rate must exceed the terminal capitalization rate.
- Terminal value concentration above 80% is flagged.
- DSCR below the selected minimum is flagged.
- Fewer than three eligible completed sales prevents a market-value label.
- Results are decision-support estimates, not valuation reports, investment recommendations, mortgage offers, legal opinions, or tax computations.

Actual rent, completed transactions, strata liabilities, title restrictions, special assessments, financing terms, and buyer tax treatment must be verified for the subject unit.
