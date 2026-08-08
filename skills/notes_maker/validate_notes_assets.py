#!/usr/bin/env python3
"""Validate Markdown image links and basic note-document structure."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--notes", required=True, type=Path)
    args = parser.parse_args()
    text = args.notes.read_text(encoding="utf-8")
    errors: list[str] = []
    for required in ("# Chapter", "## Source map", "Formula", "Definition", "Exam-oriented review"):
        if required.lower() not in text.lower():
            errors.append(f"missing required content: {required}")
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        target = args.notes.parent / match.group(1)
        if not target.exists():
            errors.append(f"missing image: {match.group(1)}")
    if errors:
        print("\n".join(errors))
        return 1
    print("Notes structure and image links are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
