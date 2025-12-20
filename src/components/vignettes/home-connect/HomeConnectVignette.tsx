'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import HomeConnectContent from './HomeConnectContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteStaged from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { homeConnectContent } from './content';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import '../shared/design-notes.css';

export default function HomeConnectVignette() {
  const designNotes = homeConnectContent.designNotes;
  const redlineMode = useRedlineMode();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleExit = () => {
    redlineMode.exitRedlineMode();
    setMobileIndex(0);
  };

  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotes?.notes ?? [];
  const accent = designNotes?.accent ?? '#5F3361';

  return (
    <VignetteContainer id="home-connect" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={homeConnectContent.stages}>
            <HomeConnectContent
              redlineNotes={redlineNotes}
              accent={accent}
              redlineMode={redlineMode}
              mobileIndex={mobileIndex}
              onMobileIndexChange={setMobileIndex}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour */}
      <MobileRedlineTour
        isActive={redlineMode.isActive}
        notes={redlineNotes}
        accent={accent}
        onExit={handleExit}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
