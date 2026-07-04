import { useEffect, useRef } from 'react'
import { clockOf, type DayEngine } from '../engine/day'

/*
  The clock. Name left, hour right, nothing else.
  Driven by direct DOM writes — React never re-renders this.
*/
export function Hud({ engine }: { engine: DayEngine }) {
  const clockRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let last = ''
    return engine.subscribe((s) => {
      const clock = clockOf(s.hour)
      if (clock !== last) {
        last = clock
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
      <p aria-hidden className="c-fg mono text-[10px] tracking-[0.22em]">
        <span ref={clockRef}>05:41</span>
      </p>
    </header>
  )
}
