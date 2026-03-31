# OAKonsult Main Website Redesign Plan

## V1 Built Now
- Astro static site foundation with OAK brand palette from current logo assets.
- New nonprofit-first IA and navigation:
  - Home
  - About
  - Programs
  - Impact
  - Get Involved
  - Media
  - Blog
  - Contact
  - Donate handoff page
- Real media integrated from existing Azure media pull.
- Donation CTA ready for CRM URLs once provided.
- Mobile-first responsive layout with accessible structure and reduced-motion support.

## Recommended Stack
- Frontend: Astro (static-first)
- Hosting: Cloudflare Pages
- Assets: Cloudflare R2 (phase 2+ for optimized media delivery)
- DNS and security: Cloudflare DNS + WAF + caching
- CMS (phase 2): Sanity or Strapi (recommended: Sanity for editor UX)
- Analytics: GA4 + Cloudflare Web Analytics

## Phased Scope
### Phase 1 (Current)
- Brand-led redesign foundation.
- Core page templates and content structure.
- Dev environment deployment on Cloudflare subdomain.

### Phase 2
- CMS integration for pages, posts, team profiles, and media metadata.
- CRM links wired for donation and forms.
- Redirect mapping for legacy URLs.
- SEO migration pack (metadata, schema, sitemap, redirects).

### Phase 3
- Article hub with categories/tags/search.
- Grant-ready pages and partner resources.
- Performance pass (image pipeline, edge caching strategy, Core Web Vitals tuning).

## Cost Control Strategy
- Remove WordPress VM dependency for main site.
- Use static hosting (Cloudflare Pages free/pro tiers) instead of always-on VM.
- Move heavy assets behind R2 + cache rules.
- Keep courses platform separate until dedicated rebuild.
