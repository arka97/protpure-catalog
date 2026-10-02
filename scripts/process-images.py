"""
Builds the site's pictures from the client's originals.

    python3 scripts/process-images.py <the client's Protpure folder> [output folder]

Needs Python 3 with Pillow and NumPy, and poppler (pdftoppm, pdfimages) for the pictures that come out of PDFs.
The output folder defaults to src/assets/img. Rendered PDF pages go to a temporary folder.

Nothing is retouched: every picture is cropped, resized and compressed, and nothing else. Crop boxes are in
pixels of the original file. The pack images are only 500 px originals, so they are also written at 2x
(Lanczos, light sharpening) for high-density screens. Where each picture is used, and which client pictures
were left out and why: docs/CONTENT_SOURCES.md.

The eight photographs of the first revamp (columns-box, columns-upright, columns-fan, lab-fplc,
lab-fplc-column, bpg200-column, packed-column) were made by hand and are not rebuilt here.
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter, ImageOps

Image.MAX_IMAGE_PIXELS = None

if len(sys.argv) < 2:
    sys.exit(__doc__)

SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..", "src", "assets", "img")
TMP = tempfile.mkdtemp(prefix="protpure-img-")
os.makedirs(OUT, exist_ok=True)

report = []


def load(rel):
    return ImageOps.exif_transpose(Image.open(os.path.join(SRC, rel))).convert("RGB")


def save(im, name, width, quality=82, sharpen=False):
    w, h = im.size
    if width != w:
        im = im.resize((width, round(h * width / w)), Image.LANCZOS)
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2))
    path = os.path.join(OUT, f"{name}-{width}.webp")
    im.save(path, "WEBP", quality=quality, method=6)
    report.append((f"{name}-{width}.webp", im.size, os.path.getsize(path)))


# ---------------------------------------------------------------- pack images (500 x 500 originals)
# Only the bottles whose label carries the name of a product line in the catalogue.
PACKS = {
    "pack-ni-nta-agarose": "10_ni-nta-agarose",
    "pack-co-nta-agarose": "12_co-nta-agarose",
    "pack-cu-nta-agarose": "16_cu-nta-agarose",
    "pack-zn-nta-agarose": "14_zn-nta-agarose",
    "pack-sp-agarose": "01_sp-agarose",
    "pack-q-agarose": "03_q-agarose",
    "pack-deae-agarose": "04_deae-agarose",
    "pack-phenyl-agarose": "19_phenyl-agarose",
}
PACK_BOX = (100, 60, 400, 470)  # the bottle and its shadow: 300 x 410
for name, src in PACKS.items():
    im = load(f"images/products/{src}.jpg").crop(PACK_BOX)
    save(im, name, 300, quality=88)
    save(im, name, 600, quality=84, sharpen=True)

# ---------------------------------------------------------------- pre-packed columns
im = load("images/columns/23_ni-nta-agarose-1ml-columns.jpg").crop((755, 752, 5355, 3052))  # 2:1
save(im, "columns-ni-pair", 1200)
save(im, "columns-ni-pair", 640)

# ---------------------------------------------------------------- MR Agarose evaluation kit (the client's product visual)
im = load("posters-social/mr-agarose-kit_product-overview.png").crop((0, 0, 1068, 752))
save(im, "kit-mr-agarose", 1068, quality=84)
save(im, "kit-mr-agarose", 640, quality=84)

# ---------------------------------------------------------------- services
trio = load("Services/Pre-packed columns.png").crop((119, 23, 845, 1131))  # three packed columns on white
save(trio, "packed-columns-trio", 726, quality=84)
save(trio, "packed-columns-trio", 420, quality=84)

# The photograph of the purification system inside the LinkedIn cover. No larger original is in the folder.
run = load("Services/Linkedin Cover image -1.png").crop((892, 286, 1561, 568))
save(run, "purification-run", 669, quality=86)

# The column on the chromatography system: the photograph on the first page of the case study.
case_study = os.path.join(SRC, "technical-data/2026-05_iec-column-efficiency_case-study.pdf")
subprocess.run(["pdfimages", "-png", "-f", "1", "-l", "1", case_study, os.path.join(TMP, "cs")], check=True)
largest = max((os.path.join(TMP, f) for f in os.listdir(TMP) if f.startswith("cs-")), key=os.path.getsize)
cs = Image.open(largest).convert("RGB")
save(cs, "case-study-column", cs.size[0], quality=82)
save(cs, "case-study-column", 560, quality=82)

# ---------------------------------------------------------------- bead micrographs (intro deck, slides 18 to 20)
# Slide 18 "Agarose HR", slide 19 "Agarose Precise", slide 20 "Agarose" (shown on the site as Fast Flow).
# Slide 21, "Agarose Faster", is not in the catalogue and is not used.
deck = os.path.join(SRC, "technical-data/2026-02_indigenous-chromatography-resins_intro-deck.pdf")
subprocess.run(["pdfimages", "-png", deck, os.path.join(TMP, "deck")], check=True)
for name, index in {"beads-hr": 42, "beads-precise": 50, "beads-ff": 54}.items():
    im = Image.open(os.path.join(TMP, f"deck-{index:03d}.png")).convert("RGB")
    assert im.size == (731, 410), (name, im.size)
    save(im, name, 731, quality=84)
    save(im, name, 420, quality=84)

# ---------------------------------------------------------------- document covers (first page of each PDF)
# 200 px wide: enough to recognise the document, too small to read its figures (the PDFs are sent on request).
COVERS = {
    "cover-product-brochure": "brochures/2026-08_protpure-product-brochure.pdf",
    "cover-company-brochure": "brochures/2026-06_protpure-executive-brochure-v1.pdf",
    "cover-ds-sp-agarose": "datasheets/2026-05_sp-agarose_technical-datasheet-v1.pdf",
    "cover-ds-q-agarose": "datasheets/2026-05_q-agarose_technical-datasheet-v1.pdf",
    "cover-ds-deae-agarose": "datasheets/2026-05_deae-agarose_technical-datasheet-v1.pdf",
    "cover-tn-deae-precise": "technical-data/2026-05_deae-agarose-precise_performance-data.pdf",
    "cover-tn-sec-calibration": "technical-data/2026-04_sec-precise_calibration-poster.pdf",
    "cover-cs-column-packing": "technical-data/2026-05_iec-column-efficiency_case-study.pdf",
}
for name, pdf in COVERS.items():
    base = os.path.join(TMP, name)
    subprocess.run(["pdftoppm", "-r", "72", "-f", "1", "-l", "1", "-png", os.path.join(SRC, pdf), base], check=True)
    page = next(os.path.join(TMP, f) for f in sorted(os.listdir(TMP)) if f.startswith(name + "-") and f.endswith(".png"))
    im = Image.open(page).convert("RGB")
    # The company brochure sits in the middle of a taller, otherwise blank page: cut the blank bands off.
    # Ordinary page margins are kept, so every A4 cover has the same shape.
    a = np.asarray(im).astype(int)
    rows = np.where(((255 - a.min(axis=2)) > 8).any(axis=1))[0]
    if rows.max() + 1 - rows.min() < 0.85 * im.size[1]:
        im = im.crop((0, rows.min(), im.size[0], rows.max() + 1))
    save(im, name, 200, quality=80)

for name, size, n in report:
    print(f"{name:36s} {size[0]:5d} x {size[1]:<5d} {n / 1024:7.1f} kB")
print(f"{len(report)} files, {round(sum(n for _, _, n in report) / 1024)} kB")
