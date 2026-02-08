'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { DecisionStory } from '../shared/DecisionStories';
import { aiHighlightsContent, FeedbackSource } from './content';

interface HighlightsPanelProps {
  className?: string;
  activeStory?: DecisionStory | null;
}

interface SourceCardProps {
  source: FeedbackSource;
}

function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="pt-4 border-t border-border">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-1 mb-3 sm:hidden">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: getAvatarColor(source.reviewer) }}
          >
            {getInitials(source.reviewer)}
          </div>
          <span className="text-body-sm font-semibold text-primary">
            {source.reviewer}
          </span>
        </div>
        <div className="flex items-center gap-2 text-caption text-secondary">
          <span>{source.reviewerRole}</span>
        </div>
      </div>
      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: getAvatarColor(source.reviewer) }}
        >
          {getInitials(source.reviewer)}
        </div>
        <span className="text-body-sm font-semibold text-primary">
          {source.reviewer}
        </span>
        <span className="text-caption text-secondary">•</span>
        <span className="text-caption text-secondary">
          {source.reviewerRole}
        </span>
      </div>
      <p className="text-body-sm text-primary mb-3">{source.quote}</p>
    </div>
  );
}

// Helper functions for avatar colors
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors: Record<string, string> = {
    'David Park': '#6366F1',
    'Rachel Torres': '#EC4899',
    'James Liu': '#10B981',
    'Priya Sharma': '#F59E0B',
    'Kevin Wright': '#8B5CF6',
  };
  return colors[name] || '#6366F1';
}

function LoadingState() {
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

        .loading-panel-border {
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
          animation: rotateGradient 3s linear infinite;
          filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.5));
        }

        .loading-panel-content {
          position: relative;
          background: var(--background-elevated);
          width: 100%;
          height: 100%;
          border-radius: 5px;
          z-index: 1;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .skeleton-bar {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.06) 25%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.06) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-panel-border {
            animation: none;
            filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.3));
          }
          .skeleton-bar {
            animation: none;
          }
        }
      `}</style>

      <div className="relative p-[2px] rounded-[7px]">
        <div className="loading-panel-border"></div>
        <div className="loading-panel-content">
          {/* Header Section */}
          <div className="border-b-2 border-border px-6 py-8">
            <p className="text-body-sm font-semibold text-primary mb-3">
              Loading highlights and opportunities
            </p>
            <div className="space-y-3">
              <div className="skeleton-bar h-[15px] w-full rounded-[7px]" />
              <div className="skeleton-bar h-[15px] w-full rounded-[7px]" />
              <div className="skeleton-bar h-[15px] w-[85%] rounded-[7px]" />
            </div>
          </div>

          {/* Skeleton Items */}
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`px-6 py-8 ${index < 2 ? 'border-b-2 border-border' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-1">
                    <div className="skeleton-bar w-5 h-5 rounded-full" />
                    <div className="skeleton-bar h-[15px] w-20 sm:w-[85px] rounded-[7px]" />
                  </div>
                  <div className="skeleton-bar h-[15px] w-full max-w-[240px] rounded-[7px]" />
                </div>
                <div className="flex items-center gap-4 sm:gap-12">
                  <div className="flex items-center gap-1">
                    <div className="skeleton-bar w-5 h-5 rounded-full" />
                    <div className="skeleton-bar h-[15px] w-14 sm:w-[60px] rounded-[7px]" />
                  </div>
                  <div className="skeleton-bar w-5 h-5 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface SolutionStateProps {
  className?: string;
  activeStory?: DecisionStory | null;
}

function SolutionState({
  className = '',
  activeStory = null,
}: SolutionStateProps) {
  const [highlightExpanded, setHighlightExpanded] = useState(false);
  const [opportunityExpanded, setOpportunityExpanded] = useState(false);

  const highlightedSection = activeStory?.highlightSection ?? null;

  // Auto-expand highlight sources for the trust-verification story
  useEffect(() => {
    if (activeStory?.id === 'trust-verification') {
      setHighlightExpanded(true);
    } else {
      setHighlightExpanded(false);
    }
  }, [activeStory]);

  const { employee, summary, highlights, opportunities } = aiHighlightsContent;
  const highlight = highlights[0];
  const opportunity = opportunities[0];

  // Get block-level style: dimming + optional background highlight
  const getBlockStyle = (sectionNumber: number) => {
    const transition = 'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out';

    if (!activeStory) {
      return { opacity: 1, transition };
    }

    // Process story (no highlightSection) — dim everything
    if (highlightedSection == null) {
      return { opacity: 0.4, transition };
    }

    // Section-specific story — spotlight the matching block
    if (sectionNumber === highlightedSection) {
      return {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '8px',
        transition,
      };
    }

    // Non-matching block — dim
    return { opacity: 0.4, transition };
  };

  const getFooterStyle = () => {
    const transition = 'opacity 0.3s ease-in-out';
    if (!activeStory) return { opacity: 1, transition };
    return { opacity: 0.4, transition };
  };

  return (
    <div
      className={`relative rounded-[7px] p-[2px] ${className}`}
      style={{
        background:
          'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
      }}
    >
      <div className="bg-background-elevated rounded-[5px] overflow-visible">
        {/* Header Section - Summary */}
        <div
          className="border-b-2 border-border px-6 py-6"
          data-section-id="summary"
          style={getBlockStyle(1)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
              style={{ backgroundColor: employee.avatarColor }}
            >
              {employee.initials}
            </div>
            <div>
              <p
                className="text-h3 font-normal text-primary"
                style={{ marginBottom: '0px' }}
              >
                {employee.name}
              </p>
              <p className="text-body-sm text-primary mb-0">{employee.role}</p>
            </div>
          </div>
          <p className="text-body-sm text-primary mt-0">{summary}</p>
        </div>

        {/* Highlight Item */}
        <div
          className="border-b-2 border-border"
          data-section-id="highlight"
          style={getBlockStyle(2)}
        >
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <span className="material-icons-outlined text-h3 text-[#22594A]">
                    star_outline
                  </span>
                  <span className="text-body-sm font-semibold text-primary">
                    {highlight.theme}
                  </span>
                </div>
                <p className="text-body-sm text-primary">
                  {highlight.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-2">
                    {highlight.sources.slice(0, 2).map((source, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-background-elevated flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: getAvatarColor(source.reviewer) }}
                      >
                        {getInitials(source.reviewer)}
                      </div>
                    ))}
                  </div>
                  <span className="text-body-sm text-secondary">
                    {highlight.sources.length} sources
                  </span>
                </div>
                <button
                  onClick={() => setHighlightExpanded(!highlightExpanded)}
                  className="p-3 hover:bg-black/5 rounded-lg transition-colors"
                  aria-label={
                    highlightExpanded ? 'Collapse highlight' : 'Expand highlight'
                  }
                >
                  <motion.span
                    animate={{ rotate: highlightExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-icons-outlined text-h3 text-primary block"
                  >
                    keyboard_arrow_down
                  </motion.span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {highlightExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    {highlight.sources.map((source, idx) => (
                      <SourceCard key={idx} source={source} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Opportunity Item */}
        <div
          className="border-b-2 border-border"
          data-section-id="opportunity"
          style={getBlockStyle(3)}
        >
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <span
                    className="material-icons-outlined text-h3"
                    style={{ color: 'rgba(135, 100, 0, 1)' }}
                  >
                    lightbulb
                  </span>
                  <span className="text-body-sm font-semibold text-primary">
                    {opportunity.theme}
                  </span>
                </div>
                <p className="text-body-sm text-primary">
                  {opportunity.description}
                </p>
              </div>

              {/* Sources row */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-2">
                    {opportunity.sources.slice(0, 2).map((source, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-background-elevated flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: getAvatarColor(source.reviewer) }}
                      >
                        {getInitials(source.reviewer)}
                      </div>
                    ))}
                  </div>
                  <span className="text-body-sm text-secondary">
                    {opportunity.sources.length} sources
                  </span>
                </div>
                <button
                  onClick={() => setOpportunityExpanded(!opportunityExpanded)}
                  className="p-3 hover:bg-black/5 rounded-lg transition-colors"
                  aria-label={
                    opportunityExpanded
                      ? 'Collapse opportunity'
                      : 'Expand opportunity'
                  }
                >
                  <motion.span
                    animate={{ rotate: opportunityExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-icons-outlined text-h3 text-primary block"
                  >
                    keyboard_arrow_down
                  </motion.span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {opportunityExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    {opportunity.sources.map((source, idx) => (
                      <SourceCard key={idx} source={source} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer with Feedback Buttons */}
        <div
          className="px-6 py-4 flex items-center gap-2"
          style={getFooterStyle()}
        >
          <span className="text-body-sm text-secondary">Is this helpful?</span>
          <button
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Thumbs up"
          >
            <span className="material-icons-outlined text-h2 text-primary">
              thumb_up
            </span>
          </button>
          <button
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Thumbs down"
          >
            <span className="material-icons-outlined text-h2 text-primary">
              thumb_down
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HighlightsPanel({
  className = '',
  activeStory = null,
}: HighlightsPanelProps) {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();
  const [showLoading, setShowLoading] = useState(true);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Only start timer once intro is complete AND we haven't started yet
    if (isComplete && showLoading && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // Small delay for fadeInUp to complete, then show loading for 1.5s
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
    <AnimatePresence mode="wait">
      {showLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingState />
        </motion.div>
      ) : (
        <motion.div
          key="solution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SolutionState
            className={className}
            activeStory={activeStory}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
