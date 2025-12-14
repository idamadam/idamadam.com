'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStage } from '@/lib/vignette-stage-context';

interface ProblemCard {
  id: string;
  type: 'slack' | 'goal' | 'note' | 'feedback' | 'calendar';
  content: string;
  from?: string;
  time?: string;
  date?: string;
  status?: string;
}

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

const typeIcons: Record<ProblemCard['type'], string> = {
  slack: 'chat_bubble',
  goal: 'flag',
  note: 'edit_note',
  feedback: 'rate_review',
  calendar: 'event',
};

const typeColors: Record<ProblemCard['type'], { bg: string; border: string; icon: string }> = {
  slack: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-500' },
  goal: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500' },
  note: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500' },
  feedback: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500' },
  calendar: { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-500' },
};

function ProblemState({ cards, onTransition }: { cards: ProblemCard[]; onTransition?: () => void }) {
  return (
    <div className="relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      {/* Header with count */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[20px] text-gray-700">
            inbox
          </span>
          <h3 className="text-[15px] font-semibold text-gray-900">
            Feedback to review
          </h3>
        </div>
        <div className="bg-amber-100 text-amber-800 text-[13px] font-semibold px-2.5 py-1 rounded-full border border-amber-200">
          {cards.length} items
        </div>
      </div>

      {/* Scrollable feed */}
      <div className="relative max-h-[440px] overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {cards.map((card, index) => {
            const colors = typeColors[card.type];

            return (
              <motion.div
                key={card.id}
                className="px-5 py-3.5 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: 'easeOut',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`${colors.bg} ${colors.border} border rounded-lg p-2 flex-shrink-0`}>
                    <span className={`material-icons-outlined text-[18px] ${colors.icon}`}>
                      {typeIcons[card.type]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] leading-[1.5] text-gray-900">
                      {card.content}
                    </p>
                    {(card.from || card.date || card.time) && (
                      <p className="text-[12px] text-gray-500 mt-1">
                        {card.from && <span className="font-medium">{card.from}</span>}
                        {card.from && (card.date || card.time) && <span className="mx-1.5">•</span>}
                        {card.date || card.time}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
          Summarize with AI
        </motion.button>
        <p className="text-[12px] text-gray-500 text-center mt-2">
          Save hours by letting AI surface key insights
        </p>
      </div>
    </div>
  );
}

function SolutionState({ className = '' }: { className?: string }) {
  const [highlightExpanded, setHighlightExpanded] = useState(false);
  const [opportunityExpanded, setOpportunityExpanded] = useState(false);

  return (
    <motion.div
      className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden font-[family-name:var(--font-inter)] ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header Section */}
      <div className="border-b-2 border-[#eaeaec] px-6 py-8">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://www.figma.com/api/mcp/asset/1a127355-1cf2-4469-b9c8-398df34b3017"
            alt="Idam Adam"
            className="w-12 h-12 rounded-full shadow-sm"
          />
          <div>
            <p className="text-[20px] leading-[30px] font-normal text-[#2f2438]">
              Idam Adam
            </p>
            <p className="text-[16px] leading-[24px] text-[#2f2438]">
              Lead Product Designer
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-[24px] text-[#2f2438]">
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
                <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                  star
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Highlight
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>

              <AnimatePresence>
                {highlightExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-[#eaeaec]">
                      <p className="text-[14px] leading-[18px] text-[#524e56] font-semibold mb-2">
                        Sources:
                      </p>
                      <ul className="space-y-2 text-[14px] leading-[18px] text-[#524e56]">
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Direct feedback from user testing sessions showing positive model performance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Documentation of early feedback integration process.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
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
        </div>
      </div>

      {/* Opportunity Item */}
      <div className="border-b-2 border-[#eaeaec]">
        <div className="px-6 py-8">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                  lightbulb
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Opportunity
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>

              <AnimatePresence>
                {opportunityExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-[#eaeaec]">
                      <p className="text-[14px] leading-[18px] text-[#524e56] font-semibold mb-2">
                        Sources:
                      </p>
                      <ul className="space-y-2 text-[14px] leading-[18px] text-[#524e56]">
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Opportunities identified for additional model output validation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Feedback suggesting improvements to early testing process.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
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
    </motion.div>
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ProblemState cards={cards} onTransition={onTransition} />
        </motion.div>
      ) : (
        <motion.div
          key="solution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SolutionState className={className} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
