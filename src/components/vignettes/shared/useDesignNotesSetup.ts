'use client';

import { useState, useCallback } from 'react';
import { useRedlineMode } from './useRedlineMode';
import type { DesignNote } from '../types';

interface DesignNotesConfig {
  notes?: DesignNote[];
}

interface UseDesignNotesSetupReturn {
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  setMobileIndex: (index: number) => void;
  handleExit: () => void;
  handleScrollToAnchor: (anchor: string) => void;
  redlineNotes: DesignNote[];
}

export function useDesignNotesSetup(
  designNotes: DesignNotesConfig | undefined
): UseDesignNotesSetupReturn {
  const redlineMode = useRedlineMode();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleExit = useCallback(() => {
    redlineMode.exitRedlineMode();
    setMobileIndex(0);
  }, [redlineMode]);

  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotes?.notes ?? [];

  return {
    redlineMode,
    mobileIndex,
    setMobileIndex,
    handleExit,
    handleScrollToAnchor,
    redlineNotes,
  };
}
