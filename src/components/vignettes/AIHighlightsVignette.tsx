'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import HighlightsPanel from '../demos/HighlightsPanel';
import { aiHighlightsContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

export default function AIHighlightsVignette() {
  return (
    <VignetteContainer id="ai-highlights">
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Single Section: AI Highlights & Opportunities */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={aiHighlightsContent.title}
            description={aiHighlightsContent.description}
          >
            <HighlightsPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
