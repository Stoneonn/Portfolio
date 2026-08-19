import { execFileSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { CITIES, EDUCATION, INSTRUMENTS, PAINTINGS, PHOTOS, PROJECTS, SOCIALS } from './src/data'

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
  image: `${SITE}/photos/omer-taskaya-portrait.jpg`,
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

/*
  ——— ImageObject structured data ———

  The invisible half of image SEO. Google reads ImageObject to understand what a
  picture depicts; nothing here renders on the page, and nothing here describes
  anything the page does not already show — the images themselves are visible,
  and this is metadata about them. That distinction is what keeps it inside
  Google's rule that structured data reflect visible content, rather than being
  hidden text.

  Deliberately NOT emitted: creator, copyrightNotice and license. Those drive
  Google's image-credit and licensable-image features, but they are legal and
  factual claims about authorship — several of these are photographs OF Ömer, so
  who took them is not something this file can assume. The painting is the one
  exception: PAINTINGS carries a real attribution, so it gets one.
*/
const imageObjects = [
  ...PHOTOS.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE}${p.src}`,
    url: `${SITE}${p.src}`,
    name: p.title,
    description: p.alt,
    caption: p.alt,
    about: { '@type': 'Person', name: 'Ömer Taşkaya' },
    isPartOf: { '@type': 'WebPage', '@id': `${SITE}/` },
  })),
  ...PAINTINGS.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE}${p.src}`,
    url: `${SITE}${p.src}`,
    name: p.title,
    description: `${p.title} — ${p.artist}, ${p.year}, ${p.medium}`,
    caption: `${p.title} — ${p.artist}`,
    creator: { '@type': 'Person', name: p.artist },
    dateCreated: p.year,
    artMedium: p.medium,
    isPartOf: { '@type': 'WebPage', '@id': `${SITE}/` },
  })),
]

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
    <script type="application/ld+json">${jsonld(website)}</script>${imageObjects.map((o) => `\n    <script type="application/ld+json">${jsonld(o)}</script>`).join('')}`

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

/*
  Images are declared with the sitemap image extension. Google will not surface
  a picture in Image search until it has crawled the page that hosts it, and
  this is the most direct way to tell it which images that page actually holds
  rather than leaving it to discover them by rendering.

  Only <image:loc> is emitted: Google deprecated <image:title>, <image:caption>,
  <image:geo_location> and <image:license> in 2022 and ignores them now. The
  descriptive part of the signal lives in the filename and the alt attribute
  instead, which is why PHOTOS carries both.

  Every image belongs to the homepage — /designweek is a separate app with its
  own assets, so it gets no image entries here.
*/
const HOMEPAGE_IMAGES = [...PHOTOS.map((p) => p.src), ...PAINTINGS.map((p) => p.src)]

function sitemapXml(): string {
  const urls = [...new Set(routes)]
    .map((r) => {
      const lastmod = lastCommitDate(routeSources[r] ?? ':/site')
      const images =
        r === '/'
          ? HOMEPAGE_IMAGES.map(
              (src) => `\n    <image:image>\n      <image:loc>${SITE}${src}</image:loc>\n    </image:image>`,
            ).join('')
          : ''
      return `  <url>\n    <loc>${SITE}${r}</loc>\n    <lastmod>${lastmod}</lastmod>${images}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`
}

/*
  ——— llms.txt ———

  The llmstxt.org convention: a plain-markdown map of the site for language
  models, so an agent can answer about this person without executing the app or
  inferring structure from markup.

  Worth being straight about its status: it is a proposed convention, not a
  standard, and no major model provider has committed to reading it. It is
  generated here rather than hand-written purely so it cannot fall out of step
  with data.ts — the cost is a few lines, and if adoption arrives the file is
  already correct.

  Everything below is drawn from data.ts. Nothing is asserted here that the page
  does not also say, which is the same rule the JSON-LD follows.
*/
function llmsTxt(): string {
  const absolute = (u: string) => (u.startsWith('/') ? `${SITE}${u}` : u)

  const projects = PROJECTS.map((p) => `- [${p.name}](${absolute(p.url)}): ${p.line}`).join('\n')
  const education = EDUCATION.map((e) => `- [${e.name}](${e.url}): ${e.degree}`).join('\n')
  const cities = CITIES.map((c) => `- ${c.name} — ${c.gloss}`).join('\n')
  const elsewhere = [...SOCIALS.map((s) => `- [${s.label}](${s.url})`),
    ...INSTRUMENTS.map((i) => `- [${i.name}](${i.url}): ${i.line}`)].join('\n')

  return `# Ömer Taşkaya

> ${DESCRIPTION}

Personal site of Ömer Taşkaya. One page, structured as a single day: scrolling
moves through the hours from 05:41 to 05:41 the following morning, and each
section carries the hour it belongs to.

## Work

${projects}

## Education

${education}

## Places lived

${cities}

## Elsewhere

${elsewhere}

## Notes

- Canonical host is ${SITE}. The apex redirects here.
- Reading list on the site covers world news, specialised economic research,
  opinion, Turkish and Russian press, and culture.
- Contact is by email, shown on the site and assembled in the browser rather
  than published as a mailto: link.
`
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
      server.middlewares.use('/llms.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(llmsTxt())
      })
    },
    generateBundle() {
      /* the SSR pass writes to dist-ssr/, which is deleted after prerendering */
      if (isSsrBuild) return
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt() })
    },
  }
}
