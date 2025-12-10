'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import SuggestionsPanel from '../demos/SuggestionsPanel';
import { aiSuggestionsContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

export default function AISuggestionsVignette() {
  return (
    <VignetteContainer id="ai-suggestions">
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Single Section: AI Suggested Improvements */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={aiSuggestionsContent.title}
            description={aiSuggestionsContent.description}
          >
            <SuggestionsPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
