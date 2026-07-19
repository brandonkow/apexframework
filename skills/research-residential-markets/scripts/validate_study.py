from __future__ import annotations

import argparse
from collections import Counter
from pathlib import Path
import sys
from typing import Any

from schema_utils import load_json, load_jsonl, parse_iso_date, validate_schema, write_json


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate a residential market study and create an exception report.")
    parser.add_argument("study_directory", help="Study directory created by init_study.py")
    parser.add_argument("--strict", action="store_true", help="Apply final-issuance coverage requirements")
    return parser.parse_args()


def issue(code: str, message: str, record_id: str | None = None) -> dict[str, Any]:
    result: dict[str, Any] = {"code": code, "message": message}
    if record_id:
        result["record_id"] = record_id
    return result


def main() -> int:
    args = parse_args()
    study_dir = Path(args.study_directory).expanduser().resolve()
    skill_root = Path(__file__).resolve().parent.parent
    schema_dir = skill_root / "references" / "schemas"
    critical: list[dict[str, Any]] = []
    warnings: list[dict[str, Any]] = []
    information: list[dict[str, Any]] = []

    def add_schema_errors(name: str, data: Any, schema_name: str) -> None:
        schema = load_json(schema_dir / schema_name)
        for message in validate_schema(data, schema):
            critical.append(issue("schema-error", f"{name}: {message}"))

    try:
        config = load_json(study_dir / "study-config.json")
        evidence = load_jsonl(study_dir / "evidence" / "evidence.jsonl")
        supply = load_json(study_dir / "data" / "supply.json")
        transactions = load_json(study_dir / "data" / "transactions.json")
        projects = load_json(study_dir / "data" / "projects.json")
    except (OSError, ValueError, TypeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    add_schema_errors("study-config.json", config, "study-config.schema.json")
    for index, record in enumerate(evidence):
        add_schema_errors(f"evidence.jsonl record {index + 1}", record, "evidence.schema.json")
    add_schema_errors("supply.json", supply, "supply.schema.json")
    add_schema_errors("transactions.json", transactions, "transaction.schema.json")
    add_schema_errors("projects.json", projects, "project.schema.json")

    cutoff = parse_iso_date(config.get("data_cutoff"))
    evidence_ids = [record.get("evidence_id") for record in evidence if record.get("evidence_id")]
    evidence_index = {record.get("evidence_id"): record for record in evidence if record.get("evidence_id")}
    for duplicate, count in Counter(evidence_ids).items():
        if count > 1:
            critical.append(issue("duplicate-evidence-id", f"Evidence ID appears {count} times", duplicate))

    def check_duplicate_ids(records: list[dict[str, Any]], key: str, dataset: str) -> None:
        values = [record.get(key) for record in records if record.get(key)]
        for duplicate, count in Counter(values).items():
            if count > 1:
                critical.append(issue("duplicate-record-id", f"{dataset}: {key} appears {count} times", str(duplicate)))

    if isinstance(supply, list):
        check_duplicate_ids(supply, "record_id", "supply.json")
    if isinstance(transactions, list):
        check_duplicate_ids(transactions, "transaction_id", "transactions.json")
    if isinstance(projects, list):
        check_duplicate_ids(projects, "project_id", "projects.json")

    for record in evidence:
        record_id = record.get("evidence_id")
        source_date = parse_iso_date(record.get("source_date"))
        confidence = record.get("confidence")
        status = record.get("verification_status")
        materiality = record.get("materiality", "supporting")
        if cutoff and source_date and source_date > cutoff:
            warnings.append(issue("post-cutoff-source", "Source was published after the study cut-off; verify its reference period", record_id))
        if isinstance(confidence, (int, float)):
            if confidence < 0.6 and materiality in {"critical", "material"}:
                critical.append(issue("low-confidence-material-evidence", "Material evidence has confidence below 0.60", record_id))
            elif confidence < 0.8 and materiality == "critical":
                warnings.append(issue("critical-evidence-review", "Critical evidence has confidence below 0.80", record_id))
        if status in {"disputed", "rejected"} and materiality == "critical":
            critical.append(issue("critical-evidence-disputed", f"Critical evidence is {status}", record_id))

    def check_source_ids(records: list[dict[str, Any]], id_key: str, dataset: str) -> None:
        for record in records:
            record_id = str(record.get(id_key, "unknown"))
            for source_id in record.get("source_ids", []):
                if source_id not in evidence_index:
                    critical.append(issue("missing-evidence-reference", f"{dataset} references unknown evidence ID {source_id!r}", record_id))
                    continue
                source_record = evidence_index[source_id]
                if source_record.get("verification_status") == "rejected":
                    critical.append(issue("rejected-evidence-reference", f"{dataset} references rejected evidence {source_id!r}", record_id))

    if isinstance(supply, list):
        check_source_ids(supply, "record_id", "supply.json")
        for record in supply:
            record_id = str(record.get("record_id", "unknown"))
            if cutoff and isinstance(record.get("period_year"), int) and record["period_year"] > cutoff.year:
                critical.append(issue("post-cutoff-supply-snapshot", "Supply snapshot year exceeds the data cut-off year", record_id))

    if isinstance(transactions, list):
        check_source_ids(transactions, "transaction_id", "transactions.json")
        for record in transactions:
            record_id = str(record.get("transaction_id", "unknown"))
            record_date = parse_iso_date(record.get("date"))
            if cutoff and record_date and record_date > cutoff:
                critical.append(issue("post-cutoff-transaction", "Transaction date exceeds the data cut-off", record_id))
            if record.get("record_kind") == "individual" and not isinstance(record.get("price"), (int, float)):
                critical.append(issue("missing-individual-price", "Individual transaction requires price", record_id))
            if record.get("record_kind") == "aggregate":
                if not isinstance(record.get("volume"), int) or not isinstance(record.get("total_value"), (int, float)):
                    critical.append(issue("missing-aggregate-values", "Aggregate transaction requires volume and total_value", record_id))
                required_period_fields = ["period_label", "period_start", "period_end", "period_coverage", "comparison_group"]
                missing_period_fields = [field for field in required_period_fields if not record.get(field)]
                if missing_period_fields:
                    critical.append(issue("missing-aggregate-period", f"Aggregate transaction is missing period metadata: {', '.join(missing_period_fields)}", record_id))
                period_start = parse_iso_date(record.get("period_start"))
                period_end = parse_iso_date(record.get("period_end"))
                if period_start and period_end and period_start > period_end:
                    critical.append(issue("invalid-aggregate-period", "Aggregate period_start exceeds period_end", record_id))
                if period_end and record_date and period_end != record_date:
                    warnings.append(issue("aggregate-date-mismatch", "Aggregate date should equal period_end", record_id))
            price = record.get("price")
            area = record.get("area_sqft")
            psf = record.get("price_psf")
            if all(isinstance(value, (int, float)) for value in [price, area, psf]) and area:
                calculated = price / area
                if abs(calculated - psf) / calculated > 0.05:
                    warnings.append(issue("price-psf-mismatch", "Recorded price_psf differs by more than 5% from price / area_sqft", record_id))

    if isinstance(projects, list):
        check_source_ids(projects, "project_id", "projects.json")
        for record in projects:
            record_id = str(record.get("project_id", "unknown"))
            total = record.get("total_units")
            released = record.get("units_released")
            sales = record.get("verified_sales")
            survey_date = parse_iso_date(record.get("survey_date"))
            if cutoff and survey_date and survey_date > cutoff:
                critical.append(issue("post-cutoff-project-survey", "Project survey date exceeds the data cut-off", record_id))
            if isinstance(total, int) and isinstance(released, int) and released > total:
                critical.append(issue("released-exceeds-total", "Units released exceed total units", record_id))
            if isinstance(total, int) and isinstance(sales, int) and sales > total:
                critical.append(issue("sales-exceed-total", "Verified sales exceed total units", record_id))
            if isinstance(released, int) and isinstance(sales, int) and sales > released:
                critical.append(issue("sales-exceed-released", "Verified sales exceed units released", record_id))
            for low_key, high_key in [
                ("gross_price_min", "gross_price_max"),
                ("net_price_min", "net_price_max"),
                ("size_sqft_min", "size_sqft_max")
            ]:
                low, high = record.get(low_key), record.get(high_key)
                if isinstance(low, (int, float)) and isinstance(high, (int, float)) and low > high:
                    critical.append(issue("range-reversed", f"{low_key} exceeds {high_key}", record_id))
            gross_min, net_min = record.get("gross_price_min"), record.get("net_price_min")
            if isinstance(gross_min, (int, float)) and isinstance(net_min, (int, float)) and net_min > gross_min:
                warnings.append(issue("net-exceeds-gross", "Minimum net price exceeds minimum gross price; verify inclusions and basis", record_id))
            if record.get("comparison_role_override") and not record.get("override_reason"):
                critical.append(issue("comparable-override-without-reason", "Comparable role override requires a reason", record_id))

    datasets = {
        "evidence": evidence,
        "supply": supply if isinstance(supply, list) else [],
        "transactions": transactions if isinstance(transactions, list) else [],
        "projects": projects if isinstance(projects, list) else []
    }
    for dataset_name, records in datasets.items():
        if not records:
            target = critical if args.strict else warnings
            target.append(issue("empty-dataset", f"{dataset_name} dataset is empty"))

    comparable_path = study_dir / "analysis" / "comparable-scores.json"
    if args.strict and comparable_path.exists():
        scores = load_json(comparable_path)
        counts = scores.get("classification_counts", {})
        if counts.get("direct", 0) < 1:
            critical.append(issue("missing-direct-comparable", "No direct comparable is classified"))
        if counts.get("control", 0) < 1:
            critical.append(issue("missing-control-comparable", "No control comparable is classified"))
        if counts.get("aspirational", 0) < 1:
            warnings.append(issue("missing-aspirational-comparable", "No aspirational comparable is classified"))

    if args.strict:
        for gate in ["scope", "evidence", "recommendation", "issuance"]:
            status = config.get("human_gates", {}).get(gate)
            if status not in {"approved", "not-required"}:
                critical.append(issue("human-gate-pending", f"Human gate {gate!r} is not approved"))

    report = {
        "study_directory": str(study_dir),
        "strict_mode": args.strict,
        "summary": {
            "critical_errors": len(critical),
            "warnings": len(warnings),
            "information": len(information),
            "evidence_records": len(evidence),
            "supply_records": len(supply) if isinstance(supply, list) else 0,
            "transaction_records": len(transactions) if isinstance(transactions, list) else 0,
            "project_records": len(projects) if isinstance(projects, list) else 0
        },
        "critical_errors": critical,
        "warnings": warnings,
        "information": information
    }
    write_json(study_dir / "analysis" / "validation-report.json", report)
    print(f"critical={len(critical)} warnings={len(warnings)} information={len(information)}")
    return 1 if critical else 0


if __name__ == "__main__":
    raise SystemExit(main())
