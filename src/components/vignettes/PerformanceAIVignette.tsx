'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import Button from '../demos/Button';
import RichTextEditor from '../demos/RichTextEditor';
import { performanceAIContent } from '@/lib/vignette-data';
import { slideInFromRight, staggerContainer, staggerItem } from '@/lib/animations';

type AIState = 'before' | 'improving' | 'after';

export default function PerformanceAIVignette() {
  const [aiState, setAiState] = useState<AIState>('before');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (aiState === 'after') {
      const timer = setTimeout(() => {
        setAiState('before');
      }, 10000); // Reset after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [aiState]);

  const handleImprove = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAiState('improving');

    setTimeout(() => {
      setAiState('after');
      setIsAnimating(false);
    }, 1500);
  };

  const handleReset = () => {
    if (aiState === 'after') {
      setAiState('before');
    }
  };

  return (
    <VignetteContainer
      id="performance-ai"
      title={performanceAIContent.title}
    >
      <div className="w-full max-w-2xl space-y-4">
        {/* Before/After Editor */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {aiState === 'before' && (
              <motion.div
                key="before"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <RichTextEditor
                  content={performanceAIContent.beforeText}
                  placeholder="Write feedback..."
                />
              </motion.div>
            )}

            {aiState === 'improving' && (
              <motion.div
                key="improving"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center bg-white border border-black rounded-lg p-12"
              >
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 mx-auto mb-3 text-[#2c2c2c]" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p className="text-sm text-[#6b7280]">AI is improving your feedback...</p>
                </div>
              </motion.div>
            )}

            {aiState === 'after' && (
              <motion.div
                key="after"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleReset}
                className="cursor-pointer"
                title="Click to reset"
              >
                <RichTextEditor
                  content={performanceAIContent.afterText}
                  placeholder="Improved feedback..."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Improve Button */}
        {aiState === 'before' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleImprove}
              variant="secondary"
              disabled={isAnimating}
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
            >
              Improve
            </Button>
          </motion.div>
        )}

        {/* Suggestion Panel */}
        <AnimatePresence>
          {aiState === 'before' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-white border border-black rounded-lg p-4"
            >
              <p className="text-base font-medium mb-2 text-[#1a1d23]">Suggested improvements</p>
              <p className="text-sm text-[#6b7280]">{performanceAIContent.highlights.summary}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlights & Opportunities Panel */}
        <AnimatePresence>
          {aiState === 'after' && (
            <motion.div
              {...slideInFromRight}
              exit={{ x: 100, opacity: 0 }}
              className="bg-white border border-black rounded-lg p-4 space-y-4"
            >
              <motion.div {...staggerContainer}>
                <motion.h3 {...staggerItem} className="text-base font-bold text-[#1a1d23]">
                  Highlights & Opportunities
                </motion.h3>

                <motion.p {...staggerItem} className="text-base text-[#1a1d23] mt-2">
                  {performanceAIContent.highlights.summary}
                </motion.p>

                <motion.div {...staggerItem} className="mt-4 space-y-2">
                  <p className="text-base font-bold text-[#1a1d23]">Key Improvements</p>
                  {performanceAIContent.highlights.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-[#1a1d23]">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </VignetteContainer>
  );
}
