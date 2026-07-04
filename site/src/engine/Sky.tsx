import { useEffect, useRef } from 'react'
import type { DayEngine, DayState } from './day'

/* Deterministic stars — same sky every night. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Star = { x: number; y: number; r: number; p: number }

const rand = mulberry32(7)
const STARS: Star[] = Array.from({ length: 110 }, () => ({
  x: rand(),
  y: rand() * 0.62,
  r: 0.4 + rand() * 0.9,
  p: rand() * Math.PI * 2,
}))

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Sky({ engine }: { engine: DayEngine }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(engine.getState())
    }

    const draw = (s: DayState) => {
      if (s.skyOff) {
        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, w, h)
        return
      }

      const horizonY = h * 0.74
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, s.zenith)
      grad.addColorStop(0.52, s.mid)
      grad.addColorStop(0.74, s.horizon)
      grad.addColorStop(1, s.zenith)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      /* Stars resolve out of the dark. */
      if (s.night > 0.05) {
        const tw = REDUCED ? 0 : performance.now() / 900
        for (const st of STARS) {
          const twinkle = REDUCED ? 0.8 : 0.55 + 0.45 * Math.sin(st.p + tw)
          const a = s.night * 0.85 * twinkle
          if (a < 0.03) continue
          ctx.globalAlpha = a
          ctx.fillStyle = '#DCE4F2'
          ctx.beginPath()
          ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      /* The sun or the moon on its arc. */
      if (s.sun.kind !== 'none' && s.sun.elev > -0.05) {
        const x = (0.06 + s.sun.x * 0.88) * w
        const y = horizonY - s.sun.elev * (horizonY * 0.78)
        const isSun = s.sun.kind === 'sun'
        const low = 1 - s.sun.elev
        const r = isSun ? 18 + low * 16 : 14

        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 7)
        if (isSun) {
          glow.addColorStop(0, `rgba(244,196,120,${0.5 + low * 0.3})`)
          glow.addColorStop(1, 'rgba(244,196,120,0)')
        } else {
          glow.addColorStop(0, `rgba(214,224,240,${0.28 * s.night})`)
          glow.addColorStop(1, 'rgba(214,224,240,0)')
        }
        ctx.fillStyle = glow
        ctx.fillRect(x - r * 7, y - r * 7, r * 14, r * 14)

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = isSun
          ? `rgb(${Math.round(236 - low * 30)},${Math.round(200 - low * 80)},${Math.round(140 - low * 90)})`
          : `rgba(222,230,242,${0.75 + 0.25 * s.night})`
        ctx.fill()
      }
    }

    size()
    window.addEventListener('resize', size)
    const unsub = engine.subscribe(draw)
    return () => {
      window.removeEventListener('resize', size)
      unsub()
    }
  }, [engine])

  return (
    <>
      <canvas ref={ref} className="fixed inset-0 -z-10" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  )
}
