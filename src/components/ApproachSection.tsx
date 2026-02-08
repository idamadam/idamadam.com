'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced, fadeInUp } from '@/lib/animations';
import SectionTitle from './SectionTitle';

const approaches = [
  {
    heading: 'I don\u2019t stop at the user problem',
    body: 'I go deep on the tech, the data, the business context. That\u2019s where I find the constraints critical to the solution, and the opportunities that live inside them.',
  },
  {
    heading: 'Simplicity emerges through iteration',
    body: 'Wide exploration, user feedback, then deep refinement. Great design solutions almost always feel like the obvious thing to do, but refinement is required to get there.',
  },
  {
    heading: 'Psychological safety creates the room for productive disagreement',
    body: 'I invest in relationships first. When people feel understood, they share more, challenge more, and align faster.',
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
