import type { Family, FamilyId, Grade, GradeId, Stage, StageId } from "@/types/catalog";

/*
  Chromatography families, performance grades and purification stages.
  Sources: Protpure_Product_code_v1.xlsx ("Category code"), Application_Resin_Matrix.xlsx ("Stages"),
  product brochure Aug 2026 (grade descriptions) and the May 2026 ion-exchange datasheets (flow ranges).
*/

export const FAMILIES: Family[] = [
  {
    id: "imac",
    name: "Metal affinity",
    abbr: "IMAC",
    title: "Metal affinity chromatography",
    summary: "Ni-, Co-, Cu- and Zn-NTA Agarose for selective capture of His-tagged proteins.",
    principle:
      "Histidine-tagged proteins bind to metal ions held on NTA groups and are released with imidazole or at lower pH.",
    color: "imac",
  },
  {
    id: "iex",
    name: "Ion exchange",
    abbr: "IEX",
    title: "Ion exchange chromatography",
    summary: "SP, Q and DEAE Agarose: three exchangers, each in three grades, from capture to polishing.",
    principle:
      "Charged ligands bind oppositely charged biomolecules, which are released by raising the salt concentration or changing pH.",
    color: "iex",
  },
  {
    id: "hic",
    name: "Hydrophobic interaction",
    abbr: "HIC",
    title: "Hydrophobic interaction chromatography",
    summary: "Phenyl Agarose for intermediate purification, polishing and aggregate removal under mild conditions.",
    principle:
      "Hydrophobic surface patches bind to phenyl groups at high salt and elute as the salt concentration falls.",
    color: "hic",
  },
  {
    id: "mixed",
    name: "Mixed-mode",
    abbr: "MMC",
    title: "Mixed-mode chromatography",
    summary: "Hy-Ionic™ DP carries DEAE and phenyl ligands on one bead: two modes, one column.",
    principle:
      "A single matrix carries an anion exchanger and a hydrophobic ligand; the buffer decides which mode is active.",
    color: "iex",
    twoTone: true,
  },
  {
    id: "mrc",
    name: "Metal removal",
    abbr: "MRC",
    title: "Metal removal chromatography",
    summary: "MR Agarose takes residual transition-metal ions out of peptides, proteins and process streams.",
    principle: "A metal-binding agarose retains transition-metal ions while the product is collected in the wash.",
    color: "mrc",
  },
  {
    id: "sec",
    name: "Size exclusion & desalting",
    abbr: "SEC",
    title: "Size exclusion and desalting",
    summary: "Plain and Activated Agarose for fractionation, polishing, desalting and buffer exchange.",
    principle:
      "Molecules separate by size as they pass through the bead pores: large species elute first, salts and small molecules last.",
    color: "sec",
  },
  {
    id: "columns",
    name: "Pre-packed columns",
    abbr: "COL",
    title: "Pre-packed columns",
    summary: "Ready-to-use 1 mL and 5 mL columns packed with ProtPure NTA resins.",
    principle: "Packed and ready to connect to a chromatography system.",
    color: "fmt",
  },
  {
    id: "kits",
    name: "Kits",
    abbr: "KIT",
    title: "Evaluation kits",
    summary: "Ready-to-use kits for evaluation and pre-screening, ten reactions each.",
    principle: "Resin, column and buffers in one box.",
    color: "fmt",
  },
  {
    id: "hardware",
    name: "Empty columns",
    abbr: "HW",
    title: "Empty chromatography columns",
    summary: "Adjustable glass columns, 16 to 50 mm inner diameter, for packing your own bed.",
    principle: "One-end or both-ends adjustable, standard or high-precision glass.",
    color: "fmt",
  },
];

export const RESIN_FAMILY_IDS: FamilyId[] = ["imac", "iex", "hic", "mixed", "mrc", "sec"];
export const FORMAT_FAMILY_IDS: FamilyId[] = ["columns", "kits", "hardware"];

export const familyById = (id: FamilyId) => FAMILIES.find((f) => f.id === id)!;

export const GRADES: Grade[] = [
  {
    id: "ff",
    name: "Fast Flow",
    short: "FF",
    tagline: "Higher throughput for higher productivity",
    meanDiameter: "~90 µm",
    drawDiameter: 90,
    particleRange: "45–165 µm",
    flow: [250, 450],
    bestFor: "Capture and intermediate purification, where volume and speed matter most.",
    stages: ["capture", "intermediate"],
  },
  {
    id: "precise",
    name: "Precise",
    short: "PR",
    tagline: "Balanced performance for accuracy and reliability",
    meanDiameter: "~70 µm",
    drawDiameter: 70,
    particleRange: "45–105 µm",
    flow: [100, 300],
    bestFor: "Intermediate purification, when resolution and throughput both count.",
    stages: ["intermediate", "polishing"],
  },
  {
    id: "hr",
    name: "High Resolution",
    short: "HR",
    tagline: "Smaller particles for high-resolution separations",
    meanDiameter: "~35 µm",
    drawDiameter: 35,
    particleRange: "25–55 µm",
    flow: [70, 150],
    bestFor: "Polishing: closely related species, isoforms and aggregates.",
    stages: ["polishing"],
  },
];

export const gradeById = (id: GradeId) => GRADES.find((g) => g.id === id)!;

export const STAGES: Stage[] = [
  {
    id: "capture",
    code: "STG01",
    name: "Capture",
    purpose: "Bind and isolate the target from crude feedstock.",
    resolution: "Low",
    useCase: "Initial step for mAbs, plasma proteins and vaccines.",
  },
  {
    id: "intermediate",
    code: "STG02",
    name: "Intermediate",
    purpose: "Remove bulk impurities and improve purity.",
    resolution: "Moderate",
    useCase: "Recombinant proteins, enzymes and hormones.",
  },
  {
    id: "polishing",
    code: "STG03",
    name: "Polishing",
    purpose: "Separate closely related species at high resolution.",
    resolution: "High",
    useCase: "Isoform separation, aggregate removal, analytical SEC.",
  },
];

export const stageById = (id: StageId) => STAGES.find((s) => s.id === id)!;
