'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import HighlightsPanel from '../demos/HighlightsPanel';
import SuggestionsPanel from '../demos/SuggestionsPanel';
import { fadeInUp } from '@/lib/animations';

export default function PerformanceAIVignette() {
  return (
    <VignetteContainer
      id="performance-ai"
    >
      <div className="w-full space-y-12 lg:space-y-16">
        {/* Section 1: AI Highlights & Opportunities */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[401px_1fr] gap-6 lg:gap-6"
        >
          {/* Left: Description */}
          <div className="space-y-3">
            <h3 className="text-[32px] leading-[38.4px] font-medium text-[#1a1d23] font-[family-name:var(--font-ibm-plex-sans)]">
              Made Performance Review season faster & fairer
            </h3>
            <p className="text-[24px] leading-[28.8px] text-[#6b7280] font-[family-name:var(--font-ibm-plex-sans)]">
              AI Highlights & Opportunities
            </p>
          </div>

          {/* Right: Interactive Mockup */}
          <div className="w-full lg:max-w-[533px]">
            <HighlightsPanel />
          </div>
        </motion.div>

        {/* Section 2: AI Suggested Improvements */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-[401px_1fr] gap-6 lg:gap-6"
        >
          {/* Left: Description */}
          <div>
            <p className="text-[24px] leading-[28.8px] text-[#6b7280] font-[family-name:var(--font-ibm-plex-sans)]">
              AI Suggested Improvements
            </p>
          </div>

          {/* Right: Interactive Mockup */}
          <div className="w-full lg:max-w-[533px]">
            <SuggestionsPanel />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
