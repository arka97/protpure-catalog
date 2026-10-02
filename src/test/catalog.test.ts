import { describe, expect, it } from "vitest";
import { APPLICATIONS, applicationsForProduct } from "@/data/applications";
import { CATALOGUE_COUNT, FEATURED_SLUGS, PRODUCTS, productBySlug, SKU_COUNT, VARIANTS } from "@/data/catalog";
import { FAMILIES, GRADES, STAGES } from "@/data/families";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { PACKS } from "@/data/packs";
import { RESOURCES } from "@/data/resources";
import { SERVICES } from "@/data/services";

/*
  The catalogue is transcribed from the client's workbooks. These tests keep the transcription honest:
  the counts match the sheets, nothing is listed twice, and every cross-reference points at something real.
*/

describe("catalogue", () => {
  it("has the 190 catalogue items of the product-code sheet", () => {
    expect(SKU_COUNT).toBe(190);
  });

  it("has the 64 empty columns of the accessories sheet", () => {
    expect(EMPTY_COLUMNS).toHaveLength(64);
  });

  it("states one total everywhere: 254 catalogue numbers", () => {
    expect(CATALOGUE_COUNT).toBe(254);
  });

  it("never lists a catalogue number twice", () => {
    const numbers = [
      ...VARIANTS.flatMap((v) => v.variant.packs.map((p) => p.catNo)),
      ...EMPTY_COLUMNS.map((c) => c.item),
    ];
    const duplicates = numbers.filter((n, i) => numbers.indexOf(n) !== i);
    expect(duplicates).toEqual([]);
  });

  it("uses every pack list exactly once", () => {
    const used = VARIANTS.map((v) => v.variant.id).sort();
    expect(used).toEqual(Object.keys(PACKS).sort());
    for (const { variant } of VARIANTS) {
      expect(variant.packs, `packs of ${variant.id}`).toBe(PACKS[variant.id]);
      expect(variant.packs.length, `packs of ${variant.id}`).toBeGreaterThan(0);
    }
  });

  it("gives every product a unique slug, a known family and known stages", () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const familyIds = FAMILIES.map((f) => f.id);
    const stageIds = STAGES.map((s) => s.id);
    const gradeIds = GRADES.map((g) => g.id);
    for (const p of PRODUCTS) {
      expect(familyIds, p.slug).toContain(p.family);
      for (const s of p.stages) expect(stageIds, p.slug).toContain(s);
      for (const v of p.variants) if (v.grade) expect(gradeIds, v.id).toContain(v.grade);
      expect(p.summary.length, p.slug).toBeGreaterThan(20);
      expect(p.body.length, p.slug).toBeGreaterThan(0);
    }
  });

  it("only relates and features products that exist", () => {
    for (const p of PRODUCTS) {
      for (const slug of p.related) {
        expect(productBySlug(slug), `${p.slug} → ${slug}`).toBeDefined();
        expect(slug, `${p.slug} relates to itself`).not.toBe(p.slug);
      }
    }
    for (const slug of FEATURED_SLUGS) expect(productBySlug(slug), slug).toBeDefined();
  });

  it("links every document to products that exist", () => {
    const ids = RESOURCES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of RESOURCES)
      for (const slug of r.products) expect(productBySlug(slug), `${r.id} → ${slug}`).toBeDefined();
  });

  it("has four services with unique codes", () => {
    expect(SERVICES.map((s) => s.code)).toEqual(["SC001", "SC002", "SC003", "SC004"]);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(4);
  });
});

describe("application matrix", () => {
  it("covers 10 applications and 21 workflows", () => {
    expect(APPLICATIONS).toHaveLength(10);
    expect(APPLICATIONS.reduce((n, a) => n + a.subs.length, 0)).toBe(21);
  });

  it("only recommends resins and grades that are in the catalogue", () => {
    for (const app of APPLICATIONS) {
      for (const sub of app.subs) {
        for (const [stage, rec] of Object.entries(sub.stages)) {
          for (const ref of rec.refs) {
            const where = `${app.slug}/${sub.slug}/${stage}: ${ref.href}`;
            const product = /^\/products\/([^?]+)/.exec(ref.href);
            const family = /^\/products\?family=([a-z]+)/.exec(ref.href);
            const grade = /[?&]grade=([a-z]+)/.exec(ref.href)?.[1];
            expect(grade, where).toBe(ref.grade);
            if (product) {
              const p = productBySlug(product[1]);
              expect(p, where).toBeDefined();
              if (grade)
                expect(
                  p!.variants.some((v) => v.grade === grade),
                  where,
                ).toBe(true);
            } else {
              expect(family, where).not.toBeNull();
              const inFamily = PRODUCTS.filter((p) => p.family === family![1]);
              expect(inFamily.length, where).toBeGreaterThan(0);
              if (grade)
                expect(
                  inFamily.some((p) => p.variants.some((v) => v.grade === grade)),
                  where,
                ).toBe(true);
            }
          }
        }
      }
    }
  });

  it("gives every sub-application a unique anchor within its page", () => {
    for (const app of APPLICATIONS) {
      const slugs = app.subs.map((s) => s.slug);
      expect(new Set(slugs).size, app.slug).toBe(slugs.length);
    }
  });

  it("finds the applications that recommend a product", () => {
    expect(applicationsForProduct("mr-agarose").map((a) => a.slug)).toEqual(["peptides"]);
    expect(applicationsForProduct("activated-agarose").map((a) => a.slug)).toContain("desalting");
    expect(applicationsForProduct("empty-columns")).toEqual([]);
  });
});

describe("site rules", () => {
  // Client instruction: the site must never offer samples. Method wording such as "sample load" is fine.
  it("never offers samples", () => {
    const sources = import.meta.glob("/src/**/*.{ts,tsx}", { query: "?raw", import: "default", eager: true }) as Record<
      string,
      string
    >;
    const offer =
      /free\s+samples?|request\s+(a\s+|your\s+)?samples?|samples?\s+(are\s+)?available|evaluation\s+samples?|sample\s+requests?|get\s+(a\s+)?samples?/i;
    const offenders = Object.entries(sources)
      .filter(([file]) => !file.includes("/test/"))
      .filter(([, text]) => offer.test(text))
      .map(([file]) => file);
    expect(offenders).toEqual([]);
  });
});
