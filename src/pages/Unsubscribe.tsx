import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/data/site";
import { useSeo } from "@/lib/seo";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/** Email preference page reached from the unsubscribe link in ProtPure emails. */
export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useSeo({ title: "Email preferences", description: "Unsubscribe from ProtPure emails.", noindex: true });

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          {
            headers: { apikey: SUPABASE_KEY },
          },
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
      const { data, error } = await supabase.functions.invoke<{ success?: boolean; reason?: string }>(
        "handle-email-unsubscribe",
        {
          body: { token },
        },
      );
      if (error) throw error;
      if (data?.success) setState("done");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  const busy = state === "loading" || state === "submitting";

  return (
    <section className="shell flex min-h-[60vh] items-center justify-center py-20">
      <div
        className="w-full max-w-md rounded-panel border border-rule bg-card p-8 text-center sm:p-10"
        aria-live="polite"
      >
        <p className="label text-ink-3">Email preferences</p>
        <h1 className="heading-4 mt-3">
          {state === "done" || state === "already" ? "You are unsubscribed" : "Unsubscribe from ProtPure emails"}
        </h1>

        {busy && (
          <p className="mt-6 flex items-center justify-center gap-2 text-ink-2">
            <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
            {state === "loading" ? "Checking your link" : "Updating your preferences"}
          </p>
        )}

        {state === "valid" && (
          <>
            <p className="mt-4 text-ink-2">Confirm below and we will stop sending emails to this address.</p>
            <Button onClick={confirm} size="lg" className="mt-6 w-full">
              Confirm unsubscribe
            </Button>
          </>
        )}

        {state === "done" && (
          <p className="mt-6 flex flex-col items-center gap-3 text-ink-2">
            <CheckCircle2 aria-hidden className="h-9 w-9 text-sec" />
            This address will no longer receive emails from us.
          </p>
        )}

        {state === "already" && (
          <p className="mt-6 flex flex-col items-center gap-3 text-ink-2">
            <CheckCircle2 aria-hidden className="h-9 w-9 text-sec" />
            This address was already unsubscribed.
          </p>
        )}

        {state === "invalid" && (
          <p className="mt-6 flex flex-col items-center gap-3 text-ink-2">
            <AlertCircle aria-hidden className="h-9 w-9 text-destructive" />
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {state === "error" && (
          <p className="mt-6 flex flex-col items-center gap-3 text-ink-2">
            <AlertCircle aria-hidden className="h-9 w-9 text-destructive" />
            <span>
              Something went wrong. Try again later, or email{" "}
              <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
