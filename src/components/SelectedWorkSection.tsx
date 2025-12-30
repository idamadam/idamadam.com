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
      <SectionTitle disableScrollTrigger>Selected work from Culture Amp</SectionTitle>
      <section className="w-full pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <AIHighlightsVignette />
          </div>
          <AISuggestionsVignette />
          <PrototypingVignette />
          <div className="lg:col-span-2">
            <MultilingualVignette />
          </div>
          <div className="lg:col-span-2">
            <HomeConnectVignette />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
