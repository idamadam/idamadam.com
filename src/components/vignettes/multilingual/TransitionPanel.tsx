'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { multilingualContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface TransitionPanelProps {
  onComplete: () => void;
}

type TransitionState = 'ready' | 'translating' | 'complete';

export default function TransitionPanel({ onComplete }: TransitionPanelProps) {
  const { transitionContent } = multilingualContent;
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>('ready');
  const [visibleTranslations, setVisibleTranslations] = useState<number[]>([]);

  const staggerDelay = reducedMotion ? 100 : 400;

  const handleTranslate = useCallback(() => {
    if (state !== 'ready') return;
    setState('translating');
  }, [state]);

  useEffect(() => {
    if (state !== 'translating') return;

    const timers: NodeJS.Timeout[] = [];

    transitionContent.languages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleTranslations(prev => [...prev, index]);
      }, staggerDelay * (index + 1));
      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      setState('complete');
    }, staggerDelay * (transitionContent.languages.length + 1));
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [state, staggerDelay, transitionContent.languages]);

  return (
    <div className="w-full space-y-5">
      {/* Source question */}
      <div className="space-y-2">
        <label className="text-[14px] font-semibold text-[#2f2438]">
          {transitionContent.sourceLabel}
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-[15px] text-gray-700">
            {transitionContent.sourceQuestion}
          </p>
        </div>
      </div>

      {/* Language rows */}
      <div className="space-y-3">
        {transitionContent.languages.map((lang, index) => (
          <div
            key={lang.code}
            className="flex items-start gap-4 p-3 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex-shrink-0 w-20">
              <span className="text-[13px] font-medium text-gray-600">
                {lang.name}
              </span>
            </div>
            <div className="flex-1 min-h-[24px]">
              <AnimatePresence mode="wait">
                {visibleTranslations.includes(index) ? (
                  <motion.p
                    key="translation"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: 'easeOut' }}
                    className="text-[14px] text-gray-800"
                    style={{ direction: lang.code === 'dv' ? 'rtl' : 'ltr' }}
                  >
                    {lang.translation}
                  </motion.p>
                ) : state === 'translating' ? (
                  <motion.div
                    key="shimmer"
                    className="h-5 bg-gray-100 rounded animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <span className="text-[14px] text-gray-400 italic">
                    Translation will appear here
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <AnimatePresence mode="wait">
        {state === 'complete' ? (
          <motion.button
            key="continue"
            onClick={onComplete}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-[15px]"
            style={{ backgroundColor: '#0168b3' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {transitionContent.continueLabel}
            <span className="material-icons-outlined text-[18px]">arrow_forward</span>
          </motion.button>
        ) : (
          <motion.button
            key="translate"
            onClick={handleTranslate}
            disabled={state === 'translating'}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-[15px] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#0168b3' }}
            whileHover={state === 'ready' ? { scale: 1.02 } : undefined}
            whileTap={state === 'ready' ? { scale: 0.98 } : undefined}
          >
            {state === 'translating' ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {transitionContent.ctaLoadingLabel}
              </>
            ) : (
              <>
                <span className="material-icons-outlined text-[18px]">bolt</span>
                {transitionContent.ctaLabel}
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
