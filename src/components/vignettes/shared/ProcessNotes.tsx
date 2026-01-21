'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackProcessNotesExpanded, type VignetteId } from '@/lib/analytics';

interface ProcessNotesProps {
  notes: string[];
  vignetteId: VignetteId;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.5 2.5L8 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProcessNotes({ notes, vignetteId }: ProcessNotesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasTrackedExpansion = useRef(false);

  if (notes.length === 0) return null;

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (newExpanded && !hasTrackedExpansion.current) {
      hasTrackedExpansion.current = true;
      trackProcessNotesExpanded(vignetteId);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleToggle}
        className="btn-interactive btn-secondary text-sm font-[family-name:var(--font-inter)]"
      >
        Design process notes
        <ChevronIcon
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-2 mt-3 overflow-hidden"
          >
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 py-1">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-600 mt-[7px]" />
                <span className="type-body-sm text-primary/80">{note}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
