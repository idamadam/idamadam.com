'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { easings } from '@/lib/animations';

const approaches = [
  {
    heading: 'I don\u2019t stop at the user problem',
    body: 'I go deep on the tech, the data, the business context. That\u2019s where I find the constraints critical to the solution, and the opportunities that live inside them.',
    accent: '#3B82F6', // blue
    accentMuted: 'rgba(59, 130, 246, 0.07)',
    accentBorder: 'rgba(59, 130, 246, 0.15)',
    accentGlow: 'rgba(59, 130, 246, 0.12)',
    gradientFrom: '#EFF6FF',
    gradientTo: '#FFFFFF',
    number: '01',
  },
  {
    heading: 'Simplicity emerges through iteration',
    body: 'Wide exploration, user feedback, then deep refinement. Great design solutions almost always feel like the obvious thing to do, but refinement is required to get there.',
    accent: '#8B5CF6', // purple
    accentMuted: 'rgba(139, 92, 246, 0.07)',
    accentBorder: 'rgba(139, 92, 246, 0.15)',
    accentGlow: 'rgba(139, 92, 246, 0.12)',
    gradientFrom: '#F5F3FF',
    gradientTo: '#FFFFFF',
    number: '02',
  },
  {
    heading: 'Psychological safety creates the room for productive disagreement',
    body: 'I invest in relationships first. When people feel understood, they share more, challenge more, and align faster.',
    accent: '#F59E0B', // amber
    accentMuted: 'rgba(245, 158, 11, 0.07)',
    accentBorder: 'rgba(245, 158, 11, 0.15)',
    accentGlow: 'rgba(245, 158, 11, 0.12)',
    gradientFrom: '#FFFBEB',
    gradientTo: '#FFFFFF',
    number: '03',
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

function CardContent({ approach }: { approach: typeof approaches[number] }) {
  return (
    <>
      {/* Number + accent line */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="type-label"
          style={{ color: approach.accent }}
        >
          {approach.number}
        </span>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: approach.accentBorder }}
        />
      </div>

      {/* Heading */}
      <h3 className="type-body font-display font-medium text-primary">
        {approach.heading}
      </h3>

      {/* Body text */}
      <p className="type-body text-secondary mt-2">
        {approach.body}
      </p>
    </>
  );
}

export default function ApproachCards() {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();

  const shouldShow = reducedMotion || isComplete;

  return (
    <div className="w-full">
      {/* Desktop: fanned cards centered in the 1fr column */}
      <div className="hidden xl:flex items-start justify-center relative h-[340px]">
        {approaches.map((approach, index) => {
          const pos = cardPositions[index];
          const order = staggerOrder.indexOf(index);
          const fanOffset = (index - 1) * 100;

          return (
            <motion.div
              key={approach.heading}
              className="absolute left-1/2 top-0 w-[290px] rounded-2xl px-7 py-6 cursor-default select-none flex flex-col"
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
                y: pos.y - 10,
                scale: 1.04,
                zIndex: 10,
                boxShadow: `0 20px 40px -8px rgba(0,0,0,0.1), 0 8px 16px -4px rgba(0,0,0,0.06), 0 0 0 1px ${approach.accentBorder}, 0 0 24px ${approach.accentGlow}`,
                transition: { duration: 0.25, ease: easings.decel },
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: shouldShow && !reducedMotion ? order * 0.15 : 0,
                ease: easings.decel,
              }}
              style={{
                zIndex: index === 1 ? 3 : index === 0 ? 2 : 1,
                transformOrigin: 'bottom center',
                background: `linear-gradient(170deg, ${approach.gradientFrom} 0%, ${approach.gradientTo} 50%)`,
                border: `1px solid ${approach.accentBorder}`,
                boxShadow: `0 8px 24px -4px rgba(0,0,0,0.08), 0 4px 8px -2px rgba(0,0,0,0.04), 0 0 0 1px ${approach.accentBorder}`,
              }}
            >
              <CardContent approach={approach} />
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
              className="w-full rounded-2xl px-5 py-4"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={
                shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                delay: shouldShow && !reducedMotion ? order * 0.12 : 0,
                ease: easings.decel,
              }}
              style={{
                background: `linear-gradient(170deg, ${approach.gradientFrom} 0%, ${approach.gradientTo} 50%)`,
                border: `1px solid ${approach.accentBorder}`,
                boxShadow: `0 2px 8px -2px rgba(0,0,0,0.06), 0 0 0 1px ${approach.accentBorder}`,
              }}
            >
              <CardContent approach={approach} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
