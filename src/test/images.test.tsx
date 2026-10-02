import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PackLineup, ProductFigure, ProductThumb } from "@/components/catalog/ProductFigure";
import { MoleculeGlyph } from "@/components/viz/MoleculeGlyph";
import { APPLICATIONS } from "@/data/applications";
import { PRODUCTS, productBySlug } from "@/data/catalog";
import { PHOTOS } from "@/data/photos";
import { PACK_LINEUP, PRODUCT_VISUALS, visualForProduct } from "@/data/product-visuals";
import { RESOURCES } from "@/data/resources";

/*
  Pictures follow the same rule as the text: show only what the client's material supports, and say what it is.
  These tests keep that rule in place when a product line or a picture is added.
*/

afterEach(cleanup);

describe("product pictures", () => {
  it("gives every product line exactly one picture, and no picture to a line that does not exist", () => {
    expect(Object.keys(PRODUCT_VISUALS).sort()).toEqual(PRODUCTS.map((p) => p.slug).sort());
  });

  it("captions every drawing as an illustration, so it is never taken for the product", () => {
    for (const [slug, visual] of Object.entries(PRODUCT_VISUALS)) {
      if (visual.kind === "illustration") expect(visual.caption, slug).toMatch(/^Illustration: /);
      else expect(visual.caption, slug).not.toMatch(/illustration/i);
    }
  });

  it("shows a pack image only for a line that sells that pack, and names the line in its description", () => {
    for (const [slug, visual] of Object.entries(PRODUCT_VISUALS)) {
      if (visual.kind !== "pack") continue;
      const product = productBySlug(slug)!;
      expect(visual.caption, slug).toBe("500 mL pack");
      expect(visual.image.alt, slug).toContain(product.name);
      const sizes = product.variants.flatMap((v) => v.packs.map((p) => p.size));
      expect(sizes, slug).toContain("500 mL");
    }
  });

  it("renders a described picture and a caption for every product line", () => {
    for (const product of PRODUCTS) {
      const { container, unmount } = render(<ProductFigure visual={visualForProduct(product.slug)!} />);
      const img = container.querySelector("img");
      const drawing = container.querySelector("svg[role='img']");
      const description = img?.getAttribute("alt") ?? drawing?.getAttribute("aria-label") ?? "";
      expect(description.length, product.slug).toBeGreaterThan(20);
      expect(container.querySelector("figcaption")?.textContent?.length, product.slug).toBeGreaterThan(5);
      unmount();
    }
  });

  it("keeps card thumbnails out of the accessibility tree: the product name is right beside them", () => {
    for (const product of PRODUCTS) {
      const { container, unmount } = render(<ProductThumb slug={product.slug} />);
      expect(container.firstElementChild, product.slug).toHaveAttribute("aria-hidden", "true");
      unmount();
    }
    expect(render(<ProductThumb slug="no-such-product" />).container).toBeEmptyDOMElement();
  });

  it("lines up only pack images at the top of the catalogue, and names each of them", () => {
    for (const slug of PACK_LINEUP) expect(visualForProduct(slug)?.kind, slug).toBe("pack");
    const { getByRole } = render(<PackLineup />);
    const label = getByRole("img").getAttribute("aria-label")!;
    for (const slug of PACK_LINEUP) expect(label).toContain(productBySlug(slug)!.name);
  });
});

describe("photographs and covers", () => {
  it("describes every photograph and reserves its space", () => {
    for (const [name, photo] of Object.entries(PHOTOS)) {
      expect(photo.alt.length, name).toBeGreaterThan(20);
      expect(photo.alt, name).toMatch(/\.$/);
      expect(photo.width, name).toBeGreaterThan(0);
      expect(photo.height, name).toBeGreaterThan(0);
      expect(photo.srcSet, name).toContain(`${photo.width}w`);
    }
  });

  it("gives every document a cover thumbnail", () => {
    for (const r of RESOURCES) {
      expect(r.cover.src, r.id).toBeTruthy();
      expect(r.cover.width, r.id).toBe(200);
      expect(r.cover.height, r.id).toBeGreaterThan(0);
    }
  });
});

describe("application pictograms", () => {
  it("draws one for every application area, as decoration", () => {
    for (const app of APPLICATIONS) {
      const { container, unmount } = render(<MoleculeGlyph slug={app.slug} />);
      const svg = container.querySelector("svg");
      expect(svg, app.slug).not.toBeNull();
      expect(svg, app.slug).toHaveAttribute("aria-hidden", "true");
      expect(svg!.querySelectorAll("circle").length, app.slug).toBeGreaterThan(4);
      unmount();
    }
    expect(render(<MoleculeGlyph slug="no-such-application" />).container).toBeEmptyDOMElement();
  });
});
