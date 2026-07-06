/*
  The day engine. Scroll position is mapped to an hour between 05:41 and
  05:41 the next morning (5.7 → 29.7 in decimal hours). Sections declare
  their hour with data-hour; everything between is interpolated.

  The engine owns one rAF loop and drives:
    — CSS variables (--fg, --soft, --line, --acc, --tshadow, --grain)
    — subscribers (sky canvas, HUD, the sunset scene)
*/

export type SunState = {
  kind: 'sun' | 'moon' | 'none'
  x: number // 0..1 across the sky
  elev: number // 0..1 above horizon
}

export type DayState = {
  hour: number // 5.7 .. 29.7
  vel: number // smoothed scroll velocity, px/s
  sun: SunState
  night: number // 0 day .. 1 deep night
  skyOff: boolean // the supplement's hard cut
  zenith: string
  mid: string
  horizon: string
}

type Key = {
  h: number
  z: string
  m: string
  hz: string
  fg: string
  soft: string
  acc: string
  night: number
  grain: number
}

/* Cold Baltic daylight, amber golden hour, ink night. Never beige. */
const KEYS: Key[] = [
  { h: 5.7, z: '#10192E', m: '#1F2C47', hz: '#6E4F3C', fg: '#C8CFDA', soft: '#808CA0', acc: '#E8A64C', night: 0.85, grain: 0.075 },
  /* fg holds pale until 6.45, then flips fast — the contrast clamp below insures the crossing */
  { h: 6.45, z: '#2C4265', m: '#6C8098', hz: '#E8A64C', fg: '#C8CFDA', soft: '#9AA6B8', acc: '#E8A64C', night: 0.5, grain: 0.06 },
  { h: 6.85, z: '#7FA0BC', m: '#B9C9D4', hz: '#EFD9AC', fg: '#1A2026', soft: '#4E5862', acc: '#B3382E', night: 0.2, grain: 0.05 },
  { h: 7.2, z: '#93AEC4', m: '#C9D4DC', hz: '#F0D9A8', fg: '#22292F', soft: '#525C66', acc: '#B3382E', night: 0.1, grain: 0.045 },
  { h: 9.0, z: '#C7D8E2', m: '#E2EAEF', hz: '#EFF3F1', fg: '#101418', soft: '#4C555F', acc: '#B3382E', night: 0, grain: 0.035 },
  { h: 13.0, z: '#D3E2EA', m: '#EAF0F4', hz: '#F4F6F4', fg: '#101418', soft: '#49525C', acc: '#B3382E', night: 0, grain: 0.03 },
  { h: 16.5, z: '#BFD3DE', m: '#E5E9E3', hz: '#F2E3C2', fg: '#14161A', soft: '#4E5560', acc: '#B3382E', night: 0, grain: 0.035 },
  { h: 18.0, z: '#8FA6BB', m: '#E0C39A', hz: '#E8A64C', fg: '#1A1006', soft: '#54432E', acc: '#78380F', night: 0.05, grain: 0.04 },
  { h: 19.0, z: '#5C6E8E', m: '#C08558', hz: '#C96F2E', fg: '#241610', soft: '#5E4835', acc: '#6E3410', night: 0.25, grain: 0.05 },
  /* fg stays dark through the Foreign scene's end (19.4), flips inside the empty blue hour */
  { h: 19.45, z: '#46587A', m: '#7A6A68', hz: '#A16648', fg: '#241610', soft: '#4E4030', acc: '#6E3410', night: 0.4, grain: 0.05 },
  { h: 19.9, z: '#33415C', m: '#4E5878', hz: '#8A5F53', fg: '#C9D0DC', soft: '#93A2B8', acc: '#E8A64C', night: 0.55, grain: 0.055 },
  { h: 21.5, z: '#131B30', m: '#1B2540', hz: '#2A3350', fg: '#D5DAE4', soft: '#8A93A5', acc: '#CCFF00', night: 0.85, grain: 0.06 },
  { h: 25.0, z: '#0A0E1A', m: '#101828', hz: '#16203A', fg: '#D9DCE4', soft: '#8A93A5', acc: '#CCFF00', night: 1, grain: 0.07 },
  { h: 27.5, z: '#080B14', m: '#0D1322', hz: '#131C30', fg: '#DCDFE7', soft: '#8F97A8', acc: '#CCFF00', night: 1, grain: 0.07 },
  { h: 29.0, z: '#0D1526', m: '#17223C', hz: '#4A3A38', fg: '#C8CFDA', soft: '#828DA0', acc: '#E8A64C', night: 0.9, grain: 0.075 },
  { h: 29.7, z: '#10192E', m: '#1F2C47', hz: '#6E4F3C', fg: '#C8CFDA', soft: '#808CA0', acc: '#E8A64C', night: 0.85, grain: 0.075 },
]

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a)
  const [br, bg, bb] = hexToRgb(b)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `rgb(${r},${g},${bl})`
}

function rgbWithAlpha(rgb: string, alpha: number): string {
  return rgb.replace('rgb(', 'rgba(').replace(')', `,${alpha})`)
}

/* ——— WCAG contrast guardrail ———
   Keyframes are authored so text flips polarity inside empty scroll bands,
   but interpolation can still pass through the sky. This clamp guarantees
   readable text at every scroll position, whatever the keys do. */

function channelLin(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function lumOf(rgb: string): number {
  const m = rgb.match(/\d+/g)
  if (!m) return 0
  const [r, g, b] = m.map(Number)
  return 0.2126 * channelLin(r) + 0.7152 * channelLin(g) + 0.0722 * channelLin(b)
}

function contrast(a: string, b: string): number {
  const la = lumOf(a)
  const lb = lumOf(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

function mixRgbStr(a: string, b: string, t: number): string {
  const pa = a.match(/\d+/g)!.map(Number)
  const pb = b.match(/\d+/g)!.map(Number)
  return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`
}

const INK = 'rgb(16,20,24)'
const BONE = 'rgb(234,240,244)'

function legibleFg(fg: string, bg: string): string {
  if (contrast(fg, bg) >= 3.6) return fg
  return contrast(INK, bg) >= contrast(BONE, bg) ? INK : BONE
}

function sample(hour: number) {
  const h = Math.min(Math.max(hour, KEYS[0].h), KEYS[KEYS.length - 1].h)
  let i = 0
  while (i < KEYS.length - 2 && KEYS[i + 1].h < h) i++
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const t = b.h === a.h ? 0 : (h - a.h) / (b.h - a.h)
  return {
    z: mixHex(a.z, b.z, t),
    m: mixHex(a.m, b.m, t),
    hz: mixHex(a.hz, b.hz, t),
    fg: mixHex(a.fg, b.fg, t),
    soft: mixHex(a.soft, b.soft, t),
    acc: mixHex(a.acc, b.acc, t),
    night: a.night + (b.night - a.night) * t,
    grain: a.grain + (b.grain - a.grain) * t,
  }
}

const SUN_RISE = 6.05
const SUN_SET = 19.45
const MOON_RISE = 20.6
const MOON_SET = 29.4

function sunAt(hour: number): SunState {
  if (hour >= SUN_RISE && hour <= SUN_SET) {
    const t = (hour - SUN_RISE) / (SUN_SET - SUN_RISE)
    return { kind: 'sun', x: t, elev: Math.sin(Math.PI * t) }
  }
  if (hour >= MOON_RISE && hour <= MOON_SET) {
    const t = (hour - MOON_RISE) / (MOON_SET - MOON_RISE)
    return { kind: 'moon', x: t, elev: Math.sin(Math.PI * t) }
  }
  return { kind: 'none', x: 0, elev: 0 }
}

export type DayEngine = {
  subscribe: (fn: (s: DayState) => void) => () => void
  getState: () => DayState
  refresh: () => void
  destroy: () => void
}

export function initDay(skyOffRanges: Array<[number, number]>): DayEngine {
  let anchors: Array<{ y: number; hour: number }> = []
  let maxScroll = 1
  let state: DayState = {
    hour: 5.7,
    vel: 0,
    sun: sunAt(5.7),
    night: 0.85,
    skyOff: false,
    zenith: '#10192E',
    mid: '#1F2C47',
    horizon: '#6E4F3C',
  }
  const subs = new Set<(s: DayState) => void>()
  let raf = 0
  let lastY = -1
  let lastT = performance.now()
  let vel = 0
  let force = true

  const measure = () => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-hour]'))
    const vh = window.innerHeight
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
    anchors = els
      .map((el) => ({
        y: Math.max(0, el.getBoundingClientRect().top + window.scrollY - vh * 0.45),
        hour: parseFloat(el.dataset.hour || '12'),
      }))
      .sort((a, b) => a.y - b.y)
    force = true
  }

  const hourAt = (y: number): number => {
    if (anchors.length === 0) return 5.7 + (y / maxScroll) * 24
    /* the page ends in deep night — the ending stays under the same sky */
    const pts = [{ y: 0, hour: 5.7 }, ...anchors, { y: maxScroll, hour: 28.4 }]
    let i = 0
    while (i < pts.length - 2 && pts[i + 1].y <= y) i++
    const a = pts[i]
    const b = pts[i + 1]
    if (b.y <= a.y) return b.hour
    const t = Math.min(1, Math.max(0, (y - a.y) / (b.y - a.y)))
    return a.hour + (b.hour - a.hour) * t
  }

  const root = document.documentElement

  const tick = () => {
    raf = requestAnimationFrame(tick)
    const now = performance.now()
    const dt = Math.max(1, now - lastT)
    const y = window.scrollY
    const rawVel = lastY < 0 ? 0 : ((y - lastY) / dt) * 1000
    vel = vel * 0.88 + rawVel * 0.12
    lastY = y
    lastT = now

    const hour = hourAt(y)
    if (!force && Math.abs(hour - state.hour) < 0.0004 && Math.abs(vel) < 1) return
    force = false

    const s = sample(hour)
    const sun = sunAt(hour)
    const skyOff = skyOffRanges.some(([a, b]) => hour >= a && hour <= b)

    state = {
      hour,
      vel,
      sun,
      night: s.night,
      skyOff,
      zenith: s.z,
      mid: s.m,
      horizon: s.hz,
    }

    const fgSafe = skyOff ? 'rgb(230,232,236)' : legibleFg(s.fg, s.m)
    const softSafe = skyOff
      ? '#9BA1AB'
      : contrast(s.soft, s.m) >= 2.7
        ? s.soft
        : mixRgbStr(fgSafe, s.m, 0.32)

    root.style.setProperty('--fg', fgSafe)
    root.style.setProperty('--soft', softSafe)
    root.style.setProperty('--line', rgbWithAlpha(fgSafe, 0.22))
    const accNow = skyOff ? 'rgb(204,255,0)' : s.acc
    root.style.setProperty('--acc', accNow)
    root.style.setProperty(
      '--selfg',
      contrast(INK, accNow) >= contrast(BONE, accNow) ? INK : BONE,
    )
    root.style.setProperty('--grain', skyOff ? '0.05' : s.grain.toFixed(3))
    root.style.setProperty('--skytop', skyOff ? 'rgba(5,5,5,0.88)' : rgbWithAlpha(s.z, 0.82))

    subs.forEach((fn) => fn(state))
  }

  measure()
  const ro = new ResizeObserver(measure)
  ro.observe(document.body)
  window.addEventListener('resize', measure)
  raf = requestAnimationFrame(tick)

  return {
    subscribe(fn) {
      subs.add(fn)
      fn(state)
      return () => subs.delete(fn)
    },
    getState: () => state,
    refresh: measure,
    destroy() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    },
  }
}

/* Format 27.53 → "03:31" */
export function clockOf(hour: number): string {
  const h24 = ((hour % 24) + 24) % 24
  const hh = Math.floor(h24)
  const mm = Math.floor((h24 - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}
