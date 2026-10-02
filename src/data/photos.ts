import bpg200Lg from "@/assets/img/bpg200-column-1100.webp";
import bpg200Sm from "@/assets/img/bpg200-column-640.webp";
import boxLg from "@/assets/img/columns-box-1600.webp";
import boxSm from "@/assets/img/columns-box-880.webp";
import fanLg from "@/assets/img/columns-fan-1100.webp";
import fanSm from "@/assets/img/columns-fan-640.webp";
import uprightLg from "@/assets/img/columns-upright-1100.webp";
import uprightSm from "@/assets/img/columns-upright-640.webp";
import fplcLg from "@/assets/img/lab-fplc-1600.webp";
import fplcSm from "@/assets/img/lab-fplc-880.webp";
import fplcColumnLg from "@/assets/img/lab-fplc-column-1400.webp";
import fplcColumnSm from "@/assets/img/lab-fplc-column-760.webp";
import packedLg from "@/assets/img/packed-column-900.webp";
import packedSm from "@/assets/img/packed-column-520.webp";
import beadsFfLg from "@/assets/img/beads-ff-731.webp";
import beadsFfSm from "@/assets/img/beads-ff-420.webp";
import beadsHrLg from "@/assets/img/beads-hr-731.webp";
import beadsHrSm from "@/assets/img/beads-hr-420.webp";
import beadsPreciseLg from "@/assets/img/beads-precise-731.webp";
import beadsPreciseSm from "@/assets/img/beads-precise-420.webp";
import caseColumnLg from "@/assets/img/case-study-column-983.webp";
import caseColumnSm from "@/assets/img/case-study-column-560.webp";
import niPairLg from "@/assets/img/columns-ni-pair-1200.webp";
import niPairSm from "@/assets/img/columns-ni-pair-640.webp";
import mrKitLg from "@/assets/img/kit-mr-agarose-1068.webp";
import mrKitSm from "@/assets/img/kit-mr-agarose-640.webp";
import trioLg from "@/assets/img/packed-columns-trio-726.webp";
import trioSm from "@/assets/img/packed-columns-trio-420.webp";
import runLg from "@/assets/img/purification-run-669.webp";

/*
  The client's own photographs and product visuals, cropped and compressed to WebP in two widths
  (see docs/CONTENT_SOURCES.md for the original file names). Nothing is retouched.
  `width` and `height` are the intrinsic size of the large file, so the browser reserves the space before loading.
  Pack images and document covers live in ./product-visuals.ts and ./resources.ts.
*/

export interface PhotoAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

const photo = (sm: string, smW: number, lg: string, lgW: number, lgH: number, alt: string): PhotoAsset => ({
  src: lg,
  srcSet: `${sm} ${smW}w, ${lg} ${lgW}w`,
  width: lgW,
  height: lgH,
  alt,
});

export const PHOTOS = {
  columnsBox: photo(
    boxSm,
    880,
    boxLg,
    1600,
    978,
    "A box of ProtPure pre-packed 1 mL FPLC columns with five columns standing in the tray and more laid out in front.",
  ),
  columnsUpright: photo(
    uprightSm,
    640,
    uprightLg,
    1100,
    1173,
    "Four ProtPure 1 mL pre-packed columns standing upright, each with a green cap.",
  ),
  columnsFan: photo(fanSm, 640, fanLg, 1100, 1100, "Four ProtPure 1 mL pre-packed columns laid out in a row."),
  labFplc: photo(
    fplcSm,
    880,
    fplcLg,
    1600,
    1032,
    "The ProtPure applications laboratory: a protein purification system on the bench with a column mounted beside it.",
  ),
  labFplcColumn: photo(
    fplcColumnSm,
    760,
    fplcColumnLg,
    1400,
    1400,
    "A protein purification system connected to a tall glass column packed with agarose resin.",
  ),
  bpg200: photo(
    bpg200Sm,
    640,
    bpg200Lg,
    1100,
    1000,
    "Close-up of a process-scale glass column packed with ProtPure Ni-NTA Agarose, the bed level shown against a litre scale.",
  ),
  packedColumn: photo(
    packedSm,
    520,
    packedLg,
    900,
    1779,
    "A glass laboratory column packed with Ni-NTA Agarose, seen from below the top adaptor.",
  ),
  columnsNiPair: photo(niPairSm, 640, niPairLg, 1200, 600, "Two ProtPure Ni-NTA Agarose 1 mL pre-packed columns."),
  mrKit: photo(
    mrKitSm,
    640,
    mrKitLg,
    1068,
    752,
    "The MR Agarose evaluation kit: its box, a gravity column with a red cap and six labelled buffer bottles.",
  ),
  packedColumnsTrio: photo(
    trioSm,
    420,
    trioLg,
    726,
    1108,
    "Three packed chromatography columns side by side, from a slim laboratory column to a tall column about five times its height.",
  ),
  purificationRun: photo(
    runLg,
    669,
    runLg,
    669,
    282,
    "A protein purification system on the laboratory bench, with the chromatogram of the run on the monitor beside it.",
  ),
  caseStudyColumn: photo(
    caseColumnSm,
    560,
    caseColumnLg,
    983,
    1344,
    "A glass column packed with white agarose resin, mounted beside a protein purification system.",
  ),
  beadsFf: photo(
    beadsFfSm,
    420,
    beadsFfLg,
    731,
    410,
    "Micrograph of round agarose beads, Fast Flow grade. Many are wider than the 100 µm scale bar.",
  ),
  beadsPrecise: photo(
    beadsPreciseSm,
    420,
    beadsPreciseLg,
    731,
    410,
    "Micrograph of round agarose beads, Precise grade. Most are a little shorter than the 100 µm scale bar.",
  ),
  beadsHr: photo(
    beadsHrSm,
    420,
    beadsHrLg,
    731,
    410,
    "Micrograph of round agarose beads, High Resolution grade. Most are under half the 100 µm scale bar.",
  ),
} as const;
