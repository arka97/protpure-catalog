import { describe, expect, it } from "vitest";
import { productBySlug } from "@/data/catalog";
import { packRange, packToItem, variantHeadline } from "@/lib/catalog-helpers";
import { toCsv } from "@/lib/download";
import { sciToText } from "@/lib/sci";

describe("packRange", () => {
  it("shows the smallest and largest pack", () => {
    expect(packRange(productBySlug("sp-agarose")!.variants[0].packs)).toBe("25 mL – 1 L");
  });

  it("shows both sizes when there are two", () => {
    expect(packRange(productBySlug("ni-nta-agarose")!.variants[2].packs)).toBe("25 mL / 100 mL");
  });

  it("reads column packs as counts of one size", () => {
    expect(packRange(productBySlug("ni-nta-prepacked-columns")!.variants[0].packs)).toBe("1 or 5 × 1 mL");
  });

  it("copes with a single pack and with none", () => {
    expect(packRange([{ catNo: "X", size: "1 kit" }])).toBe("1 kit");
    expect(packRange([])).toBe("");
  });
});

describe("variantHeadline", () => {
  it("leads with binding capacity", () => {
    expect(variantHeadline(productBySlug("q-agarose")!.variants[2])).toBe("140 mg BSA/mL capacity");
  });

  it("names the mode when a resin has more than one capacity", () => {
    expect(variantHeadline(productBySlug("hy-ionic-dp")!.variants[0])).toBe(
      "100 mg BSA/mL in DEAE mode · 30 mg BSA/mL in HIC mode",
    );
  });

  it("falls back to bead size, then to nothing", () => {
    expect(variantHeadline(productBySlug("plain-agarose")!.variants[0])).toBe("~90 µm mean bead diameter");
    expect(variantHeadline(productBySlug("mr-agarose")!.variants[0])).toBeUndefined();
  });
});

describe("packToItem", () => {
  it("keys a quote-list item by its catalogue number", () => {
    const product = productBySlug("sp-agarose")!;
    const variant = product.variants[0];
    expect(packToItem(product, variant, variant.packs[0])).toEqual({
      id: "SPFF01",
      kind: "product",
      name: "SP Agarose Fast Flow",
      catNo: "SPFF01",
      pack: "25 mL",
      href: "/products/sp-agarose",
      variantId: "sp-agarose-ff",
    });
  });
});

describe("text helpers", () => {
  it("quotes CSV cells that need it", () => {
    expect(
      toCsv(
        ["a", "b"],
        [
          ["1 mL", 'say "hi"'],
          ["x,y", 2],
        ],
      ),
    ).toBe('a,b\r\n1 mL,"say ""hi"""\r\n"x,y",2');
  });

  it("flattens scientific notation for plain text", () => {
    expect(sciToText("0.18–0.25 mmol H^{+}/mL")).toBe("0.18–0.25 mmol H+/mL");
    expect(sciToText("Ni^{2+} and H_{2}O")).toBe("Ni2+ and H2O");
  });
});
