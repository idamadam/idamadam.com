'use client';

import { motion } from 'framer-motion';
import NumberedMarker from './NumberedMarker';
import { aiHighlightsContent } from './content';

interface HighlightsTextPanelProps {
  activeNumber: number | null;
  onNumberClick: (number: number) => void;
  onNumberHover: (number: number | null) => void;
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
}: HighlightsTextPanelProps) {
  return (
    <div className="flex flex-col">
      {/* Category breadcrumb */}
      <CategoryBreadcrumb />

      {/* Title */}
      <h3 className="type-h2 text-primary">
        {aiHighlightsContent.title}
      </h3>

      {/* Description */}
      <p className="type-body text-primary mt-4">
        {aiHighlightsContent.description}
      </p>

      {/* Design details section */}
      <div className="flex flex-col mt-6">
        {/* Label */}
        <span className="text-[13px] font-medium tracking-tight text-primary">
          {aiHighlightsContent.designDetailsLabel}
        </span>

        {/* Numbered list */}
        <ul className="flex flex-col gap-1 mt-3">
          {aiHighlightsContent.designDetails.map((detail) => (
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
        </ul>
      </div>
    </div>
  );
}
