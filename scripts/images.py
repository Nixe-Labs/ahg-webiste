"""Build the site's responsive images.

    python3 scripts/images.py <source-dir>

<source-dir> holds full-resolution originals laid out as <group>/<name>.<ext> (jpg, jpeg or png).
Each becomes public/img/<group>/<name>-<width>.webp at the widths below that the original can
honestly fill, plus an entry in src/data/images.json with its size and a tiny blurred preview.
Images shown edge to edge get 3840 px; everything else stops at 2400 px. Metadata (EXIF, GPS)
is never copied across.
"""
import base64, io, json, re, sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "img"
MANIFEST = ROOT / "src" / "data" / "images.json"
WIDTHS = [640, 1024, 1600, 2400, 3200, 3840]
FULL_BLEED = {
    "home/hero-poster", "home/vista-poster", "explore/brihadeeswarar-wide", "explore/kallanai-dam",
    "inn/atrium", "emerald/hero", "residency/room-2",
}
QUALITY = 80


def preview(im: Image.Image) -> str:
    small = im.copy()
    small.thumbnail((24, 24))
    buf = io.BytesIO()
    small.save(buf, "WEBP", quality=40)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def build(src_dir: Path) -> None:
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    for path in sorted(src_dir.glob("*/*")):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        key = f"{path.parent.name}/{path.stem}"
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        cap = 3840 if key in FULL_BLEED else 2400
        widths = [w for w in WIDTHS if w <= min(im.width, cap)] or [im.width]
        if im.width <= cap and im.width > widths[-1] * 1.15:
            widths.append(im.width)  # keep the original's full width when it falls between steps
        dest = OUT / path.parent.name
        dest.mkdir(parents=True, exist_ok=True)
        for old in dest.glob(f"{path.stem}-*.webp"):
            if re.fullmatch(re.escape(path.stem) + r"-\d+\.webp", old.name):  # not "atrium-2-*" when rebuilding "atrium"
                old.unlink()
        for w in widths:
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(dest / f"{path.stem}-{w}.webp", "WEBP", quality=QUALITY, method=6)
        manifest["/img/" + key] = {"w": widths[-1], "h": round(im.height * widths[-1] / im.width), "widths": widths, "blur": preview(im)}
        print(f"{key}: {im.width}x{im.height} -> {widths}")
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(dict(sorted(manifest.items())), indent=1) + "\n")


if __name__ == "__main__":
    build(Path(sys.argv[1]))
