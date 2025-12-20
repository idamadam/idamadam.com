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
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import { DESIGN_NOTES_ACCENT } from '@/components/vignettes/shared/constants';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import '../shared/design-notes.css';

type PanelStage = 'problem' | 'transition' | 'solution';

function MultilingualContent({
  redlineNotes,
  redlineMode,
  mobileIndex,
  onMobileIndexChange,
}: {
  redlineNotes: DesignNote[];
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}) {
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

  const focusedAnchor = redlineMode.focusedAnnotation
    ? redlineNotes.find(n => n.id === redlineMode.focusedAnnotation)?.anchor ?? null
    : null;

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
                animate={{ opacity: 1 }}
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
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut", delay: reducedMotion ? 0 : 0.05 }}
            >
              {description}
            </motion.span>
          </AnimatePresence>
        </span>
      }
      actions={
        stage === 'solution' && (
          <button
            onClick={redlineMode.toggleRedlineMode}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            style={{
              backgroundColor: redlineMode.isActive ? `${DESIGN_NOTES_ACCENT}12` : 'white',
              borderColor: redlineMode.isActive ? `${DESIGN_NOTES_ACCENT}50` : undefined,
              color: redlineMode.isActive ? DESIGN_NOTES_ACCENT : undefined
            }}
          >
            <span className="material-icons-outlined text-[18px]" style={{ color: redlineMode.isActive ? DESIGN_NOTES_ACCENT : '#0f172a' }}>
              {redlineMode.isActive ? 'close' : 'edit'}
            </span>
            {redlineMode.isActive ? 'Hide design details' : 'Show design details'}
          </button>
        )
      }
    >
      <motion.div
        className="relative"
        style={{ overflow: 'visible' }}
        animate={redlineMode.isActive ? animations.panelTransform.active : animations.panelTransform.inactive}
        transition={animations.panelTransform.transition}
      >
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

export default function MultilingualVignette() {
  const {
    redlineMode,
    mobileIndex,
    setMobileIndex,
    handleExit,
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
              redlineMode={redlineMode}
              mobileIndex={mobileIndex}
              onMobileIndexChange={setMobileIndex}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour */}
      <MobileRedlineTour
        isActive={redlineMode.isActive}
        notes={redlineNotes}
        onExit={handleExit}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
