# OAKonsult website agent contract

Read `DESIGN.md` before changing any UI, route, content structure, photography, navigation or CSS.

## Immutable premium baseline

- Approved premium visual tag: `design-premium-v6-approved-2026-07-26`
- Approved premium commit: `ec6359e9b5eab85f00bb15fa6d2ef97a9460c4bd`
- Premium reference screenshots: `docs/design-baseline/premium-v6/`
- Implementation foundations: `src/app/home-v4.css`, `src/app/interior-v5.css` and `src/app/premium-v6.css`
- Historical V4 foundation: `design-v4-canonical-2026-07-25` and `docs/design-baseline/`

The premium, colourful, organic, image-led and animated V6 system is approved. Preserve it across models and sessions. Improve it only through small, evidenced changes that pass visual comparison, responsive QA and accessibility checks. If drift is suspected, compare with the premium baseline tag and screenshots before editing. The earlier V4 baseline remains available as the historical foundation, but it does not supersede the approved V6 premium layer.

## Premium contract lock

Contract marker: `OAK-PREMIUM-LIVING-SITE-CONTRACT-2026-07`

The premium, colourful, animated living-site direction recorded in `DESIGN.md` is approved and non-negotiable. It governs every new route, every new page family, every redesign and every site-wide change. Before any UI work, confirm the change preserves:

- the route mood system and the shared premium page families
- editorial, varied composition (no repetitive rounded-card grids, no generic SaaS patterns, no capsule/pill kickers)
- authentic, consent-cleared photography with safeguarding-safe captions
- purposeful motion with complete `prefers-reduced-motion` support and no-JS content visibility
- accessible semantics, keyboard operation, visible focus and strong contrast
- copy free of internal process language, model names, prompts, review language and em dashes
- preview-only forms and payments, and staging noindex

`tests/design-contract.test.ts` must keep passing. When you add a page family or change the system, update `DESIGN.md`, this file and the structural tests in the same change.

## Non-negotiable design rules

1. Keep the authentic OAKonsult logo and organic dark logo tile.
2. Preserve Nunito display typography, DM Sans body typography and the established forest/growth/gold/clay/sky/paper palette.
3. Use editorial rhythm, authentic photography, flat route lists, full-width bands and intentional asymmetry. Do not convert pages into repetitive rounded-card grids.
4. Pills are for genuine buttons and controls. Never place a decorative rounded kicker capsule above or across a rounded text card.
5. Keep Our work separate from Where we work. Maintain clear UK and Nigeria journeys within one brand.
6. Preserve support, programme, story, impact, gallery, event, social, organisation, policy and participation routes in header, menu or footer.
7. Keep the founding story and Abigail tribute permanent and clearly discoverable.
8. Essential content must remain on the website even when social or YouTube embeds are used.
9. Use only verified public or consent-cleared photos, quotes, outcomes and beneficiary details. Never invent charity evidence.
10. Never publish to production without Toby's explicit approval. Development work goes to private staging first.

## Change workflow

1. Read `DESIGN.md`, this file and `docs/content-parity/README.md` if present.
2. Inspect the current rendered page and the closest baseline screenshot.
3. Add or strengthen a failing regression/content-parity test before production code.
4. Implement the smallest change that satisfies the verified content requirement.
5. Run tests, lint, TypeScript and production build.
6. Run desktop, tablet and 390px visual QA, accessibility checks, route crawling and broken-image checks.
7. Record intentional design-system changes in `DESIGN.md`; never silently redefine the system.
8. Deploy only to private staging and verify the exact Git commit.

## Recovery

To inspect the approved premium design without altering the working branch:

```bash
git worktree add ../oakonsult-premium-v6-recovery design-premium-v6-approved-2026-07-26
```

To compare against the earlier V4 foundation when needed:

```bash
git worktree add ../oakonsult-v4-recovery design-v4-canonical-2026-07-25
```

To restore an individual drifted file, compare first and then restore deliberately:

```bash
git diff design-premium-v6-approved-2026-07-26 -- src/app/premium-v6.css
git restore --source design-premium-v6-approved-2026-07-26 -- src/app/premium-v6.css
```

Do not hard-reset a branch containing later verified content work.