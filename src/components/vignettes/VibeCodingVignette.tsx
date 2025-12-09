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
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: Vibe Coding Demo */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-4">
            <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
              {vibeCodingContent.title}
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
              {vibeCodingContent.description}
            </p>
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
