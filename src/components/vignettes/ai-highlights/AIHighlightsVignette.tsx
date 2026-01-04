'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import HighlightsPanel from './HighlightsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiHighlightsContent } from './content';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useLoadingTransition } from '@/components/vignettes/shared/useLoadingTransition';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'context-first': 'summary',
  'verification': 'highlight',
  'sources': 'sources-expand',
};

function AIHighlightsContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const reducedMotion = useReducedMotion();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const { scrollToSection } = useScrollToSection();

  const handleActiveNoteChange = useCallback((noteId: string | null) => {
    setActiveNoteId(noteId);
    if (noteId) {
      scrollToSection(NOTE_TO_SECTION[noteId]);
    }
  }, [scrollToSection]);

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

  // Get the section to highlight based on active note
  const highlightedSection = activeNoteId ? NOTE_TO_SECTION[activeNoteId] ?? null : null;

  const handleNoteOpenChange = (noteId: string, isOpen: boolean) => {
    setActiveNoteId(isOpen ? noteId : null);
  };

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
        <HighlightsPanel
          stage={panelStage}
          onTransition={startTransition}
          problemCards={aiHighlightsContent.problemCards}
          highlightedSection={highlightedSection}
          onNoteOpenChange={handleNoteOpenChange}
          notes={aiHighlightsContent.designNotes.notes}
        />
        {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
        {stage === 'solution' && (
          <DesignNotesOverlay
            notes={aiHighlightsContent.designNotes.notes}
            onActiveNoteChange={handleActiveNoteChange}
          />
        )}
      </div>
    </VignetteSplit>
  );
}

export default function AIHighlightsVignette() {
  return (
    <VignetteContainer id="ai-highlights" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={aiHighlightsContent.stages}>
            <AIHighlightsContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
