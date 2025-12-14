'use client';

import { motion } from 'framer-motion';
import HomeConnectPanel from './HomeConnectPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { homeConnectContent } from './content';

export default function HomeConnectVignette() {
  return (
    <VignetteContainer
      id="home-connect"
    >
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: Home Connect Feed */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={homeConnectContent.title}
            description={homeConnectContent.description}
          >
            <HomeConnectPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
