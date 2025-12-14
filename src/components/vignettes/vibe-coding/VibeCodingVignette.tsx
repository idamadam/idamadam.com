'use client';

import { motion } from 'framer-motion';
import DemoCreationFlow from '@/components/demos/DemoCreationFlow';
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
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={vibeCodingContent.title}
            description={vibeCodingContent.description}
            actions={(
              <a
                href="https://studio.up.railway.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a1d23] text-white hover:bg-[#2a2d33] transition-colors font-medium rounded-lg text-[15px] leading-[1.4]"
              >
                Join the waitlist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
