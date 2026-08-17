/*
  Injects the prerendered app into dist/index.html.

  Runs as the last step of `npm run build`, after the client build (dist/) and
  the SSR build (dist-ssr/). Bing's guidelines §8 warn that content hidden
  behind client-side rendering may not be indexed at all; before this step the
  served HTML carried an empty <div id="root"></div> and zero characters of
  body text.

  Fails the build loudly rather than shipping an empty shell — a silent
  regression here is invisible in the browser and only shows up weeks later as
  a deindexed page.
*/

import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const ROOT_DIV = '<div id="root"></div>'

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const app = render()

if (!app || app.length < 2000) {
  throw new Error(
    `prerender: render() returned ${app?.length ?? 0} chars, expected >2000. ` +
      `The prerendered page would be empty or truncated.`,
  )
}

const html = readFileSync(htmlPath, 'utf8')
if (!html.includes(ROOT_DIV)) {
  throw new Error(`prerender: could not find ${ROOT_DIV} in dist/index.html`)
}

writeFileSync(htmlPath, html.replace(ROOT_DIV, `<div id="root">${app}</div>`), 'utf8')

/* the SSR bundle is a build artefact, not something to deploy */
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })

const text = app.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
console.log(
  `prerender: injected ${app.length} chars of HTML (${text.length} chars of text) into dist/index.html`,
)
