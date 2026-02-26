'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Copy } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import DemoApp from './demo/DemoApp'
import AgentOverlay from './demo/AgentOverlay'
import { useDemoStore } from './demo/demoStore'
import { promptText } from './prompt'

const installCommand = 'npx skills add idamadam/skills --skill states'

export default function StateExplorerPage({
  highlightedPrompt,
  highlightedCode,
  highlightedInstallCommand,
}: {
  highlightedPrompt: string
  highlightedCode: string
  highlightedInstallCommand: string
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedInstallCommand, setCopiedInstallCommand] = useState(false)
  const [hasEverCopied, setHasEverCopied] = useState(false)
  const autoPlay = useDemoStore((s) => s.autoPlay)

  useEffect(() => {
    const timer = setTimeout(() => autoPlay(), 1000)
    return () => clearTimeout(timer)
  }, [autoPlay])

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(promptText)
    setCopiedPrompt(true)
    setHasEverCopied(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyInstallCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopiedInstallCommand(true)
    setTimeout(() => setCopiedInstallCommand(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[1rem] font-semibold text-primary tracking-[-0.01em] hover:opacity-70 transition-opacity">
            Idam Adam
          </Link>
          <a
            href="https://www.linkedin.com/in/idamadam/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-secondary hover:text-[#0A66C2] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-[18px] w-[18px]"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
        </div>
      </header>
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[minmax(0,460px)_1fr] gap-10 lg:gap-14 items-start">
            {/* Left: copy + install */}
            <div className="lg:sticky lg:top-20 lg:pt-6">
              <h1 className="type-display">
                Reach any prototype state in one click
              </h1>

              <p className="type-body mt-4 max-w-[420px]">
                A prompt that figures out which states your prototype has, then builds you a panel to flip between them. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.
              </p>

              <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 relative">
                <button
                  onClick={handleCopyPrompt}
                  className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy prompt'}</span>
                </button>
                <div
                  className="max-h-[200px] overflow-y-auto overflow-x-hidden px-4 py-3 text-[13px] leading-relaxed"
                  style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                  dangerouslySetInnerHTML={{ __html: highlightedPrompt }}
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 rounded-b-xl bg-gradient-to-t from-neutral-50 to-transparent" />
              </div>
              <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-950 relative">
                <button
                  onClick={handleCopyInstallCommand}
                  aria-label={copiedInstallCommand ? 'Command copied' : 'Copy install command'}
                  title={copiedInstallCommand ? 'Copied' : 'Copy command'}
                  className="absolute top-2.5 right-2.5 z-10 inline-flex items-center justify-center p-1.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {copiedInstallCommand ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <p className="px-4 pt-3 pb-1 text-xs text-neutral-300">
                  Also available as a skill
                </p>
                <div
                  className="px-4 pb-3 text-[13px] leading-relaxed overflow-x-auto text-neutral-100"
                  dangerouslySetInnerHTML={{ __html: highlightedInstallCommand }}
                />
              </div>
              <p
                className={`pt-4 text-sm transition-all duration-500 delay-400 ${
                  hasEverCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
              >
                Did it work?{' '}
                <a
                  href="https://www.linkedin.com/in/idamadam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0A66C2' }}
                  className="underline hover:opacity-70 transition-opacity"
                >
                  DM me on LinkedIn
                </a>
              </p>

            </div>

            {/* Right: interactive demo */}
            <div className="demo-theme lg:pt-6">
              <div className="relative overflow-hidden rounded-2xl">
                <BrowserFrame url="localhost:5174">
                  <DemoApp highlightedCode={highlightedCode} />
                </BrowserFrame>
                <AgentOverlay />
              </div>
              <p className="type-fine pt-4 text-center">
                Click any preset to change the prototype.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-border/50 py-6">
        <p className="text-center text-sm text-secondary">
          Made in Melbourne, Australia by{' '}
          <Link href="/" className="underline hover:opacity-70 transition-opacity">
            Idam Adam
          </Link>
        </p>
      </footer>
    </div>
  )
}
