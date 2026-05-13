import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (data?.valid) setState("valid");
        else if (data?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if ((data as any)?.success) setState("done");
      else if ((data as any)?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary/30 py-20 px-6">
        <div className="max-w-md w-full bg-white border border-border rounded-xl p-8 text-center">
          <h1 className="font-serif text-2xl text-navy mb-3">Email preferences</h1>

          {state === "loading" && (
            <div className="flex flex-col items-center gap-3 text-slate">
              <Loader2 className="w-6 h-6 animate-spin text-teal" />
              <p className="text-sm">Validating your link…</p>
            </div>
          )}

          {state === "valid" && (
            <>
              <p className="text-sm text-slate mb-6">
                Click below to unsubscribe from ProtPure emails.
              </p>
              <Button onClick={confirm} className="bg-teal hover:bg-teal-light text-white w-full">
                Confirm unsubscribe
              </Button>
            </>
          )}

          {state === "submitting" && (
            <div className="flex flex-col items-center gap-3 text-slate">
              <Loader2 className="w-6 h-6 animate-spin text-teal" />
              <p className="text-sm">Processing…</p>
            </div>
          )}

          {state === "done" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-teal" />
              <p className="text-sm text-slate">You've been unsubscribed. We're sorry to see you go.</p>
            </div>
          )}

          {state === "already" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-teal" />
              <p className="text-sm text-slate">This address is already unsubscribed.</p>
            </div>
          )}

          {state === "invalid" && (
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="w-10 h-10 text-destructive" />
              <p className="text-sm text-slate">This unsubscribe link is invalid or expired.</p>
            </div>
          )}

          {state === "error" && (
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="w-10 h-10 text-destructive" />
              <p className="text-sm text-slate">
                Something went wrong. Please try again later or email{" "}
                <a className="text-teal" href="mailto:info@protpure.com">info@protpure.com</a>.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}