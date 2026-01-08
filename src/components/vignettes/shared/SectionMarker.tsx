'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useVignetteStage } from '@/lib/vignette-stage-context';
import { trackDesignNoteViewed } from '@/lib/analytics';

interface SectionMarkerProps {
  index: number;
  noteId: string;
  side: 'left' | 'right';
  isActive: boolean;
  onOpenChange: (noteId: string, isOpen: boolean) => void;
  note: { label?: string; detail: string };
}

export function SectionMarker({ index, noteId, side, isActive, onOpenChange, note }: SectionMarkerProps) {
  const [open, setOpen] = useState(false);
  const { vignetteId } = useVignetteStage();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange(noteId, isOpen);
    if (isOpen) {
      trackDesignNoteViewed(vignetteId, noteId);
    }
  };

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 hidden lg:block ${
        side === 'left' ? '-left-8' : '-right-8'
      }`}
    >
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <button
            className={`w-6 h-6 rounded-full text-[11px] font-medium flex items-center justify-center
                       bg-accent-600 text-white hover:bg-accent-700 transition-all duration-200 cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2
                       breathe-glow
                       ${isActive ? 'ring-2 ring-accent-600 ring-offset-2' : ''}`}
            style={{ animationDelay: `${index * 0.5}s` }}
            aria-label={`Design note ${index + 1}`}
          >
            {index + 1}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side={side}
            align="center"
            sideOffset={12}
            collisionPadding={16}
            className="bg-background-elevated rounded-xl px-4 py-3 shadow-lg border border-border/60 max-w-[280px] z-50"
          >
            <p className="text-[0.9375rem] text-secondary leading-relaxed">
              {note.detail}
            </p>
            <Popover.Arrow className="fill-background-elevated" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
