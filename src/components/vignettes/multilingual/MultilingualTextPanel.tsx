'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NumberedMarker from '../ai-highlights/NumberedMarker';
import { multilingualContent } from './content';
import { easings } from '@/lib/animations';

interface MultilingualTextPanelProps {
  activeNumber: number | null;
  onNumberClick: (number: number) => void;
  onNumberHover: (number: number | null) => void;
  showProcessNotes?: boolean;
  onToggleView?: () => void;
}

function ProjectName() {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="size-1.5 rounded-full bg-accent-600" />
      <div className="w-5 h-px bg-black/10" />
      <div className="size-1.5 rounded-full bg-black/10" />
      <span className="ml-1.5 text-[13px] font-medium tracking-tight text-primary">
        {multilingualContent.projectName}
      </span>
    </div>
  );
}

export default function MultilingualTextPanel({
  activeNumber,
  onNumberClick,
  onNumberHover,
  showProcessNotes = false,
  onToggleView,
}: MultilingualTextPanelProps) {
  const { designDetails, processNotes, designDetailsLabel, processNotesLabel } =
    multilingualContent;

  return (
    <div className="flex flex-col">
      <ProjectName />

      {/* Headline */}
      <h3 className="type-h2 text-primary">{multilingualContent.headline}</h3>

      {/* Body */}
      <p className="type-body text-primary mt-4">
        {multilingualContent.body}
      </p>

      {/* Toggle between Design details and Process notes */}
      <div className="flex flex-col mt-6">
        {/* Toggle buttons */}
        <div className="flex items-center gap-1 mb-3">
          <button
            onClick={() => showProcessNotes && onToggleView?.()}
            className="relative px-3 py-1.5 text-[13px] font-medium tracking-tight rounded-lg transition-colors"
          >
            {!showProcessNotes && (
              <motion.div
                layoutId="multilingual-toggle-pill"
                className="absolute inset-0 bg-accent-200 border border-accent-700/25 rounded-lg"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                !showProcessNotes
                  ? 'text-accent-700'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {designDetailsLabel}
            </span>
          </button>
          <button
            onClick={() => !showProcessNotes && onToggleView?.()}
            className="relative px-3 py-1.5 text-[13px] font-medium tracking-tight rounded-lg transition-colors"
          >
            {showProcessNotes && (
              <motion.div
                layoutId="multilingual-toggle-pill"
                className="absolute inset-0 bg-accent-200 border border-accent-700/25 rounded-lg"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                showProcessNotes
                  ? 'text-accent-700'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {processNotesLabel}
            </span>
          </button>
        </div>

        {/* Animated content switch */}
        <AnimatePresence mode="popLayout">
          {!showProcessNotes ? (
            <motion.ul
              key="design-details"
              className="flex flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easings.decel }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easings.decel }}
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
