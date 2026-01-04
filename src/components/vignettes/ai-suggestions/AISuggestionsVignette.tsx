'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiSuggestionsContent } from './content';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useLoadingTransition } from '@/components/vignettes/shared/useLoadingTransition';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'editor-integration': 'improve-button',
  'people-science': 'recommendations-list',
  'loading-state': 'gradient-border',
};

function AISuggestionsContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const reducedMotion = useReducedMotion();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const { scrollToSection } = useScrollToSection();

  const { isLoading, startTransition } = useLoadingTransition({
    duration: 1500,
    onComplete: goToSolution,
  });

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const currentStageContent = stage === 'problem'
    ? aiSuggestionsContent.stages.problem
    : aiSuggestionsContent.stages.solution;

  const title = currentStageContent.title;

  // Get the section to highlight based on active note
  const highlightedSection = activeNoteId ? NOTE_TO_SECTION[activeNoteId] ?? null : null;

  const handleNoteOpenChange = (noteId: string, isOpen: boolean) => {
    setActiveNoteId(isOpen ? noteId : null);
  };

  const handleActiveNoteChange = useCallback((noteId: string | null) => {
    setActiveNoteId(noteId);
    if (noteId) {
      scrollToSection(NOTE_TO_SECTION[noteId]);
    }
  }, [scrollToSection]);

  return (
    <VignetteSplit
      compact
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
    >
      <div className="relative" style={{ overflow: 'visible' }}>
        <SuggestionsPanel
          content={aiSuggestionsContent}
          stage={panelStage}
          onTransition={startTransition}
          highlightedSection={highlightedSection}
          onNoteOpenChange={handleNoteOpenChange}
          notes={aiSuggestionsContent.designNotes.notes}
        />
      </div>
      {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
      {stage === 'solution' && (
        <DesignNotesOverlay
          notes={aiSuggestionsContent.designNotes.notes}
          onActiveNoteChange={handleActiveNoteChange}
        />
      )}
    </VignetteSplit>
  );
}

export default function AISuggestionsVignette() {
  return (
    <VignetteContainer id="ai-suggestions" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={aiSuggestionsContent.stages}>
            <AISuggestionsContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
