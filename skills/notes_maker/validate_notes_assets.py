#!/usr/bin/env python3
"""Validate Markdown image links, LaTeX formatting, and note-document structure."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def validate_notes(notes_path: Path) -> list[str]:
    text = notes_path.read_text(encoding="utf-8")
    errors: list[str] = []

    # 1. Basic structural requirements check
    for required in ("# Chapter", "Formula", "Definition", "Exam-oriented review"):
        if required.lower() not in text.lower():
            errors.append(f"missing required content section/keyword: {required}")

    # 2. Image link validation (images must exist in parent/images directory or relative path)
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        img_path_str = match.group(1).split()[0]  # ignore any title string inside quotes if present
        if img_path_str.startswith("http://") or img_path_str.startswith("https://"):
            continue
        target = notes_path.parent / img_path_str
        if not target.exists():
            errors.append(f"missing embedded image asset: {img_path_str}")

    # 3. LaTeX Display Math delimiter validation ($$ must be on standalone lines)
    lines = text.splitlines()
    for idx, line in enumerate(lines, start=1):
        if "$$" in line:
            stripped = line.strip()
            if stripped != "$$":
                errors.append(f"Line {idx}: Display math delimiter '$$' must be on its own standalone line. Found: '{line}'")

    # 4. MathJax relational operator check outside math blocks (< or > in text)
    # Check for unescaped standalone < or > characters outside code blocks / math blocks
    in_code_block = False
    in_display_math = False

    for idx, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if stripped == "$$":
            in_display_math = not in_display_math
            continue

        if not in_code_block and not in_display_math:
            # Mask out inline math $...$
            line_no_math = re.sub(r"\$[^$]+\$", "", line)
            # Mask out Markdown links and HTML tags like <http...> or explicit html tags like <div>
            line_clean = re.sub(r"<https?://[^>]+>", "", line_no_math)
            line_clean = re.sub(r"<[a-zA-Z0-9_-]+(\s+[^>]*)?>", "", line_clean)
            line_clean = re.sub(r"</[a-zA-Z0-9_-]+>", "", line_clean)

            # Check for unescaped standalone comparison operators (e.g. "a < b" or "a > b")
            if re.search(r"\b\w+\s+[<>]\s+\w+\b", line_clean):
                errors.append(f"Line {idx}: Relational operator '<' or '>' found outside LaTeX math block. Wrap in $...$ or use &lt;/&gt;. Found: '{line}'")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--notes", required=True, type=Path)
    args = parser.parse_args()

    if not args.notes.exists():
        print(f"Error: Notes file not found at {args.notes}")
        return 1

    errors = validate_notes(args.notes)
    if errors:
        print(f"Validation failed for {args.notes}:")
        print("\n".join(errors))
        return 1

    print(f"Notes structure, image links, and LaTeX syntax are valid for {args.notes}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
