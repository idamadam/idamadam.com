'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { MobileDesignNotesSheet } from './MobileDesignNotesSheet';

interface DesignNotesOverlayProps {
  notes: DesignNote[];
  onActiveNoteChange?: (noteId: string | null) => void;
}

export function DesignNotesOverlay({ notes, onActiveNoteChange }: DesignNotesOverlayProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const openMobileSheet = (index: number) => {
    setMobileIndex(index);
    setMobileSheetOpen(true);
    onActiveNoteChange?.(notes[index]?.id ?? null);
  };

  const closeMobileSheet = () => {
    setMobileSheetOpen(false);
    onActiveNoteChange?.(null);
  };

  const handleMobileIndexChange = (index: number) => {
    setMobileIndex(index);
    onActiveNoteChange?.(notes[index]?.id ?? null);
  };

  return (
    <>
      {/* Mobile: Button below panel to open notes sheet */}
      <motion.button
        className="lg:hidden mt-4 ml-auto z-20 flex items-center gap-2 px-4 py-2.5
                   bg-[var(--accent-500)] text-white text-sm font-medium rounded-full shadow-lg
                   hover:bg-[var(--accent-600)] transition-colors"
        onClick={() => openMobileSheet(0)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <span className="w-5 h-5 rounded-full bg-white text-[var(--accent-500)] text-xs font-semibold flex items-center justify-center">
          {notes.length}
        </span>
        Design notes
      </motion.button>

      {/* Mobile bottom sheet */}
      <MobileDesignNotesSheet
        isOpen={mobileSheetOpen}
        onClose={closeMobileSheet}
        notes={notes}
        currentIndex={mobileIndex}
        onIndexChange={handleMobileIndexChange}
      />
    </>
  );
}
