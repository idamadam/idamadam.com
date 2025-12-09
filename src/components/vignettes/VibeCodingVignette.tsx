'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import DemoCreationFlow from '../demos/DemoCreationFlow';
import { fadeInUp } from '@/lib/animations';
import { vibeCodingContent } from '@/lib/vignette-data';

export default function VibeCodingVignette() {
  return (
    <VignetteContainer
      id="vibe-coding"
    >
      <div className="w-full space-y-12 lg:space-y-16">
        {/* Section: Vibe Coding Demo */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[401px_1fr] gap-6 lg:gap-6"
        >
          {/* Left: Description */}
          <div className="space-y-6">
            <h3 className="text-[32px] leading-[38.4px] font-medium text-[#1a1d23] font-[family-name:var(--font-ibm-plex-sans)]">
              {vibeCodingContent.title}
            </h3>
            <p className="text-[24px] leading-[28.8px] text-[#6b7280] font-[family-name:var(--font-ibm-plex-sans)]">
              {vibeCodingContent.description}
            </p>
            <a
              href="https://studio.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1d23] text-white hover:bg-[#2a2d33] transition-colors font-medium rounded-lg text-[16px]"
            >
              Join the waitlist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Interactive Demo */}
          <div className="w-full">
            <DemoCreationFlow />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
