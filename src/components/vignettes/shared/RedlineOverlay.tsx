'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import { DESIGN_NOTES_ACCENT } from './constants';

interface RedlineOverlayProps {
  isActive: boolean;
  notes: DesignNote[];
  focusedAnnotation: string | null;
  onFocusAnnotation: (id: string | null) => void;
}

export default function RedlineOverlay({
  isActive,
  notes,
  focusedAnnotation,
  onFocusAnnotation,
}: RedlineOverlayProps) {
  const accent = DESIGN_NOTES_ACCENT;
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Annotations */}
          <div className="pointer-events-none hidden lg:block" style={{ overflow: 'visible' }}>
            {notes.map((note, index) => {
              const alignRight = note.position === 'right';
              const isFocused = focusedAnnotation === note.id;
              const isDimmed = focusedAnnotation !== null && !isFocused;
              const position = note.position === 'right' || note.position === 'left' ? note.position : 'right';
              const anim = animations.annotation(index, position);

              return (
                <motion.div
                  key={note.id}
                  className="design-note pointer-events-auto cursor-pointer"
                  data-position={note.position}
                  style={{
                    positionAnchor: `--${note.anchor}`,
                  } as React.CSSProperties}
                  initial={anim.container.initial}
                  animate={{
                    ...anim.container.animate,
                    opacity: isDimmed ? 0.4 : 1,
                    scale: isFocused ? 1.02 : 1,
                  }}
                  exit={anim.container.exit}
                  transition={anim.container.transition}
                  onMouseEnter={() => onFocusAnnotation(note.id)}
                  onMouseLeave={() => onFocusAnnotation(null)}
                >
                  <div className={`flex items-start ${alignRight ? 'text-left' : 'flex-row-reverse text-right'}`}>
                    {/* Dot and line */}
                    <div className={`flex items-center pt-4 ${alignRight ? '' : 'flex-row-reverse'}`}>
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: accent,
                        }}
                        initial={anim.dot.initial}
                        animate={{
                          ...anim.dot.animate,
                          boxShadow: isFocused
                            ? `0 0 0 12px ${accent}30`
                            : `0 0 0 8px ${accent}1a`
                        }}
                        transition={anim.dot.transition}
                      />
                      <motion.div
                        className={`h-px w-8 ${alignRight ? 'mr-2' : 'ml-2'}`}
                        style={{
                          backgroundColor: accent,
                          transformOrigin: alignRight ? 'left' : 'right',
                        }}
                        initial={anim.connector.initial}
                        animate={anim.connector.animate}
                        transition={anim.connector.transition}
                      />
                    </div>

                    {/* Label box */}
                    <motion.div
                      className="rounded-xl px-3 py-2 shadow-sm min-w-[230px] bg-white"
                      style={{
                        border: `1px solid ${accent}33`,
                      }}
                      animate={{
                        boxShadow: isFocused
                          ? `0 12px 40px ${accent}25`
                          : '0 12px 40px rgba(248, 113, 113, 0.15)',
                      }}
                    >
                      <p className="text-caption font-semibold leading-snug" style={{ color: accent }}>
                        {note.label}
                      </p>
                      <p className="text-caption leading-normal mt-1 text-secondary">
                        {note.detail}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
