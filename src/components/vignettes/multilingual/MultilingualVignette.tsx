'use client';

import { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationManagementPanel from './TranslationManagementPanel';
import ProblemPanel from './ProblemPanel';
import TransitionPanel from './TransitionPanel';
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
import Button from '@/components/Button';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'unified-cycle': 'language-dropdown',
  'ai-translate': 'auto-translate-btn',
  'source-reference': 'source-text',
  'xlsx-import': 'xlsx-import-btn',
};

type PanelStage = 'problem' | 'transition' | 'solution';

function MultilingualContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [panelStage, setPanelStage] = useState<PanelStage>('problem');
  const reducedMotion = useReducedMotion();
  const { scrollToSection } = useScrollToSection();

  const handleTransition = useCallback(() => {
    setPanelStage('transition');
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setPanelStage('solution');
    goToSolution();
  }, [goToSolution]);

  // Sync panelStage when stage changes (e.g., user clicks stage indicator to go back)
  useEffect(() => {
    if (stage === 'problem') {
      setPanelStage('problem');
    }
  }, [stage]);

  const currentStageContent = stage === 'problem'
    ? multilingualContent.stages.problem
    : multilingualContent.stages.solution;

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
      actions={
        stage === 'problem' && panelStage === 'problem' && currentStageContent.cta ? (
          <Button onClick={handleTransition} enterDelay={0.3}>
            {currentStageContent.cta}
          </Button>
        ) : null
      }
    >
      <div className="relative w-full max-w-[672px] mx-auto min-h-[420px] flex flex-col justify-center" style={{ overflow: 'visible' }}>
        <AnimatePresence mode="wait">
          {panelStage === 'problem' && (
            <motion.div
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <ProblemPanel />
            </motion.div>
          )}
          {panelStage === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <TransitionPanel onComplete={handleTransitionComplete} />
            </motion.div>
          )}
          {panelStage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
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

      </div>
      {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
      {panelStage === 'solution' && (
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
