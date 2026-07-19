from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from schema_utils import load_json, write_json


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Score and classify residential comparable projects.")
    parser.add_argument("study_directory")
    return parser.parse_args()


def classify(score: float, performance_class: str, rules: dict[str, Any]) -> str:
    thresholds = rules["classification"]
    if performance_class == rules.get("control_performance_class") and score >= thresholds["control_minimum"]:
        return "control"
    if score >= thresholds["direct_minimum"]:
        return "direct"
    if score >= thresholds["aspirational_minimum"]:
        return "aspirational"
    if score >= thresholds["contextual_minimum"]:
        return "contextual"
    return "excluded"


def main() -> int:
    args = parse_args()
    study_dir = Path(args.study_directory).expanduser().resolve()
    skill_root = Path(__file__).resolve().parent.parent
    rules = load_json(skill_root / "references" / "rules" / "comparable-weights.json")
    projects = load_json(study_dir / "data" / "projects.json")
    results: list[dict[str, Any]] = []

    for project in projects:
        scores = project.get("comparable_scores") or {}
        missing = [key for key in rules["weights"] if not isinstance(scores.get(key), (int, float))]
        if missing:
            results.append({
                "project_id": project.get("project_id"),
                "project_name": project.get("project_name"),
                "weighted_score": None,
                "classification": "unscored",
                "missing_scores": missing,
                "override_used": False
            })
            continue

        weighted_score = sum(float(scores[key]) * weight for key, weight in rules["weights"].items())
        override = project.get("comparison_role_override")
        if override:
            classification = override
            override_used = True
        else:
            classification = classify(weighted_score, project.get("performance_class", "unknown"), rules)
            override_used = False

        results.append({
            "project_id": project.get("project_id"),
            "project_name": project.get("project_name"),
            "weighted_score": round(weighted_score, 4),
            "classification": classification,
            "performance_class": project.get("performance_class", "unknown"),
            "override_used": override_used,
            "override_reason": project.get("override_reason") if override_used else None,
            "scores": scores
        })

    counts = Counter(result["classification"] for result in results)
    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "rules": rules,
        "classification_counts": dict(sorted(counts.items())),
        "projects": sorted(
            results,
            key=lambda item: (item["weighted_score"] is None, -(item["weighted_score"] or 0), str(item["project_name"]))
        )
    }
    output_path = study_dir / "analysis" / "comparable-scores.json"
    write_json(output_path, output)
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
