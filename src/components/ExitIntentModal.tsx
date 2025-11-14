import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adTracking } from "@/lib/adTracking";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const STORAGE_KEY = "exit_intent_shown_v1";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) return;

    const handleMouseOut = (e: MouseEvent) => {
      // Only trigger when leaving viewport at top (desktop)
      if (e.clientY <= 0) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setOpen(true);
      }
    };

    window.addEventListener("mouseout", handleMouseOut);
    return () => window.removeEventListener("mouseout", handleMouseOut);
  }, []);

  const handleLead = () => {
    try {
      adTracking.lead();
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting || submitted) return;

    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("marketing_leads")
        .insert({
          email,
          source: "exit_intent",
          metadata: {
            path: window.location.pathname,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          },
        });

      if (error) {
        console.error("Error saving marketing lead", error);
        setError("Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
        handleLead();
      }
    } catch (err) {
      console.error("Unexpected error saving marketing lead", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Before you go — want a 7-day free trial?</DialogTitle>
          <DialogDescription>
            Create your first professional invoice in under 60 seconds. No credit card required.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm font-medium">
              Get 2–3 quick tips on getting paid faster, straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting || submitted}
              />
              <Button
                type="submit"
                className="whitespace-nowrap"
                disabled={!email || submitting || submitted}
              >
                {submitted ? "Added" : submitting ? "Saving..." : "Send me tips"}
              </Button>
            </div>
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
            {submitted && !error && (
              <p className="text-xs text-muted-foreground">
                You're on the list. We'll only email you occasionally about getting paid faster.
              </p>
            )}
          </form>
          <div className="flex gap-3 justify-end pt-2 border-t mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              No thanks
            </Button>
            <Link to="/get-started" onClick={handleLead}>
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

