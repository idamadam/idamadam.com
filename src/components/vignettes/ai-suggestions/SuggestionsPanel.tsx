'use client';

import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import { SectionMarker } from '@/components/vignettes/shared/SectionMarker';
import type { AISuggestionsContent } from './content';
import type { VignetteStage } from '@/lib/vignette-stage-context';

type PanelStage = VignetteStage | 'loading';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  stage?: PanelStage;
  onTransition?: () => void;
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
}

// Global styles for animated gradient border - rendered at module level
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
        background: white;
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
          background: white;
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
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
}

function RecommendationsPanel({
  content,
  highlightedSection = null,
  onNoteOpenChange,
  notes = [],
}: RecommendationsPanelProps) {
  // Get opacity style for a section based on what's highlighted
  const getSectionStyle = (section: string) => {
    if (!highlightedSection) return {};
    return {
      opacity: highlightedSection === section ? 1 : 0.3,
      transition: 'opacity 0.2s ease-in-out',
    };
  };

  const handleNoteOpen = (noteId: string, isOpen: boolean) => {
    onNoteOpenChange?.(noteId, isOpen);
  };

  // Find notes by ID
  const getNote = (id: string) => notes.find(n => n.id === id) || { detail: '' };

  // Get style for inner content when gradient border is highlighted
  const getInnerContentStyle = () => {
    if (highlightedSection === 'gradient-border') {
      return {
        opacity: 0.3,
        transition: 'opacity 0.2s ease-in-out',
      };
    }
    return {
      transition: 'opacity 0.2s ease-in-out',
    };
  };

  const isShowingAnimation = highlightedSection === 'gradient-border';

  return (
    <div
      className="recommendation-panel relative rounded-[7px] p-[2px]"
      data-section-id="gradient-border"
      style={{
        background: isShowingAnimation
          ? undefined
          : 'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
      }}
    >
      {isShowingAnimation && <div className="suggestions-animated-border" />}
      <div className="recommendation-content bg-white rounded-[5px] p-6 space-y-4 relative z-10">
        {/* Markers - positioned outside fading content */}
        <SectionMarker
          index={1}
          noteId="loading-state"
          side="left"
          isActive={highlightedSection === 'gradient-border'}
          onOpenChange={handleNoteOpen}
          note={getNote('loading-state')}
        />
        <SectionMarker
          index={2}
          noteId="people-science"
          side="right"
          isActive={highlightedSection === 'recommendations-header'}
          onOpenChange={handleNoteOpen}
          note={getNote('people-science')}
        />

        {/* Content that fades */}
        <div style={getInnerContentStyle()} className="space-y-4">
          {/* Header */}
          <div
            className="flex items-start gap-2"
            data-section-id="recommendations-header"
            style={getSectionStyle('recommendations-header')}
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

          {/* Footer */}
          <div className="flex items-center pt-2">
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
  highlightedSection = null,
  onNoteOpenChange,
  notes = [],
}: SuggestionsPanelProps) {
  const isProblem = stage === 'problem';
  const isLoading = stage === 'loading';
  const isSolution = stage === 'solution' || stage === 'designNotes';

  // Get opacity style for a section based on what's highlighted
  const getSectionStyle = (section: string) => {
    if (!highlightedSection) return {};
    return {
      opacity: highlightedSection === section ? 1 : 0.3,
      transition: 'opacity 0.2s ease-in-out',
    };
  };

  const handleNoteOpen = (noteId: string, isOpen: boolean) => {
    onNoteOpenChange?.(noteId, isOpen);
  };

  // Find notes by ID
  const getNote = (id: string) => notes.find(n => n.id === id) || { detail: '' };

  return (
    <div className="space-y-2">
      <GradientBorderStyles />
      {/* Editor with marker - always visible */}
      <div
        className="relative"
        data-section-id="improve-button"
        style={isSolution ? getSectionStyle('improve-button') : undefined}
      >
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={isLoading}
          isImproveActivated={isSolution}
          onImprove={isProblem ? onTransition : undefined}
          mobileFormatting="dots"
          improveButtonMarker={
            isSolution ? (
              <SectionMarker
                index={0}
                noteId="editor-integration"
                side="right"
                isActive={highlightedSection === 'improve-button'}
                onOpenChange={handleNoteOpen}
                note={getNote('editor-integration')}
              />
            ) : undefined
          }
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
              highlightedSection={highlightedSection}
              onNoteOpenChange={onNoteOpenChange}
              notes={notes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
