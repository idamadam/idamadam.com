'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { DESIGN_NOTES_ACCENT } from './constants';

interface RedlineOverlayProps {
  notes: DesignNote[];
  expandedAnnotations: Set<string>;
  focusedAnnotation: string | null;
  onToggleAnnotation: (id: string) => void;
  onFocusAnnotation: (id: string | null) => void;
}

export default function RedlineOverlay({
  notes,
  expandedAnnotations,
  focusedAnnotation,
  onToggleAnnotation,
  onFocusAnnotation,
}: RedlineOverlayProps) {
  const accent = DESIGN_NOTES_ACCENT;
  const reducedMotion = useReducedMotion();

  // Dot visual states
  const getDotState = (noteId: string) => {
    const isExpanded = expandedAnnotations.has(noteId);
    const isFocused = focusedAnnotation === noteId;
    const isDimmed = focusedAnnotation !== null && !isFocused && !isExpanded;

    if (isDimmed) return 'dimmed';
    if (isExpanded) return 'expanded';
    if (isFocused) return 'focused';
    return 'subtle';
  };

  const dotStyles = {
    subtle: {
      scale: 1,
      opacity: 0.7,  // Slightly more visible with warm color
      boxShadow: `0 0 0 4px ${accent}20`,
    },
    focused: {
      scale: 1.15,
      opacity: 1,
      boxShadow: `0 0 0 8px ${accent}35`,
    },
    expanded: {
      scale: 1.1,
      opacity: 1,
      boxShadow: `0 0 0 10px ${accent}45`,
    },
    dimmed: {
      scale: 1,
      opacity: 0.4,
      boxShadow: `0 0 0 4px ${accent}12`,
    },
  };

  const hasExpandedAnnotation = expandedAnnotations.size > 0;

  const handleBackdropClick = () => {
    // Close all expanded annotations by toggling the currently expanded one
    expandedAnnotations.forEach(id => onToggleAnnotation(id));
  };

  return (
    <div className="pointer-events-none hidden lg:block" style={{ overflow: 'visible' }}>
      {/* Invisible backdrop to catch clicks outside annotations */}
      {hasExpandedAnnotation && (
        <div
          className="fixed inset-0 pointer-events-auto z-0"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      {notes.map((note, index) => {
        const alignRight = note.position === 'right';
        const isExpanded = expandedAnnotations.has(note.id);
        const dotState = getDotState(note.id);

        return (
          <div
            key={note.id}
            className="design-note pointer-events-auto"
            data-position={note.position}
            style={{
              positionAnchor: `--${note.anchor}`,
              zIndex: 10,
            } as React.CSSProperties}
          >
            <div className={`flex items-start ${alignRight ? 'text-left' : 'flex-row-reverse text-right'}`}>
              {/* Dot - always visible */}
              <div className={`flex items-center pt-4 ${alignRight ? '' : 'flex-row-reverse'}`}>
                <motion.button
                  className="w-2.5 h-2.5 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: accent,
                    focusVisibleRingColor: accent,
                  } as React.CSSProperties}
                  initial={reducedMotion ? {} : { scale: 0, opacity: 0 }}
                  animate={reducedMotion ? { opacity: dotStyles[dotState].opacity } : dotStyles[dotState]}
                  transition={{
                    duration: 0.2,
                    delay: 1.0 + index * 0.1,  // Wait for solution panel, then stagger
                  }}
                  onClick={() => onToggleAnnotation(note.id)}
                  onMouseEnter={() => onFocusAnnotation(note.id)}
                  onMouseLeave={() => onFocusAnnotation(null)}
                  aria-label={`Design note: ${note.label || note.detail.slice(0, 50)}`}
                  aria-expanded={isExpanded}
                />

                {/* Connector line - only when expanded */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className={`h-px w-8 ${alignRight ? 'mr-2' : 'ml-2'}`}
                      style={{
                        backgroundColor: accent,
                        transformOrigin: alignRight ? 'left' : 'right',
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0.1 : 0.15 }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Label box - only when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className={`rounded-xl px-3 py-2 shadow-sm min-w-[230px] bg-white ${alignRight ? '' : 'mr-48'}`}
                    style={{
                      border: `1px solid ${accent}33`,
                      boxShadow: `0 12px 40px ${accent}20`,
                    }}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: alignRight ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: alignRight ? -10 : 10 }}
                    transition={{ duration: reducedMotion ? 0.1 : 0.2, delay: reducedMotion ? 0 : 0.05 }}
                  >
                    {note.label && (
                      <p className="text-caption font-semibold leading-snug" style={{ color: accent }}>
                        {note.label}
                      </p>
                    )}
                    <p className={`text-caption leading-normal text-secondary ${note.label ? 'mt-1' : ''}`}>
                      {note.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
