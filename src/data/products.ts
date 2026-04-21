export type ProductStatus = "available" | "evaluation" | "pipeline";
export type ChromatographyType = "iec" | "affinity" | "sec" | "hic" | "magnetic";
export type ExchangerType =
  | "strong-cation"
  | "weak-cation"
  | "strong-anion"
  | "weak-anion"
  | null;
export type FlowVariant = "faster" | "standard" | "precise" | "hr";

export interface PackSize {
  catNo: string;
  size: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  chromatographyType: ChromatographyType;
  exchangerType: ExchangerType;
  status: ProductStatus;
  ligand: string;
  matrix: string;
  particleSizeRange: string;
  particleSizeD50V: string;
  ionicCapacity: string | null;
  dbc: string;
  dbcUnit: string;
  flowSpec: string;
  maxFlowVelocity: string;
  phCIP: string;
  phOperational: string;
  chemicalStability: string;
  storage: string;
  deliveryTime: string;
  packSizes: PackSize[];
  applications: string[];
  flowVariant: FlowVariant;
  tags: string[];
}

export const CHROMATOGRAPHY_LABELS: Record<ChromatographyType, string> = {
  iec: "Ion Exchange",
  affinity: "Affinity",
  sec: "Size Exclusion",
  hic: "HIC",
  magnetic: "Magnetic",
};

export const EXCHANGER_LABELS: Record<NonNullable<ExchangerType>, string> = {
  "strong-cation": "Strong cation",
  "weak-cation": "Weak cation",
  "strong-anion": "Strong anion",
  "weak-anion": "Weak anion",
};

const standardPacks: PackSize[] = [
  { catNo: "01", size: "50 mL" },
  { catNo: "02", size: "100 mL" },
  { catNo: "03", size: "250 mL" },
  { catNo: "04", size: "500 mL" },
  { catNo: "05", size: "1 L" },
  { catNo: "06", size: "10 L" },
  { catNo: "07", size: "50 L" },
  { catNo: "08", size: "100 L" },
];

const withPrefix = (prefix: string): PackSize[] =>
  standardPacks.map((p) => ({ catNo: `${prefix}${p.catNo}`, size: p.size }));

export const products: Product[] = [
  {
    id: "sp-agarose",
    name: "SP Agarose",
    subtitle: "Sulfopropyl · Strong Cation Exchanger",
    chromatographyType: "iec",
    exchangerType: "strong-cation",
    status: "available",
    ligand: "Sulphopropyl",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: "0.18–0.25 mmol H⁺/mL",
    dbc: "≥150",
    dbcUnit: "mg Lysozyme/mL",
    flowSpec: "400–700 cm/h, 0.1 MPa, 20 cm bed",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "2–14",
    phOperational: "2–12",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("SP"),
    applications: [
      "Capture and intermediate purification of basic proteins",
      "Insulin, lysozyme, growth factor purification",
      "Industrial-scale cation exchange workflows",
    ],
    flowVariant: "standard",
    tags: ["BioProcess", "IEC", "Strong cation"],
  },
  {
    id: "sp-agarose-faster",
    name: "SP Agarose Faster",
    subtitle: "Sulfopropyl · Strong Cation · Industrial",
    chromatographyType: "iec",
    exchangerType: "strong-cation",
    status: "available",
    ligand: "Sulphopropyl",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "100–200 µm",
    particleSizeD50V: "~150 µm",
    ionicCapacity: "0.18–0.25 mmol H⁺/mL",
    dbc: "≥120",
    dbcUnit: "mg Lysozyme/mL",
    flowSpec: "800–1000 cm/h, 0.1 MPa, 20 cm bed",
    maxFlowVelocity: "1000 cm/hr",
    phCIP: "2–14",
    phOperational: "2–12",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("SP"),
    applications: [
      "High-throughput industrial capture",
      "Rapid processing without compromising resolution",
      "Large-scale recombinant protein purification",
    ],
    flowVariant: "faster",
    tags: ["BioProcess", "Industrial", "1000 cm/hr"],
  },
  {
    id: "q-agarose",
    name: "Q Agarose",
    subtitle: "Quaternary Amine · Strong Anion Exchanger",
    chromatographyType: "iec",
    exchangerType: "strong-anion",
    status: "available",
    ligand: "Quaternary Amine",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: "0.18–0.25 mmol Cl⁻/mL",
    dbc: "≥140",
    dbcUnit: "mg BSA/mL",
    flowSpec: "400–700 cm/h, 0.1 MPa, 20 cm bed",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "2–14",
    phOperational: "2–12",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("QA"),
    applications: [
      "Purification of proteins, nucleic acids, biomolecules",
      "HCP and DNA removal in flow-through mode",
      "High-speed chromatography workflows",
    ],
    flowVariant: "standard",
    tags: ["BioProcess", "IEC", "Strong anion"],
  },
  {
    id: "q-agarose-faster",
    name: "Q Agarose Faster",
    subtitle: "Quaternary Amine · Strong Anion · Industrial",
    chromatographyType: "iec",
    exchangerType: "strong-anion",
    status: "available",
    ligand: "Quaternary Amine",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "100–200 µm",
    particleSizeD50V: "~150 µm",
    ionicCapacity: "0.18–0.25 mmol Cl⁻/mL",
    dbc: "≥110",
    dbcUnit: "mg BSA/mL",
    flowSpec: "800–1000 cm/h, 0.1 MPa, 20 cm bed",
    maxFlowVelocity: "1000 cm/hr",
    phCIP: "2–14",
    phOperational: "2–12",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("QA"),
    applications: [
      "Industrial-scale anion exchange",
      "High-throughput HCP clearance",
      "Endotoxin reduction at production scale",
    ],
    flowVariant: "faster",
    tags: ["BioProcess", "Industrial", "1000 cm/hr"],
  },
  {
    id: "deae-agarose",
    name: "DEAE Agarose",
    subtitle: "Diethylaminoethyl · Weak Anion Exchanger",
    chromatographyType: "iec",
    exchangerType: "weak-anion",
    status: "available",
    ligand: "Diethylaminoethyl",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: "0.12–0.15 mmol Cl⁻/mL",
    dbc: "≥90",
    dbcUnit: "mg BSA/mL",
    flowSpec: "400–700 cm/h, 0.1 MPa, 20 cm bed",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "2–14",
    phOperational: "2–12",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("DE"),
    applications: [
      "Gentle anion exchange for pH-sensitive proteins",
      "Selective binding at controlled pH conditions",
      "Purification of nucleic acids and biomolecules",
    ],
    flowVariant: "standard",
    tags: ["BioProcess", "IEC", "Weak anion"],
  },
  {
    id: "cm-agarose",
    name: "CM Agarose",
    subtitle: "Carboxymethyl · Weak Cation Exchanger",
    chromatographyType: "iec",
    exchangerType: "weak-cation",
    status: "available",
    ligand: "Carboxymethyl",
    matrix: "6% spherical cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: "0.09–0.13 mmol H⁺/mL",
    dbc: "~50",
    dbcUnit: "mg RNase A/mL",
    flowSpec: "400–700 cm/h, 0.1 MPa, 16/40 column",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "2–14",
    phOperational: "4–13",
    chemicalStability: "1.0 M NaOH, 8 M urea, 6 M GuHCl, 70% EtOH",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("CM"),
    applications: [
      "Weak cation exchange for milder binding conditions",
      "pH-dependent selective protein capture",
      "Purification where strong CEX is too aggressive",
    ],
    flowVariant: "standard",
    tags: ["BioProcess", "IEC", "Weak cation"],
  },
  {
    id: "ni-nta-agarose",
    name: "Ni-NTA Agarose",
    subtitle: "Affinity · Nickel · His-tagged Proteins",
    chromatographyType: "affinity",
    exchangerType: null,
    status: "available",
    ligand: "Ni-NTA",
    matrix: "6% cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: null,
    dbc: "~40",
    dbcUnit: "mg His-tagged protein/mL",
    flowSpec: "400–700 cm/h, 0.1 MPa, 16/40 column",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "2–14",
    phOperational: "3–12",
    chemicalStability: "0.01 M HCl, 0.1 M NaOH, 8 M urea, 6 M GuHCl",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: [
      { catNo: "NN01", size: "5 mL" },
      { catNo: "NN02", size: "25 mL" },
      { catNo: "NN03", size: "50 mL" },
      { catNo: "NN04", size: "100 mL" },
      { catNo: "NN05", size: "250 mL" },
      { catNo: "NN06", size: "500 mL" },
      { catNo: "NN07", size: "1 L" },
      { catNo: "NN08", size: "2.5 L" },
    ],
    applications: [
      "One-step His-tagged recombinant protein capture",
      "Purification from crude bacterial lysates",
      "R&D construct screening and tool protein production",
    ],
    flowVariant: "standard",
    tags: ["BioProcess", "Affinity", "His-tag"],
  },
  {
    id: "ni-nta-agarose-faster",
    name: "Ni-NTA Agarose Faster",
    subtitle: "Affinity · Nickel · His-tag · High Flow",
    chromatographyType: "affinity",
    exchangerType: null,
    status: "available",
    ligand: "Ni-NTA",
    matrix: "6% cross-linked agarose",
    particleSizeRange: "100–200 µm",
    particleSizeD50V: "~150 µm",
    ionicCapacity: null,
    dbc: ">20",
    dbcUnit: "mg His-tagged protein/mL",
    flowSpec: "800–1000 cm/h, 0.1 MPa",
    maxFlowVelocity: "1000 cm/hr",
    phCIP: "2–14",
    phOperational: "3–12",
    chemicalStability: "0.01 M HCl, 0.1 M NaOH, 8 M urea, 6 M GuHCl",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: [
      { catNo: "NN01", size: "5 mL" },
      { catNo: "NN02", size: "25 mL" },
      { catNo: "NN03", size: "50 mL" },
      { catNo: "NN04", size: "100 mL" },
      { catNo: "NN05", size: "250 mL" },
      { catNo: "NN06", size: "500 mL" },
      { catNo: "NN07", size: "1 L" },
      { catNo: "NN08", size: "2.5 L" },
    ],
    applications: [
      "High-throughput downstream His-tag purification",
      "Industrial-scale IMAC workflows",
      "Process development requiring high flow rates",
    ],
    flowVariant: "faster",
    tags: ["BioProcess", "Affinity", "Industrial", "His-tag"],
  },
  {
    id: "phenyl-agarose",
    name: "Phenyl Agarose",
    subtitle: "HIC · Hydrophobic Interaction Chromatography",
    chromatographyType: "hic",
    exchangerType: null,
    status: "available",
    ligand: "Phenyl",
    matrix: "6% cross-linked agarose",
    particleSizeRange: "45–165 µm",
    particleSizeD50V: "~90 µm",
    ionicCapacity: null,
    dbc: "40–45",
    dbcUnit: "µmol phenyl/mL resin",
    flowSpec: "400–700 cm/h",
    maxFlowVelocity: "700 cm/hr",
    phCIP: "3–14",
    phOperational: "4–13",
    chemicalStability: "Standard aqueous buffers",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: withPrefix("PA"),
    applications: [
      "Polishing step for aggregate removal",
      "Separation of hydrophobic protein isoforms",
      "Complementary to IEC in multi-step workflows",
    ],
    flowVariant: "standard",
    tags: ["HIC", "Phenyl ligand", "Polishing"],
  },
  {
    id: "ni-nta-magnetic",
    name: "Ni-NTA Magnetic Agarose",
    subtitle: "Magnetic Beads · His-tagged · R&D Screening",
    chromatographyType: "magnetic",
    exchangerType: null,
    status: "available",
    ligand: "Ni-NTA on magnetic agarose",
    matrix: "Magnetic agarose beads",
    particleSizeRange: "N/A",
    particleSizeD50V: "N/A",
    ionicCapacity: null,
    dbc: "Batch mode",
    dbcUnit: "purification",
    flowSpec: "No column required",
    maxFlowVelocity: "N/A",
    phCIP: "2–14",
    phOperational: "3–12",
    chemicalStability: "Standard IMAC buffers",
    storage: "4–30°C, 20% Ethanol",
    deliveryTime: "2–3 weeks",
    packSizes: [
      { catNo: "MN01", size: "1 mL" },
      { catNo: "MN02", size: "5 mL" },
      { catNo: "MN03", size: "25 mL" },
    ],
    applications: [
      "Rapid His-tag screening without column packing",
      "Small-volume purification",
      "Automation-amenable batch purification",
    ],
    flowVariant: "standard",
    tags: ["Magnetic", "His-tag", "Automation", "R&D"],
  },
];