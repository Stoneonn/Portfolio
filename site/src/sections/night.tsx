import { EMAIL, PAINTINGS, PROJECTS, QUOTE, SOCIALS } from '../data'
import { Stamp } from '../ui/bits'

const SHELL = 'relative mx-auto w-full max-w-5xl px-5 md:px-10'

/* ————— 23:00 · Built ————— */

export function Built() {
  return (
    <section id="built" data-hour="23.2" className={`${SHELL} mt-36`}>
      <Stamp time="23:00" title="Built" />
      <div className="b-line border-t">
        {PROJECTS.map((p) => {
          const external = p.url.startsWith('http')
          return (
            <a
              key={p.name}
              href={p.url}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rv b-line group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b py-6"
            >
              <span className="min-w-0">
                <span className="serif c-fg text-xl sm:text-2xl">{p.name}</span>
                <span className="c-soft mt-1 block text-sm">{p.line}</span>
              </span>
              {p.live ? (
                <span className="mono shrink-0 bg-[#CCFF00] px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-black uppercase">
                  {p.tag}
                </span>
              ) : (
                <span className="c-soft mono shrink-0 text-[9px] tracking-[0.16em] uppercase">
                  {p.tag}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}

/* ————— 02:00 · Write to me ————— */

export function Contact() {
  return (
    <section id="contact" data-hour="25.8" className={`${SHELL} mt-36`}>
      <Stamp time="02:00" title="Write to me" />
      <a
        href={`mailto:${EMAIL}`}
        className="serif c-fg rv b-line inline-block border-b pb-1 text-[clamp(1.3rem,4.6vw,2.6rem)] leading-tight"
      >
        {EMAIL}
      </a>
      <div className="rv mt-8 flex gap-10">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="c-soft mono text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-(--fg)"
          >
            {s.label} ↗
          </a>
        ))}
      </div>
    </section>
  )
}

/* ————— 03:30 · The ending: the quote, then the painting. Nothing after. ————— */

export function Ending() {
  /* When the collection grows past one work, this picks per visit. */
  const painting = PAINTINGS[Math.floor(Math.random() * PAINTINGS.length)]

  return (
    <section id="painting" data-hour="27.2" className="mt-44">
      <blockquote className="rv mx-auto max-w-3xl px-6 text-center">
        <p className="serif c-fg text-xl leading-snug md:text-2xl">“{QUOTE.text}”</p>
        <footer className="mono c-soft mt-6 text-[10px] tracking-[0.28em] uppercase">
          — {QUOTE.attribution} · {QUOTE.where}
        </footer>
      </blockquote>

      <div className="rv mt-28 sm:mt-36">
        {/* band and painting share one box, so the band centers on the canvas */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-[46%] -translate-y-1/2 bg-[#1B2A44]"
          />
          <img
            src={painting.src}
            alt={`${painting.title} — ${painting.artist}, ${painting.year}`}
            loading="lazy"
            className="relative mx-auto block w-[78%] max-w-3xl"
          />
        </div>
        <div className="mt-8 text-center">
          <p className="deck c-fg text-lg">{painting.title}</p>
          <p className="mono c-soft mt-1.5 text-[10px] tracking-[0.2em] uppercase">
            {painting.artist}, {painting.year} — {painting.medium}
          </p>
        </div>
      </div>

      <p
        data-hour="28.4"
        className="c-soft mono mt-32 pb-10 text-center text-[8px] tracking-[0.26em] uppercase opacity-70"
      >
        © MMXXVI Ömer Taşkaya
      </p>
    </section>
  )
}
