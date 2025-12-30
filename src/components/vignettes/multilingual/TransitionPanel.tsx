'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { multilingualContent } from './content';

interface TransitionPanelProps {
  onComplete: () => void;
}

type TransitionState = 'stacking' | 'unified' | 'complete';

const cycleWindows = [
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

// Pre-defined shadow classes for each card depth (avoids animating boxShadow)
const stackedShadows = [
  'shadow-[0_4px_10px_rgba(0,0,0,0.1)]',
  'shadow-[0_7px_15px_rgba(0,0,0,0.13)]',
  'shadow-[0_10px_20px_rgba(0,0,0,0.16)]'
];

export default function TransitionPanel({ onComplete }: TransitionPanelProps) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>('stacking');

  const stackDuration = reducedMotion ? 200 : 500;
  const unifiedDuration = reducedMotion ? 300 : 700;

  useEffect(() => {
    const stackTimer = setTimeout(() => {
      setState('unified');
    }, stackDuration);

    return () => clearTimeout(stackTimer);
  }, [stackDuration]);

  useEffect(() => {
    if (state !== 'unified') return;

    const completeTimer = setTimeout(() => {
      setState('complete');
      onComplete();
    }, unifiedDuration);

    return () => clearTimeout(completeTimer);
  }, [state, unifiedDuration, onComplete]);

  const isStacked = state === 'unified' || state === 'complete';

  // Match actual rendered layout from ProblemPanel
  // Window height ~105px (header 40px + content ~65px), gap 12px
  const windowHeight = 105;
  const gapSize = 12;

  return (
    <div className="w-full">
      {/* Stacking windows */}
      <div className="relative h-[320px] flex items-center justify-center">
        {cycleWindows.map((window, index) => {
          const startY = index * (windowHeight + gapSize);
          const endY = index * 8;
          const endRotate = (index - 1) * 2;
          const initialRotate = [-2, 1, -1][index];

          return (
            <motion.div
              key={window.code}
              className={`absolute w-full max-w-[340px] bg-background-elevated rounded-lg border border-border overflow-hidden transition-shadow duration-300 ease-out ${
                isStacked ? stackedShadows[index] : 'shadow-sm'
              }`}
              style={{
                zIndex: 3 - index,
                willChange: 'transform, opacity',
              }}
              initial={{
                y: startY - 95,
                rotate: initialRotate,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                y: isStacked ? endY : startY - 95,
                rotate: isStacked ? endRotate : initialRotate,
                scale: isStacked ? 1 - index * 0.03 : 1,
                opacity: isStacked && index > 0 ? 0.6 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                delay: reducedMotion ? 0 : (2 - index) * 0.05,
              }}
            >
              {/* Window chrome */}
              <div className="px-3 py-2 bg-white/10 border-b border-border flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]" />
                </div>
                <span className="text-caption font-medium text-secondary ml-2">
                  {isStacked && index === 0
                    ? 'Q1 Performance Cycle'
                    : window.title}
                </span>
              </div>

              <div className="p-3">
                <p
                  className="text-body-sm text-primary leading-relaxed"
                  style={window.code === 'dv' ? { direction: 'rtl' } : undefined}
                >
                  {window.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
