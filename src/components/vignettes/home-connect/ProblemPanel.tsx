'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';

interface ProblemPanelProps {
  onTransition: () => void;
}

const scatteredInsights = [
  {
    id: 'performance',
    page: 'Performance',
    icon: 'trending_up',
    color: '#5F3361',
    insight: 'Feedback due in 3 days',
    position: { top: 0, right: 0 },
    rotate: -2,
    zIndex: 1,
  },
  {
    id: 'oneOnOnes',
    page: '1-on-1s',
    icon: 'people',
    color: '#10B981',
    insight: "Aisha's wellbeing dropped",
    position: { top: 70, left: 0 },
    rotate: 1,
    zIndex: 2,
  },
  {
    id: 'goals',
    page: 'Goals',
    icon: 'flag',
    color: '#FFB600',
    insight: "Malik's goal is inactive",
    position: { bottom: 0, right: 24 },
    rotate: -1,
    zIndex: 3,
  },
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();

  // CTA appears after all cards have animated in
  const ctaDelay = reducedMotion ? 0 : entranceDelay + scatteredInsights.length * stagger + 0.1;

  return (
    <div className="w-full">
      {/* Scattered page cards */}
      <div className="relative h-[220px] mb-5">
        {scatteredInsights.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute w-[180px] bg-[#F9F9F9] rounded-lg overflow-hidden shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]"
            style={{
              top: item.position.top,
              right: item.position.right,
              bottom: item.position.bottom,
              left: item.position.left,
              zIndex: item.zIndex,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
            transition={{
              delay: reducedMotion ? 0 : entranceDelay + i * stagger,
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
          >
            {/* Window chrome header */}
            <div className="px-2.5 py-1.5 flex items-center gap-1 bg-[#F5F5F5] border-b border-gray-200">
              <span className="w-[6px] h-[6px] rounded-full bg-[#FF5F56]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#FFBD2E]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#27CA40]" />
              <span
                className="material-icons-outlined text-[12px] ml-1.5"
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
              <span className="text-label font-medium text-gray-600">
                {item.page}
              </span>
            </div>
            {/* Page content */}
            <div className="px-2.5 py-2.5 bg-white">
              <span className="text-caption text-primary leading-tight block">{item.insight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <motion.button
          onClick={onTransition}
          className="btn-interactive btn-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ctaDelay, duration: 0.3 }}
        >
          <span className="material-icons-outlined">auto_awesome</span>
          What if it was all in one place?
        </motion.button>
      </div>
    </div>
  );
}
