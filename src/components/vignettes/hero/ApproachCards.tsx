'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { easings } from '@/lib/animations';

type Approach = {
  heading: string;
  body: string;
  accent: string;
  accentMuted: string;
  accentBorder: string;
  accentGlow: string;
  gradientFrom: string;
  gradientTo: string;
  number: string;
  illustration: (color: string, borderColor: string) => ReactNode;
};

const approaches: Approach[] = [
  {
    heading: 'I don\u2019t stop at the user problem',
    body: 'I go deep on the tech, the data and the business context to identify hidden opportunities and constraints.',
    accent: '#3B82F6', // blue
    accentMuted: 'rgba(59, 130, 246, 0.07)',
    accentBorder: 'rgba(59, 130, 246, 0.15)',
    accentGlow: 'rgba(59, 130, 246, 0.12)',
    gradientFrom: '#EFF6FF',
    gradientTo: '#FFFFFF',
    number: '01',
    illustration: (color, borderColor) => (
      <LayersIllustration color={color} borderColor={borderColor} />
    ),
  },
  {
    heading: 'If it feels complex, it probably needs more iteration',
    body: 'Hard problems often have simple solutions. Finding them takes wide exploration and deep refinement.',
    accent: '#8B5CF6', // purple
    accentMuted: 'rgba(139, 92, 246, 0.07)',
    accentBorder: 'rgba(139, 92, 246, 0.15)',
    accentGlow: 'rgba(139, 92, 246, 0.12)',
    gradientFrom: '#F5F3FF',
    gradientTo: '#FFFFFF',
    number: '02',
    illustration: (color, borderColor) => (
      <ConvergenceIllustration color={color} borderColor={borderColor} />
    ),
  },
  {
    heading: 'You don\u2019t get good feedback without trust',
    body: 'I actively build trust in my team to encourage people to challenge my thinking. This way, my work gets sharper.',
    accent: '#F59E0B', // amber
    accentMuted: 'rgba(245, 158, 11, 0.07)',
    accentBorder: 'rgba(245, 158, 11, 0.15)',
    accentGlow: 'rgba(245, 158, 11, 0.12)',
    gradientFrom: '#FFFBEB',
    gradientTo: '#FFFFFF',
    number: '03',
    illustration: (color, borderColor) => (
      <OverlapIllustration color={color} borderColor={borderColor} />
    ),
  },
];

// Card positions for the fanned arrangement (desktop)
// Order: left (-6deg), center (0deg), right (+6deg)
const cardPositions = [
  { rotate: -6, x: 0, y: 8 },
  { rotate: 0, x: 0, y: 0 },
  { rotate: 6, x: 0, y: 8 },
];

// Stagger order: first card leads, then the rest follow
const staggerOrder = [0, 1, 2];

function hexPoints(cx: number, cy: number, r: number, rotDeg: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((60 * i + rotDeg) * Math.PI) / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

function LayersIllustration({
  color,
  borderColor,
}: {
  color: string;
  borderColor: string;
}) {
  const cx = 56;
  const cy = 36;

  return (
    <svg
      width="112"
      height="72"
      viewBox="0 0 112 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon — widest perspective */}
      <polygon
        points={hexPoints(cx, cy, 32, 0)}
        fill={color}
        fillOpacity="0.04"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.15"
      />
      {/* Middle hexagon — rotated 15° */}
      <polygon
        points={hexPoints(cx, cy, 22, 15)}
        fill={color}
        fillOpacity="0.07"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Inner hexagon — rotated 30°, most prominent */}
      <polygon
        points={hexPoints(cx, cy, 13, 30)}
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

function ConvergenceIllustration({
  color,
  borderColor,
}: {
  color: string;
  borderColor: string;
}) {
  // Progressive simplification: jagged polygon → square → circle
  const cy = 36;
  const r = 12;

  // Jagged 9-sided polygon (complex, rough)
  const jaggedPoints = Array.from({ length: 9 }, (_, i) => {
    const angle = ((360 / 9) * i - 90) * (Math.PI / 180);
    const jitter = i % 2 === 0 ? r : r * 0.65;
    return `${20 + jitter * Math.cos(angle)},${cy + jitter * Math.sin(angle)}`;
  }).join(' ');

  return (
    <svg
      width="112"
      height="72"
      viewBox="0 0 112 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Step 1: Jagged polygon — complex, many edges */}
      <polygon
        points={jaggedPoints}
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        strokeLinejoin="round"
      />

      {/* Step 2: Rounded square — simpler */}
      <rect
        x="45"
        y={cy - 11}
        width="22"
        height="22"
        rx="4"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        fill={color}
        fillOpacity="0.06"
      />

      {/* Step 3: Circle — the simplest, most refined form */}
      <circle
        cx="92"
        cy={cy}
        r="11"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.5"
        fill={color}
        fillOpacity="0.12"
      />
    </svg>
  );
}

function OverlapIllustration({
  color,
  borderColor,
}: {
  color: string;
  borderColor: string;
}) {
  return (
    <svg
      width="112"
      height="72"
      viewBox="0 0 112 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gate — left pillar */}
      <rect
        x="28"
        y="12"
        width="6"
        height="48"
        rx="2"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Gate — right pillar */}
      <rect
        x="78"
        y="12"
        width="6"
        height="48"
        rx="2"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Gate — lintel */}
      <rect
        x="28"
        y="10"
        width="56"
        height="6"
        rx="2"
        fill={color}
        fillOpacity="0.06"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.25"
      />

      {/* X inside — productive tension/disagreement within the safe frame */}
      <line
        x1="40"
        y1="22"
        x2="72"
        y2="54"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="72"
        y1="22"
        x2="40"
        y2="54"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardContent({ approach }: { approach: Approach }) {
  return (
    <>
      {/* Number + accent line */}
      <div className="flex items-center gap-3 mb-4">
        <span className="type-label" style={{ color: approach.accent }}>
          {approach.number}
        </span>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: approach.accentBorder }}
        />
      </div>

      {/* Illustration */}
      <div className="mb-3">
        {approach.illustration(approach.accent, approach.accentBorder)}
      </div>

      {/* Heading */}
      <h3 className="type-body font-display font-medium text-primary">
        {approach.heading}
      </h3>

      {/* Body text */}
      <p className="type-body text-secondary mt-2">{approach.body}</p>
    </>
  );
}

export default function ApproachCards() {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();
  const [lastHovered, setLastHovered] = useState<number | null>(null);

  const shouldShow = reducedMotion || isComplete;

  return (
    <div className="w-full">
      {/* Section label */}
      <motion.p
        className="type-body text-secondary mb-8 xl:text-center"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={shouldShow ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, delay: shouldShow && !reducedMotion ? 0.1 : 0 }}
      >
        How I think about design
      </motion.p>

      {/* Desktop: fanned cards centered in the 1fr column */}
      <div className="hidden xl:flex items-start justify-center relative h-[360px] pt-6">
        {approaches.map((approach, index) => {
          const pos = cardPositions[index];
          const order = staggerOrder.indexOf(index);
          const fanOffset = (index - 1) * 100;

          return (
            <motion.div
              key={approach.heading}
              className="absolute left-1/2 top-0 w-[290px] rounded-2xl px-7 py-6 cursor-default select-none flex flex-col"
              onHoverStart={() => setLastHovered(index)}
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
                boxShadow: `0 20px 40px -8px rgba(0,0,0,0.1), 0 8px 16px -4px rgba(0,0,0,0.06), 0 0 0 1px ${approach.accentBorder}, 0 0 24px ${approach.accentGlow}`,
                transition: { duration: 0.25, ease: easings.decel },
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: shouldShow && !reducedMotion ? order * 0.15 : 0,
                ease: easings.decel,
              }}
              style={{
                zIndex: lastHovered === index ? 10 : 3 - index,
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
