import bpg200Lg from "@/assets/img/bpg200-column-1100.webp";
import bpg200Sm from "@/assets/img/bpg200-column-640.webp";
import boxLg from "@/assets/img/columns-box-1600.webp";
import boxSm from "@/assets/img/columns-box-880.webp";
import fanLg from "@/assets/img/columns-fan-1100.webp";
import fanSm from "@/assets/img/columns-fan-640.webp";
import pairLg from "@/assets/img/columns-pair-1600.webp";
import pairSm from "@/assets/img/columns-pair-880.webp";
import uprightLg from "@/assets/img/columns-upright-1100.webp";
import uprightSm from "@/assets/img/columns-upright-640.webp";
import fplcLg from "@/assets/img/lab-fplc-1600.webp";
import fplcSm from "@/assets/img/lab-fplc-880.webp";
import fplcColumnLg from "@/assets/img/lab-fplc-column-1400.webp";
import fplcColumnSm from "@/assets/img/lab-fplc-column-760.webp";
import packedLg from "@/assets/img/packed-column-900.webp";
import packedSm from "@/assets/img/packed-column-520.webp";

/*
  The client's own photographs, cropped and compressed to WebP in two widths
  (see docs/CONTENT_SOURCES.md for the original file names).
  `width` and `height` are the intrinsic size of the large file, so the browser reserves the space before loading.
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
  columnsPair: photo(pairSm, 880, pairLg, 1600, 598, "Two ProtPure Ni-NTA Agarose 1 mL pre-packed columns."),
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
} as const;
