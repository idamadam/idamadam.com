'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import SandboxPanel from '../demos/SandboxPanel';
import { fadeInUp } from '@/lib/animations';

export default function PrototypingVignette() {
  return (
    <VignetteContainer
      id="prototyping"
    >
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: AI Prototyping Infrastructure */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Left: Description */}
          <div className="space-y-4">
            <h3 className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]">
              Pioneered AI Prototyping infrastructure at Culture Amp
            </h3>
            <p className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl">
              I created a common repository for designers & product managers at Culture Amp to create, share and remix React prototypes.
            </p>
          </div>

          {/* Right: Interactive Mockup */}
          <div className="w-full">
            <SandboxPanel />
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
