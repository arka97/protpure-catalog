import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/product";
import { products as fallback } from "@/data/products";

type Row = {
  id: string;
  sort_order: number;
  name: string;
  subtitle: string;
  chromatography_type: Product["chromatographyType"];
  exchanger_type: Product["exchangerType"];
  status: Product["status"];
  ligand: string;
  matrix: string;
  particle_size_range: string;
  particle_size_d50v: string;
  ionic_capacity: string | null;
  dbc: string;
  dbc_unit: string;
  flow_spec: string;
  max_flow_velocity: string;
  ph_cip: string;
  ph_operational: string;
  chemical_stability: string;
  storage: string;
  delivery_time: string;
  pack_sizes: Product["packSizes"];
  applications: string[];
  flow_variant: Product["flowVariant"];
  tags: string[];
};

function rowToProduct(r: Row): Product {
  return {
    id: r.id,
    name: r.name,
    subtitle: r.subtitle,
    chromatographyType: r.chromatography_type,
    exchangerType: r.exchanger_type,
    status: r.status,
    ligand: r.ligand,
    matrix: r.matrix,
    particleSizeRange: r.particle_size_range,
    particleSizeD50V: r.particle_size_d50v,
    ionicCapacity: r.ionic_capacity,
    dbc: r.dbc,
    dbcUnit: r.dbc_unit,
    flowSpec: r.flow_spec,
    maxFlowVelocity: r.max_flow_velocity,
    phCIP: r.ph_cip,
    phOperational: r.ph_operational,
    chemicalStability: r.chemical_stability,
    storage: r.storage,
    deliveryTime: r.delivery_time,
    packSizes: r.pack_sizes,
    applications: r.applications,
    flowVariant: r.flow_variant,
    tags: r.tags,
  };
}

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as unknown as Row[]).map(rowToProduct);
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: fallback,
  });
  return {
    products: query.data ?? fallback,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useProduct(id: string | null | undefined) {
  const { products } = useProducts();
  if (!id) return null;
  return products.find((p) => p.id === id) ?? null;
}