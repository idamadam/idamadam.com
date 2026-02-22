import type { Metadata } from 'next'
import StateExplorerPage from '@/components/state-explorer/StateExplorerPage'

export const metadata: Metadata = {
  title: 'States — Idam Adam',
  description: 'A prompt that reads your React prototype and wires up a control panel.',
}

export default function Page() {
  return <StateExplorerPage />
}
