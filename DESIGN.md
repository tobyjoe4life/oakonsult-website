---
version: alpha
name: OAKonsult Organic Editorial V4
description: A warm, image-led and community-rooted system with strong editorial rhythm, organic asymmetry and accessible public-service clarity.
colors:
  primary: "#062C22"
  deep: "#0A3A2C"
  green: "#12503E"
  leaf: "#2B7D78"
  secondary: "#D7ED6F"
  tertiary: "#F0CE86"
  clay: "#E98A69"
  sky: "#9FCBD0"
  cream: "#F7F1E7"
  neutral: "#FFFAF2"
  ink: "#17352C"
  white: "#FFFFFF"
typography:
  display-hero:
    fontFamily: Nunito
    fontSize: 7.6rem
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.058em"
  display-section:
    fontFamily: Nunito
    fontSize: 5.7rem
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.055em"
  heading-card:
    fontFamily: Nunito
    fontSize: 2.7rem
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  body-lg:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.5
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: DM Sans
    fontSize: 0.74rem
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.13em"
rounded:
  none: 0px
  subtle: 8px
  organic: 36px
  organic-lg: 55px
  circle: 999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 90px
  section: 110px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.circle}"
    padding: 18px
    height: 56px
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.body-md}"
    rounded: "{rounded.circle}"
    padding: 18px
    height: 56px
  full-screen-menu:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.heading-card}"
    rounded: "{rounded.none}"
    padding: 24px
  region-card-uk:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.heading-card}"
    rounded: "{rounded.organic}"
    padding: 25px
  region-card-nigeria:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    typography: "{typography.heading-card}"
    rounded: "{rounded.organic}"
    padding: 25px
  editorial-label:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 0px
---

## Overview

This is the permanent visual contract for the OAKonsult website. The canonical rendered baseline is Git tag `design-v4-canonical-2026-07-25`, commit `d43128ac3c9e9895a9f4225453a210bae358b709`, deployed for review at `https://dev.oakonsult.org` on 25 July 2026.

Future work must preserve this system and improve it deliberately. A new model, agent or developer must not replace it with a fresh theme, generic charity template, generic SaaS layout or fashionable AI-generated card system. If visual drift occurs, compare against the canonical tag and the screenshots under `docs/design-baseline/` before changing anything else.

The design is informed by the warmth, confidence, navigational depth and editorial pacing admired on Family Action, but it is OAKonsult-owned. Do not copy another organisation's proprietary text, artwork, source code or exact page composition.

## Colors

- **Forest** is the anchor for headers, full-screen navigation, large action bands and high-authority text.
- **Growth** is the optimistic signature accent for high-priority action, motion graphics and UK journey cues.
- **Gold** carries warmth, history and the Nigeria journey without separating the organisation into a second brand.
- **Clay and sky** provide occasional human warmth and visual pacing. They are accents, not default backgrounds for every section.
- **Paper and cream** keep long pages warm and editorial rather than clinical.
- Use white or paper text only on backgrounds that pass WCAG AA. Do not lower text opacity until contrast fails.

## Typography

- Nunito is the display face. Use heavy weights, tight tracking and short balanced lines for large statements.
- DM Sans is the body, interface and label face.
- Hero and section headings should feel confident and human, not corporate or ornamental.
- Small uppercase labels are plain editorial signposts. They must not sit inside decorative capsules or float above separate rounded text boxes.
- Preserve responsive `clamp()` sizing and never allow a heading to force horizontal overflow.

## Layout

- Use long-form editorial rhythm: full-bleed photography, split compositions, flat route lists, image-led programme bands, intentional pauses and generous section spacing.
- Alternate dense and quiet sections. Do not repeat the same card grid down an entire page.
- Maintain clear journeys for Find support, Our work, Stories and impact, Media gallery, Events, Get involved, About us, UK and Nigeria.
- Keep **Our work** distinct from **Where we work**.
- UK and Nigeria share one identity while retaining country-specific programmes, funders, contacts, galleries and evidence.
- Desktop layouts may be asymmetric. Mobile must become a coherent single-column story without hiding core content or creating horizontal scrolling.

## Elevation & Depth

- Depth comes primarily from photography, overlapping organic fields, selective shadows and controlled motion.
- Shadows are soft, dark-green and infrequent. Avoid a shadow around every text group.
- Hover motion should be restrained: small lifts, image zoom, arrow movement and organic border changes.
- Respect `prefers-reduced-motion`; no content may remain hidden when motion is reduced.

## Shapes

- Organic shapes belong to the brand: leaf forms, circular rings, asymmetric image masks, arches and individually composed corner radii.
- Large expressive organic shapes are preferred over many small rounded rectangles.
- Pills are reserved for real buttons, menu controls and compact status/control elements.
- Never use the generic AI pattern of a rounded kicker capsule sitting above or partly overlapping a rounded text card.
- Do not turn every destination, paragraph, statistic or footer link into a rounded card.
- The authentic OAKonsult logo remains inside its dark organic tile in the header and footer.

## Components

- **Header:** two-level desktop navigation with the logo tile, primary journeys and separate UK/Nigeria routes. Mobile uses an opaque, vertically scrollable full-screen menu.
- **Hero:** authentic photography, one strong editorial statement, concise supporting copy and no decorative capsule label.
- **Editorial route lists:** flat, numbered or ruled links with visible destinations.
- **Programme and regional sections:** photography and large composed color fields. Reuse content structures, not identical card shells.
- **Media gallery:** prominent and image-led, with real programme/outreach photography, descriptive alt text and country/event context.
- **Footer:** a wide organisational directory with support, programme, story, gallery, participation, policy and regional routes.
- **Forms:** accessible labels, clear consent/privacy copy, explicit status feedback, honeypot/rate-limit safeguards and review-site gates. Staging never takes real payments or sends live submissions.
- **Social media:** present verified platform links and embedded/curated public stories without relying on social platforms as the only source of essential information.

## Do's and Don'ts

### Do

- Start every visual change by reviewing this file, the baseline screenshots and the current staging site.
- Preserve authentic, consent-cleared photography and safeguarding-sensitive captions.
- Prefer editorial composition, flat link lists and purposeful image sequences.
- Verify desktop, tablet and 390px mobile; run automated accessibility and route/image checks.
- Add content parity without flattening the site into an archive dump.
- Keep the founding story and Abigail tribute permanent, dignified and clearly reachable.
- Keep the baseline Git tag forever so any model can restore the approved design.

### Don't

- Do not "redesign" the website from scratch or substitute a model's default aesthetic.
- Do not copy Family Action pixels, wording, fonts or proprietary assets.
- Do not invent history, impact, outcomes, partners, dates, quotes or beneficiary stories.
- Do not identify children or vulnerable beneficiaries without verified public consent.
- Do not hide core content exclusively inside Instagram, Facebook, YouTube or other embeds.
- Do not publish to production without Toby's explicit approval.
- Do not remove a legacy page, story, form or programme until the parity matrix records where its content and function moved.
