import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import './styles/global.css'
import App from './App'

/* Cookieless traffic + referrer analytics — a no-op off Vercel. */
inject()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
