'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SandboxPanel from './SandboxPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import { fadeInUp } from '@/lib/animations';
import { prototypingContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function PrototypingContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [isLoading, setIsLoading] = useState(false);
  const reducedMotion = useReducedMotion();

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const handleTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToSolution();
    }, 5000);
  }, [goToSolution]);

  const currentStageContent = stage === 'problem'
    ? prototypingContent.stages.problem
    : prototypingContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <StageIndicator stage={stage} onStageChange={setStage} />

          <span className="relative block">
            <AnimatePresence mode="sync" initial={false}>
              <motion.span
                key={stage}
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0.3 : 1 }}
                exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {title}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      }
      description={
        <span className="relative block">
          <AnimatePresence mode="sync" initial={false}>
            <motion.span
              key={stage}
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0.3 : 1 }}
              exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut", delay: reducedMotion ? 0 : 0.05 }}
            >
              {description}
            </motion.span>
          </AnimatePresence>
        </span>
      }
    >
      <SandboxPanel
        content={prototypingContent}
        stage={panelStage}
        onTransition={handleTransition}
      />
    </VignetteSplit>
  );
}

export default function PrototypingVignette() {
  return (
    <VignetteContainer id="prototyping">
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={prototypingContent.stages}>
            <PrototypingContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
