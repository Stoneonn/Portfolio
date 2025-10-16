'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

/**
 * GallerySection Component
 * 
 * A responsive photo grid that showcases personality and experiences.
 * 
 * Layout:
 * - Desktop (lg): 4-5 columns
 * - Tablet (md): 3 columns  
 * - Mobile (sm): 2 columns
 * 
 * Features:
 * - Organic collage feel with varied aspect ratios
 * - Smooth hover animations (scale + shadow)
 * - Rounded corners and subtle borders
 * - Deep dark background (#0A0A0A)
 * - Optimized with Next.js Image component
 * - Fully accessible with alt tags and keyboard navigation
 */

type GalleryImage = {
  src: string
  alt: string
  aspectRatio?: 'square' | 'portrait' | 'landscape'
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Professional speaking event',
    aspectRatio: 'landscape',
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Apple Park visit',
    aspectRatio: 'square',
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'Desert adventure on quad bike',
    aspectRatio: 'portrait',
  },
  {
    src: '/gallery/image4.jpg',
    alt: 'Night out with friends',
    aspectRatio: 'square',
  },
  {
    src: '/gallery/image5.jpg',
    alt: 'Tech conference moment',
    aspectRatio: 'landscape',
  },
  {
    src: '/gallery/image6.jpg',
    alt: 'Travel destination',
    aspectRatio: 'portrait',
  },
  {
    src: '/gallery/image7.jpg',
    alt: 'Casual social gathering',
    aspectRatio: 'square',
  },
  {
    src: '/gallery/image8.jpg',
    alt: 'Work environment',
    aspectRatio: 'landscape',
  },
]

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

const VARIANTS_IMAGE = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.section
      variants={VARIANTS_SECTION}
      transition={TRANSITION_SECTION}
      className="w-full"
    >
      <h3 className="mb-5 text-lg font-medium">Gallery / About Me</h3>
      
      {/* Responsive photo grid with organic collage layout */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {GALLERY_IMAGES.map((image, index) => {
          const aspectRatioClass = 
            image.aspectRatio === 'portrait' 
              ? 'row-span-2' 
              : image.aspectRatio === 'landscape'
              ? 'col-span-2'
              : ''

          return (
            <motion.div
              key={index}
              variants={VARIANTS_IMAGE}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl bg-zinc-900/50 ${aspectRatioClass}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={`View image: ${image.alt}`}
            >
              {/* Subtle white/gray border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset transition-all duration-300 group-hover:ring-white/20" />
              
              {/* Image container with hover effects */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-all duration-500 ease-out ${
                    hoveredIndex === index 
                      ? 'scale-110' 
                      : 'scale-100'
                  }`}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                
                {/* Shadow glow on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredIndex === index 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  }`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
