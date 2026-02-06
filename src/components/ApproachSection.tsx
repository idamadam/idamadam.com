'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced, fadeInUp } from '@/lib/animations';
import SectionTitle from './SectionTitle';

const approaches = [
  {
    heading: 'I design with a wide context',
    body: 'The people using the product, the business behind it, the technology underneath it. I hold all of that context because the best design decisions come from understanding the full picture.',
  },
  {
    heading: 'I earn simplicity through depth',
    body: 'The right answer rarely shows up in the first, second, or third iteration. I go further than most teams are comfortable with because real simplicity only emerges through rigorous exploration.',
  },
  {
    heading: 'I care about the people I work with',
    body: 'Productive disagreement takes trust. Their problems, their context, their craft. The hard conversations become the best part of the process when you genuinely care about the people in the room.',
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
          <SectionTitle>How I work</SectionTitle>
        </div>
        <div className="max-w-[1408px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8 lg:mt-10">
          {approaches.map((approach) => (
            <motion.div key={approach.heading} {...fadeInUp}>
              <h3 className="type-body font-display font-medium text-primary">
                {approach.heading}
              </h3>
              <p className="type-body text-primary mt-2">
                {approach.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
