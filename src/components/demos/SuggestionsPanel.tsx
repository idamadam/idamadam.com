'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from './RichTextEditor';
import type { AISuggestionsContent } from '@/components/vignettes/ai-suggestions/content';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
}

type AIState = 'before' | 'improving' | 'after';

export default function SuggestionsPanel({ className = '', content }: SuggestionsPanelProps) {
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
    <>
      <style jsx global>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateGradient {
          to {
            --gradient-angle: 360deg;
          }
        }

        .loading-card-container {
          position: relative;
          width: 100%;
          height: 64px;
          border-radius: 8px;
          padding: 2px;
        }

        .loading-card-border {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: conic-gradient(
            from var(--gradient-angle),
            #A6E5E7,
            #64D2D7,
            #9A36B2,
            #64D2D7,
            #A6E5E7
          );
          animation: rotateGradient 3s linear infinite;
          filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.5));
        }

        .loading-card-content {
          position: relative;
          background: white;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          z-index: 1;
        }

        .recommendation-panel {
          position: relative;
          border-radius: 7px;
          padding: 2px;
          background: linear-gradient(135deg, #A6E5E7, #64D2D7, #9A36B2);
        }

        .recommendation-content {
          background: white;
          border-radius: 5px;
          padding: 24px;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-card-border {
            animation: none;
            filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.3));
          }
        }
      `}</style>
      <div className={`space-y-2 font-[family-name:var(--font-inter)] ${className}`}>
        {/* Rich Text Editor with Improve Button */}
        <div className="space-y-2">
          <RichTextEditor
            content={content.beforeText}
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
                {/* Animated border gradient card */}
                <div className="loading-card-container">
                  <div className="loading-card-border"></div>
                  <div className="loading-card-content">
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-[16px] text-[#2f2438] align-middle" style={{ verticalAlign: 'middle' }}>auto_awesome</span>
                      <span className="text-lg font-semibold text-[#2f2438] leading-6 whitespace-nowrap">
                        Looking for ways to improve
                      </span>
                    </div>
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
              className="recommendation-panel"
            >
              <div className="recommendation-content space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-outlined text-[20px] text-[#2f2438]">auto_awesome</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold text-[#2f2438] leading-6">
                        {content.recommendations.length} suggested improvements
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
                  {content.recommendations.map((rec, index) => (
                    <div key={index}>
                      <p className="text-base leading-6 text-[#2f2438]">
                        <span className="font-semibold">{rec.title}</span>
                        <span className="font-normal"> {rec.description}</span>
                      </p>
                      {index < content.recommendations.length - 1 && (
                        <div className="h-px bg-[#eaeaec] mt-4" />
                      )}
                    </div>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
