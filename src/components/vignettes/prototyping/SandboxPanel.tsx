'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
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
  const { entranceDelay, stagger } = useVignetteEntrance();

  // CTA appears after all questions have animated in
  const ctaDelay = entranceDelay + questions.length * stagger + 0.1;

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
                delay: entranceDelay + index * stagger,
                ease: 'easeOut' as const,
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
        className="btn-interactive btn-primary mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ctaDelay, duration: 0.3 }}
      >
        <span className="material-icons-outlined">auto_awesome</span>
        See how I enabled this
      </motion.button>
    </div>
  );
}

function LoadingState({ content }: { content: PrototypingContent }) {
  const { transitionSteps } = content;

  return (
    <div className="relative bg-[#09090B] rounded-lg min-h-[320px] p-6 pb-12 border border-[#1f1f23] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1f1f23]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-caption text-gray-500 font-mono ml-2">claude-code</span>
        </div>
        <span className="text-label text-gray-600 font-mono">~/design-sandbox</span>
      </div>

      {/* Transition steps */}
      <div className="space-y-3 font-mono">
        {transitionSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.3 }}
          >
            {step.type === 'command' ? (
              <div className="flex items-center gap-2 text-caption">
                <span className="text-[#D4A27F]">&gt;</span>
                <span className="text-gray-100">{step.command}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-4 text-caption">
                {step.isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="text-[#D4A27F]"
                  >
                    ⟳
                  </motion.span>
                ) : (
                  <span className="text-green-400">✓</span>
                )}
                <span className={step.isLoading ? 'text-gray-300' : 'text-gray-500'}>
                  {step.status}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-[#1f1f23] flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span>opus 4.5</span>
        <span>1.2k tokens • $0.02</span>
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
        className="absolute bottom-0 right-0 bg-[#09090B] rounded-lg w-[420px] shadow-2xl border border-[#1f1f23] overflow-hidden"
        style={{ transform: 'translate(0, 50%)' }}
      >
        {/* TUI Header */}
        <div className="bg-[#111113] px-4 py-2 rounded-t-lg border-b border-[#1f1f23] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-caption text-gray-500 font-mono ml-2">claude-code</span>
          </div>
          <span className="text-label text-gray-600 font-mono">~/.../sandbox</span>
        </div>

        {/* TUI Content */}
        <div className="p-4 pb-10 font-mono text-caption leading-relaxed">
          {/* Command prompt */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-[#D4A27F] select-none">&gt;</span>
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
                className="text-[#D4A27F]"
              >
                ⟳
              </motion.span>
              <span className="text-gray-300">Customizing components...</span>
            </div>
          </motion.div>
        </div>

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-[#1f1f23] rounded-b-lg flex items-center justify-between text-[11px] font-mono text-gray-500">
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
            <LoadingState content={content} />
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
