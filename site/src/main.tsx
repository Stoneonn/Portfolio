import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import './styles/global.css'
import App from './App'

/* Cookieless traffic + referrer analytics — a no-op off Vercel. */
inject()

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
  In production the build prerenders the app into #root, so hydrate it rather
  than throwing that DOM away. Under `vite dev` there is nothing to hydrate —
  index.html ships an empty #root — and calling hydrateRoot on an empty
  container would just log a mismatch and fall back to a client render anyway.
*/
if (container.firstChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
