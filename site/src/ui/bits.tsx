import { useEffect, useRef, useState } from 'react'

/* Section header: the hour, the title. One layer of metadata, no more. */
export function Stamp({ time, title }: { time: string; title: string }) {
  return (
    <div className="rv mb-10">
      <p className="c-acc mono text-[10px] tracking-[0.3em]">{time}</p>
      <h2 className="serif c-fg mt-2 text-3xl sm:text-4xl">{title}</h2>
    </div>
  )
}

/* Live embeds arrive as a bottom sheet. */
export function Sheet({
  src,
  title,
  open,
  onClose,
}: {
  src: string
  title: string
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      setLoaded(true)
      d.showModal()
      /* the page behind is a time machine — freeze it while the sheet is up */
      document.body.style.overflow = 'hidden'
    } else if (!open && d.open) {
      d.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-label={title}
      onClose={() => {
        document.body.style.overflow = ''
        onClose()
      }}
      onClick={(e) => {
        /* backdrop tap closes — clicks inside land on children, not the dialog */
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="flex items-center justify-between border-b border-white/15 pl-4">
        <p className="mono text-[10px] tracking-[0.24em] text-[#c8cfda] uppercase">
          {title} — live
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mono cursor-pointer px-4 py-4 text-[10px] tracking-[0.2em] text-[#c8cfda] uppercase hover:text-[#ccff00]"
        >
          Close ✕
        </button>
      </div>
      {loaded && (
        <iframe src={src} title={title} className="h-[calc(86dvh-45px)] w-full bg-white" />
      )}
    </dialog>
  )
}
