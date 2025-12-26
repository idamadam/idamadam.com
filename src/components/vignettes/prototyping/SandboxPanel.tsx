'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { PrototypingContent } from './content';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

interface SandboxPanelProps {
  className?: string;
  content: PrototypingContent;
  stage?: PanelStage;
  onTransition?: () => void;
}

function ProblemState({
  questions,
  onTransition
}: {
  questions: PrototypingContent['problemQuestions'];
  onTransition?: () => void;
}) {
  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[320px] flex flex-col items-center justify-center p-8">
      {/* Floating questions */}
      <div className="relative w-full h-36">
        {questions.map((q, index) => {
          // Position questions in a scattered pattern
          const positions = [
            { top: '10%', left: '5%', rotate: -5 },
            { top: '5%', right: '10%', rotate: 3 },
            { top: '45%', left: '15%', rotate: -2 },
            { top: '55%', right: '5%', rotate: 4 },
          ];
          const pos = positions[index % positions.length];

          return (
            <motion.div
              key={q.id}
              className="absolute bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-body-sm text-gray-600 font-medium"
              style={{
                ...pos,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
                delay: q.delay,
                ease: 'easeOut',
              }}
            >
              {q.text}
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onTransition}
        className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-body-sm font-semibold transition-colors"
        style={{ backgroundColor: 'var(--accent-interactive-bg)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0 0 rgba(154, 54, 178, 0)',
            '0 0 0 6px rgba(154, 54, 178, 0.12)',
            '0 0 0 0 rgba(154, 54, 178, 0)'
          ]
        }}
        transition={{
          opacity: { delay: 0.7, duration: 0.3 },
          y: { delay: 0.7, duration: 0.3 },
          boxShadow: { delay: 1.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-interactive-bg-hover)' }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="material-icons-outlined text-h3" style={{ color: 'var(--accent-interactive)' }}>auto_awesome</span>
        <span style={{ color: 'var(--accent-interactive)' }}>See how I enabled this</span>
      </motion.button>
    </div>
  );
}

const setupSteps = [
  { id: 1, command: 'npx create-next-app sandbox', label: 'Setting up React environment', delay: 0 },
  { id: 2, command: 'npm install @kaizen/components', label: 'Adding Culture Amp design system', delay: 1.2 },
  { id: 3, command: 'mkdir templates && touch remix.ts', label: 'Creating remix templates', delay: 2.4 },
  { id: 4, command: 'vercel deploy --prod', label: 'Configuring deployment', delay: 3.6 },
];

function LoadingState() {
  return (
    <div className="bg-[#1a1d23] rounded-lg min-h-[320px] p-6 border border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-caption text-gray-400 font-mono ml-2">Building sandbox infrastructure</span>
      </div>

      {/* Setup steps */}
      <div className="space-y-4">
        {setupSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.3 }}
            className="space-y-1"
          >
            {/* Command line */}
            <div className="flex items-center gap-2 font-mono text-caption">
              <span className="text-gray-500">$</span>
              <span className="text-gray-400">{step.command}</span>
            </div>
            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: step.delay + 0.15, duration: 0.2 }}
              className="flex items-center gap-2 pl-4"
            >
              {index < setupSteps.length - 1 ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.2, type: 'spring', stiffness: 500 }}
                  className="text-green-400 text-body-sm"
                >
                  ✓
                </motion.span>
              ) : (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="text-blue-400 text-body-sm"
                >
                  ⟳
                </motion.span>
              )}
              <span className={`text-caption ${index < setupSteps.length - 1 ? 'text-gray-500' : 'text-gray-300'}`}>
                {step.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SolutionState({ content }: { content: PrototypingContent }) {
  return (
    <div className="relative w-full">
      {/* Main Sandbox Container */}
      <div className="bg-white border border-black rounded-lg p-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h3 className="text-body-sm font-bold text-black">
              {content.sandboxTitle}
            </h3>
            <p className="text-caption text-gray-500 mt-0.5">
              {content.adoptionStats.designers} designers • {content.adoptionStats.prototypes}+ prototypes
            </p>
          </div>
          <div className="w-[50px] h-[50px] bg-[#d9d9d9] rounded-full" />
        </div>

        {/* Prototype Grid */}
        <div className="grid grid-cols-3 gap-lg">
          {content.prototypes.map((item) => (
            <div
              key={item.id}
              className="rounded-[7px] h-[78px]"
              style={{ backgroundColor: item.thumbnail }}
              aria-label={item.name}
            />
          ))}
        </div>
      </div>

      {/* Claude Code TUI Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
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
            <span className="text-caption text-gray-400 font-mono ml-2">claude-code</span>
          </div>
          <span className="text-label text-gray-500 font-mono">~/.../sandbox</span>
        </div>

        {/* TUI Content */}
        <div className="p-4 font-mono text-caption leading-relaxed">
          {/* Command prompt */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-blue-400 select-none">❯</span>
            <span className="text-gray-100">/remix Idam&apos;s prototype and make it my own</span>
          </div>

          {/* Command output */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
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

export default function SandboxPanel({
  className = '',
  content,
  stage = 'solution',
  onTransition
}: SandboxPanelProps) {
  const renderStage = () => {
    switch (stage) {
      case 'problem':
        return (
          <motion.div
            key="problem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProblemState
              questions={content.problemQuestions}
              onTransition={onTransition}
            />
          </motion.div>
        );
      case 'loading':
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SolutionState content={content} />
          </motion.div>
        );
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
}
