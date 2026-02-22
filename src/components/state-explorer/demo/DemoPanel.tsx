'use client'

import { X } from 'lucide-react'
import DemoPresetGrid from './DemoPresetGrid'

interface DemoPanelProps {
  open: boolean
  onClose: () => void
}

export default function DemoPanel({ open, onClose }: DemoPanelProps) {
  return (
    <div
      className="absolute z-50 w-[260px] rounded-xl border shadow-xl overflow-hidden transition-all duration-200 origin-top-left"
      style={{
        top: '8px',
        left: '8px',
        backgroundColor: 'var(--demo-card)',
        borderColor: 'var(--demo-border)',
        opacity: open ? 1 : 0,
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-4px)',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 border-b"
        style={{ borderColor: 'var(--demo-border)' }}
      >
        <span
          className="text-demo-md font-semibold tracking-tight"
          style={{ color: 'var(--demo-text)' }}
        >
          States
        </span>
        <button
          onClick={onClose}
          className="p-0.5 rounded transition-colors cursor-pointer hover:bg-neutral-100"
          style={{ color: 'var(--demo-text-2)' }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Presets */}
      <div className="p-2.5">
        <DemoPresetGrid />
      </div>
    </div>
  )
}
