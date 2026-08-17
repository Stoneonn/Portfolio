# Instructions for AI agents — Ömer Taşkaya's portfolio

## Concept: "One Day"

The site is one day of Ömer's life; **scroll is time**. It opens pre-dawn at
05:41 and runs through to 05:41 the next morning (5.7 → 29.7 in decimal hours).
A fixed HUD (top) shows the hour as a drawn arc with a dot riding it. The sky is
a canvas gradient; text colour, the accent, and film grain all interpolate with
the hour. Sections carry a timestamp: 09:00 Built, 11:00 Education, 13:00
Periodical readings, 15:30 Photographs, 18:47 Provenance, 21:30 Records, 02:00
Write to me, 03:30 the ending.

The ink→bone text flip happens inside deliberately empty scroll bands (see the
`Dusk` spacer) so copy never sits on a mid-contrast sky.

## Stack

Vite + React 19 + Tailwind v4, in `site/`. **Not** Next.js — the Next app was
removed; if you find references to `app/`, `next.config.mjs`, or Motion
Primitives anywhere, they are stale. Deployment is Vercel, configured in
`vercel.json` (which builds `site/` only).

## Mechanism (site/src/engine/day.ts)

- One rAF loop maps `window.scrollY` to an hour, interpolates the `KEYS`
  keyframe table, and writes CSS variables on `:root`: `--fg`, `--soft`,
  `--line`, `--acc`, `--selfg`, `--grain`, `--skytop`. Utility classes
  `.c-fg`, `.c-soft`, `.c-acc`, `.b-line`, `.bg-line` (global.css) consume them.
- Section hours come from `data-hour` attributes, and their scroll positions are
  **measured from the DOM** (`ResizeObserver` + `measure()`), never hardcoded.
  Keep it that way when adding sections.
- `legibleFg` and `legibleAcc` clamp `--fg` and `--acc` for contrast against the
  sky at every scroll position. Keyframes are authored to flip polarity in empty
  bands, but the clamps are the guarantee — do not remove them.
- Subscribers (`Sky` canvas, `Hud`, the `Foreign` scene) get state via
  `engine.subscribe`; they write to the DOM directly rather than re-rendering.
- Accent is wire red `#B3382E` in daylight, amber `#E8A64C` at the edges of the
  day, acid `#CCFF00` after dark.

## Owner's hard rules (violating these got a full redesign rejected once)

- **No boxes, cards, mats, or frames around content.** Ledger rows, hairline
  rules, scale contrast, full-bleed images.
- New work must change layout architecture, not just palette. He is 20; the site
  must read sharp/young — his phrase for his register is "St Petersburg
  intellectual," not heritage-beige.
- He is a polymath (economics/Bocconi, AI, photography, acid techno, arts) —
  never let one facet dominate.
- Canela display type is untouchable. Prestige signals (Bocconi, UWC) stay
  prominent.
- No dark mode toggle: one art-directed experience.
- Mobile first — traffic comes from his Instagram bio.

## Content

All content lives in typed constants in `site/src/data.ts`: `CITIES`, `WIRE` +
`PRESS_CATEGORIES`, `EDUCATION`, `PROJECTS`, `INSTRUMENTS`, `QUOTE`, `PAINTINGS`,
`SOCIALS`, `EMAIL_DISPLAY`/`emailAddress()`. Nothing invented — facts only.

`PAINTINGS` is the finale collection; when it holds more than one entry the
ending already picks per visit. The email address is stored in halves and joined
only on click, so it never appears in the HTML or the bundle — don't reintroduce
a `mailto:` literal.

## SEO (site/seo.ts)

A build-time Vite plugin generates, from `data.ts` so it cannot drift:
schema.org `Person` + `WebSite` JSON-LD, a `<noscript>` static rendering with
real followable links, supplementary head meta, and `sitemap.xml`.

**www is the canonical host.** `SITE` in `seo.ts`, the canonical/og tags in
`site/index.html`, `site/public/robots.txt`, `designweek/scripts/gen-seo.mjs`,
and the redirect in `vercel.json` must all agree. See README.md.

## Sub-app: designweek/

Vite + React 18, its own neon/black identity, `base: "/designweek/"`. Built with
`npm run build:designweek`, which copies `dist/` into `site/public/designweek/` —
that output is committed, so a normal site deploy does not rebuild it. On the
main site it appears only as the MDW 2026 row in Built. **Do not restyle the
sub-app.**

## Workflows

```bash
npm run dev                # site on localhost:5173
npm run build             # tsc --noEmit + vite build
npm run build:designweek  # rebuild the MDW app and copy it into site/public/
```
