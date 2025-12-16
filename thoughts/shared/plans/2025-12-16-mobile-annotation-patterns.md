# Redline Mode Implementation Plan

## Overview

Implement a transformative "Redline Mode" for design annotations that creates a memorable portfolio moment. When toggled, the UI dims non-annotated regions, spotlights anchor points, and reveals annotations with choreographed animations. Mobile uses a bottom sheet tour. The interaction itself demonstrates mastery-level design skill.

## Current State Analysis

### Existing Implementation
- `InlineRedlines` component in `AIHighlightsVignette.tsx:14-75`
- CSS anchor positioning via `design-notes.css`
- 4 design notes anchored to: header, highlight-item, opportunity-item, feedback-footer
- Toggle button shows/hides annotations
- No transformation effect, annotations just appear/disappear

### Key Discoveries
- Framer Motion 12 available with layout animations, stagger utilities
- `useInView` hook for scroll-triggered animations
- VignetteStageContext pattern for state management
- VignetteSplit stacks at lg breakpoint (1024px)

## Desired End State

**Desktop (≥1024px)**:
- Toggle "Show design details" → UI transforms
- Panel scales to 96%, non-annotated areas dim to 40% opacity
- Spotlights appear on 4 anchor regions
- Annotations animate in sequentially (left/right based on position)
- Hover any annotation → that region pulses, others dim further
- Click empty space or toggle → smooth exit

**Mobile (<1024px)**:
- Toggle → Panel zooms slightly, backdrop dims
- Bottom sheet slides up with first annotation
- Swipe left/right to navigate between 4 annotations
- Progress dots show 1 of 4
- Current anchor region spotlit, others dimmed
- Swipe down or "Done" to exit

### Verification
- Toggle redline mode on desktop → transformation happens smoothly at 60fps
- All 4 annotations appear in sequence with staggered timing
- Hover annotation → corresponding UI region highlights
- On mobile, swipe through all 4 annotations
- Exit mode → UI returns to normal state
- Reduced motion users get instant state changes (no animation)

## What We're NOT Doing

- No sound effects (paper rustle, marker squeak) - adds complexity without core value
- No handwritten fonts - stick with existing typography
- No "question mode" gamification
- No annotation relationships/linking between notes
- No voice intro audio
- No completion celebration/confetti

## Implementation Approach

Build in phases with a kill switch. Desktop first (proves the concept), then mobile. If desktop transformation isn't smooth by Phase 2, fall back to simpler "annotations visible on toggle" without the transformation effect.

---

## Phase 1: Core Desktop Transformation

### Overview
Build the foundational redline mode toggle with spotlight/dim effect and basic annotation reveal.

### Changes Required:

#### 1. Create RedlineMode state hook
**File**: `src/components/vignettes/shared/useRedlineMode.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';

interface RedlineState {
  isActive: boolean;
  focusedAnnotation: string | null;
}

export function useRedlineMode() {
  const [state, setState] = useState<RedlineState>({
    isActive: false,
    focusedAnnotation: null,
  });

  const enterRedlineMode = useCallback(() => {
    setState(prev => ({ ...prev, isActive: true }));
  }, []);

  const exitRedlineMode = useCallback(() => {
    setState({ isActive: false, focusedAnnotation: null });
  }, []);

  const toggleRedlineMode = useCallback(() => {
    setState(prev => ({
      isActive: !prev.isActive,
      focusedAnnotation: null,
    }));
  }, []);

  const setFocusedAnnotation = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, focusedAnnotation: id }));
  }, []);

  return {
    ...state,
    enterRedlineMode,
    exitRedlineMode,
    toggleRedlineMode,
    setFocusedAnnotation,
  };
}
```

#### 2. Create RedlineOverlay component for desktop
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';

interface RedlineOverlayProps {
  isActive: boolean;
  notes: DesignNote[];
  accent: string;
  focusedAnnotation: string | null;
  onFocusAnnotation: (id: string | null) => void;
}

export default function RedlineOverlay({
  isActive,
  notes,
  accent,
  focusedAnnotation,
  onFocusAnnotation,
}: RedlineOverlayProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Dim overlay for non-annotated areas */}
          <motion.div
            className="absolute inset-0 bg-gray-900/10 pointer-events-none hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Annotations */}
          <div className="pointer-events-none hidden lg:block" style={{ overflow: 'visible' }}>
            {notes.map((note, index) => {
              const alignRight = note.position === 'right';
              const isFocused = focusedAnnotation === note.id;
              const isDimmed = focusedAnnotation !== null && !isFocused;

              return (
                <motion.div
                  key={note.id}
                  className="design-note pointer-events-auto cursor-pointer"
                  data-position={note.position}
                  style={{
                    positionAnchor: `--${note.anchor}`,
                    opacity: isDimmed ? 0.4 : 1,
                  } as React.CSSProperties}
                  initial={{ opacity: 0, x: alignRight ? -20 : 20 }}
                  animate={{
                    opacity: isDimmed ? 0.4 : 1,
                    x: 0,
                    scale: isFocused ? 1.02 : 1,
                  }}
                  exit={{ opacity: 0, x: alignRight ? -20 : 20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
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
                        initial={{ scale: 0 }}
                        animate={{
                          scale: 1,
                          boxShadow: isFocused
                            ? `0 0 0 12px ${accent}30`
                            : `0 0 0 8px ${accent}1a`
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + 0.15,
                          ease: [0.34, 1.56, 0.64, 1] // Spring
                        }}
                      />
                      <motion.div
                        className={`h-px w-8 ${alignRight ? 'mr-2' : 'ml-2'}`}
                        style={{ backgroundColor: accent }}
                        initial={{ scaleX: 0, transformOrigin: alignRight ? 'left' : 'right' }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.15, delay: index * 0.1 }}
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
                      <p className="text-[13px] font-semibold leading-[1.3]" style={{ color: accent }}>
                        {note.label}
                      </p>
                      <p className="text-[13px] leading-[1.5] mt-1 text-[#475569]">
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
```

#### 3. Add anchor region highlighting
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
**Changes**: Add data attributes and conditional styling for spotlight effect

Add to each anchored div (header, highlight-item, opportunity-item, feedback-footer):

```tsx
// Pass these props to HighlightsPanel
interface HighlightsPanelProps {
  // ... existing props
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

// On each anchor div, add transition styling:
<div
  className="border-b-2 border-[#eaeaec] px-6 py-6 transition-all duration-300"
  style={{
    anchorName: '--highlights-header',
    opacity: redlineModeActive && focusedAnchor && focusedAnchor !== 'highlights-header' ? 0.4 : 1,
    boxShadow: focusedAnchor === 'highlights-header' ? '0 0 0 2px rgba(239, 68, 68, 0.2)' : 'none',
  } as React.CSSProperties}
  data-anchor="highlights-header"
>
```

#### 4. Update AIHighlightsVignette to use redline mode
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Changes**: Replace showDesignNotes state with useRedlineMode, integrate RedlineOverlay

```tsx
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';

// In AIHighlightsContent:
const redlineMode = useRedlineMode();

// Map focusedAnnotation to anchor name for HighlightsPanel
const focusedAnchor = redlineMode.focusedAnnotation
  ? redlineNotes.find(n => n.id === redlineMode.focusedAnnotation)?.anchor ?? null
  : null;

// Update panel wrapper with transform on redline mode:
<motion.div
  className="relative"
  style={{ overflow: 'visible' }}
  animate={{
    scale: redlineMode.isActive ? 0.98 : 1,
  }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  <HighlightsPanel
    stage={stage}
    onTransition={goToSolution}
    problemCards={aiHighlightsContent.problemCards}
    redlineModeActive={redlineMode.isActive}
    focusedAnchor={focusedAnchor}
  />
  <RedlineOverlay
    isActive={redlineMode.isActive && stage === 'solution'}
    notes={redlineNotes}
    accent={accent}
    focusedAnnotation={redlineMode.focusedAnnotation}
    onFocusAnnotation={redlineMode.setFocusedAnnotation}
  />
</motion.div>

// Update toggle button:
<button onClick={redlineMode.toggleRedlineMode}>
  {redlineMode.isActive ? 'Hide design details' : 'Show design details'}
</button>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No lint errors: `npm run lint`
- [x] Dev server runs: `npm run dev`

#### Manual Verification:
- [x] Click "Show design details" → panel scales down slightly
- [x] ~~Dim overlay appears over panel~~ (removed per user feedback)
- [x] 4 annotations animate in sequentially (staggered ~100ms)
- [x] Hover annotation → it scales up, others dim
- [x] Hover off → all return to equal prominence
- [x] Click toggle again → smooth exit, panel returns to normal
- [x] Animation runs at 60fps (no jank)

**Implementation Note**: This is the critical phase. If animations aren't smooth here, simplify before proceeding. Pause for manual confirmation.

---

## Phase 2: Polish Desktop Animations

### Overview
Refine the choreography - connector line draws, dot pulses with spring physics, smoother transitions.

### Changes Required:

#### 1. Add animation presets
**File**: `src/lib/redline-animations.ts`

```typescript
export const redlineAnimations = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  },

  panelTransform: {
    active: { scale: 0.98 },
    inactive: { scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  annotation: (index: number, position: 'left' | 'right') => ({
    container: {
      initial: { opacity: 0, x: position === 'right' ? -20 : 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: position === 'right' ? -20 : 20 },
      transition: { duration: 0.3, delay: index * 0.1, ease: 'easeOut' },
    },
    connector: {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      transition: { duration: 0.15, delay: index * 0.1 },
    },
    dot: {
      initial: { scale: 0 },
      animate: { scale: [0, 1.3, 1] },
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.15,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }),
};

// Reduced motion variants
export const redlineAnimationsReduced = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 },
  },
  panelTransform: {
    active: { scale: 1 },
    inactive: { scale: 1 },
    transition: { duration: 0 },
  },
  annotation: () => ({
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 },
    },
    connector: {
      initial: { scaleX: 1 },
      animate: { scaleX: 1 },
      transition: { duration: 0 },
    },
    dot: {
      initial: { scale: 1 },
      animate: { scale: 1 },
      transition: { duration: 0 },
    },
  }),
};
```

#### 2. Add reduced motion hook
**File**: `src/lib/useReducedMotion.ts`

```typescript
'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

#### 3. Update RedlineOverlay to use animation presets
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`
**Changes**: Import and apply animation presets, respect reduced motion

```tsx
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';

// In component:
const reducedMotion = useReducedMotion();
const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

// Apply animations from presets instead of inline
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No lint errors: `npm run lint`

#### Manual Verification:
- [x] Connector lines draw outward from anchor
- [x] Dots pop in with spring/bounce effect
- [x] Label boxes slide in smoothly
- [x] Stagger timing feels natural (not robotic)
- [x] Enable "Reduce motion" in OS settings → animations become instant fades
- [x] Performance still 60fps

**Implementation Note**: Pause for manual confirmation before mobile phase.

---

## Phase 3: Mobile Bottom Sheet Tour

### Overview
Build the mobile experience - a swipeable bottom sheet that shows one annotation at a time with progress indicators.

### Changes Required:

#### 1. Create MobileRedlineTour component
**File**: `src/components/vignettes/shared/MobileRedlineTour.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';

interface MobileRedlineTourProps {
  isActive: boolean;
  notes: DesignNote[];
  accent: string;
  onExit: () => void;
}

export default function MobileRedlineTour({
  isActive,
  notes,
  accent,
  onExit,
}: MobileRedlineTourProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < notes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (info.offset.y > threshold) {
      onExit();
    }
  };

  const currentNote = notes[currentIndex];

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
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
                    onClick={() => setCurrentIndex(i)}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
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
                onClick={() => setCurrentIndex(prev => prev - 1)}
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
                    setCurrentIndex(prev => prev + 1);
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

#### 2. Add mobile markers on panel
**File**: `src/components/vignettes/shared/MobileRedlineMarkers.tsx`

```tsx
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
```

#### 3. Add mobile marker CSS
**File**: `src/components/vignettes/shared/design-notes.css`
**Changes**: Add marker styles

```css
/* Mobile Design Note Markers */
.design-note-marker {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent, #ef4444);
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Expand tap target */
.design-note-marker::before {
  content: '';
  position: absolute;
  inset: -10px;
}

.design-note-marker[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 8px -50%;
}

.design-note-marker[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -8px -50%;
}

@media (min-width: 1024px) {
  .design-note-marker {
    display: none;
  }
}

@supports not (anchor-name: --test) {
  .design-note-marker {
    display: none; /* Hide on unsupported browsers for mobile */
  }
}
```

#### 4. Integrate mobile components into AIHighlightsVignette
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Changes**: Add mobile tour and markers, manage currentIndex state

```tsx
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';

// Add to useRedlineMode or local state:
const [mobileIndex, setMobileIndex] = useState(0);

// Reset index when exiting
const handleExit = () => {
  redlineMode.exitRedlineMode();
  setMobileIndex(0);
};

// In render, after HighlightsPanel:
{redlineMode.isActive && stage === 'solution' && (
  <MobileRedlineMarkers
    notes={redlineNotes}
    accent={accent}
    currentIndex={mobileIndex}
    onMarkerClick={setMobileIndex}
  />
)}

// At component root level (outside VignetteSplit):
<MobileRedlineTour
  isActive={redlineMode.isActive && stage === 'solution'}
  notes={redlineNotes}
  accent={accent}
  onExit={handleExit}
/>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No lint errors: `npm run lint`

#### Manual Verification:
- [ ] On mobile viewport (<1024px), toggle shows bottom sheet
- [ ] Swipe left → next annotation
- [ ] Swipe right → previous annotation
- [ ] Swipe down → exits redline mode
- [ ] Tap progress dots → jumps to that annotation
- [ ] Tap marker on panel → jumps to that annotation in sheet
- [ ] Current marker pulses/highlights
- [ ] "Done" button on last annotation exits mode
- [ ] Desktop view unchanged

**Implementation Note**: Pause for manual confirmation before accessibility phase.

---

## Phase 4: Accessibility & Keyboard Navigation

### Overview
Add keyboard navigation, focus management, screen reader support, and ensure reduced motion works everywhere.

### Changes Required:

#### 1. Add keyboard navigation to RedlineOverlay
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`
**Changes**: Add keyboard event handling, focus management

```tsx
import { useEffect, useRef } from 'react';

// Add ref for focus management
const containerRef = useRef<HTMLDivElement>(null);

// Focus trap and keyboard handling
useEffect(() => {
  if (!isActive) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onExit?.();
        break;
      case 'Tab':
        // Cycle through annotations
        e.preventDefault();
        const currentIdx = notes.findIndex(n => n.id === focusedAnnotation);
        const nextIdx = e.shiftKey
          ? (currentIdx - 1 + notes.length) % notes.length
          : (currentIdx + 1) % notes.length;
        onFocusAnnotation(notes[nextIdx].id);
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isActive, focusedAnnotation, notes, onFocusAnnotation]);

// Add to annotation elements:
tabIndex={0}
role="button"
aria-label={`Design note: ${note.label}. ${note.detail}`}
onFocus={() => onFocusAnnotation(note.id)}
onBlur={() => onFocusAnnotation(null)}
```

#### 2. Add screen reader announcements
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`
**Changes**: Add live region for mode changes

```tsx
// Add at component level:
<div
  role="status"
  aria-live="polite"
  className="sr-only"
>
  {isActive
    ? `Design annotation mode activated. Showing ${notes.length} design notes. Use Tab to navigate between annotations, Escape to exit.`
    : ''
  }
</div>
```

#### 3. Add keyboard navigation to MobileRedlineTour
**File**: `src/components/vignettes/shared/MobileRedlineTour.tsx`
**Changes**: Arrow key navigation

```tsx
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
          setCurrentIndex(prev => prev + 1);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
        break;
      case 'Home':
        setCurrentIndex(0);
        break;
      case 'End':
        setCurrentIndex(notes.length - 1);
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isActive, currentIndex, notes.length, onExit]);
```

#### 4. Ensure all animations respect reduced motion
Review all components and ensure they import and use `useReducedMotion` hook.

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] No lint errors: `npm run lint`

#### Manual Verification:
- [ ] Tab cycles through annotations on desktop
- [ ] Escape exits redline mode
- [ ] Arrow keys navigate on mobile tour
- [ ] Screen reader announces mode activation
- [ ] Screen reader reads annotation content on focus
- [ ] Reduced motion: all animations become instant fades
- [ ] Focus rings visible on all interactive elements

**Implementation Note**: This completes the implementation.

---

## Testing Strategy

### Manual Testing Steps:
1. Desktop Chrome: Full flow (toggle, hover each annotation, exit)
2. Desktop Firefox: Same flow (check anchor positioning fallback if needed)
3. Desktop Safari: Same flow
4. Mobile Chrome (DevTools): Toggle, swipe through all, exit via swipe down
5. Mobile Safari (real device if possible): Same flow
6. Keyboard only: Navigate entire feature without mouse
7. Screen reader (VoiceOver/NVDA): Verify announcements
8. Reduced motion enabled: Verify instant transitions

### Edge Cases:
- Rapidly toggling redline mode on/off
- Resizing viewport while mode is active
- Switching between problem/solution stages while mode is active
- Browser back button while mode is active

## Performance Considerations

- All animations use `transform` and `opacity` only (GPU-accelerated)
- No layout thrashing (no reads then writes in animation frames)
- Intersection Observer for any scroll-linked effects (not scroll events)
- Bottom sheet uses spring physics (no manual frame calculations)

## Kill Switch

If Phase 1 animations aren't smooth:
1. Remove the scale transform on the panel
2. Remove the dim overlay
3. Keep just the annotation reveal with simple fade-in
4. This gives you "annotations on toggle" without transformation risk

## References

- Research: `thoughts/shared/research/2025-12-16-mobile-annotation-patterns.md`
- Concept B exploration: Zoom/transform "Redline Mode" detailed choreography
- Existing implementation: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
