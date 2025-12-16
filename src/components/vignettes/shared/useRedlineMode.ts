'use client';

import { useState, useCallback } from 'react';

interface RedlineState {
  isActive: boolean;
  focusedAnnotation: string | null;
}

export function useRedlineMode() {
  const [state, setState] = useState<RedlineState>({
    isActive: false,
    focusedAnnotation: null,
  });

  const enterRedlineMode = useCallback(() => {
    setState(prev => ({ ...prev, isActive: true }));
  }, []);

  const exitRedlineMode = useCallback(() => {
    setState({ isActive: false, focusedAnnotation: null });
  }, []);

  const toggleRedlineMode = useCallback(() => {
    setState(prev => ({
      isActive: !prev.isActive,
      focusedAnnotation: null,
    }));
  }, []);

  const setFocusedAnnotation = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, focusedAnnotation: id }));
  }, []);

  return {
    ...state,
    enterRedlineMode,
    exitRedlineMode,
    toggleRedlineMode,
    setFocusedAnnotation,
  };
}
