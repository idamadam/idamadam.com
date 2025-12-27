'use client';

import { useState, useCallback } from 'react';
import { useDesignNotes } from './useRedlineMode';
import type { DesignNote } from '../types';

interface DesignNotesConfig {
  notes?: DesignNote[];
}

interface UseDesignNotesSetupReturn {
  designNotes: ReturnType<typeof useDesignNotes>;
  mobileIndex: number;
  mobileTourActive: boolean;
  openMobileTour: (index: number) => void;
  closeMobileTour: () => void;
  setMobileIndex: (index: number) => void;
  handleScrollToAnchor: (anchor: string) => void;
  redlineNotes: DesignNote[];
}

export function useDesignNotesSetup(
  designNotesConfig: DesignNotesConfig | undefined
): UseDesignNotesSetupReturn {
  const designNotes = useDesignNotes();
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileTourActive, setMobileTourActive] = useState(false);

  const openMobileTour = useCallback((index: number) => {
    setMobileIndex(index);
    setMobileTourActive(true);
  }, []);

  const closeMobileTour = useCallback(() => {
    setMobileTourActive(false);
    setMobileIndex(0);
  }, []);

  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotesConfig?.notes ?? [];

  return {
    designNotes,
    mobileIndex,
    mobileTourActive,
    openMobileTour,
    closeMobileTour,
    setMobileIndex,
    handleScrollToAnchor,
    redlineNotes,
  };
}
