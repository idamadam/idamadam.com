'use client';

import { motion } from 'framer-motion';
import DemoCreationFlow from './DemoCreationFlow';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { vibeCodingContent } from './content';

export default function VibeCodingVignette() {
  return (
    <VignetteContainer
      id="vibe-coding"
    >
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: Vibe Coding Demo */}
        <motion.div {...fadeInUp}>
          <VignetteSplit
            compact
            title={
              <div className="space-y-4">
                <div className="text-caption text-accent-600 font-medium">Side project</div>
                <div>{vibeCodingContent.title}</div>
              </div>
            }
          >
            <DemoCreationFlow />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
