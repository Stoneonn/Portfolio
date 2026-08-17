/*
  Notify Bing (and the other IndexNow participants) that URLs changed.

  Bing's guidelines ask for IndexNow twice — §2 for discovery and §4 for
  freshness — and prefer streaming single-URL submissions over batches, so this
  submits one URL at a time rather than using the bulk endpoint.

  Ownership is proved by hosting the key at /<key>.txt; there is nothing to
  register by hand. The key is public by design, so it is committed, not a
  secret.

  Run after a deploy is live, not before — IndexNow asks Bing to come and look,
  and there is no point inviting it to fetch the previous build.

    node scripts/indexnow.mjs                      # submit every canonical URL
    node scripts/indexnow.mjs /designweek          # or just some of them
*/

import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HOST = 'www.otaskaya.me'
const SITE = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public')
const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{8,128}\.txt$/.test(f))
if (!keyFile) {
  console.error(`indexnow: no <key>.txt found in ${publicDir}`)
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/, '')

/* keep in step with the routes in seo.ts */
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/designweek']

/*
  Pre-flight: confirm the key file is actually live and byte-exact.

  This matters more than it looks. The API returns 202 for a submission whose
  key it has not validated — including one whose key is plain wrong (verified:
  a bogus key with a 404 keyLocation also returns 202, with no error body).
  So a 202 is not evidence of anything, and a broken key file would fail
  silently forever. Checking it here turns that into a loud failure.

  Once the key is validated, submissions return 200.
*/
const keyUrl = `${SITE}/${keyFile}`
try {
  const res = await fetch(keyUrl)
  const body = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  if (body !== key) throw new Error(`serves ${JSON.stringify(body.slice(0, 40))}, expected the key`)
} catch (err) {
  console.error(`indexnow: key file at ${keyUrl} is not usable — ${err.message}`)
  console.error('indexnow: refusing to submit; every request would sit unvalidated at 202')
  process.exit(1)
}

let failed = false
for (const path of paths) {
  const url = `${SITE}${path}`
  const query = new URLSearchParams({
    url,
    key,
    keyLocation: `${SITE}/${keyFile}`,
  })
  try {
    const res = await fetch(`${ENDPOINT}?${query}`, { method: 'GET' })
    if (res.status === 200) {
      console.log(`indexnow: 200 submitted ${url}`)
    } else if (res.status === 202) {
      /* Not a failure, but not a success either — the key check above passed, so
         this should resolve to 200 on the next deploy. Worth seeing in the log
         if it never does. */
      console.log(`indexnow: 202 queued, key validation pending — ${url}`)
    } else {
      failed = true
      console.error(`indexnow: ${res.status} ${res.statusText} for ${url} — ${await res.text()}`)
    }
  } catch (err) {
    failed = true
    console.error(`indexnow: request failed for ${url} — ${err.message}`)
  }
}

process.exit(failed ? 1 : 0)
