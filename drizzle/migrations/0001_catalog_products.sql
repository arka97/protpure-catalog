CREATE TABLE public.catalog_products (
  slug text PRIMARY KEY,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.catalog_products TO anon, authenticated;
GRANT ALL ON public.catalog_products TO service_role;
ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published catalogue products are publicly readable" ON public.catalog_products FOR SELECT USING (published = true);
CREATE TRIGGER update_catalog_products_updated_at BEFORE UPDATE ON public.catalog_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
COMMENT ON TABLE public.products IS 'DEPRECATED: replaced by catalog_products (full website product model in data jsonb)';