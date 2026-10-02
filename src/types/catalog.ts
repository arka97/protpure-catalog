/** Shared catalogue model for product, application, and packaging data. */
export type FamilyId = "imac" | "iex" | "hic" | "mixed" | "mrc" | "sec" | "columns" | "kits" | "hardware";
export type GradeId = "ff" | "precise" | "hr";
export type StageId = "capture" | "intermediate" | "polishing";
export type ProductKind = "resin" | "column" | "kit" | "hardware";

/** One orderable item: a catalogue number and its pack size. */
export interface Pack {
  catNo: string;
  size: string;
}

/**
 * A specification row. Values may use `^{…}` and `_{…}` for super- and subscripts
 * (rendered by <Sci>), e.g. "0.18–0.25 mmol H^{+}/mL".
 */
export interface SpecRow {
  label: string;
  value: string;
}

/** A grade or format of a product, e.g. "SP Agarose Fast Flow" or "1 mL column, Fast Flow resin". */
export interface Variant {
  id: string;
  /** Full orderable name, as it appears on a quotation. */
  name: string;
  /** Short column heading inside the product page. */
  label: string;
  grade?: GradeId;
  specs: SpecRow[];
  packs: Pack[];
}

export interface Product {
  slug: string;
  family: FamilyId;
  kind: ProductKind;
  name: string;
  /** One line that classifies the product, e.g. "Strong cation exchanger". */
  descriptor: string;
  /** Sentence shown on cards and in search results. */
  summary: string;
  /** Paragraphs for the product page. */
  body: string[];
  highlights: string[];
  applications: string[];
  /** Purification stages the product is typically used in. */
  stages: StageId[];
  /** Specifications shared by every variant. */
  commonSpecs: SpecRow[];
  variants: Variant[];
  /** Slugs of products the client recommends alongside this one. */
  related: string[];
  /** Footnotes printed under the specification table. */
  notes?: string[];
  /** Steps of the method, for kits. */
  protocol?: { title: string; text: string }[];
  isNew?: boolean;
}

export interface Family {
  id: FamilyId;
  /** Short name used in navigation and chips. */
  name: string;
  /** Technique abbreviation shown in mono labels. */
  abbr: string;
  title: string;
  summary: string;
  /** How the separation works, one sentence. */
  principle: string;
  /** Tailwind colour key for dots, strokes and tints. */
  color: "imac" | "iex" | "hic" | "mrc" | "sec" | "fmt";
  /** Mixed-mode is drawn as a two-tone bead (ion exchange + hydrophobic interaction). */
  twoTone?: boolean;
}

export interface Grade {
  id: GradeId;
  name: string;
  short: string;
  tagline: string;
  /** Mean bead diameter used across the catalogue, in µm. */
  meanDiameter: string;
  /** Diameter in µm used to draw the bead to scale. */
  drawDiameter: number;
  particleRange: string;
  /** Flow velocity at 0.1 MPa and 15 cm bed height (ion-exchange datasheets), cm/h. */
  flow: [number, number];
  bestFor: string;
  stages: StageId[];
}

export interface Stage {
  id: StageId;
  code: string;
  name: string;
  purpose: string;
  resolution: "Low" | "Moderate" | "High";
  useCase: string;
}

export interface EmptyColumn {
  item: string;
  adjust: "one-end" | "both-ends";
  plus: boolean;
  innerDiameterMm: number;
  pressureBar: number;
  bedVolumeMl: string;
  bedHeightMm: string;
}
