'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStageProvider, useVignetteStage, VignetteStage } from '@/lib/vignette-stage-context';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';
import Button from '@/components/Button';
import type { StageContent } from './types';

interface VignetteStagedProps {
  children: ReactNode;
  stages?: {
    problem?: StageContent;
    solution?: StageContent;
    designNotes?: StageContent;
  };
  designNotesPanel?: ReactNode;
  className?: string;
}

function VignetteStagedInner({
  children,
  stages,
  designNotesPanel,
  className = ''
}: VignetteStagedProps) {
  const { stage, goToDesignNotes, hasSeenSolution, reset } = useVignetteStage();
  const [showDesignNotesCta, setShowDesignNotesCta] = useState(false);
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  // CTA delay: wait for text + panel transitions to complete
  const ctaDelayMs = (t.stage.textDuration + t.stage.panelDuration + 0.2) * 1000;

  // Show design notes CTA after solution is revealed (with delay for animation to complete)
  useEffect(() => {
    if (stage === 'solution' && hasSeenSolution) {
      const timer = setTimeout(() => {
        setShowDesignNotesCta(true);
      }, ctaDelayMs);
      return () => clearTimeout(timer);
    } else if (stage !== 'solution') {
      setShowDesignNotesCta(false);
    }
  }, [stage, hasSeenSolution, ctaDelayMs]);

  const currentStageContent = stages?.[stage];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {stage === 'designNotes' && designNotesPanel ? (
          <motion.div
            key="designNotes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: t.stage.panelDuration, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Iterations header */}
            {currentStageContent?.title && (
              <div className="space-y-3">
                <h3 className="type-h3">
                  {currentStageContent.title}
                </h3>
                {currentStageContent.description && (
                  <p className="type-body">
                    {currentStageContent.description}
                  </p>
                )}
              </div>
            )}

            {designNotesPanel}

            {/* Reset button */}
            <Button
              variant="secondary"
              onClick={reset}
              icon="replay"
            >
              Watch again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: t.stage.panelDuration, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {children}

            {/* Design notes CTA - appears after solution reveal */}
            <AnimatePresence>
              {showDesignNotesCta && stages?.solution?.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="mt-6"
                >
                  <button
                    onClick={goToDesignNotes}
                    className="btn-interactive btn-secondary group"
                  >
                    <span>{stages.solution.cta}</span>
                    <motion.span
                      className="material-icons-outlined text-body"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      arrow_forward
                    </motion.span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VignetteStaged(props: VignetteStagedProps) {
  return (
    <VignetteStageProvider initialStage="problem">
      <VignetteStagedInner {...props} />
    </VignetteStageProvider>
  );
}

// Export hook for child components to access stage
export { useVignetteStage } from '@/lib/vignette-stage-context';
export type { VignetteStage };
