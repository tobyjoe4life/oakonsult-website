# OAKonsult website agent contract

Read `DESIGN.md` before changing any UI, route, content structure, photography, navigation or CSS.

## Immutable baseline

- Canonical visual tag: `design-v4-canonical-2026-07-25`
- Canonical commit: `d43128ac3c9e9895a9f4225453a210bae358b709`
- Reference screenshots: `docs/design-baseline/`
- Implementation foundations: `src/app/home-v4.css` and `src/app/interior-v5.css`

The colourful, organic, image-led V4 system is approved. Preserve it across models and sessions. Improve it only through small, evidenced changes that pass visual comparison, responsive QA and accessibility checks. If drift is suspected, compare with the baseline tag and screenshots before editing.

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

To inspect the canonical design without altering the working branch:

```bash
git worktree add ../oakonsult-v4-recovery design-v4-canonical-2026-07-25
```

To restore an individual drifted file, compare first and then restore deliberately:

```bash
git diff design-v4-canonical-2026-07-25 -- src/app/home-v4.css
git restore --source design-v4-canonical-2026-07-25 -- src/app/home-v4.css
```

Do not hard-reset a branch containing later verified content work.