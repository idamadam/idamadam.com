'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { homeConnectContent } from './content';

interface MobileHomeConnectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const notes = homeConnectContent.designDetails;

export function MobileHomeConnectSheet({
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
}: MobileHomeConnectSheetProps) {
  const currentNote = notes[currentIndex];
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track mount state for portal (SSR safety)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (currentIndex < notes.length - 1) onIndexChange(currentIndex + 1);
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) onIndexChange(currentIndex - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, onClose, onIndexChange]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    // Dismiss if dragged down more than 100px or with high velocity
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  if (!currentNote || !mounted) return null;

  // Use portal to render outside vignette stacking contexts
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - very light to keep highlighted element visible */}
          <motion.div
            className="fixed inset-0 bg-black/10 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-background-elevated rounded-t-2xl border-t border-border/60 z-50 xl:hidden shadow-xl touch-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-9 h-1 bg-neutral-300 rounded-full" />
            </div>

            {/* Progress dots */}
            <div className="px-6 pb-3 flex items-center justify-between">
              <span className="text-[0.8125rem] text-tertiary">
                {currentIndex + 1} of {notes.length}
              </span>
              <div className="flex gap-1.5">
                {notes.map((_, i) => (
                  <button
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      i === currentIndex ? 'bg-primary' : 'bg-neutral-300'
                    }`}
                    onClick={() => onIndexChange(i)}
                    aria-label={`Go to note ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNote.number}
                  initial={isDragging ? undefined : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isDragging ? undefined : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-start gap-3"
                >
                  {/* Number badge */}
                  <div className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-[11px] font-medium flex-shrink-0">
                    {currentNote.number}
                  </div>
                  <p className="text-[1rem] text-primary leading-relaxed">
                    {currentNote.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6 flex gap-2">
              <button
                className="flex-1 py-2 px-3 rounded-lg border border-border/60 text-secondary text-[0.8125rem] font-medium disabled:opacity-40 transition-colors hover:bg-muted"
                onClick={() => onIndexChange(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                className="flex-1 py-2 px-3 rounded-lg bg-[#8a5530] hover:bg-[#6d4326] text-white text-[0.8125rem] font-medium transition-colors"
                onClick={() => {
                  if (currentIndex === notes.length - 1) {
                    onClose();
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
    </AnimatePresence>,
    document.body
  );
}
