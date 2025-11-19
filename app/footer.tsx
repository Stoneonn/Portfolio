'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]



export function Footer() {
  return (
    <footer className="mb-[10px]">
      <div className="flex items-center justify-center">
        <a href="https://github.com/ibelick/nim" target="_blank">
          <TextLoop className="text-xs text-zinc-500">
            <span>Built with &lt;3</span>
          </TextLoop>
        </a>
      </div>
    </footer>
  )
}
