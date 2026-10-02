import type { FamilyId, GradeId, StageId } from "@/types/catalog";

/*
  Application → resin matrix.
  Transcribed from the client's Application_Resin_Matrix workbook (October 2026): 10 applications, 21 sub-applications,
  each with recommended resins for capture, intermediate purification and polishing.
  Descriptions are the client's wording. Abbreviations in the sheet are expanded as follows:
  "IEC" → ion exchange resins, "HIC" → Phenyl Agarose, "SEC" → size exclusion resins, "HR" → High Resolution grade.
*/

export interface ResinRef {
  label: string;
  href: string;
  grade?: GradeId;
}

export interface StageRecommendation {
  refs: ResinRef[];
  /** Qualifier from the sheet, e.g. "process-dependent". */
  note?: string;
}

export interface SubApplication {
  slug: string;
  title: string;
  description: string;
  stages: Record<StageId, StageRecommendation>;
}

export interface Application {
  slug: string;
  title: string;
  /** Short name for navigation. */
  short: string;
  description: string;
  subs: SubApplication[];
}

const product =
  (slug: string, label: string) =>
  (grade?: GradeId): ResinRef => ({
    label,
    href: grade ? `/products/${slug}?grade=${grade}` : `/products/${slug}`,
    grade,
  });

const family =
  (id: FamilyId, label: string) =>
  (grade?: GradeId): ResinRef => ({
    label,
    href: grade ? `/products?family=${id}&grade=${grade}` : `/products?family=${id}`,
    grade,
  });

const ni = product("ni-nta-agarose", "Ni-NTA Agarose");
const co = product("co-nta-agarose", "Co-NTA Agarose");
const cu = product("cu-nta-agarose", "Cu-NTA Agarose");
const zn = product("zn-nta-agarose", "Zn-NTA Agarose");
const sp = product("sp-agarose", "SP Agarose");
const q = product("q-agarose", "Q Agarose");
const deae = product("deae-agarose", "DEAE Agarose");
const phenyl = product("phenyl-agarose", "Phenyl Agarose");
const hyIonic = product("hy-ionic-dp", "Hy-Ionic™ DP");
const mr = product("mr-agarose", "MR Agarose");
const plain = product("plain-agarose", "Plain Agarose");
const activated = product("activated-agarose", "Activated Agarose");
const iex = family("iex", "Ion exchange resins");
const sec = family("sec", "Size exclusion resins");

const rec = (refs: ResinRef[], note?: string): StageRecommendation => ({ refs, note });
const none: StageRecommendation = { refs: [] };

const IEX_HIC_SEC_HR = rec([iex("hr"), phenyl("hr"), sec("hr")]);

export const APPLICATIONS: Application[] = [
  {
    slug: "recombinant-proteins",
    title: "Recombinant proteins",
    short: "Recombinant proteins",
    description:
      "Purification workflows for recombinant proteins from capture to high-purity final product. Select affinity, ion-exchange, HIC and SEC resins according to the protein and expression system.",
    subs: [
      {
        slug: "his-tagged",
        title: "His-tagged recombinant proteins",
        description:
          "Selective capture of His-tagged proteins followed by impurity, aggregate and buffer-component removal.",
        stages: {
          capture: rec([ni("ff"), ni("hr"), co("ff"), co("hr")]),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic("precise")]),
          polishing: rec([sp("hr"), q("hr"), deae("hr"), phenyl("hr"), plain("hr"), activated("hr")]),
        },
      },
      {
        slug: "untagged",
        title: "Untagged recombinant proteins",
        description: "Charge- and hydrophobicity-based purification for recombinant proteins without affinity tags.",
        stages: {
          capture: rec([sp(), q(), deae()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic()]),
          polishing: rec([iex("hr"), phenyl("hr"), sec()]),
        },
      },
      {
        slug: "fusion-proteins",
        title: "Fusion proteins",
        description:
          "Multi-step purification strategies combining affinity capture with orthogonal separation mechanisms.",
        stages: {
          capture: rec([ni(), co()]),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic()]),
          polishing: rec([iex("hr"), phenyl("hr"), sec()]),
        },
      },
    ],
  },
  {
    slug: "monoclonal-antibodies",
    title: "Monoclonal antibodies and biosimilars",
    short: "mAbs & biosimilars",
    description:
      "Chromatography solutions for mAb and biosimilar downstream processing, including charge-variant, aggregate and impurity clearance.",
    subs: [
      {
        slug: "intermediate-purification",
        title: "mAb intermediate purification",
        description:
          "Ion-exchange and hydrophobic interaction chromatography for removal of process-related impurities and variants.",
        stages: {
          capture: rec([sp()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), hyIonic(), phenyl()]),
          polishing: rec([q("hr"), deae("hr"), sp("hr"), phenyl("hr"), sec("hr")]),
        },
      },
      {
        slug: "hcp-dna-clearance",
        title: "HCP and DNA clearance",
        description:
          "Anion-exchange based polishing strategies for host-cell proteins, DNA and other negatively charged impurities.",
        stages: {
          capture: none,
          intermediate: rec([q(), deae()]),
          polishing: rec([q("hr"), deae("hr")]),
        },
      },
      {
        slug: "aggregate-removal",
        title: "Aggregate removal",
        description:
          "Hydrophobic interaction and size-exclusion approaches for reducing aggregates and improving product quality.",
        stages: {
          capture: none,
          intermediate: rec([phenyl()]),
          polishing: rec([phenyl("hr"), sec()]),
        },
      },
    ],
  },
  {
    slug: "enzymes",
    title: "Enzymes",
    short: "Enzymes",
    description:
      "Flexible agarose chromatography solutions for enzyme capture, purification and polishing across research and bioprocess applications.",
    subs: [
      {
        slug: "recombinant-enzymes",
        title: "Recombinant enzymes",
        description: "Capture and purification based on affinity, charge and hydrophobicity differences.",
        stages: {
          capture: rec([ni(), co(), cu(), zn()], "where compatible"),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic()]),
          polishing: IEX_HIC_SEC_HR,
        },
      },
      {
        slug: "industrial-therapeutic-enzymes",
        title: "Industrial and therapeutic enzymes",
        description:
          "Scalable purification workflows designed around robust agarose matrices and orthogonal separation mechanisms.",
        stages: {
          capture: rec([iex()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), phenyl()]),
          polishing: rec([iex("hr"), phenyl("hr"), sec()]),
        },
      },
    ],
  },
  {
    slug: "vaccines",
    title: "Vaccines and recombinant antigens",
    short: "Vaccines & antigens",
    description:
      "Agarose chromatography solutions for purification of recombinant antigens, vaccine components and biological intermediates.",
    subs: [
      {
        slug: "recombinant-antigens",
        title: "Recombinant vaccine antigens",
        description:
          "Remove host-cell proteins, nucleic acids and process impurities while maintaining antigen quality.",
        stages: {
          capture: rec([ni(), iex()], "depending on antigen"),
          intermediate: rec([q(), deae(), sp(), phenyl()]),
          polishing: rec([q("hr"), deae("hr"), phenyl("hr"), sec("hr")]),
        },
      },
      {
        slug: "protein-vaccine-components",
        title: "Protein-based vaccine components",
        description:
          "Orthogonal charge, hydrophobicity and size-based purification for high-purity protein components.",
        stages: {
          capture: rec([sp(), q(), deae()]),
          intermediate: rec([sp(), q(), deae(), phenyl()]),
          polishing: rec([phenyl(), sec()]),
        },
      },
    ],
  },
  {
    slug: "protein-therapeutics",
    title: "Fusion proteins and protein therapeutics",
    short: "Protein therapeutics",
    description:
      "Orthogonal purification strategies for complex recombinant therapeutics, from selective capture to final polishing.",
    subs: [
      {
        slug: "fc-fusion",
        title: "Fc-fusion proteins",
        description: "Charge- and hydrophobicity-based purification for Fc-containing recombinant proteins.",
        stages: {
          capture: rec([sp()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic()]),
          polishing: IEX_HIC_SEC_HR,
        },
      },
      {
        slug: "tagged-therapeutic-proteins",
        title: "Tagged therapeutic proteins",
        description:
          "Affinity capture followed by orthogonal purification to achieve high purity and product consistency.",
        stages: {
          capture: rec([ni(), co(), cu(), zn()]),
          intermediate: rec([iex(), phenyl(), hyIonic()]),
          polishing: IEX_HIC_SEC_HR,
        },
      },
    ],
  },
  {
    slug: "peptides",
    title: "Peptides and peptide therapeutics",
    short: "Peptides",
    description: "Chromatography solutions for peptide purification, impurity clearance and final polishing.",
    subs: [
      {
        slug: "peptide-purification",
        title: "Peptide purification",
        description: "Charge- and hydrophobicity-based separation of target peptides from closely related impurities.",
        stages: {
          capture: rec([sp(), q(), deae()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), phenyl(), hyIonic()]),
          polishing: IEX_HIC_SEC_HR,
        },
      },
      {
        slug: "metal-removal",
        title: "Transition-metal removal",
        description: "Remove residual transition-metal ions introduced during synthesis or processing.",
        stages: {
          capture: none,
          intermediate: none,
          polishing: rec([mr()]),
        },
      },
    ],
  },
  {
    slug: "plasma-proteins",
    title: "Plasma and blood-derived proteins",
    short: "Plasma proteins",
    description:
      "Agarose-based ion-exchange, hydrophobic interaction and size-exclusion solutions for purification of proteins from complex biological feedstocks.",
    subs: [
      {
        slug: "plasma-proteins",
        title: "Plasma proteins",
        description:
          "Separation based on charge, hydrophobicity and molecular size to improve purity and product quality.",
        stages: {
          capture: rec([sp(), q(), deae()], "process-dependent"),
          intermediate: rec([sp(), q(), deae(), phenyl()]),
          polishing: IEX_HIC_SEC_HR,
        },
      },
      {
        slug: "biological-fluids",
        title: "Therapeutic proteins from biological fluids",
        description: "Orthogonal purification for impurity and aggregate removal from complex feed streams.",
        stages: {
          capture: rec([iex()]),
          intermediate: rec([iex(), phenyl()]),
          polishing: rec([phenyl(), sec()]),
        },
      },
    ],
  },
  {
    slug: "viral-vectors",
    title: "Viral vectors and virus-based products",
    short: "Viral vectors",
    description:
      "Agarose chromatography options for charge-based capture, impurity clearance and polishing of viral and virus-like products.",
    subs: [
      {
        slug: "viral-vectors-vlps",
        title: "Viral vectors and VLPs",
        description:
          "Anion-exchange and size-based approaches for separation from host-cell proteins, DNA and process impurities.",
        stages: {
          capture: rec([q(), deae()], "process-dependent"),
          intermediate: rec([q(), deae(), hyIonic()]),
          polishing: rec([q("hr"), deae("hr"), sec("hr")]),
        },
      },
    ],
  },
  {
    slug: "nucleic-acids",
    title: "Nucleic acids and DNA purification",
    short: "Nucleic acids",
    description:
      "Strong anion-exchange and size-based chromatography solutions for nucleic-acid purification and impurity clearance.",
    subs: [
      {
        slug: "plasmid-dna",
        title: "Plasmid DNA",
        description:
          "Charge-based separation for nucleic-acid purification and removal of proteins and other contaminants.",
        stages: {
          capture: rec([q(), deae()]),
          intermediate: rec([q(), deae()]),
          polishing: rec([q("hr"), deae("hr"), sec()]),
        },
      },
      {
        slug: "impurity-clearance",
        title: "DNA and RNA impurity clearance",
        description: "Anion-exchange chromatography for efficient removal or separation of nucleic-acid species.",
        stages: {
          capture: none,
          intermediate: rec([q(), deae()]),
          polishing: rec([q("hr"), deae("hr")]),
        },
      },
    ],
  },
  {
    slug: "desalting",
    title: "Desalting and buffer exchange",
    short: "Desalting",
    description:
      "Rapid size-based separation for desalting, buffer exchange and removal of low-molecular-weight components.",
    subs: [
      {
        slug: "desalting",
        title: "Desalting",
        description: "Remove salts and small molecules while retaining the target biomolecule.",
        stages: {
          capture: none,
          intermediate: none,
          polishing: rec([activated("ff"), activated("precise"), activated("hr")]),
        },
      },
      {
        slug: "buffer-exchange",
        title: "Final buffer exchange",
        description: "Prepare purified proteins for formulation, storage or downstream analytical testing.",
        stages: {
          capture: none,
          intermediate: none,
          polishing: rec([activated("ff"), activated("precise"), activated("hr")]),
        },
      },
    ],
  },
];

export const applicationBySlug = (slug: string) => APPLICATIONS.find((a) => a.slug === slug);

/** Applications that recommend a given product, for the "Used in" block on product pages. */
export function applicationsForProduct(productSlug: string) {
  const needle = `/products/${productSlug}`;
  return APPLICATIONS.filter((a) =>
    a.subs.some((s) =>
      Object.values(s.stages).some((st) => st.refs.some((r) => r.href === needle || r.href.startsWith(`${needle}?`))),
    ),
  );
}
