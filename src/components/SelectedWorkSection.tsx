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
      initial={{ opacity: 0, y: 40 }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: t.duration.slow,
        delay: shouldShow ? 0.6 : 0,
        ease: 'easeOut',
      }}
    >
      <SectionTitle disableScrollTrigger>Work</SectionTitle>
      <section className="w-full pb-16 lg:pb-24 px-6 lg:px-12 2xl:px-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 lg:gap-16 xl:gap-20 items-start">
          <AIHighlightsVignette />
          <AISuggestionsVignette />
          <PrototypingVignette />
          <MultilingualVignette />
          <HomeConnectVignette />
          <VibeCodingVignette />
        </div>
      </section>
    </motion.div>
  );
}
