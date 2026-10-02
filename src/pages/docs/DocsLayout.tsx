import { Outlet } from "react-router-dom";
import { PasswordGate } from "@/components/docs/PasswordGate";
import { DocAuthProvider } from "@/context/DocAuthContext";
import { QueryProvider } from "@/lib/query-client";

/** Password-protected project documentation (/documents). Kept outside the public site frame. */
export default function DocsLayout() {
  return (
    <QueryProvider>
      <DocAuthProvider>
        <PasswordGate>
          <Outlet />
        </PasswordGate>
      </DocAuthProvider>
    </QueryProvider>
  );
}
