#!/usr/bin/env node
/*
  Injects an SEO / no-JS fallback into the MDW 2026 Guide's index.html,
  generated from events.csv so the crawlable content can never drift from
  the app. Idempotent — safe to re-run (strips its own previous injection).

  Usage:  node scripts/gen-seo.mjs <index.html> [<index.html> ...]
  Wired into `npm run build` for dist/index.html; run manually against the
  deployed copies under site/public/designweek and public/designweek.
*/
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const CSV = resolve(HERE, '../events.csv')
const SITE = 'https://www.otaskaya.me'
const PAGE = `${SITE}/designweek`

const DESCRIPTION =
  'MDW 2026 Guide — Ömer Taşkaya’s personal selection for Milan Design Week 2026: 30 exhibitions and events across Milano, with venues, dates, and links.'

/* ---- tiny, correct CSV parser (quotes, embedded commas/newlines) ---- */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  const header = rows.shift()
  return rows.map((r) => Object.fromEntries(header.map((h, idx) => [h, (r[idx] ?? '').trim()])))
}

/* ---- light date parse for "Month D[-D] YYYY" → ISO ---- */
const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
}
function parseDates(raw) {
  const m = raw.match(/([A-Za-z]+)\s+(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?\s+(\d{4})/)
  if (!m) return null
  const mm = MONTHS[m[1].toLowerCase()]
  if (!mm) return null
  const pad = (d) => String(d).padStart(2, '0')
  const start = `${m[4]}-${mm}-${pad(m[2])}`
  const end = m[3] ? `${m[4]}-${mm}-${pad(m[3])}` : null
  return { start, end }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const attr = (s) => esc(s).replace(/"/g, '&quot;')
const jsonld = (o) => JSON.stringify(o).replace(/</g, '\\u003c')
const trunc = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s)

const events = parseCsv(readFileSync(CSV, 'utf8')).filter((e) => e['Event Name'])

/* ---- JSON-LD: the guide as a CollectionPage + an ItemList of events ---- */
const page = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'MDW 2026 Guide',
  url: PAGE,
  inLanguage: 'en',
  description: DESCRIPTION,
  about: { '@type': 'Event', name: 'Milan Design Week 2026', startDate: '2026-04-20', endDate: '2026-04-26', location: { '@type': 'Place', name: 'Milano, Italy' } },
  author: { '@type': 'Person', name: 'Ömer Taşkaya', url: `${SITE}/` },
}
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Milan Design Week 2026 — selected events',
  numberOfItems: events.length,
  itemListElement: events.map((e, i) => {
    const d = parseDates(e.Date)
    const ev = {
      '@type': 'Event',
      name: e['Event Name'],
      url: e.event_url || PAGE,
      location: { '@type': 'Place', name: e.Location || 'Milano' },
    }
    if (d) {
      ev.startDate = d.start
      if (d.end) ev.endDate = d.end
    }
    return { '@type': 'ListItem', position: i + 1, item: ev }
  }),
}

/* ---- head: meta + structured data ---- */
const head = `<!--seo:head:start-->
    <meta name="description" content="${attr(DESCRIPTION)}" />
    <meta name="author" content="Ömer Taşkaya" />
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="Milan Design Week 2026, MDW 2026, Fuorisalone, Milano design, Ömer Taşkaya, design guide" />
    <link rel="canonical" href="${PAGE}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${PAGE}" />
    <meta property="og:site_name" content="Ömer Taşkaya" />
    <meta property="og:title" content="MDW 2026 Guide — Milan Design Week, mapped" />
    <meta property="og:description" content="${attr(DESCRIPTION)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="MDW 2026 Guide" />
    <meta name="twitter:description" content="${attr(DESCRIPTION)}" />
    <script type="application/ld+json">${jsonld(page)}</script>
    <script type="application/ld+json">${jsonld(itemList)}</script>
    <!--seo:head:end-->`

/* ---- body: no-JS static rendering, neon-on-black identity ---- */
const A = 'color:#ccff00;text-decoration:none'
const eventsHtml = events
  .map((e) => {
    const url = e.event_url || PAGE
    const meta = [e.Date, e.Location].filter(Boolean).map(esc).join(' · ')
    const desc = e.Description ? `<p style="margin:6px 0 0;color:#c7cbb8;font-size:14px">${esc(trunc(e.Description, 180))}</p>` : ''
    return `<li style="padding:20px 0;border-top:1px solid #2a2a2a"><a href="${attr(url)}" style="${A};font-size:20px;font-weight:800">${esc(e['Event Name'])}</a><div style="margin-top:4px;color:#8a8a7a;font-size:12px;text-transform:uppercase;letter-spacing:.06em">${meta}</div>${desc}</li>`
  })
  .join('')

const body = `<!--seo:body:start--><noscript><div style="max-width:900px;margin:0 auto;padding:48px 24px;background:#0a0a0a;color:#f2f2ea;font-family:'Inter',system-ui,sans-serif">
<p style="margin:0;color:#ccff00;font-weight:700"><a href="${SITE}" style="${A}">Ömer’s</a></p>
<h1 style="font-size:clamp(2.5rem,8vw,4rem);font-weight:800;letter-spacing:-.03em;margin:.1em 0 .3em">MDW 2026 Guide</h1>
<p style="max-width:40rem;color:#c7cbb8;margin:0 0 8px">A personal selection for Milan Design Week 2026 — ${events.length} exhibitions and events across Milano, with venues, dates, and links.</p>
<ul style="list-style:none;padding:0;margin:32px 0 0">${eventsHtml}</ul>
<p style="margin-top:40px;color:#6a6a5a;font-size:12px">This guide is an interactive experience — enable JavaScript to view it in full.</p>
</div></noscript><!--seo:body:end-->`

const stripHead = /\n?[ \t]*<!--seo:head:start-->[\s\S]*?<!--seo:head:end-->/g
const stripBody = /<!--seo:body:start-->[\s\S]*?<!--seo:body:end-->/g

const targets = process.argv.slice(2)
if (targets.length === 0) {
  console.error('usage: gen-seo.mjs <index.html> [...]')
  process.exit(1)
}
for (const t of targets) {
  const p = resolve(process.cwd(), t)
  let html = readFileSync(p, 'utf8').replace(stripHead, '').replace(stripBody, '')
  html = html.replace('</head>', `    ${head}\n  </head>`)
  if (/<div id="root">\s*<\/div>/.test(html)) {
    html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root"></div>\n    ${body}`)
  } else {
    html = html.replace('</body>', `    ${body}\n  </body>`)
  }
  writeFileSync(p, html)
  console.log(`injected SEO (${events.length} events) → ${t}`)
}
