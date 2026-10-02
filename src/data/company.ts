/*
  Company facts. Sources: intro deck (February 2026), executive and short brochures (June 2026),
  product brochure (August 2026). Nothing here is estimated.
*/

export const FOUNDER = {
  name: "Dr. Rucha P Desai",
  role: "Founding Director",
  quote:
    "Protpure is building India’s next-generation resin platform — combining technical depth, reproducibility, and customization for protein, peptide, and small molecule purification.",
};

export const FACILITY_FACTS: { label: string; value: string }[] = [
  { label: "Location", value: "Anand, Gujarat, India" },
  { label: "Established", value: "May 2023" },
  { label: "Facility", value: "Semi-automated manufacturing and R&D" },
  { label: "Capacity", value: "600 L of agarose resin per month" },
  { label: "In use", value: "GMP facilities, with repeat orders from Indian biopharma companies" },
  { label: "Expansion", value: "Large-scale production plant in active planning" },
  { label: "Team", value: "8–10 people, founder-led" },
  { label: "Funding", value: "Bootstrapped" },
];

export const HEADLINE_FACTS = [
  { value: "600", unit: "L / month", label: "Resin manufacturing capacity in Anand" },
  { value: "2023", unit: "", label: "Established, and bootstrapped since" },
  { value: "GMP", unit: "", label: "Facilities use ProtPure resins, with repeat orders" },
];

export const MILESTONES = [
  "First Indian manufacturer of Ni-NTA Agarose",
  "Commercial supply of Ni-NTA Agarose executed",
  "Indigenous ion-exchange media developed",
  "Products qualified with biotechnology organisations",
  "Indigenous manufacturing capability established",
  "Portfolio expanding into mixed-mode and metal-removal resins",
];

export const VISION =
  "To establish a globally competitive, indigenous chromatography resin platform supporting India’s growing biotechnology and biopharmaceutical ecosystem.";

export const MISSION =
  "To develop and manufacture affordable, reliable and scalable chromatography media for protein purification, diagnostics and advanced biotechnology applications.";

export const CAPABILITIES = [
  {
    title: "Bead synthesis and cross-linking",
    text: "Agarose beads are formed and cross-linked in-house, with controlled bead size distribution for each grade.",
  },
  {
    title: "Ligand chemistry",
    text: "Sulfopropyl, quaternary amine, DEAE, phenyl and NTA ligands are coupled to the beads in-house.",
  },
  {
    title: "Column packing and evaluation",
    text: "Media are packed and evaluated in our own columns: asymmetry, plate height, pressure–flow and binding capacity.",
  },
  {
    title: "Process development",
    text: "A protein purification system supports method development, purification optimisation and customer evaluations.",
  },
];

export const WHY_PROTPURE = [
  {
    title: "Indigenous manufacturing",
    text: "Chromatography media made in India reduce dependence on imported resin.",
  },
  {
    title: "Multiple chromatography platforms",
    text: "Affinity, ion exchange, HIC, mixed-mode and SEC from one supplier.",
  },
  {
    title: "End-to-end capability",
    text: "From media development to purification evaluation.",
  },
  {
    title: "A scalable roadmap",
    text: "Building future-ready capabilities to support India’s biotechnology growth.",
  },
];

export const INDUSTRIES = [
  { name: "Biologics and biosimilars", items: ["Recombinant proteins", "Monoclonal antibodies", "Fusion proteins"] },
  { name: "Vaccines", items: ["Recombinant antigens", "Protein vaccines", "Purification workflows"] },
  { name: "Diagnostics", items: ["Diagnostic proteins", "Enzymes", "Biomarkers"] },
  { name: "Research and academia", items: ["Protein purification", "Method development", "Life-sciences research"] },
  { name: "Industrial biotechnology", items: ["Enzymes", "Fermentation products", "Speciality proteins"] },
  {
    name: "Gene editing and advanced therapies",
    items: ["CRISPR proteins", "Nucleases", "Gene-editing workflows"],
  },
];

/** How an evaluation is run with a new customer (intro deck, "Evaluation strategy"). */
export const EVALUATION_STEPS = [
  {
    title: "Start at bench scale",
    text: "Begin with a small pack at laboratory or bench scale, under your existing SOPs.",
  },
  {
    title: "Compare side by side",
    text: "Run ProtPure next to your current resin if you want a direct comparison.",
  },
  {
    title: "Iterate on feedback",
    text: "Share what you see. Our scientists work through it with you, run by run.",
  },
  {
    title: "Decide on data",
    text: "The outcome is technical data. Let it guide the decision.",
  },
];
