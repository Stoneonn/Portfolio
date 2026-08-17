import { execFileSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { EDUCATION, PROJECTS, SOCIALS } from './src/data'

/*
  Build-time SEO artefacts, generated from data.ts so they cannot drift from the
  app. Emits:
    — schema.org Person + WebSite JSON-LD (rich results, entity understanding)
    — supplementary head meta
    — sitemap.xml

  There used to be a <noscript> mirror of the whole page here, because the app
  was client-rendered and the served HTML had an empty <div id="root">. The build
  now prerenders the real app into that div (see src/entry-server.tsx and
  scripts/prerender.mjs), so the mirror is gone: it would be the same content
  twice in one document. If prerendering ever breaks, prerender.mjs fails the
  build rather than quietly shipping an empty shell.
*/

const SITE = 'https://www.otaskaya.me'
const DESCRIPTION =
  'Ömer Taşkaya — economics student at Bocconi University in Milan, with interests spanning artificial intelligence, photography, and electronic music. Personal site.'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const attr = (s: string) => esc(s).replace(/"/g, '&quot;')
/* JSON-LD is embedded in a <script>; neutralise any "</script>" sequences */
const jsonld = (obj: unknown) => JSON.stringify(obj).replace(/</g, '\\u003c')

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ömer Taşkaya',
  url: `${SITE}/`,
  image: `${SITE}/photos/01-portrait.jpg`,
  description: DESCRIPTION,
  nationality: { '@type': 'Country', name: 'Türkiye' },
  homeLocation: { '@type': 'Place', name: 'Milano, Italy' },
  sameAs: SOCIALS.map((s) => s.url),
  alumniOf: EDUCATION.map((e) => ({
    '@type': 'EducationalOrganization',
    name: e.name,
    url: e.url,
  })),
  knowsAbout: [
    'Economics',
    'Management',
    'Artificial Intelligence',
    'Photography',
    'Electronic music',
    'Design',
  ],
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ömer Taşkaya',
  url: `${SITE}/`,
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Ömer Taşkaya' },
}

const headMeta = `
    <meta name="author" content="Ömer Taşkaya" />
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="Ömer Taşkaya, Omer Taskaya, Bocconi, economics, photography, design, Milan" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image:alt" content="Dusk on the Golden Horn — Ivan Aivazovsky" />
    <meta name="twitter:title" content="Ömer Taşkaya" />
    <meta name="twitter:description" content="${attr(DESCRIPTION)}" />
    <meta name="twitter:image" content="${SITE}/paintings/dusk-on-the-golden-horn.jpg" />
    <script type="application/ld+json">${jsonld(person)}</script>
    <script type="application/ld+json">${jsonld(website)}</script>`

/*
  ——— sitemap.xml ———

  Routes come from the same PROJECTS list the page renders, so an internal page
  added there lands in the sitemap on the next build and cannot be forgotten.

  Every <loc> must match the <link rel="canonical"> its page declares, or a
  search console will report the sitemap as pointing at non-canonical URLs —
  and if the <loc> host redirects, Bing rejects the sitemap outright.

  www is the canonical host. SITE, both pages' canonical tags, robots.txt, and
  the apex→www 301 in ../vercel.json all have to agree; changing one means
  changing all of them. See README.md.

  lastmod is the last commit date of the tree that produces each page, not the
  build date: Bing weighs lastmod accuracy, and a value that says "today" on
  every deploy teaches it to ignore the field.
*/
const routes = ['/', ...PROJECTS.filter((p) => p.url.startsWith('/')).map((p) => p.url)]

/*
  Which source tree backs which route, for the lastmod lookup. The `:/` prefix
  is git's "relative to the top of the working tree" pathspec — the build runs
  with cwd at site/, so a bare `site` would match nothing and silently fall back
  to the build date.
*/
const routeSources: Record<string, string> = {
  '/': ':/site',
  '/designweek': ':/designweek',
}

function lastCommitDate(path: string): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', path], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out
  } catch {
    /* shallow clone, no git, or a path with no commits yet — fall through */
  }
  return new Date().toISOString().slice(0, 10)
}

function sitemapXml(): string {
  const urls = [...new Set(routes)]
    .map((r) => {
      const lastmod = lastCommitDate(routeSources[r] ?? ':/site')
      return `  <url>\n    <loc>${SITE}${r}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function seo(): Plugin {
  let isSsrBuild = false
  return {
    name: 'seo',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml(html) {
      return html.replace('</head>', `${headMeta}\n  </head>`)
    },
    /* Dev parity, so /sitemap.xml can be checked before it reaches a crawler. */
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.end(sitemapXml())
      })
    },
    generateBundle() {
      /* the SSR pass writes to dist-ssr/, which is deleted after prerendering */
      if (isSsrBuild) return
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
  }
}
