'use client';

import { motion } from 'framer-motion';
import DemoCreationFlow from './DemoCreationFlow';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { vibeCodingContent } from './content';

export default function VibeCodingVignette() {
  return (
    <VignetteContainer id="vibe-coding">
      <motion.div {...fadeInUp}>
        <VignetteSplit
          title={
            <div className="space-y-3">
              <span className="text-[0.75rem] text-accent-600 font-medium tracking-wide uppercase">Side project</span>
              <div>{vibeCodingContent.title}</div>
            </div>
          }
        >
          <div className="relative w-full max-w-[672px] mx-auto">
            <DemoCreationFlow />
          </div>
        </VignetteSplit>
      </motion.div>
    </VignetteContainer>
  );
}
