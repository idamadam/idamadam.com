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

## Phase 1: Remove Shimmer, Redesign Button Hover States ✅ COMPLETED

### Overview
Removed the continuous `btn-shimmer` animation and redesigned hover/active states for better visual feedback without causing text blur or looking like disabled states.

### What Was Actually Implemented

#### 1. Removed Shimmer Animation
**File**: `src/app/globals.css`
- Removed `@keyframes btn-shimmer`
- Made `.btn-primary-pulse` a no-op for backwards compatibility

#### 2. Redesigned Button Hover/Active States
**File**: `src/app/globals.css`

After iterating through several approaches (scale transforms caused blurry text, darkening looked like disabled state), settled on:

```css
.btn-primary {
  background-color: var(--accent-interactive);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  border: none;
  transition: color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.btn-primary:hover {
  color: #fef3c7;  /* Light cream - readable on dark bg, warm tint */
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.4);  /* Warm amber ring */
}

.btn-primary:active {
  color: #fef3c7;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.6);
  transform: scale(0.97);  /* Subtle bounce on click */
}

.btn-primary .material-icons-outlined {
  color: inherit;  /* Icons follow text color on hover */
}
```

#### 3. Simplified Button Components
Removed `btn-primary-pulse` class and Framer Motion `whileHover`/`whileTap` from all buttons (CSS handles hover now):
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
- `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx`
- `src/components/vignettes/hero/HeroShaderPanel.tsx`
- `src/components/vignettes/home-connect/ProblemPanel.tsx`
- `src/components/vignettes/multilingual/ProblemPanel.tsx`
- `src/components/vignettes/prototyping/SandboxPanel.tsx`
- `src/components/vignettes/vibe-coding/DemoCreationFlow.tsx`

#### 4. Cleaned Up RichTextEditor
**File**: `src/components/demos/RichTextEditor.tsx`
- Removed unused `pulseImproveButton` prop
- Removed unused `readOnly` prop
- Updated `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx` to remove prop usage

### Design Decisions & Iterations

1. **Scale transforms cause blurry text** - Removed all `scale()` from hover states
2. **Dark buttons can't darken on hover** - Lightening looked disabled
3. **Warm accent ring** - Using `#f59e0b` (amber) creates visible, distinctive hover
4. **Light cream text on hover** - `#fef3c7` is readable and feels warm
5. **Subtle bounce on click** - `scale(0.97)` with 0.1s transition feels responsive

### Success Criteria

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes (0 errors)

#### Manual Verification:
- [x] CTA buttons no longer shimmer continuously
- [x] Multiple vignettes visible = calm visual experience
- [x] Hover state clearly visible (warm amber ring + cream text)
- [x] Click/tap has subtle bounce feedback
- [x] Text remains crisp (no scale blur)

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
Handle any remaining edge cases. Most items originally planned here were completed in Phase 1.

### Items Completed in Phase 1
- ✅ VibeCodingVignette: Removed `btn-primary-pulse` class, kept as static `<a>` (CSS hover works fine)
- ✅ RichTextEditor: Removed `pulseImproveButton` prop entirely (no longer needed)
- ✅ Cleaned up shimmer keyframes from CSS

### Remaining Items
- [ ] Verify all buttons work correctly after Phase 2 changes
- [ ] Final cross-browser testing
- [ ] Verify reduced motion support works end-to-end

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
