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
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

type PanelStage = 'loading' | 'solution' | 'designNotes';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'context-first': 'summary',
  'verification': 'highlight',
  'sources': 'sources-expand',
};

function AIHighlightsContent() {
  const { stage } = useVignetteStage();
  const reducedMotion = useReducedMotion();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const { scrollToSection } = useScrollToSection();

  const handleActiveNoteChange = useCallback((noteId: string | null) => {
    setActiveNoteId(noteId);
    if (noteId) {
      scrollToSection(NOTE_TO_SECTION[noteId]);
    }
  }, [scrollToSection]);

  const panelStage: PanelStage = stage as PanelStage;
  const title = aiHighlightsContent.stages.solution.title;
  const highlightedSection = activeNoteId ? NOTE_TO_SECTION[activeNoteId] ?? null : null;

  const handleNoteOpenChange = (noteId: string, isOpen: boolean) => {
    setActiveNoteId(isOpen ? noteId : null);
  };

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <AnimatedStageText
            stage={stage}
            text={title}
            reducedMotion={reducedMotion}
          />
        </div>
      }
    >
      <div className="relative w-full max-w-[672px] mx-auto" style={{ overflow: 'visible' }}>
        <HighlightsPanel
          stage={panelStage}
          highlightedSection={highlightedSection}
          onNoteOpenChange={handleNoteOpenChange}
          notes={aiHighlightsContent.designNotes.notes}
        />
      </div>
      {stage === 'solution' && (
        <DesignNotesOverlay
          notes={aiHighlightsContent.designNotes.notes}
          onActiveNoteChange={handleActiveNoteChange}
        />
      )}
    </VignetteSplit>
  );
}

export default function AIHighlightsVignette() {
  return (
    <VignetteContainer id="ai-highlights" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={aiHighlightsContent.stages} vignetteId="ai-highlights">
            <AIHighlightsContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
