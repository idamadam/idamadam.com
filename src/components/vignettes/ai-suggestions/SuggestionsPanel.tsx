'use client';

import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import type { AISuggestionsContent } from './content';
import type { VignetteStage } from '@/lib/vignette-stage-context';
import { useAnchorStyle } from '@/components/vignettes/shared/useAnchorStyle';

type PanelStage = VignetteStage | 'loading';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  stage?: PanelStage;
  onTransition?: () => void;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

function LoadingPanel() {
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

function RecommendationsPanel({
  content,
  redlineModeActive = false,
  focusedAnchor = null
}: {
  content: AISuggestionsContent;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}) {
  const { getAnchorStyle } = useAnchorStyle({ redlineModeActive, focusedAnchor });

  return (
    <div
      className="recommendation-panel"
      style={{
        position: 'relative',
        borderRadius: '7px',
        padding: '2px',
        background: 'linear-gradient(135deg, #A6E5E7, #64D2D7, #9A36B2)',
      }}
    >
      <div className="recommendation-content bg-white rounded-[5px] p-6 space-y-4">
        {/* Header - anchored */}
        <div
          className="flex items-center justify-between"
          style={getAnchorStyle('recommendations-header')}
          data-anchor="recommendations-header"
        >
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
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {content.recommendations.map((rec, index) => (
            <div key={index}>
              <p className="text-base leading-6 text-primary">
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
            <span className="text-sm text-secondary">Is this helpful?</span>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-icons-outlined text-body-sm text-primary">
                thumb_up
              </span>
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-icons-outlined text-body-sm text-primary">
                thumb_down
              </span>
            </button>
          </div>
          <span className="text-sm text-secondary">
            Review AI-generated suggestions for accuracy
          </span>
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
  const isProblem = stage === 'problem';
  const isLoading = stage === 'loading';
  const isSolution = stage === 'solution' || stage === 'designNotes';
  const { getAnchorStyle } = useAnchorStyle({ redlineModeActive, focusedAnchor });

  return (
    <div className="space-y-2 font-[family-name:var(--font-inter)]">
      {/* Editor - always visible */}
      <div
        style={isSolution ? getAnchorStyle('improve-button') : undefined}
        data-anchor={isSolution ? 'improve-button' : undefined}
      >
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={isLoading}
          readOnly={true}
          onImprove={isProblem ? onTransition : undefined}
          pulseImproveButton={isProblem}
        />
      </div>

      {/* Panel below - animates between loading and recommendations */}
      <AnimatePresence mode="wait">
        {isLoading && (
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
        {isSolution && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RecommendationsPanel
              content={content}
              redlineModeActive={redlineModeActive}
              focusedAnchor={focusedAnchor}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
