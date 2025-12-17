# Loading Text Transition Improvement - Implementation Plan

## Overview

Improve the loading text transition in AIHighlightsVignette to eliminate "dead time" between exit and enter animations. The current implementation creates a disconnected feel during the problem→solution transition.

## Current State Analysis

**File:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx` (lines 88-112)

**Current Implementation:**
```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={stage}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  >
    {title}
  </motion.span>
</AnimatePresence>
```

**Problems:**
1. `mode="wait"` waits for exit animation to complete before starting enter animation
2. Text fades to opacity 0 during loading, creating "dead time"
3. Exit animation runs even though text is already invisible
4. **Total perceived time:** 300ms exit + 1500ms loading + 300ms enter = 2100ms
5. Timing feels disconnected from panel transition

### Key Discoveries:
- `useReducedMotion` hook already exists at `src/lib/useReducedMotion.ts:5-21`
- Hook is already imported in AIHighlightsVignette.tsx but not used for text transitions
- Title and description have identical animation patterns (lines 88-98 and 102-112)
- Description has a 0.05s delay stagger (line 108)

## Desired End State

After implementation:
1. Text immediately dims to 30% opacity when loading starts (signals "thinking")
2. Old and new text crossfade simultaneously (no gap)
3. New text fades to 100% when loading ends (feels instant and responsive)
4. **Total perceived time:** 200ms fade + 1500ms loading + 200ms fade = 1900ms
5. Animation respects `prefers-reduced-motion` setting

**Verification:**
- Visually observe smooth crossfade during problem→solution transition
- No visible "dead time" gap between old and new text
- Text appears dimmed (opacity 0.3) during 1.5s loading period
- Test with `prefers-reduced-motion: reduce` - y-movement should be disabled

## What We're NOT Doing

- Creating a shared `AnimatedText` component (future scope)
- Modifying AI Suggestions or Multilingual vignettes (future scope)
- Changing the panel transition animations in HighlightsPanel.tsx
- Modifying the 1.5s loading duration
- Adding skeleton loading for text (panel already has this)

## Implementation Approach

Use **Approach 1: Instant Text Swap with Crossfade** from the research document. This involves:
1. Changing `mode="wait"` to `mode="sync"` for simultaneous exit/enter
2. Adding `initial={false}` to prevent animation on mount
3. Changing opacity from 0 to 0.3 during loading (dimmed "thinking" state)
4. Removing y-movement for stability during loading
5. Reducing duration to 0.2s for snappier feel

## Phase 1: Update Title Animation

### Overview
Fix the title text transition to use crossfade with dimmed loading state.

### Changes Required:

#### 1. Title AnimatePresence Block
**File:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Lines:** 88-98

**From:**
```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={stage}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  >
    {title}
  </motion.span>
</AnimatePresence>
```

**To:**
```tsx
<AnimatePresence mode="sync" initial={false}>
  <motion.span
    key={stage}
    initial={{ opacity: 0 }}
    animate={{ opacity: isLoading ? 0.3 : 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {title}
  </motion.span>
</AnimatePresence>
```

**Why these changes:**
- `mode="sync"`: Exit and enter happen simultaneously (crossfade, no gap)
- `initial={false}`: Prevents animation on first render
- `opacity: 0.3`: Dimmed "thinking" state during loading instead of invisible
- Removed `y` movement: Text stays stable during loading transition
- `duration: 0.2`: Faster transition feels more responsive
- `ease: "easeOut"`: Simpler easing, snappier feel

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles without errors: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Dev server starts without errors: `npm run dev`

#### Manual Verification:
- [ ] Title text dims to ~30% opacity when "Show Highlights" button is clicked
- [ ] Title text stays dimmed during 1.5s loading animation
- [ ] New title ("Solution") fades in smoothly when loading completes
- [ ] No visible gap or jump between old and new title text
- [ ] Animation feels coordinated with panel transition

**Implementation Note:** After completing this phase and all automated verification passes, pause here for manual confirmation that the title animation feels right before proceeding to Phase 2.

---

## Phase 2: Update Description Animation

### Overview
Apply the same crossfade pattern to the description text, maintaining the stagger delay.

### Changes Required:

#### 1. Description AnimatePresence Block
**File:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Lines:** 102-112

**From:**
```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={stage}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
  >
    {description}
  </motion.span>
</AnimatePresence>
```

**To:**
```tsx
<AnimatePresence mode="sync" initial={false}>
  <motion.span
    key={stage}
    initial={{ opacity: 0 }}
    animate={{ opacity: isLoading ? 0.3 : 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
  >
    {description}
  </motion.span>
</AnimatePresence>
```

**Why these changes:**
- Same pattern as title for consistency
- Kept `delay: 0.05` to maintain staggered reveal (title first, then description)

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles without errors: `npm run build`
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Description text dims slightly after title (0.05s stagger)
- [ ] Both title and description stay dimmed during loading
- [ ] Description fades in after title on loading complete
- [ ] Overall transition feels smooth and coordinated
- [ ] Test rapid clicking between Problem/Solution stages - no glitches

**Implementation Note:** After completing this phase and all automated verification passes, pause here for manual confirmation that the full text transition feels polished.

---

## Phase 3: Add Reduced Motion Support (Optional Enhancement)

### Overview
Ensure text transitions respect `prefers-reduced-motion` for accessibility. Currently the hook is imported but not used for text animations.

### Changes Required:

#### 1. Use reducedMotion for transition duration
**File:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

The `reducedMotion` variable is already available (line 37). Update both title and description transitions:

**Title (around line 95):**
```tsx
transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
```

**Description (around line 110):**
```tsx
transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut", delay: reducedMotion ? 0 : 0.05 }}
```

**Why:**
- Users with `prefers-reduced-motion: reduce` get instant text swaps
- Removes both animation duration and stagger delay
- Still shows the dimmed loading state (opacity change is not considered problematic motion)

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles without errors: `npm run build`
- [ ] Linting passes: `npm run lint`

#### Manual Verification:
- [ ] Enable "Reduce motion" in OS accessibility settings
- [ ] Text changes instantly (no fade animation) when loading
- [ ] Text still dims during loading period (opacity 0.3)
- [ ] Disable "Reduce motion" - animations return to normal

---

## Testing Strategy

### Manual Testing Steps:
1. Navigate to homepage and scroll to AI Highlights vignette
2. Click "Show Highlights and Opportunities" button
3. Observe: Title and description should dim immediately
4. Observe: Text stays dimmed during 1.5s loading animation
5. Observe: New text ("Solution" title) fades in smoothly
6. Click Problem/Solution stage indicators rapidly
7. Verify no animation glitches or stuck states
8. Test on mobile viewport (responsive behavior)

### Accessibility Testing:
1. Enable `prefers-reduced-motion: reduce` in browser/OS
2. Repeat steps 1-6
3. Verify instant text changes (no animation)
4. Verify dimmed state still visible during loading

### Browser Testing:
- Chrome (primary)
- Safari (Framer Motion compatibility)
- Firefox

## Performance Considerations

- Opacity-only animations are GPU-accelerated (no layout thrashing)
- Removing `y` transform reduces composite layer complexity
- Shorter duration (0.2s vs 0.3s) reduces animation overhead
- `mode="sync"` may briefly render both old and new text (minimal impact)

## References

- Research document: `thoughts/shared/research/2025-12-18-loading-text-transition-patterns.md`
- Framer Motion AnimatePresence docs: https://motion.dev/docs/react-animate-presence
- Current implementation: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:88-112`
