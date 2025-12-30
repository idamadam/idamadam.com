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
      <div className="flex flex-col gap-3 items-center">
        {cycleWindows.map((window, index) => (
          <motion.div
            key={window.code}
            className="w-full max-w-[340px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
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
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]" />
              </div>
              {/* Window title */}
              <span className="text-caption font-medium text-gray-600 ml-2">
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
      </div>

      {/* Caption + CTA */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <p className="text-caption text-gray-400 text-center">
          3 separate cycles. 3 separate places to manage.
        </p>
        <Button onClick={onTransition}>
          Unify them
        </Button>
      </div>
    </div>
  );
}
