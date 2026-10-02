import type { GradeId, Product, SpecRow, Variant } from "@/types/catalog";
import { PACKS } from "./packs";

/*
  Product catalogue.

  Where the numbers come from (all client documents, see docs/CONTENT_SOURCES.md):
  - Product names, catalogue numbers, pack sizes, mean bead diameter and binding capacity:
    "Protpure_Product_Code_for_website" workbook, v1 (October 2026).
  - Ion-exchange specifications (ionic capacity, particle range, flow, stability): technical datasheets Rev 1.0 (May 2026).
  - Phenyl, Hy-Ionic DP, MR Agarose and metal-affinity descriptions: product brochure (August 2026) and
    the Hy-Ionic DP poster v2 (October 2026).
  - Metal-affinity stability figures and pre-packed column dimensions: product catalogue R1 (July 2025).

  Catalogue numbers live in ./packs.ts. Nothing here is invented: if a value is not in a client document it is left out.
*/

const GRADE_NAME: Record<GradeId, string> = { ff: "Fast Flow", precise: "Precise", hr: "High Resolution" };

/** Build a resin grade variant. Packs are looked up by "<slug>-<grade>". */
function grade(slug: string, product: string, id: GradeId, specs: SpecRow[]): Variant {
  const key = `${slug}-${id}`;
  return { id: key, name: `${product} ${GRADE_NAME[id]}`, label: GRADE_NAME[id], grade: id, specs, packs: PACKS[key] };
}

const DIAMETER = "Mean bead diameter";
const RANGE = "Particle size range";
const CAPACITY = "Binding capacity";
const FLOW = "Flow velocity (0.1 MPa, 15 cm bed)";

const STORAGE: SpecRow = { label: "Storage", value: "4–30 °C in 20% ethanol" };

const CAPACITY_NOTE = "Binding capacity depends on the protein and on assay conditions.";
const CATALOGUE_NOTE = "Catalogue values, October 2026.";

/* ------------------------------------------------------------------ Metal affinity (IMAC) */

const IMAC_APPLICATIONS = [
  "Recombinant protein purification",
  "Protein expression screening",
  "His-tagged antibody fragments and fusion proteins",
  "Process development and scale-up",
];

const IMAC_RELATED = ["activated-agarose", "sp-agarose", "q-agarose", "deae-agarose"];

function imacSpecs(metal: string, capacity: string, diameter: string, range?: string): SpecRow[] {
  return [
    { label: DIAMETER, value: diameter },
    ...(range ? [{ label: RANGE, value: range }] : []),
    { label: CAPACITY, value: `${capacity} mg His-tagged protein/mL` },
    { label: "Metal ion", value: metal },
  ];
}

const niNta: Product = {
  slug: "ni-nta-agarose",
  family: "imac",
  kind: "resin",
  name: "Ni-NTA Agarose",
  descriptor: "Nickel affinity resin for His-tagged proteins",
  summary:
    "High-capacity Ni²⁺ affinity resin for general His-tagged protein purification, in three grades from capture at scale to high-resolution work.",
  body: [
    "ProtPure Ni-NTA Agarose is an agarose resin carrying nitrilotriacetic acid (NTA) charged with nickel. Histidine-tagged recombinant proteins bind to the immobilised metal in native or denaturing conditions and are eluted with imidazole or at lower pH.",
    "Ni-NTA Agarose is in commercial supply, with repeat use by customers. It purifies His-tagged proteins directly from bacterial lysates and cell-free extracts, and can be cleaned and reused over multiple cycles.",
  ],
  highlights: [
    "High binding capacity, up to 60 mg/mL in the High Resolution grade",
    "Purifies directly from crude lysates",
    "Can be cleaned and reused over multiple cycles",
    "Compatible with standard buffers, urea and guanidine",
  ],
  applications: [...IMAC_APPLICATIONS, "Enzymes, diagnostic proteins and vaccine antigens"],
  stages: ["capture"],
  commonSpecs: [
    { label: "Ligand", value: "Nitrilotriacetic acid (NTA) charged with Ni^{2+}" },
    { label: "Matrix", value: "6% agarose" },
    { label: "Metal ion capacity", value: "~15 µmol Ni^{2+}/mL" },
    { label: "pH stability, cleaning", value: "2–14" },
    { label: "pH stability, working", value: "3–12" },
    { label: "Chemical stability", value: "0.01 M HCl, 0.1 M NaOH, 8 M urea, 6 M guanidine hydrochloride" },
    STORAGE,
  ],
  variants: [
    grade("ni-nta-agarose", "Ni-NTA Agarose", "ff", imacSpecs("Ni^{2+}", "40", "~90 µm", "45–165 µm")),
    grade("ni-nta-agarose", "Ni-NTA Agarose", "precise", imacSpecs("Ni^{2+}", "50", "~70 µm")),
    grade("ni-nta-agarose", "Ni-NTA Agarose", "hr", imacSpecs("Ni^{2+}", "60", "~35 µm")),
  ],
  related: ["ni-nta-prepacked-columns", "ni-nta-his-tag-kit", ...IMAC_RELATED],
  notes: [CATALOGUE_NOTE, CAPACITY_NOTE],
};

const coNta: Product = {
  slug: "co-nta-agarose",
  family: "imac",
  kind: "resin",
  name: "Co-NTA Agarose",
  descriptor: "Cobalt affinity resin for higher selectivity",
  summary:
    "Co²⁺ affinity resin offering enhanced selectivity for His-tagged proteins, with reduced non-specific binding.",
  body: [
    "Co-NTA Agarose is an alternative to Ni-NTA for His-tagged proteins. Cobalt binds the tag more selectively than nickel, so fewer host-cell proteins are carried through with the target.",
    "Bound protein is eluted with imidazole or at lower pH, exactly as on Ni-NTA.",
  ],
  highlights: [
    "Higher selectivity than nickel",
    "Reduced non-specific binding",
    "Suited to challenging proteins",
    "Stable and reusable",
  ],
  applications: IMAC_APPLICATIONS,
  stages: ["capture"],
  commonSpecs: [
    { label: "Ligand", value: "Nitrilotriacetic acid (NTA) charged with Co^{2+}" },
    { label: "Matrix", value: "6% agarose" },
    { label: "pH stability, cleaning", value: "3–14" },
    { label: "pH stability, working", value: "4–13" },
    STORAGE,
  ],
  variants: [
    grade("co-nta-agarose", "Co-NTA Agarose", "ff", imacSpecs("Co^{2+}", "40", "~90 µm", "45–165 µm")),
    grade("co-nta-agarose", "Co-NTA Agarose", "hr", imacSpecs("Co^{2+}", "40", "~35 µm")),
  ],
  related: ["co-nta-prepacked-columns", "ni-nta-agarose", ...IMAC_RELATED],
  notes: [CATALOGUE_NOTE, CAPACITY_NOTE],
};

const cuNta: Product = {
  slug: "cu-nta-agarose",
  family: "imac",
  kind: "resin",
  name: "Cu-NTA Agarose",
  descriptor: "Copper affinity resin for strong binding",
  summary: "Cu²⁺ affinity resin for strong binding and efficient purification, including low-abundance targets.",
  body: [
    "Cu-NTA Agarose binds His-tagged proteins more strongly than nickel or cobalt. That makes it useful when the target is present at low concentration or binds weakly to other metals.",
    "Bound protein is eluted with imidazole or at lower pH.",
  ],
  highlights: [
    "High binding strength",
    "Effective for low-abundance proteins",
    "Fast binding kinetics",
    "Low metal leaching",
  ],
  applications: IMAC_APPLICATIONS,
  stages: ["capture"],
  commonSpecs: [
    { label: "Ligand", value: "Nitrilotriacetic acid (NTA) charged with Cu^{2+}" },
    { label: "Matrix", value: "6% agarose" },
    { label: "pH stability, cleaning", value: "3–14" },
    { label: "pH stability, working", value: "4–13" },
    STORAGE,
  ],
  variants: [
    grade("cu-nta-agarose", "Cu-NTA Agarose", "ff", imacSpecs("Cu^{2+}", "40", "~90 µm", "45–165 µm")),
    grade("cu-nta-agarose", "Cu-NTA Agarose", "precise", imacSpecs("Cu^{2+}", "50", "~70 µm")),
    grade("cu-nta-agarose", "Cu-NTA Agarose", "hr", imacSpecs("Cu^{2+}", "40", "~35 µm")),
  ],
  related: ["cu-nta-prepacked-columns", "ni-nta-agarose", ...IMAC_RELATED],
  notes: [CATALOGUE_NOTE, CAPACITY_NOTE],
};

const znNta: Product = {
  slug: "zn-nta-agarose",
  family: "imac",
  kind: "resin",
  name: "Zn-NTA Agarose",
  descriptor: "Zinc affinity resin with broad compatibility",
  summary:
    "Zn²⁺ affinity resin with high chemical stability, for His-tagged and zinc-binding proteins such as zinc fingers.",
  body: [
    "Zn-NTA Agarose binds His-tagged proteins and proteins with natural zinc-binding sites. It is used both for purification of recombinant proteins and for enrichment of zinc-binding proteins such as zinc fingers.",
    "Bound protein is eluted with imidazole or at lower pH.",
  ],
  highlights: [
    "High chemical stability",
    "Low metal leaching",
    "Broad pH and buffer compatibility",
    "Binds zinc-finger proteins as well as His-tags",
  ],
  applications: [...IMAC_APPLICATIONS, "Enrichment of zinc-binding proteins"],
  stages: ["capture"],
  commonSpecs: [
    { label: "Ligand", value: "Nitrilotriacetic acid (NTA) charged with Zn^{2+}" },
    { label: "Matrix", value: "6% agarose" },
    { label: "pH stability, cleaning", value: "3–14" },
    { label: "pH stability, working", value: "4–13" },
    STORAGE,
  ],
  variants: [
    grade("zn-nta-agarose", "Zn-NTA Agarose", "ff", imacSpecs("Zn^{2+}", "40", "~90 µm", "45–165 µm")),
    grade("zn-nta-agarose", "Zn-NTA Agarose", "hr", imacSpecs("Zn^{2+}", "40", "~35 µm")),
  ],
  related: ["zn-nta-prepacked-columns", "ni-nta-agarose", ...IMAC_RELATED],
  notes: [CATALOGUE_NOTE, CAPACITY_NOTE],
};

/* ------------------------------------------------------------------ Ion exchange (IEX) */

const IEX_COMMON: SpecRow[] = [
  { label: "Matrix", value: "6% highly cross-linked spherical agarose" },
  { label: "pH stability, cleaning", value: "2–14" },
  { label: "pH stability, working", value: "2–12" },
  { label: "Chemical stability", value: "1.0 M NaOH, 8 M urea, 6 M guanidine hydrochloride, 70% ethanol" },
  STORAGE,
];

const IEX_NOTES = [
  CATALOGUE_NOTE,
  CAPACITY_NOTE,
  "Particle range, flow and stability from the technical datasheets, Rev 1.0 (May 2026).",
];

function iexSpecs(capacity: string, g: GradeId, hrFlow = "80–150 cm/h"): SpecRow[] {
  const byGrade = {
    ff: { d: "~90 µm", r: "45–165 µm", f: "250–450 cm/h" },
    precise: { d: "~70 µm", r: "45–105 µm", f: "100–300 cm/h" },
    hr: { d: "30–35 µm", r: "25–55 µm", f: hrFlow },
  }[g];
  return [
    { label: DIAMETER, value: byGrade.d },
    { label: RANGE, value: byGrade.r },
    { label: CAPACITY, value: capacity },
    { label: FLOW, value: byGrade.f },
  ];
}

const spAgarose: Product = {
  slug: "sp-agarose",
  family: "iex",
  kind: "resin",
  name: "SP Agarose",
  descriptor: "Strong cation exchanger",
  summary:
    "Sulfopropyl strong cation exchanger on 6% cross-linked agarose, for capture, intermediate purification and polishing of positively charged biomolecules.",
  body: [
    "SP Agarose resins are strong cation exchange media based on a 6% highly cross-linked agarose matrix. The sulfopropyl ligand keeps its charge across the working pH range, so binding behaviour stays predictable as conditions change.",
    "Three grades cover the process: Fast Flow for high-throughput capture and intermediate purification, Precise for a balance of resolution and throughput, and High Resolution for polishing.",
  ],
  highlights: [
    "150 mg lysozyme/mL binding capacity in every grade",
    "Cleaning in place with 1.0 M NaOH",
    "Lot-to-lot consistency for scale-up",
    "Same ligand and matrix from 25 mL to 1 L packs",
  ],
  applications: [
    "Monoclonal antibody purification",
    "Recombinant protein and enzyme purification",
    "Vaccine and viral vector downstream processing",
    "Host-cell protein removal",
    "Intermediate purification and polishing",
  ],
  stages: ["capture", "intermediate", "polishing"],
  commonSpecs: [
    { label: "Ligand", value: "Sulfopropyl (SP)" },
    { label: "Ionic capacity", value: "0.18–0.25 mmol H^{+}/mL resin" },
    ...IEX_COMMON,
  ],
  variants: [
    grade("sp-agarose", "SP Agarose", "ff", iexSpecs("150 mg lysozyme/mL", "ff")),
    grade("sp-agarose", "SP Agarose", "precise", iexSpecs("150 mg lysozyme/mL", "precise")),
    grade("sp-agarose", "SP Agarose", "hr", iexSpecs("150 mg lysozyme/mL", "hr", "70–120 cm/h")),
  ],
  related: ["phenyl-agarose", "hy-ionic-dp", "q-agarose", "ni-nta-agarose", "activated-agarose"],
  notes: IEX_NOTES,
};

const qAgarose: Product = {
  slug: "q-agarose",
  family: "iex",
  kind: "resin",
  name: "Q Agarose",
  descriptor: "Strong anion exchanger",
  summary:
    "Quaternary amine strong anion exchanger on 6% cross-linked agarose, for capture, polishing and removal of host-cell proteins and nucleic acids.",
  body: [
    "Q Agarose resins are strong anion exchangers based on a 6% highly cross-linked agarose matrix. The quaternary amine ligand is charged across the working pH range and binds negatively charged proteins, nucleic acids and process impurities.",
    "Use it in bind-and-elute mode for capture and intermediate purification, or in flow-through mode to clear host-cell proteins and DNA during polishing.",
  ],
  highlights: [
    "Binding capacity from 100 to 140 mg BSA/mL across the grades",
    "Cleaning in place with 1.0 M NaOH",
    "Lot-to-lot consistency for scale-up",
    "Fast Flow, Precise and High Resolution grades",
  ],
  applications: [
    "Monoclonal antibody and antibody fragment purification",
    "Viral and plasmid DNA purification",
    "Host-cell protein and DNA removal",
    "Polishing in multi-step processes",
    "Process development and manufacturing-scale purification",
  ],
  stages: ["capture", "intermediate", "polishing"],
  commonSpecs: [
    { label: "Ligand", value: "Quaternary amine (Q)" },
    { label: "Ionic capacity", value: "0.18–0.25 mmol Cl^{−}/mL resin" },
    ...IEX_COMMON,
  ],
  variants: [
    grade("q-agarose", "Q Agarose", "ff", iexSpecs("100 mg BSA/mL", "ff")),
    grade("q-agarose", "Q Agarose", "precise", iexSpecs("120 mg BSA/mL", "precise")),
    grade("q-agarose", "Q Agarose", "hr", iexSpecs("140 mg BSA/mL", "hr")),
  ],
  related: ["deae-agarose", "phenyl-agarose", "sp-agarose", "activated-agarose"],
  notes: IEX_NOTES,
};

const deaeAgarose: Product = {
  slug: "deae-agarose",
  family: "iex",
  kind: "resin",
  name: "DEAE Agarose",
  descriptor: "Weak anion exchanger",
  summary:
    "Diethylaminoethyl weak anion exchanger on 6% cross-linked agarose, for process development, intermediate purification and gentle elution.",
  body: [
    "DEAE Agarose resins are weak anion exchangers based on a 6% highly cross-linked agarose matrix. The diethylaminoethyl ligand suits proteins with a moderate negative charge and applications that call for mild elution conditions.",
    "In a May 2026 performance study, DEAE Agarose Precise reached 14,898 theoretical plates per metre at 200 cm/h with peak asymmetry between 1.09 and 1.30, gave near-identical pressure–flow curves at 18 cm and 45 cm bed heights, and bound 128 mg BSA/mL at 10% breakthrough.",
  ],
  highlights: [
    "Binding capacity from 80 to 120 mg BSA/mL across the grades",
    "Precise grade: matching pressure–flow profiles at 18 and 45 cm bed heights",
    "Cleaning in place with 1.0 M NaOH",
    "Fast Flow, Precise and High Resolution grades",
  ],
  applications: [
    "Protein purification and intermediate polishing",
    "Enzyme and peptide purification",
    "Vaccine and recombinant protein downstream processing",
    "Separation of biomolecules with weak anionic character",
  ],
  stages: ["capture", "intermediate", "polishing"],
  commonSpecs: [
    { label: "Ligand", value: "Diethylaminoethyl (DEAE)" },
    { label: "Ionic capacity", value: "0.12–0.15 mmol Cl^{−}/mL resin" },
    ...IEX_COMMON,
  ],
  variants: [
    grade("deae-agarose", "DEAE Agarose", "ff", iexSpecs("80 mg BSA/mL", "ff")),
    grade("deae-agarose", "DEAE Agarose", "precise", iexSpecs("100 mg BSA/mL", "precise")),
    grade("deae-agarose", "DEAE Agarose", "hr", iexSpecs("120 mg BSA/mL", "hr")),
  ],
  related: ["hy-ionic-dp", "phenyl-agarose", "q-agarose", "activated-agarose"],
  notes: IEX_NOTES,
};

/* ------------------------------------------------------------------ Hydrophobic interaction (HIC) */

const phenylAgarose: Product = {
  slug: "phenyl-agarose",
  family: "hic",
  kind: "resin",
  name: "Phenyl Agarose",
  descriptor: "Hydrophobic interaction resin",
  summary:
    "Phenyl ligands on 6% cross-linked agarose for intermediate purification, polishing and aggregate removal under mild conditions.",
  body: [
    "Phenyl Agarose is a hydrophobic interaction chromatography (HIC) resin. Proteins bind to the phenyl groups at high salt concentration and elute as the salt is reduced, which keeps conditions mild and helps preserve activity.",
    "HIC separates on a different property from ion exchange, so the two work well back to back: an ion-exchange eluate at high salt can often be loaded straight onto Phenyl Agarose.",
  ],
  highlights: [
    "Mild conditions that maintain protein activity",
    "Aggregate removal and polishing",
    "Tolerates 1.0 M NaOH, 8 M urea and 6 M guanidine hydrochloride",
    "Fast Flow, Precise and High Resolution grades",
  ],
  applications: [
    "Protein purification and intermediate polishing",
    "Aggregate removal",
    "Monoclonal antibodies and other proteins",
    "Process development and scale-up",
  ],
  stages: ["intermediate", "polishing"],
  commonSpecs: [
    { label: "Ligand", value: "Phenyl" },
    { label: "Matrix", value: "6% cross-linked spherical agarose" },
    { label: "pH stability, cleaning", value: "2–14" },
    { label: "pH stability, working", value: "3–13" },
    {
      label: "Chemical stability",
      value:
        "1.0 M NaOH, 8 M urea, 6 M guanidine hydrochloride, 3 M ammonium sulfate, 70% ethanol, 30% isopropanol, 10% ethylene glycol, 0.5% SDS",
    },
    STORAGE,
  ],
  variants: [
    grade("phenyl-agarose", "Phenyl Agarose", "ff", [
      { label: DIAMETER, value: "~90 µm" },
      { label: CAPACITY, value: "25 mg BSA/mL" },
    ]),
    grade("phenyl-agarose", "Phenyl Agarose", "precise", [
      { label: DIAMETER, value: "~70 µm" },
      { label: RANGE, value: "45–105 µm" },
      { label: CAPACITY, value: "25 mg BSA/mL" },
      { label: "Ligand density", value: "20–25 µmol phenyl/mL" },
      { label: "Flow velocity (< 0.1 MPa, 25 cm bed)", value: "200–300 cm/h" },
    ]),
    grade("phenyl-agarose", "Phenyl Agarose", "hr", [
      { label: DIAMETER, value: "30–35 µm" },
      { label: CAPACITY, value: "30–35 mg BSA/mL" },
    ]),
  ],
  related: ["deae-agarose", "hy-ionic-dp", "sp-agarose", "activated-agarose"],
  notes: [
    CATALOGUE_NOTE,
    CAPACITY_NOTE,
    "Ligand density, flow and stability from the August 2026 product brochure (50 mm column, 20 °C).",
  ],
};

/* ------------------------------------------------------------------ Mixed-mode */

const hyIonic: Product = {
  slug: "hy-ionic-dp",
  family: "mixed",
  kind: "resin",
  name: "Hy-Ionic™ DP Agarose",
  descriptor: "DEAE–phenyl mixed-mode resin",
  summary:
    "DEAE and phenyl ligands on a single agarose matrix. Run it as a weak anion exchanger, as a HIC resin, or switch between the two on the same column.",
  body: [
    "Hy-Ionic™ DP Agarose combines a weak anion exchanger (DEAE) and a hydrophobic ligand (phenyl) on one cross-linked agarose matrix. The two modes are independently addressable: at low salt the resin binds negatively charged proteins through DEAE; at high salt it binds proteins with hydrophobic regions through phenyl.",
    "Because the mode is set by the buffer, you can switch from ion exchange to HIC on the same column without changing the resin. That opens purification routes a single-mode resin cannot offer.",
    "The same packed column was stored in 0.1 M NaOH for 30 days. When the binding experiments were repeated, the dynamic binding capacity was retained.",
  ],
  highlights: [
    "Two independently addressable modes on one matrix",
    "100 mg BSA/mL in DEAE mode, 30 mg BSA/mL in HIC mode",
    "Switch modes on the same column",
    "Capacity retained after 30 days in 0.1 M NaOH",
  ],
  applications: [
    "Antibody and Fc-protein purification",
    "Recombinant protein purification",
    "Host-cell protein removal",
    "Plasmid DNA purification",
    "Viral vector purification",
    "Biopharma process development",
  ],
  stages: ["intermediate", "polishing"],
  commonSpecs: [
    { label: "Ligands", value: "DEAE (weak anion exchange) and phenyl (hydrophobic interaction)" },
    { label: "Matrix", value: "Cross-linked agarose" },
    {
      label: "DEAE mode: bind / elute",
      value: "Low salt, e.g. 20 mM Tris-HCl pH 8.0 / increasing salt, e.g. 0–1 M NaCl",
    },
    { label: "HIC mode: bind / elute", value: "High salt, e.g. 2 M ammonium sulfate / decreasing salt" },
    { label: "pH stability, working", value: "3–12 (typical)" },
    { label: "Alkaline stability", value: "Capacity retained after 30 days in 0.1 M NaOH" },
    { label: "Storage", value: "20% ethanol" },
  ],
  variants: [
    grade("hy-ionic-dp", "Hy-Ionic DP Agarose", "precise", [
      { label: DIAMETER, value: "~70 µm" },
      { label: "Binding capacity, DEAE mode", value: "100 mg BSA/mL" },
      { label: "Binding capacity, HIC mode", value: "30 mg BSA/mL" },
    ]),
  ],
  related: ["deae-agarose", "phenyl-agarose", "activated-agarose"],
  notes: [
    CATALOGUE_NOTE,
    "Dynamic binding capacity at 10% breakthrough, measured with BSA on a 1 mL column at 40 cm/h (4 min residence time).",
    "Alkaline stability measured on a 0.7 cm × 2.5 cm packed column.",
  ],
  isNew: true,
};

/* ------------------------------------------------------------------ Metal removal */

const mrAgarose: Product = {
  slug: "mr-agarose",
  family: "mrc",
  kind: "resin",
  name: "MR Agarose",
  descriptor: "Transition-metal removal resin",
  summary:
    "Agarose resin that removes residual transition-metal ions from peptides, proteins and other samples, with a capacity of 15–18 µmol metal per mL.",
  body: [
    "MR Agarose captures transition-metal ions left in a sample after synthesis or processing. The sample is applied to the resin, the metal is retained, and the metal-free product is collected in the wash.",
    "The resin has been evaluated on an FPLC system by sequential injection of transition-metal salts and is validated for Fe²⁺, Fe³⁺, Ni²⁺, Co²⁺, Cu²⁺ and Zn²⁺. It can be regenerated and stored for the next run.",
  ],
  highlights: [
    "15–18 µmol transition-metal ions bound per mL of resin",
    "Validated for Fe²⁺, Fe³⁺, Ni²⁺, Co²⁺, Cu²⁺ and Zn²⁺",
    "Regenerable",
    "Evaluation kit available for a first test",
  ],
  applications: [
    "Removal of residual transition-metal ions from peptides and peptide therapeutics",
    "Clean-up of metal introduced during synthesis or processing",
    "Final polishing where residual metal must be removed",
  ],
  stages: ["polishing"],
  commonSpecs: [
    { label: "Function", value: "Removal of transition-metal ions" },
    { label: "Dynamic metal binding capacity", value: "15–18 µmol transition-metal ions/mL" },
    { label: "Validated metals", value: "Fe^{2+}, Fe^{3+}, Ni^{2+}, Co^{2+}, Cu^{2+}, Zn^{2+}" },
    { label: "Storage", value: "4–30 °C in storage buffer" },
  ],
  variants: [{ id: "mr-agarose", name: "MR Agarose", label: "MR Agarose", specs: [], packs: PACKS["mr-agarose"] }],
  related: ["mr-agarose-evaluation-kit", "activated-agarose", "deae-agarose", "sp-agarose"],
  notes: [
    CATALOGUE_NOTE,
    "Regeneration efficiency depends on the metal species, its concentration and the operating conditions.",
  ],
  isNew: true,
};

/* ------------------------------------------------------------------ Size exclusion and desalting */

function secSpecs(g: GradeId): SpecRow[] {
  return [{ label: DIAMETER, value: { ff: "~90 µm", precise: "~70 µm", hr: "30–35 µm" }[g] }];
}

const SEC_APPLICATIONS = [
  "Molecular weight estimation",
  "Aggregate and monomer analysis",
  "Purity assessment and process development",
  "QC and lot-release testing",
];

const plainAgarose: Product = {
  slug: "plain-agarose",
  family: "sec",
  kind: "resin",
  name: "Plain Agarose",
  descriptor: "Size exclusion resin",
  summary: "Agarose size exclusion resin for fractionation and polishing, in three bead sizes.",
  body: [
    "Plain Agarose separates molecules by size. Larger proteins and complexes cannot enter the bead pores and elute first; smaller molecules take a longer path and elute later.",
    "Choose Fast Flow for larger volumes and High Resolution when closely sized species have to be resolved.",
  ],
  highlights: [
    "Size-based fractionation and polishing",
    "Three bead sizes for throughput or resolution",
    "No ligand: separation by size only",
  ],
  applications: SEC_APPLICATIONS,
  stages: ["polishing"],
  commonSpecs: [
    { label: "Technique", value: "Size exclusion (molecular sieving)" },
    { label: "Matrix", value: "Agarose" },
  ],
  variants: [
    grade("plain-agarose", "Plain Agarose", "ff", secSpecs("ff")),
    grade("plain-agarose", "Plain Agarose", "precise", secSpecs("precise")),
    grade("plain-agarose", "Plain Agarose", "hr", secSpecs("hr")),
  ],
  related: ["activated-agarose", "phenyl-agarose"],
  notes: [CATALOGUE_NOTE, "Full specifications are supplied with the quotation."],
};

const activatedAgarose: Product = {
  slug: "activated-agarose",
  family: "sec",
  kind: "resin",
  name: "Activated Agarose",
  descriptor: "Cross-linked agarose for desalting and size-based polishing",
  summary:
    "Cross-linked agarose for desalting, buffer exchange and size-based polishing. The cross-linked matrix withstands higher operating pressure.",
  body: [
    "Activated Agarose is a cross-linked agarose matrix. Cross-linking lets the bed withstand more pressure during column operation.",
    "In a desalting run with BSA in 1 M NaCl (100 mM Tris; 26 mm column, 16 cm bed, 85 mL), the protein eluted ahead of the salt in consecutive injections: protein in the early fractions by UV, salt in the later fractions by conductivity.",
  ],
  highlights: [
    "Protein elutes ahead of salt",
    "Cross-linked for pressure stability",
    "Consistent separation across repeat injections",
    "Three bead sizes",
  ],
  applications: [
    "Desalting",
    "Buffer exchange before formulation, storage or analysis",
    "Removal of low-molecular-weight components",
    "Size-based polishing",
  ],
  stages: ["polishing"],
  commonSpecs: [
    { label: "Technique", value: "Size exclusion: desalting and buffer exchange" },
    { label: "Matrix", value: "Cross-linked agarose" },
  ],
  variants: [
    grade("activated-agarose", "Activated Agarose", "ff", secSpecs("ff")),
    grade("activated-agarose", "Activated Agarose", "precise", secSpecs("precise")),
    grade("activated-agarose", "Activated Agarose", "hr", secSpecs("hr")),
  ],
  related: ["plain-agarose", "ni-nta-agarose", "mr-agarose"],
  notes: [CATALOGUE_NOTE, "Full specifications are supplied with the quotation."],
};

/* ------------------------------------------------------------------ Pre-packed columns */

function prepacked(metal: "Ni" | "Co" | "Cu" | "Zn", resinSlug: string, extra: Partial<Product> = {}): Product {
  const slug = `${metal.toLowerCase()}-nta-prepacked-columns`;
  const name = `${metal}-NTA Pre-packed Columns`;
  const variant = (vol: "1" | "5", g: "ff" | "hr"): Variant => {
    const id = `${slug}-${vol}ml-${g}`;
    const gradeName = g === "ff" ? "Fast Flow" : "High Resolution";
    return {
      id,
      name: `${metal}-NTA Pre-packed Column ${vol} mL, ${gradeName} resin`,
      label: `${vol} mL · ${gradeName}`,
      grade: g,
      specs: [
        { label: "Column volume", value: `${vol} mL` },
        { label: "Packed resin", value: `${metal}-NTA Agarose ${gradeName}` },
      ],
      packs: PACKS[id],
    };
  };
  return {
    slug,
    family: "columns",
    kind: "column",
    name,
    descriptor: `Ready-to-use ${metal}-NTA Agarose columns, 1 mL and 5 mL`,
    summary: `Columns pre-packed with ${metal}-NTA Agarose for fast, convenient purification of His-tagged proteins. Singles or packs of five.`,
    body: [
      `Each column is packed with ProtPure ${metal}-NTA Agarose and is ready to connect to a chromatography system. Pre-packed columns remove packing as a variable, which saves set-up time and makes runs easier to compare.`,
      "Choose 1 mL for screening and method scouting, 5 mL for small-scale preparation. Both are available with Fast Flow or High Resolution resin.",
    ],
    highlights: [
      "Ready to use: no packing, no set-up",
      "Consistent performance from column to column",
      "1 mL and 5 mL, single columns or packs of five",
    ],
    applications: [
      "Recombinant protein purification",
      "Protein expression screening",
      "Method scouting before scale-up",
    ],
    stages: ["capture"],
    commonSpecs: [{ label: "Format", value: "Pre-packed column for FPLC systems" }],
    variants: [variant("1", "ff"), variant("5", "ff"), variant("1", "hr"), variant("5", "hr")],
    related: [resinSlug, "empty-columns"],
    notes: [CATALOGUE_NOTE],
    ...extra,
  };
}

const niColumns = prepacked("Ni", "ni-nta-agarose", {
  commonSpecs: [
    { label: "Format", value: "Pre-packed column for FPLC systems" },
    { label: "Bed dimensions", value: "7 × 37 mm (1 mL); 12 × 40 mm (5 mL)" },
    { label: "Flow rate", value: "< 4 mL/min" },
    { label: "Maximum pressure", value: "Up to 70 psi" },
    { label: "Sample preparation", value: "In binding buffer with up to 40 mM imidazole" },
    STORAGE,
  ],
  related: ["ni-nta-agarose", "ni-nta-his-tag-kit", "empty-columns"],
  notes: [CATALOGUE_NOTE, "Column dimensions, flow and pressure from the 2025 product catalogue."],
});

/* ------------------------------------------------------------------ Kits */

const niKit: Product = {
  slug: "ni-nta-his-tag-kit",
  family: "kits",
  kind: "kit",
  name: "Ni-NTA His-Tag Purification Kit",
  descriptor: "Ten reactions",
  summary: "Ready-to-use kit for purifying His-tagged proteins on Ni-NTA Agarose. Ten reactions.",
  body: [
    "A ready-to-use kit for evaluation and pre-screening of His-tagged protein purification on ProtPure Ni-NTA Agarose. One kit covers ten reactions.",
    "Ask for the kit contents and protocol with your quotation.",
  ],
  highlights: ["Ten reactions per kit", "For evaluation and pre-screening", "Built on ProtPure Ni-NTA Agarose"],
  applications: ["Expression screening", "Small-scale purification of His-tagged proteins"],
  stages: ["capture"],
  commonSpecs: [
    { label: "Format", value: "Ready-to-use kit" },
    { label: "Reactions", value: "10" },
  ],
  variants: [
    {
      id: "ni-nta-his-tag-kit",
      name: "Ni-NTA His-tagged protein purification kit, 10 reactions",
      label: "Kit",
      specs: [],
      packs: PACKS["ni-nta-his-tag-kit"],
    },
  ],
  related: ["ni-nta-agarose", "ni-nta-prepacked-columns"],
  notes: [CATALOGUE_NOTE],
};

const mrKit: Product = {
  slug: "mr-agarose-evaluation-kit",
  family: "kits",
  kind: "kit",
  name: "MR Agarose Metal Removal Evaluation Kit",
  descriptor: "Ten reactions",
  summary:
    "Everything needed to test transition-metal removal on your own sample: a gravity column with 1 mL MR Agarose and all buffers for ten reactions.",
  body: [
    "The kit contains a gravity-flow column packed with 1 mL of MR Agarose and the wash, removal, regeneration and storage buffers for ten reactions.",
    "The protocol has five steps: load the sample, wash and collect the metal-free product, strip the bound metal, regenerate the resin, and store it for the next run.",
  ],
  highlights: [
    "Gravity column with 1 mL MR Agarose",
    "All buffers included",
    "Five-step protocol",
    "Ten reactions per kit",
  ],
  applications: ["First evaluation of metal removal on your sample", "Peptide clean-up after synthesis or processing"],
  stages: ["polishing"],
  commonSpecs: [
    { label: "Reactions", value: "10" },
    { label: "Gravity column with MR Agarose", value: "1 × 1 mL" },
    { label: "Wash buffer", value: "30 mL" },
    { label: "MR Buffer 1", value: "30 mL" },
    { label: "MR Buffer 2", value: "200 mL" },
    { label: "Regeneration Buffer 1", value: "10 mL" },
    { label: "Regeneration Buffer 2", value: "200 mL" },
    { label: "Storage buffer", value: "10 mL" },
    { label: "Sample load per run", value: "1 mL containing 10–15 µmol transition-metal ions" },
  ],
  variants: [
    {
      id: "mr-agarose-evaluation-kit",
      name: "MR Agarose Metal Removal Evaluation Kit, 10 reactions",
      label: "Kit",
      specs: [],
      packs: PACKS["mr-agarose-evaluation-kit"],
    },
  ],
  related: ["mr-agarose"],
  notes: [
    CATALOGUE_NOTE,
    "Regeneration efficiency depends on the metal species, its concentration and the operating conditions.",
  ],
  protocol: [
    {
      title: "Load",
      text: "Apply 1 mL of sample containing 10–15 µmol of transition-metal ions to the column and incubate for 5 minutes.",
    },
    {
      title: "Wash and collect",
      text: "Wash with 3 mL of metal-free buffer or the kit wash buffer. This fraction holds your sample, with the metal removed.",
    },
    { title: "Strip the metal", text: "Release the bound metal from the resin with MR Buffer 1, then MR Buffer 2." },
    {
      title: "Regenerate",
      text: "Regeneration Buffer 1 followed by Regeneration Buffer 2 prepares the resin for the next run.",
    },
    {
      title: "Store",
      text: "Add storage buffer and keep the column at 4–30 °C. Rinse with water before the next use.",
    },
  ],
  isNew: true,
};

/* ------------------------------------------------------------------ Empty columns */

const emptyColumns: Product = {
  slug: "empty-columns",
  family: "hardware",
  kind: "hardware",
  name: "Empty Chromatography Columns",
  descriptor: "Adjustable glass columns, 16–50 mm",
  summary:
    "Empty protein chromatography columns in 16, 26 and 50 mm inner diameter, with one or both ends adjustable. 64 sizes.",
  body: [
    "Glass columns for packing your own bed, with bed volumes from 4 mL to almost 1.9 L. One-end adjustable columns have a single movable adaptor; both-ends adjustable columns let you set the bed from either side.",
    "The Plus range uses a high-precision glass tube. All columns have a 10 µm mesh. The 16 and 26 mm columns are rated to 5 bar, the 50 mm columns to 3 bar.",
  ],
  highlights: [
    "16, 26 and 50 mm inner diameter",
    "Bed volumes from 4 mL to 1,894 mL",
    "One-end or both-ends adjustable",
    "Plus range with high-precision glass",
  ],
  applications: ["Packing ProtPure resins in the laboratory", "Method development and scale-up studies"],
  stages: [],
  commonSpecs: [
    { label: "Inner diameters", value: "16, 26 and 50 mm" },
    { label: "Mesh", value: "10 µm" },
    { label: "Pressure rating", value: "5 bar (16 and 26 mm); 3 bar (50 mm)" },
  ],
  variants: [],
  related: ["sp-agarose", "q-agarose", "ni-nta-agarose"],
};

/* ------------------------------------------------------------------ Catalogue */

export const PRODUCTS: Product[] = [
  niNta,
  coNta,
  cuNta,
  znNta,
  spAgarose,
  qAgarose,
  deaeAgarose,
  phenylAgarose,
  hyIonic,
  mrAgarose,
  plainAgarose,
  activatedAgarose,
  niColumns,
  prepacked("Co", "co-nta-agarose"),
  prepacked("Cu", "cu-nta-agarose"),
  prepacked("Zn", "zn-nta-agarose"),
  niKit,
  mrKit,
  emptyColumns,
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const productsByFamily = (family: Product["family"]) => PRODUCTS.filter((p) => p.family === family);

/** Every variant with its parent product, for search, compare and the catalogue-number table. */
export const VARIANTS = PRODUCTS.flatMap((product) => product.variants.map((variant) => ({ product, variant })));

export const variantById = (id: string) => VARIANTS.find((v) => v.variant.id === id);

/** Total number of orderable catalogue items (resins, columns and kits). */
export const SKU_COUNT = VARIANTS.reduce((n, v) => n + v.variant.packs.length, 0);

/** Products the client asked to feature on the home page ("Feature Product_services" sheet). */
export const FEATURED_SLUGS = [
  "hy-ionic-dp",
  "ni-nta-agarose",
  "sp-agarose",
  "mr-agarose-evaluation-kit",
  "phenyl-agarose",
];
