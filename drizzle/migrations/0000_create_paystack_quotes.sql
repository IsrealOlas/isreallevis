CREATE TABLE public.paystack_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL CHECK (char_length(customer_name) BETWEEN 1 AND 100),
  customer_email TEXT NOT NULL CHECK (char_length(customer_email) BETWEEN 3 AND 255),
  service TEXT NOT NULL CHECK (char_length(service) BETWEEN 1 AND 160),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 1 AND 2000),
  amount_ngn BIGINT NOT NULL CHECK (amount_ngn > 0 AND amount_ngn <= 100000000000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  paystack_reference TEXT UNIQUE,
  paystack_transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);
GRANT ALL ON public.paystack_quotes TO service_role;
REVOKE ALL ON public.paystack_quotes FROM anon, authenticated;
ALTER TABLE public.paystack_quotes ENABLE ROW LEVEL SECURITY;
