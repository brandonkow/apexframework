from __future__ import annotations

import argparse
from datetime import date
import json
from pathlib import Path
import shutil
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Initialize a controlled residential market study workspace.")
    parser.add_argument("--output", required=True, help="Parent directory for the study folder")
    parser.add_argument("--study-id", required=True, help="Lowercase slug used as the study folder name")
    parser.add_argument("--study-name", required=True, help="Human-readable study title")
    parser.add_argument("--market", required=True, help="Primary city or market")
    parser.add_argument("--country", required=True, help="Country")
    parser.add_argument("--cutoff", required=True, help="Data cut-off date in YYYY-MM-DD format")
    parser.add_argument("--product", action="append", dest="products", help="Included product; repeat as needed")
    parser.add_argument("--force", action="store_true", help="Allow creation in an existing empty study directory")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        date.fromisoformat(args.cutoff)
    except ValueError:
        print("ERROR: --cutoff must be an ISO date in YYYY-MM-DD format", file=sys.stderr)
        return 2

    if not args.study_id or any(character not in "abcdefghijklmnopqrstuvwxyz0123456789-" for character in args.study_id):
        print("ERROR: --study-id must use lowercase letters, digits, and hyphens only", file=sys.stderr)
        return 2

    study_dir = (Path(args.output).expanduser().resolve() / args.study_id)
    if study_dir.exists() and any(study_dir.iterdir()) and not args.force:
        print(f"ERROR: study directory is not empty: {study_dir}", file=sys.stderr)
        return 2

    for relative in ["evidence", "data", "analysis", "drafts", "outputs", "sources"]:
        (study_dir / relative).mkdir(parents=True, exist_ok=True)

    products = args.products or ["high-rise residential"]
    config = {
        "study_id": args.study_id,
        "study_name": args.study_name,
        "market": args.market,
        "country": args.country,
        "data_cutoff": args.cutoff,
        "decision_statement": (
            "Determine whether the proposed residential development can support the intended scale, price, "
            "sales velocity, product mix, and phasing."
        ),
        "site": {
            "address": "",
            "latitude": None,
            "longitude": None,
            "land_area": None,
            "land_area_unit": None,
            "tenure": None,
            "planning_basis": None
        },
        "geographies": {
            "macro_region": "",
            "jurisdiction": args.market,
            "submarkets": [],
            "site_catchment": "",
            "competitive_market": ""
        },
        "product_scope": products,
        "target_buyers": [],
        "target_launch": None,
        "target_completion": None,
        "proposed_units": None,
        "commercial_constraints": [],
        "human_gates": {
            "scope": "pending",
            "evidence": "pending",
            "recommendation": "pending",
            "issuance": "pending"
        }
    }

    (study_dir / "study-config.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    (study_dir / "evidence" / "evidence.jsonl").write_text("", encoding="utf-8")
    for filename in ["supply.json", "transactions.json", "projects.json"]:
        (study_dir / "data" / filename).write_text("[]\n", encoding="utf-8")

    skill_root = Path(__file__).resolve().parent.parent
    template_dir = skill_root / "assets" / "templates"
    for template_name in [
        "inception-brief.md",
        "project-profile.md",
        "development-recommendation.md",
        "report-outline.md"
    ]:
        source = template_dir / template_name
        destination = study_dir / "drafts" / template_name
        if source.exists():
            text = source.read_text(encoding="utf-8")
            text = text.replace("{{study_name}}", args.study_name)
            text = text.replace("{{market}}", args.market)
            text = text.replace("{{country}}", args.country)
            text = text.replace("{{data_cutoff}}", args.cutoff)
            destination.write_text(text, encoding="utf-8")

    manifest = {
        "study_directory": str(study_dir),
        "configuration": "study-config.json",
        "evidence": "evidence/evidence.jsonl",
        "datasets": ["data/supply.json", "data/transactions.json", "data/projects.json"],
        "next_steps": [
            "Complete study-config.json and approve Gate 1 scope.",
            "Collect atomic evidence and normalized datasets.",
            "Run validate_study.py, calculate_metrics.py, and score_comparables.py.",
            "Draft from the generated evidence and deterministic outputs."
        ]
    }
    (study_dir / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    print(study_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
