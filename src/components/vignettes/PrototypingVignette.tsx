'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import SandboxPanel from '../demos/SandboxPanel';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

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
        >
          <VignetteSplit
            title="Pioneered AI Prototyping infrastructure at Culture Amp"
            description="I created a common repository for designers & product managers at Culture Amp to create, share and remix React prototypes."
          >
            <SandboxPanel />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
