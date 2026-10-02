/*
  Documents offered on the Resources page.

  Each entry is a real client document. A document with a `file` is served from /public/downloads and
  downloads directly; without one, the button sends a request through the enquiry form.
  To publish a PDF: copy it to public/downloads/ and set `file: "/downloads/<name>.pdf"`.
*/

export type ResourceType = "Brochure" | "Datasheet" | "Technical note" | "Case study";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  /** Issue date as printed on the document. */
  issued: string;
  pages: number;
  /** Related product slugs, used to list documents on product pages. */
  products: string[];
  file?: string;
}

export const RESOURCES: Resource[] = [
  {
    id: "product-brochure",
    type: "Brochure",
    title: "ProtPure product brochure",
    description:
      "The full range in eight pages: SEC, ion exchange, Hy-Ionic DP, Phenyl Agarose, MR Agarose, metal affinity and services.",
    issued: "August 2026",
    pages: 8,
    products: [],
  },
  {
    id: "company-brochure",
    type: "Brochure",
    title: "Company overview",
    description: "Who we are, the resin platforms, capabilities and commercial deployment.",
    issued: "June 2026",
    pages: 6,
    products: [],
  },
  {
    id: "ds-sp-agarose",
    type: "Datasheet",
    title: "SP Agarose technical datasheet",
    description: "Strong cation exchanger: Fast Flow, Precise and High Resolution grades.",
    issued: "May 2026 · Rev 1.0",
    pages: 1,
    products: ["sp-agarose"],
  },
  {
    id: "ds-q-agarose",
    type: "Datasheet",
    title: "Q Agarose technical datasheet",
    description: "Strong anion exchanger: Fast Flow, Precise and High Resolution grades.",
    issued: "May 2026 · Rev 1.0",
    pages: 1,
    products: ["q-agarose"],
  },
  {
    id: "ds-deae-agarose",
    type: "Datasheet",
    title: "DEAE Agarose technical datasheet",
    description: "Weak anion exchanger: Fast Flow, Precise and High Resolution grades.",
    issued: "May 2026 · Rev 1.0",
    pages: 1,
    products: ["deae-agarose"],
  },
  {
    id: "tn-deae-precise",
    type: "Technical note",
    title: "DEAE Agarose Precise: performance data",
    description:
      "Column packing, pressure–flow at 18 and 45 cm bed heights, efficiency by velocity and dynamic binding capacity.",
    issued: "May 2026",
    pages: 9,
    products: ["deae-agarose"],
  },
  {
    id: "tn-sec-calibration",
    type: "Technical note",
    title: "SEC: molecular weight calibration and column performance",
    description: "Kav against molecular weight for protein standards from 13.7 to 150 kDa, with system suitability.",
    issued: "April 2026",
    pages: 1,
    products: ["plain-agarose", "activated-agarose"],
  },
  {
    id: "cs-column-packing",
    type: "Case study",
    title: "How packing protocol influences IEC column efficiency",
    description: "Same resin, same column, same packing velocity. Two bed heights, two different results.",
    issued: "May 2026",
    pages: 8,
    products: [],
  },
];

export const resourcesForProduct = (slug: string) => RESOURCES.filter((r) => r.products.includes(slug));

/* Short definitions for the terms used across the site. */
export const GLOSSARY: { term: string; definition: string }[] = [
  {
    term: "Dynamic binding capacity (DBC)",
    definition:
      "The amount of target a packed resin binds under flow before a set fraction, usually 10%, breaks through. Reported in mg per mL of resin for a named protein.",
  },
  {
    term: "HETP",
    definition:
      "Height equivalent to a theoretical plate: bed height divided by the number of plates. A smaller value means a more efficient column.",
  },
  {
    term: "Asymmetry factor (As)",
    definition:
      "The shape of a test peak, measured at 10% of its height. 1.0 is symmetrical; values between 0.8 and 1.8 indicate an acceptably packed bed.",
  },
  {
    term: "Reduced plate height (h)",
    definition: "HETP divided by the mean bead diameter. It lets columns packed with different bead sizes be compared.",
  },
  {
    term: "Kav",
    definition:
      "The partition coefficient in size exclusion: the fraction of the bead volume a molecule can enter. It falls as molecular weight rises.",
  },
  {
    term: "Column volume (CV)",
    definition: "The volume of the packed bed. Volumes in a method are usually given as multiples of it.",
  },
  {
    term: "CIP",
    definition:
      "Cleaning in place: washing a packed column with a cleaning agent such as sodium hydroxide between runs.",
  },
  {
    term: "Capture, intermediate, polishing",
    definition:
      "The three stages of a purification process: isolate the target from crude feed, remove bulk impurities, then separate closely related species.",
  },
];
