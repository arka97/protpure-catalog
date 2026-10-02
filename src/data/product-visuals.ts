import coNta from "@/assets/img/pack-co-nta-agarose-300.webp";
import coNta2x from "@/assets/img/pack-co-nta-agarose-600.webp";
import cuNta from "@/assets/img/pack-cu-nta-agarose-300.webp";
import cuNta2x from "@/assets/img/pack-cu-nta-agarose-600.webp";
import deae from "@/assets/img/pack-deae-agarose-300.webp";
import deae2x from "@/assets/img/pack-deae-agarose-600.webp";
import niNta from "@/assets/img/pack-ni-nta-agarose-300.webp";
import niNta2x from "@/assets/img/pack-ni-nta-agarose-600.webp";
import phenyl from "@/assets/img/pack-phenyl-agarose-300.webp";
import phenyl2x from "@/assets/img/pack-phenyl-agarose-600.webp";
import q from "@/assets/img/pack-q-agarose-300.webp";
import q2x from "@/assets/img/pack-q-agarose-600.webp";
import sp from "@/assets/img/pack-sp-agarose-300.webp";
import sp2x from "@/assets/img/pack-sp-agarose-600.webp";
import znNta from "@/assets/img/pack-zn-nta-agarose-300.webp";
import znNta2x from "@/assets/img/pack-zn-nta-agarose-600.webp";
import { PHOTOS, type PhotoAsset } from "./photos";

/*
  One picture per product line.

  - "pack": the client's own pack image (a 500 mL bottle on a white ground, 500 × 500 px originals,
    `images/products/` in the client's folder). Used only where the name on the label is the name of the
    product line. They are cropped to the bottle and compressed; the 2x file is the same picture enlarged,
    so high-density screens do not enlarge it themselves.
  - "photo": one of the client's photographs or product visuals from ./photos.ts.
  - "illustration": drawn for the site (src/components/viz/ProductIllustration.tsx), for the lines the client has
    no picture of yet. On the product page the caption says "Illustration", so a drawing is never taken for
    the product.

  Captions say only what the picture shows. See docs/CONTENT_SOURCES.md, section 2, for the original files
  and section 3.5 for what the client still has to confirm or supply.
*/

export interface PackImage {
  src: string;
  src2x: string;
  width: number;
  height: number;
  alt: string;
}

export type IllustrationId =
  "mixed-mode" | "metal-removal" | "size-exclusion" | "desalting" | "his-tag" | "empty-columns";

export type ProductVisual =
  | { kind: "pack"; image: PackImage; caption: string }
  | { kind: "photo"; photo: PhotoAsset; caption: string }
  | { kind: "illustration"; id: IllustrationId; caption: string };

const pack = (src: string, src2x: string, product: string): ProductVisual => ({
  kind: "pack",
  image: { src, src2x, width: 300, height: 410, alt: `A 500 mL bottle of ProtPure ${product} resin.` },
  caption: "500 mL pack",
});

const COLUMN_FORMAT: ProductVisual = {
  kind: "photo",
  photo: PHOTOS.columnsBox,
  caption: "The 1 mL pre-packed column format, photographed with other ProtPure resins",
};

export const PRODUCT_VISUALS: Record<string, ProductVisual> = {
  "ni-nta-agarose": pack(niNta, niNta2x, "Ni-NTA Agarose"),
  "co-nta-agarose": pack(coNta, coNta2x, "Co-NTA Agarose"),
  "cu-nta-agarose": pack(cuNta, cuNta2x, "Cu-NTA Agarose"),
  "zn-nta-agarose": pack(znNta, znNta2x, "Zn-NTA Agarose"),
  "sp-agarose": pack(sp, sp2x, "SP Agarose"),
  "q-agarose": pack(q, q2x, "Q Agarose"),
  "deae-agarose": pack(deae, deae2x, "DEAE Agarose"),
  "phenyl-agarose": pack(phenyl, phenyl2x, "Phenyl Agarose"),
  "hy-ionic-dp": {
    kind: "illustration",
    id: "mixed-mode",
    caption: "Illustration: DEAE and phenyl ligands on the same bead",
  },
  "mr-agarose": {
    kind: "illustration",
    id: "metal-removal",
    caption: "Illustration: metal ions held on the bead, the product passing by",
  },
  "plain-agarose": {
    kind: "illustration",
    id: "size-exclusion",
    caption: "Illustration: small molecules enter the bead pores, large ones stay outside",
  },
  "activated-agarose": {
    kind: "illustration",
    id: "desalting",
    caption: "Illustration: salt enters the bead pores, the protein stays outside",
  },
  "ni-nta-prepacked-columns": {
    kind: "photo",
    photo: PHOTOS.columnsNiPair,
    caption: "Ni-NTA Agarose 1 mL pre-packed columns",
  },
  "co-nta-prepacked-columns": COLUMN_FORMAT,
  "cu-nta-prepacked-columns": COLUMN_FORMAT,
  "zn-nta-prepacked-columns": COLUMN_FORMAT,
  "ni-nta-his-tag-kit": {
    kind: "illustration",
    id: "his-tag",
    caption: "Illustration: a His-tagged protein held by nickel on the bead",
  },
  "mr-agarose-evaluation-kit": {
    kind: "photo",
    photo: PHOTOS.mrKit,
    caption: "Kit contents: a gravity column with 1 mL MR Agarose and six buffers",
  },
  "empty-columns": {
    kind: "illustration",
    id: "empty-columns",
    caption: "Illustration: the adaptors set the bed. One end adjustable (left), both ends (right)",
  },
};

export const visualForProduct = (slug: string): ProductVisual | undefined => PRODUCT_VISUALS[slug];

/** Pack images shown side by side at the top of the catalogue: one per bottle colour, then two colourless packs. */
export const PACK_LINEUP = ["ni-nta-agarose", "co-nta-agarose", "cu-nta-agarose", "sp-agarose", "phenyl-agarose"];
