'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import Button from '@/components/Button';

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
    // Top center, tilted left (card is 180px wide, so offset by 90px)
    position: { top: 0, left: 'calc(50% - 90px)' },
    rotate: -3,
    zIndex: 1,
  },
  {
    id: 'oneOnOnes',
    page: '1-on-1s',
    icon: 'people',
    color: '#10B981',
    insight: "Aisha's wellbeing dropped",
    // Bottom left
    position: { bottom: 0, left: '10%' },
    rotate: 2,
    zIndex: 2,
  },
  {
    id: 'goals',
    page: 'Goals',
    icon: 'flag',
    color: '#FFB600',
    insight: "Malik's goal is inactive",
    // Bottom right
    position: { bottom: 0, right: '10%' },
    rotate: -2,
    zIndex: 3,
  },
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();

  // CTA appears after all cards have animated in
  const ctaDelay = reducedMotion ? 0 : entranceDelay + scatteredInsights.length * stagger + 0.1;

  return (
    <div className="relative min-h-[300px] lg:min-h-[360px] flex flex-col items-center justify-center p-4">
      {/* Mobile: Stacked cards */}
      <div className="flex flex-col gap-3 w-full mb-4 lg:hidden">
        {scatteredInsights.map((item, i) => (
          <motion.div
            key={item.id}
            className="w-full bg-background-elevated rounded-lg overflow-hidden border border-border-strong"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: reducedMotion ? 0 : entranceDelay + i * stagger,
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
          >
            {/* Window chrome header */}
            <div className="px-3 py-2 flex items-center gap-1.5 bg-neutral-100 border-b border-border">
              <span className="w-[6px] h-[6px] rounded-full bg-[#FF5F56]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#FFBD2E]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#27CA40]" />
              <span
                className="material-icons-outlined text-[14px] ml-1"
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
              <span className="text-caption font-semibold text-primary">
                {item.page}
              </span>
            </div>
            {/* Page content */}
            <div className="px-3 py-3 bg-background-elevated">
              <span className="text-body-sm text-primary leading-snug block">{item.insight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Scattered page cards */}
      <div className="relative h-[220px] w-full hidden lg:block">
        {scatteredInsights.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute w-[180px] bg-background-elevated rounded-lg overflow-hidden border border-border-strong"
            style={{
              top: item.position.top,
              right: item.position.right,
              bottom: item.position.bottom,
              left: item.position.left,
              zIndex: item.zIndex,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: reducedMotion ? 0 : entranceDelay + i * stagger,
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
          >
            {/* Window chrome header */}
            <div className="px-3 py-2 flex items-center gap-1.5 bg-neutral-100 border-b border-border">
              <span className="w-[6px] h-[6px] rounded-full bg-[#FF5F56]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#FFBD2E]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#27CA40]" />
              <span
                className="material-icons-outlined text-[14px] ml-1"
                style={{ color: item.color }}
              >
                {item.icon}
              </span>
              <span className="text-caption font-semibold text-primary">
                {item.page}
              </span>
            </div>
            {/* Page content */}
            <div className="px-3 py-3 bg-background-elevated">
              <span className="text-body-sm text-primary leading-snug block">{item.insight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={onTransition}
          enterDelay={ctaDelay}
        >
          Connect them
        </Button>
      </div>
    </div>
  );
}
