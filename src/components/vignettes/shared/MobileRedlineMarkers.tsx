'use client';

import { motion } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';

interface MobileRedlineMarkersProps {
  notes: DesignNote[];
  accent: string;
  currentIndex: number;
  onMarkerClick: (index: number) => void;
}

export default function MobileRedlineMarkers({
  notes,
  accent,
  currentIndex,
  onMarkerClick,
}: MobileRedlineMarkersProps) {
  return (
    <div className="lg:hidden pointer-events-auto" style={{ overflow: 'visible' }}>
      {notes.map((note, index) => (
        <motion.button
          key={note.id}
          className="design-note-marker"
          data-position={note.position}
          style={{
            positionAnchor: `--${note.anchor}`,
            '--accent': accent,
          } as React.CSSProperties}
          animate={{
            scale: currentIndex === index ? 1.2 : 1,
            boxShadow: currentIndex === index
              ? `0 0 0 8px ${accent}40`
              : `0 0 0 4px ${accent}1a`,
          }}
          transition={{ duration: 0.2 }}
          onClick={() => onMarkerClick(index)}
          aria-label={`Design note ${index + 1}: ${note.label}`}
        >
          {index + 1}
        </motion.button>
      ))}
    </div>
  );
}
