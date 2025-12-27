'use client';

import { useState, useCallback } from 'react';

interface DesignNotesState {
  expandedAnnotations: Set<string>;
  focusedAnnotation: string | null;
}

export function useDesignNotes() {
  const [state, setState] = useState<DesignNotesState>({
    expandedAnnotations: new Set(),
    focusedAnnotation: null,
  });

  const toggleAnnotation = useCallback((id: string) => {
    setState(prev => {
      const isCurrentlyExpanded = prev.expandedAnnotations.has(id);
      // If clicking the same one, close it. Otherwise, open only this one.
      const newExpanded = new Set<string>();
      if (!isCurrentlyExpanded) {
        newExpanded.add(id);
      }
      return { ...prev, expandedAnnotations: newExpanded };
    });
  }, []);

  const collapseAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      expandedAnnotations: new Set(),
    }));
  }, []);

  const setFocusedAnnotation = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, focusedAnnotation: id }));
  }, []);

  const isExpanded = useCallback((id: string) => {
    return state.expandedAnnotations.has(id);
  }, [state.expandedAnnotations]);

  return {
    expandedAnnotations: state.expandedAnnotations,
    focusedAnnotation: state.focusedAnnotation,
    isExpanded,
    toggleAnnotation,
    collapseAll,
    setFocusedAnnotation,
  };
}

// Keep old export for backwards compatibility during migration
export const useRedlineMode = useDesignNotes;
