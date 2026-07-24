# OAKonsult Website V3 architecture

## Responsibility boundaries

The website orchestrates the visitor experience. Public page data is read through the typed `ContentSource` interface in `src/lib/content`. The current local source can later be replaced by a Payload CMS adapter without coupling page components to a CMS SDK.

The OAKonsult CRM owns contacts, enquiries, registrations, donations, subscriptions, receipts, consent and operational workflows. Browser code calls only local Next.js routes. The server-only CRM adapter validates environment configuration and forwards validated requests when enabled.

Stripe owns GBP payment data and Paystack owns NGN payment data. No card fields or payment credentials belong in this website. The checkout route asks the CRM orchestration layer to create the appropriate secure payment session.

## Development safety

When CRM configuration is absent, form routes return a clear HTTP 503 preview response and make no network request. Development responses include noindex headers. Tests use integration-disabled behaviour and never contact production services.
