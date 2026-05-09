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