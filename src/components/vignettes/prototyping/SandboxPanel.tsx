'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import Button from '@/components/Button';
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
  const ctaDelay = entranceDelay + questions.length * stagger + 0.1;

  return (
    <div className="relative bg-background-subtle border-2 border-dashed border-border rounded-lg min-h-[280px] lg:min-h-[320px] flex flex-col items-center justify-center p-4 lg:p-8">
      {/* Mobile: Stacked questions */}
      <div className="flex flex-col gap-2 w-full mb-4 lg:hidden">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            className="bg-background-elevated px-4 py-2 rounded-lg shadow-sm border border-border text-body-sm text-secondary font-medium"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: entranceDelay + index * stagger,
              ease: 'easeOut' as const,
            }}
          >
            {q.text}
          </motion.div>
        ))}
      </div>

      {/* Desktop: Scattered floating questions */}
      <div className="relative w-full h-36 hidden lg:block">
        {questions.map((q, index) => {
          const positions = [
            { top: '10%', left: '5%', rotate: -3 },
            { top: '5%', right: '10%', rotate: 2 },
            { top: '45%', left: '15%', rotate: -2 },
            { top: '55%', right: '5%', rotate: 3 },
          ];
          const pos = positions[index % positions.length];

          return (
            <motion.div
              key={q.id}
              className="absolute bg-background-elevated px-4 py-2 rounded-lg shadow-sm border border-border text-body-sm text-secondary font-medium"
              style={{
                ...pos,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
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
      <Button
        onClick={onTransition}
        enterDelay={ctaDelay}
        className="mt-4 lg:mt-6"
      >
        Make it easier
      </Button>
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
          <span className="text-caption text-muted-foreground font-mono ml-2">claude-code</span>
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
                <span className={step.isLoading ? 'text-gray-300' : 'text-muted-foreground'}>
                  {step.status}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-[#1f1f23] flex items-center justify-between text-[11px] font-mono text-muted-foreground">
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

        {/* Prototype Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-lg">
          {content.prototypes.map((item) => (
            <div
              key={item.id}
              className="rounded-[7px] h-[60px] sm:h-[78px]"
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
        className="absolute bottom-0 right-0 left-0 sm:left-auto bg-[#09090B] rounded-lg w-full sm:w-[340px] lg:w-[420px] shadow-2xl border border-[#1f1f23] overflow-hidden"
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
            <span className="text-caption text-muted-foreground font-mono ml-2">claude-code</span>
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
