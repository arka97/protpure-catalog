import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useDocAuth } from "@/context/DocAuthContext";

export interface DocMeta {
  number: string;
  slug: string;
  title: string;
  summary: string;
  read_time: string;
  diagram_count: number;
  internal: boolean;
  sort_order: number;
}

export interface DocFull extends DocMeta {
  body: string;
}

async function callDocsContent(token: string, slug?: string) {
  const { data, error } = await supabase.functions.invoke("docs-content", {
    body: slug ? { token, slug } : { token },
  });
  if (error) throw error;
  if ((data as { error?: string })?.error) {
    throw new Error((data as { error: string }).error);
  }
  return data;
}

export function useDocsList() {
  const { token } = useDocAuth();
  return useQuery({
    queryKey: ["docs-list", token],
    enabled: !!token,
    queryFn: async () => {
      const data = await callDocsContent(token!);
      return (data as { docs: DocMeta[] }).docs;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDoc(slug: string) {
  const { token } = useDocAuth();
  return useQuery({
    queryKey: ["doc", slug, token],
    enabled: !!token && !!slug,
    queryFn: async () => {
      const data = await callDocsContent(token!, slug);
      return (data as { doc: DocFull }).doc;
    },
    staleTime: 5 * 60 * 1000,
  });
}