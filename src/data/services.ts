/*
  Downstream bioprocessing services.
  Sources: "Service" sheet of the Application_Resin_Matrix workbook (October 2026) and page 8 of the
  August 2026 product brochure.
*/

export interface Service {
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** What is assessed or delivered. */
  outputsLabel: string;
  outputs: string[];
  /** Typical work the service is used for (client's list). */
  examples: string[];
}

export const SERVICES: Service[] = [
  {
    code: "SC001",
    slug: "column-packing",
    name: "Precision column packing",
    tagline: "Reproducible columns. Reliable performance.",
    description:
      "Professionally packed chromatography columns for reliable and reproducible purification. We pack agarose resins to a defined bed height, packing density and flow conditions for laboratory, process-development and evaluation work.",
    outputsLabel: "Column performance report",
    outputs: ["Asymmetry factor (As)", "HETP", "Number of theoretical plates (N)", "Reduced plate height (h)"],
    examples: [
      "Resin evaluation",
      "Method development",
      "Scale-up studies",
      "FPLC runs",
      "IEX, HIC, SEC and IMAC evaluation",
    ],
  },
  {
    code: "SC002",
    slug: "resin-screening",
    name: "Resin screening and selection",
    tagline: "Identify the most suitable resin for your purification objective.",
    description:
      "Find the right resin before committing to a purification process. We screen suitable chromatography modes and ProtPure resins based on your protein, its impurities and your purification objectives.",
    outputsLabel: "Screened for",
    outputs: ["Binding", "Recovery", "Selectivity", "Resolution", "Capacity"],
    examples: [
      "Recombinant and His-tagged proteins",
      "Enzymes and antigens",
      "Fusion proteins, mAbs and biosimilars",
      "Peptides",
      "HCP, DNA and aggregate removal",
    ],
  },
  {
    code: "SC003",
    slug: "method-development",
    name: "Chromatography method development",
    tagline: "Optimise chromatographic conditions for purity, recovery and reproducibility.",
    description:
      "Develop and optimise a practical purification method for your molecule. We evaluate resin, pH, conductivity, loading, wash and elution to establish a reproducible method.",
    outputsLabel: "Conditions optimised",
    outputs: [
      "Buffer: pH, conductivity, composition",
      "Loading: sample load, flow rate",
      "Wash: buffer and salt conditions",
      "Elution: gradient or step, fraction collection",
    ],
    examples: [
      "Capture, intermediate purification and polishing",
      "HCP and DNA clearance",
      "Aggregate removal",
      "Desalting and buffer exchange",
    ],
  },
  {
    code: "SC004",
    slug: "protein-purification",
    name: "Protein purification service",
    tagline: "From clarified sample to purified protein.",
    description:
      "Purify your protein using a chromatography workflow developed around your sample and target specifications. Suitable for research, analytical, feasibility and process-development requirements.",
    outputsLabel: "Evaluation parameters",
    outputs: ["Dynamic binding capacity", "Recovery", "Selectivity", "Pressure–flow", "Resolution"],
    examples: [
      "Recombinant and His-tagged proteins",
      "Enzymes and antigens",
      "Fusion proteins and peptides",
      "Protein therapeutics",
      "mAb-related purification studies",
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const SERVICE_WORKFLOW = [
  "Clarification",
  "Capture",
  "Intermediate purification",
  "Polishing",
  "Analytical assessment",
];

export const SERVICE_AUDIENCES = [
  "Academic and research laboratories",
  "Research centres",
  "CROs",
  "Biotech start-ups",
  "Industry",
];

export const PACKING_OPTIONS = {
  diameters: ["10 mm", "16 mm", "26 mm", "50 mm"],
  volumes: "5 mL to 1 L",
};
