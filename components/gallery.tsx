'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const images = [
  { src: 'https://i.imgur.com/9XT6vDr.jpeg', alt: 'Portrait' },
  { src: 'https://i.imgur.com/KffUo1J.jpeg', alt: 'Speaking event' },
  { src: 'https://i.imgur.com/3qu6gzX.jpeg', alt: 'Photography' },
  { src: 'https://i.imgur.com/yLb86Jf.jpeg', alt: 'Travel' },
  { src: 'https://i.imgur.com/PWm2p78.jpeg', alt: 'Snow' },
]

/*
  Contact sheet: frameless, edge to edge. Swipes horizontally on mobile,
  sits as a single five-across strip on desktop.
*/
export function Gallery() {
  return (
    <div className="flex snap-x snap-mandatory gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.55,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative aspect-[3/4] w-[68vw] flex-none snap-center overflow-hidden md:w-auto"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 68vw, 20vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
