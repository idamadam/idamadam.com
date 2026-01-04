'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import { ProblemStack } from '@/components/vignettes/shared/ProblemStack';
import { ProblemStateLayout } from '@/components/vignettes/shared/ProblemStateLayout';
import Button from '@/components/Button';

interface ProblemPanelProps {
  onTransition: () => void;
}

interface InsightItem {
  id: string;
  page: string;
  icon: string;
  color: string;
  insight: string;
}

const insights: InsightItem[] = [
  {
    id: 'performance',
    page: 'Performance',
    icon: 'trending_up',
    color: '#5F3361',
    insight: 'Feedback due in 3 days',
  },
  {
    id: 'oneOnOnes',
    page: '1-on-1s',
    icon: 'people',
    color: '#10B981',
    insight: "Aisha's wellbeing dropped",
  },
  {
    id: 'goals',
    page: 'Goals',
    icon: 'flag',
    color: '#FFB600',
    insight: "Malik's goal is inactive",
  },
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();

  // CTA appears after all cards have animated in
  const ctaDelay = reducedMotion ? 0 : entranceDelay + insights.length * stagger + 0.1;

  const renderInsightCard = (item: InsightItem) => (
    <>
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
    </>
  );

  return (
    <ProblemStateLayout
      button={
        <Button onClick={onTransition} enterDelay={ctaDelay}>
          Connect them
        </Button>
      }
    >
      {/* Mobile: Stacked cards */}
      <div className="flex flex-col gap-3 w-full lg:hidden">
        {insights.map((item, i) => (
          <motion.div
            key={item.id}
            className="w-full bg-background-elevated rounded-lg overflow-hidden border border-border-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : entranceDelay + i * stagger,
              duration: 0.4,
              ease: 'easeOut' as const,
            }}
          >
            {renderInsightCard(item)}
          </motion.div>
        ))}
      </div>

      {/* Desktop: Cascading stack */}
      <div className="hidden lg:block w-full">
        <ProblemStack
          items={insights}
          keyExtractor={(item) => item.id}
          renderItem={renderInsightCard}
          cardClassName="bg-background-elevated"
          config={{
            maxVisible: 3,
            cardWidth: 240,
            xOffset: 64,
            yOffset: 32,
          }}
        />
      </div>
    </ProblemStateLayout>
  );
}
