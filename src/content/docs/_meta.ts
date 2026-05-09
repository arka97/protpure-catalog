import vision from "./01-vision.md?raw";
import business from "./02-business.md?raw";
import technology from "./03-technology.md?raw";
import roadmap from "./04-internal-roadmap.md?raw";
import financials from "./05-internal-financials.md?raw";

export interface DocMeta {
  number: string;
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  diagramCount: number;
  internal?: boolean;
}

export const DOCS: DocMeta[] = [
  { number: "01", slug: "vision", title: "Vision", summary: "Why ProtPure exists and where we're headed.", readTime: "3 min", diagramCount: 1 },
  { number: "02", slug: "business", title: "Business Model", summary: "Revenue streams, segments, and pricing.", readTime: "4 min", diagramCount: 0 },
  { number: "03", slug: "technology", title: "Technology", summary: "Bead architecture, ligand chemistry, and QC.", readTime: "5 min", diagramCount: 0 },
  { number: "04", slug: "internal-roadmap", title: "Internal Roadmap", summary: "Confidential 2026 milestones and risks.", readTime: "3 min", diagramCount: 0, internal: true },
  { number: "05", slug: "internal-financials", title: "Internal Financials", summary: "Confidential FY26 revenue and burn targets.", readTime: "2 min", diagramCount: 0, internal: true },
];

export const SOURCES: Record<string, string> = {
  vision,
  business,
  technology,
  "internal-roadmap": roadmap,
  "internal-financials": financials,
};

export function getDoc(slug: string): { meta: DocMeta; source: string } | null {
  const meta = DOCS.find((d) => d.slug === slug);
  const source = SOURCES[slug];
  if (!meta || !source) return null;
  return { meta, source };
}
