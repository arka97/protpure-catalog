import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*
  The TanStack Query client for the one place that reads from the backend: the documents portal.
  It is provided there, not at the app root, so the library is only downloaded by visitors who open
  those pages.
*/
const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
