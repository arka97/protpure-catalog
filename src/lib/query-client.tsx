import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*
  One TanStack Query client for the two places that read from the backend: the LinkedIn feed on the
  contact page and the documents portal. It is provided there, not at the app root, so the library is
  only downloaded by visitors who open those pages.
*/
const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
