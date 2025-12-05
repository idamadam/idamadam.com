'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import RichTextEditor from '../demos/RichTextEditor';
import { performanceAIContent } from '@/lib/vignette-data';

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

  const handleClose = () => {
    setAiState('before');
  };

  return (
    <VignetteContainer
      id="performance-ai"
      title={performanceAIContent.title}
      subtitle={performanceAIContent.description}
    >
      <div className="w-full max-w-2xl space-y-4">

        {/* Rich Text Editor with States */}
        <div className="space-y-2">
          <RichTextEditor
            content={performanceAIContent.beforeText}
            placeholder="Write feedback..."
            showImproveButton={true}
            onImprove={handleImprove}
            isImproving={isAnimating}
          />

          {/* Loading State - "Looking for ways to improve" */}
          <AnimatePresence>
            {aiState === 'improving' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
              >
                {/* Blurred background layer for glow effect */}
                <div className="absolute left-[2px] top-0 w-[calc(100%-2px)] h-16 border-2 border-[#a6e5e7] rounded-lg blur-[5px]" />

                {/* Content */}
                <div className="relative bg-white border-2 border-[#a6e5e7] rounded-lg px-5 w-full h-16 flex items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-[16px] text-[#2f2438] align-middle" style={{ verticalAlign: 'middle' }}>auto_awesome</span>
                    <span className="text-lg font-semibold text-[#2f2438] leading-6 whitespace-nowrap">
                      Looking for ways to improve
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Recommendations Panel */}
        <AnimatePresence>
          {aiState === 'after' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-[#a6e5e7] rounded-lg p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-icons-outlined text-[20px] text-[#2f2438]">auto_awesome</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold text-[#2f2438] leading-6">
                      {performanceAIContent.recommendations.length} suggested improvements
                    </span>
                    <span className="text-base font-normal text-[#2f2438] leading-6">
                      based on Culture Amp People Science
                    </span>
                  </div>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="material-icons-outlined text-[16px] text-[#2f2438]">close</span>
                </button>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                {performanceAIContent.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <p className="text-base leading-6 text-[#2f2438]">
                      <span className="font-semibold">{rec.title}</span>
                      <span className="font-normal"> {rec.description}</span>
                    </p>
                    {index < performanceAIContent.recommendations.length - 1 && (
                      <div className="h-px bg-[#eaeaec] mt-4" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#524e56]">Is this helpful?</span>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="material-icons-outlined text-[16px] text-[#2f2438]">thumb_up</span>
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="material-icons-outlined text-[16px] text-[#2f2438]">thumb_down</span>
                  </button>
                </div>
                <span className="text-sm text-[#524e56]">Review AI-generated suggestions for accuracy</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </VignetteContainer>
  );
}
