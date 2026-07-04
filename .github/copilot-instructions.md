# Instructions for AI agents — Ömer Taşkaya's portfolio

## Concept: "Day → Dusk"

The site is one day of Ömer's life; **scroll is time**. A fixed mono clock (top-right) ticks 09:00→23:59 with scroll. The page background interpolates from morning paper (#F5EEDF) through golden hour (#EFE0C0) to ink (#131110) and blue-black dusk (#0A0D1A), ending on Aivazovsky's *Dusk on the Golden Horn* hung on a navy band. Sections are labeled with timestamps (09:40 contact sheet, 11:00 studied, 15:00 built, 21:30 measured, 23:00 read, 23:59 write to me). The ink→bone text flip happens inside an intentionally empty "19:12 — golden hour ends" gap so copy never sits on a mid-contrast background.

## Mechanism (app/page.tsx)

- Motion's `useScroll` + `useTransform` drive `backgroundColor` and CSS vars `--fg`, `--soft`, `--line`, `--accent` on the page wrapper. Utility classes `.c-fg`, `.c-soft`, `.c-accent`, `.b-line`, `.bg-line` (globals.css) consume them.
- Landmark scroll fractions are **measured from the DOM** (refs + ResizeObserver), not hardcoded — see `Landmarks` / `useEffect` in page.tsx. Keep it that way when adding sections.
- Accent is navy `#26337B` in daylight, acid `#CCFF00` after dark. `:root` holds the 09:00 defaults for SSR.
- Section headers use the `Stamp` component (mono hour + rule + Canela title).

## Owner's hard rules (violating these got a full redesign rejected once)

- **No boxes, cards, mats, or frames around content.** Use ledger rows, hairline rules, scale contrast, full-bleed images.
- New work must change layout architecture, not just palette. He is 20; the site must read sharp/young — his phrase for his artistic register is "St Petersburg intellectual," not heritage-beige.
- He is a polymath (economics/Bocconi, AI, photography, acid techno, arts) — never let one facet dominate.
- Canela display type is untouchable. Prestige signals (Bocconi, UWC) stay prominent.
- No dark mode toggle: one art-directed experience (a `dark` custom variant in globals.css exists only as a kill-switch and `.dark` is never applied).
- Mobile first — traffic comes from his Instagram bio. The contact sheet swipes horizontally on mobile.

## Stack & content

Next.js 15 App Router, React 19, Tailwind v4, Motion. Single page (`app/page.tsx`); all content lives in typed constants in `app/data.ts` (PROVENANCE, FEATURED_EXHIBITION, ARCHIVE, DATA_PROJECTS, EDUCATION, READING_LIST, SOCIAL_LINKS, QUOTE, PAINTINGS, EMAIL). `PAINTINGS` is the finale collection — self-hosted under `public/paintings/`; when it has >1 entry, implement a random pick per visit. Been/Last.fm rows open live embeds via `components/ui/morphing-dialog.tsx` (dark chrome); Goodreads/IMDB are external links. Contact = email + Instagram + LinkedIn only.

## Sub-app: designweek/

Vite app with its own neon/black identity, built into `public/designweek/` (`npm run build:designweek`), served at `/designweek` via a rewrite in `next.config.mjs`. On the main site it appears only as the MDW 2026 "past exhibition" poster — the one place the neon appears in daylight. Do not restyle the sub-app.

## Workflows

```bash
npm run dev              # main site at localhost:3000
npm run build            # production build
npm run dev:designweek   # MDW guide dev server
```

Deployment: DigitalOcean. The blog was removed in the 2026 revamp; reintroduce as "Writings" only when he has real pieces.
