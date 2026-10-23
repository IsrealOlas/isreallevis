ALTER TABLE public.paystack_quotes ADD COLUMN amount_kobo BIGINT;
ALTER TABLE public.paystack_quotes ADD CONSTRAINT paystack_quotes_amount_kobo_valid CHECK (amount_kobo IS NULL OR amount_kobo BETWEEN 100 AND 10000000000000);
COMMENT ON COLUMN public.paystack_quotes.amount_ngn IS 'DEPRECATED: use amount_kobo for exact NGN amount';
CREATE POLICY "Service role manages Paystack quotes"
  ON public.paystack_quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
