'use client';

import { motion } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import Button from '@/components/Button';

interface ProblemPanelProps {
  onTransition: () => void;
}

// Three separate cycles - each language has its own cycle, shown as separate "windows"
const cycleWindows = [
  {
    code: 'fr',
    title: 'Q1 Performance Cycle (French)',
    text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?",
    position: { rotate: -2, x: 0 }
  },
  {
    code: 'es',
    title: 'Q1 Performance Cycle (Spanish)',
    text: '¿Cómo se desempeñó esta persona durante este período de evaluación?',
    position: { rotate: 1, x: 0 }
  },
  {
    code: 'dv',
    title: 'Q1 Performance Cycle (Dhivehi)',
    text: 'މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟',
    position: { rotate: -1, x: 0 }
  }
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { stagger, reducedMotion } = useVignetteEntrance();

  return (
    <div className="w-full space-y-4">
      {/* 3 separate browser-like windows stacked */}
      <div className="bg-background-subtle border-2 border-dashed border-border rounded-lg p-4 flex flex-col gap-3 items-center">
        {cycleWindows.map((window, index) => (
          <motion.div
            key={window.code}
            className="w-full max-w-[340px] bg-background-elevated rounded-lg border border-border shadow-sm overflow-hidden"
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: reducedMotion ? 0 : window.position.rotate
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: reducedMotion ? 0 : index * stagger,
            }}
          >
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
          </motion.div>
        ))}

        <Button onClick={onTransition}>
          Unify them
        </Button>
      </div>
    </div>
  );
}
