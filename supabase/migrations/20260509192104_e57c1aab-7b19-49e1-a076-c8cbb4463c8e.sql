-- Products catalog table
CREATE TYPE public.product_status AS ENUM ('available', 'evaluation', 'pipeline');
CREATE TYPE public.chromatography_type AS ENUM ('iec', 'affinity', 'sec', 'hic', 'magnetic');
CREATE TYPE public.exchanger_type AS ENUM ('strong-cation', 'weak-cation', 'strong-anion', 'weak-anion');
CREATE TYPE public.flow_variant AS ENUM ('faster', 'standard', 'precise', 'hr');

CREATE TABLE public.products (
  id text PRIMARY KEY,
  sort_order integer NOT NULL DEFAULT 0,
  name text NOT NULL,
  subtitle text NOT NULL,
  chromatography_type public.chromatography_type NOT NULL,
  exchanger_type public.exchanger_type,
  status public.product_status NOT NULL DEFAULT 'available',
  ligand text NOT NULL,
  matrix text NOT NULL,
  particle_size_range text NOT NULL,
  particle_size_d50v text NOT NULL,
  ionic_capacity text,
  dbc text NOT NULL,
  dbc_unit text NOT NULL,
  flow_spec text NOT NULL,
  max_flow_velocity text NOT NULL,
  ph_cip text NOT NULL,
  ph_operational text NOT NULL,
  chemical_stability text NOT NULL,
  storage text NOT NULL,
  delivery_time text NOT NULL,
  pack_sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  applications text[] NOT NULL DEFAULT '{}',
  flow_variant public.flow_variant NOT NULL DEFAULT 'standard',
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Catalog is public information; anyone can read.
CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_products_chromatography_type ON public.products(chromatography_type);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_sort_order ON public.products(sort_order);
