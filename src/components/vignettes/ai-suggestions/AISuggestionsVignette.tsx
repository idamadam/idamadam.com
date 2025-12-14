'use client';

import { motion } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { aiSuggestionsContent } from './content';

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
            <SuggestionsPanel content={aiSuggestionsContent} />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
