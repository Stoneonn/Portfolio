# otaskaya.me

Personal site for Ömer Taşkaya. One page, one day: scroll is time, and the sky,
the type colour, and the accent all interpolate from 05:41 through to 05:41 the
next morning.

## Layout

| Path         | What it is                                                             |
| ------------ | ---------------------------------------------------------------------- |
| `site/`      | The site itself — Vite + React 19 + Tailwind v4. This is what deploys.  |
| `designweek/`| Sub-app: the MDW 2026 guide, its own neon/black identity. Vite + React. |
| `vercel.json`| Build config, apex→www redirect, cache headers.                        |

The root `package.json` has no dependencies — it only forwards scripts. Each app
installs its own.

## Commands

```bash
npm run dev                # the site on localhost:5173
npm run build             # typecheck + production build into site/dist
npm run build:designweek  # build the MDW app and copy it into site/public/designweek/
```

`designweek/` is built separately and its output is **committed** under
`site/public/designweek/`, so a normal deploy doesn't rebuild it. Run
`build:designweek` and commit the result when that app changes.

## How the day works

`site/src/engine/day.ts` owns one rAF loop. It maps scroll position to an hour
(5.7 → 29.7 in decimal hours), interpolates a keyframe table, and writes CSS
variables — `--fg`, `--soft`, `--line`, `--acc`, `--grain`, `--skytop` — that the
utility classes in `src/styles/global.css` consume. Sections declare their hour
with `data-hour`; positions are measured from the DOM, never hardcoded.

Text colour is not trusted to the keyframes: `legibleFg` and `legibleAcc` clamp
`--fg` and `--acc` against the sky so no scroll position can produce unreadable
type. If you add keyframes, you don't have to hand-verify contrast — but don't
remove the clamps.

## Canonical host

**www is canonical.** `https://otaskaya.me` 308-redirects to
`https://www.otaskaya.me` (`redirects` in `vercel.json`).

These five must always agree, or a search console will reject the sitemap for
pointing at non-canonical URLs:

1. `site/index.html` — `<link rel="canonical">`, `og:url`, `og:image`
2. `site/seo.ts` — the `SITE` constant (drives JSON-LD and `sitemap.xml`)
3. `site/public/robots.txt` — the `Sitemap:` line
4. `designweek/scripts/gen-seo.mjs` — its own `SITE` constant
5. `vercel.json` — the redirect direction

Also check the Vercel dashboard's domain settings point the same way, since a
domain-level redirect there takes precedence over `vercel.json`.

`sitemap.xml` is generated at build time by the plugin in `site/seo.ts` from the
same `PROJECTS` list the page renders, so an internal page added there is in the
sitemap on the next build.

## Assets

Photos, the painting, and the logos are served as WebP. Two JPEGs are kept
deliberately — `photos/01-portrait.jpg` (JSON-LD `Person.image`) and
`paintings/dusk-on-the-golden-horn.jpg` (`og:image`) — because social unfurlers
and rich-result surfaces want JPEG. If you replace either image, replace both the
WebP and the JPEG.

Typefaces are all self-hosted; see [site/FONTS.md](site/FONTS.md).

## Formatting

`.prettierrc.json` documents the house style (no semicolons, single quotes,
80 columns). Prettier itself isn't installed anywhere — add `prettier` and
`prettier-plugin-tailwindcss` to `site/` devDependencies if you want it wired up,
and restore the `plugins` entry in the config for Tailwind class sorting.
