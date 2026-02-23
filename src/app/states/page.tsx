import type { Metadata } from 'next'
import { codeToHtml } from 'shiki'
import StateExplorerPage from '@/components/state-explorer/StateExplorerPage'
import { promptText } from '@/components/state-explorer/prompt'

export const metadata: Metadata = {
  title: 'States — Idam Adam',
  description:
    'A prompt that figures out which states your prototype has, then builds you a panel to flip between them. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
  openGraph: {
    title: 'States — Reach any prototype state in one click',
    description:
      'A prompt that figures out which states your prototype has, then builds you a panel to flip between them. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
    url: 'https://idamadam.com/states',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'States — Reach any prototype state in one click',
    description:
      'A prompt that figures out which states your prototype has, then builds you a panel to flip between them. Works with Claude Code, Cursor, Codex, Figma Make, or any other coding agent.',
  },
}

export default async function Page() {
  const rawHtml = await codeToHtml(promptText, {
    lang: 'markdown',
    theme: 'github-light',
  })

  // Strip Shiki's default background and inject word-wrap styles
  const highlightedPrompt = rawHtml
    .replace(/background-color:[^;"]+;?/, '')
    .replace(
      /(<pre[^>]*style=")/,
      '$1white-space:pre-wrap;word-break:break-word;overflow-wrap:break-word;padding:0;margin:0;'
    )

  return <StateExplorerPage highlightedPrompt={highlightedPrompt} />
}
