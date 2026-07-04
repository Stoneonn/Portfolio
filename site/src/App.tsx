import { useEffect, useState } from 'react'
import { initDay, type DayEngine } from './engine/day'
import { Sky } from './engine/Sky'
import { Hud } from './ui/Hud'
import { A1, Education, Photos, Press } from './sections/day'
import { Dusk, Foreign, Records } from './sections/dusk'
import { Built, Contact, Ending } from './sections/night'

export default function App() {
  const [engine, setEngine] = useState<DayEngine | null>(null)

  useEffect(() => {
    const e = initDay([])
    setEngine(e)

    /* Re-measure once the display faces arrive. */
    document.fonts?.ready.then(() => e.refresh()).catch(() => {})

    /* Deep links: /#provenance, /#painting … resolved after mount. */
    if (window.location.hash) {
      setTimeout(() => {
        try {
          document.querySelector(window.location.hash)?.scrollIntoView()
        } catch {
          /* malformed hash — ignore */
        }
      }, 400)
    }

    return () => e.destroy()
  }, [])

  /*
    One observer develops everything that enters the tray. A MutationObserver
    enrolls late-mounted nodes, so reveal never depends on effect ordering.
  */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const seen = new WeakSet<Element>()
    const scan = () => {
      document.querySelectorAll('.rv, .expose').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el)
          io.observe(el)
        }
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <>
      {engine && <Sky engine={engine} />}
      {engine && <Hud engine={engine} />}
      <main>
        <A1 />
        <Press />
        <Education />
        <Photos />
        <Foreign engine={engine} />
        <Dusk />
        <Records />
        <Built />
        <Contact />
        <Ending />
      </main>
    </>
  )
}
