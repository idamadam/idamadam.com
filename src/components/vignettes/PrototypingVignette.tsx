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
      <div className="w-full space-y-12 lg:space-y-16">
        {/* Section: AI Prototyping Infrastructure */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[401px_1fr] gap-6 lg:gap-6"
        >
          {/* Left: Description */}
          <div className="space-y-6">
            <h3 className="text-[32px] leading-[38.4px] font-medium text-[#1a1d23] font-[family-name:var(--font-ibm-plex-sans)]">
              Pioneered AI Prototyping infrastructure at Culture Amp
            </h3>
            <p className="text-[24px] leading-[28.8px] text-[#6b7280] font-[family-name:var(--font-ibm-plex-sans)]">
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
