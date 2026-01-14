'use client';

import { motion } from 'framer-motion';
import SandboxPanel from './SandboxPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { fadeInUp } from '@/lib/animations';
import { prototypingContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

function PrototypingContent() {
  const { stage } = useVignetteStage();
  const reducedMotion = useReducedMotion();

  const title = prototypingContent.stages.solution.title;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <AnimatedStageText
            stage={stage}
            text={title}
            isLoading={false}
            reducedMotion={reducedMotion}
          />
        </div>
      }
    >
      <div className="relative w-full max-w-[672px] mx-auto">
        <SandboxPanel content={prototypingContent} />
      </div>
    </VignetteSplit>
  );
}

export default function PrototypingVignette() {
  return (
    <VignetteContainer id="prototyping">
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteStaged stages={prototypingContent.stages} vignetteId="prototyping">
            <PrototypingContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
