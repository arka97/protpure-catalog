import visionAndPitch from "./01-vision-and-pitch.md?raw";
import businessAndScope from "./02-business-and-scope.md?raw";
import productAndUx from "./03-product-and-ux.md?raw";
import functionalSpec from "./04-functional-spec.md?raw";
import architectureAndTech from "./05-architecture-and-tech.md?raw";
import buildAndOperations from "./06-build-and-operations.md?raw";
import databaseReference from "./07-database-reference.md?raw";
import edgeFunctionsReference from "./08-edge-functions-reference.md?raw";
import frontendArchitecture from "./09-frontend-architecture.md?raw";
import componentAndDesign from "./10-component-and-design.md?raw";
import decisionsLog from "./11-decisions-log.md?raw";
import moneyAndMembership from "./12-money-and-membership.md?raw";
import operationsRunbook from "./13-operations-runbook.md?raw";
import roadmapAndGlossary from "./14-roadmap-and-glossary.md?raw";

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
  { number: "01", slug: "vision-and-pitch", title: "Vision & Pitch", summary: "Why ProtPure exists, the 60-second pitch, and the three-year north star.", readTime: "4 min", diagramCount: 1 },
  { number: "02", slug: "business-and-scope", title: "Business & Scope", summary: "Revenue streams, market sizing, segments, pricing, and what's out of scope for v1.", readTime: "5 min", diagramCount: 1 },
  { number: "03", slug: "product-and-ux", title: "Product & UX", summary: "Site IA, primary user journeys, interaction patterns, and accessibility commitments.", readTime: "6 min", diagramCount: 1 },
  { number: "04", slug: "functional-spec", title: "Functional Spec", summary: "Feature inventory and acceptance criteria for the public site.", readTime: "7 min", diagramCount: 1 },
  { number: "05", slug: "architecture-and-tech", title: "Architecture & Tech", summary: "Stack, system context, routing, providers, and request flows.", readTime: "6 min", diagramCount: 2 },
  { number: "06", slug: "build-and-operations", title: "Build & Operations", summary: "Local dev, env vars, deploy pipeline, custom domains, SEO, and the release checklist.", readTime: "5 min", diagramCount: 1 },
  { number: "07", slug: "database-reference", title: "Database Reference", summary: "Current persistence footprint and the planned RFQ schema.", readTime: "4 min", diagramCount: 1, internal: true },
  { number: "08", slug: "edge-functions-reference", title: "Edge Functions Reference", summary: "Live and planned Edge Functions, contracts, and conventions.", readTime: "4 min", diagramCount: 1, internal: true },
  { number: "09", slug: "frontend-architecture", title: "Frontend Architecture", summary: "Folder layout, routing, providers, data flow, and editing rules.", readTime: "6 min", diagramCount: 1, internal: true },
  { number: "10", slug: "component-and-design", title: "Components & Design System", summary: "Tokens, typography, shadcn primitives, and the dos and don'ts.", readTime: "5 min", diagramCount: 0, internal: true },
  { number: "11", slug: "decisions-log", title: "Decisions Log", summary: "ADR-style record of choices that shaped v1.", readTime: "4 min", diagramCount: 0, internal: true },
  { number: "12", slug: "money-and-membership", title: "Money & Membership", summary: "Pricing model, quote-to-cash flow, and the future customer-portal sketch.", readTime: "4 min", diagramCount: 0, internal: true },
  { number: "13", slug: "operations-runbook", title: "Operations Runbook", summary: "How to do recurring tasks safely and how to triage incidents.", readTime: "5 min", diagramCount: 1, internal: true },
  { number: "14", slug: "roadmap-and-glossary", title: "Roadmap & Glossary", summary: "Directional roadmap, deferred items, tracked risks, and the term glossary.", readTime: "4 min", diagramCount: 0, internal: true },
];

export const SOURCES: Record<string, string> = {
  "vision-and-pitch": visionAndPitch,
  "business-and-scope": businessAndScope,
  "product-and-ux": productAndUx,
  "functional-spec": functionalSpec,
  "architecture-and-tech": architectureAndTech,
  "build-and-operations": buildAndOperations,
  "database-reference": databaseReference,
  "edge-functions-reference": edgeFunctionsReference,
  "frontend-architecture": frontendArchitecture,
  "component-and-design": componentAndDesign,
  "decisions-log": decisionsLog,
  "money-and-membership": moneyAndMembership,
  "operations-runbook": operationsRunbook,
  "roadmap-and-glossary": roadmapAndGlossary,
};

export function getDoc(slug: string): { meta: DocMeta; source: string } | null {
  const meta = DOCS.find((d) => d.slug === slug);
  const source = SOURCES[slug];
  if (!meta || !source) return null;
  return { meta, source };
}
