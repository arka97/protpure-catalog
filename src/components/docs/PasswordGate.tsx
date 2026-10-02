import { useState, ReactNode, FormEvent } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useDocAuth } from "@/context/DocAuthContext";

export function PasswordGate({ children }: { children: ReactNode }) {
  const { unlocked, unlock } = useDocAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (unlocked) return <>{children}</>;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("verify-doc-password", {
        body: { password },
      });
      if (fnErr) throw fnErr;
      if (data?.ok && data.token && data.expiresAt) {
        unlock(data.token as string, data.expiresAt as number);
      } else {
        setError("Incorrect password.");
      }
    } catch (err) {
      setError("Could not verify password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-paper-2 border border-border flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-accent-foreground" />
          </div>
          <h1 className="heading-4">Protected Documentation</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the password to access the documents hub.
          </p>
        </div>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mb-3"
        />
        {error && <p className="text-sm text-destructive mb-3">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading || !password}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock Documents"}
        </Button>
      </form>
    </div>
  );
}