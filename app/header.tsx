'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-12 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center">
        <Link
          href="/"
          className="mb-4 font-[family-name:var(--font-canela)] text-5xl font-medium text-black md:text-8xl dark:text-white"
        >
          Ömer Taşkaya
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="max-w-md text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Hey, welcome. I&apos;m Ömer, someone who aspire to be a lot of things,
          you&apos;ll see.
        </TextEffect>
      </div>
    </header>
  )
}
