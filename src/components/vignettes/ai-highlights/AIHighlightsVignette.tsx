'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HighlightsPanel from './HighlightsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiHighlightsContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import './design-notes.css';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function AIHighlightsContent({
  redlineNotes,
  accent,
  redlineMode,
  mobileIndex,
  onMobileIndexChange,
}: {
  redlineNotes: DesignNote[];
  accent: string;
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}) {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [isLoading, setIsLoading] = useState(false);
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  // Determine the panel stage (includes loading state)
  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  // Handle the transition with loading state
  const handleTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToSolution();
    }, 1500);
  }, [goToSolution]);

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
          {/* Stage Indicator */}
          <div className="flex items-center gap-1.5 text-[13px] text-gray-400 select-none">
            <button
              onClick={() => setStage('problem')}
              className={`hover:text-gray-500 transition-colors ${stage === 'problem' ? 'text-gray-600' : ''}`}
            >
              Problem
            </button>
            <span className={`w-2 h-2 rounded-full ${stage === 'problem' ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <span className="w-6 h-px bg-gray-300" />
            <span className={`w-2 h-2 rounded-full ${stage === 'solution' ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <button
              onClick={() => setStage('solution')}
              className={`hover:text-gray-500 transition-colors ${stage === 'solution' ? 'text-gray-600' : ''}`}
            >
              Solution
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {title}
            </motion.span>
          </AnimatePresence>
        </div>
      }
      description={
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          >
            {description}
          </motion.span>
        </AnimatePresence>
      }
      actions={
        stage === 'solution' && (
          <button
            onClick={redlineMode.toggleRedlineMode}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            style={{
              backgroundColor: redlineMode.isActive ? `${accent}12` : 'white',
              borderColor: redlineMode.isActive ? `${accent}50` : undefined,
              color: redlineMode.isActive ? '#991b1b' : undefined
            }}
          >
            <span className="material-icons-outlined text-[18px]" style={{ color: redlineMode.isActive ? accent : '#0f172a' }}>
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
        <HighlightsPanel
          stage={panelStage}
          onTransition={handleTransition}
          problemCards={aiHighlightsContent.problemCards}
          redlineModeActive={redlineMode.isActive}
          focusedAnchor={focusedAnchor}
        />
        {/* Desktop annotations */}
        <RedlineOverlay
          isActive={redlineMode.isActive && stage === 'solution'}
          notes={redlineNotes}
          accent={accent}
          focusedAnnotation={redlineMode.focusedAnnotation}
          onFocusAnnotation={redlineMode.setFocusedAnnotation}
        />
        {/* Mobile markers */}
        {redlineMode.isActive && stage === 'solution' && (
          <MobileRedlineMarkers
            notes={redlineNotes}
            accent={accent}
            currentIndex={mobileIndex}
            onMarkerClick={onMobileIndexChange}
          />
        )}
      </motion.div>
    </VignetteSplit>
  );
}

export default function AIHighlightsVignette() {
  const designNotes = aiHighlightsContent.designNotes;
  const redlineMode = useRedlineMode();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleExit = () => {
    redlineMode.exitRedlineMode();
    setMobileIndex(0);
  };

  // Scroll the panel to show the anchor element
  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotes?.notes ?? [];
  const accent = designNotes?.accent ?? '#ef4444';

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
              accent={accent}
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
        accent={accent}
        onExit={handleExit}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
