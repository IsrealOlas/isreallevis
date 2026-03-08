
CREATE TABLE public.client_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  platform TEXT DEFAULT 'Other',
  rating INTEGER NOT NULL DEFAULT 5,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review
CREATE POLICY "Anyone can submit reviews"
ON public.client_reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
ON public.client_reviews
FOR SELECT
TO anon, authenticated
USING (approved = true);
