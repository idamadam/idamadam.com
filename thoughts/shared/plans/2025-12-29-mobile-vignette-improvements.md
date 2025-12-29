# Mobile Vignette Improvements Implementation Plan

## Overview

Fix six mobile responsiveness issues across the vignette components to achieve parity with the polished desktop experience. All fixes use existing Tailwind patterns and Framer Motion primitives already in the codebase.

## Current State Analysis

The vignettes were designed desktop-first and have several mobile breakages:
- Fixed pixel widths that overflow narrow viewports
- Horizontal layouts that don't stack
- Absolute positioning that causes overlap
- Missing touch gestures on the bottom sheet

### Key Discoveries:
- Codebase uses CSS-only responsive approach via Tailwind (`sm:`, `lg:` prefixes)
- No `useMediaQuery` hook exists - all detection is CSS-based
- `MobileDesignNotesSheet` already has spring animations (`damping: 25, stiffness: 300`)
- `VignetteSplit` shows the responsive pattern: `grid-cols-1 lg:grid-cols-[360px_1fr]`

## Desired End State

All vignettes render correctly on mobile viewports (375px+):
- No horizontal overflow or clipping
- Touch-friendly interactions with swipe-to-dismiss on bottom sheet
- Layouts stack appropriately on narrow screens
- Primary CTAs remain visible and accessible

## What We're NOT Doing

- Adding a `useMediaQuery` JavaScript hook (CSS-only approach is sufficient)
- Introducing new dependencies (no react-modal-sheet)
- Creating separate mobile component trees
- Adding tablet-specific breakpoints (out of scope for this pass)

## Implementation Approach

These fixes touch separate files and can be **executed in parallel** using subagents. Each agent works on one file to avoid conflicts.

### Parallelization Strategy

Spawn **5 parallel agents**, one per file:

| Agent | File | Work |
|-------|------|------|
| A | `RichTextEditor.tsx` | Phase 1: Hide formatting buttons on mobile |
| B | `HighlightsPanel.tsx` | Phase 2 + 5a: Fix loading skeleton + scattered cards |
| C | `DemoCreationFlow.tsx` | Phase 3: Stack layout on mobile |
| D | `SandboxPanel.tsx` | Phase 4 + 5b: Responsive TUI + scattered cards |
| E | `MobileDesignNotesSheet.tsx` | Phase 6: Add swipe gestures |

### Execution Instructions

Use the Task tool to spawn all 5 agents in a single message:

```
<Task subagent_type="general-purpose" description="Fix RichTextEditor mobile">
  Read and implement Phase 1 from thoughts/shared/plans/2025-12-29-mobile-vignette-improvements.md
  File: src/components/demos/RichTextEditor.tsx
  Task: Hide formatting buttons on mobile, keep Improve button visible
</Task>

<Task subagent_type="general-purpose" description="Fix HighlightsPanel mobile">
  Read and implement Phase 2 AND the HighlightsPanel portion of Phase 5 from
  thoughts/shared/plans/2025-12-29-mobile-vignette-improvements.md
  File: src/components/vignettes/ai-highlights/HighlightsPanel.tsx
  Tasks:
  - Fix loading skeleton overflow (responsive widths, smaller gaps)
  - Fix ProblemState scattered cards (stack on mobile, scatter on desktop)
</Task>

<Task subagent_type="general-purpose" description="Fix DemoCreationFlow mobile">
  Read and implement Phase 3 from thoughts/shared/plans/2025-12-29-mobile-vignette-improvements.md
  File: src/components/vignettes/vibe-coding/DemoCreationFlow.tsx
  Task: Stack command panel above preview on mobile
</Task>

<Task subagent_type="general-purpose" description="Fix SandboxPanel mobile">
  Read and implement Phase 4 AND the SandboxPanel portion of Phase 5 from
  thoughts/shared/plans/2025-12-29-mobile-vignette-improvements.md
  File: src/components/vignettes/prototyping/SandboxPanel.tsx
  Tasks:
  - Make TUI overlay responsive (w-full sm:w-[340px] lg:w-[420px])
  - Fix ProblemState scattered cards (stack on mobile, scatter on desktop)
</Task>

<Task subagent_type="general-purpose" description="Add swipe to bottom sheet">
  Read and implement Phase 6 from thoughts/shared/plans/2025-12-29-mobile-vignette-improvements.md
  File: src/components/vignettes/shared/MobileDesignNotesSheet.tsx
  Task: Add drag="y" swipe-to-dismiss gesture with Framer Motion
</Task>
```

### After Parallel Execution

Once all agents complete:
1. Run `npm run build` to verify TypeScript compiles
2. Run `npm run lint` to check for issues
3. Perform manual testing on mobile viewport

---

## Phase 1: Fix RichTextEditor Toolbar

### Overview
The "Improve" button clips off-screen on mobile because the toolbar doesn't wrap. Hide the decorative formatting buttons on mobile to give the primary CTA room.

### Changes Required:

#### 1. RichTextEditor Component
**File**: `src/components/demos/RichTextEditor.tsx`
**Lines**: 30-51

Wrap the formatting buttons in a container that hides on mobile:

```tsx
{/* Toolbar */}
<div className="bg-white flex items-center gap-1.5 p-1.5">
  {/* Hide formatting buttons on mobile - they're decorative in this demo */}
  <div className="hidden sm:flex items-center gap-1.5">
    {/* Text formatting */}
    <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
      <span className="material-icons-outlined text-h3 text-primary">format_bold</span>
    </button>
    <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
      <span className="material-icons-outlined text-h3 text-primary">format_italic</span>
    </button>
    <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
      <span className="material-icons-outlined text-h3 text-primary">format_underlined</span>
    </button>

    {/* Divider */}
    <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />

    {/* List button */}
    <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
      <span className="material-icons-outlined text-h3 text-primary">format_list_bulleted</span>
    </button>

    {/* Divider */}
    <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />
  </div>

  {/* Improve button - always visible */}
  {showImproveButton && (
    // ... existing improve button code unchanged
  )}
</div>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile (375px): Only "Improve" button visible in toolbar, no clipping
- [ ] On desktop (1024px+): All formatting buttons visible
- [ ] "Improve" button remains fully clickable and triggers the AI suggestions flow

---

## Phase 2: Fix Loading State Overflow

### Overview
The skeleton loading state in HighlightsPanel has fixed pixel widths and large gaps that cause horizontal overflow on mobile.

### Changes Required:

#### 1. HighlightsPanel LoadingState
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
**Lines**: 156-177

Make skeleton items responsive:

```tsx
{/* Skeleton Items */}
{[0, 1, 2].map((index) => (
  <div
    key={index}
    className={`px-6 py-8 ${index < 2 ? 'border-b-2 border-[#eaeaec]' : ''}`}
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-1">
          <div className="skeleton-bar w-5 h-5 rounded-full" />
          <div className="skeleton-bar h-[15px] w-20 sm:w-[85px] rounded-[7px]" />
        </div>
        <div className="skeleton-bar h-[15px] w-full max-w-[240px] rounded-[7px]" />
      </div>
      <div className="flex items-center gap-4 sm:gap-12">
        <div className="flex items-center gap-1">
          <div className="skeleton-bar w-5 h-5 rounded-full" />
          <div className="skeleton-bar h-[15px] w-14 sm:w-[60px] rounded-[7px]" />
        </div>
        <div className="skeleton-bar w-5 h-5 rounded-full" />
      </div>
    </div>
  </div>
))}
```

Key changes:
- `flex-col sm:flex-row` - Stack on mobile, row on desktop
- `gap-4 sm:gap-12` - Smaller gap on mobile
- `w-full max-w-[240px]` - Fluid width with max constraint
- `w-20 sm:w-[85px]` - Responsive fixed widths

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile (375px): Loading skeleton fits within container, no horizontal scroll
- [ ] On desktop: Loading skeleton maintains current layout
- [ ] Skeleton animation still runs smoothly

---

## Phase 3: Fix Vibe Coding Preview Visibility

### Overview
The DemoCreationFlow uses a horizontal flex layout with a fixed `w-72` (288px) command panel, leaving no room for the preview on mobile. Stack the layout vertically on mobile.

### Changes Required:

#### 1. DemoCreationFlow Component
**File**: `src/components/vignettes/vibe-coding/DemoCreationFlow.tsx`
**Lines**: 104-247

Make the layout responsive:

```tsx
{/* Mini Prototype Page Layout */}
<div className="bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden min-h-[550px] sm:h-[550px]">

  {/* Mini Header - unchanged */}
  <div className="h-12 bg-white border-b border-neutral-200 flex items-center justify-between px-4">
    {/* ... existing header code ... */}
  </div>

  {/* Main Layout: Stack on mobile, side-by-side on desktop */}
  <div className="flex flex-col sm:flex-row h-[calc(100%-3rem)]">

    {/* Command Panel - full width on mobile, fixed width on desktop */}
    <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r border-neutral-200 bg-neutral-50/50 flex flex-col max-h-[280px] sm:max-h-none">
      {/* ... existing command panel content ... */}
    </div>

    {/* Prototype Preview - full width on both */}
    <div className="flex-1 bg-neutral-50 flex items-center justify-center p-4 min-h-[300px]">
      {/* ... existing preview content ... */}
    </div>
  </div>
</div>
```

Key changes:
- `flex-col sm:flex-row` - Stack vertically on mobile
- `w-full sm:w-72` - Full width on mobile, fixed on desktop
- `border-b sm:border-b-0 sm:border-r` - Bottom border on mobile, right border on desktop
- `max-h-[280px] sm:max-h-none` - Constrain command panel height on mobile
- `min-h-[550px] sm:h-[550px]` - Min height on mobile, fixed on desktop
- `min-h-[300px]` on preview - Ensure preview has space

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile (375px): Command panel stacks above preview, both visible
- [ ] On mobile: Demo plays correctly with messages appearing
- [ ] On mobile: Preview card visible after demo completes
- [ ] On desktop: Side-by-side layout preserved
- [ ] Replay button works on both mobile and desktop

---

## Phase 4: Make TUI Overlay Responsive

### Overview
The Claude Code TUI overlay in SandboxPanel has a fixed `w-[420px]` that clips on mobile. Scale it down responsively and adjust positioning.

### Changes Required:

#### 1. SandboxPanel SolutionState
**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx`
**Lines**: 177-239

Make the TUI overlay responsive:

```tsx
{/* Claude Code TUI Overlay */}
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
  className="absolute bottom-0 right-0 left-0 sm:left-auto bg-[#09090B] rounded-lg w-full sm:w-[340px] lg:w-[420px] shadow-2xl border border-[#1f1f23] overflow-hidden"
  style={{ transform: 'translate(0, 50%)' }}
>
```

Also make the prototype grid responsive (line 165):

```tsx
{/* Prototype Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-lg">
  {content.prototypes.map((item) => (
    <div
      key={item.id}
      className="rounded-[7px] h-[60px] sm:h-[78px]"
      style={{ backgroundColor: item.thumbnail }}
      aria-label={item.name}
    />
  ))}
</div>
```

Key changes:
- `left-0 sm:left-auto` - Full width on mobile, right-aligned on desktop
- `w-full sm:w-[340px] lg:w-[420px]` - Responsive width scaling
- `grid-cols-2 sm:grid-cols-3` - 2 columns on mobile, 3 on desktop
- `h-[60px] sm:h-[78px]` - Smaller thumbnails on mobile

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile (375px): TUI overlay fits within viewport, no horizontal scroll
- [ ] On mobile: Overlay text readable, not clipped
- [ ] On tablet (640px): TUI at 340px width
- [ ] On desktop (1024px+): TUI at full 420px width
- [ ] Prototype grid shows 2 columns on mobile, 3 on desktop

---

## Phase 5: Fix Scattered Card Layouts

### Overview
Both HighlightsPanel and SandboxPanel use absolute positioning with percentages for "scattered" cards, causing overlap on narrow screens. Stack cards on mobile, scatter on desktop.

### Changes Required:

#### 1. HighlightsPanel ProblemState
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
**Lines**: 194-261

Replace the scattered layout with a responsive approach:

```tsx
function ProblemState({ cards, onTransition }: { cards: FeedbackSource[]; onTransition?: () => void }) {
  const { entranceDelay, stagger } = useVignetteEntrance();
  const displayCards = cards.slice(0, 5);
  const ctaDelay = entranceDelay + displayCards.length * stagger + 0.1;

  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-end p-4 lg:p-8 overflow-hidden">
      {/* Mobile: stacked cards, Desktop: scattered absolute */}
      <div className="w-full lg:absolute lg:inset-0 flex flex-col gap-3 lg:block mb-4 lg:mb-0">
        {displayCards.map((card, index) => {
          const pos = feedbackCardPositions[index % feedbackCardPositions.length];
          return (
            <motion.div
              key={card.id}
              className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 lg:absolute lg:max-w-[220px]"
              style={{
                // Only apply absolute positioning on lg+ via CSS, but we need inline for the rotation
              }}
              // Use CSS for positioning, keep animation
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: entranceDelay + index * stagger,
                ease: 'easeOut' as const,
              }}
            >
              {/* Add a wrapper for desktop positioning */}
              <style jsx>{`
                @media (min-width: 1024px) {
                  .card-${index} {
                    position: absolute;
                    top: ${pos.top};
                    ${pos.left ? `left: ${pos.left};` : ''}
                    ${pos.right ? `right: ${pos.right};` : ''}
                    transform: rotate(${pos.rotate}deg);
                  }
                }
              `}</style>
              {card.from && (
                <div className="flex items-center gap-2 mb-2">
                  {card.avatarUrl && (
                    <img
                      src={card.avatarUrl}
                      alt={card.from}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span className="text-body-sm font-semibold text-primary">
                    {card.from}
                  </span>
                </div>
              )}
              <p className="text-body-sm text-secondary line-clamp-3">
                {card.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onTransition}
        className="btn-interactive btn-primary relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ctaDelay, duration: 0.3 }}
      >
        <span className="material-icons-outlined">auto_awesome</span>
        Show Highlights and Opportunities
      </motion.button>
    </div>
  );
}
```

**Alternative simpler approach** - conditionally render different layouts:

```tsx
function ProblemState({ cards, onTransition }: { cards: FeedbackSource[]; onTransition?: () => void }) {
  const { entranceDelay, stagger } = useVignetteEntrance();
  const displayCards = cards.slice(0, 5);
  const ctaDelay = entranceDelay + displayCards.length * stagger + 0.1;

  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-end p-4 lg:p-8 overflow-hidden">
      {/* Mobile: Simple stacked layout */}
      <div className="flex flex-col gap-3 w-full mb-4 lg:hidden">
        {displayCards.slice(0, 3).map((card, index) => (
          <motion.div
            key={card.id}
            className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: entranceDelay + index * stagger,
              ease: 'easeOut' as const,
            }}
          >
            {card.from && (
              <div className="flex items-center gap-2 mb-2">
                {card.avatarUrl && (
                  <img src={card.avatarUrl} alt={card.from} className="w-6 h-6 rounded-full" />
                )}
                <span className="text-body-sm font-semibold text-primary">{card.from}</span>
              </div>
            )}
            <p className="text-body-sm text-secondary line-clamp-2">{card.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Scattered absolute positioning */}
      <div className="absolute inset-0 hidden lg:block">
        {displayCards.map((card, index) => {
          const pos = feedbackCardPositions[index % feedbackCardPositions.length];
          return (
            <motion.div
              key={card.id}
              className="absolute bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 max-w-[220px]"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: entranceDelay + index * stagger,
                ease: 'easeOut' as const,
              }}
            >
              {card.from && (
                <div className="flex items-center gap-2 mb-2">
                  {card.avatarUrl && (
                    <img src={card.avatarUrl} alt={card.from} className="w-6 h-6 rounded-full" />
                  )}
                  <span className="text-body-sm font-semibold text-primary">{card.from}</span>
                </div>
              )}
              <p className="text-body-sm text-secondary line-clamp-3">{card.content}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onTransition}
        className="btn-interactive btn-primary relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ctaDelay, duration: 0.3 }}
      >
        <span className="material-icons-outlined">auto_awesome</span>
        Show Highlights and Opportunities
      </motion.button>
    </div>
  );
}
```

#### 2. SandboxPanel ProblemState
**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx`
**Lines**: 16-81

Apply the same pattern:

```tsx
function ProblemState({
  questions,
  onTransition
}: {
  questions: PrototypingContent['problemQuestions'];
  onTransition?: () => void;
}) {
  const { entranceDelay, stagger } = useVignetteEntrance();
  const ctaDelay = entranceDelay + questions.length * stagger + 0.1;

  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[280px] lg:min-h-[320px] flex flex-col items-center justify-center p-4 lg:p-8">
      {/* Mobile: Stacked questions */}
      <div className="flex flex-col gap-2 w-full mb-4 lg:hidden">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-body-sm text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: entranceDelay + index * stagger,
              ease: 'easeOut' as const,
            }}
          >
            {q.text}
          </motion.div>
        ))}
      </div>

      {/* Desktop: Scattered floating questions */}
      <div className="relative w-full h-36 hidden lg:block">
        {questions.map((q, index) => {
          const positions = [
            { top: '10%', left: '5%', rotate: -5 },
            { top: '5%', right: '10%', rotate: 3 },
            { top: '45%', left: '15%', rotate: -2 },
            { top: '55%', right: '5%', rotate: 4 },
          ];
          const pos = positions[index % positions.length];

          return (
            <motion.div
              key={q.id}
              className="absolute bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-body-sm text-gray-600 font-medium"
              style={{
                ...pos,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: entranceDelay + index * stagger,
                ease: 'easeOut' as const,
              }}
            >
              {q.text}
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onTransition}
        className="btn-interactive btn-primary mt-4 lg:mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ctaDelay, duration: 0.3 }}
      >
        <span className="material-icons-outlined">auto_awesome</span>
        See how I enabled this
      </motion.button>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile (375px): Cards stack vertically, no overlap, all readable
- [ ] On mobile: CTA button visible and clickable
- [ ] On desktop (1024px+): Cards scattered with rotation, matching current design
- [ ] Animations play correctly on both layouts
- [ ] Both HighlightsPanel and SandboxPanel behave consistently

---

## Phase 6: Add Swipe Gestures to Bottom Sheet

### Overview
Add drag-to-dismiss gesture to MobileDesignNotesSheet using Framer Motion's drag API. This brings the sheet to iOS-level polish.

### Changes Required:

#### 1. MobileDesignNotesSheet Component
**File**: `src/components/vignettes/shared/MobileDesignNotesSheet.tsx`
**Lines**: 62-137

Add drag gesture support:

```tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
  const [isDragging, setIsDragging] = useState(false);

  // Keyboard navigation (unchanged)
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

  // Handle drag end - dismiss if dragged down past threshold
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // Dismiss if dragged down more than 100px or with high velocity
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

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

          {/* Sheet with drag support */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 lg:hidden shadow-xl touch-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {/* Drag Handle - visual indicator */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
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

            {/* Content - disable transitions while dragging for performance */}
            <div className="px-6 pb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNote.id}
                  initial={isDragging ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isDragging ? false : { opacity: 0, x: -20 }}
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

Key changes:
- Added `drag="y"` for vertical dragging
- Added `dragConstraints={{ top: 0, bottom: 0 }}` to prevent dragging up
- Added `dragElastic={{ top: 0, bottom: 0.6 }}` for bounce effect when dragging down
- Added `touch-none` class to prevent scroll interference
- Added `onDragEnd` handler to dismiss when threshold exceeded
- Added `cursor-grab` / `cursor-grabbing` on handle for desktop feedback
- Added `isDragging` state to disable content transitions during drag

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] On mobile: Swipe down on sheet dismisses it
- [ ] On mobile: Small swipe snaps back (doesn't dismiss)
- [ ] On mobile: Fast swipe dismisses even if distance is short
- [ ] On mobile: Swipe up is blocked (can't drag past top)
- [ ] Drag handle shows grab cursor on desktop
- [ ] Button navigation still works
- [ ] Keyboard navigation (Escape, arrows) still works
- [ ] No scroll interference when dragging sheet

---

## Testing Strategy

### Unit Tests:
- No new unit tests required - these are CSS/layout changes

### Integration Tests:
- No new integration tests required

### Manual Testing Steps:
1. Open site on mobile device or Chrome DevTools mobile emulator (375px width)
2. For each vignette:
   - AI Suggestions: Verify "Improve" button visible, not clipped
   - AI Highlights: Verify loading skeleton fits, problem cards stack, solution readable
   - Prototyping: Verify TUI overlay fits, problem questions stack
   - Vibe Coding: Verify both command panel and preview visible
3. Test bottom sheet:
   - Open design notes on any vignette
   - Swipe down to dismiss
   - Verify snap-back on small swipe
4. Resize browser from mobile to desktop:
   - Verify smooth transition between layouts
   - No layout jumps or broken states

## Performance Considerations

- Using CSS-only responsive approach avoids JavaScript resize listeners
- `touch-none` on bottom sheet prevents passive scroll listener issues
- Drag gestures use Framer Motion's optimized spring physics
- No new dependencies added

## References

- Research document: `thoughts/shared/research/2025-12-29-mobile-vignette-patterns.md`
- Existing responsive pattern: `src/components/vignettes/VignetteSplit.tsx:67`
- Existing sheet animation: `src/components/vignettes/shared/MobileDesignNotesSheet.tsx:67`
- Framer Motion drag docs: https://www.framer.com/motion/gestures/
