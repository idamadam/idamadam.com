'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStage } from '@/lib/vignette-stage-context';
import { ProblemCard } from '@/components/vignettes/types';

interface HighlightsPanelProps {
  className?: string;
  stage?: VignetteStage;
  onTransition?: () => void;
  problemCards?: ProblemCard[];
}

// Predefined positions for scattered cards
const cardPositions = [
  { x: -20, y: -15, rotate: -8 },
  { x: 30, y: 10, rotate: 5 },
  { x: -10, y: 25, rotate: -3 },
  { x: 40, y: -20, rotate: 7 },
  { x: -30, y: 5, rotate: -5 },
  { x: 15, y: 30, rotate: 4 },
];

interface SourceCardProps {
  name: string;
  date: string;
  context: string;
  feedback: string;
  avatarUrl: string;
}

function SourceCard({ name, date, context, feedback, avatarUrl }: SourceCardProps) {
  return (
    <div className="pt-4 border-t border-[#eaeaec]">
      <div className="flex items-center gap-2 mb-3">
        <img
          src={avatarUrl}
          alt={name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-[14px] leading-[18px] font-semibold text-[#2f2438]">
          {name}
        </span>
        <span className="text-[12px] leading-[16px] text-[#524e56]">
          {date}
        </span>
        <span className="text-[12px] leading-[16px] text-[#524e56]">
          •
        </span>
        <span className="text-[12px] leading-[16px] text-[#524e56]">
          {context}
        </span>
      </div>
      <p className="text-[14px] leading-[20px] text-[#2f2438] mb-3">
        {feedback}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[12px] leading-[16px] text-[#524e56]">
          Not shared with Idam Adam
        </span>
        <a href="#" className="text-[14px] leading-[18px] text-[#2f2438] hover:underline inline-flex items-center gap-1">
          View feedback
          <span className="material-icons-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}

function ProblemState({ cards, onTransition }: { cards: ProblemCard[]; onTransition?: () => void }) {
  return (
    <div className="relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      {/* Header with count */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[18px] text-gray-700 leading-none">
            inbox
          </span>
          <div className="text-[15px] font-semibold text-gray-900 leading-none">
            Feedback to review
          </div>
        </div>
        <div className="bg-amber-100 text-amber-800 text-[13px] font-semibold px-2.5 py-1 rounded-full border border-amber-200">
          {cards.length} items
        </div>
      </div>

      {/* Scrollable feed */}
      <div className="relative max-h-[440px] overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="px-5 py-4 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={card.avatarUrl || '/avatars/sarah-chen.svg'}
                  alt={card.from || 'Source'}
                  className="w-6 h-6 rounded-full"
                />
                {card.from && (
                  <span className="text-[14px] leading-[18px] font-semibold text-[#2f2438]">
                    {card.from}
                  </span>
                )}
                {(card.date || card.time) && (
                  <>
                    <span className="text-[12px] leading-[16px] text-[#524e56]">
                      {card.date || card.time}
                    </span>
                    <span className="text-[12px] leading-[16px] text-[#524e56]">
                      •
                    </span>
                  </>
                )}
                <span className="text-[12px] leading-[16px] text-[#524e56] capitalize">
                  {card.type === 'slack' ? 'Peer feedback' : card.type}
                </span>
              </div>
              <p className="text-[14px] leading-[20px] text-[#2f2438]">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* CTA Footer */}
      <div className="border-t-2 border-gray-200 bg-gray-50 px-5 py-4">
        <motion.button
          onClick={onTransition}
          className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white px-5 py-3 rounded-lg text-[14px] font-semibold shadow-sm hover:bg-[#1e293b] transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="material-icons-outlined text-[20px]">auto_awesome</span>
          Show Highlights and Opportunities
        </motion.button>
      </div>
    </div>
  );
}

function SolutionState({ className = '' }: { className?: string }) {
  const [highlightExpanded, setHighlightExpanded] = useState(false);
  const [opportunityExpanded, setOpportunityExpanded] = useState(false);

  return (
    <div
      className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden font-[family-name:var(--font-inter)] ${className}`}
    >
      {/* Header Section */}
      <div className="border-b-2 border-[#eaeaec] px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/avatars/idam.svg"
            alt="Idam Adam"
            className="w-12 h-12 rounded-full shadow-sm"
          />
          <div>
            <p className="text-[20px] leading-[30px] font-normal text-[#2f2438]" style={{ marginBottom: '0px' }}>
              Idam Adam
            </p>
            <p className="text-[16px] leading-[24px] text-[#2f2438] mb-0">
              Lead Product Designer
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-[24px] text-[#2f2438] mt-0">
          Idam designed 2 tools to help reduce the burden of the Performance Review Period.
          Highlights & Opportunities helps managers quickly understand what their direct reports
          did & verify AI output using direct quotes from feedback.
        </p>
      </div>

      {/* Highlight Item */}
      <div className="border-b-2 border-[#eaeaec]">
        <div className="px-6 py-8">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-icons-outlined text-[20px] text-[#22594A]">
                  star_outline
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Highlight
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="/avatars/sarah-chen.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="/avatars/mike-torres.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[14px] leading-[18px] text-[#524e56]">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setHighlightExpanded(!highlightExpanded)}
                className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={highlightExpanded ? 'Collapse highlight' : 'Expand highlight'}
              >
                <motion.span
                  animate={{ rotate: highlightExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-icons-outlined text-[20px] text-[#2f2438] block"
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
                  <SourceCard
                    name="Sarah Chen"
                    date="Sep 8, 2024"
                    context="Peer feedback"
                    feedback="Idam's approach to user testing the AI model was brilliant. Getting early feedback directly from managers helped us iterate on the prompts before launch, which significantly improved the quality of the highlights."
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
      <div className="border-b-2 border-[#eaeaec]">
        <div className="px-6 py-8">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-icons-outlined text-[20px]" style={{ color: 'rgba(135, 100, 0, 1)' }}>
                  lightbulb
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Opportunity
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="/avatars/alex-kim.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="/avatars/jordan-lee.svg"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[14px] leading-[18px] text-[#524e56]">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setOpportunityExpanded(!opportunityExpanded)}
                className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={opportunityExpanded ? 'Collapse opportunity' : 'Expand opportunity'}
              >
                <motion.span
                  animate={{ rotate: opportunityExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-icons-outlined text-[20px] text-[#2f2438] block"
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
        <span className="text-[14px] leading-[18px] text-[#524e56]">
          Is this helpful?
        </span>
        <button
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Thumbs up"
        >
          <span className="material-icons-outlined text-[24px] text-[#2f2438]">
            thumb_up
          </span>
        </button>
        <button
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Thumbs down"
        >
          <span className="material-icons-outlined text-[24px] text-[#2f2438]">
            thumb_down
          </span>
        </button>
      </div>
    </div>
  );
}

export default function HighlightsPanel({
  className = '',
  stage = 'solution',
  onTransition,
  problemCards = []
}: HighlightsPanelProps) {
  // Default problem cards if none provided
  const defaultProblemCards: ProblemCard[] = [
    { id: 'slack1', type: 'slack', content: 'Great job on the API redesign!', from: 'Sarah Chen', time: '2 weeks ago' },
    { id: 'slack2', type: 'slack', content: 'Could use more documentation', from: 'Mike Torres', time: '3 weeks ago' },
    { id: 'goal1', type: 'goal', content: 'Q3: Improve API response time by 40%', status: 'completed' },
    { id: 'note1', type: 'note', content: 'Discussed career growth, interested in tech lead path', date: 'Oct 15' },
    { id: 'feedback1', type: 'feedback', content: 'Excellent collaboration on cross-team projects', from: 'Peer review' },
    { id: 'calendar1', type: 'calendar', content: '1-on-1 with Idam', date: 'Oct 22' },
  ];

  const cards = problemCards.length > 0 ? problemCards : defaultProblemCards;

  return (
    <AnimatePresence mode="wait">
      {stage === 'problem' ? (
        <motion.div
          key="problem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ProblemState cards={cards} onTransition={onTransition} />
        </motion.div>
      ) : (
        <motion.div
          key="solution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SolutionState className={className} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
