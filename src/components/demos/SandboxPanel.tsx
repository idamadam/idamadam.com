'use client';

import { motion } from 'framer-motion';

interface SandboxPanelProps {
  className?: string;
}

export default function SandboxPanel({ className = '' }: SandboxPanelProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Sandbox Container */}
      <div className="bg-white border border-black rounded-lg p-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-[18px]">
          <h3 className="text-[16px] font-bold text-black font-[family-name:var(--font-inter)]">
            Culture Amp Design Sandbox
          </h3>
          <div className="w-[65px] h-[65px] bg-[#d9d9d9] rounded-full" />
        </div>

        {/* Prototype Grid */}
        <div className="grid grid-cols-3 gap-[18px]">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-[#d9d9d9] rounded-[7px] h-[78px]"
            />
          ))}
        </div>
      </div>

      {/* Claude Code TUI Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 right-0 bg-[#1a1d23] rounded-lg w-[420px] shadow-2xl border border-gray-700"
        style={{ transform: 'translate(0, 50%)' }}
      >
        {/* TUI Header */}
        <div className="bg-[#2a2d33] px-4 py-2 rounded-t-lg border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-[12px] text-gray-400 font-mono ml-2">claude-code</span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">~/.../sandbox</span>
        </div>

        {/* TUI Content */}
        <div className="p-4 font-mono text-[13px] leading-relaxed">
          {/* Command prompt */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-blue-400 select-none">❯</span>
            <span className="text-gray-100">/remix Idam&apos;s prototype and make it my own</span>
          </div>

          {/* Command output */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Found prototype in repository</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Creating your workspace...</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-blue-400"
              >
                ⟳
              </motion.span>
              <span className="text-gray-300">Customizing components...</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
