'use client';

import { motion } from 'framer-motion';
import TranslationManagementPanel from '@/components/demos/TranslationManagementPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { multilingualContent } from './content';

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
            <TranslationManagementPanel content={multilingualContent} />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
