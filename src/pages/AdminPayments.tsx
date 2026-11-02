import { FormEvent, useCallback, useEffect, useState } from "react";
import { Copy, ExternalLink, Loader2, LogIn, LogOut, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ngnToKobo } from "@/lib/paystack";

type Quote = {
  id: string;
  customer_name: string;
  customer_email: string;
  service: string;
  description: string;
  amount_ngn: number;
  amount_kobo: number | null;
  status: "pending" | "paid" | "cancelled";
  created_at: string;
};

const emptyForm = { customerName: "", customerEmail: "", service: "", description: "", amountNgn: "" };
const money = (amountKobo: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amountKobo / 100);

const AdminPayments = () => {
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [paymentReady, setPaymentReady] = useState<boolean | null>(null);

  const callAdmin = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-payments", { body });
    if (error || data?.error) throw new Error(data?.error || "Payment manager is unavailable.");
    return data;
  };

  const loadQuotes = useCallback(async (adminToken: string) => {
    setLoading(true);
    try {
      const data = await callAdmin({ action: "list", token: adminToken });
      setQuotes((data.quotes || []) as Quote[]);
      setPaymentReady(Boolean(data.paymentReady));
    } catch (error) {
      setToken("");
      toast({ title: "Could not load quotes", description: error instanceof Error ? error.message : "Please sign in again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (token) void loadQuotes(token);
  }, [token, loadQuotes]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await callAdmin({ action: "login", password });
      setToken(data.token as string);
      setPassword("");
    } catch (error) {
      toast({ title: "Sign-in failed", description: error instanceof Error ? error.message : "Check the password and try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setCreatedLink("");
    try {
      const amountKobo = ngnToKobo(form.amountNgn);
      const data = await callAdmin({
        action: "create",
        token,
        quote: {
          customerName: form.customerName.trim(),
          customerEmail: form.customerEmail.trim(),
          service: form.service.trim(),
          description: form.description.trim(),
          amountKobo,
        },
      });
      const link = `${window.location.origin}/pay/${data.quote.id}`;
      setCreatedLink(link);
      setForm(emptyForm);
      toast({ title: "Payment link created", description: "Copy the private link and send it to your customer." });
      await loadQuotes(token);
    } catch (error) {
      toast({ title: "Could not create quote", description: error instanceof Error ? error.message : "Review the details and try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const copyLink = async (link: string) => {
    await navigator.clipboard.writeText(link);
    toast({ title: "Link copied" });
  };

  const logout = () => {
    setToken("");
    setQuotes([]);
    setCreatedLink("");
  };

  if (!token) {
    return (
      <main className="min-h-[70vh] px-4 pb-20 pt-28 sm:pt-32">
        <form onSubmit={signIn} className="mx-auto max-w-sm space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Private tools</p>
          <h1 className="font-heading text-3xl font-bold">Payment quotes</h1>
          <p className="text-sm text-muted-foreground">Sign in to create and manage customer payment links.</p>
          <Input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Admin password" />
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <LogIn />} {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="px-4 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Private tools</p><h1 className="font-heading text-3xl font-bold">Payment quotes</h1></div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Refresh quotes" onClick={() => void loadQuotes(token)} disabled={loading}><RefreshCw /></Button>
            <Button variant="outline" onClick={logout}><LogOut /> Sign out</Button>
          </div>
        </div>
        {paymentReady === false && <p role="status" className="border-l-2 border-primary pl-3 text-sm text-muted-foreground">Quotes can be prepared now, but checkout is not connected until Paystack is securely configured.</p>}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Card className="border-border bg-card">
            <CardHeader><CardTitle>Create a customer quote</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={createQuote} className="space-y-4">
                <Input required maxLength={100} placeholder="Customer name" value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} />
                <Input required type="email" maxLength={255} placeholder="Customer email" value={form.customerEmail} onChange={(event) => setForm({ ...form, customerEmail: event.target.value })} />
                <Input required maxLength={160} placeholder="Project or service" value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} />
                <Textarea required maxLength={2000} rows={4} placeholder="What is included in this quote?" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                <div>
                  <label htmlFor="quote-amount" className="mb-1.5 block text-sm font-medium">Total amount (NGN)</label>
                  <Input id="quote-amount" required inputMode="decimal" pattern="[0-9]+(?:\.[0-9]{1,2})?" placeholder="e.g. 150000" value={form.amountNgn} onChange={(event) => setForm({ ...form, amountNgn: event.target.value })} />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={saving}>
                  {saving ? <Loader2 className="animate-spin" /> : <Plus />} {saving ? "Creating link…" : "Create payment link"}
                </Button>
                {createdLink && <div className="space-y-2 border-t border-border pt-4"><p className="text-sm font-medium">Share this private link</p><div className="flex gap-2"><Input readOnly value={createdLink} aria-label="Created payment link" /><Button type="button" variant="outline" size="icon" aria-label="Copy payment link" onClick={() => void copyLink(createdLink)}><Copy /></Button></div></div>}
              </form>
            </CardContent>
          </Card>

          <section>
            <h2 className="mb-4 font-heading text-xl font-semibold">Recent quotes</h2>
            {loading ? <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading quotes…</p> : quotes.length === 0 ? <p className="text-sm text-muted-foreground">No quotes created yet.</p> : (
              <div className="space-y-3">
                {quotes.map((quote) => {
                  const link = `${window.location.origin}/pay/${quote.id}`;
                  return <Card key={quote.id} className="border-border bg-card"><CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                    <div className="min-w-0"><p className="truncate font-semibold">{quote.customer_name} · {quote.service}</p><p className="mt-1 text-sm text-muted-foreground">{money(quote.amount_kobo ?? quote.amount_ngn * 100)} · {new Date(quote.created_at).toLocaleDateString("en-NG")}</p><span className="mt-2 inline-block text-xs uppercase text-primary">{quote.status}</span></div>
                    <div className="flex gap-2"><Button variant="outline" size="icon" aria-label="Copy customer payment link" onClick={() => void copyLink(link)}><Copy /></Button><Button asChild variant="ghost" size="icon" aria-label="Open customer payment page"><a href={link} target="_blank" rel="noreferrer"><ExternalLink /></a></Button></div>
                  </CardContent></Card>;
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminPayments;