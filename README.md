# OAKonsult Website V3

Fresh development website for OAKonsult Disabilities Outreach.

- Development URL: `https://dev.oakonsult.org`
- Framework: Next.js App Router, React and TypeScript
- Deployment: Docker on OAKonsult Coolify
- Operational data: OAKonsult CRM through server-only website integration routes
- Editorial content: local typed content source for the first design milestone, with a future Payload CMS adapter

## Safety boundary

This repository does not contain production CRM credentials, donor data, form submissions or payment credentials. Stripe and Paystack own payment-card handling. When the CRM integration variables are absent, public form routes return a clear preview-mode response and do not make network requests.

The development deployment is explicitly `noindex, nofollow, noarchive`.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. Never commit values.

- `NEXT_PUBLIC_SITE_URL`
- `CRM_BASE_URL`
- `CRM_WEBSITE_API_KEY`

See `ARCHITECTURE.md` for ownership and integration boundaries.
