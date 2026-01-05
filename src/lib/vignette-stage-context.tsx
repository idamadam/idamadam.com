'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { trackVignetteInteracted, type VignetteId } from './analytics';

export type VignetteStage = 'problem' | 'solution' | 'designNotes';

interface VignetteStageContextValue {
  stage: VignetteStage;
  setStage: (stage: VignetteStage) => void;
  goToSolution: () => void;
  goToDesignNotes: () => void;
  reset: () => void;
  hasSeenSolution: boolean;
  vignetteId: VignetteId;
}

const VignetteStageContext = createContext<VignetteStageContextValue | null>(null);

interface VignetteStageProviderProps {
  children: ReactNode;
  initialStage?: VignetteStage;
  vignetteId: VignetteId;
}

export function VignetteStageProvider({
  children,
  initialStage = 'problem',
  vignetteId,
}: VignetteStageProviderProps) {
  const [stage, setStageInternal] = useState<VignetteStage>(initialStage);
  const [hasSeenSolution, setHasSeenSolution] = useState(initialStage === 'solution' || initialStage === 'designNotes');

  const setStage = useCallback(
    (newStage: VignetteStage) => {
      setStageInternal(newStage);
      if (newStage === 'solution' || newStage === 'designNotes') {
        setHasSeenSolution(true);
      }
    },
    []
  );

  const goToSolution = useCallback(() => {
    setStage('solution');
    trackVignetteInteracted(vignetteId, 'solution');
  }, [setStage, vignetteId]);

  const goToDesignNotes = useCallback(() => {
    if (hasSeenSolution) {
      setStage('designNotes');
      trackVignetteInteracted(vignetteId, 'designNotes');
    }
  }, [hasSeenSolution, setStage, vignetteId]);

  const reset = useCallback(() => {
    setStageInternal('problem');
    setHasSeenSolution(false);
  }, []);

  return (
    <VignetteStageContext.Provider
      value={{
        stage,
        setStage,
        goToSolution,
        goToDesignNotes,
        reset,
        hasSeenSolution,
        vignetteId,
      }}
    >
      {children}
    </VignetteStageContext.Provider>
  );
}

export function useVignetteStage() {
  const context = useContext(VignetteStageContext);
  if (!context) {
    throw new Error('useVignetteStage must be used within a VignetteStageProvider');
  }
  return context;
}
