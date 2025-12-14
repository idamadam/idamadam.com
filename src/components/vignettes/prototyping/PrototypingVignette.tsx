'use client';

import { motion } from 'framer-motion';
import SandboxPanel from '@/components/demos/SandboxPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { prototypingContent } from './content';

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
            title={prototypingContent.title}
            description={prototypingContent.description}
          >
            <SandboxPanel
              title={prototypingContent.sandboxTitle}
              prototypes={prototypingContent.prototypes}
            />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
