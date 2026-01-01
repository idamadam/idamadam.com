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
            title={vibeCodingContent.title}
            description={vibeCodingContent.description}
            actions={(
              <a
                href="https://studio.up.railway.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive btn-primary"
              >
                Join the waitlist
                <span className="material-icons-outlined">arrow_forward</span>
              </a>
            )}
          >
            <DemoCreationFlow />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
