from __future__ import annotations

import argparse
from collections import defaultdict
from datetime import date, datetime, timezone
from pathlib import Path
from statistics import median
from typing import Any, Iterable

from schema_utils import load_json, parse_iso_date, write_json


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Calculate deterministic residential market metrics.")
    parser.add_argument("study_directory")
    return parser.parse_args()


def safe_divide(numerator: float | int | None, denominator: float | int | None) -> float | None:
    if numerator is None or denominator in {None, 0}:
        return None
    return numerator / denominator


def percentage_change(current: float | int | None, previous: float | int | None) -> float | None:
    ratio = safe_divide((current or 0) - (previous or 0), previous)
    return ratio


def cagr(start: float | int | None, end: float | int | None, years: int) -> float | None:
    if not start or end is None or end < 0 or years <= 0:
        return None
    return (end / start) ** (1 / years) - 1


def months_between(start: date | None, end: date | None) -> float | None:
    if not start or not end or end < start:
        return None
    days = (end - start).days
    return max(days / 30.4375, 1 / 30.4375)


def numeric(values: Iterable[Any]) -> list[float]:
    return [float(value) for value in values if isinstance(value, (int, float)) and not isinstance(value, bool)]


def group_sum(records: list[dict[str, Any]], key: str, value_key: str) -> dict[str, float]:
    result: defaultdict[str, float] = defaultdict(float)
    for record in records:
        value = record.get(value_key)
        if isinstance(value, (int, float)):
            result[str(record.get(key) or "Unspecified")] += value
    return dict(sorted(result.items()))


def supply_metrics(records: list[dict[str, Any]]) -> dict[str, Any]:
    latest_year_by_status: dict[str, int] = {}
    for status in ["existing", "incoming", "planned"]:
        years = [record["period_year"] for record in records if record.get("status") == status and isinstance(record.get("period_year"), int)]
        if years:
            latest_year_by_status[status] = max(years)

    latest_records: dict[str, list[dict[str, Any]]] = {}
    totals: dict[str, int] = {}
    for status, latest_year in latest_year_by_status.items():
        selected = [record for record in records if record.get("status") == status and record.get("period_year") == latest_year]
        latest_records[status] = selected
        totals[status] = sum(int(record.get("units", 0)) for record in selected)

    existing = totals.get("existing", 0)
    future = totals.get("incoming", 0) + totals.get("planned", 0)
    history: defaultdict[int, int] = defaultdict(int)
    for record in records:
        if record.get("status") == "existing" and isinstance(record.get("period_year"), int):
            history[record["period_year"]] += int(record.get("units", 0))

    all_latest = [record for selected in latest_records.values() for record in selected]
    return {
        "latest_year_by_status": latest_year_by_status,
        "latest_totals": totals,
        "future_units": future,
        "pipeline_pressure": safe_divide(future, existing),
        "existing_history": [{"year": year, "units": units} for year, units in sorted(history.items())],
        "latest_by_geography": group_sum(all_latest, "geography", "units"),
        "latest_by_property_type": group_sum(all_latest, "property_type", "units"),
        "latest_by_status_and_geography": {
            status: group_sum(selected, "geography", "units") for status, selected in latest_records.items()
        }
    }


def transaction_metrics(records: list[dict[str, Any]], cutoff: date | None) -> dict[str, Any]:
    periods: dict[str, dict[str, Any]] = {}

    def get_period(record: dict[str, Any], record_date: date) -> dict[str, Any]:
        if record.get("record_kind") == "aggregate":
            label = str(record.get("period_label") or record_date.isoformat())
            start = parse_iso_date(record.get("period_start")) or record_date
            end = parse_iso_date(record.get("period_end")) or record_date
            coverage = str(record.get("period_coverage") or "custom")
            comparison_group = str(record.get("comparison_group") or coverage)
        else:
            label = f"year-{record_date.year}"
            start = date(record_date.year, 1, 1)
            end = date(record_date.year, 12, 31)
            if cutoff and record_date.year == cutoff.year and cutoff < end:
                end = cutoff
                coverage = "year-to-date"
                comparison_group = f"ytd-{cutoff.month:02d}-{cutoff.day:02d}"
                label = f"ytd-{record_date.year}-{cutoff.month:02d}-{cutoff.day:02d}"
            else:
                coverage = "full-year"
                comparison_group = "full-year"
        if label not in periods:
            periods[label] = {
                "period_label": label,
                "period_start": start,
                "period_end": end,
                "period_coverage": coverage,
                "comparison_group": comparison_group,
                "volume": 0,
                "value": 0.0,
                "individual_prices": [],
                "individual_psf": [],
                "reported_medians": [],
                "reported_median_psf": [],
                "by_geography": defaultdict(lambda: {"volume": 0, "value": 0.0}),
                "by_property_type": defaultdict(lambda: {"volume": 0, "value": 0.0})
            }
        return periods[label]

    for record in records:
        record_date = parse_iso_date(record.get("date"))
        if not record_date:
            continue
        period = get_period(record, record_date)
        if record.get("record_kind") == "aggregate":
            volume = int(record.get("volume") or 0)
            value = float(record.get("total_value") or 0)
            if isinstance(record.get("median_price"), (int, float)):
                period["reported_medians"].append(float(record["median_price"]))
            if isinstance(record.get("median_price_psf"), (int, float)):
                period["reported_median_psf"].append(float(record["median_price_psf"]))
        else:
            volume = 1
            value = float(record.get("price") or 0)
            if value:
                period["individual_prices"].append(value)
            psf = record.get("price_psf")
            if not isinstance(psf, (int, float)) and isinstance(record.get("area_sqft"), (int, float)) and record.get("area_sqft"):
                psf = value / float(record["area_sqft"])
            if isinstance(psf, (int, float)):
                period["individual_psf"].append(float(psf))

        period["volume"] += volume
        period["value"] += value
        for collection_name, key in [
            ("by_geography", str(record.get("geography") or "Unspecified")),
            ("by_property_type", str(record.get("property_type") or "Unspecified"))
        ]:
            period[collection_name][key]["volume"] += volume
            period[collection_name][key]["value"] += value

    period_rows: list[dict[str, Any]] = []
    for data in sorted(periods.values(), key=lambda item: (item["period_end"], item["period_label"])):
        period_rows.append({
            "period_label": data["period_label"],
            "period_start": data["period_start"].isoformat(),
            "period_end": data["period_end"].isoformat(),
            "period_coverage": data["period_coverage"],
            "comparison_group": data["comparison_group"],
            "volume": data["volume"],
            "value": data["value"],
            "median_individual_price": median(data["individual_prices"]) if data["individual_prices"] else None,
            "median_individual_price_psf": median(data["individual_psf"]) if data["individual_psf"] else None,
            "median_of_reported_medians": median(data["reported_medians"]) if data["reported_medians"] else None,
            "median_of_reported_median_psf": median(data["reported_median_psf"]) if data["reported_median_psf"] else None,
            "by_geography": dict(sorted(data["by_geography"].items())),
            "by_property_type": dict(sorted(data["by_property_type"].items()))
        })

    comparison_groups: defaultdict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in period_rows:
        comparison_groups[row["comparison_group"]].append(row)

    comparisons: list[dict[str, Any]] = []
    for group, group_rows in sorted(comparison_groups.items()):
        if len(group_rows) < 2:
            continue
        previous, current = group_rows[-2], group_rows[-1]
        comparisons.append({
            "comparison_group": group,
            "previous_period": previous["period_label"],
            "current_period": current["period_label"],
            "volume_change": percentage_change(current["volume"], previous["volume"]),
            "value_change": percentage_change(current["value"], previous["value"])
        })

    full_years = [row for row in period_rows if row["comparison_group"] == "full-year"]
    full_year_trend: dict[str, Any] = {}
    if len(full_years) >= 2:
        first, last = full_years[0], full_years[-1]
        first_year = parse_iso_date(first["period_end"]).year
        last_year = parse_iso_date(last["period_end"]).year
        full_year_trend = {
            "start_period": first["period_label"],
            "end_period": last["period_label"],
            "volume_cagr": cagr(first["volume"], last["volume"], last_year - first_year),
            "value_cagr": cagr(first["value"], last["value"], last_year - first_year)
        }

    return {
        "periods": period_rows,
        "like_for_like_comparisons": comparisons,
        "full_year_trend": full_year_trend,
        "comparison_note": "Changes are calculated only within matching comparison_group values; partial and full years are not compared."
    }


def project_metrics(records: list[dict[str, Any]], cutoff: date | None) -> dict[str, Any]:
    results: list[dict[str, Any]] = []
    for record in records:
        launch = parse_iso_date(record.get("launch_date"))
        survey = parse_iso_date(record.get("survey_date")) or cutoff
        elapsed_months = months_between(launch, survey)
        sales = record.get("verified_sales")
        released = record.get("units_released")
        total = record.get("total_units")
        recent_sales = record.get("recent_sales")
        recent_months = record.get("recent_sales_months")
        since_launch_velocity = safe_divide(sales, elapsed_months)
        recent_velocity = safe_divide(recent_sales, recent_months)
        observed_velocity = recent_velocity if recent_velocity is not None else since_launch_velocity
        velocity_basis = "recent-period" if recent_velocity is not None else "since-launch"
        remaining = total - sales if isinstance(total, int) and isinstance(sales, int) else None
        psf_low = safe_divide(record.get("net_price_min"), record.get("size_sqft_max"))
        psf_high = safe_divide(record.get("net_price_max"), record.get("size_sqft_min"))
        results.append({
            "project_id": record.get("project_id"),
            "project_name": record.get("project_name"),
            "elapsed_months": elapsed_months,
            "sales_rate_on_released": safe_divide(sales, released),
            "sales_rate_on_total": safe_divide(sales, total),
            "since_launch_monthly_velocity": since_launch_velocity,
            "recent_monthly_velocity": recent_velocity,
            "observed_monthly_velocity": observed_velocity,
            "velocity_basis": velocity_basis,
            "remaining_total_units": remaining,
            "months_of_inventory_at_observed_velocity": safe_divide(remaining, observed_velocity),
            "net_price_psf_envelope_low": psf_low,
            "net_price_psf_envelope_high": psf_high,
            "reported_bookings": record.get("reported_bookings")
        })

    velocities = numeric(result.get("observed_monthly_velocity") for result in results)
    months_inventory = numeric(result.get("months_of_inventory_at_observed_velocity") for result in results)
    return {
        "projects": results,
        "summary": {
            "project_count": len(results),
            "median_observed_monthly_velocity": median(velocities) if velocities else None,
            "median_months_of_inventory": median(months_inventory) if months_inventory else None
        }
    }


def main() -> int:
    args = parse_args()
    study_dir = Path(args.study_directory).expanduser().resolve()
    config = load_json(study_dir / "study-config.json")
    supply = load_json(study_dir / "data" / "supply.json")
    transactions = load_json(study_dir / "data" / "transactions.json")
    projects = load_json(study_dir / "data" / "projects.json")
    cutoff = parse_iso_date(config.get("data_cutoff"))

    output = {
        "study_id": config.get("study_id"),
        "data_cutoff": config.get("data_cutoff"),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "supply": supply_metrics(supply),
        "transactions": transaction_metrics(transactions, cutoff),
        "projects": project_metrics(projects, cutoff)
    }
    output_path = study_dir / "analysis" / "metrics.json"
    write_json(output_path, output)
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
