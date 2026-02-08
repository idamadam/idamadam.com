'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { easings } from '@/lib/animations';

const approaches = [
  {
    heading: 'I design with a wide context',
    body: 'The people using the product, the business behind it, the technology underneath it. I hold all of that context because the best design decisions come from understanding the full picture.',
    accent: '#3B82F6', // blue
  },
  {
    heading: 'I earn simplicity through depth',
    body: 'The right answer rarely shows up in the first, second, or third iteration. I go further than most teams are comfortable with because real simplicity only emerges through rigorous exploration.',
    accent: '#8B5CF6', // purple
  },
  {
    heading: 'I care about the people I work with',
    body: 'Productive disagreement takes trust. Their problems, their context, their craft. The hard conversations become the best part of the process when you genuinely care about the people in the room.',
    accent: '#F59E0B', // amber
  },
];

// Card positions for the fanned arrangement (desktop)
// Order: left (-6deg), center (0deg), right (+6deg)
const cardPositions = [
  { rotate: -6, x: 0, y: 8 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 6, x: 0, y: 8 },
];

// Stagger order: middle first, then sides fan out
const staggerOrder = [1, 0, 2];

export default function ApproachCards() {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();

  const shouldShow = reducedMotion || isComplete;

  return (
    <div className="w-full">
      {/* Desktop: fanned cards centered in the 1fr column */}
      <div className="hidden xl:flex items-start justify-center relative h-[380px]">
        {approaches.map((approach, index) => {
          const pos = cardPositions[index];
          const order = staggerOrder.indexOf(index);
          const fanOffset = (index - 1) * 85;

          return (
            <motion.div
              key={approach.heading}
              className="absolute left-1/2 top-0 w-[250px] h-[340px] bg-white border-2 border-border rounded-xl p-6 shadow-sm cursor-default select-none flex flex-col"
              initial={
                reducedMotion
                  ? { opacity: 1, rotate: pos.rotate, x: '-50%', y: pos.y }
                  : { opacity: 0, rotate: 0, x: '-50%', y: 20, scale: 0.95 }
              }
              animate={
                shouldShow
                  ? {
                      opacity: 1,
                      rotate: pos.rotate,
                      x: `calc(-50% + ${fanOffset}px)`,
                      y: pos.y,
                      scale: 1,
                    }
                  : { opacity: 0, rotate: 0, x: '-50%', y: 20, scale: 0.95 }
              }
              whileHover={{
                y: pos.y - 8,
                scale: 1.03,
                zIndex: 10,
                transition: { duration: 0.2, ease: easings.decel },
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: shouldShow && !reducedMotion ? order * 0.15 : 0,
                ease: easings.decel,
              }}
              style={{
                zIndex: index === 1 ? 3 : index === 0 ? 2 : 1,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className="w-6 h-1.5 rounded-full mb-3"
                style={{ backgroundColor: approach.accent }}
              />
              <h3 className="text-[15px] font-display font-semibold text-primary leading-snug">
                {approach.heading}
              </h3>
              <p className="text-[13px] text-secondary leading-relaxed mt-2.5">
                {approach.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 xl:hidden">
        {approaches.map((approach, index) => {
          const order = staggerOrder.indexOf(index);

          return (
            <motion.div
              key={approach.heading}
              className="w-full bg-white border-2 border-border rounded-xl p-5 shadow-sm"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={
                shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                delay: shouldShow && !reducedMotion ? order * 0.12 : 0,
                ease: easings.decel,
              }}
            >
              <div
                className="w-6 h-1.5 rounded-full mb-3"
                style={{ backgroundColor: approach.accent }}
              />
              <h3 className="text-[15px] font-display font-semibold text-primary leading-snug">
                {approach.heading}
              </h3>
              <p className="text-[13px] text-secondary leading-relaxed mt-2.5">
                {approach.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
