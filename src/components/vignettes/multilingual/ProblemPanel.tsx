'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import { ProblemStack } from '@/components/vignettes/shared/ProblemStack';
import { ProblemStateLayout } from '@/components/vignettes/shared/ProblemStateLayout';
import Button from '@/components/Button';

interface ProblemPanelProps {
  onTransition: () => void;
}

interface CycleWindow {
  code: string;
  title: string;
  text: string;
}

// Three separate cycles - each language has its own cycle, shown as separate "windows"
const cycleWindows: CycleWindow[] = [
  {
    code: 'fr',
    title: 'Q1 Performance Cycle (French)',
    text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?",
  },
  {
    code: 'es',
    title: 'Q1 Performance Cycle (Spanish)',
    text: '¿Cómo se desempeñó esta persona durante este período de evaluación?',
  },
  {
    code: 'dv',
    title: 'Q1 Performance Cycle (Dhivehi)',
    text: 'މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟',
  }
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();

  const renderCycleWindow = (window: CycleWindow) => (
    <>
      {/* Window chrome - browser-like header */}
      <div className="px-3 py-2 bg-black/5 border-b border-border flex items-center gap-2">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]" />
        </div>
        {/* Window title */}
        <span className="text-caption font-medium text-secondary ml-2">
          {window.title}
        </span>
      </div>

      {/* Window content - translation field */}
      <div className="p-3">
        <p
          className="text-body-sm text-primary leading-relaxed"
          style={window.code === 'dv' ? { direction: 'rtl' } : undefined}
        >
          {window.text}
        </p>
      </div>
    </>
  );

  const ctaDelay = entranceDelay + cycleWindows.length * stagger + 0.1;

  return (
    <ProblemStateLayout
      button={
        <Button onClick={onTransition} enterDelay={ctaDelay}>
          Simplify
        </Button>
      }
    >
      {/* Mobile: Stacked windows */}
      <div className="flex flex-col gap-3 w-full lg:hidden">
        {cycleWindows.map((window, index) => (
          <motion.div
            key={window.code}
            className="w-full max-w-[340px] mx-auto bg-background-elevated rounded-lg border border-border-strong overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : entranceDelay + index * stagger,
              ease: 'easeOut' as const,
            }}
          >
            {renderCycleWindow(window)}
          </motion.div>
        ))}
      </div>

      {/* Desktop: Cascading stack */}
      <div className="hidden lg:block w-full">
        <ProblemStack
          items={cycleWindows}
          keyExtractor={(w) => w.code}
          renderItem={renderCycleWindow}
          cardClassName="bg-background-elevated"
          config={{
            maxVisible: 3,
            cardWidth: 340,
            xOffset: 40,
            yOffset: 20,
          }}
        />
      </div>
    </ProblemStateLayout>
  );
}
