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
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section 1: AI Highlights & Opportunities */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-4">
            <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
              Made Performance Review season faster & fairer
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
              AI Highlights & Opportunities
            </p>
          </div>

          {/* Right: Interactive Mockup */}
          <div className="w-full">
            <HighlightsPanel />
          </div>
        </motion.div>

        {/* Section 2: AI Suggested Improvements */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-2">
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
              AI Suggested Improvements
            </p>
          </div>

          {/* Right: Interactive Mockup */}
          <div className="w-full">
            <SuggestionsPanel />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
