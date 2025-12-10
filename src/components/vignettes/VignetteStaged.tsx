'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStageProvider, useVignetteStage, VignetteStage } from '@/lib/vignette-stage-context';

interface StageContent {
  title?: string;
  description?: string;
  cta?: string;
}

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
                <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
                  {currentStageContent.title}
                </h3>
                {currentStageContent.description && (
                  <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
                    {currentStageContent.description}
                  </p>
                )}
              </div>
            )}

            {designNotesPanel}

            {/* Reset button */}
            <motion.button
              onClick={reset}
              className="flex items-center gap-2 text-[16px] text-[#4b5563] hover:text-[#0f172a] transition-colors font-[family-name:var(--font-ibm-plex-sans)]"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="material-icons-outlined text-[20px]">replay</span>
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
                    className="flex items-center gap-2 text-[16px] text-[#4b5563] hover:text-[#0f172a] transition-colors font-[family-name:var(--font-ibm-plex-sans)] group"
                  >
                    <span className="material-icons-outlined text-[20px]">auto_awesome</span>
                    <span>{stages.solution.cta}</span>
                    <motion.span
                      className="material-icons-outlined text-[18px]"
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
