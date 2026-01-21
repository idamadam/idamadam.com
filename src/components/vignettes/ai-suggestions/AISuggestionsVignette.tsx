'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import SuggestionsTextPanel from './SuggestionsTextPanel';
import { MobileSuggestionsSheet } from './MobileSuggestionsSheet';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { useScrollToSection } from '@/components/vignettes/shared/useScrollToSection';
import { fadeInUp } from '@/lib/animations';
import { trackDesignDetailViewed } from '@/lib/analytics';
import { aiSuggestionsContent } from './content';

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1279px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

// Map from 1-based number to section id
const sectionMap: Record<number, string> = {
  1: 'improve-button',
  2: 'gradient-border',
  3: 'recommendations',
};

export default function AISuggestionsVignette() {
  const [activeNumber, setActiveNumber] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetIndex, setSheetIndex] = useState(0);
  const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const viewedDetailsRef = useRef<Set<number>>(new Set());
  const isMobile = useIsMobile();
  const { scrollToSection } = useScrollToSection();

  const trackDetailIfNew = useCallback((detailNumber: number) => {
    if (!viewedDetailsRef.current.has(detailNumber)) {
      viewedDetailsRef.current.add(detailNumber);
      trackDesignDetailViewed('ai-suggestions', detailNumber);
    }
  }, []);

  // Handle number click (mobile only - opens sheet)
  const handleNumberClick = useCallback(
    (number: number) => {
      // Only handle clicks on mobile
      if (!isMobile) return;

      // Clear any pending timeout
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }

      setSheetIndex(number - 1); // Convert 1-based to 0-based index
      setSheetOpen(true);
      setActiveNumber(number);
      trackDetailIfNew(number);
      // Scroll after a brief delay to let sheet animate in
      setTimeout(() => {
        scrollToSection(sectionMap[number]);
      }, 100);
    },
    [isMobile, scrollToSection, trackDetailIfNew]
  );

  // Handle hover (desktop only - highlights)
  const handleNumberHover = useCallback(
    (number: number | null) => {
      if (isMobile) return;

      // Clear any pending timeout
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }

      setActiveNumber(number);
      if (number !== null) {
        trackDetailIfNew(number);
      }
    },
    [isMobile, trackDetailIfNew]
  );

  // Handle sheet close
  const handleSheetClose = useCallback(() => {
    setSheetOpen(false);
    setActiveNumber(null);
  }, []);

  // Handle sheet index change - also update active number and scroll
  const handleSheetIndexChange = useCallback(
    (index: number) => {
      setSheetIndex(index);
      const number = index + 1; // Convert 0-based to 1-based
      setActiveNumber(number);
      trackDetailIfNew(number);

      // Scroll to center element in visible area above sheet
      const sectionId = sectionMap[number];
      if (sectionId) {
        scrollToSection(sectionId);
      }
    },
    [scrollToSection, trackDetailIfNew]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
    };
  }, []);

  return (
    <VignetteContainer id="ai-suggestions" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteSplit title={<SuggestionsTextPanel />}>
            <div
              className="relative w-full max-w-[680px] mx-auto"
              style={{ overflow: 'visible' }}
            >
              <SuggestionsPanel
                content={aiSuggestionsContent}
                highlightedSection={activeNumber}
                onMarkerClick={handleNumberClick}
                onMarkerHover={handleNumberHover}
              />
            </div>
          </VignetteSplit>
        </motion.div>
      </div>

      {/* Mobile sheet for design details */}
      <MobileSuggestionsSheet
        isOpen={sheetOpen}
        onClose={handleSheetClose}
        currentIndex={sheetIndex}
        onIndexChange={handleSheetIndexChange}
      />
    </VignetteContainer>
  );
}
