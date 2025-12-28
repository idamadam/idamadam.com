'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeConnectPanel from './HomeConnectPanel';
import TransitionPanel from './TransitionPanel';
import ProblemPanel from './ProblemPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { homeConnectContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import { useReducedMotion } from '@/lib/useReducedMotion';

type PanelStage = 'problem' | 'transition' | 'solution';

interface HomeConnectContentProps {
  notes: DesignNote[];
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  onActiveNoteChange?: (noteId: string | null) => void;
}

export default function HomeConnectContent({
  notes,
  highlightedSection = null,
  onNoteOpenChange,
  onActiveNoteChange,
}: HomeConnectContentProps) {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [panelStage, setPanelStage] = useState<PanelStage>('problem');
  const reducedMotion = useReducedMotion();

  const handleTransition = useCallback(() => {
    setPanelStage('transition');
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setPanelStage('solution');
    goToSolution();
  }, [goToSolution]);

  // Sync panelStage when stage indicator is clicked directly
  const prevStageRef = useRef(stage);
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      if (stage === 'problem') {
        setPanelStage('problem');
      } else if (stage === 'solution') {
        setPanelStage('solution');
      }
      prevStageRef.current = stage;
    }
  }, [stage]);

  const currentStageContent = stage === 'problem'
    ? homeConnectContent.stages.problem
    : homeConnectContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <StageIndicator stage={stage} onStageChange={setStage} />
          <AnimatedStageText
            stage={stage}
            text={title}
            reducedMotion={reducedMotion}
          />
        </div>
      }
      description={
        <AnimatedStageText
          stage={stage}
          text={description}
          reducedMotion={reducedMotion}
          delay={0.05}
        />
      }
    >
      <div className="relative" style={{ overflow: 'visible' }}>
        <AnimatePresence mode="sync">
          {panelStage === 'problem' && (
            <motion.div
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProblemPanel onTransition={handleTransition} />
            </motion.div>
          )}
          {panelStage === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TransitionPanel onComplete={handleTransitionComplete} />
            </motion.div>
          )}
          {panelStage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HomeConnectPanel
                highlightedSection={highlightedSection}
                onNoteOpenChange={onNoteOpenChange}
                notes={notes}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
        {stage === 'solution' && (
          <DesignNotesOverlay
            notes={notes}
            onActiveNoteChange={onActiveNoteChange}
          />
        )}
      </div>
    </VignetteSplit>
  );
}
