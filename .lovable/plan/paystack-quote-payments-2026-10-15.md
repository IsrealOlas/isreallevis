# Paystack quote payments

## User experience
- Add a password-protected `/admin/payments` page where Isreal can create a customer-specific quote in NGN and copy its private payment link.
- Add a public `/pay/:quoteId` page showing quote details and a Paystack checkout button; mark a quote paid only after server-side Paystack verification.

## Secure payment flow
- Store quote amount, customer details, status, and unique payment reference in a new RLS-protected table accessible only to `service_role`.
- Reuse the existing server-validated admin token for quote creation/listing; keep Paystack API secrets server-side.
- Add server functions to create and verify transactions, plus a signed Paystack webhook for reliable payment confirmation. Match verified transaction status, amount, currency, and reference to the saved quote.
- Add focused tests for NGN-to-kobo conversion and successful-payment matching. Keep test mode as the initial setup; live payments require a live Paystack key.

## Technical details
- Use Paystack's transaction initialize/verify APIs and NGN kobo amounts; never accept an amount from the public checkout page.
- Do not expose direct anonymous database access to quotes. Payment confirmation is idempotent and signature-verified.
- Add the quote-management and payment routes to the existing React app and document the architecture in `AGENTS.md`.
