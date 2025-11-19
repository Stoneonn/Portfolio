'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-12 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center">
        <Link href="/" className="text-5xl md:text-8xl font-[family-name:var(--font-canela)] font-medium text-black dark:text-white mb-4">
          Ömer Taşkaya
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500 max-w-md"
          delay={0.5}
        >
          Hey, welcome. I'm Ömer, someone who aspire to be a lot of things, you'll see.
        </TextEffect>
      </div>
    </header>
  )
}
