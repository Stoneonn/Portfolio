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
      <p className="c-fg mt-6 max-w-xl text-[15px] leading-relaxed">
        Hey, welcome. I’m Ömer, someone who aspires to be a lot of things,
        you’ll see.
      </p>
      <p className="mono c-soft mt-8 text-[10px] tracking-[0.3em] uppercase">
        Scroll ↓
      </p>
    </header>
  )
}

/* ————— 13:00 · Press ————— */

export function Press() {
  return (
    <section id="press" data-hour="13" className={`${SHELL} mt-36`}>
      <Stamp time="13:00" title="Periodical readings" />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {PRESS_CATEGORIES.map((cat) => (
          <div key={cat} className="rv">
            <h3 className="c-soft mono b-line border-b pb-2 text-[10px] tracking-[0.24em] uppercase">
              {cat}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {WIRE.filter((w) => w.category === cat).map((w) => (
                <li key={w.masthead}>
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
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ————— 11:00 · Education ————— */

export function Education() {
  return (
    <section id="education" data-hour="11" className={`${SHELL} mt-36`}>
      <Stamp time="11:00" title="Education" />
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
                {/*
                  alt="" is deliberate, not an oversight. The institution's name
                  is the <h3> directly above this logo, so alt="Bocconi
                  University logo" would make a screen reader announce it twice.
                  W3C's guidance is to mark an image empty when adjacent text
                  already carries its meaning. Automated SEO checkers flag this
                  as "missing alt text"; they are wrong here — the name is in
                  the HTML, so nothing is lost to a crawler either.
                */}
                <img
                  src={s.logo}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 shrink-0 self-center object-contain md:h-14 md:w-14"
                />
              </div>
              <p className="mono c-soft mt-2 text-[10px] tracking-[0.18em] uppercase">
                {s.degree}
              </p>
            </a>
          ))}
        </div>
        <figure className="expose md:col-span-5 md:self-end">
          <img
            src="/photos/02-stage.webp"
            alt="Ömer standing among a seated audience with both thumbs up, in front of a presentation screen"
            loading="lazy"
            className="w-full object-cover"
          />
        </figure>
      </div>
    </section>
  )
}

/* ————— 15:30 · Photographs ————— */

export function Photos() {
  return (
    <section id="photos" data-hour="15.5" className={`${SHELL} mt-36`}>
      <Stamp time="15:30" title="Photographs" />
      <div className="grid grid-cols-12 gap-y-6 md:gap-y-10">
        <figure className="expose col-span-12 md:-mx-10">
          <img src="/photos/03-camera.webp" alt="Ömer raising a compact camera to frame a shot, lilac in bloom and hills behind him at dusk" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-7 col-start-6 -mt-2 md:col-span-5 md:col-start-8">
          <img src="/photos/04-road.webp" alt="Ömer from behind, arm out and thumb up, hitchhiking on a tree-lined road" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-8 col-start-1 md:col-span-6">
          <img src="/photos/05-snow.webp" alt="Ömer in a dark beanie on a snowed-in forest trail, a cross-country skier climbing behind him" className="w-full object-cover" loading="lazy" />
        </figure>
        <figure className="expose col-span-5 col-start-8 -mt-10 md:col-span-3 md:col-start-9 md:-mt-24">
          <img src="/photos/01-portrait.webp" alt="Portrait of Ömer in a black leather jacket over a burgundy shirt, exposed ducting behind" className="w-full object-cover" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
