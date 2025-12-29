---
date: 2025-12-29T19:58:17+11:00
git_commit: 9ed3f38848f89b5f7e49d9e27f90c32e17dd681a
branch: iterations
repository: idamadam.com
topic: "Page entrance animation performance and smoothness"
tags: [research, codebase, animations, performance, framer-motion, hero, splash]
status: complete
last_updated: 2025-12-29
last_updated_by: Claude
---

# Research: Page Entrance Animation Performance

**Date**: 2025-12-29T19:58:17+11:00
**Git Commit**: 9ed3f38848f89b5f7e49d9e27f90c32e17dd681a
**Branch**: iterations
**Repository**: idamadam.com

## Research Question

Review the animation system for page entrance and splash-to-content transition. Identify performance issues that may prevent "buttery smooth" animations.

## Summary

The animation system is architecturally well-designed with excellent accessibility support, but has **one critical performance issue**: the hero splash transition animates `paddingTop/paddingBottom` properties, which trigger layout recalculations on every frame. This is the primary cause of any jank during the splash-to-content transition.

Secondary concerns include missing `will-change` hints and the overhead of 11 simultaneous character animations.

## Detailed Findings

### 1. Critical Issue: Padding Animation Triggers Layout Thrashing

**Location**: `src/components/vignettes/hero/HeroVignette.tsx:29-31`

```tsx
animate={{
  paddingTop: isSplash ? '40vh' : '8rem',
  paddingBottom: isSplash ? '40vh' : '6rem',
}}
```

**Problem**: Animating `padding` is a "layout" property. Every frame of this animation:
1. Recalculates the element's box model
2. Reflows all content below (the entire page shifts)
3. Repaints affected regions
4. Composites the final frame

This happens 60 times per second for 0.8 seconds = ~48 layout recalculations.

**Why it feels janky**: The browser cannot GPU-accelerate padding changes. Each frame requires main thread work, competing with JavaScript execution.

**Recommended Fix**: Use `transform` instead:

```tsx
// Option A: Transform the content position
<motion.section
  animate={{
    y: isSplash ? 0 : -200, // Shift content up
  }}
  transition={{ duration: t.splash.transition, ease: [0.33, 1, 0.68, 1] }}
>

// Option B: Use a spacer element with scaleY
<motion.div
  className="h-0"
  style={{ transformOrigin: 'top' }}
  animate={{ scaleY: isSplash ? 1 : 0 }}
/>
```

### 2. Character-by-Character Animation Overhead

**Location**: `src/components/vignettes/hero/HeroContent.tsx:27-42`

The name "Idam Adam" (11 characters) creates 11 simultaneous `motion.span` elements, each with its own animation state and event listeners.

**Timeline**:
- 11 chars x 0.08s stagger = 0.88s for name
- +0.4s duration = 1.28s total before credentials appear

**Performance Impact**: Moderate. Framer Motion batches updates, but 11 concurrent animations add React reconciliation overhead.

**Potential Optimization**: Use CSS `@keyframes` with `animation-delay` instead of 11 motion components. Or use a single `motion.div` with staggered `clipPath` reveal.

### 3. Missing `will-change` Optimization

**Status**: No `will-change` property used anywhere in the codebase.

**Impact**: Browser cannot pre-promote elements to GPU layers. First frames of animations may be janky as layers are created on-demand.

**Recommendation**: Add to frequently animated elements:

```css
.vignette-container {
  will-change: transform, opacity;
}
```

Or via Framer Motion:
```tsx
<motion.div style={{ willChange: 'transform, opacity' }} />
```

**Caution**: Overuse of `will-change` increases memory. Only apply to elements that animate frequently.

### 4. Animation Timeline Analysis

Current entrance sequence:

| Time | Event | Property Animated |
|------|-------|-------------------|
| 0.0s | Page loads, splash centered | - |
| 0.0s-0.88s | Character reveal (11 chars) | opacity, y (transform) |
| 1.28s | Credentials fade in | opacity, y (transform) |
| 1.8s | Splash pause ends | - |
| 1.8s-2.6s | Padding transition | **paddingTop, paddingBottom** |
| 2.6s+ | Scroll animations begin | opacity, y (transform) |

The 0.8s padding animation at 1.8s-2.6s is where jank occurs.

### 5. What's Working Well

**GPU-Accelerated Properties**: All other animations use `transform` (y, scale, rotate) and `opacity`:
- `fadeInUp`: y + opacity
- Character reveal: y + opacity
- Card scatters: x, y, rotate, scale
- Stage transitions: opacity + y

**AnimatePresence**: Correctly uses `mode="wait"` throughout, preventing simultaneous enter/exit animations.

**Reduced Motion**: Comprehensive support via `useReducedMotion()` hook and `timingReduced` values. Splash is completely skipped for accessibility.

**Timing Architecture**: Centralized in `src/lib/animations.ts` with semantic naming (`timing.splash.duration`).

## Code References

- `src/components/vignettes/hero/HeroVignette.tsx:29-31` - Padding animation (PROBLEM)
- `src/components/vignettes/hero/HeroContent.tsx:27-42` - Character stagger animation
- `src/lib/animations.ts:31-34` - Splash timing configuration
- `src/lib/animations.ts:48-53` - fadeInUp preset (GOOD)
- `src/lib/useReducedMotion.ts` - Accessibility hook

## Architecture Insights

### Timing System Design

The `timing` object in `animations.ts` is well-structured:

```typescript
timing = {
  entrance: { text: 0, panel: 0.4, cards: 0.5, afterHero: 2.8 },
  duration: { fast: 0.25, medium: 0.4, slow: 0.6 },
  stagger: { tight: 0.08, normal: 0.1 },
  splash: { duration: 1.8, transition: 0.8 },
}
```

This creates a predictable "read then explore" choreography. The 2.8s `afterHero` delay coordinates with splash (1.8s) + transition (0.8s) + buffer.

### Splash State Machine

```
isSplash: true  → centered (40vh padding)
     ↓ setTimeout(1.8s)
isSplash: false → collapsed (8rem/6rem padding)
```

Simple and effective, but the state change triggers a layout-expensive animation.

## Recommendations (Priority Order)

### High Priority

1. **Replace padding animation with transform**
   - Change `paddingTop/Bottom` to `transform: translateY()` or wrapper scaling
   - Expected improvement: 60fps during transition

2. **Add `will-change` to hero section**
   ```tsx
   <motion.section style={{ willChange: 'transform' }} />
   ```

### Medium Priority

3. **Consider CSS keyframes for character reveal**
   - Replace 11 motion.span elements with CSS `animation-delay`
   - Reduces React overhead during initial render

4. **Shorten total entrance time**
   - Current: 2.6s before content is accessible
   - Consider: 1.5-2s total (shorter splash pause)

### Low Priority

5. **Audit height animations**
   - `HighlightsPanel` and `SuggestionsPanel` use height animations for accordions
   - Consider `maxHeight` or `clipPath` alternatives if performance issues arise

## Open Questions

1. Should the splash have a skip affordance for returning visitors?
2. Is 2.6s entrance time acceptable for first-time visitors?
3. Would a CSS-only splash (no React state) be more performant?

## Related Research

- `thoughts/shared/research/2025-12-28-hero-onboarding-patterns.md` - Hero entrance patterns
- `thoughts/shared/research/2025-12-26-hero-title-vignette-patterns.md` - Hero title design
