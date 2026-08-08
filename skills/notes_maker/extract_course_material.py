#!/usr/bin/env python3
"""Extract text, images, rendered pages, and OCR into a standardized chapter manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

SUPPORTED = {".pdf", ".pptx", ".ppt", ".docx", ".doc", ".png", ".jpg", ".jpeg", ".tif", ".tiff"}
SEEN_HASHES: set[str] = set()


def safe_name(path: Path) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "_", path.stem).strip("_")


def run(command: list[str]) -> str:
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    if completed.returncode:
        raise RuntimeError(completed.stderr.strip() or "command failed")
    return completed.stdout


def save_unique_bytes(data: bytes, output_path: Path) -> Path | None:
    """Save byte data only if it is not a duplicate image (e.g. background/logos)."""
    digest = hashlib.sha256(data).hexdigest()
    if digest in SEEN_HASHES:
        return None
    SEEN_HASHES.add(digest)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(data)
    return output_path


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
    try:
        import fitz  # type: ignore
    except ImportError:
        return []
    result: list[Path] = []
    document = fitz.open(pdf)
    for page_index, page in enumerate(document):
        for image_index, image in enumerate(page.get_images(full=True), start=1):
            xref = image[0]
            data = document.extract_image(xref)
            extension = data.get("ext", "png")
            out_path = target / f"{safe_name(pdf)}-p{page_index + 1}-img{image_index}.{extension}"
            saved = save_unique_bytes(data["image"], out_path)
            if saved:
                result.append(saved)
    return result


def pptx_text_and_images(pptx: Path, target: Path) -> tuple[list[str], list[Path]]:
    texts: list[str] = []
    images: list[Path] = []
    with zipfile.ZipFile(pptx) as archive:
        slides = sorted(
            (name for name in archive.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)),
            key=lambda name: int(re.search(r"slide(\d+)", name).group(1)),
        )
        for slide in slides:
            xml = archive.read(slide).decode("utf-8", errors="ignore")
            slide_text = " ".join(re.findall(r"<a:t>(.*?)</a:t>", xml))
            texts.append(re.sub(r"\s+", " ", slide_text).strip())

        for name in archive.namelist():
            if name.startswith("ppt/media/") and not name.endswith("/"):
                out_path = target / f"{safe_name(pptx)}-{Path(name).name}"
                saved = save_unique_bytes(archive.read(name), out_path)
                if saved:
                    images.append(saved)
    return texts, images


def docx_text_and_images(docx: Path, target: Path) -> tuple[list[str], list[Path]]:
    """Extract text and images directly from Word .docx files."""
    texts: list[str] = []
    images: list[Path] = []
    with zipfile.ZipFile(docx) as archive:
        if "word/document.xml" in archive.namelist():
            xml = archive.read("word/document.xml").decode("utf-8", errors="ignore")
            paragraphs = re.findall(r"<w:p\b[^>]*>(.*?)</w:p>", xml, re.DOTALL)
            for p in paragraphs:
                p_text = "".join(re.findall(r"<w:t\b[^>]*>(.*?)</w:t>", p))
                if p_text.strip():
                    texts.append(p_text.strip())

        for name in archive.namelist():
            if name.startswith("word/media/") and not name.endswith("/"):
                out_path = target / f"{safe_name(docx)}-{Path(name).name}"
                saved = save_unique_bytes(archive.read(name), out_path)
                if saved:
                    images.append(saved)
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
    parser.add_argument("--source-dir", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--chapter", required=True)
    parser.add_argument("--aliases", nargs="*", default=[])
    parser.add_argument("--include", nargs="*", default=[])
    parser.add_argument("--pdftoppm", default=shutil.which("pdftoppm"))
    parser.add_argument("--pdftotext", default=shutil.which("pdftotext"))
    parser.add_argument("--tesseract", help="Path to tesseract binary")
    parser.add_argument("--ocr", action="store_true")
    parser.add_argument("--language", default="eng")
    parser.add_argument("--dpi", type=int, default=180)
    parser.add_argument("--no-render", action="store_true")
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
        ext = source.suffix.lower()

        if ext == ".pdf":
            unit_text = pdf_text(source, args.pdftotext)
            if not args.no_render and args.pdftoppm:
                images.extend(render_pdf(source, image_dir / "rendered", args.pdftoppm, args.dpi))
            images.extend(extract_pdf_images(source, image_dir / "embedded"))
        elif ext == ".pptx":
            unit_text, extracted = pptx_text_and_images(source, image_dir / "embedded")
            images.extend(extracted)
        elif ext == ".docx":
            unit_text, extracted = docx_text_and_images(source, image_dir / "embedded")
            images.extend(extracted)
        else:
            images.append(source)

        for index, text in enumerate(unit_text, start=1):
            record["units"].append({"number": index, "text": text, "source_ref": f"{source.name}, section/slide {index}"})

        for image in images:
            image_record: dict[str, str] = {"path": str(image.relative_to(args.output_dir))}
            if args.ocr:
                image_record["ocr_text"] = ocr(image, args.tesseract, args.language)
            record["images"].append(image_record)

        (text_dir / f"{safe_name(source)}.json").write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
        manifest["sources"].append(record)

    output = args.output_dir / "chapter_manifest.json"
    output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Manifest created successfully at: {output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())