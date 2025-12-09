'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import TranslationManagementPanel from '../demos/TranslationManagementPanel';
import { multilingualContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';

export default function MultilingualVignette() {
  return (
    <VignetteContainer id="multilingual">
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Single Section: Description + Interactive Demo */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-4">
            <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
              {multilingualContent.section1.title}
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
              {multilingualContent.section1.description}
            </p>
          </div>

          {/* Right: Interactive Demo */}
          <div className="w-full">
            <TranslationManagementPanel />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
