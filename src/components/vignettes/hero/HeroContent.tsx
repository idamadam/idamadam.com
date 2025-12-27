'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroShaderPanel from './HeroShaderPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { heroContent } from './content';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

type HeroStage = 'problem' | 'solution';

export default function HeroContent() {
  const [stage, setStage] = useState<HeroStage>('problem');
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  const isActive = stage === 'solution';

  const handleActivate = () => {
    setStage('solution');
  };

  const handleReset = () => {
    setStage('problem');
  };

  return (
    <VignetteSplit
      title={heroContent.name}
      description={
        <span className="space-y-4 block">
          <span className="block">{heroContent.role}.</span>

          {/* Animated tagline */}
          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              className="block text-secondary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: t.stage.textDuration }}
            >
              {stage === 'problem'
                ? heroContent.stages.problem.tagline
                : heroContent.stages.solution.tagline}
            </motion.span>
          </AnimatePresence>

          {/* CTA or Scroll Hint */}
          <AnimatePresence mode="wait">
            {stage === 'problem' ? (
              <motion.button
                key="cta"
                onClick={handleActivate}
                className="btn-interactive btn-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="material-icons-outlined">palette</span>
                {heroContent.stages.problem.cta}
              </motion.button>
            ) : (
              <motion.span
                key="scroll"
                className="flex items-center gap-2 text-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  className="material-icons-outlined text-base"
                  animate={reducedMotion ? {} : { y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  expand_more
                </motion.span>
                {heroContent.stages.solution.scrollHint}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      }
      variant="hero"
    >
      <HeroShaderPanel isActive={isActive} onReset={handleReset} />
    </VignetteSplit>
  );
}
