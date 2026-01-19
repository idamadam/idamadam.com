'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced } from '@/lib/animations';
import SectionTitle from './SectionTitle';
import AIHighlightsVignette from './vignettes/ai-highlights/AIHighlightsVignette';
import AISuggestionsVignette from './vignettes/ai-suggestions/AISuggestionsVignette';
import PrototypingVignette from './vignettes/prototyping/PrototypingVignette';
import MultilingualVignette from './vignettes/multilingual/MultilingualVignette';
import HomeConnectVignette from './vignettes/home-connect/HomeConnectVignette';
import VibeCodingVignette from './vignettes/vibe-coding/VibeCodingVignette';

export default function SelectedWorkSection() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const { isComplete } = useIntroSequence();

  // Always show for reduced motion, otherwise wait for intro
  const shouldShow = reducedMotion || isComplete;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: t.duration.slow,
        delay: shouldShow ? 0.5 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <SectionTitle disableScrollTrigger>Selected work</SectionTitle>
      <section className="w-full pb-12 lg:pb-20 px-5 lg:px-10 2xl:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-32 lg:gap-48 items-start">
          <AIHighlightsVignette />
          <MultilingualVignette />
          <AISuggestionsVignette />
          <HomeConnectVignette />
          <PrototypingVignette />
          <VibeCodingVignette />
        </div>
      </section>
    </motion.div>
  );
}
