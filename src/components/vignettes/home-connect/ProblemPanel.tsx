'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import { ProblemStateLayout } from '@/components/vignettes/shared/ProblemStateLayout';

interface InsightItem {
  id: string;
  page: string;
  icon: string;
  color: string;
  insight: string;
  urgencyLabel?: string;
}

const insights: InsightItem[] = [
  {
    id: 'performance',
    page: 'Performance',
    icon: 'trending_up',
    color: '#5F3361',
    insight: 'Feedback due in 3 days',
    urgencyLabel: 'Deadline',
  },
  {
    id: 'oneOnOnes',
    page: '1-on-1s',
    icon: 'people',
    color: '#10B981',
    insight: "Aisha's wellbeing dropped",
    urgencyLabel: 'Alert',
  },
  {
    id: 'goals',
    page: 'Goals',
    icon: 'flag',
    color: '#FFB600',
    insight: "Malik's goal is inactive",
    urgencyLabel: 'Stalled',
  },
];

export default function ProblemPanel() {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();

  // Scattered layout positions - suggesting disorganization
  const scatterPositions = [
    { x: '8%', y: '5%', rotate: -4 },
    { x: '38%', y: '35%', rotate: 2 },
    { x: '58%', y: '8%', rotate: 3 },
  ];

  const renderInsightCard = (item: InsightItem, isScattered = false) => (
    <div className="relative">
      {/* Urgency indicator - positioned outside card bounds */}
      {item.urgencyLabel && isScattered && (
        <span
          className="absolute -top-2 -right-2 z-10 text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white shadow-sm"
          style={{ backgroundColor: item.color }}
        >
          {item.urgencyLabel}
        </span>
      )}
      {/* Window chrome header */}
      <div className="px-3 py-2 flex items-center gap-1.5 bg-neutral-100 border-b border-border rounded-t-lg">
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
      <div className="px-3 py-3 bg-background-elevated rounded-b-lg">
        <span className="text-body-sm text-primary leading-snug block">{item.insight}</span>
      </div>
    </div>
  );

  return (
    <ProblemStateLayout>
      {/* Mobile: Stacked cards with subtle overlap */}
      <div className="relative w-full h-[260px] lg:hidden">
        {insights.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute w-[85%] max-w-[260px] bg-background-elevated rounded-lg overflow-hidden border border-border shadow-sm"
            style={{
              left: `${i * 6}%`,
              top: `${i * 28}px`,
              zIndex: 3 - i,
            }}
            initial={{ opacity: 0, y: 20, rotate: (i % 2 === 0 ? -2 : 2) }}
            animate={{
              opacity: 1 - i * 0.1,
              y: 0,
              rotate: (i % 2 === 0 ? -2 : 2)
            }}
            transition={{
              delay: reducedMotion ? 0 : entranceDelay + i * stagger,
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
          >
            {renderInsightCard(item)}
          </motion.div>
        ))}
        {/* Disconnection indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-caption text-tertiary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : entranceDelay + 0.6 }}
        >
          <span className="material-icons-outlined text-[14px]">link_off</span>
          <span>3 separate apps</span>
        </motion.div>
      </div>

      {/* Desktop: Scattered windows showing fragmentation */}
      <div className="hidden lg:block relative w-full h-[280px]">
        {insights.map((item, index) => {
          const pos = scatterPositions[index];
          return (
            <motion.div
              key={item.id}
              className="absolute bg-background-elevated rounded-lg border border-border/60 shadow-md cursor-default overflow-visible"
              style={{
                width: 200,
                left: pos.x,
                top: pos.y,
                zIndex: index + 1,
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                rotate: pos.rotate * 1.5,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: pos.rotate,
                y: 0
              }}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                zIndex: 10,
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
              }}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : entranceDelay + index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {renderInsightCard(item, true)}
            </motion.div>
          );
        })}

        {/* Visual connector lines (dashed) showing disconnection */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <motion.line
            x1="22%" y1="65%" x2="48%" y2="55%"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay: reducedMotion ? 0 : entranceDelay + 0.5, duration: 0.6 }}
          />
          <motion.line
            x1="52%" y1="55%" x2="68%" y2="48%"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay: reducedMotion ? 0 : entranceDelay + 0.65, duration: 0.6 }}
          />
        </svg>

        {/* Disconnection label */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-caption text-tertiary bg-background/80 px-3 py-1 rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : entranceDelay + 0.8 }}
        >
          <span className="material-icons-outlined text-[14px]">link_off</span>
          <span>Context scattered across 3 products</span>
        </motion.div>
      </div>
    </ProblemStateLayout>
  );
}
