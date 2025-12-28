'use client';

import { useState } from 'react';
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
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
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

interface SectionMarkerProps {
  index: number;
  noteId: string;
  side: 'left' | 'right';
  isActive: boolean;
  onOpenChange: (noteId: string, isOpen: boolean) => void;
  note: { label?: string; detail: string };
}

function SectionMarker({ index, noteId, side, isActive, onOpenChange, note }: SectionMarkerProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange(noteId, isOpen);
  };

  // Dynamic import to avoid SSR issues
  const Popover = require('@radix-ui/react-popover');

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 hidden lg:block ${
        side === 'left' ? '-left-8' : '-right-8'
      }`}
    >
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center
                       bg-[var(--gold-500)] text-[var(--neutral-900)] hover:bg-[var(--gold-600)] transition-all cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2
                       ${isActive ? 'ring-2 ring-[var(--gold-500)] ring-offset-2' : ''}`}
            aria-label={`Design note ${index + 1}`}
          >
            {index + 1}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side={side}
            align="center"
            sideOffset={12}
            collisionPadding={16}
            className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200 max-w-[280px] z-50"
          >
            {note.label && (
              <p className="font-semibold text-sm text-gray-900">{note.label}</p>
            )}
            <p className={`text-sm text-gray-600 leading-relaxed ${note.label ? 'mt-1' : ''}`}>
              {note.detail}
            </p>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
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

  return (
    <div
      className="recommendation-panel"
      style={{
        position: 'relative',
        borderRadius: '7px',
        padding: '2px',
        background: 'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
      }}
    >
      <div className="recommendation-content bg-white rounded-[5px] p-6 space-y-4">
        {/* Header with marker */}
        <div
          className="flex items-center justify-between relative"
          style={getSectionStyle('recommendations-header')}
        >
          <SectionMarker
            index={1}
            noteId="people-science"
            side="right"
            isActive={highlightedSection === 'recommendations-header'}
            onOpenChange={handleNoteOpen}
            note={getNote('people-science')}
          />
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

        {/* Footer with marker */}
        <div
          className="flex items-center justify-between pt-2 relative"
          style={getSectionStyle('feedback-footer')}
        >
          <SectionMarker
            index={2}
            noteId="loading-state"
            side="left"
            isActive={highlightedSection === 'feedback-footer'}
            onOpenChange={handleNoteOpen}
            note={getNote('loading-state')}
          />
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
      {/* Editor with marker - always visible */}
      <div
        className="relative"
        style={isSolution ? getSectionStyle('improve-button') : undefined}
      >
        {isSolution && (
          <SectionMarker
            index={0}
            noteId="editor-integration"
            side="left"
            isActive={highlightedSection === 'improve-button'}
            onOpenChange={handleNoteOpen}
            note={getNote('editor-integration')}
          />
        )}
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={isLoading}
          onImprove={isProblem ? onTransition : undefined}
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
