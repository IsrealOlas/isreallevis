import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, LockKeyhole, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

type Quote = {
  id: string;
  customer_name: string;
  service: string;
  description: string;
  amount_kobo: number;
  status: "pending" | "paid" | "cancelled";
};

const formatNgn = (amount: number) => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 2,
}).format(amount);

const PayQuote = () => {
  const { quoteId } = useParams();
  const [searchParams] = useSearchParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const reference = searchParams.get("reference");
  const verificationStarted = useRef<string | null>(null);

  const loadQuote = useCallback(async () => {
    if (!quoteId) {
      setMessage("This payment link is incomplete.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.functions.invoke("paystack-checkout", {
      body: { action: "quote", quoteId },
    });

    if (error || data?.error) {
      setMessage(data?.error || "This payment link could not be loaded.");
      setLoading(false);
      return;
    }

    setQuote(data.quote as Quote);
    setLoading(false);
  }, [quoteId]);

  useEffect(() => {
    void loadQuote();
  }, [loadQuote]);

  useEffect(() => {
    if (!reference || !quoteId || verificationStarted.current === reference) return;
    verificationStarted.current = reference;
    let active = true;
    setPaying(true);
    supabase.functions.invoke("paystack-verify", { body: { reference } })
      .then(({ data, error }) => {
        if (!active) return;
        if (error || data?.error) {
          setMessage(data?.error || "We could not confirm this payment yet. Please contact Isreal with your payment receipt.");
          return;
        }
        if (data?.paid && data?.quoteId === quoteId) {
          setQuote((current) => current ? { ...current, status: "paid" } : current);
          setMessage("Your payment was confirmed. Thank you!");
        } else {
          setMessage("Payment is not confirmed yet. If you completed checkout, refresh this page in a moment.");
        }
      })
      .finally(() => {
        if (active) setPaying(false);
      });
    return () => { active = false; };
  }, [reference, quoteId]);

  const startPayment = async () => {
    if (!quoteId) return;
    setPaying(true);
    setMessage("");
    const { data, error } = await supabase.functions.invoke("paystack-checkout", {
      body: { action: "initialize", quoteId },
    });
    setPaying(false);
    if (error || data?.error || !data?.authorizationUrl) {
      setMessage(data?.error || "Checkout could not be started. Please try again.");
      return;
    }
    window.location.assign(data.authorizationUrl as string);
  };

  return (
    <main className="min-h-[70vh] px-4 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Secure project payment</p>
        <h1 className="mb-2 font-heading text-3xl font-bold sm:text-4xl">Your project quote</h1>
        <p className="mb-8 text-muted-foreground">Review the details before continuing to Paystack checkout.</p>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl">{quote?.service || "Quote details"}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading || paying && !reference ? (
              <div className="flex min-h-32 items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading quote</div>
            ) : message && !quote ? (
              <p role="alert" className="text-sm text-destructive">{message}</p>
            ) : quote ? (
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Prepared for</p>
                  <p className="font-medium">{quote.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project details</p>
                  <p className="whitespace-pre-wrap text-sm leading-6">{quote.description}</p>
                </div>
                <div className="flex items-end justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold">{formatNgn(quote.amount_kobo / 100)}</span>
                </div>
                {quote.status === "paid" ? (
                  <div className="flex items-center gap-2 border-t border-border pt-4 font-medium text-primary"><CheckCircle2 className="h-5 w-5" /> Payment confirmed</div>
                ) : quote.status === "cancelled" ? (
                  <p className="border-t border-border pt-4 text-sm text-muted-foreground">This quote is no longer accepting payments.</p>
                ) : (
                  <Button variant="hero" size="lg" className="w-full" onClick={startPayment} disabled={paying}>
                    {paying ? <Loader2 className="animate-spin" /> : <CreditCard />}
                    {paying ? "Opening secure checkout…" : "Pay securely with Paystack"}
                  </Button>
                )}
                {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
                <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" /> Payments are processed securely by Paystack.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PayQuote;