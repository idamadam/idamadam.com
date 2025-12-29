'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

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

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange(noteId, isOpen);
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
            className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center
                       bg-[var(--accent-500)] text-white hover:bg-[var(--accent-600)] transition-all cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)] focus-visible:ring-offset-2
                       ${isActive ? 'ring-2 ring-[var(--accent-500)] ring-offset-2' : ''}`}
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
            className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200 max-w-[280px] z-50"
          >
            {note.label && (
              <p className="font-semibold text-sm text-gray-900">{note.label}</p>
            )}
            <p className={`text-sm text-gray-600 leading-relaxed ${note.label ? 'mt-1' : ''}`}>
              {note.detail}
            </p>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
