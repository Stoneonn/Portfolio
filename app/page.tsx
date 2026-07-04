'use client'
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  type MotionStyle,
} from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Gallery } from '@/components/gallery'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import {
  ARCHIVE,
  DATA_PROJECTS,
  EDUCATION,
  EMAIL,
  FEATURED_EXHIBITION,
  PAINTINGS,
  PROVENANCE,
  QUOTE,
  READING_LIST,
  SOCIAL_LINKS,
} from './data'

const EASE = [0.22, 1, 0.36, 1] as const
const PAD = 'mx-auto w-full max-w-4xl px-6 md:px-10'
const INDENT = 'md:pl-28'

/* Where each landmark sits in the scroll, 0→1. Measured after mount. */
type Landmarks = {
  studied: number
  built: number
  gapA: number
  gapB: number
  measured: number
  read: number
  guest: number
  dusk: number
}

const DEFAULT_LANDMARKS: Landmarks = {
  studied: 0.14,
  built: 0.28,
  gapA: 0.44,
  gapB: 0.52,
  measured: 0.56,
  read: 0.68,
  guest: 0.78,
  dusk: 0.85,
}

/* Force a strictly ascending sequence so useTransform never chokes. */
function ascending(values: number[]): number[] {
  const out: number[] = []
  let prev = -1
  for (const value of values) {
    const v = Math.min(Math.max(value, prev + 0.001), 0.999)
    out.push(v)
    prev = v
  }
  return out
}

function formatClock(minutes: number): string {
  const m = Math.min(Math.round(minutes), 1439)
  const hh = String(Math.floor(m / 60)).padStart(2, '0')
  const mm = String(m % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Section header: the hour, a rule, the title. */
function Stamp({ time, title }: { time: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <span className="c-accent font-mono text-[0.65rem] tracking-[0.3em] uppercase">
          {time}
        </span>
        <span aria-hidden className="bg-line h-px flex-1" />
      </div>
      <h2 className="c-fg mt-4 font-serif text-4xl sm:text-5xl">{title}</h2>
    </div>
  )
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

/* Tap a ledger row, the live record morphs out of it. Chrome stays dark. */
function ProjectEmbed({
  src,
  children,
}: {
  src: string
  children: React.ReactNode
}) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>{children}</MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative h-[80vh] w-[90vw] bg-[#15130f] p-1 ring-1 ring-white/10 ring-inset md:aspect-video md:h-auto md:w-auto">
          <iframe
            src={src}
            className="h-full w-full md:aspect-video md:h-[70vh]"
            title="Embedded website"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full border border-white/20 bg-[#15130f] p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <X className="h-5 w-5 text-[#ede7d9]" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

/* Brand wordmarks as colored type — flyer energy, no boxes. */
function BrandName({ id }: { id: string }) {
  if (id === 'been') {
    return (
      <span className="font-sans text-3xl font-bold tracking-tight italic text-[#FF5470]">
        BEEN
      </span>
    )
  }
  if (id === 'lastfm') {
    return (
      <span className="font-sans text-3xl font-bold tracking-tighter text-[#FF3B2F]">
        last.fm
      </span>
    )
  }
  if (id === 'goodreads') {
    return <span className="font-serif text-3xl text-[#EDE7D9]">goodreads</span>
  }
  return (
    <span className="inline-block rounded-sm bg-[#F5C518] px-2 py-0.5 text-2xl font-black text-black">
      IMDb
    </span>
  )
}

function DataRow({
  project,
}: {
  project: (typeof DATA_PROJECTS)[number]
}) {
  const row = (
    <div className="b-line group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-4 border-t py-6 text-left">
      <div>
        <BrandName id={project.id} />
        <p className="c-soft mt-1.5 text-sm">{project.description}</p>
      </div>
      <span className="c-accent font-mono text-[0.62rem] tracking-[0.2em] uppercase opacity-70 transition-opacity group-hover:opacity-100">
        {project.embedUrl ? 'Tap — live' : 'Visit ↗'}
      </span>
    </div>
  )

  if (project.embedUrl) {
    return <ProjectEmbed src={project.embedUrl}>{row}</ProjectEmbed>
  }
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      {row}
    </a>
  )
}

export default function Personal() {
  const studiedRef = useRef<HTMLElement | null>(null)
  const builtRef = useRef<HTMLElement | null>(null)
  const gapRef = useRef<HTMLDivElement | null>(null)
  const measuredRef = useRef<HTMLElement | null>(null)
  const readRef = useRef<HTMLElement | null>(null)
  const guestRef = useRef<HTMLElement | null>(null)
  const duskRef = useRef<HTMLElement | null>(null)

  const [marks, setMarks] = useState<Landmarks>(DEFAULT_LANDMARKS)

  useEffect(() => {
    const measure = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const at = (el: Element | null) =>
        el
          ? Math.min(
              1,
              Math.max(
                0,
                (el.getBoundingClientRect().top + window.scrollY) / total,
              ),
            )
          : 0
      const gapTop = gapRef.current
        ? (gapRef.current.getBoundingClientRect().top + window.scrollY) / total
        : DEFAULT_LANDMARKS.gapA
      const gapBottom = gapRef.current
        ? gapTop + gapRef.current.offsetHeight / total
        : DEFAULT_LANDMARKS.gapB
      setMarks({
        studied: at(studiedRef.current),
        built: at(builtRef.current),
        gapA: Math.min(1, Math.max(0, gapTop)),
        gapB: Math.min(1, Math.max(0, gapBottom)),
        measured: at(measuredRef.current),
        read: at(readRef.current),
        guest: at(guestRef.current),
        dusk: at(duskRef.current),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll()

  /* The sky. Paper morning → golden hour → ink night → blue-black dusk. */
  const bgStops = ascending([0, marks.built, marks.gapA, marks.gapB, marks.dusk])
  const bg = useTransform(
    scrollYProgress,
    [...bgStops, 1],
    ['#F5EEDF', '#F5EEDF', '#EFE0C0', '#131110', '#111015', '#0A0D1A'],
  )

  /* Text flips from ink to bone in the empty sunset gap — never mid-copy. */
  const fgStops = ascending([0, marks.gapA, marks.gapB])
  const fg = useTransform(
    scrollYProgress,
    [...fgStops, 1],
    ['#1D1A15', '#1D1A15', '#EDE7D9', '#EDE7D9'],
  )
  const soft = useTransform(
    scrollYProgress,
    [...fgStops, 1],
    ['#6E6656', '#6E6656', '#A8A294', '#A8A294'],
  )
  const line = useTransform(
    scrollYProgress,
    [...fgStops, 1],
    [
      'rgba(29,26,21,0.18)',
      'rgba(29,26,21,0.18)',
      'rgba(237,231,217,0.16)',
      'rgba(237,231,217,0.16)',
    ],
  )
  /* Accent: navy while the sun is up, acid after dark. */
  const accent = useTransform(
    scrollYProgress,
    [...fgStops, 1],
    ['#26337B', '#26337B', '#CCFF00', '#CCFF00'],
  )

  /* The corner clock ticks through the day, then stops at the gallery. */
  const clockStops = ascending([
    0,
    marks.studied,
    marks.built,
    marks.gapB,
    marks.measured,
    marks.read,
    marks.guest,
    marks.dusk,
  ])
  const clockMinutes = useTransform(scrollYProgress, clockStops, [
    540, 660, 900, 1180, 1290, 1380, 1435, 1439,
  ])
  const clockText = useTransform(clockMinutes, formatClock)
  const clockOpacity = useTransform(
    scrollYProgress,
    [marks.dusk, Math.min(marks.dusk + 0.05, 1)],
    [1, 0],
  )

  const dayStyle = {
    backgroundColor: bg,
    '--fg': fg,
    '--soft': soft,
    '--line': line,
    '--accent': accent,
  } as MotionStyle

  /*
    The finale hangs one work from the collection. When PAINTINGS grows
    past one entry, this becomes a random pick per visit.
  */
  const painting = PAINTINGS[0]

  return (
    <MotionConfig reducedMotion="user">
      <motion.div style={dayStyle} className="min-h-screen">
        {/* The clock — scroll is time */}
        <motion.div
          style={{ opacity: clockOpacity }}
          className="pointer-events-none fixed top-5 right-5 z-50 font-mono text-[0.62rem] tracking-[0.3em] text-white uppercase mix-blend-difference"
        >
          Milano — <motion.span>{clockText}</motion.span>
        </motion.div>

        {/* ——— 09:00, the opening ——— */}
        <header className={`${PAD} flex min-h-[92svh] flex-col justify-end pb-14`}>
          <div>
            <h1 className="c-fg font-serif text-[clamp(3rem,15vw,11rem)] leading-[0.92] tracking-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                Ömer
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
              >
                Taşkaya
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="c-soft mt-8 max-w-xl text-base leading-relaxed"
            >
              Economics at Bocconi by day; AI arguments, photographs, and acid
              techno after dark. Everything I am on one page — it runs from
              morning to dusk.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="c-soft mt-6 font-mono text-[0.68rem] leading-relaxed tracking-[0.06em]"
            >
              <span className="c-accent">PROVENANCE — </span>
              {PROVENANCE.map((city, index) => (
                <span key={city}>
                  <span
                    className={
                      index === PROVENANCE.length - 1 ? 'c-fg' : undefined
                    }
                  >
                    {city}
                  </span>
                  {index < PROVENANCE.length - 1 && (
                    <span className="c-accent"> → </span>
                  )}
                </span>
              ))}
              <span>, at present</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="c-soft mt-12 font-mono text-[0.62rem] tracking-[0.3em] uppercase"
            >
              Scroll — the day passes ↓
            </motion.p>
          </div>
        </header>

        {/* ——— 09:40, contact sheet ——— */}
        <section className="w-full">
          <div className={PAD}>
            <div className="mb-6 flex items-center gap-4">
              <span className="c-accent font-mono text-[0.65rem] tracking-[0.3em] uppercase">
                09:40 — Contact sheet
              </span>
              <span aria-hidden className="bg-line h-px flex-1" />
            </div>
          </div>
          <Gallery />
        </section>

        {/* ——— 11:00, where I studied ——— */}
        <section ref={studiedRef} className={`${PAD} mt-28 sm:mt-36`}>
          <Reveal>
            <Stamp time="11:00" title="Where I studied" />
          </Reveal>
          <Reveal className={INDENT} delay={0.05}>
            <div className="b-line border-b">
              {EDUCATION.map((edu) => (
                <a
                  key={edu.id}
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="b-line group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t py-6"
                >
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    width={40}
                    height={40}
                    className="h-9 w-9 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <h3 className="c-fg font-serif text-2xl leading-snug sm:text-3xl">
                      {edu.school}
                    </h3>
                    <p className="c-soft mt-1 font-mono text-[0.66rem] tracking-[0.14em] uppercase">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="c-soft font-mono text-xs">
                      {edu.start}–{edu.end}
                    </p>
                    <ArrowUpRight className="c-accent mt-1 ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— 15:00, what I built ——— */}
        <section ref={builtRef} className={`${PAD} mt-28 sm:mt-36`}>
          <Reveal>
            <Stamp time="15:00" title="What I built" />
          </Reveal>

          <Reveal className={INDENT} delay={0.05}>
            {/* The exhibition poster keeps its own identity. */}
            <a
              href={FEATURED_EXHIBITION.href}
              className="group block bg-neon p-7 text-black transition-transform duration-300 hover:-translate-y-1 sm:p-10 md:-ml-28"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.65rem] font-extrabold tracking-[0.28em] uppercase">
                  {FEATURED_EXHIBITION.overline}
                </p>
                <span className="shrink-0 bg-black px-2 py-1 text-[0.58rem] font-extrabold tracking-[0.1em] text-neon uppercase">
                  Past exhibition
                </span>
              </div>
              <p className="mt-5 text-6xl leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-7xl">
                {FEATURED_EXHIBITION.title}
              </p>
              <p className="mt-5 max-w-md text-sm leading-snug font-semibold">
                {FEATURED_EXHIBITION.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex rounded-full bg-black px-5 py-2.5 text-[0.65rem] font-extrabold tracking-[0.08em] text-neon uppercase transition-transform duration-300 group-hover:scale-105">
                  Open the guide ↗
                </span>
                <span className="text-[0.62rem] font-bold tracking-[0.06em] uppercase">
                  {FEATURED_EXHIBITION.dates}
                </span>
              </div>
            </a>

            <div className="b-line mt-12 border-b">
              {ARCHIVE.map((project) => (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="b-line group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t py-5"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="80px"
                      className="object-cover saturate-50 transition-all duration-500 group-hover:saturate-100"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="c-fg font-serif text-xl">{project.name}</h3>
                    <p className="c-soft mt-0.5 truncate text-sm">
                      {project.description}
                    </p>
                  </div>
                  <span className="c-soft shrink-0 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
                    Archived
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— the sun goes down ——— */}
        <div
          ref={gapRef}
          className="flex h-[65vh] items-center justify-center"
        >
          <p className="c-soft font-mono text-[0.62rem] tracking-[0.35em] uppercase">
            19:12 — golden hour ends
          </p>
        </div>

        {/* ——— 21:30, what I keep count of ——— */}
        <section ref={measuredRef} className={`${PAD}`}>
          <Reveal>
            <Stamp time="21:30" title="What I keep count of" />
          </Reveal>
          <Reveal className={INDENT} delay={0.05}>
            <p className="c-soft font-canela-italic text-lg">
              Four years of scrobbles don’t lie, and neither does the map.
            </p>
            <div className="b-line mt-8 border-b">
              {DATA_PROJECTS.map((project) => (
                <DataRow key={project.id} project={project} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— 23:00, what I read ——— */}
        <section ref={readRef} className={`${PAD} mt-28 sm:mt-36`}>
          <Reveal>
            <Stamp time="23:00" title="What I read" />
          </Reveal>
          <Reveal className={INDENT} delay={0.05}>
            <p className="c-soft font-canela-italic text-lg">
              The morning papers, read at night.
            </p>
            <div className="mt-8 gap-10 sm:columns-2 lg:columns-3">
              {READING_LIST.map((category) => (
                <div
                  key={category.category}
                  className="mb-10 break-inside-avoid"
                >
                  <div className="b-line border-t pt-3">
                    <h3 className="c-fg font-canela-italic text-lg">
                      {category.category}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {category.items.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="c-soft group flex items-baseline justify-between gap-2 text-sm transition-colors hover:text-(--fg)"
                          >
                            <span>{item.title}</span>
                            <span className="c-accent opacity-0 transition-opacity group-hover:opacity-100">
                              ↗
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— 23:59, write to me ——— */}
        <section ref={guestRef} className={`${PAD} mt-28 sm:mt-36`}>
          <Reveal>
            <Stamp time="23:59" title="Write to me" />
          </Reveal>
          <Reveal className={INDENT} delay={0.05}>
            <p className="c-soft text-sm leading-relaxed">
              The day ends; the inbox doesn’t.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="c-fg mt-5 inline-block font-serif text-2xl underline decoration-(--accent) decoration-1 underline-offset-8 transition-opacity hover:opacity-80 sm:text-4xl"
            >
              {EMAIL}
            </a>
            <div className="mt-8 flex items-center gap-8">
              {SOCIAL_LINKS.map((social) => (
                <Magnetic
                  key={social.label}
                  springOptions={{ bounce: 0 }}
                  intensity={0.3}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-soft group inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase transition-colors hover:text-(--accent)"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— dusk: the gallery ——— */}
        <section ref={duskRef} className="mt-36 sm:mt-48">
          <Reveal className="mx-auto max-w-2xl px-6 text-center">
            <p className="c-fg font-serif text-2xl leading-snug sm:text-3xl">
              “{QUOTE.text}”
            </p>
            <p className="c-soft mt-6 font-mono text-[0.6rem] tracking-[0.28em] uppercase">
              — {QUOTE.attribution}, {QUOTE.year}
            </p>
          </Reveal>

          <Reveal className="mt-20 sm:mt-28" delay={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-[46%] -translate-y-1/2 bg-navy"
              />
              <div className="relative mx-auto max-w-xl px-8 sm:px-6">
                <Image
                  src={painting.src}
                  alt={`${painting.title} — ${painting.artist}, ${painting.year}`}
                  width={1720}
                  height={1238}
                  sizes="(max-width: 640px) 100vw, 576px"
                  className="h-auto w-full shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="c-fg font-canela-italic text-lg">
                {painting.title}
              </p>
              <p className="c-soft mt-1 text-sm">
                {painting.artist}, {painting.year}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ——— exit ——— */}
        <footer className="pt-28 pb-10 text-center">
          <p className="c-soft font-mono text-[0.58rem] tracking-[0.25em] uppercase">
            © MMXXVI Ömer Taşkaya — the day repeats tomorrow
          </p>
        </footer>
      </motion.div>
    </MotionConfig>
  )
}
