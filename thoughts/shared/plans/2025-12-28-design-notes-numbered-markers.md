# Design Notes: Numbered Markers with Radix Popover

## Overview

Replace the current 4-state annotation system (dots with connector lines, CSS anchor positioning, separate mobile components) with numbered hotspot markers using Radix Popover. This simplifies state management, removes visual clutter, and creates a consistent interaction model across desktop and mobile.

## Current State Analysis

### Complexity Being Removed

| Component | Lines | Purpose |
|-----------|-------|---------|
| `RedlineOverlay.tsx` | 164 | Desktop 4-state dots with connector lines |
| `MobileRedlineMarkers.tsx` | 59 | Mobile dot indicators |
| `MobileRedlineTour.tsx` | 195 | Mobile bottom sheet with drag gestures |
| `useDesignNotesSetup.ts` | 59 | State orchestration |
| `useRedlineMode.ts` | 54 | Expansion/focus state management |
| `useAnchorStyle.ts` | 26 | Content opacity dimming |
| `design-notes.css` | ~190 | CSS anchor positioning with fallbacks |
| **Total** | **~747** | |

### Key Issues Being Solved

1. **4 visual states** (`subtle`, `focused`, `expanded`, `dimmed`) - excessive complexity
2. **Connector lines** between dots and labels - visual noise
3. **CSS anchor positioning** with complex viewport fallbacks
4. **Separate mobile components** requiring coordinated state
5. **Always-visible dots** competing for attention with content
6. **Per-vignette accent colors** - legacy artifact, should be removed

### Files Involved

**Components to replace:**
- `src/components/vignettes/shared/RedlineOverlay.tsx`
- `src/components/vignettes/shared/MobileRedlineMarkers.tsx`
- `src/components/vignettes/shared/MobileRedlineTour.tsx`
- `src/components/vignettes/shared/useDesignNotesSetup.ts`
- `src/components/vignettes/shared/useRedlineMode.ts`
- `src/components/vignettes/shared/useAnchorStyle.ts`
- `src/components/vignettes/shared/design-notes.css`

**Vignettes to update:**
- `src/components/vignettes/ai-highlights/` (content.ts, AIHighlightsVignette.tsx, HighlightsPanel.tsx)
- `src/components/vignettes/ai-suggestions/` (content.ts, AISuggestionsVignette.tsx)
- `src/components/vignettes/multilingual/` (content.ts, MultilingualVignette.tsx)
- `src/components/vignettes/home-connect/` (content.ts, HomeConnectVignette.tsx)

## Desired End State

After implementation:
- **Single component** (`DesignNoteMarker`) handles both desktop and mobile
- **Numbered circles** (1, 2, 3) clearly communicate "supplementary info here"
- **Click to open** shows Radix Popover positioned to avoid obscuring content
- **Mobile uses simplified bottom sheet** (no drag gestures, simpler navigation)
- **No accent colors** - consistent neutral styling across all vignettes
- **~200 lines** of new code vs ~747 removed

### Verification

1. Desktop: Numbered markers visible, click opens popover positioned outside content panel
2. Mobile: Numbered markers visible, click opens simplified bottom sheet
3. No visual regressions in vignette content
4. Keyboard navigation works (Escape to close, Tab through markers)
5. Reduced motion preferences respected

## What We're NOT Doing

- Adding hover tooltips (don't work on touch)
- Keeping connector lines (visual clutter)
- Preserving the 4-state system
- Maintaining per-vignette accent colors
- Using the unused `designNotesPanel` prop on VignetteStaged

---

## Implementation Approach

1. Install Radix Popover dependency
2. Create new unified `DesignNoteMarker` component
3. Create simplified mobile bottom sheet
4. Migrate one vignette (AI Highlights) as proof of concept
5. Migrate remaining vignettes
6. Remove old components and CSS

---

## Phase 1: Foundation - New Components

### Overview
Install Radix Popover and create the new unified annotation system.

### Changes Required:

#### 1. Install Radix Popover

```bash
npm install @radix-ui/react-popover
```

#### 2. Update DesignNote Type
**File**: `src/components/vignettes/types.ts`

Replace anchor-based positioning with x/y percentages:

```typescript
export interface DesignNote {
  id: string;
  label?: string;
  detail: string;
  // Remove: anchor, position, align
  // Add percentage-based positioning
  x: string; // e.g., '85%' - percentage from left of container
  y: string; // e.g., '20%' - percentage from top of container
  popoverSide?: 'top' | 'bottom' | 'left' | 'right'; // Which side popover appears
}
```

#### 3. Create DesignNoteMarker Component
**File**: `src/components/vignettes/shared/DesignNoteMarker.tsx`

```tsx
'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface DesignNoteMarkerProps {
  index: number;
  note: DesignNote;
  onMobileClick?: (index: number) => void;
}

export function DesignNoteMarker({ index, note, onMobileClick }: DesignNoteMarkerProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // On mobile, trigger bottom sheet instead of popover
  const handleClick = () => {
    if (onMobileClick && window.innerWidth < 1024) {
      onMobileClick(index);
    }
  };

  return (
    <div
      className="absolute"
      style={{ left: note.x, top: note.y, transform: 'translate(-50%, -50%)' }}
    >
      {/* Desktop: Radix Popover */}
      <div className="hidden lg:block">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <MarkerButton index={index} reducedMotion={reducedMotion} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side={note.popoverSide || 'right'}
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

      {/* Mobile: Button that triggers bottom sheet */}
      <div className="lg:hidden">
        <MarkerButton index={index} onClick={handleClick} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}

interface MarkerButtonProps {
  index: number;
  onClick?: () => void;
  reducedMotion: boolean;
}

function MarkerButton({ index, onClick, reducedMotion }: MarkerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-6 h-6 rounded-full text-xs font-semibold text-white flex items-center justify-center
                 bg-gray-900 hover:bg-gray-800 transition-colors
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      initial={reducedMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.8 + index * 0.1 }}
      aria-label={`Design note ${index + 1}`}
    >
      {index + 1}
    </motion.button>
  );
}
```

#### 4. Create DesignNotesOverlay Component
**File**: `src/components/vignettes/shared/DesignNotesOverlay.tsx`

Container that positions all markers:

```tsx
'use client';

import { useState } from 'react';
import type { DesignNote } from '@/components/vignettes/types';
import { DesignNoteMarker } from './DesignNoteMarker';
import { MobileDesignNotesSheet } from './MobileDesignNotesSheet';

interface DesignNotesOverlayProps {
  notes: DesignNote[];
}

export function DesignNotesOverlay({ notes }: DesignNotesOverlayProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const openMobileSheet = (index: number) => {
    setMobileIndex(index);
    setMobileSheetOpen(true);
  };

  const closeMobileSheet = () => {
    setMobileSheetOpen(false);
  };

  return (
    <>
      {/* Marker layer - positioned absolutely within parent */}
      <div className="absolute inset-0 pointer-events-none">
        {notes.map((note, index) => (
          <div key={note.id} className="pointer-events-auto">
            <DesignNoteMarker
              index={index}
              note={note}
              onMobileClick={openMobileSheet}
            />
          </div>
        ))}
      </div>

      {/* Mobile bottom sheet */}
      <MobileDesignNotesSheet
        isOpen={mobileSheetOpen}
        onClose={closeMobileSheet}
        notes={notes}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
      />
    </>
  );
}
```

#### 5. Create Simplified Mobile Bottom Sheet
**File**: `src/components/vignettes/shared/MobileDesignNotesSheet.tsx`

Simplified version without drag gestures:

```tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';

interface MobileDesignNotesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  notes: DesignNote[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function MobileDesignNotesSheet({
  isOpen,
  onClose,
  notes,
  currentIndex,
  onIndexChange,
}: MobileDesignNotesSheetProps) {
  const currentNote = notes[currentIndex];

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
  }, [isOpen, currentIndex, notes.length, onClose, onIndexChange]);

  if (!currentNote) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 lg:hidden shadow-xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Progress dots */}
            <div className="px-6 pb-3 flex items-center justify-between">
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
                    aria-label={`Go to note ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNote.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentNote.label && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentNote.label}
                    </h3>
                  )}
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
                className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white font-medium"
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
    </AnimatePresence>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm install` completes without errors
- [x] `npm run build` passes (TypeScript compiles)
- [x] `npm run lint` passes (only pre-existing warnings in legacy code)

#### Manual Verification:
- [ ] New components exist and have correct types
- [ ] No runtime errors when imported

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding to Phase 2.

---

## Phase 2: Migrate AI Highlights Vignette

### Overview
Update AI Highlights to use the new annotation system as proof of concept.

### Changes Required:

#### 1. Update content.ts
**File**: `src/components/vignettes/ai-highlights/content.ts`

Convert anchor-based notes to x/y positioning. Remove accent color.

```typescript
// Before
designNotes: {
  accent: '#ef4444',
  notes: [
    {
      id: 'context-first',
      label: 'Summary paragraph',
      detail: 'The summary orients the managers before diving into the details below.',
      anchor: 'summary-anchor',
      position: 'left',
    },
    // ...
  ]
}

// After
designNotes: {
  notes: [
    {
      id: 'context-first',
      label: 'Summary paragraph',
      detail: 'The summary orients the managers before diving into the details below.',
      x: '5%',   // Position marker at left edge of panel
      y: '15%',  // Near top where summary appears
      popoverSide: 'left' as const,
    },
    {
      id: 'verification',
      label: 'AI generated themes',
      detail: "Design research revealed opportunities to refine the model output. Managers wanted richer summaries that show when a behaviour occurred, e.g. project names.",
      x: '5%',
      y: '45%',
      popoverSide: 'left' as const,
    },
    {
      id: 'sources',
      label: 'Expandable sources',
      detail: "Avatars of people and clear affordances make it easy to verify AI output.",
      x: '5%',
      y: '75%',
      popoverSide: 'left' as const,
    }
  ]
}
```

Note: Remove `accent` property entirely. Update interface if needed.

#### 2. Update AIHighlightsVignette.tsx
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

Replace old overlay imports with new component:

```typescript
// Remove these imports:
// import RedlineOverlay from '../shared/RedlineOverlay';
// import MobileRedlineMarkers from '../shared/MobileRedlineMarkers';
// import MobileRedlineTour from '../shared/MobileRedlineTour';
// import { useDesignNotesSetup } from '../shared/useDesignNotesSetup';

// Add:
import { DesignNotesOverlay } from '../shared/DesignNotesOverlay';

// In the component, remove:
// const { designNotes, mobileIndex, mobileTourActive, ... } = useDesignNotesSetup(...);

// Replace the RedlineOverlay, MobileRedlineMarkers, MobileRedlineTour usage with:
{stage === 'solution' && (
  <DesignNotesOverlay notes={aiHighlightsContent.designNotes.notes} />
)}
```

#### 3. Update HighlightsPanel.tsx
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`

Remove anchor elements and useAnchorStyle usage:

```typescript
// Remove:
// import { useAnchorStyle } from '../shared/useAnchorStyle';

// Remove anchor div elements like:
// <div
//   className="absolute -left-4 top-1/2 w-0 h-0"
//   style={{ anchorName: '--summary-anchor' } as React.CSSProperties}
//   data-anchor="summary-anchor"
// />

// Remove useAnchorStyle usage and opacity dimming logic
```

The panel should now be a clean content component without anchor positioning concerns.

#### 4. Ensure container has relative positioning

The parent container of `DesignNotesOverlay` must have `position: relative` so the absolute-positioned markers work correctly. Check that the content panel wrapper has this.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run lint` passes
- [x] No TypeScript errors

#### Manual Verification:
- [ ] Desktop: Numbered markers (1, 2, 3) appear at correct positions on AI Highlights
- [ ] Desktop: Clicking marker opens popover with correct content
- [ ] Desktop: Popover positioned outside content (not obscuring)
- [ ] Desktop: Clicking elsewhere closes popover
- [ ] Mobile: Numbered markers visible
- [ ] Mobile: Clicking marker opens bottom sheet
- [ ] Mobile: Previous/Next navigation works
- [ ] Mobile: Done button closes sheet
- [ ] Keyboard: Escape closes popover/sheet
- [ ] Reduced motion: Animations simplified

**Implementation Note**: After completing this phase and all verification passes, pause here for confirmation before migrating remaining vignettes.

---

## Phase 3: Migrate Remaining Vignettes

### Overview
Apply the same pattern to AI Suggestions, Multilingual, and Home Connect.

### Changes Required:

#### 1. AI Suggestions
**File**: `src/components/vignettes/ai-suggestions/content.ts`

Convert notes to x/y positioning, remove accent:

```typescript
designNotes: {
  notes: [
    {
      id: 'editor-integration',
      label: 'Contextual placement',
      detail: 'The Improve button lives inside the text editor...',
      x: '95%',
      y: '20%',
      popoverSide: 'right' as const,
    },
    // Convert remaining notes...
  ]
}
```

**File**: `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
- Replace imports and usage same as AI Highlights

#### 2. Multilingual
**File**: `src/components/vignettes/multilingual/content.ts`

Convert notes, remove accent.

**File**: `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- Replace imports and usage

#### 3. Home Connect
**File**: `src/components/vignettes/home-connect/content.ts`

Convert notes, remove accent.

**File**: `src/components/vignettes/home-connect/HomeConnectVignette.tsx`
- Replace imports and usage

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run lint` passes

#### Manual Verification:
- [ ] AI Suggestions: Markers positioned correctly, popovers work
- [ ] Multilingual: Markers positioned correctly, popovers work
- [ ] Home Connect: Markers positioned correctly, popovers work
- [ ] Mobile works for all vignettes
- [ ] No visual regressions in vignette content

**Implementation Note**: After all vignettes migrated and verified, proceed to cleanup.

---

## Phase 4: Cleanup

### Overview
Remove deprecated components, hooks, and CSS.

### Files to Delete:

```
src/components/vignettes/shared/
├── RedlineOverlay.tsx          # DELETE
├── MobileRedlineMarkers.tsx    # DELETE
├── MobileRedlineTour.tsx       # DELETE
├── useRedlineMode.ts           # DELETE
├── useDesignNotesSetup.ts      # DELETE
├── useAnchorStyle.ts           # DELETE
└── design-notes.css            # DELETE
```

### Files to Update:

#### 1. Remove CSS import
If `design-notes.css` is imported anywhere (likely in a layout or vignette file), remove that import.

#### 2. Update constants.ts
**File**: `src/components/vignettes/shared/constants.ts`

Remove `DESIGN_NOTES_ACCENT` if no longer used:

```typescript
// Delete this line:
// export const DESIGN_NOTES_ACCENT = '#d4a012';
```

#### 3. Clean up types.ts
**File**: `src/components/vignettes/types.ts`

Ensure DesignNote interface only has new properties:

```typescript
export interface DesignNote {
  id: string;
  label?: string;
  detail: string;
  x: string;
  y: string;
  popoverSide?: 'top' | 'bottom' | 'left' | 'right';
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes (no missing imports)
- [x] `npm run lint` passes
- [x] No TypeScript errors about missing modules

#### Manual Verification:
- [ ] All vignettes still work correctly
- [ ] No console errors
- [ ] Bundle size reduced (check with `npm run build` output)

---

## Testing Strategy

### Manual Testing Checklist

For each vignette (AI Highlights, AI Suggestions, Multilingual, Home Connect):

**Desktop (>1024px):**
- [ ] Numbered markers visible in correct positions
- [ ] Hover shows cursor pointer
- [ ] Click opens popover with label and detail
- [ ] Popover positioned to not obscure content
- [ ] Click outside closes popover
- [ ] Only one popover open at a time
- [ ] Tab navigation works between markers
- [ ] Escape closes popover

**Mobile (<1024px):**
- [ ] Numbered markers visible
- [ ] Tap opens bottom sheet
- [ ] Sheet shows correct note content
- [ ] Previous/Next navigation works
- [ ] Progress dots update correctly
- [ ] Done button closes sheet
- [ ] Backdrop tap closes sheet

**Accessibility:**
- [ ] Screen reader announces "Design note 1", "Design note 2", etc.
- [ ] Focus visible on markers
- [ ] Keyboard navigation works
- [ ] Reduced motion: no scale/slide animations

---

## References

- Research document: `thoughts/shared/research/2025-12-28-design-notes-annotation-patterns.md`
- [Radix UI Popover docs](https://www.radix-ui.com/primitives/docs/components/popover)
- Current implementation: `src/components/vignettes/shared/RedlineOverlay.tsx`
