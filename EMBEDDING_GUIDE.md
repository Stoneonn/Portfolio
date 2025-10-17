# Website Embedding Guide

## The Problem: X-Frame-Options

Many websites (IMDB, Goodreads, Last.fm, etc.) block iframe embedding using HTTP headers:
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- `Content-Security-Policy: frame-ancestors 'none'`

This security feature prevents your portfolio from embedding their content directly.

## Solutions

### 1. **Remove embedUrl (Current Solution)**
When a site blocks embedding, remove the `embedUrl` property from `app/data.ts`. The image becomes clickable and opens the site in a new tab.

```typescript
{
  name: 'Goodreads',
  description: 'Books, books, books.',
  link: 'https://www.goodreads.com/user/show/135046786-stoneon',
  image: '/goodreads_logo.png',
  // embedUrl removed - image now links to site
  id: 'data3',
}
```

### 2. **Use Official Embed APIs**
Some services provide official embed widgets:

- **Last.fm**: Use their collage/widget generator
- **Goodreads**: Use their official widgets (limited)
- **Spotify**: `https://open.spotify.com/embed/...`
- **YouTube**: `https://www.youtube.com/embed/...`
- **CodePen**: `https://codepen.io/[user]/embed/[id]`

### 3. **Build a Proxy API Route** (Advanced)
Create a Next.js API route that fetches and serves the content:

```typescript
// app/api/proxy/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  
  const response = await fetch(url)
  const html = await response.text()
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
```

Then use: `embedUrl: '/api/proxy?url=https://example.com'`

**Warning**: This may violate terms of service and cause performance issues.

### 4. **Screenshot/Static Images**
Take periodic screenshots of your profiles and display them as images that link to the live site.

## Checking if a Site Allows Embedding

Test in browser console:
```javascript
fetch('https://example.com').then(r => console.log(r.headers.get('x-frame-options')))
```

Or use this tool: https://gf.dev/x-frame-options-test

## Current Data Projects Status

| Project | Embeddable? | Solution |
|---------|-------------|----------|
| Been | ❓ Untested | Try first, fallback to link |
| Last.fm Stats | ❌ No | Clickable image → new tab |
| Goodreads | ❌ No | Clickable image → new tab |
| IMDB | ❌ No | Clickable image → new tab |

## Recommended Approach

For your portfolio:
1. Use `embedUrl` only for sites that explicitly allow it
2. For blocked sites, use high-quality preview images
3. Make images clickable to open the actual site
4. Consider using official widgets/badges when available
