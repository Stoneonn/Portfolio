# Typefaces

All four faces are self-hosted from `public/fonts/` and declared in
`src/styles/global.css`. Nothing is fetched from a third party at runtime.

| Family        | File(s)                                        | Licence                      |
| ------------- | ---------------------------------------------- | ---------------------------- |
| Canela        | `Canela-Medium.ttf`                             | Commercial Type — **paid**   |
| Canela Deck   | `CanelaDeck-RegularItalic-Trial.otf`            | Commercial Type — **trial**  |
| Inter         | `inter-latin.woff2`, `inter-latin-ext.woff2`     | SIL OFL 1.1                  |
| IBM Plex Mono | `plex-mono-latin.woff2`, `plex-mono-latin-ext.woff2` | SIL OFL 1.1             |

## Outstanding: the Canela Deck trial file

`CanelaDeck-RegularItalic-Trial.otf` is a **trial** file. Commercial Type's trial
licence covers evaluation only and excludes public web use — and this is live on
a public domain. It needs either a purchased Canela Deck web licence from
Commercial Type, or replacing with a face that is licensed. It is used by the
`.deck` class: the painting title in the ending, and the city glosses in
Provenance.

Both Canela files are also `.ttf`/`.otf` (226KB together). Converting the
licensed ones to `.woff2` would roughly halve that.

## Inter / IBM Plex Mono

Both are OFL, so self-hosting and redistribution are permitted. The files came
from Google's CDN via the `css2` API, which serves per-subset woff2.

`latin` is Google's stock subset, kept whole so new copy can't lose a glyph.
`latin-ext` is subset down to Latin Extended-A — the only characters this site
needs from that range are `ğ`, `İ`, `ş` — which took Inter's ext file from 85KB
to 20KB. Totals: 152KB → 85KB.

Regenerate with:

```bash
pyftsubset inter-latin-ext.woff2 \
  --unicodes='U+0100-017F,U+2020,U+20A0-20C0' \
  --layout-features='*' --flavor=woff2 \
  --output-file=inter-latin-ext.woff2
```

(needs `fonttools` and `brotli`)

**Widen the subset before adding copy outside Latin-1 + Latin Extended-A**, and
keep the `unicode-range` in `global.css` in step with what the file actually
contains.

## Glyphs that already fall back

`→` (U+2192), `↗` (U+2197), `☉` (U+2609) and `✕` (U+2715) are in neither Google
subset, so they render in a system fallback font. That was true before
self-hosting too — not a regression. If you want them in Plex Mono, you'd need a
fuller source file than the CDN's subsets.
