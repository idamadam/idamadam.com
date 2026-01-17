'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import NumberedMarker from '../ai-highlights/NumberedMarker';
import DesktopMarkerTooltip from '../shared/DesktopMarkerTooltip';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import type { AISuggestionsContent } from './content';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
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
        animation: rotateGradient 3s linear infinite;
        filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.5));
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
        .suggestions-animated-border {
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
        <div className="suggestions-loading-content p-5">
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

interface RecommendationsPanelProps {
  content: AISuggestionsContent;
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
}

function RecommendationsPanel({
  content,
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: RecommendationsPanelProps) {
  // Get highlight style for a section
  const getSectionHighlightStyle = (sectionNumber: number) => {
    if (highlightedSection === sectionNumber) {
      return {
        backgroundColor: 'rgba(240, 217, 200, 0.3)',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease-in-out',
      };
    }
    return {
      transition: 'background-color 0.3s ease-in-out',
    };
  };

  return (
    <div
      className="relative rounded-[7px] p-[2px]"
      data-section-id="gradient-border"
      style={{
        background:
          'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
      }}
    >
      {/* Marker 2 - AI gradient border - desktop: left side, mobile: left edge */}
      <AnimatePresence>
        {!hideMarkers && (
          <>
            <motion.div
              key="marker-2-desktop"
              className="absolute -left-8 top-6 hidden xl:block z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onMouseEnter={() => onMarkerHover?.(2)}
              onMouseLeave={() => onMarkerHover?.(null)}
            >
              <NumberedMarker
                number={2}
                onClick={() => onMarkerClick?.(2)}
                isActive={highlightedSection === 2}
              />
              <DesktopMarkerTooltip
                number={2}
                text={content.designDetails[1].text}
                isVisible={highlightedSection === 2}
                position="left"
              />
            </motion.div>
            <motion.div
              key="marker-2-mobile"
              className="absolute -left-3 top-6 xl:hidden z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <NumberedMarker
                number={2}
                onClick={() => onMarkerClick?.(2)}
                isActive={highlightedSection === 2}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className="bg-background-elevated rounded-[5px] p-8 space-y-5 relative z-10"
        style={getSectionHighlightStyle(2)}
      >
        {/* Header */}
        <div className="flex items-start gap-2">
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

        {/* Recommendations with Marker 3 */}
        <div
          className="space-y-5 relative"
          data-section-id="recommendations"
          style={getSectionHighlightStyle(3)}
        >
          {/* Marker 3 - Recommendations - desktop: right side, mobile: right edge */}
          <AnimatePresence>
            {!hideMarkers && (
              <>
                <motion.div
                  key="marker-3-desktop"
                  className="absolute -right-14 top-4 hidden xl:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  onMouseEnter={() => onMarkerHover?.(3)}
                  onMouseLeave={() => onMarkerHover?.(null)}
                >
                  <NumberedMarker
                    number={3}
                    onClick={() => onMarkerClick?.(3)}
                    isActive={highlightedSection === 3}
                  />
                  <DesktopMarkerTooltip
                    number={3}
                    text={content.designDetails[2].text}
                    isVisible={highlightedSection === 3}
                    position="right"
                  />
                </motion.div>
                <motion.div
                  key="marker-3-mobile"
                  className="absolute -right-3 top-4 xl:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <NumberedMarker
                    number={3}
                    onClick={() => onMarkerClick?.(3)}
                    isActive={highlightedSection === 3}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

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
        <div className="flex items-center pt-2">
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
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: SuggestionsPanelProps) {
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

  // Get highlight style for a section
  const getSectionHighlightStyle = (sectionNumber: number) => {
    if (highlightedSection === sectionNumber) {
      return {
        backgroundColor: 'rgba(240, 217, 200, 0.3)',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease-in-out',
      };
    }
    return {
      transition: 'background-color 0.3s ease-in-out',
    };
  };

  return (
    <div className="space-y-2 flex flex-col">
      <GradientBorderStyles />
      {/* Editor with marker - always visible */}
      <div
        className="relative"
        data-section-id="improve-button"
        style={getSectionHighlightStyle(1)}
      >
        {/* Marker 1 - Improve button - desktop: left side, mobile: left edge */}
        <AnimatePresence>
          {!hideMarkers && !showLoading && (
            <>
              <motion.div
                key="marker-1-desktop"
                className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => onMarkerHover?.(1)}
                onMouseLeave={() => onMarkerHover?.(null)}
              >
                <NumberedMarker
                  number={1}
                  onClick={() => onMarkerClick?.(1)}
                  isActive={highlightedSection === 1}
                />
                <DesktopMarkerTooltip
                  number={1}
                  text={content.designDetails[0].text}
                  isVisible={highlightedSection === 1}
                  position="left"
                />
              </motion.div>
              <motion.div
                key="marker-1-mobile"
                className="absolute -left-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NumberedMarker
                  number={1}
                  onClick={() => onMarkerClick?.(1)}
                  isActive={highlightedSection === 1}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={showLoading}
          isImproveActivated={!showLoading}
          mobileFormatting="dots"
        />
      </div>

      {/* Panel below - animates between loading and recommendations */}
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
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
          >
            <RecommendationsPanel
              content={content}
              highlightedSection={highlightedSection}
              onMarkerClick={onMarkerClick}
              onMarkerHover={onMarkerHover}
              hideMarkers={hideMarkers}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
