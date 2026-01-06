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
import Button from '@/components/Button';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function PrototypingContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const reducedMotion = useReducedMotion();

  const { isLoading, startTransition } = useLoadingTransition({
    duration: 4000,
    onComplete: goToSolution,
  });

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const currentStageContent = stage === 'problem'
    ? prototypingContent.stages.problem
    : prototypingContent.stages.solution;

  const title = currentStageContent.title;

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
      actions={
        stage === 'problem' && !isLoading && currentStageContent.cta ? (
          <Button onClick={startTransition} enterDelay={0.3}>
            {currentStageContent.cta}
          </Button>
        ) : null
      }
    >
      <SandboxPanel
        content={prototypingContent}
        stage={panelStage}
      />
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
