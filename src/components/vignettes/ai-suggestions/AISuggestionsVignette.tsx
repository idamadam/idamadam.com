'use client';

import { motion } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiSuggestionsContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useDesignNotesSetup } from '@/components/vignettes/shared/useDesignNotesSetup';
import { useDesignNotes } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useLoadingTransition } from '@/components/vignettes/shared/useLoadingTransition';
import { useReducedMotion } from '@/lib/useReducedMotion';
import '../shared/design-notes.css';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function AISuggestionsContent({
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
  const reducedMotion = useReducedMotion();

  const { isLoading, startTransition } = useLoadingTransition({
    duration: 1500,
    onComplete: goToSolution,
  });

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const currentStageContent = stage === 'problem'
    ? aiSuggestionsContent.stages.problem
    : aiSuggestionsContent.stages.solution;

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
    >
      <div className="relative" style={{ overflow: 'visible' }}>
        <SuggestionsPanel
          content={aiSuggestionsContent}
          stage={panelStage}
          onTransition={startTransition}
          focusedAnchor={focusedAnchor}
        />
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

export default function AISuggestionsVignette() {
  const {
    designNotes,
    mobileIndex,
    mobileTourActive,
    openMobileTour,
    closeMobileTour,
    setMobileIndex,
    handleScrollToAnchor,
    redlineNotes,
  } = useDesignNotesSetup(aiSuggestionsContent.designNotes);

  return (
    <VignetteContainer id="ai-suggestions" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged
            stages={aiSuggestionsContent.stages}
          >
            <AISuggestionsContent
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
