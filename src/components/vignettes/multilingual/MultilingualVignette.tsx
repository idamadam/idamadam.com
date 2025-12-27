'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationManagementPanel from './TranslationManagementPanel';
import TransitionPanel from './TransitionPanel';
import ProblemPanel from './ProblemPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { multilingualContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useDesignNotesSetup } from '@/components/vignettes/shared/useDesignNotesSetup';
import { useDesignNotes } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useReducedMotion } from '@/lib/useReducedMotion';
import '../shared/design-notes.css';

type PanelStage = 'problem' | 'transition' | 'solution';

function MultilingualContent({
  redlineNotes,
  designNotes,
  mobileIndex,
  onMobileIndexChange,
}: {
  redlineNotes: DesignNote[];
  designNotes: ReturnType<typeof useDesignNotes>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}) {
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
  // We use a ref to track the previous stage to detect when it changes via the indicator
  const prevStageRef = useRef(stage);
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      // Stage changed via indicator click, sync panelStage
      if (stage === 'problem') {
        setPanelStage('problem');
      } else if (stage === 'solution') {
        setPanelStage('solution');
      }
      prevStageRef.current = stage;
    }
  }, [stage]);

  const currentStageContent = stage === 'problem'
    ? multilingualContent.stages.problem
    : multilingualContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  const focusedAnchor = designNotes.focusedAnnotation
    ? redlineNotes.find(n => n.id === designNotes.focusedAnnotation)?.anchor ?? null
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
    >
      <div className="relative" style={{ overflow: 'visible' }}>
        <AnimatePresence mode="wait">
          {panelStage === 'problem' && (
            <motion.div
              key="problem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProblemPanel onTransition={handleTransition} />
            </motion.div>
          )}
          {panelStage === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TransitionPanel onComplete={handleTransitionComplete} />
            </motion.div>
          )}
          {panelStage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TranslationManagementPanel
                initialComplete
                focusedAnchor={focusedAnchor}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop annotations - dots always visible in solution stage */}
        {stage === 'solution' && (
          <RedlineOverlay
            notes={redlineNotes}
            expandedAnnotations={designNotes.expandedAnnotations}
            focusedAnnotation={designNotes.focusedAnnotation}
            onToggleAnnotation={designNotes.toggleAnnotation}
            onFocusAnnotation={designNotes.setFocusedAnnotation}
          />
        )}

        {/* Mobile markers - dots always visible in solution stage */}
        {stage === 'solution' && (
          <MobileRedlineMarkers
            notes={redlineNotes}
            currentIndex={mobileIndex}
            onMarkerClick={onMobileIndexChange}
          />
        )}
      </div>
    </VignetteSplit>
  );
}

export default function MultilingualVignette() {
  const {
    designNotes,
    mobileIndex,
    mobileTourActive,
    openMobileTour,
    closeMobileTour,
    setMobileIndex,
    handleScrollToAnchor,
    redlineNotes,
  } = useDesignNotesSetup(multilingualContent.designNotes);

  return (
    <VignetteContainer id="multilingual" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={multilingualContent.stages}>
            <MultilingualContent
              redlineNotes={redlineNotes}
              designNotes={designNotes}
              mobileIndex={mobileIndex}
              onMobileIndexChange={openMobileTour}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour */}
      <MobileRedlineTour
        isActive={mobileTourActive}
        notes={redlineNotes}
        onExit={closeMobileTour}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
