'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import HomeConnectPanel from '../demos/HomeConnectPanel';
import { homeConnectContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';

export default function HomeConnectVignette() {
  return (
    <VignetteContainer
      id="home-connect"
    >
      <div className="w-full space-y-12 lg:space-y-16">
        {/* Section: Home Connect Feed */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[401px_1fr] gap-6 lg:gap-6"
        >
          {/* Left: Description */}
          <div className="space-y-6">
            <h3 className="text-[32px] leading-[38.4px] font-medium text-[#1a1d23] font-[family-name:var(--font-ibm-plex-sans)]">
              {homeConnectContent.title}
            </h3>
            <p className="text-[24px] leading-[28.8px] text-[#6b7280] font-[family-name:var(--font-ibm-plex-sans)]">
              {homeConnectContent.description}
            </p>
          </div>

          {/* Right: Interactive Demo */}
          <div className="w-full">
            <HomeConnectPanel />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
