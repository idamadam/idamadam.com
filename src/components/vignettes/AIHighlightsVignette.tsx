'use client';

import { motion, AnimatePresence } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import VignetteStaged, { useVignetteStage } from './VignetteStaged';
import HighlightsPanel from '../demos/HighlightsPanel';
import IterationsPanel from '../demos/IterationsPanel';
import { aiHighlightsContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';

function AIHighlightsContent() {
  const { stage, goToSolution } = useVignetteStage();

  // Get stage-specific content
  const currentStageContent = stage === 'problem'
    ? aiHighlightsContent.stages?.problem
    : aiHighlightsContent.stages?.solution;

  const title = currentStageContent?.title || aiHighlightsContent.title;
  const description = currentStageContent?.description || aiHighlightsContent.description;

  return (
    <VignetteSplit
      title={
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.span>
        </AnimatePresence>
      }
      description={
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {description}
          </motion.span>
        </AnimatePresence>
      }
    >
      <HighlightsPanel
        stage={stage === 'iterations' ? 'solution' : stage}
        onTransition={goToSolution}
        problemCards={aiHighlightsContent.problemCards}
      />
    </VignetteSplit>
  );
}

export default function AIHighlightsVignette() {
  return (
    <VignetteContainer id="ai-highlights">
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged
            stages={aiHighlightsContent.stages}
            iterationsPanel={
              <IterationsPanel iterations={aiHighlightsContent.iterations} />
            }
          >
            <AIHighlightsContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
