'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import Button from '@/components/Button';

interface ProblemPanelProps {
  onTransition: () => void;
}

const languageData = [
  { code: 'fr', name: 'Q1 Performance Cycle (French)', text: "Comment cette personne a-t-elle performé au cours de cette période d'évaluation?", updated: 'Updated today' },
  { code: 'es', name: 'Q1 Performance Cycle (Spanish)', text: '¿Cómo se desempeñó esta persona durante este período de evaluación?', updated: 'Updated 3d ago' },
  { code: 'dv', name: 'Q1 Performance Cycle (Dhivehi)', text: 'މި މީހާ މި ރިވިއު ތެރޭގައި ކިހިނެއް ކުރިއަރައިފި؟', updated: 'Updated 2w ago' }
];

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();
  const [showCaption, setShowCaption] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const baseDelay = reducedMotion ? 0 : entranceDelay * 1000;

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowCaption(true), baseDelay + 600),
      setTimeout(() => setShowCta(true), baseDelay + 1000)
    ];
    return () => timers.forEach(clearTimeout);
  }, [baseDelay]);

  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[360px] flex flex-col items-center justify-center p-4">
      {/* Three fragmented translation panels */}
      <div className="flex flex-col gap-2 w-full">
        {languageData.map((lang, index) => (
          <motion.div
            key={lang.code}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : index * stagger,
              ease: 'easeOut'
            }}
          >
            {/* Language header */}
            <div className="px-2.5 py-1.5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-caption font-medium text-gray-700">{lang.name}</span>
                <span className="text-caption text-gray-400">{lang.updated}</span>
              </div>
            </div>

            {/* Translation field */}
            <div className="p-2.5">
              <div
                className="text-caption text-gray-700 leading-relaxed bg-gray-50 rounded px-2 py-1.5 border border-gray-100"
                style={lang.code === 'dv' ? { direction: 'rtl' } : undefined}
              >
                {lang.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Caption */}
      <AnimatePresence>
        {showCaption && (
          <motion.div
            className="text-caption text-gray-400 mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Same content, managed in 3 separate places.
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <AnimatePresence>
        {showCta && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={onTransition}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Unify them
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
