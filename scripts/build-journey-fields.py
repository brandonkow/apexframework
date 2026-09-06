"""Derive journey controls from the existing application input contract."""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Controls(HTMLParser):
    def __init__(self):
        super().__init__()
        self.fields = {}
        self.label = ""
        self.in_label = False
        self.field = None
        self.option = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "label":
            self.in_label, self.label = True, ""
        key = attrs.get("data-deal-field") or attrs.get("data-profile-field")
        if key:
            self.field = key
            self.fields[key] = {
                "key": key,
                "scope": "dealCard" if "data-deal-field" in attrs else "financialProfile",
                "label": self.label.strip(),
                "type": tag,
                "placeholder": attrs.get("placeholder", ""),
                "inputMode": attrs.get("inputmode", "text"),
                "options": [],
            }
        if tag == "option" and self.field:
            self.option = {"value": attrs.get("value"), "label": ""}

    def handle_data(self, data):
        if self.option is not None:
            self.option["label"] += data
        elif self.in_label and self.field is None:
            self.label += data

    def handle_endtag(self, tag):
        if tag == "option" and self.option is not None:
            label = self.option["label"].strip()
            value = label if self.option["value"] is None else self.option["value"]
            if value:
                self.fields[self.field]["options"].append({"value": value, "label": label})
            self.option = None
        if tag == "label":
            self.in_label, self.field = False, None


parser = Controls()
parser.feed((ROOT / "ui/workspace/panels.html").read_text(encoding="utf-8"))
output = ROOT / "public/journey/fields.json"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(parser.fields, indent=2) + "\n", encoding="utf-8", newline="\n")
print(f"Exported {len(parser.fields)} existing controls to {output}")
