# Floating UI Redline Annotations Implementation Plan

## Overview

Replace CSS Anchor Positioning with Floating UI for redline annotations, fixing viewport clipping issues and adding indicator dots to hint at available annotations. This addresses two UX problems: right-side annotations clipping on laptop screens, and left-side annotations overlapping VignetteSplit text.

## Current State Analysis

### Existing Implementation
- **Positioning**: CSS Anchor Positioning API (`design-notes.css:14-36`) with `position-anchor` set via inline styles
- **Container**: `VignetteContainer` has `allowOverflow={true}` to let annotations escape bounds
- **Activation**: Toggle button appears in solution stage (`AIHighlightsVignette.tsx:121-136`)
- **Components**: `RedlineOverlay.tsx` renders desktop annotations, `MobileRedlineTour.tsx` handles mobile

### Key Files
- `src/components/vignettes/ai-highlights/design-notes.css` - CSS anchor positioning rules
- `src/components/vignettes/shared/RedlineOverlay.tsx` - Desktop annotation rendering
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx` - Vignette with redline integration
- `src/components/vignettes/shared/useRedlineMode.ts` - State management hook

### Problems
1. No viewport collision detection - annotations clip at screen edges
2. Left annotations can overlap VignetteSplit left column (360-400px)
3. No visual hint that annotations exist before user clicks the toggle

## Desired End State

After implementation:
1. Annotations automatically flip/shift when approaching viewport edges
2. Left-side annotations stay within panel bounds, never overlapping text column
3. Small indicator dots appear near anchor points when annotations are hidden, hinting at available content
4. Click toggle to reveal full annotations (existing behavior preserved)
5. Mobile behavior unchanged (tap-to-reveal with bottom sheet tour)

### Verification
- Resize browser to 1024px width - right annotations should flip to left or shift up/down
- In solution stage, small dots should be visible near anchor points before clicking toggle
- Click toggle - full annotations appear, dots disappear
- Mobile (< 1024px) - numbered dots should still appear on tap

## What We're NOT Doing

- Removing mobile tap-to-reveal behavior (keep MobileRedlineTour)
- Changing annotation visual design (keep current red accent, label boxes)
- Changing the staged flow (Problem → Solution → Design Notes)
- Adding hover-to-reveal (keeping explicit click activation)

## Implementation Approach

Floating UI provides `flip` and `shift` middleware for collision detection. We'll:
1. Add `@floating-ui/react` package
2. Create a new `FloatingAnnotation` component using `useFloating` hook
3. Replace CSS anchor positioning with JS-based positioning
4. Add indicator dots that appear when annotations are hidden
5. Keep the toggle button as the primary activation method

## Phase 1: Add Floating UI and Create FloatingAnnotation Component

### Overview
Install Floating UI and create a new component that positions annotations using JS instead of CSS anchors.

### Changes Required:

#### 1. Install Package
**Command**: `npm install @floating-ui/react`

#### 2. Create FloatingAnnotation Component
**File**: `src/components/vignettes/shared/FloatingAnnotation.tsx`

```tsx
'use client';

import { useFloating, flip, shift, offset, autoUpdate, Placement } from '@floating-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { DesignNote } from '@/components/vignettes/types';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface FloatingAnnotationProps {
  note: DesignNote;
  anchorElement: HTMLElement | null;
  accent: string;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function FloatingAnnotation({
  note,
  anchorElement,
  accent,
  index,
  isFocused,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: FloatingAnnotationProps) {
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  // Map note.position to Floating UI placement
  const placement: Placement = note.position === 'left' ? 'left' :
                                note.position === 'top' ? 'top' :
                                note.position === 'bottom' ? 'bottom' : 'right';

  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [
      offset(16), // Gap from anchor
      flip({
        fallbackPlacements: ['top', 'bottom', 'left', 'right'],
        padding: 20,
      }),
      shift({
        padding: 20,
        crossAxis: true,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Sync anchor element with Floating UI
  useEffect(() => {
    if (anchorElement) {
      refs.setReference(anchorElement);
    }
  }, [anchorElement, refs]);

  const alignRight = note.position === 'right';
  const position = note.position === 'right' || note.position === 'left' ? note.position : 'right';
  const anim = animations.annotation(index, position);

  if (!anchorElement) return null;

  return (
    <motion.div
      ref={refs.setFloating}
      style={floatingStyles}
      className="pointer-events-auto cursor-pointer z-50"
      initial={anim.container.initial}
      animate={{
        ...anim.container.animate,
        opacity: isDimmed ? 0.4 : 1,
        scale: isFocused ? 1.02 : 1,
      }}
      exit={anim.container.exit}
      transition={anim.container.transition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`flex items-start ${alignRight ? 'text-left' : 'flex-row-reverse text-right'}`}>
        {/* Dot and line */}
        <div className={`flex items-center pt-4 ${alignRight ? '' : 'flex-row-reverse'}`}>
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accent }}
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
          style={{ border: `1px solid ${accent}33` }}
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
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Package installs successfully: `npm install @floating-ui/react`
- [ ] TypeScript compiles without errors: `npm run build`
- [ ] New component file exists at correct path

#### Manual Verification:
- [ ] Component renders (will test in Phase 2 integration)

---

## Phase 2: Update RedlineOverlay to Use FloatingAnnotation

### Overview
Replace the CSS anchor-based positioning in RedlineOverlay with the new FloatingAnnotation component.

### Changes Required:

#### 1. Create Anchor Registry Hook
**File**: `src/components/vignettes/shared/useAnchorRegistry.ts`

```tsx
'use client';

import { useState, useCallback } from 'react';

export function useAnchorRegistry() {
  const [anchors, setAnchors] = useState<Map<string, HTMLElement>>(new Map());

  const registerAnchor = useCallback((name: string, element: HTMLElement | null) => {
    setAnchors(prev => {
      const next = new Map(prev);
      if (element) {
        next.set(name, element);
      } else {
        next.delete(name);
      }
      return next;
    });
  }, []);

  const getAnchor = useCallback((name: string) => {
    return anchors.get(name) ?? null;
  }, [anchors]);

  return { registerAnchor, getAnchor };
}
```

#### 2. Update RedlineOverlay
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`

Replace the entire file:

```tsx
'use client';

import { AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';
import FloatingAnnotation from './FloatingAnnotation';

interface RedlineOverlayProps {
  isActive: boolean;
  notes: DesignNote[];
  accent: string;
  focusedAnnotation: string | null;
  onFocusAnnotation: (id: string | null) => void;
  getAnchorElement: (anchorName: string) => HTMLElement | null;
}

export default function RedlineOverlay({
  isActive,
  notes,
  accent,
  focusedAnnotation,
  onFocusAnnotation,
  getAnchorElement,
}: RedlineOverlayProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="pointer-events-none hidden lg:block" style={{ overflow: 'visible' }}>
          {notes.map((note, index) => (
            <FloatingAnnotation
              key={note.id}
              note={note}
              anchorElement={getAnchorElement(note.anchor)}
              accent={accent}
              index={index}
              isFocused={focusedAnnotation === note.id}
              isDimmed={focusedAnnotation !== null && focusedAnnotation !== note.id}
              onMouseEnter={() => onFocusAnnotation(note.id)}
              onMouseLeave={() => onFocusAnnotation(null)}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
```

#### 3. Update HighlightsPanel to Register Anchors
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`

Add ref registration for anchor elements. Find the elements with `data-anchor` attributes and add refs:

```tsx
// Add to component props
interface HighlightsPanelProps {
  // ... existing props
  onRegisterAnchor?: (name: string, element: HTMLElement | null) => void;
}

// In SolutionState, update elements with data-anchor:
// Replace data-anchor="highlights-header" with:
ref={(el) => onRegisterAnchor?.('highlights-header', el)}
data-anchor="highlights-header"

// Do the same for all other anchored elements
```

#### 4. Update AIHighlightsVignette to Wire Up Anchor Registry
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

```tsx
// Add import
import { useAnchorRegistry } from '@/components/vignettes/shared/useAnchorRegistry';

// In AIHighlightsContent, add:
const { registerAnchor, getAnchor } = useAnchorRegistry();

// Pass to HighlightsPanel:
<HighlightsPanel
  // ... existing props
  onRegisterAnchor={registerAnchor}
/>

// Update RedlineOverlay:
<RedlineOverlay
  isActive={redlineMode.isActive && stage === 'solution'}
  notes={redlineNotes}
  accent={accent}
  focusedAnnotation={redlineMode.focusedAnnotation}
  onFocusAnnotation={redlineMode.setFocusedAnnotation}
  getAnchorElement={getAnchor}
/>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] No runtime errors in browser console

#### Manual Verification:
- [ ] Annotations appear in correct positions when redline mode is activated
- [ ] Resize to 1024px width - annotations should flip/shift to stay visible
- [ ] Hover on annotation highlights it, others dim
- [ ] Animation timing matches previous behavior

**Implementation Note**: After completing this phase, pause for manual testing to verify positioning works correctly before proceeding.

---

## Phase 3: Add Indicator Dots

### Overview
Add small indicator dots near anchor points when annotations are hidden. These dots hint that additional content is available and disappear when full annotations are shown.

### Changes Required:

#### 1. Create IndicatorDots Component
**File**: `src/components/vignettes/shared/IndicatorDots.tsx`

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { DesignNote } from '@/components/vignettes/types';

interface IndicatorDotsProps {
  isVisible: boolean;
  notes: DesignNote[];
  accent: string;
  getAnchorElement: (anchorName: string) => HTMLElement | null;
}

export default function IndicatorDots({
  isVisible,
  notes,
  accent,
  getAnchorElement,
}: IndicatorDotsProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="pointer-events-none hidden lg:block">
          {notes.map((note, index) => {
            const anchor = getAnchorElement(note.anchor);
            if (!anchor) return null;

            // Position dot at the edge of the anchor element
            const rect = anchor.getBoundingClientRect();
            const isRight = note.position === 'right';

            return (
              <motion.div
                key={note.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: accent,
                  // Position near the anchor edge
                  left: isRight ? rect.right + 8 : rect.left - 16,
                  top: rect.top + rect.height / 2 - 4,
                  position: 'fixed',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 0.6,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: 'easeOut'
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
```

#### 2. Add IndicatorDots to AIHighlightsVignette
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

```tsx
// Add import
import IndicatorDots from '@/components/vignettes/shared/IndicatorDots';

// In AIHighlightsContent, add after RedlineOverlay:
{/* Indicator dots when annotations are hidden */}
<IndicatorDots
  isVisible={!redlineMode.isActive && stage === 'solution'}
  notes={redlineNotes}
  accent={accent}
  getAnchorElement={getAnchor}
/>
```

### Design Notes
- Dots are 8px (w-2 h-2), smaller than annotation dots (10px)
- Opacity is 0.6 to be subtle but noticeable
- Dots appear with staggered animation (50ms delay between each)
- Hidden on mobile (lg:block) since mobile has its own interaction pattern

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] No console errors

#### Manual Verification:
- [ ] In solution stage with redline mode OFF, small dots appear near anchor points
- [ ] Dots animate in with subtle stagger
- [ ] Click toggle - dots disappear, full annotations appear
- [ ] Dots are not visible on mobile
- [ ] Dots don't interfere with panel interactions

---

## Phase 4: Cleanup and Polish

### Overview
Remove unused CSS anchor positioning code and ensure mobile behavior is unchanged.

### Changes Required:

#### 1. Simplify design-notes.css
**File**: `src/components/vignettes/ai-highlights/design-notes.css`

Remove the CSS anchor positioning rules for `.design-note` (keep mobile marker styles):

```css
/* Design Notes - now positioned via Floating UI */

/* Mobile Design Note Markers - keep these, they use CSS anchors */
.design-note-marker {
  /* ... existing styles ... */
}

/* Keep the marker positioning rules */
.design-note-marker[data-position="right"] { /* ... */ }
.design-note-marker[data-position="left"] { /* ... */ }

/* Keep the @supports fallback for mobile */
@supports not (anchor-name: --test) {
  .design-note-marker {
    display: none;
  }
}
```

#### 2. Remove Unused Imports
Review files for any imports that are no longer needed after removing CSS anchor positioning.

#### 3. Verify Mobile Behavior
Ensure MobileRedlineMarkers still uses CSS anchor positioning correctly (it only shows on mobile, so clipping isn't an issue there).

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] No unused imports warnings
- [ ] CSS file is cleaner

#### Manual Verification:
- [ ] Desktop: Click toggle reveals annotations, they position correctly with flip/shift
- [ ] Indicator dots visible when annotations hidden, disappear when shown
- [ ] Mobile: Tap button shows numbered markers, bottom sheet tour works
- [ ] No visual regressions in annotation styling

---

## Testing Strategy

### Unit Tests
Not required for this change - visual positioning is best tested manually.

### Manual Testing Steps

#### Desktop (1024px+ width)
1. Navigate to AI Highlights vignette, click to enter solution stage
2. Verify small indicator dots appear near anchor points
3. Click "Show design details" toggle - full annotations appear, dots disappear
4. Resize browser to 1024px width - verify annotations flip/shift to stay visible
5. Click toggle again to hide annotations - dots reappear

#### Mobile (< 1024px width)
1. Tap "Show design details" button
2. Numbered markers should appear on anchor points
3. Bottom sheet tour should open
4. Swipe/navigate through annotations
5. Press "Done" or swipe down to dismiss

### Edge Cases
- Very narrow viewport (< 800px) - annotations should flip to available space
- Panel near bottom of viewport - annotations should shift up
- Rapid toggle clicks - should not cause visual glitches

## Performance Considerations

- Floating UI adds ~15kb gzipped to bundle
- `autoUpdate` continuously monitors anchor position (may need to optimize if performance issues arise)
- Consider using `whileElementsMounted` cleanup to avoid memory leaks

## References

- Research document: `thoughts/shared/research/2025-12-18-redline-annotation-ux-patterns.md`
- [Floating UI flip middleware](https://floating-ui.com/docs/flip)
- [Floating UI shift middleware](https://floating-ui.com/docs/shift)
- Current implementation: `src/components/vignettes/shared/RedlineOverlay.tsx`
