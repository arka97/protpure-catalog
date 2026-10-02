import { VARIANTS } from "@/data/catalog";
import { familyById, gradeById } from "@/data/families";
import { EMPTY_COLUMNS } from "@/data/hardware";
import { downloadText, toCsv } from "./download";

/** The whole catalogue as a CSV file: one row per catalogue number. */
export function downloadCatalogueCsv() {
  const rows: (string | number)[][] = [
    ...VARIANTS.flatMap(({ product, variant }) =>
      variant.packs.map((pack) => [
        pack.catNo,
        variant.name,
        familyById(product.family).title,
        variant.grade ? gradeById(variant.grade).name : "",
        pack.size,
      ]),
    ),
    ...EMPTY_COLUMNS.map((c) => [
      c.item,
      `Empty column ${c.innerDiameterMm} mm, ${c.adjust === "both-ends" ? "both ends adjustable" : "one end adjustable"}${c.plus ? ", Plus" : ""}`,
      familyById("hardware").title,
      "",
      `${c.bedVolumeMl} mL bed`,
    ]),
  ];
  downloadText(
    "protpure-catalogue-numbers.csv",
    toCsv(["Catalogue number", "Product", "Technique", "Grade", "Pack"], rows),
  );
}
