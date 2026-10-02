/*
  Measured data used in charts and proof points. Every number is taken from a client study:

  - DEAE_PRECISE: "DEAE Agarose Precise" performance data (May 2026).
  - PACKING_CASE: "How column packing protocol influences IEC column efficiency" case study (May 2026).
  - SEC_CALIBRATION: SEC calibration poster (April 2026) and product brochure (August 2026).
  - IEX_COLUMN_TEST: column efficiency test in the intro deck (February 2026).
  - HY_IONIC_MODES: Hy-Ionic DP poster v2 (October 2026).
*/

export const DEAE_PRECISE = {
  product: "DEAE Agarose Precise",
  column: "50 mm inner diameter",
  test: "Acetone pulse (2 mL of 1% acetone), UV 280 nm, 20 mM Tris, 50 mM NaCl, pH 7.5",
  packing: {
    settledBed: "53 cm",
    packedBed: "45 cm",
    compression: "15.1%",
    packingFactor: "1.18",
    packingVelocity: "350 cm/h",
  },
  /** Column efficiency by linear velocity, packed bed 18.2 cm. */
  efficiency: [
    { velocity: 50, platesPerMetre: 1277, hetpMm: 0.783, asymmetry: 1.3 },
    { velocity: 100, platesPerMetre: 7159, hetpMm: 0.14, asymmetry: 1.19 },
    { velocity: 150, platesPerMetre: 11935, hetpMm: 0.084, asymmetry: 1.09 },
    { velocity: 200, platesPerMetre: 14898, hetpMm: 0.067, asymmetry: 1.16 },
  ],
  /** Pressure drop across a 45 cm bed. */
  pressureFlow: [
    { velocity: 300, pressureMPa: 0.2 },
    { velocity: 360, pressureMPa: 0.25 },
  ],
  maxTestedVelocity: "> 400 cm/h",
  /*
    The study states a specification of >= 120 mg/mL for the Precise grade, while the October 2026 product
    list gives 100 mg/mL. The site shows the measured value here and the catalogue value in the product
    table until the client confirms which specification is current (docs/CONTENT_SOURCES.md).
  */
  dbc: { measured: 128, specification: 120, unit: "mg BSA/mL", method: "10% breakthrough, BSA" },
  asymmetryRange: "1.09–1.30",
} as const;

export const PACKING_CASE = {
  title: "Same resin. Same column. Same packing velocity. Different outcome.",
  column: "50 × 300 mm column, 353 mL resin, 25 cm slurry height",
  buffer: "20 mM Tris, 50 mM NaCl, pH 7.5",
  cases: [
    {
      name: "Case 1",
      bed: "18.2 cm compressed bed",
      result: "Sharper peak, better asymmetry and more plates per metre, consistent from 50 to 200 cm/h.",
    },
    {
      name: "Case 2",
      bed: "17 cm compressed bed",
      result: "Broader peak, more tailing and fewer plates per metre.",
    },
  ],
  learning:
    "Packing quality can strongly influence chromatographic reproducibility, even with the same resin, column and packing conditions.",
} as const;

export const SEC_CALIBRATION = {
  resin: "ProtPure Agarose SEC resin, Precise grade (6% cross-linked agarose)",
  column: "50 mm diameter, 45 cm bed height, about 884 mL",
  conditions: "2 mL sample at 4.42 mL/min, about 0.03 MPa",
  /** Elution position in column volumes and partition coefficient Kav. */
  standards: [
    { name: "Blue dextran", mw: 2000, cv: 0.22, kav: null, role: "Void volume marker" },
    { name: "Immunoglobulin G", mw: 150, cv: 0.46, kav: 0.33, role: null },
    { name: "BSA", mw: 66, cv: 0.53, kav: 0.43, role: null },
    { name: "Ovalbumin", mw: 45, cv: 0.63, kav: 0.57, role: null },
    { name: "Proteinase K", mw: 28.9, cv: 0.8, kav: 0.81, role: null },
    { name: "Ribonuclease A", mw: 13.7, cv: 0.83, kav: 0.85, role: null },
    { name: "NaCl", mw: 1, cv: 0.94, kav: null, role: "Total volume marker" },
  ],
  fractionationRange: "about 15–150 kDa (globular proteins)",
  suitability: { platesPerMetre: 4058, hetpCm: 0.0246, asymmetry: 0.89, peak: "NaCl" },
  specs: [
    { label: "Pore size", value: "32–45 nm" },
    { label: "Working pH", value: "2–12" },
    { label: "Working temperature", value: "2–40 °C" },
    { label: "Pressure stability", value: "Up to 0.3 MPa" },
  ],
} as const;

export const IEX_COLUMN_TEST = {
  asymmetry: { value: 1.63, acceptance: "0.80 < As < 1.8" },
  reducedPlateHeight: { value: 1.04, acceptance: "≤ 3" },
} as const;

export const HY_IONIC_MODES = [
  {
    mode: "DEAE mode",
    technique: "Weak anion exchange",
    binds: "Negatively charged proteins",
    bind: "Low salt, e.g. 20 mM Tris-HCl, pH 8.0",
    elute: "Increasing salt, e.g. 0–1 M NaCl",
    dbc: 100,
  },
  {
    mode: "HIC mode",
    technique: "Hydrophobic interaction",
    binds: "Proteins with hydrophobic regions",
    bind: "High salt, e.g. 2 M ammonium sulfate",
    elute: "Decreasing salt",
    dbc: 30,
  },
] as const;
