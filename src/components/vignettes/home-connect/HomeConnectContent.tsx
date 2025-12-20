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
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import DesignNotesButton from '@/components/vignettes/shared/DesignNotesButton';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';

type PanelStage = 'problem' | 'transition' | 'solution';

interface HomeConnectContentProps {
  redlineNotes: DesignNote[];
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}

export default function HomeConnectContent({
  redlineNotes,
  redlineMode,
  mobileIndex,
  onMobileIndexChange,
}: HomeConnectContentProps) {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [panelStage, setPanelStage] = useState<PanelStage>('problem');
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

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

  const focusedAnchor = redlineMode.focusedAnnotation
    ? redlineNotes.find(n => n.id === redlineMode.focusedAnnotation)?.anchor ?? null
    : null;

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
      actions={
        stage === 'solution' && (
          <DesignNotesButton
            isActive={redlineMode.isActive}
            onToggle={redlineMode.toggleRedlineMode}
          />
        )
      }
    >
      <motion.div
        className="relative"
        style={{ overflow: 'visible' }}
        animate={redlineMode.isActive ? animations.panelTransform.active : animations.panelTransform.inactive}
        transition={animations.panelTransform.transition}
      >
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
                redlineModeActive={redlineMode.isActive}
                focusedAnchor={focusedAnchor}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop annotations */}
        <RedlineOverlay
          isActive={redlineMode.isActive && stage === 'solution'}
          notes={redlineNotes}
          focusedAnnotation={redlineMode.focusedAnnotation}
          onFocusAnnotation={redlineMode.setFocusedAnnotation}
        />

        {/* Mobile markers */}
        {redlineMode.isActive && stage === 'solution' && (
          <MobileRedlineMarkers
            notes={redlineNotes}
            currentIndex={mobileIndex}
            onMarkerClick={onMobileIndexChange}
          />
        )}
      </motion.div>
    </VignetteSplit>
  );
}
