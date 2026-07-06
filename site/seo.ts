import type { Plugin } from 'vite'
import {
  CITIES,
  EDUCATION,
  EMAIL,
  EMAIL_DISPLAY,
  INSTRUMENTS,
  PAINTINGS,
  PRESS_CATEGORIES,
  PROJECTS,
  QUOTE,
  SOCIALS,
  WIRE,
} from './src/data'

/*
  SEO / no-JS fallback, generated at build time from data.ts so the crawlable
  content can never drift from the app. Emits:
    — schema.org Person + WebSite JSON-LD (rich results, entity understanding)
    — a <noscript> static rendering with real, followable links
    — supplementary head meta
  A JS-capable crawler (Googlebot) renders the real app; everything else — Bing,
  social unfurlers, no-JS clients — gets this.
*/

const SITE = 'https://otaskaya.me'
const DESCRIPTION =
  'Ömer Taşkaya — economics student at Bocconi University in Milan, with interests spanning artificial intelligence, photography, and electronic music. Personal site.'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const attr = (s: string) => esc(s).replace(/"/g, '&quot;')
/* JSON-LD is embedded in a <script>; neutralise any "</script>" sequences */
const jsonld = (obj: unknown) =>
  JSON.stringify(obj).replace(/</g, '\\u003c')

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

function section(title: string, body: string): string {
  return `<section style="margin:40px 0"><h2 style="font-family:'Canela',Georgia,serif;font-weight:500;font-size:1.6rem;margin:0 0 16px;color:#eaf0f4">${esc(title)}</h2>${body}</section>`
}

const linkStyle = 'color:#c8cfda;text-decoration:none;border-bottom:1px solid #2a3140'
const titleLinkStyle =
  "color:#eaf0f4;font-family:'Canela',Georgia,serif;font-size:1.2rem;text-decoration:none"
const labelStyle =
  "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a93a5"

const builtHtml = section(
  'Built',
  `<ul style="list-style:none;padding:0;margin:0">${PROJECTS.map((p) => {
    const href = p.url.startsWith('http') ? p.url : SITE + p.url
    return `<li style="margin:0 0 12px"><a href="${attr(href)}" style="${titleLinkStyle}">${esc(p.name)}</a> <span style="color:#8a93a5">— ${esc(p.line)} (${esc(p.tag)})</span></li>`
  }).join('')}</ul>`,
)

const eduHtml = section(
  'Education',
  `<ul style="list-style:none;padding:0;margin:0">${EDUCATION.map(
    (e) =>
      `<li style="margin:0 0 12px"><a href="${attr(e.url)}" style="${titleLinkStyle}">${esc(e.name)}</a><br><span style="${labelStyle}">${esc(e.degree)}</span></li>`,
  ).join('')}</ul>`,
)

const pressHtml = section(
  'Periodical readings',
  PRESS_CATEGORIES.map((cat) => {
    const links = WIRE.filter((w) => w.category === cat)
      .map((w) => `<a href="${attr(w.url)}" style="${linkStyle}">${esc(w.masthead)}</a>`)
      .join(', ')
    return `<div style="margin-bottom:16px"><h3 style="${labelStyle};margin:0 0 6px">${esc(cat)}</h3><p style="margin:0;line-height:1.7">${links}</p></div>`
  }).join(''),
)

const recordsHtml = section(
  'Records',
  `<p style="line-height:2">${INSTRUMENTS.map(
    (i) =>
      `<a href="${attr(i.url)}" style="${linkStyle};margin-right:18px">${esc(i.name)} — ${esc(i.line)}</a>`,
  ).join('')}</p>`,
)

const contactHtml = section(
  'Write to me',
  `<p style="margin:0 0 8px"><a href="mailto:${attr(EMAIL)}" style="${titleLinkStyle}">${esc(EMAIL_DISPLAY)}</a></p><p style="margin:0">${SOCIALS.map(
    (s) => `<a href="${attr(s.url)}" style="${linkStyle};margin-right:16px">${esc(s.label)}</a>`,
  ).join('')}</p>`,
)

const painting = PAINTINGS[0]
const endingHtml = `<section style="margin:40px 0"><blockquote style="margin:0 0 14px;font-family:'Canela',Georgia,serif;font-size:1.2rem;color:#c8cfda">&ldquo;${esc(QUOTE.text)}&rdquo;</blockquote><p style="${labelStyle}">${esc(painting.title)} — ${esc(painting.artist)}</p></section>`

const provenance = CITIES.map((c) => c.name).join(' → ')

const noscript = `<noscript><div style="max-width:820px;margin:0 auto;padding:56px 24px;font-family:'Inter',system-ui,sans-serif;color:#c8cfda;background:#0a0e1a;line-height:1.55">
<h1 style="font-family:'Canela',Georgia,serif;font-weight:500;font-size:clamp(2.5rem,9vw,5rem);line-height:1;margin:0 0 14px;color:#eaf0f4">Ömer Taşkaya</h1>
<p style="max-width:34rem;margin:0 0 8px">Hey, welcome. I&rsquo;m Ömer, someone who aspires to be a lot of things, you&rsquo;ll see.</p>
<p style="${labelStyle};margin:0 0 8px">${esc(provenance)}</p>
${builtHtml}${eduHtml}${pressHtml}${recordsHtml}${contactHtml}${endingHtml}
<p style="color:#6b7480;font-size:12px;margin-top:48px">This site is an interactive experience — enable JavaScript to view it in full.</p>
</div></noscript>`

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

export function seoFallback(): Plugin {
  return {
    name: 'seo-fallback',
    transformIndexHtml(html) {
      return html
        .replace('</head>', `${headMeta}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`)
    },
  }
}
