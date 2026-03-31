# Cloudflare Dev Deployment (Main Site)

## Goal
Deploy redesigned main site to a dev hostname first, then swap production later.

## Recommended Dev Hostname
- `dev.oakonsult.org` (or `new-main.oakonsult.org`)

## Deployment Steps
1. Push this `main-site` project to your Git repository.
2. In Cloudflare Pages:
   - Create project from Git repo.
   - Framework preset: `Astro`.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable:
     - `SITE_URL=https://dev.oakonsult.org`
3. Deploy and verify generated Pages URL.
4. In Cloudflare DNS:
   - Add `CNAME` record for `dev` to the Pages project hostname.
   - Keep proxy enabled.
5. Validate:
   - Navigation/routes load correctly.
   - Mobile and desktop layout.
   - Donate placeholder route `/donate`.

## CLI Option (Token-Based)
1. Create a Cloudflare API token with Pages + DNS edit permissions for the target account/zone.
2. Set environment variables:
   - `CLOUDFLARE_API_TOKEN=<token>`
   - `CLOUDFLARE_ACCOUNT_ID=<account-id>`
   - Optional:
     - `CF_PAGES_PROJECT_NAME=oakonsult-main-dev`
     - `CF_PAGES_BRANCH=main`
     - `CF_DEV_DOMAIN=dev.oakonsult.org`
3. Run:
   - `npm run build`
   - `npm run deploy:dev`

## Production Cutover Later
1. Update `SITE_URL=https://oakonsult.org`.
2. Point apex/primary records to the same Pages project.
3. Apply redirect rules from legacy WordPress URLs to new IA routes.
