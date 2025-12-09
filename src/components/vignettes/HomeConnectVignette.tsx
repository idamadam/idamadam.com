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
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: Home Connect Feed */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-4">
            <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
              {homeConnectContent.title}
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
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
