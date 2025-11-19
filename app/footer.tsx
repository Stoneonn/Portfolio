'use client'
import { TextLoop } from '@/components/ui/text-loop'

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
