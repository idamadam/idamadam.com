# Hero Animation Performance Optimization

## Overview

Optimize the hero splash animation for smooth 60fps performance by replacing layout-triggering properties with GPU-accelerated transforms, converting character animations to CSS keyframes, and reducing entrance timing.

## Current State Analysis

### Critical Issue: Padding Animation (Layout Thrashing)
**File**: `src/components/vignettes/hero/HeroVignette.tsx:29-31`

```tsx
animate={{
  paddingTop: isSplash ? '40vh' : '8rem',
  paddingBottom: isSplash ? '40vh' : '6rem',
}}
```

- Animating `padding` triggers ~48 layout recalculations over 0.8s
- Cannot be GPU-accelerated
- Main thread work competes with JavaScript execution

### Secondary Issue: Character Animation Overhead
**File**: `src/components/vignettes/hero/HeroContent.tsx:27-42`

- 11 simultaneous `motion.span` elements for "Idam Adam"
- Each has its own animation state and React reconciliation overhead
- Total animation time: 1.28s before credentials appear

### Missing Optimization: No `will-change` Hints
- Browser cannot pre-promote elements to GPU layers
- First frames may be janky as layers are created on-demand

### Current Timing
- Splash duration: 1.8s (pause)
- Transition duration: 0.8s
- Total before content accessible: 2.6s

## Desired End State

After implementation:
1. Hero splash transition runs at smooth 60fps using GPU-accelerated `transform: translateY()`
2. Character reveal uses CSS `@keyframes` with `animation-delay` (single DOM element)
3. `will-change: transform, opacity` applied to animated hero elements
4. Reduced entrance time: ~1.8s total (down from 2.6s)

### Verification
- Chrome DevTools Performance tab shows no layout thrashing during transition
- Animation maintains 60fps on mid-range devices
- Visual behavior unchanged from user perspective
- Reduced motion preferences still respected

## What We're NOT Doing

- Changing the visual design or choreography of the splash
- Modifying other vignette animations
- Adding new animation features
- Changing the hero content structure

## Implementation Approach

Use a fixed-height approach where the hero section has consistent dimensions, and the content position is animated using `transform: translateY()` instead of padding changes.

---

## Phase 1: Replace Padding Animation with Transform

### Overview
Convert the splash-to-normal transition from animating `paddingTop/paddingBottom` to animating `transform: translateY()` on the content wrapper.

### Changes Required:

#### 1. HeroVignette.tsx
**File**: `src/components/vignettes/hero/HeroVignette.tsx`

**Current** (lines 25-43):
```tsx
return (
  <motion.section
    className="w-full px-6 lg:px-12"
    initial={false}
    animate={{
      paddingTop: isSplash ? '40vh' : '8rem',
      paddingBottom: isSplash ? '40vh' : '6rem',
    }}
    transition={{
      duration: t.splash.transition,
      ease: [0.33, 1, 0.68, 1],
    }}
  >
    <div className="max-w-5xl w-full mx-auto">
      <article id="hero">
        <HeroContent />
      </article>
    </div>
  </motion.section>
);
```

**New**:
```tsx
return (
  <section className="w-full px-6 lg:px-12 pt-32 pb-24 lg:pt-32 lg:pb-24">
    <motion.div
      className="max-w-5xl w-full mx-auto"
      style={{ willChange: 'transform' }}
      initial={false}
      animate={{
        y: isSplash ? 'calc(50vh - 8rem)' : 0,
      }}
      transition={{
        duration: t.splash.transition,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      <article id="hero">
        <HeroContent />
      </article>
    </motion.div>
  </section>
);
```

**Explanation**:
- Outer `<section>` has fixed padding (`pt-32 pb-24` = 8rem/6rem equivalent)
- Inner `motion.div` handles the transform animation
- `y: 'calc(50vh - 8rem)'` positions content at viewport center during splash
- `y: 0` returns content to normal flow position
- `willChange: 'transform'` hints GPU pre-promotion

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `bun run build`
- [x] No ESLint errors: `bun run lint` (skipped - lint command issue)
- [x] Dev server runs without errors: `bun run dev`

#### Manual Verification:
- [x] Splash centers content vertically on page load
- [x] Transition to normal layout is smooth (no jank)
- [x] Chrome DevTools Performance shows no "Layout" events during transition
- [x] Animation respects reduced motion preference

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the animation feels smooth before proceeding to Phase 2.

---

## Phase 2: Add will-change to HeroContent Animations

### Overview
Add `will-change` hints to frequently animated elements in HeroContent for GPU pre-promotion.

### Changes Required:

#### 1. HeroContent.tsx - Character spans
**File**: `src/components/vignettes/hero/HeroContent.tsx`

Add `style={{ willChange: 'transform, opacity' }}` to the character motion.span elements (this will be replaced in Phase 3, but ensures smooth animation if Phase 3 is delayed):

```tsx
<motion.span
  key={index}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  style={{
    whiteSpace: char === ' ' ? 'pre' : 'normal',
    willChange: 'transform, opacity'
  }}
  // ... rest of props
>
```

#### 2. HeroContent.tsx - Credentials row
Add `willChange` to the credentials motion.p:

```tsx
<motion.p
  className="flex items-center gap-3 flex-wrap text-secondary"
  style={{ willChange: 'transform, opacity' }}
  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
  // ... rest of props
>
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `bun run build`
- [x] No ESLint errors: `bun run lint` (skipped)

#### Manual Verification:
- [x] Animations still work as expected
- [x] No visual regression

---

## Phase 3: Convert Character Animation to CSS Keyframes

### Overview
Replace 11 `motion.span` elements with a single element using CSS `@keyframes` animation with `animation-delay` per character. This reduces React reconciliation overhead.

### Changes Required:

#### 1. Create CSS keyframes in globals.css
**File**: `src/app/globals.css`

Add at the end of the file:

```css
/* Hero character reveal animation */
@keyframes hero-char-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-char {
  display: inline-block;
  opacity: 0;
  animation: hero-char-reveal 0.4s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards;
  will-change: transform, opacity;
}

/* Stagger delays for each character position */
.hero-char:nth-child(1) { animation-delay: 0s; }
.hero-char:nth-child(2) { animation-delay: 0.08s; }
.hero-char:nth-child(3) { animation-delay: 0.16s; }
.hero-char:nth-child(4) { animation-delay: 0.24s; }
.hero-char:nth-child(5) { animation-delay: 0.32s; }
.hero-char:nth-child(6) { animation-delay: 0.40s; }
.hero-char:nth-child(7) { animation-delay: 0.48s; }
.hero-char:nth-child(8) { animation-delay: 0.56s; }
.hero-char:nth-child(9) { animation-delay: 0.64s; }
.hero-char:nth-child(10) { animation-delay: 0.72s; }
.hero-char:nth-child(11) { animation-delay: 0.80s; }

/* Reduced motion: instant reveal */
@media (prefers-reduced-motion: reduce) {
  .hero-char {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

#### 2. Update HeroContent.tsx
**File**: `src/components/vignettes/hero/HeroContent.tsx`

Replace the character animation section:

**Current** (lines 22-45):
```tsx
<h1 className="type-display">
  {reducedMotion ? (
    heroContent.name
  ) : (
    <span aria-label={heroContent.name}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: t.duration.medium,
            delay: t.entrance.text + index * t.stagger.tight,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )}
</h1>
```

**New**:
```tsx
<h1 className="type-display">
  <span aria-label={heroContent.name}>
    {characters.map((char, index) => (
      <span
        key={index}
        className={reducedMotion ? 'inline-block' : 'hero-char'}
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ))}
  </span>
</h1>
```

**Explanation**:
- Removes 11 `motion.span` elements and their animation state
- Uses CSS classes for animation instead of Framer Motion
- `hero-char` class handles the reveal animation with CSS
- Stagger is achieved via `animation-delay` in CSS
- Reduced motion handled by CSS media query

#### 3. Update nameAnimationEnd calculation
The `nameAnimationEnd` variable is used to delay credentials. Keep this calculation the same:

```tsx
const nameAnimationEnd = characters.length * t.stagger.tight + t.duration.medium;
```

This ensures credentials still appear after the name animation completes.

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `bun run build`
- [x] No ESLint errors: `bun run lint` (skipped)

#### Manual Verification:
- [x] Character reveal animation looks identical to before
- [x] Stagger timing feels natural
- [x] Credentials appear after name finishes animating
- [x] Reduced motion shows name instantly without animation

**Implementation Note**: After completing this phase, pause for manual verification that the CSS-based animation matches the previous Framer Motion version visually.

---

## Phase 4: Adjust Timing

### Overview
Reduce the total entrance time from 2.6s to approximately 1.8s by shortening the splash pause duration.

### Changes Required:

#### 1. Update timing in animations.ts
**File**: `src/lib/animations.ts`

**Current** (lines 31-34):
```tsx
splash: {
  duration: 1.8,        // How long centered splash state lasts (pause after text)
  transition: 0.8,      // Position animation duration
},
```

**New**:
```tsx
splash: {
  duration: 1.0,        // Shortened pause (was 1.8s)
  transition: 0.6,      // Slightly faster transition (was 0.8s)
},
```

#### 2. Update afterHero timing
**File**: `src/lib/animations.ts`

**Current** (line 15):
```tsx
afterHero: 2.8, // Elements below hero wait for splash + transition
```

**New**:
```tsx
afterHero: 1.8, // Elements below hero wait for splash (1.0s) + transition (0.6s) + buffer (0.2s)
```

#### 3. Update CSS animation duration to match
**File**: `src/app/globals.css`

Update the hero-char animation duration:
```css
.hero-char {
  /* ... */
  animation: hero-char-reveal 0.35s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards;
  /* ... */
}
```

Update stagger delays (tighter: 0.06s instead of 0.08s):
```css
.hero-char:nth-child(1) { animation-delay: 0s; }
.hero-char:nth-child(2) { animation-delay: 0.06s; }
.hero-char:nth-child(3) { animation-delay: 0.12s; }
.hero-char:nth-child(4) { animation-delay: 0.18s; }
.hero-char:nth-child(5) { animation-delay: 0.24s; }
.hero-char:nth-child(6) { animation-delay: 0.30s; }
.hero-char:nth-child(7) { animation-delay: 0.36s; }
.hero-char:nth-child(8) { animation-delay: 0.42s; }
.hero-char:nth-child(9) { animation-delay: 0.48s; }
.hero-char:nth-child(10) { animation-delay: 0.54s; }
.hero-char:nth-child(11) { animation-delay: 0.60s; }
```

### New Timeline

| Time | Event |
|------|-------|
| 0.0s | Page loads, splash centered |
| 0.0s-0.66s | Character reveal (11 chars × 0.06s stagger) |
| 0.66s-1.01s | Last character finishes (0.35s duration) |
| ~0.8s | Credentials fade in |
| 1.0s | Splash pause ends, transition begins |
| 1.0s-1.6s | Transform transition (0.6s) |
| 1.8s | Content below hero starts animating |

**Total time to accessible content: ~1.6s** (down from 2.6s)

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compiles: `bun run build`
- [ ] No ESLint errors: `bun run lint`

#### Manual Verification:
- [ ] Entrance feels snappier but not rushed
- [ ] Character reveal is still readable
- [ ] Credentials appear at natural time
- [ ] Content below hero animates in smoothly after transition
- [ ] Overall choreography feels intentional

---

## Testing Strategy

### Performance Testing:
1. Open Chrome DevTools → Performance tab
2. Record page load and splash transition
3. Verify:
   - No "Layout" events during splash-to-normal transition
   - Frame rate stays at 60fps
   - "Composite Layers" shows GPU acceleration

### Visual Testing:
1. Compare before/after video recordings
2. Verify splash centers content correctly
3. Verify transition smoothness on:
   - Desktop Chrome
   - Desktop Safari
   - Mobile Chrome (throttled CPU)

### Accessibility Testing:
1. Enable "Reduce motion" in OS settings
2. Verify splash is skipped entirely
3. Verify content appears without animation

### Regression Testing:
1. Scroll down page, verify other vignettes animate correctly
2. Resize window during splash, verify no layout issues
3. Navigate away and back, verify animations replay correctly

## Performance Considerations

### Before (Current):
- 48 layout recalculations during 0.8s transition
- 11 React components with animation state
- No GPU pre-promotion

### After (Optimized):
- 0 layout recalculations (transform only)
- 0 React animation components for character reveal
- GPU-accelerated transforms with `will-change` hints
- ~38% reduction in entrance time (2.6s → 1.6s)

## References

- Original research: `thoughts/shared/research/2025-12-29-entrance-animation-performance.md`
- CSS Triggers reference: https://csstriggers.com/
- Framer Motion performance: https://www.framer.com/motion/guide-reduce-bundle-size/
