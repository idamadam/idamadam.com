import type { Metadata } from 'next'
import StateExplorerPage from '@/components/state-explorer/StateExplorerPage'

export const metadata: Metadata = {
  title: 'States — Idam Adam',
  description:
    'A prompt that reads your React prototype and wires up a control panel. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
  openGraph: {
    title: 'States — Reach any prototype state in one click',
    description:
      'A prompt that reads your React prototype and wires up a control panel. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
    url: 'https://idamadam.com/states',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'States — Reach any prototype state in one click',
    description:
      'A prompt that reads your React prototype and wires up a control panel. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
  },
}

export default function Page() {
  return <StateExplorerPage />
}
