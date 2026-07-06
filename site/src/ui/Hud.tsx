import { useEffect, useRef } from 'react'
import { clockOf, type DayEngine } from '../engine/day'

/* The day runs 05:41 → ~04:24 across the scroll; the arc shows where you are. */
const DAY_START = 5.7
const DAY_END = 28.4

/* Quadratic arc in the 100×32 viewBox. Endpoints sit on the bottom edge so
   that, with baseline alignment, the arc's feet land on the text baseline. */
const P0 = { x: 4, y: 32 }
const C = { x: 50, y: 6 }
const P2 = { x: 96, y: 32 }

function arcPoint(t: number): { x: number; y: number } {
  const u = 1 - t
  return {
    x: u * u * P0.x + 2 * u * t * C.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * C.y + t * t * P2.y,
  }
}

const ARC_D = `M ${P0.x} ${P0.y} Q ${C.x} ${C.y} ${P2.x} ${P2.y}`

/*
  The instrument strip. Name left; right, the day itself: a drawn arc with
  a dot riding it, digits kept small beside it. Driven by direct DOM writes —
  React never re-renders this.
*/
export function Hud({ engine }: { engine: DayEngine }) {
  const clockRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const clipRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    let lastClock = ''
    let lastX = -1
    return engine.subscribe((s) => {
      const t = Math.min(1, Math.max(0, (s.hour - DAY_START) / (DAY_END - DAY_START)))
      const p = arcPoint(t)
      if (Math.abs(p.x - lastX) > 0.05) {
        lastX = p.x
        dotRef.current?.setAttribute('cx', p.x.toFixed(2))
        dotRef.current?.setAttribute('cy', p.y.toFixed(2))
        clipRef.current?.setAttribute('width', p.x.toFixed(2))
      }
      const clock = clockOf(s.hour)
      if (clock !== lastClock) {
        lastClock = clock
        if (clockRef.current) clockRef.current.textContent = clock
      }
    })
  }, [engine])

  return (
    <header
      className="b-line fixed inset-x-0 top-0 z-50 flex items-baseline justify-between border-b px-4 py-2.5 md:px-8"
      style={{ background: 'var(--skytop, rgba(10,14,26,0.82))' }}
    >
      <a
        href="#a1"
        className="c-fg mono -mx-2 -my-2 px-2 py-2 text-[10px] tracking-[0.28em] uppercase"
      >
        Ömer Taşkaya
      </a>
      <span aria-hidden className="flex items-baseline gap-2.5">
        <svg
          viewBox="0 0 100 32"
          className="h-[18px] w-[56px] overflow-visible md:w-[64px]"
        >
          <defs>
            <clipPath id="day-elapsed">
              <rect ref={clipRef} x="0" y="0" width="4" height="32" />
            </clipPath>
          </defs>
          <path d={ARC_D} fill="none" stroke="var(--line)" strokeWidth="1.6" />
          <path
            d={ARC_D}
            fill="none"
            stroke="var(--fg)"
            strokeWidth="1.6"
            clipPath="url(#day-elapsed)"
          />
          <circle ref={dotRef} cx={P0.x} cy={P0.y} r="3" fill="var(--acc)" />
        </svg>
        <span ref={clockRef} className="c-fg mono text-[10px] tracking-[0.22em]">
          05:41
        </span>
      </span>
    </header>
  )
}
