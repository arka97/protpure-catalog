import { hydrateCatalog } from "@/data/catalog";
import type { Product } from "@/types/catalog";

/** Loads the catalogue from the database; resolves true when it differs from what is shown. */
export async function syncCatalogFromDatabase(): Promise<boolean> {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("catalog_products")
      .select("data")
      .order("sort_order", { ascending: true });
    if (error || !data) return false;
    return hydrateCatalog(data.map((r) => r.data as unknown as Product));
  } catch {
    return false;
  }
}
