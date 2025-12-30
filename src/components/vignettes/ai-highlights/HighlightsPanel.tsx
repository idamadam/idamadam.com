'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStage } from '@/lib/vignette-stage-context';
import { useVignetteEntrance } from '@/lib/vignette-entrance-context';
import { SectionMarker } from '@/components/vignettes/shared/SectionMarker';
import Button from '@/components/Button';
import type { FeedbackSource } from './content';

type PanelStage = VignetteStage | 'loading';

interface HighlightsPanelProps {
  className?: string;
  stage?: PanelStage;
  onTransition?: () => void;
  problemCards?: FeedbackSource[];
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
}

interface SourceCardProps {
  name: string;
  date: string;
  context: string;
  feedback: string;
  avatarUrl: string;
}

function SourceCard({ name, date, context, feedback, avatarUrl }: SourceCardProps) {
  return (
    <div className="pt-4 border-t border-border">
      <div className="flex items-center gap-2 mb-3">
        <img
          src={avatarUrl}
          alt={name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-body-sm font-semibold text-primary">
          {name}
        </span>
        <span className="text-caption text-secondary">
          {date}
        </span>
        <span className="text-caption text-secondary">
          •
        </span>
        <span className="text-caption text-secondary">
          {context}
        </span>
      </div>
      <p className="text-body-sm text-primary mb-3">
        {feedback}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-caption text-secondary">
          Not shared with Idam Adam
        </span>
        <a href="#" className="text-body-sm text-primary hover:underline inline-flex items-center gap-1">
          View feedback
          <span className="material-icons-outlined text-body-sm">arrow_forward</span>
        </a>
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
            rgba(255, 255, 255, 0.08) 25%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.08) 75%
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

// Positions for scattered feedback cards - evenly distributed with organic feel
const feedbackCardPositions = [
  { top: '5%', left: '5%', rotate: -4, z: 1 },
  { top: '12%', left: '35%', rotate: 3, z: 2 },
  { top: '6%', left: '65%', rotate: -2, z: 1 },
  { top: '38%', left: '18%', rotate: 5, z: 3 },
  { top: '42%', left: '55%', rotate: -3, z: 2 },
];

function ProblemState({ cards, onTransition }: { cards: FeedbackSource[]; onTransition?: () => void }) {
  const { entranceDelay, stagger } = useVignetteEntrance();
  const displayCards = cards.slice(0, 5);
  const ctaDelay = entranceDelay + displayCards.length * stagger + 0.1;

  return (
    <div className="relative bg-background-subtle border-2 border-dashed border-border rounded-lg min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-end p-4 lg:p-8 overflow-hidden">
      {/* Mobile: Simple stacked layout */}
      <div className="flex flex-col gap-3 w-full mb-4 lg:hidden">
        {displayCards.slice(0, 3).map((card, index) => (
          <motion.div
            key={card.id}
            className="bg-background-elevated px-4 py-3 rounded-lg shadow-sm border border-border"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: entranceDelay + index * stagger,
              ease: 'easeOut' as const,
            }}
          >
            {card.from && (
              <div className="flex items-center gap-2 mb-2">
                {card.avatarUrl && (
                  <img src={card.avatarUrl} alt={card.from} className="w-6 h-6 rounded-full grayscale" />
                )}
                <span className="text-body-sm font-semibold text-primary">{card.from}</span>
              </div>
            )}
            <p className="text-body-sm text-secondary line-clamp-2">{card.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Scattered absolute positioning */}
      <div className="absolute inset-0 hidden lg:block">
        {displayCards.map((card, index) => {
          const pos = feedbackCardPositions[index % feedbackCardPositions.length];
          return (
            <motion.div
              key={card.id}
              className="absolute bg-background-elevated px-4 py-3 rounded-lg shadow-sm border border-border max-w-[220px] backface-hidden will-change-transform"
              style={{
                top: pos.top,
                left: pos.left,
                zIndex: pos.z,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: entranceDelay + index * stagger,
                ease: 'easeOut' as const,
              }}
            >
              {card.from && (
                <div className="flex items-center gap-2 mb-2">
                  {card.avatarUrl && (
                    <img src={card.avatarUrl} alt={card.from} className="w-6 h-6 rounded-full grayscale" />
                  )}
                  <span className="text-body-sm font-semibold text-primary">{card.from}</span>
                </div>
              )}
              <p className="text-body-sm text-secondary line-clamp-3">{card.content}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <Button
        onClick={onTransition}
        enterDelay={ctaDelay}
        className="relative z-10"
      >
        Summarise feedback
      </Button>
    </div>
  );
}

interface SolutionStateProps {
  className?: string;
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
}

function SolutionState({ className = '', highlightedSection = null, onNoteOpenChange, notes = [] }: SolutionStateProps) {
  const [highlightExpanded, setHighlightExpanded] = useState(false);
  const [opportunityExpanded, setOpportunityExpanded] = useState(false);

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
      className={`relative rounded-[7px] p-[2px] ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
      }}
    >
      <div className="bg-background-elevated rounded-[5px] overflow-visible">
      {/* Header Section */}
      <div className="border-b-2 border-border px-6 py-6" data-section-id="summary" style={getSectionStyle('summary')}>
        <div className="relative">
          <SectionMarker
            index={0}
            noteId="context-first"
            side="left"
            isActive={highlightedSection === 'summary'}
            onOpenChange={handleNoteOpen}
            note={getNote('context-first')}
          />
          <div className="flex items-center gap-3 mb-2">
          <img
            src="/avatars/idam.svg"
            alt="Idam Adam"
            className="w-12 h-12 rounded-full shadow-sm"
          />
          <div>
            <p className="text-h3 font-normal text-primary" style={{ marginBottom: '0px' }}>
              Idam Adam
            </p>
            <p className="text-body-sm text-primary mb-0">
              Lead Product Designer
            </p>
          </div>
        </div>
          <p className="text-body-sm text-primary mt-0">
            Led design for Highlights & Opportunities from discovery through launch.
            User research shaped both the verification UX and improvements to model output.
          </p>
        </div>
      </div>

      {/* Highlight Item */}
      <div className="border-b-2 border-border" data-section-id="highlight" style={getSectionStyle('highlight')}>
        <div className="px-6 py-8">
          {/* Header row with marker */}
          <div className="relative">
            <SectionMarker
              index={1}
              noteId="verification"
              side="left"
              isActive={highlightedSection === 'highlight'}
              onOpenChange={handleNoteOpen}
              note={getNote('verification')}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <span className="material-icons-outlined text-h3 text-[#22594A]">
                    star_outline
                  </span>
                <span className="text-body-sm font-semibold text-primary">
                  Highlight
                </span>
              </div>
              <p className="text-body-sm text-primary">
                Created a process to test AI model output with real users, using research findings to improve what the model generates.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="/avatars/sarah-chen.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-background-elevated"
                  />
                  <img
                    src="/avatars/mike-torres.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-background-elevated"
                  />
                </div>
                <span className="text-body-sm text-secondary">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setHighlightExpanded(!highlightExpanded)}
                className="p-3 hover:bg-white/5 rounded-lg transition-colors"
                aria-label={highlightExpanded ? 'Collapse highlight' : 'Expand highlight'}
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
                  <SourceCard
                    name="Sarah Chen"
                    date="Sep 8, 2024"
                    context="Peer feedback"
                    feedback="Idam's approach to user testing the AI model was excellent. Getting early feedback directly from managers helped us iterate on the prompts before launch, which significantly improved the quality of the highlights."
                    avatarUrl="/avatars/sarah-chen.svg"
                  />
                  <SourceCard
                    name="Mike Torres"
                    date="Sep 15, 2024"
                    context="Manager review"
                    feedback="The process Idam created for testing AI output with real users was a game-changer. We had concrete feedback before shipping, which prevented us from launching something managers wouldn't trust."
                    avatarUrl="/avatars/mike-torres.svg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Opportunity Item */}
      <div className="border-b-2 border-border" data-section-id="opportunity" style={getSectionStyle('opportunity')}>
        <div className="px-6 py-8">
          {/* Header row with marker */}
          <div className="relative">
            <SectionMarker
              index={2}
              noteId="sources"
              side="right"
              isActive={highlightedSection === 'opportunity'}
              onOpenChange={handleNoteOpen}
              note={getNote('sources')}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <span className="material-icons-outlined text-h3" style={{ color: 'rgba(135, 100, 0, 1)' }}>
                  lightbulb
                </span>
                <span className="text-body-sm font-semibold text-primary">
                  Opportunity
                </span>
              </div>
              <p className="text-body-sm text-primary">
                Document and scale this AI testing framework as a template for validating model output across other features.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="/avatars/alex-kim.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-background-elevated"
                  />
                  <img
                    src="/avatars/jordan-lee.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-background-elevated"
                  />
                </div>
                <span className="text-body-sm text-secondary">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setOpportunityExpanded(!opportunityExpanded)}
                className="p-3 hover:bg-white/5 rounded-lg transition-colors"
                aria-label={opportunityExpanded ? 'Collapse opportunity' : 'Expand opportunity'}
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
                  <SourceCard
                    name="Alex Kim"
                    date="Oct 5, 2024"
                    context="Peer feedback"
                    feedback="While the testing process was solid, there's an opportunity to document it better for other teams. This approach could be a template for how we validate all AI features going forward."
                    avatarUrl="/avatars/alex-kim.svg"
                  />
                  <SourceCard
                    name="Jordan Lee"
                    date="Sep 30, 2024"
                    context="Manager review"
                    feedback="Consider scaling the user testing framework to other AI initiatives. The rigor and structure would benefit the entire product org."
                    avatarUrl="/avatars/jordan-lee.svg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer with Feedback Buttons */}
      <div className="px-6 py-4 flex items-center gap-2">
        <span className="text-body-sm text-secondary">
          Is this helpful?
        </span>
        <button
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Thumbs up"
        >
          <span className="material-icons-outlined text-h2 text-primary">
            thumb_up
          </span>
        </button>
        <button
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
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
  stage = 'solution',
  onTransition,
  problemCards = [],
  highlightedSection = null,
  onNoteOpenChange,
  notes = [],
}: HighlightsPanelProps) {
  // Default problem cards if none provided
  const defaultProblemCards: FeedbackSource[] = [
    { id: 'feedback1', channel: 'feedback', content: 'Excellent collaboration on cross-team projects', from: 'Peer review' },
    { id: 'feedback2', channel: 'feedback', content: 'Great job on the API redesign!', from: 'Sarah Chen', time: '2 weeks ago' },
    { id: 'feedback3', channel: 'feedback', content: 'Could use more documentation', from: 'Mike Torres', time: '3 weeks ago' },
    { id: 'feedback4', channel: 'feedback', content: 'Discussed career growth, interested in tech lead path', date: 'Oct 15' },
    { id: 'feedback5', channel: 'feedback', content: 'Q3: Improve API response time by 40%', status: 'completed' },
    { id: 'feedback6', channel: 'feedback', content: '1-on-1 with Idam', date: 'Oct 22' },
  ];

  const cards = problemCards.length > 0 ? problemCards : defaultProblemCards;

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
            <ProblemState cards={cards} onTransition={onTransition} />
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
              className={className}
              highlightedSection={highlightedSection}
              onNoteOpenChange={onNoteOpenChange}
              notes={notes}
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
