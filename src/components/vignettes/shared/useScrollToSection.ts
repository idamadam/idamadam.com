'use client';

import { useCallback } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Hook for scrolling to a section when a design note is activated on mobile.
 * Only scrolls on mobile (< 1024px viewport) to avoid interfering with desktop popovers.
 */
export function useScrollToSection(topPadding = 24) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = useCallback(
    (sectionId: string | null) => {
      // Only run on mobile (< lg breakpoint)
      if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
      if (!sectionId) return;

      const element = document.querySelector(
        `[data-section-id="${sectionId}"]`
      ) as HTMLElement | null;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollTarget = window.scrollY + rect.top - topPadding;

      window.scrollTo({
        top: scrollTarget,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [topPadding, prefersReducedMotion]
  );

  return { scrollToSection };
}
