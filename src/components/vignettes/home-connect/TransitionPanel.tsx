'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { homeConnectContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface TransitionPanelProps {
  onComplete: () => void;
}

type TransitionState = 'scattered' | 'consolidating' | 'complete';

// Scattered positions for fragments (relative to center)
const fragmentPositions = [
  { x: -80, y: -60, rotate: -8 },
  { x: 80, y: -40, rotate: 6 },
  { x: -70, y: 60, rotate: -4 },
  { x: 90, y: 50, rotate: 10 }
];

export default function TransitionPanel({ onComplete }: TransitionPanelProps) {
  const { transitionContent } = homeConnectContent;
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>('scattered');

  const staggerDelay = reducedMotion ? 50 : 200;
  const fragmentCount = transitionContent.fragments.length;

  // Auto-start consolidation after a brief pause
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setState('consolidating');
    }, reducedMotion ? 200 : 600);

    return () => clearTimeout(startTimer);
  }, [reducedMotion]);

  // Move to complete state after consolidation finishes
  useEffect(() => {
    if (state !== 'consolidating') return;

    const completeTimer = setTimeout(() => {
      setState('complete');
    }, staggerDelay * fragmentCount + 600);

    return () => clearTimeout(completeTimer);
  }, [state, staggerDelay, fragmentCount]);

  // Auto-advance to solution after complete
  useEffect(() => {
    if (state !== 'complete') return;

    const advanceTimer = setTimeout(() => {
      onComplete();
    }, reducedMotion ? 300 : 800);

    return () => clearTimeout(advanceTimer);
  }, [state, onComplete, reducedMotion]);

  return (
    <div className="w-full bg-[#F9F9F9] rounded-xl overflow-hidden">
      {/* Purple header */}
      <div className="bg-[#5F3361] px-5 pt-4 pb-4 relative">
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-[11px] font-semibold">Culture Amp</span>
        </div>
        <h1 className="text-white text-[22px] font-bold leading-tight !m-0">Home</h1>
      </div>

      {/* Fragments area */}
      <div className="relative h-[280px] flex items-center justify-center">
        {transitionContent.fragments.map((fragment, index) => (
          <motion.div
            key={fragment.id}
            className="absolute flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md"
            initial={{
              x: fragmentPositions[index].x,
              y: fragmentPositions[index].y,
              rotate: fragmentPositions[index].rotate,
              scale: 1,
              opacity: 1
            }}
            animate={
              state === 'consolidating' || state === 'complete'
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: state === 'complete' ? 0 : 0.9,
                    opacity: state === 'complete' ? 0 : 1
                  }
                : undefined
            }
            transition={{
              delay: state === 'consolidating' ? index * (staggerDelay / 1000) : 0,
              duration: reducedMotion ? 0.2 : 0.5,
              ease: 'easeInOut'
            }}
          >
            <span
              className="material-icons-outlined text-[20px]"
              style={{ color: fragment.color }}
            >
              {fragment.icon}
            </span>
            <span className="text-[14px] font-medium text-gray-800">{fragment.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="px-5 pb-5">
        <motion.div
          className="flex items-center justify-center gap-2 py-3 text-[15px] text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#5F3361]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2 }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#5F3361]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.15 }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#5F3361]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
