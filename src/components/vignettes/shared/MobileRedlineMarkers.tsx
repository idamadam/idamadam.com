'use client';

import { motion } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { DESIGN_NOTES_ACCENT } from './constants';

interface MobileRedlineMarkersProps {
  notes: DesignNote[];
  currentIndex: number;
  onMarkerClick: (index: number) => void;
}

export default function MobileRedlineMarkers({
  notes,
  currentIndex,
  onMarkerClick,
}: MobileRedlineMarkersProps) {
  const accent = DESIGN_NOTES_ACCENT;
  const reducedMotion = useReducedMotion();

  // Match desktop dot states
  const getDotStyle = (index: number) => {
    const isActive = currentIndex === index;
    if (isActive) {
      return {
        scale: 1.1,
        opacity: 1,
        boxShadow: `0 0 0 10px ${accent}40`,
      };
    }
    return {
      scale: 1,
      opacity: 0.6,
      boxShadow: `0 0 0 4px ${accent}15`,
    };
  };

  return (
    <div className="lg:hidden pointer-events-auto" style={{ overflow: 'visible' }}>
      {notes.map((note, index) => (
        <motion.button
          key={note.id}
          className="design-note-marker-dot"
          data-position={note.position}
          style={{
            positionAnchor: `--${note.anchor}`,
            backgroundColor: accent,
          } as React.CSSProperties}
          animate={reducedMotion ? { opacity: getDotStyle(index).opacity } : getDotStyle(index)}
          transition={{ duration: 0.2 }}
          onClick={() => onMarkerClick(index)}
          aria-label={`Design note: ${note.label}`}
        />
      ))}
    </div>
  );
}
