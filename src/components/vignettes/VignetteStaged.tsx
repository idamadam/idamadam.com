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
    iterations?: StageContent;
  };
  iterationsPanel?: ReactNode;
  className?: string;
}

function VignetteStagedInner({
  children,
  stages,
  iterationsPanel,
  className = ''
}: VignetteStagedProps) {
  const { stage, goToIterations, hasSeenSolution, reset } = useVignetteStage();
  const [showIterationsCta, setShowIterationsCta] = useState(false);

  // Show iterations CTA after solution is revealed (with delay for animation to complete)
  useEffect(() => {
    if (stage === 'solution' && hasSeenSolution) {
      const timer = setTimeout(() => {
        setShowIterationsCta(true);
      }, 800); // Delay after solution animation completes
      return () => clearTimeout(timer);
    } else if (stage !== 'solution') {
      setShowIterationsCta(false);
    }
  }, [stage, hasSeenSolution]);

  const currentStageContent = stages?.[stage];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {stage === 'iterations' && iterationsPanel ? (
          <motion.div
            key="iterations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Iterations header */}
            {currentStageContent?.title && (
              <div className="mb-8">
                <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)] mb-3">
                  {currentStageContent.title}
                </h3>
                {currentStageContent.description && (
                  <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
                    {currentStageContent.description}
                  </p>
                )}
              </div>
            )}

            {iterationsPanel}

            {/* Reset button */}
            <motion.button
              onClick={reset}
              className="mt-8 flex items-center gap-2 text-[16px] text-[#4b5563] hover:text-[#0f172a] transition-colors font-[family-name:var(--font-ibm-plex-sans)]"
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
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}

            {/* How I got here CTA - appears after solution reveal */}
            <AnimatePresence>
              {showIterationsCta && stages?.solution?.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="mt-6"
                >
                  <button
                    onClick={goToIterations}
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
