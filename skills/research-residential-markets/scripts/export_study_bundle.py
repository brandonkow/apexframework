from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path
import sys

from schema_utils import load_json, load_jsonl, write_json


FORMAT = "apex-research-study.v1"
APPROVED_GATES = {"approved", "not-required"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export a strictly validated market study for Apex Analytic.")
    parser.add_argument("study_directory")
    parser.add_argument("--output", help="Optional output JSON path")
    return parser.parse_args()


def required_json(path: Path):
    if not path.exists():
        raise ValueError(f"Required study output is missing: {path}")
    return load_json(path)


def main() -> int:
    args = parse_args()
    study_dir = Path(args.study_directory).expanduser().resolve()
    try:
        config = required_json(study_dir / "study-config.json")
        evidence = load_jsonl(study_dir / "evidence" / "evidence.jsonl")
        supply = required_json(study_dir / "data" / "supply.json")
        transactions = required_json(study_dir / "data" / "transactions.json")
        projects = required_json(study_dir / "data" / "projects.json")
        metrics = required_json(study_dir / "analysis" / "metrics.json")
        comparable_scores = required_json(study_dir / "analysis" / "comparable-scores.json")
        validation = required_json(study_dir / "analysis" / "validation-report.json")
    except (OSError, ValueError, TypeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    summary = validation.get("summary", {})
    if validation.get("strict_mode") is not True or summary.get("critical_errors") != 0:
        print("ERROR: Run validate_study.py --strict successfully before exporting.", file=sys.stderr)
        return 1

    pending = [
        gate for gate in ["scope", "evidence", "recommendation", "issuance"]
        if config.get("human_gates", {}).get(gate) not in APPROVED_GATES
    ]
    if pending:
        print(f"ERROR: Human gates are not approved: {', '.join(pending)}", file=sys.stderr)
        return 1

    if not all(isinstance(dataset, list) and dataset for dataset in [evidence, supply, transactions, projects]):
        print("ERROR: Evidence, supply, transactions, and projects must all contain records.", file=sys.stderr)
        return 1

    bundle = {
        "format": FORMAT,
        "exported_at": datetime.now(timezone.utc).isoformat(),
        "study_config": config,
        "evidence": evidence,
        "supply": supply,
        "transactions": transactions,
        "projects": projects,
        "metrics": metrics,
        "comparable_scores": comparable_scores,
        "validation": validation
    }
    default_name = f"{config.get('study_id', 'market-study')}-apex-bundle.json"
    output_path = Path(args.output).expanduser().resolve() if args.output else study_dir / "outputs" / default_name
    write_json(output_path, bundle)
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
