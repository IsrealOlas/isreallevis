CREATE TABLE public.paystack_payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.paystack_quotes(id) ON DELETE CASCADE,
  reference TEXT NOT NULL UNIQUE,
  amount_kobo BIGINT NOT NULL CHECK (amount_kobo > 0),
  authorization_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);
GRANT ALL ON public.paystack_payment_attempts TO service_role;
REVOKE ALL ON public.paystack_payment_attempts FROM anon, authenticated;
ALTER TABLE public.paystack_payment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages Paystack payment attempts"
  ON public.paystack_payment_attempts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
