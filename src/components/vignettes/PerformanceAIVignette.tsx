'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import HighlightsPanel from '../demos/HighlightsPanel';
import SuggestionsPanel from '../demos/SuggestionsPanel';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

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
        >
          <VignetteSplit
            title="Made Performance Review season faster & fairer"
            description="AI Highlights & Opportunities"
          >
            <HighlightsPanel />
          </VignetteSplit>
        </motion.div>

        {/* Section 2: AI Suggested Improvements */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <VignetteSplit description="AI Suggested Improvements">
            <SuggestionsPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
