CREATE TABLE public.docs (
  slug text PRIMARY KEY,
  number text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  read_time text NOT NULL,
  diagram_count integer NOT NULL DEFAULT 0,
  internal boolean NOT NULL DEFAULT false,
  body text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.docs ENABLE ROW LEVEL SECURITY;

-- Deliberately NO policies. Only the service role (used by edge functions) can read/write.

CREATE TRIGGER update_docs_updated_at
BEFORE UPDATE ON public.docs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();