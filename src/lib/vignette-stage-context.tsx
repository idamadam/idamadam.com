'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type VignetteStage = 'problem' | 'solution' | 'iterations';

interface VignetteStageContextValue {
  stage: VignetteStage;
  setStage: (stage: VignetteStage) => void;
  goToSolution: () => void;
  goToIterations: () => void;
  reset: () => void;
  hasSeenSolution: boolean;
}

const VignetteStageContext = createContext<VignetteStageContextValue | null>(null);

interface VignetteStageProviderProps {
  children: ReactNode;
  initialStage?: VignetteStage;
}

export function VignetteStageProvider({
  children,
  initialStage = 'problem'
}: VignetteStageProviderProps) {
  const [stage, setStageInternal] = useState<VignetteStage>(initialStage);
  const [hasSeenSolution, setHasSeenSolution] = useState(initialStage === 'solution' || initialStage === 'iterations');

  const setStage = useCallback((newStage: VignetteStage) => {
    setStageInternal(newStage);
    if (newStage === 'solution' || newStage === 'iterations') {
      setHasSeenSolution(true);
    }
  }, []);

  const goToSolution = useCallback(() => {
    setStage('solution');
  }, [setStage]);

  const goToIterations = useCallback(() => {
    if (hasSeenSolution) {
      setStage('iterations');
    }
  }, [hasSeenSolution, setStage]);

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
        goToIterations,
        reset,
        hasSeenSolution,
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
