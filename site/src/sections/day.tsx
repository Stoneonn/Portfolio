import { useState } from 'react'
import { EDUCATION, PRESS_CATEGORIES, WIRE } from '../data'
import { Stamp } from '../ui/bits'

const SHELL = 'relative mx-auto w-full max-w-5xl px-5 md:px-10'

/* ————— 05:41 ————— */

export function A1() {
  return (
    <header
      id="a1"
      data-hour="5.7"
      className={`${SHELL} flex min-h-[100svh] flex-col justify-end pb-16`}
    >
      <h1
        lang="tr"
        className="serif c-fg text-[clamp(2.8rem,10.5vw,8.5rem)] leading-[0.95] tracking-tight"
      >
        Ömer Taşkaya
      </h1>
      <p className="deck c-soft mt-3 text-lg">
        <span lang="ru">это я</span> — this is me
      </p>
      <p className="c-fg mt-8 max-w-xl text-[15px] leading-relaxed">
        Twenty. Economics at Bocconi; AI, photographs, and acid techno after
        dark. One page, one day — first light to first light.
      </p>
      <p className="mono c-soft mt-8 text-[10px] tracking-[0.3em] uppercase">
        Scroll — the day passes ↓
      </p>
    </header>
  )
}

/* ————— 07:00 · Press ————— */

function CyrTitle({ cyr, latin }: { cyr: string; latin: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="serif cursor-pointer text-left"
      aria-label={`${latin} — transliterate`}
    >
      <span lang={flipped ? undefined : 'ru'}>{flipped ? latin : cyr}</span>
    </button>
  )
}

export function Press() {
  return (
    <section id="press" data-hour="7.1" className={`${SHELL} mt-36`}>
      <Stamp time="07:00" title="Press" />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {PRESS_CATEGORIES.map((cat) => (
          <div key={cat} className="rv">
            <h3
              lang={cat === 'Россия' ? 'ru' : undefined}
              className="c-soft mono b-line border-b pb-2 text-[10px] tracking-[0.24em] uppercase"
            >
              {cat}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {WIRE.filter((w) => w.category === cat).map((w) => (
                <li key={w.masthead} className="flex items-baseline justify-between gap-3">
                  {w.cyr ? (
                    <>
                      <span className="serif c-fg text-lg leading-snug">
                        <CyrTitle cyr={w.cyr} latin={w.masthead} />
                      </span>
                      <a
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${w.masthead}`}
                        className="c-soft -m-2 shrink-0 p-2 text-xs"
                      >
                        ↗
                      </a>
                    </>
                  ) : (
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="serif c-fg group flex w-full items-baseline justify-between gap-3 text-lg leading-snug"
                    >
                      <span>{w.masthead}</span>
                      <span className="c-soft shrink-0 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                        ↗
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ————— 10:00 · Education ————— */

export function Education() {
  return (
    <section id="education" data-hour="10" className={`${SHELL} mt-36`}>
      <Stamp time="10:00" title="Education" />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          {EDUCATION.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rv b-line group block border-b py-7 ${i === 0 ? 'border-t' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className={`serif c-fg leading-[1.02] ${
                    i === 0
                      ? 'text-[clamp(2rem,5.4vw,3.6rem)]'
                      : 'text-[clamp(1.4rem,3.4vw,2.2rem)]'
                  }`}
                >
                  {s.name}
                </h3>
                <img
                  src={s.logo}
                  alt=""
                  loading="lazy"
                  className="h-8 w-8 shrink-0 object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <p className="mono c-soft mt-2 text-[10px] tracking-[0.18em] uppercase">
                {s.degree} — {s.years}
              </p>
            </a>
          ))}
        </div>
        <figure className="expose md:col-span-5 md:self-end">
          <img
            src="/photos/02-stage.jpg"
            alt="Ömer speaking on stage"
            loading="lazy"
            className="w-full object-cover"
          />
        </figure>
      </div>
    </section>
  )
}

/* ————— 14:00 · Photographs ————— */

export function Photos() {
  return (
    <section id="photos" data-hour="14" className={`${SHELL} mt-36`}>
      <Stamp time="14:00" title="Photographs" />
      <div className="grid grid-cols-12 gap-y-6 md:gap-y-10">
        <figure className="expose col-span-12 md:-mx-10">
          <img src="/photos/03-camera.jpg" alt="With a camera, in the green" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-7 col-start-6 -mt-2 md:col-span-5 md:col-start-8">
          <img src="/photos/04-road.jpg" alt="A road" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-8 col-start-1 md:col-span-6">
          <img src="/photos/05-snow.jpg" alt="Snow, uphill" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-5 col-start-8 -mt-10 md:col-span-3 md:col-start-9 md:-mt-24">
          <img src="/photos/01-portrait.jpg" alt="Portrait of Ömer" className="w-full object-cover" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
