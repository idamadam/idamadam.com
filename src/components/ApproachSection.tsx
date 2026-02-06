'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced, fadeInUp } from '@/lib/animations';
import SectionTitle from './SectionTitle';

const approaches = [
  {
    heading: 'Complexity is a design problem',
    body: 'Enterprise software doesn\'t have to feel enterprise. I find the simple model hiding inside every complex system and build interfaces that make the right action obvious.',
  },
  {
    heading: 'Craft compounds',
    body: 'Small details\u2014a well-tuned animation, a considered empty state, a precise label\u2014build trust over time. I treat polish as a feature, not a phase.',
  },
  {
    heading: 'Design with, not for',
    body: 'The best work comes from tight collaboration with engineering and research. I prototype to think, test early, and stay close to the code.',
  },
];

export default function ApproachSection() {
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
      <section id="approach" className="w-full py-12 lg:py-20 px-6 lg:px-10 2xl:px-16">
        <div className="max-w-[1408px] mx-auto border-t border-border/60 pt-10 lg:pt-14">
          <SectionTitle>Approach</SectionTitle>
        </div>
        <div className="max-w-[1408px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8 lg:mt-10">
          {approaches.map((approach) => (
            <motion.div key={approach.heading} {...fadeInUp}>
              <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] leading-[1.35] tracking-[-0.005em] text-primary font-normal">
                {approach.heading}
              </h3>
              <p className="text-[0.9375rem] leading-[1.6] text-secondary mt-2">
                {approach.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
