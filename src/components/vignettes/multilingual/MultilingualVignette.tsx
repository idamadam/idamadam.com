'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationManagementPanel from './TranslationManagementPanel';
import ProblemPanel from './ProblemPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { multilingualContent } from './content';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'unified-cycle': 'language-dropdown',
  'ai-translate': 'auto-translate-btn',
  'source-reference': 'source-text',
};

function MultilingualContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollToSection } = useScrollToSection();

  const handleTransition = useCallback(() => {
    goToSolution();
  }, [goToSolution]);

  const currentStageContent = stage === 'problem'
    ? multilingualContent.stages.problem
    : multilingualContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

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
          {stage === 'problem' && (
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
          {stage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TranslationManagementPanel
                initialComplete
                highlightedSection={highlightedSection}
                onNoteOpenChange={handleNoteOpenChange}
                notes={multilingualContent.designNotes.notes}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
        {stage === 'solution' && (
          <DesignNotesOverlay
            notes={multilingualContent.designNotes.notes}
            onActiveNoteChange={handleActiveNoteChange}
          />
        )}
      </div>
    </VignetteSplit>
  );
}

export default function MultilingualVignette() {
  return (
    <VignetteContainer id="multilingual" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={multilingualContent.stages}>
            <MultilingualContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
