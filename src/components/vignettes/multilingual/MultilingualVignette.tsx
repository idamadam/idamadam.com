'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import TranslationManagementPanel from './TranslationManagementPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { multilingualContent } from './content';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'unified-cycle': 'language-dropdown',
  'ai-translate': 'auto-translate-btn',
  'source-reference': 'source-text',
  'xlsx-import': 'xlsx-import-btn',
};

function MultilingualContent() {
  const { stage } = useVignetteStage();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollToSection } = useScrollToSection();

  const title = multilingualContent.stages.solution.title;

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
      <div className="relative w-full max-w-[672px] mx-auto min-h-[420px] flex flex-col justify-center" style={{ overflow: 'visible' }}>
        <TranslationManagementPanel
          initialComplete
          highlightedSection={highlightedSection}
          onNoteOpenChange={handleNoteOpenChange}
          notes={multilingualContent.designNotes.notes}
        />
      </div>
      {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
      {stage === 'solution' && (
        <DesignNotesOverlay
          notes={multilingualContent.designNotes.notes}
          onActiveNoteChange={handleActiveNoteChange}
        />
      )}
    </VignetteSplit>
  );
}

export default function MultilingualVignette() {
  return (
    <VignetteContainer id="multilingual" allowOverflow>
      <motion.div {...fadeInUp}>
        <VignetteStaged stages={multilingualContent.stages} vignetteId="multilingual">
          <MultilingualContent />
        </VignetteStaged>
      </motion.div>
    </VignetteContainer>
  );
}
