'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import HomeConnectContent from './HomeConnectContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteStaged from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { homeConnectContent } from './content';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';

// Map note IDs to the content sections they reference
const NOTE_TO_SECTION: Record<string, string> = {
  'card-system': 'all-cards',
  'inactive-goal': 'goal',
};

export default function HomeConnectVignette() {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const { scrollToSection } = useScrollToSection();

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
    <VignetteContainer id="home-connect" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={homeConnectContent.stages} vignetteId="home-connect">
            <HomeConnectContent
              notes={homeConnectContent.designNotes.notes}
              highlightedSection={highlightedSection}
              onNoteOpenChange={handleNoteOpenChange}
              onActiveNoteChange={handleActiveNoteChange}
            />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
