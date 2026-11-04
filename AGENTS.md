# Project guidance

- Keep quote and payment records inaccessible through direct client database access; use server-side functions with service-role access, because quotes contain customer data and payment state must be verified by Paystack.
- Keep Paystack API calls, amount conversion, and payment confirmation in edge functions; the browser must never determine the payable amount or mark a quote paid.
- Protect quote-management actions with the existing server-validated admin token pattern so the payment tools remain consistent with review moderation.
- Treat Kobo as the authoritative stored NGN amount for quotes; retain the whole-naira field only for compatibility with existing records.
