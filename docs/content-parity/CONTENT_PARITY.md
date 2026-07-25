# OAKonsult content parity contract

Audit date: 25 July 2026

## Authoritative public baseline

The production WordPress site at `https://oakonsult.org/` was crawled from its sitemap and rendered pages. The audit found:

- 62 WordPress pages
- 6 public posts
- 2 GiveWP campaign forms
- 1 public job entry
- 77 indexed URLs in total
- 7 meaningful public-facing non-payment forms: contact, volunteer, partnership/family referral, Project ME interest, Zumba registration, Zumba wellbeing, and job application

The machine-readable crawl is `production-audit.json`. Re-run it with `python3 scripts/audit-production-content.py` before any future migration or major information-architecture change.

## Core journeys that must remain first-class

| Journey | Canonical route | Required content |
|---|---|---|
| Who we are | `/about` | Vision, mission, creed, values, inclusion commitment, regions, governance links |
| Founding story | `/our-story` | April 2010 family journey, disability lived experience, 2021 founding, Nigeria and UK registrations |
| Abigail tribute | `/abigail` | Permanent respectful memorial, 2008–2024, whole-person portrait, OAK Centre legacy |
| History | `/history` | Verified timeline from 2010 to current programmes |
| Team | `/our-team` | Current approved names and roles; never invent biographies |
| Social media | `/social` | Verified official channels and selected OAKonsult videos |
| OAK Centre Prime | `/programmes/oak-centre-prime` | Abigail’s legacy, 7 April 2025 ground-breaking, public architectural vision, phased-development caveat |
| Zumba | `/zumba-class` | Dedicated programme/event page and registration form |
| Zumba evaluation | `/zumba-wellbeing` | Separate consent-led wellbeing questionnaire |
| Events | `/events` | Current routes, access and safeguarding guidance |
| Forms | route-specific | All fields represented; staging sends and stores nothing |

## Form parity

Definitions live in `src/lib/public-form-definitions.ts`. They preserve the meaningful fields from production while removing WordPress nonces, plugin internals and honeypot implementation details.

- `volunteer`
- `partnership-referral`
- `project-me-interest`
- `zumba-registration`
- `zumba-wellbeing`
- `job-application`
- Contact and donation use their existing dedicated components.

Before production launch, every form requires an approved receiving service, data-retention rule, privacy wording, spam protection and tested success/failure handling. Preview forms must not be described as live submissions.

## Legacy URL accountability

`src/lib/legacy-route-contract.ts` accounts for the public production routes. It preserves dedicated routes where the content remains distinct and permanently redirects consolidated routes to a canonical equivalent.

Do not delete a legacy route from the contract merely because a redesign makes it inconvenient. First identify where its core content, form or user intent now lives.

Technical WordPress-only pages such as password-protected development drafts and plugin internals are not public content and are not migrated as editorial pages.

## Content rules

1. Preserve facts and user intent; improve layout and hierarchy.
2. Do not copy WordPress boilerplate, empty counters, duplicate navigation text or plugin internals.
3. Keep UK and Nigeria programmes, funders, partners and contact context distinct.
4. Describe OAK Centre Prime as planned and phased; architectural images are a vision, not evidence of completed construction.
5. Keep Abigail’s page permanent and respectful. Centre her personality, relationships, joy and legacy rather than medical detail.
6. Never treat participation or an internal SharePoint image as permission to publish a person’s story or likeness.
7. Verify social URLs before publication. A platform report is evidence that a channel exists, not proof that a guessed handle is correct.
