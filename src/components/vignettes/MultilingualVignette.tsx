'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import TranslationManagementPanel from '../demos/TranslationManagementPanel';
import { multilingualContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

export default function MultilingualVignette() {
  return (
    <VignetteContainer id="multilingual">
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Single Section: Description + Interactive Demo */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={multilingualContent.section1.title}
            description={multilingualContent.section1.description}
          >
            <TranslationManagementPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
