'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { multilingualContent } from './content';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';

interface ProblemPanelProps {
  onTransition: () => void;
}

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { problemCards } = multilingualContent;
  const { entranceDelay, stagger, reducedMotion } = useVignetteEntrance();
  const [expanded, setExpanded] = useState(false);
  const [stage, setStage] = useState(0);

  // Convert entrance delay to ms and add to auto-play sequence
  const baseDelay = reducedMotion ? 0 : entranceDelay * 1000;

  useEffect(() => {
    const timers = [
      setTimeout(() => setExpanded(true), baseDelay + 600),
      setTimeout(() => setStage(1), baseDelay + 600),
      setTimeout(() => setStage(2), baseDelay + 1400),
      setTimeout(() => setStage(3), baseDelay + 2000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [baseDelay]);

  return (
    <div className="relative">
      {/* Parent task card */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Main task header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
            <div>
              <div className="text-body-sm font-medium text-gray-800">
                Run Q1 Performance Cycle
              </div>
              <div className="text-caption text-gray-400">
                Admin task
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="material-icons-outlined text-[20px] text-gray-400">
              expand_more
            </span>
          </motion.div>
        </div>

        {/* Subtasks (expand to reveal) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="border-t border-gray-100 bg-gray-50"
            >
              <div className="p-3 space-y-2">
                <div className="text-label text-gray-400 uppercase tracking-wide px-1 mb-2">
                  Requires separate cycle for each language
                </div>
                {problemCards.map((card, index) => (
                  <motion.div
                    key={card.code}
                    className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * stagger }}
                  >
                    <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0" />
                    <span className="text-body-sm text-gray-700">
                      {card.name} cycle
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle context line */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            className="text-caption text-gray-400 mt-4 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Repeated every quarter, for every language.
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <AnimatePresence>
        {stage >= 3 && (
          <div className="flex justify-center">
            <motion.button
              onClick={onTransition}
              className="btn-interactive btn-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="material-icons-outlined">auto_awesome</span>
              See the solution
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
