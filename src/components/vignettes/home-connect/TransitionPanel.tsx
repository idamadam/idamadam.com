'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface TransitionPanelProps {
  onComplete: () => void;
}

type TransitionState = 'scattered' | 'consolidating' | 'complete';

// Same cards as ProblemPanel, with scattered positions for transition
const scatteredCards = [
  {
    id: 'performance',
    page: 'Performance',
    icon: 'trending_up',
    color: '#5F3361',
    insight: 'Feedback due in 3 days',
    // Scattered position (top-right area)
    scattered: { x: 60, y: -50, rotate: -2 },
  },
  {
    id: 'oneOnOnes',
    page: '1-on-1s',
    icon: 'people',
    color: '#10B981',
    insight: "Aisha's wellbeing dropped",
    // Scattered position (left-middle area)
    scattered: { x: -70, y: 0, rotate: 1 },
  },
  {
    id: 'goals',
    page: 'Goals',
    icon: 'flag',
    color: '#FFB600',
    insight: "Malik's goal is inactive",
    // Scattered position (bottom-right area)
    scattered: { x: 40, y: 60, rotate: -1 },
  },
];

export default function TransitionPanel({ onComplete }: TransitionPanelProps) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>('scattered');

  const staggerDelay = reducedMotion ? 50 : 150;

  // Auto-start consolidation immediately
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setState('consolidating');
    }, reducedMotion ? 100 : 200);

    return () => clearTimeout(startTimer);
  }, [reducedMotion]);

  // Move to complete state after consolidation finishes
  useEffect(() => {
    if (state !== 'consolidating') return;

    const completeTimer = setTimeout(() => {
      setState('complete');
    }, reducedMotion ? 200 : 500);

    return () => clearTimeout(completeTimer);
  }, [state, reducedMotion]);

  // Auto-advance to solution after complete
  useEffect(() => {
    if (state !== 'complete') return;

    const advanceTimer = setTimeout(() => {
      onComplete();
    }, reducedMotion ? 100 : 250);

    return () => clearTimeout(advanceTimer);
  }, [state, onComplete, reducedMotion]);

  return (
    <motion.div
      className="w-full bg-[#F9F9F9] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Purple header */}
      <motion.div
        className="bg-[#5F3361] px-5 pt-4 pb-4 relative rounded-t-2xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-label font-semibold">Culture Amp</span>
        </div>
        <h1 className="text-white text-h3 font-bold leading-tight !m-0">Home</h1>
      </motion.div>

      {/* Cards consolidating area */}
      <div className="relative h-[220px] flex items-center justify-center">
        {scatteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute w-[180px] bg-[#F9F9F9] rounded-lg overflow-hidden shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]"
            initial={{
              x: card.scattered.x,
              y: card.scattered.y,
              rotate: card.scattered.rotate,
              opacity: 1,
            }}
            animate={
              state === 'consolidating' || state === 'complete'
                ? {
                    x: 0,
                    y: index * 8 - 8, // Stack them slightly
                    rotate: 0,
                    opacity: state === 'complete' ? 0 : 1,
                  }
                : undefined
            }
            transition={{
              delay: state === 'consolidating' ? index * (staggerDelay / 1000) : 0,
              duration: reducedMotion ? 0.15 : 0.3,
              ease: 'easeOut',
            }}
            style={{ zIndex: 3 - index }}
          >
            {/* Window chrome header */}
            <div className="px-3 py-2 flex items-center gap-1.5 bg-[#F5F5F5] border-b border-gray-200">
              <span className="w-[6px] h-[6px] rounded-full bg-[#FF5F56]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#FFBD2E]" />
              <span className="w-[6px] h-[6px] rounded-full bg-[#27CA40]" />
              <span
                className="material-icons-outlined text-[14px] ml-1"
                style={{ color: card.color }}
              >
                {card.icon}
              </span>
              <span className="text-caption font-semibold text-primary">
                {card.page}
              </span>
            </div>
            {/* Page content */}
            <div className="px-3 py-3 bg-white">
              <span className="text-body-sm text-primary leading-snug block">
                {card.insight}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="px-5 pb-5">
        <motion.div
          className="flex items-center justify-center gap-2 py-3 text-body-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
    </motion.div>
  );
}
