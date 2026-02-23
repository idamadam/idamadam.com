'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Copy } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import DemoApp from './demo/DemoApp'
import AgentOverlay from './demo/AgentOverlay'
import { useDemoStore } from './demo/demoStore'
import { promptText } from './prompt'

export default function StateExplorerPage() {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
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
      <section className="relative min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[minmax(0,460px)_1fr] gap-10 lg:gap-14 items-start">
            {/* Left: copy + install */}
            <div className="lg:sticky lg:top-20 lg:pt-6">
              <h1 className="type-display">
                Reach any prototype state in one click
              </h1>

              <p className="type-body mt-4 max-w-[420px]">
                A prompt that figures out which states your prototype has, then builds you a panel to flip between them. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.
              </p>

              <button
                onClick={handleCopyPrompt}
                className="mt-8 btn-primary inline-flex items-center gap-2.5 cursor-pointer"
              >
                <span>{copiedPrompt ? 'Copied!' : 'Copy prompt'}</span>
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
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

              <div className="mt-10">
                <h2 className="type-label">How it works</h2>
                <hr className="border-neutral-200 mt-4" />
                <ol className="mt-8 space-y-6">
                  <li className="type-body">
                    <span className="text-neutral-400 type-code mr-3">1.</span>
                    <span className="text-black font-medium">Paste the prompt.</span>{' '}
                    Your AI tool reads your prototype and proposes a set of states to control.
                  </li>
                  <li className="type-body">
                    <span className="text-neutral-400 type-code mr-3">2.</span>
                    <span className="text-black font-medium">Approve the plan.</span>{' '}
                    You see exactly what it'll build before it touches any code.
                  </li>
                  <li className="type-body">
                    <span className="text-neutral-400 type-code mr-3">3.</span>
                    <span className="text-black font-medium">Use the control panel.</span>{' '}
                    A panel appears inside your prototype matched to your app&apos;s style, colors, and layout. Click a preset, see the state.
                  </li>
                </ol>
              </div>
            </div>

            {/* Right: interactive demo */}
            <div className="demo-theme lg:pt-6">
              <div className="relative overflow-hidden rounded-2xl">
                <BrowserFrame url="localhost:5174">
                  <DemoApp />
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
    </div>
  )
}
