#!/usr/bin/env python3
"""Extract text, images, rendered pages, and OCR into a chapter manifest."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path


SUPPORTED = {".pdf", ".pptx", ".ppt", ".png", ".jpg", ".jpeg", ".tif", ".tiff"}


def safe_name(path: Path) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "_", path.stem).strip("_")


def run(command: list[str]) -> str:
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    if completed.returncode:
        raise RuntimeError(completed.stderr.strip() or "command failed")
    return completed.stdout


def pdf_text(pdf: Path, pdftotext: str | None) -> list[str]:
    if pdftotext:
        try:
            with tempfile.NamedTemporaryFile(suffix=".txt", delete=False) as temp:
                temp_path = Path(temp.name)
            try:
                run([pdftotext, "-layout", str(pdf), str(temp_path)])
                text = temp_path.read_text(encoding="utf-8", errors="replace")
            finally:
                temp_path.unlink(missing_ok=True)
            return [part.strip() for part in text.split("\f") if part.strip()]
        except RuntimeError:
            pass
    try:
        from pypdf import PdfReader  # type: ignore
        return [(page.extract_text() or "").strip() for page in PdfReader(str(pdf)).pages]
    except ImportError as error:
        raise RuntimeError("Install pypdf or provide --pdftotext for PDF text extraction") from error


def render_pdf(pdf: Path, target: Path, pdftoppm: str, dpi: int) -> list[Path]:
    target.mkdir(parents=True, exist_ok=True)
    prefix = target / safe_name(pdf)
    run([pdftoppm, "-png", "-r", str(dpi), str(pdf), str(prefix)])
    return sorted(target.glob(f"{prefix.name}-*.png"))


def extract_pdf_images(pdf: Path, target: Path) -> list[Path]:
    """Extract original embedded PDF images when PyMuPDF is installed."""
    try:
        import fitz  # type: ignore
    except ImportError:
        return []
    target.mkdir(parents=True, exist_ok=True)
    result: list[Path] = []
    document = fitz.open(pdf)
    for page_index, page in enumerate(document):
        for image_index, image in enumerate(page.get_images(full=True), start=1):
            xref = image[0]
            data = document.extract_image(xref)
            extension = data.get("ext", "png")
            output = target / f"{safe_name(pdf)}-page-{page_index + 1}-image-{image_index}.{extension}"
            output.write_bytes(data["image"])
            result.append(output)
    return result


def pptx_text_and_images(pptx: Path, target: Path) -> tuple[list[str], list[Path]]:
    """Extract slide text from XML and original media files without PowerPoint."""
    target.mkdir(parents=True, exist_ok=True)
    texts: list[str] = []
    images: list[Path] = []
    with zipfile.ZipFile(pptx) as archive:
        slides = sorted(
            (name for name in archive.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)),
            key=lambda name: int(re.search(r"slide(\d+)", name).group(1)),
        )
        for slide in slides:
            xml = archive.read(slide).decode("utf-8", errors="ignore")
            texts.append(" ".join(re.findall(r"<a:t>(.*?)</a:t>", xml)))
        for name in archive.namelist():
            if name.startswith("ppt/media/") and not name.endswith("/"):
                output = target / f"{safe_name(pptx)}-{Path(name).name}"
                output.write_bytes(archive.read(name))
                images.append(output)
    return texts, images


def ocr(image: Path, tesseract: str, language: str) -> str:
    try:
        return run([tesseract, str(image), "stdout", "-l", language]).strip()
    except RuntimeError as error:
        return f"[OCR failed: {error}]"


def role_for(path: Path) -> str:
    name = path.name.lower()
    if any(word in name for word in ("numerical", "problem", "exercise")):
        return "problem set"
    if any(word in name for word in ("tutorial", "question", "bank", "exam", "test")):
        return "tutorial/question bank"
    return "lecture material"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", required=True, type=Path, help="Directory containing PDFs, slides, and images")
    parser.add_argument("--output-dir", required=True, type=Path, help="Directory for images, text, and manifest JSON")
    parser.add_argument("--chapter", required=True, help="Chapter title or number recorded in the manifest")
    parser.add_argument("--aliases", nargs="*", default=[], help="Optional chapter filename/topic aliases")
    parser.add_argument("--include", nargs="*", default=[], help="Optional exact source filenames; omit to scan all supported files")
    parser.add_argument("--pdftoppm", default=shutil.which("pdftoppm"), help="Path to pdftoppm for PDF page rendering")
    parser.add_argument("--pdftotext", default=shutil.which("pdftotext"), help="Path to pdftotext; pypdf is fallback")
    parser.add_argument("--tesseract", help="Path to tesseract.exe; required with --ocr")
    parser.add_argument("--ocr", action="store_true", help="OCR rendered pages and extracted images")
    parser.add_argument("--language", default="eng", help="Tesseract language code")
    parser.add_argument("--dpi", type=int, default=180, help="PDF render resolution for OCR and review")
    parser.add_argument("--no-render", action="store_true", help="Do not render PDF pages; not recommended for visual material")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.ocr and not args.tesseract:
        raise SystemExit("--ocr requires --tesseract PATH")
    if not args.source_dir.is_dir():
        raise SystemExit(f"Source directory does not exist: {args.source_dir}")

    include = {item.lower() for item in args.include}
    sources = [
        path for path in sorted(args.source_dir.rglob("*"))
        if path.is_file() and path.suffix.lower() in SUPPORTED and (not include or path.name.lower() in include)
    ]
    if not sources:
        raise SystemExit("No matching supported source files found")

    args.output_dir.mkdir(parents=True, exist_ok=True)
    text_dir = args.output_dir / "text"
    image_dir = args.output_dir / "images"
    text_dir.mkdir(exist_ok=True)
    image_dir.mkdir(exist_ok=True)
    manifest: dict[str, object] = {"chapter": args.chapter, "aliases": args.aliases, "sources": []}

    for source in sources:
        record: dict[str, object] = {"file": str(source), "role": role_for(source), "units": [], "images": []}
        unit_text: list[str] = []
        images: list[Path] = []
        if source.suffix.lower() == ".pdf":
            unit_text = pdf_text(source, args.pdftotext)
            if not args.no_render:
                if not args.pdftoppm:
                    raise RuntimeError("pdftoppm is required unless --no-render is used")
                images.extend(render_pdf(source, image_dir / "rendered", args.pdftoppm, args.dpi))
            images.extend(extract_pdf_images(source, image_dir / "embedded"))
        elif source.suffix.lower() == ".pptx":
            unit_text, extracted = pptx_text_and_images(source, image_dir / "embedded")
            images.extend(extracted)
        else:
            images.append(source)

        for index, text in enumerate(unit_text, start=1):
            record["units"].append({"number": index, "text": text, "source_ref": f"{source.name}, page/slide {index}"})
        for image in images:
            image_record: dict[str, str] = {"path": str(image)}
            if args.ocr:
                image_record["ocr_text"] = ocr(image, args.tesseract, args.language)
            record["images"].append(image_record)
        (text_dir / f"{safe_name(source)}.json").write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
        manifest["sources"].append(record)

    output = args.output_dir / "chapter_manifest.json"
    output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
