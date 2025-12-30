'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type IntroStage = 'name' | 'headline' | 'bio' | 'company' | 'complete';

interface IntroSequenceContextValue {
  stage: IntroStage;
  setStage: (stage: IntroStage) => void;
  isComplete: boolean;
  isSplashComplete: boolean;
  setSplashComplete: () => void;
}

const IntroSequenceContext = createContext<IntroSequenceContextValue | null>(null);

export function IntroSequenceProvider({ children }: { children: ReactNode }) {
  const [stage, setStageInternal] = useState<IntroStage>('name');
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const setStage = useCallback((newStage: IntroStage) => {
    setStageInternal(newStage);
  }, []);

  const setSplashComplete = useCallback(() => {
    setIsSplashComplete(true);
  }, []);

  return (
    <IntroSequenceContext.Provider
      value={{
        stage,
        setStage,
        isComplete: stage === 'complete',
        isSplashComplete,
        setSplashComplete,
      }}
    >
      {children}
    </IntroSequenceContext.Provider>
  );
}

export function useIntroSequence() {
  const context = useContext(IntroSequenceContext);
  if (!context) {
    throw new Error('useIntroSequence must be used within IntroSequenceProvider');
  }
  return context;
}
