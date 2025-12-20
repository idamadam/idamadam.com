'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { DESIGN_NOTES_ACCENT } from './constants';

interface MobileRedlineTourProps {
  isActive: boolean;
  notes: DesignNote[];
  onExit: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onScrollToAnchor?: (anchor: string) => void;
}

export default function MobileRedlineTour({
  isActive,
  notes,
  onExit,
  currentIndex,
  onIndexChange,
  onScrollToAnchor,
}: MobileRedlineTourProps) {
  const accent = DESIGN_NOTES_ACCENT;
  // Track previous index for direction calculation
  const prevIndexRef = useRef(currentIndex);

  // Calculate direction based on index change (computed at render time)
  const direction = currentIndex >= prevIndexRef.current ? 'right' : 'left';

  // Update ref after render and scroll to anchor
  useEffect(() => {
    prevIndexRef.current = currentIndex;

    // Scroll to the anchor when index changes
    const currentNote = notes[currentIndex];
    if (currentNote && onScrollToAnchor) {
      onScrollToAnchor(currentNote.anchor);
    }
  }, [currentIndex, notes, onScrollToAnchor]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < notes.length - 1) {
      onIndexChange(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else if (info.offset.y > threshold) {
      onExit();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onExit();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (currentIndex < notes.length - 1) {
            onIndexChange(currentIndex + 1);
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          if (currentIndex > 0) {
            onIndexChange(currentIndex - 1);
          }
          break;
        case 'Home':
          onIndexChange(0);
          break;
        case 'End':
          onIndexChange(notes.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentIndex, notes.length, onExit, onIndexChange]);

  const currentNote = notes[currentIndex];

  if (!currentNote) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Subtle backdrop - tap to dismiss */}
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onExit}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 lg:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Progress */}
            <div className="px-6 pb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} of {notes.length}
              </span>
              <div className="flex gap-1.5">
                {notes.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    onClick={() => onIndexChange(i)}
                    aria-label={`Go to annotation ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNote.id}
                  initial={{ opacity: 0, x: direction === 'right' ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'right' ? -40 : 40 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: accent }}
                  >
                    {currentNote.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentNote.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium disabled:opacity-40"
                onClick={() => onIndexChange(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                className="flex-1 py-3 px-4 rounded-xl font-medium text-white"
                style={{ backgroundColor: accent }}
                onClick={() => {
                  if (currentIndex === notes.length - 1) {
                    onExit();
                  } else {
                    onIndexChange(currentIndex + 1);
                  }
                }}
              >
                {currentIndex === notes.length - 1 ? 'Done' : 'Next'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
