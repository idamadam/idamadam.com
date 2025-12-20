'use client';

import { motion } from 'framer-motion';
import HighlightsPanel from './HighlightsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiHighlightsContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useDesignNotesSetup } from '@/components/vignettes/shared/useDesignNotesSetup';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import DesignNotesButton from '@/components/vignettes/shared/DesignNotesButton';
import { useLoadingTransition } from '@/components/vignettes/shared/useLoadingTransition';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import '../shared/design-notes.css';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function AIHighlightsContent({
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
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  const { isLoading, startTransition } = useLoadingTransition({
    duration: 1500,
    onComplete: goToSolution,
  });

  // Determine the panel stage (includes loading state)
  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  // Get stage-specific content based on actual stage (not loading state)
  const currentStageContent = stage === 'problem'
    ? aiHighlightsContent.stages.problem
    : aiHighlightsContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  // Map focusedAnnotation to anchor name for HighlightsPanel
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
            isLoading={isLoading}
            reducedMotion={reducedMotion}
          />
        </div>
      }
      description={
        <AnimatedStageText
          stage={stage}
          text={description}
          isLoading={isLoading}
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
        <HighlightsPanel
          stage={panelStage}
          onTransition={startTransition}
          problemCards={aiHighlightsContent.problemCards}
          redlineModeActive={redlineMode.isActive}
          focusedAnchor={focusedAnchor}
        />
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

export default function AIHighlightsVignette() {
  const {
    redlineMode,
    mobileIndex,
    setMobileIndex,
    handleExit,
    handleScrollToAnchor,
    redlineNotes,
  } = useDesignNotesSetup(aiHighlightsContent.designNotes);

  return (
    <VignetteContainer id="ai-highlights" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged
            stages={aiHighlightsContent.stages}
          >
            <AIHighlightsContent
              redlineNotes={redlineNotes}
              redlineMode={redlineMode}
              mobileIndex={mobileIndex}
              onMobileIndexChange={setMobileIndex}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour - rendered at root level for fixed positioning */}
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
