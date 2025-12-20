'use client';

import { motion } from 'framer-motion';
import SandboxPanel from './SandboxPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import StageIndicator from '@/components/vignettes/shared/StageIndicator';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { useLoadingTransition } from '@/components/vignettes/shared/useLoadingTransition';
import { fadeInUp } from '@/lib/animations';
import { prototypingContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function PrototypingContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const reducedMotion = useReducedMotion();

  const { isLoading, startTransition } = useLoadingTransition({
    duration: 5000,
    onComplete: goToSolution,
  });

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const currentStageContent = stage === 'problem'
    ? prototypingContent.stages.problem
    : prototypingContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <StageIndicator stage={stage} onStageChange={setStage} />
          <AnimatedStageText
            stage={stage}
            text={title}
            isLoading={isLoading}
            reducedMotion={reducedMotion}
          />
        </div>
      }
      description={
        <AnimatedStageText
          stage={stage}
          text={description}
          isLoading={isLoading}
          reducedMotion={reducedMotion}
          delay={0.05}
        />
      }
    >
      <SandboxPanel
        content={prototypingContent}
        stage={panelStage}
        onTransition={startTransition}
      />
    </VignetteSplit>
  );
}

export default function PrototypingVignette() {
  return (
    <VignetteContainer id="prototyping">
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={prototypingContent.stages}>
            <PrototypingContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
