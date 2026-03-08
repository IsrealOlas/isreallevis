-- Drop overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;

-- Recreate with proper constraints instead of WITH CHECK (true)

-- Reviews: validate required fields and ensure new reviews are unapproved
CREATE POLICY "Anyone can submit reviews"
  ON public.client_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) > 0 AND char_length(name) <= 100
    AND char_length(message) > 0 AND char_length(message) <= 1000
    AND rating >= 1 AND rating <= 5
    AND approved = false
  );

-- Contact inquiries: validate required fields
CREATE POLICY "Anyone can submit contact inquiries"
  ON public.contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) > 0 AND char_length(name) <= 100
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(message) > 0 AND char_length(message) <= 1000
  );