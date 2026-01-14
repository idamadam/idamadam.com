'use client';

import { motion } from 'framer-motion';
import type { PrototypingContent } from './content';

interface SandboxPanelProps {
  className?: string;
  content: PrototypingContent;
}

function SolutionState({ content }: { content: PrototypingContent }) {
  return (
    <div className="w-full space-y-4">
      {/* Main Sandbox Container */}
      <div className="bg-background-elevated border border-border rounded-lg p-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h3 className="text-body-sm font-bold text-primary">
              {content.sandboxTitle}
            </h3>
            <p className="text-caption text-muted-foreground mt-0.5">
              {content.adoptionStats.designers} designers • {content.adoptionStats.prototypes}+ prototypes
            </p>
          </div>
          <div className="w-[50px] h-[50px] bg-[#d9d9d9] rounded-full" />
        </div>

        {/* Designer Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-lg">
          {content.designers.map((designer) => (
            <div
              key={designer.id}
              className="flex items-center gap-2 bg-background-subtle rounded-lg p-2 sm:p-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#d9d9d9] rounded-full flex-shrink-0" />
              <span className="text-caption sm:text-body-sm text-primary font-medium truncate">
                {designer.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Claude Code TUI */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        className="relative bg-[#09090B] rounded-lg w-full shadow-2xl border border-[#1f1f23] overflow-hidden"
      >
        {/* TUI Header */}
        <div className="bg-[#111113] px-4 py-2 rounded-t-lg border-b border-[#1f1f23] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-caption text-muted-foreground font-mono ml-2">claude-code</span>
          </div>
          <span className="text-label text-gray-600 font-mono">~/.../sandbox</span>
        </div>

        {/* TUI Content */}
        <div className="p-4 pb-10 font-mono text-caption leading-relaxed">
          {/* Command: /add-prototype with remix */}
          <div className="flex items-start gap-2 mb-2">
            <span className="text-[#D4A27F] select-none">&gt;</span>
            <span className="text-gray-100">/add-prototype --from @idam/feedback-helper</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-1 text-gray-400 pl-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Forked from Idam&apos;s prototype</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Copied components &amp; styles</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-[#D4A27F]"
              >
                ⟳
              </motion.span>
              <span className="text-gray-300">Opening your remix...</span>
            </div>
          </motion.div>
        </div>

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-[#1f1f23] rounded-b-lg flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>opus 4.5</span>
          <span>2.4k tokens • $0.04</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function SandboxPanel({
  className = '',
  content,
}: SandboxPanelProps) {
  return (
    <div className={className}>
      <SolutionState content={content} />
    </div>
  );
}
