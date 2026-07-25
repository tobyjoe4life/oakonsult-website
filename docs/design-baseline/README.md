# Canonical V4 visual baseline

These screenshots record the approved OAKonsult Organic Editorial V4 implementation at Git tag `design-v4-canonical-2026-07-25`, commit `d43128ac3c9e9895a9f4225453a210bae358b709`.

They are comparison references, not content sources. Current verified content may legitimately grow after this baseline, but the visual language, brand assets, editorial rhythm, navigation depth and organic composition must remain recognisably continuous with these images.

## Files

- `home-desktop.jpg`: homepage at 1440 × 1200 viewport, full page
- `home-mobile.jpg`: homepage at 390 × 844 viewport, full page
- `about-desktop.jpg`: About page at 1440 × 1200 viewport, full page
- `about-mobile.jpg`: About page at 390 × 844 viewport, full page
- `menu-mobile.jpg`: completed mobile menu state at 390 × 844
- `manifest.json`: capture metadata and checksums

## Comparing future work

1. Build and start the candidate revision locally or deploy it to private staging.
2. Capture the same routes and viewports after fonts, images and reveal animations settle.
3. Compare the candidate with these images for composition, logo treatment, typography, palette, shape language, content visibility and horizontal overflow.
4. Treat text or image additions as expected only when they are backed by the content-parity register. Treat a wholesale shift to repeated rounded cards, floating capsule labels, generic gradients, sparse navigation or stock imagery as drift.
5. Use automated pixel comparison only as a signal. Review differences visually because verified content changes alter page height.

## Recovery

```bash
git worktree add ../oakonsult-v4-recovery design-v4-canonical-2026-07-25
```

Never delete or move the canonical tag. Never hard-reset later verified content merely to fix styling drift. Restore or compare the affected files deliberately.