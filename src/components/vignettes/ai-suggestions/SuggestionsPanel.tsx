'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import type { AISuggestionsContent, BorderSettings } from './content';
import type { DecisionStory } from '../shared/DecisionStories';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  activeStory?: DecisionStory | null;
  borderSettings?: BorderSettings;
}

// Global styles for animated gradient border
function GradientBorderStyles() {
  return (
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

      .suggestions-loading-border,
      .suggestions-animated-border {
        position: absolute;
        inset: 0;
        border-radius: 7px;
        background: conic-gradient(
          from var(--gradient-angle),
          var(--ai-gradient-1),
          var(--ai-gradient-2),
          var(--ai-gradient-3),
          var(--ai-gradient-2),
          var(--ai-gradient-1)
        );
        animation: rotateGradient var(--rotation-speed, 3s) linear infinite;
        isolation: isolate;
      }

      .suggestions-loading-border::before,
      .suggestions-animated-border::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 7px;
        background: conic-gradient(
          from var(--gradient-angle),
          var(--ai-gradient-1),
          var(--ai-gradient-2),
          var(--ai-gradient-3),
          var(--ai-gradient-2),
          var(--ai-gradient-1)
        );
        filter: blur(3rem);
        opacity: var(--glow-opacity, 0.6);
        z-index: -1;
        animation: rotateGradient var(--rotation-speed, 3s) linear infinite;
      }

      .suggestions-loading-content {
        position: relative;
        background: var(--background-elevated);
        width: 100%;
        height: 100%;
        border-radius: 5px;
        z-index: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .suggestions-loading-border,
        .suggestions-animated-border,
        .suggestions-loading-border::before,
        .suggestions-animated-border::before {
          animation: none;
        }
      }
    `}</style>
  );
}

function LoadingPanel() {
  return (
    <>
      <GradientBorderStyles />
      <div className="relative p-[2px] rounded-[7px]">
        <div className="suggestions-loading-border"></div>
        <div className="suggestions-loading-content px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-h3 text-primary">
              auto_awesome
            </span>
            <span className="text-lg font-semibold text-primary">
              Looking for ways to improve...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// Get opacity style for story-driven highlighting
function getBlockStyle(
  sectionNumber: number,
  activeStory: DecisionStory | null
) {
  if (!activeStory || !activeStory.highlightSection) {
    return undefined;
  }
  const isActive = activeStory.highlightSection === sectionNumber;
  return {
    opacity: isActive ? 1 : 0.4,
    transition: 'opacity 0.3s ease-in-out',
  };
}

interface RecommendationsPanelProps {
  content: AISuggestionsContent;
  activeStory?: DecisionStory | null;
  borderSettings?: BorderSettings;
}

function RecommendationsPanel({
  content,
  activeStory = null,
  borderSettings,
}: RecommendationsPanelProps) {
  const isBorderHighlighted = activeStory?.highlightSection === 2;

  const borderOverrides =
    isBorderHighlighted && borderSettings
      ? ({
          '--ai-gradient-1': borderSettings.colors[0],
          '--ai-gradient-2': borderSettings.colors[1],
          '--ai-gradient-3': borderSettings.colors[2],
          '--rotation-speed': `${borderSettings.speed}s`,
          '--glow-opacity': borderSettings.glow,
        } as React.CSSProperties)
      : undefined;

  return (
    <div
      className="relative rounded-[7px] p-[2px]"
      style={{ ...getBlockStyle(2, activeStory), ...borderOverrides }}
    >
      {/* Static gradient border (default state) */}
      <div
        className="absolute inset-0 rounded-[7px] transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
          opacity: isBorderHighlighted ? 0 : 1,
        }}
      />
      {/* Animated gradient border (highlighted state) */}
      <div
        className={`suggestions-animated-border transition-opacity duration-300 ${
          isBorderHighlighted ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="bg-background-elevated rounded-[5px] px-6 py-6 space-y-6 relative z-10">
        {/* Header */}
        <div
          className="flex items-start gap-2 transition-opacity duration-300"
          style={{ opacity: isBorderHighlighted ? 0.4 : 1 }}
        >
          <span className="material-icons-outlined text-h3 text-primary mt-0.5">
            auto_awesome
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-primary leading-6">
              {content.recommendations.length} suggested improvements
            </span>
            <span className="text-sm font-normal text-secondary leading-5">
              based on Culture Amp People Science
            </span>
          </div>
        </div>

        {/* Recommendations */}
        <div
          className="space-y-6 transition-opacity duration-300"
          style={{ opacity: isBorderHighlighted ? 0.4 : (getBlockStyle(3, activeStory)?.opacity ?? 1) }}
        >
          {content.recommendations.map((rec, index) => (
            <div key={index}>
              <p className="text-base leading-6 text-primary">
                <span className="font-semibold">{rec.title}</span>
                <span className="font-normal"> {rec.description}</span>
              </p>
              {index < content.recommendations.length - 1 && (
                <div className="h-px bg-border mt-4" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center pt-2 transition-opacity duration-300"
          style={{ opacity: isBorderHighlighted ? 0.4 : 1 }}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary">Is this helpful?</span>
            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
              <span className="material-icons-outlined text-body-sm text-primary">
                thumb_up
              </span>
            </button>
            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
              <span className="material-icons-outlined text-body-sm text-primary">
                thumb_down
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuggestionsPanel({
  content,
  activeStory = null,
  borderSettings,
}: SuggestionsPanelProps) {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();
  const [showLoading, setShowLoading] = useState(true);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isComplete && showLoading && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const entranceDelay = reducedMotion ? 0 : 600;
      const loadingDuration = reducedMotion ? 0 : 1500;

      setTimeout(() => {
        setTimeout(() => {
          setShowLoading(false);
        }, loadingDuration);
      }, entranceDelay);
    }
  }, [isComplete, showLoading, reducedMotion]);

  return (
    <div className="space-y-2 flex flex-col overflow-visible">
      <GradientBorderStyles />
      {/* Editor — always visible */}
      <div style={activeStory?.highlightSection === 1 ? { transition: 'opacity 0.3s ease-in-out' } : getBlockStyle(1, activeStory)}>
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={showLoading}
          isImproveActivated={!showLoading}
          mobileFormatting="dots"
          dimmed={activeStory?.highlightSection === 1}
        />
      </div>

      {/* Panel below — animates between loading and recommendations */}
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'visible' }}
          >
            <LoadingPanel />
          </motion.div>
        )}
        {!showLoading && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'visible' }}
          >
            <RecommendationsPanel
              content={content}
              activeStory={activeStory}
              borderSettings={borderSettings}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
