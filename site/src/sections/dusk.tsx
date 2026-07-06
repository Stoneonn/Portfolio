import { useEffect, useRef, useState } from 'react'
import { CITIES, INSTRUMENTS, type Instrument } from '../data'
import type { DayEngine } from '../engine/day'
import { Sheet, Stamp } from '../ui/bits'

const SHELL = 'relative mx-auto w-full max-w-5xl px-5 md:px-10'

/* ————— 18:47 · Provenance ————— */

const LAT_MIN = 37.215
const LAT_MAX = 45.464
const cityX = (lat: number) => 6 + ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * 86

/* Stagger tiers so close latitudes (Eskişehir/Dilijan/İstanbul) never collide. */
const LABEL_TIER = [0, 1, 0, 2, 0]
const COORD_TIER = [0, 0, 0, 1, 0]

/* Chronological route, arcing over the latitude axis. */
function routePath(): string {
  const px = CITIES.map((c) => cityX(c.lat) * 10)
  let d = `M ${px[0]} 188`
  for (let i = 1; i < px.length; i++) {
    const a = px[i - 1]
    const b = px[i]
    const mid = (a + b) / 2
    const peak = 188 - Math.min(105, Math.max(30, Math.abs(b - a) * 0.28))
    d += ` Q ${mid.toFixed(0)} ${peak.toFixed(0)} ${b.toFixed(0)} 188`
  }
  return d
}

export function Foreign({ engine }: { engine: DayEngine | null }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tickRef = useRef<HTMLSpanElement>(null)
  const clipRef = useRef<SVGRectElement>(null)
  const closerRef = useRef<HTMLParagraphElement>(null)
  const cityRefs = useRef<Array<HTMLSpanElement | null>>([])
  const coordRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (!engine) return
    let lastP = -1
    return engine.subscribe(() => {
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const denom = rect.height - window.innerHeight
      if (denom <= 0) return
      const p = Math.min(1, Math.max(0, -rect.top / denom))
      if (Math.abs(p - lastP) < 0.002) return
      lastP = p

      const sunX = 4 + p * 92
      if (tickRef.current) tickRef.current.style.left = `${sunX}%`
      /* the route exists exactly where the sun has passed — clipped at the
         tick's x, so line and sun can never drift apart on any device */
      if (clipRef.current) clipRef.current.setAttribute('width', String(sunX * 10))
      if (closerRef.current) closerRef.current.style.opacity = p > 0.82 ? '1' : '0'

      CITIES.forEach((c, i) => {
        const lit = sunX >= cityX(c.lat)
        const name = cityRefs.current[i]
        const coord = coordRefs.current[i]
        if (name) {
          name.style.color = lit ? '#E8A64C' : 'var(--fg)'
          name.style.opacity = lit ? '1' : '0.55'
        }
        if (coord) coord.style.opacity = lit ? '1' : '0'
      })
    })
  }, [engine])

  return (
    <section id="provenance" data-hour="17.8" ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 pt-12 md:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Stamp time="18:47" title="Provenance" />
        </div>

        <div className="relative mx-auto mt-28 w-full max-w-5xl md:mt-40">
          {/* the horizon */}
          <div className="bg-line relative h-px w-full">
            {/* the route, geography vs biography — anchored to the horizon */}
            <svg
              viewBox="0 0 1000 190"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[190px] w-full"
              aria-hidden
            >
              <defs>
                <clipPath id="route-reveal">
                  <rect ref={clipRef} x="0" y="0" width="0" height="190" />
                </clipPath>
              </defs>
              <path
                d={routePath()}
                fill="none"
                stroke="var(--acc)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
                clipPath="url(#route-reveal)"
              />
            </svg>

            <span
              ref={tickRef}
              className="c-acc absolute -top-3.5 -translate-x-1/2 text-base md:-top-3 md:text-sm"
              style={{ left: '4%' }}
              aria-hidden
            >
              ☉
            </span>

            {CITIES.map((c, i) => (
              <span
                key={c.name}
                className="absolute -translate-x-1/2"
                style={{ left: `${cityX(c.lat)}%`, bottom: `${14 + LABEL_TIER[i] * 42}px` }}
              >
                <span
                  ref={(el) => {
                    cityRefs.current[i] = el
                  }}
                  className="serif block text-[clamp(0.95rem,2.4vw,1.5rem)] leading-none whitespace-nowrap transition-colors duration-300"
                  style={{ opacity: 0.55 }}
                >
                  {c.name}
                </span>
                <span className="deck c-soft mt-1 block text-[11px] whitespace-nowrap">{c.gloss}</span>
              </span>
            ))}

            {CITIES.map((c, i) => (
              <span
                key={c.name}
                ref={(el) => {
                  coordRefs.current[i] = el
                }}
                className="mono c-soft absolute -translate-x-1/2 text-[8px] tracking-[0.12em] whitespace-nowrap transition-opacity duration-500"
                style={{ left: `${cityX(c.lat)}%`, top: `${10 + COORD_TIER[i] * 15}px`, opacity: 0 }}
              >
                {c.lat.toFixed(1)}°N
              </span>
            ))}
          </div>

          <p
            ref={closerRef}
            className="mono c-soft mt-16 text-center text-[10px] tracking-[0.26em] uppercase transition-opacity duration-700"
            style={{ opacity: 0 }}
          >
            37°N → 45°N
          </p>
        </div>
      </div>
      {/* end-of-scene time anchor */}
      <div data-hour="19.4" className="absolute bottom-0 h-px w-full" aria-hidden />
    </section>
  )
}

/* Silent spacer: the text polarity flips here, over nothing. */
export function Dusk() {
  return <div data-hour="20.1" aria-hidden className="h-[30svh]" />
}

/* ————— 21:30 · Records ————— */

function Mark({ id }: { id: Instrument['id'] }) {
  if (id === 'been') {
    return (
      <span className="flex items-center gap-2 text-3xl font-bold tracking-tight text-white italic sm:text-4xl">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-6 stroke-current"
          aria-hidden
        >
          <path
            d="M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V22"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        BEEN
      </span>
    )
  }
  if (id === 'lastfm') {
    return <span className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">last.fm</span>
  }
  if (id === 'goodreads') {
    return <span className="font-serif text-3xl font-bold text-[#382110] sm:text-4xl">goodreads</span>
  }
  return (
    <span className="rounded bg-black px-3 py-1 text-2xl font-black text-[#F5C518] sm:text-3xl">
      IMDb
    </span>
  )
}

export function Records() {
  const [open, setOpen] = useState<Instrument | null>(null)

  return (
    <section id="records" data-hour="21.5" className={`${SHELL} mt-36`}>
      <Stamp time="21:30" title="Records" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {INSTRUMENTS.map((inst) => {
          const face = (
            <span
              className="relative flex aspect-video w-full items-center justify-center transition-[filter] duration-300 group-hover:brightness-110"
              style={{ backgroundColor: inst.color }}
            >
              <Mark id={inst.id} />
              <span
                className={`mono absolute top-2 right-2 text-[8px] tracking-[0.18em] uppercase ${
                  inst.id === 'goodreads' || inst.id === 'imdb' ? 'text-black/60' : 'text-white/70'
                }`}
              >
                {inst.embed ? 'live' : '↗'}
              </span>
            </span>
          )
          const caption = (
            <span className="mono c-soft mt-2 block text-left text-[10px] tracking-[0.08em]">
              <span className="c-fg">{inst.name}</span> — {inst.line}
            </span>
          )
          return inst.embed ? (
            <button
              key={inst.id}
              type="button"
              onClick={() => setOpen(inst)}
              className="rv group cursor-pointer"
            >
              {face}
              {caption}
            </button>
          ) : (
            <a
              key={inst.id}
              href={inst.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rv group"
            >
              {face}
              {caption}
            </a>
          )
        })}
      </div>
      <Sheet
        src={open?.embed ?? ''}
        title={open?.name ?? ''}
        open={open !== null}
        onClose={() => setOpen(null)}
      />
    </section>
  )
}
