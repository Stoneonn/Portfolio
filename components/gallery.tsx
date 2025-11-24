'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const images = [
  {
    src: 'https://i.imgur.com/9XT6vDr.jpeg',
    alt: 'Portrait',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://i.imgur.com/KffUo1J.jpeg',
    alt: 'Speaking event',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://i.imgur.com/3qu6gzX.jpeg',
    alt: 'Photography',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://i.imgur.com/yLb86Jf.jpeg',
    alt: 'Travel',
    className: 'col-span-1.5 row-span-1',
  },
  {
    src: 'https://i.imgur.com/PWm2p78.jpeg',
    alt: 'Snow',
    className: 'col-span-1.5 row-span-1',
  },
]

export function Gallery() {
  return (
    <section className="mb-12 w-full ml-0 md:-ml-[10%] md:w-[120%]">
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-3 gap-1">
            {images.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[1.2/1] overflow-hidden bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1">
            {images.slice(3, 5).map((image, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 3) * 0.1 }}
                className="relative aspect-[1.6/1] overflow-hidden bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
