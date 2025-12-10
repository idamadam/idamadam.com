'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import HomeConnectPanel from '../demos/HomeConnectPanel';
import { homeConnectContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

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
