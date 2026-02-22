'use client'

import { Github } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="type-fine py-6 text-center border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <span>A prompt for coding agents</span>
          <span className="text-neutral-300">&middot;</span>
          <a
            href="https://github.com/anthropics/state-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-neutral-600 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
        <p className="text-neutral-400">
          Works with Claude Code, Cursor, VS Code, and 20+ more.
        </p>
      </div>
    </footer>
  )
}
