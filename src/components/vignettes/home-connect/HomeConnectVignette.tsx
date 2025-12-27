'use client';

import { motion } from 'framer-motion';
import HomeConnectContent from './HomeConnectContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteStaged from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { homeConnectContent } from './content';
import { useDesignNotesSetup } from '@/components/vignettes/shared/useDesignNotesSetup';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import '../shared/design-notes.css';

export default function HomeConnectVignette() {
  const {
    designNotes,
    mobileIndex,
    mobileTourActive,
    openMobileTour,
    closeMobileTour,
    setMobileIndex,
    handleScrollToAnchor,
    redlineNotes,
  } = useDesignNotesSetup(homeConnectContent.designNotes);

  return (
    <VignetteContainer id="home-connect" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={homeConnectContent.stages}>
            <HomeConnectContent
              redlineNotes={redlineNotes}
              designNotes={designNotes}
              mobileIndex={mobileIndex}
              onMobileIndexChange={openMobileTour}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour */}
      <MobileRedlineTour
        isActive={mobileTourActive}
        notes={redlineNotes}
        onExit={closeMobileTour}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
