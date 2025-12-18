'use client';

import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import type { AISuggestionsContent } from './content';
import type { VignetteStage } from '@/lib/vignette-stage-context';

type PanelStage = VignetteStage | 'loading';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  stage?: PanelStage;
  onTransition?: () => void;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

function ProblemState({
  content,
  onTransition
}: {
  content: AISuggestionsContent;
  onTransition?: () => void;
}) {
  return (
    <div className="relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[18px] text-gray-700">
            edit_note
          </span>
          <span className="text-[15px] font-semibold text-gray-900">
            Performance Review Draft
          </span>
        </div>
      </div>

      {/* Bad review content */}
      <div className="px-5 py-6">
        <p className="text-[15px] leading-[22px] text-gray-700 italic">
          &quot;{content.beforeText}&quot;
        </p>
      </div>

      {/* CTA Footer */}
      <div className="border-t-2 border-gray-200 bg-gray-50 px-5 py-4">
        <motion.button
          onClick={onTransition}
          className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white px-5 py-3 rounded-lg text-[14px] font-semibold shadow-sm hover:bg-[#1e293b] transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="material-icons-outlined text-[20px]">auto_awesome</span>
          See how AI helped
        </motion.button>
      </div>
    </div>
  );
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

        .suggestions-loading-border {
          position: absolute;
          inset: 0;
          border-radius: 7px;
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

        .suggestions-loading-content {
          position: relative;
          background: white;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          z-index: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .suggestions-loading-border {
            animation: none;
          }
        }
      `}</style>

      <div className="relative p-[2px] rounded-[7px]">
        <div className="suggestions-loading-border"></div>
        <div className="suggestions-loading-content px-6 py-8">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-[20px] text-[#2f2438]">
              auto_awesome
            </span>
            <span className="text-lg font-semibold text-[#2f2438]">
              Looking for ways to improve...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function SolutionState({
  content,
  redlineModeActive = false,
  focusedAnchor = null
}: {
  content: AISuggestionsContent;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}) {
  // Helper for anchor styles (dimming when another is focused)
  const getAnchorStyle = (anchorName: string): React.CSSProperties => ({
    anchorName: `--${anchorName}`,
    opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
    boxShadow: focusedAnchor === anchorName ? '0 0 0 2px rgba(154, 54, 178, 0.2)' : 'none',
    transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties);

  return (
    <div className="space-y-2 font-[family-name:var(--font-inter)]">
      {/* Editor with Improve button - anchored */}
      <div
        style={getAnchorStyle('improve-button')}
        data-anchor="improve-button"
      >
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={false}
          readOnly={true}
        />
      </div>

      {/* Recommendations panel - always visible in solution */}
      <div
        className="recommendation-panel"
        style={{
          position: 'relative',
          borderRadius: '7px',
          padding: '2px',
          background: 'linear-gradient(135deg, #A6E5E7, #64D2D7, #9A36B2)',
        }}
      >
        <div
          className="recommendation-content bg-white rounded-[5px] p-6 space-y-4"
        >
          {/* Header - anchored */}
          <div
            className="flex items-center justify-between"
            style={getAnchorStyle('recommendations-header')}
            data-anchor="recommendations-header"
          >
            <div className="flex items-start gap-2">
              <span className="material-icons-outlined text-[20px] text-[#2f2438] mt-0.5">
                auto_awesome
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-[#2f2438] leading-6">
                  {content.recommendations.length} suggested improvements
                </span>
                <span className="text-sm font-normal text-[#524e56] leading-5">
                  based on Culture Amp People Science
                </span>
              </div>
            </div>
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

          {/* Footer - anchored */}
          <div
            className="flex items-center justify-between pt-2"
            style={getAnchorStyle('feedback-footer')}
            data-anchor="feedback-footer"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#524e56]">Is this helpful?</span>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="material-icons-outlined text-[16px] text-[#2f2438]">
                  thumb_up
                </span>
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="material-icons-outlined text-[16px] text-[#2f2438]">
                  thumb_down
                </span>
              </button>
            </div>
            <span className="text-sm text-[#524e56]">
              Review AI-generated suggestions for accuracy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuggestionsPanel({
  content,
  stage = 'solution',
  onTransition,
  redlineModeActive = false,
  focusedAnchor = null
}: SuggestionsPanelProps) {
  const renderStage = () => {
    switch (stage) {
      case 'problem':
        return (
          <motion.div
            key="problem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProblemState content={content} onTransition={onTransition} />
          </motion.div>
        );
      case 'loading':
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SolutionState
              content={content}
              redlineModeActive={redlineModeActive}
              focusedAnchor={focusedAnchor}
            />
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderStage()}
    </AnimatePresence>
  );
}
