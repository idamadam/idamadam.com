'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easings } from '@/lib/animations';

interface ProcessNotesExpanderProps {
  notes: string[];
  expandLabel?: string;
  collapseLabel?: string;
}

export default function ProcessNotesExpander({
  notes,
  expandLabel = 'Process notes',
  collapseLabel = 'Process notes',
}: ProcessNotesExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (notes.length === 0) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-tight text-accent-700 bg-accent-200/60 border border-accent-700/20 hover:bg-accent-200 hover:border-accent-700/30 transition-all"
      >
        <motion.span
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2, ease: easings.decel }}
          className="text-[9px]"
        >
          ▶
        </motion.span>
        {isExpanded ? collapseLabel : expandLabel}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easings.decel }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-2 mt-3">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 py-1"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-600 mt-[7px]" />
                  <span className="type-body-sm text-primary">{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
