'use client'

import { useEffect, useState } from 'react'
import { useDemoStore } from './demoStore'

const lines = [
  { text: 'Exploring 6 components...', delay: 0 },
  { text: 'Found 4 state dimensions', delay: 1000 },
  { text: 'Wiring presets and controls...', delay: 2000 },
  { text: '\u2713 Done', delay: 3000, green: true },
]

export default function AgentOverlay() {
  const agentPhase = useDemoStore((s) => s.agentPhase)
  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (agentPhase !== 'running') {
      setVisibleCount(0)
      setFading(false)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    lines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), line.delay))
    })

    timers.push(setTimeout(() => setFading(true), 3600))

    return () => timers.forEach(clearTimeout)
  }, [agentPhase])

  if (agentPhase !== 'running') return null

  return (
    <div
      className="absolute z-30 bottom-6 right-6 transition-opacity duration-700 shadow-2xl rounded-lg"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="bg-neutral-900 rounded-lg border border-neutral-700/60 px-5 py-4 w-[260px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-600" />
            <div className="w-2 h-2 rounded-full bg-neutral-600" />
            <div className="w-2 h-2 rounded-full bg-neutral-600" />
          </div>
          <span className="text-demo-sm text-neutral-500 font-mono">states</span>
        </div>

        <div className="font-mono text-demo-md leading-[1.7] space-y-0.5">
          {lines.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={line.green ? 'text-neutral-200 font-semibold' : 'text-neutral-300'}
              style={{ animation: 'fadeSlideIn 0.25s ease-out' }}
            >
              {line.text}
            </div>
          ))}
          {visibleCount > 0 && visibleCount < lines.length && (
            <span className="inline-block w-[6px] h-[13px] bg-neutral-400 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  )
}
