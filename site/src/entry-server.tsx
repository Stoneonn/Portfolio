import { renderToString } from 'react-dom/server'
import App from './App'

/*
  Build-time prerender entry. `scripts/prerender.mjs` calls this and injects the
  result into dist/index.html, so Bingbot (and anything else that doesn't run
  JavaScript) receives the real page rather than an empty <div id="root">.

  Deliberately does not import global.css — that belongs to the client bundle,
  and pulling it in here would make the SSR build emit a second stylesheet.

  On the server `engine` is null, so <Sky> and <Hud> render nothing and every
  section renders its markup. The client's first render also starts with
  engine === null, so the trees match and hydrateRoot has nothing to patch;
  the sky and HUD arrive on the effect that follows.
*/
export function render(): string {
  return renderToString(<App />)
}
