'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStageProvider, useVignetteStage, VignetteStage } from '@/lib/vignette-stage-context';
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

  // Show design notes CTA after solution is revealed (with delay for animation to complete)
  useEffect(() => {
    if (stage === 'solution' && hasSeenSolution) {
      const timer = setTimeout(() => {
        setShowDesignNotesCta(true);
      }, 800); // Delay after solution animation completes
      return () => clearTimeout(timer);
    } else if (stage !== 'solution') {
      setShowDesignNotesCta(false);
    }
  }, [stage, hasSeenSolution]);

  const currentStageContent = stages?.[stage];

  return (
    <motion.div
      layout
      className={`relative ${className}`}
      transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }}
    >
      <AnimatePresence mode="wait">
        {stage === 'designNotes' && designNotesPanel ? (
          <motion.div
            key="designNotes"
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Iterations header */}
            {currentStageContent?.title && (
              <div className="space-y-3">
                <h3 className="type-h2">
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
            <motion.button
              onClick={reset}
              className="flex items-center gap-2 type-body-sm hover:text-primary transition-colors"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="material-icons-outlined text-h3">replay</span>
              Watch again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
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
                    className="flex items-center gap-2 type-body-sm hover:text-primary transition-colors group"
                  >
                    <span className="material-icons-outlined text-h3">auto_awesome</span>
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
    </motion.div>
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
