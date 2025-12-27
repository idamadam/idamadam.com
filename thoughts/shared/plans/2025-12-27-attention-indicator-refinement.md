# Attention Indicator Refinement Implementation Plan

## Overview

Replace the continuous `btn-shimmer` animation with one-shot entrance animations for CTA buttons and add subtle breathing animation for design note dots. The goal is to reduce visual noise when multiple vignettes are visible on screen while maintaining discoverability.

## Current State Analysis

### Button Shimmer (`btn-primary-pulse`)
- **Definition**: `src/app/globals.css:335-346`
- **Animation**: Infinite 3s gradient shimmer cycling left-to-right
- **Usage**: 8 component files, all primary CTA buttons
- **Problem**: When 4+ vignettes are visible, competing shimmer animations become overwhelming

### Design Note Dots
- **Component**: `src/components/vignettes/shared/RedlineOverlay.tsx:96-109`
- **Current behavior**: Static dots with hover/focus state changes (scale, opacity, boxShadow)
- **No entrance animation**: Dots appear instantly when design notes stage loads
- **Color**: Uses `DESIGN_NOTES_ACCENT` (#ef4444, red)

### Existing Animation Infrastructure
- `src/lib/animations.ts`: Contains `fadeInUp`, `subtlePulse`, `buttonAnimations`
- Buttons already use Framer Motion for `initial`, `animate`, `whileHover`, `whileTap`
- `prefers-reduced-motion` support exists at `globals.css:371-375`

### Key Discoveries
- Buttons enter with opacity/y animation over 0.3-0.5s delay (varies per vignette)
- Design note dots use Framer Motion `animate` for state transitions
- The shimmer effect happens via CSS `background-position` animation, not Framer

## Desired End State

**Buttons:**
- Enter viewport with existing fade-in-up animation
- Brief "pop" effect at end of entrance (scale pulse + subtle glow)
- Static high-contrast appearance after entrance completes
- No continuous animation

**Design Note Dots:**
- Subtle breathing animation (scale + opacity pulse, 2.5s cycle)
- Staggered entrance when design notes stage activates
- Warm accent color (`--warm-accent: #f59e0b`) instead of red

**Verification:**
1. Visual: Multiple vignettes visible on screen should feel calm, not busy
2. A11y: All animations disabled when `prefers-reduced-motion: reduce`
3. Discoverability: Buttons still visually prominent through color contrast

## What We're NOT Doing

- Removing hover/tap interactions (keep existing `whileHover`, `whileTap`)
- Changing button colors or sizing
- Adding new animation libraries
- Modifying the design note expansion/collapse behavior
- Changing mobile design note markers (they're already simple dots)

## Implementation Approach

Use Framer Motion exclusively for button entrance animations (cleaner than coordinating CSS + Framer). Keep CSS for design note dot breathing since it's a simple infinite loop.

## Phase 1: Remove Shimmer, Add Button Entrance Animation

### Overview
Replace `btn-primary-pulse` with a new `btn-entrance` class that applies a one-shot scale/glow animation via Framer Motion.

### Changes Required

#### 1. Update Button Animation Presets
**File**: `src/lib/animations.ts`
**Changes**: Add new entrance animation preset

```typescript
/**
 * One-shot button entrance animation
 * Use after fadeInUp completes for a subtle "pop" effect
 */
export const buttonEntrance = {
  initial: { scale: 1, boxShadow: '0 0 0 0 rgba(24, 24, 27, 0)' },
  animate: {
    scale: [1, 1.03, 1],
    boxShadow: [
      '0 0 0 0 rgba(24, 24, 27, 0)',
      '0 0 12px 4px rgba(24, 24, 27, 0.12)',
      '0 0 0 0 rgba(24, 24, 27, 0)',
    ],
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut' as const,
    times: [0, 0.5, 1],
  },
};
```

#### 2. Update globals.css
**File**: `src/app/globals.css`
**Changes**: Remove shimmer animation, simplify button styling

Replace lines 329-346:
```css
/* Shimmer animation for text */
@keyframes btn-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.btn-primary-pulse {
  background: linear-gradient(
    90deg,
    var(--accent-interactive) 0%,
    var(--accent-interactive) 40%,
    var(--neutral-600) 50%,
    var(--accent-interactive) 60%,
    var(--accent-interactive) 100%
  );
  background-size: 200% 100%;
  animation: btn-shimmer 3s ease-in-out infinite;
}
```

With:
```css
/* btn-primary-pulse is now a no-op for backwards compatibility */
/* Entrance animation handled via Framer Motion buttonEntrance preset */
.btn-primary-pulse {
  /* Intentionally empty - class kept for any external references */
}
```

Update reduced motion (line 374):
```css
/* Remove: .btn-primary-pulse { animation: none; } - no longer needed */
```

#### 3. Update Vignette Button Components
**Files to update** (8 files):
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx:234-248`
- `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx:29`
- `src/components/vignettes/hero/HeroShaderPanel.tsx:160`
- `src/components/vignettes/home-connect/ProblemPanel.tsx:96`
- `src/components/vignettes/multilingual/ProblemPanel.tsx:112`
- `src/components/vignettes/prototyping/SandboxPanel.tsx:65`
- `src/components/vignettes/vibe-coding/DemoCreationFlow.tsx:131`
- `src/components/demos/RichTextEditor.tsx:56`

**Pattern for motion.button updates**:
```tsx
import { buttonEntrance } from '@/lib/animations';

<motion.button
  className="btn-interactive btn-primary"  // Remove btn-primary-pulse
  initial={{ opacity: 0, y: 10, ...buttonEntrance.initial }}
  animate={{ opacity: 1, y: 0, ...buttonEntrance.animate }}
  transition={{
    opacity: { delay: 0.5, duration: 0.3 },
    y: { delay: 0.5, duration: 0.3 },
    scale: { delay: 0.8, ...buttonEntrance.transition },  // Start pop after fade
    boxShadow: { delay: 0.8, ...buttonEntrance.transition },
  }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

For non-motion buttons (VibeCodingVignette, RichTextEditor), wrap in motion or keep static.

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors in dev mode: `npm run dev`

#### Manual Verification:
- [ ] CTA buttons no longer shimmer continuously
- [ ] Buttons have subtle "pop" effect when scrolling into view
- [ ] Multiple vignettes visible = calm visual experience
- [ ] Hover/tap states still work correctly
- [ ] Reduced motion setting disables entrance animation

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Add Design Note Dot Breathing Animation

### Overview
Add subtle breathing animation to design note dots and change their color from red to warm accent.

### Changes Required

#### 1. Add CSS Breathing Animation
**File**: `src/components/vignettes/shared/design-notes.css`
**Changes**: Add keyframes and apply to dot class

Add after line 125:
```css
/* Breathing animation for design note dots */
@keyframes dot-breathe {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.15);
  }
}

.design-note-marker-dot {
  animation: dot-breathe 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .design-note-marker-dot {
    animation: none;
  }
}
```

#### 2. Update Design Notes Accent Color
**File**: `src/components/vignettes/shared/constants.ts`
**Changes**: Change from red to warm accent

```typescript
// Before: export const DESIGN_NOTES_ACCENT = '#ef4444';
export const DESIGN_NOTES_ACCENT = '#f59e0b';  // Warm accent (amber)
```

#### 3. Update RedlineOverlay Dot Animation
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`
**Changes**: Adjust dot styles for warm accent color

Update `dotStyles` object (lines 38-59):
```typescript
const dotStyles = {
  subtle: {
    scale: 1,
    opacity: 0.7,  // Slightly more visible with warm color
    boxShadow: `0 0 0 4px ${accent}20`,
  },
  focused: {
    scale: 1.15,
    opacity: 1,
    boxShadow: `0 0 0 8px ${accent}35`,
  },
  expanded: {
    scale: 1.1,
    opacity: 1,
    boxShadow: `0 0 0 10px ${accent}45`,
  },
  dimmed: {
    scale: 1,
    opacity: 0.4,
    boxShadow: `0 0 0 4px ${accent}12`,
  },
};
```

#### 4. Add Staggered Entrance for Dots
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`
**Changes**: Add entrance animation with stagger

Update the dot button motion props:
```tsx
<motion.button
  className="w-2.5 h-2.5 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  style={{
    backgroundColor: accent,
    focusVisibleRingColor: accent,
  } as React.CSSProperties}
  initial={reducedMotion ? {} : { scale: 0, opacity: 0 }}
  animate={reducedMotion
    ? { opacity: dotStyles[dotState].opacity }
    : dotStyles[dotState]
  }
  transition={{
    duration: 0.2,
    // Stagger entrance based on note index
    delay: index * 0.1,
  }}
  // ... rest unchanged
/>
```

Note: Need to pass `index` from the map function to enable stagger.

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors in dev mode

#### Manual Verification:
- [ ] Design note dots show subtle breathing animation
- [ ] Dots are amber/gold color instead of red
- [ ] Dots stagger in when entering design notes stage
- [ ] Breathing animation stops with `prefers-reduced-motion`
- [ ] Mobile markers (if visible) work correctly
- [ ] Click/hover interactions still function

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 3: Polish and Edge Cases

### Overview
Handle edge cases and ensure consistency across all vignettes.

### Changes Required

#### 1. Handle Static Button in VibeCodingVignette
**File**: `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx`
**Changes**: Convert `<a>` to `motion.a` for entrance animation

```tsx
import { motion } from 'framer-motion';
import { buttonEntrance } from '@/lib/animations';

<motion.a
  href="https://studio.up.railway.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-interactive btn-primary"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0, ...buttonEntrance.animate }}
  viewport={{ once: true }}
  transition={{
    opacity: { duration: 0.3 },
    y: { duration: 0.3 },
    scale: { delay: 0.3, ...buttonEntrance.transition },
    boxShadow: { delay: 0.3, ...buttonEntrance.transition },
  }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Join the waitlist
  <span className="material-icons-outlined">arrow_forward</span>
</motion.a>
```

#### 2. Handle Conditional Pulse in RichTextEditor
**File**: `src/components/demos/RichTextEditor.tsx`
**Changes**: The `pulseImproveButton` prop controlled conditional shimmer. Replace with entrance animation.

Since this is inside a demo, the entrance should trigger when `pulseImproveButton` becomes true:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Replace static button with motion.button
<motion.button
  onClick={onImprove}
  disabled={isImproving}
  className="btn-interactive btn-primary h-10 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
  animate={pulseImproveButton ? {
    scale: [1, 1.03, 1],
    boxShadow: [
      '0 0 0 0 rgba(24, 24, 27, 0)',
      '0 0 12px 4px rgba(24, 24, 27, 0.12)',
      '0 0 0 0 rgba(24, 24, 27, 0)',
    ],
  } : {}}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

#### 3. Clean Up Unused CSS
**File**: `src/app/globals.css`
**Changes**: Remove the shimmer keyframes entirely since they're no longer used

Delete lines 329-333:
```css
/* Shimmer animation for text */
@keyframes btn-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

And simplify `.btn-primary-pulse` or remove it entirely.

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compiles: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] No unused CSS warnings

#### Manual Verification:
- [ ] Vibe Coding waitlist link has entrance animation
- [ ] RichTextEditor "Improve" button pulses when triggered
- [ ] All 8 original button locations work correctly
- [ ] No visual regressions across any vignette
- [ ] Page feels calm with multiple vignettes in view

---

## Testing Strategy

### Unit Tests
N/A - animations are visual and not unit testable

### Integration Tests
N/A - no automated visual regression testing set up

### Manual Testing Steps
1. Open homepage in Chrome with dev tools network throttled to "Slow 3G"
2. Scroll slowly through all vignettes, observe button entrance animations
3. Verify no continuous shimmer on any button
4. Click "Design Notes" on AI Highlights vignette
5. Verify dots are amber colored and breathing
6. Open Chrome DevTools > Rendering > Emulate CSS media feature > prefers-reduced-motion: reduce
7. Repeat steps 2-5, verify no animations occur
8. Test on mobile viewport (375px width)

## Performance Considerations

- One-shot animations are more performant than infinite CSS animations
- `will-change` not needed for these small scale transforms
- Animation delays are short (0.1-0.8s), no perceivable performance impact

## References

- Research document: `thoughts/shared/research/2025-12-27-attention-indicator-patterns.md`
- Button definition: `src/app/globals.css:335-346`
- Animation presets: `src/lib/animations.ts`
- Design note dots: `src/components/vignettes/shared/RedlineOverlay.tsx`
