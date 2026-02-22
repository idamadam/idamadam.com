'use client'

import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import DemoApp from './demo/DemoApp'
import AgentOverlay from './demo/AgentOverlay'
import { useDemoStore } from './demo/demoStore'
import { promptText } from './prompt'

export default function StateExplorerPage() {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const autoPlay = useDemoStore((s) => s.autoPlay)

  useEffect(() => {
    const timer = setTimeout(() => autoPlay(), 1000)
    return () => clearTimeout(timer)
  }, [autoPlay])

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(promptText)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[minmax(0,460px)_1fr] gap-10 lg:gap-14 items-start">
            {/* Left: copy + install */}
            <div className="lg:sticky lg:top-20 lg:pt-6">
              <h1 className="type-display">
                Reach any prototype state in one click.
              </h1>

              <p className="type-body mt-4 max-w-[420px]">
                A prompt that reads your React prototype and wires up a control panel. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.
              </p>

              <button
                onClick={handleCopyPrompt}
                className="mt-8 btn-primary inline-flex items-center gap-2.5 cursor-pointer"
              >
                <span>{copiedPrompt ? 'Copied!' : 'Copy prompt'}</span>
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <div className="mt-10">
                <h2 className="type-label">How it works</h2>
                <hr className="border-neutral-200 mt-4" />
                <ol className="mt-8 space-y-6">
                  <li className="type-body">
                    <span className="text-neutral-400 type-code mr-3">1.</span>
                    <span className="text-black font-medium">Paste the prompt.</span>{' '}
                    Your coding agent inspects your prototype and determines which states to surface.
                  </li>
                  <li className="type-body">
                    <span className="text-neutral-400 type-code mr-3">2.</span>
                    <span className="text-black font-medium">Review the plan.</span>{' '}
                    Refine the proposed control panel before any code is written.
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
              <div className="relative">
                <BrowserFrame url="localhost:5174">
                  <DemoApp />
                </BrowserFrame>
                <AgentOverlay />
              </div>
              <p className="type-fine mt-4 text-center">
                Click any preset to change the builder.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
