'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NumberedMarker from './NumberedMarker';
import { aiHighlightsContent } from './content';

interface HighlightsTextPanelProps {
  activeNumber: number | null;
  onNumberClick: (number: number) => void;
  onNumberHover: (number: number | null) => void;
  showProcessNotes?: boolean;
  onToggleView?: () => void;
}

function CategoryBreadcrumb() {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      {/* Orange dot */}
      <div className="size-1.5 rounded-full bg-accent-600" />
      {/* Line */}
      <div className="w-5 h-px bg-black/10" />
      {/* Gray dot */}
      <div className="size-1.5 rounded-full bg-black/10" />
      {/* Category text */}
      <span className="ml-1.5 text-[13px] font-medium tracking-tight text-primary">
        {aiHighlightsContent.category}
      </span>
    </div>
  );
}

export default function HighlightsTextPanel({
  activeNumber,
  onNumberClick,
  onNumberHover,
  showProcessNotes = false,
  onToggleView,
}: HighlightsTextPanelProps) {
  const { designDetails, processNotes, designDetailsLabel, processNotesLabel } =
    aiHighlightsContent;

  return (
    <div className="flex flex-col">
      {/* Category breadcrumb */}
      <CategoryBreadcrumb />

      {/* Title */}
      <h3 className="type-h2 text-primary">{aiHighlightsContent.title}</h3>

      {/* Description */}
      <p className="type-body text-primary mt-4">
        {aiHighlightsContent.description}
      </p>

      {/* Toggle between Design details and Process notes */}
      <div className="flex flex-col mt-6">
        {/* Toggle buttons */}
        <div className="flex items-center gap-1 mb-3">
          <button
            onClick={() => showProcessNotes && onToggleView?.()}
            className={`px-3 py-1.5 text-[13px] font-medium tracking-tight rounded-lg transition-colors ${
              !showProcessNotes
                ? 'bg-accent-100 text-accent-700'
                : 'text-secondary hover:text-primary hover:bg-black/5'
            }`}
          >
            {designDetailsLabel}
          </button>
          <button
            onClick={() => !showProcessNotes && onToggleView?.()}
            className={`px-3 py-1.5 text-[13px] font-medium tracking-tight rounded-lg transition-colors ${
              showProcessNotes
                ? 'bg-accent-100 text-accent-700'
                : 'text-secondary hover:text-primary hover:bg-black/5'
            }`}
          >
            {processNotesLabel}
          </button>
        </div>

        {/* Animated content switch */}
        <AnimatePresence mode="wait">
          {!showProcessNotes ? (
            <motion.ul
              key="design-details"
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {designDetails.map((detail) => (
                <motion.li
                  key={detail.number}
                  className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded-lg cursor-pointer"
                  animate={{
                    backgroundColor:
                      activeNumber === detail.number
                        ? 'rgba(240, 217, 200, 0.3)'
                        : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  data-detail-number={detail.number}
                  onMouseEnter={() => onNumberHover(detail.number)}
                  onMouseLeave={() => onNumberHover(null)}
                  onClick={() => onNumberClick(detail.number)}
                >
                  <NumberedMarker
                    number={detail.number}
                    isActive={activeNumber === detail.number}
                    className="flex-shrink-0 pointer-events-none"
                  />
                  <span className="type-body-sm text-primary">
                    {detail.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.ul
              key="process-notes"
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {processNotes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 py-1 px-2 -mx-2"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-600 mt-[7px]" />
                  <span className="type-body-sm text-primary">{note.text}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
