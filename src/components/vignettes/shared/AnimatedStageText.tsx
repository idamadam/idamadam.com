'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStage } from '@/lib/vignette-stage-context';

interface AnimatedStageTextProps {
  stage: VignetteStage;
  text: string | undefined;
  isLoading?: boolean;
  reducedMotion?: boolean;
  delay?: number;
}

export default function AnimatedStageText({
  stage,
  text,
  isLoading = false,
  reducedMotion = false,
  delay = 0,
}: AnimatedStageTextProps) {
  return (
    <span className="relative block">
      <AnimatePresence mode="sync" initial={false}>
        <motion.span
          key={stage}
          className="block"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.3 : 1 }}
          exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.2,
            ease: "easeOut",
            delay: reducedMotion ? 0 : delay,
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
