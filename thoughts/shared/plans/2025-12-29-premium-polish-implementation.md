# Premium Polish Implementation Plan

## Overview

Implement layered shadows, container hover states, and spring-based micro-interactions to achieve Linear/Apple-style premium polish. Based on research in `thoughts/shared/research/2025-12-29-premium-polish-patterns.md`.

## Current State Analysis

- **Shadows** (`globals.css:62-65`): Single/dual-layer shadows with warm tint. Functional but flat.
- **VignetteContainer** (`VignetteContainer.tsx:27`): Has gold ring treatment but no shadow or hover state.
- **Button animations** (`animations.ts:71-77`): Simple easing with `scale: 1.02/0.98`, no spring physics.

### Key Discoveries:
- VignetteContainer already has `ring-1 ring-gold-500/20` for subtle gold accent
- Button animations exist but feel generic without springs
- No elevated hover state defined anywhere in the codebase

## Desired End State

Vignette containers have subtle depth via multi-layer shadows and lift gently on hover. Buttons feel snappy with spring physics. The overall effect is refined and premium without being flashy.

**Verification:**
- Hover over any VignetteContainer → see subtle lift (2px) and shadow deepening
- Click any CTA button → feel responsive spring animation
- Shadows appear natural with graduated opacity layers
- No jank on mobile (test shadow performance)

## What We're NOT Doing

- Dark mode support
- Glassmorphism or backdrop-blur effects
- Complex gradient borders
- Typography changes (out of scope for this plan)
- Inner glow/inset shadows (keep it simple for v1)

## Implementation Approach

Three phases, each independently testable:
1. Replace shadow CSS variables with multi-layer versions
2. Add hover state to VignetteContainer
3. Upgrade button animations to spring physics

---

## Phase 1: Enhanced Shadow System

### Overview
Replace flat shadows with multi-layer shadows that simulate natural light falloff. Add a dedicated hover shadow for elevated states.

### Changes Required:

#### 1. Update shadow variables
**File**: `src/app/globals.css`
**Changes**: Replace lines 62-65 with enhanced multi-layer shadows

```css
/* Shadows (warm-tinted, multi-layer for depth) */
--shadow-sm:
  0 1px 2px rgba(28, 26, 22, 0.04),
  0 1px 3px rgba(28, 26, 22, 0.06);

--shadow-md:
  0 2px 4px rgba(28, 26, 22, 0.03),
  0 4px 8px rgba(28, 26, 22, 0.04),
  0 8px 16px rgba(28, 26, 22, 0.05);

--shadow-lg:
  0 4px 6px rgba(28, 26, 22, 0.02),
  0 8px 15px rgba(28, 26, 22, 0.04),
  0 16px 30px rgba(28, 26, 22, 0.06);

--shadow-hover:
  0 4px 8px rgba(28, 26, 22, 0.04),
  0 12px 20px rgba(28, 26, 22, 0.06),
  0 20px 40px rgba(28, 26, 22, 0.08);
```

#### 2. Expose shadow-hover in Tailwind theme
**File**: `src/app/globals.css`
**Changes**: Add to `@theme inline` block (around line 73)

```css
/* Shadows */
--shadow-sm: var(--shadow-sm);
--shadow-md: var(--shadow-md);
--shadow-lg: var(--shadow-lg);
--shadow-hover: var(--shadow-hover);
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No CSS parsing errors in dev server: `npm run dev`

#### Manual Verification:
- [ ] Existing shadows on page look slightly softer/more natural
- [ ] No visual regressions on vignette borders

**Implementation Note**: After completing this phase, pause for manual confirmation before proceeding.

---

## Phase 2: VignetteContainer Hover Polish

### Overview
Add subtle lift and shadow transition on hover to VignetteContainer. Uses CSS for shadow transition (GPU-accelerated) and Framer Motion for y-translate.

### Changes Required:

#### 1. Add shadow and hover classes to VignetteContainer
**File**: `src/components/vignettes/VignetteContainer.tsx`
**Changes**: Update the motion.article element

```tsx
<motion.article
  id={id}
  className={`w-full bg-white rounded-2xl border border-border ring-1 ring-gold-500/20 shadow-md transition-shadow duration-300 ease-out hover:shadow-hover ${
    allowOverflow ? 'overflow-visible' : 'overflow-hidden'
  } ${className}`}
  whileHover={{ y: -2 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  {...fadeInUp}
>
```

**Note**: The `whileHover` and `transition` props need to be applied carefully since `fadeInUp` spreads props. We need to merge them properly.

#### 2. Handle fadeInUp spread conflict
**File**: `src/components/vignettes/VignetteContainer.tsx`
**Changes**: Extract fadeInUp transition to avoid override

```tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp } from '@/lib/animations';

interface VignetteContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  id: string;
  allowOverflow?: boolean;
  className?: string;
}

export default function VignetteContainer({
  title,
  subtitle,
  children,
  id,
  allowOverflow = false,
  className = ''
}: VignetteContainerProps) {
  return (
    <motion.article
      id={id}
      className={`w-full bg-white rounded-2xl border border-border ring-1 ring-gold-500/20 shadow-md transition-shadow duration-300 ease-out hover:shadow-[var(--shadow-hover)] ${
        allowOverflow ? 'overflow-visible' : 'overflow-hidden'
      } ${className}`}
      initial={fadeInUp.initial}
      whileInView={fadeInUp.whileInView}
      viewport={fadeInUp.viewport}
      whileHover={{ y: -2 }}
      transition={{
        // Entrance animation
        opacity: { duration: 0.6, ease: 'easeOut' },
        y: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      {/* ... rest unchanged */}
    </motion.article>
  );
}
```

**Important**: The `transition` object handles both the entrance `y: 60 → 0` and the hover `y: 0 → -2`. Framer Motion uses the same transition for both by default, so we rely on CSS for the shadow transition and keep Framer's y transition fast (0.2s) which works for both cases since the entrance also has opacity that dominates the perceived timing.

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] TypeScript passes: `npm run typecheck` (if available) or no TS errors in IDE

#### Manual Verification:
- [ ] Hover over any vignette → subtle 2px lift upward
- [ ] Hover over any vignette → shadow deepens smoothly (300ms)
- [ ] Entrance animation still works (fade in + slide up on scroll)
- [ ] No jank on mobile Safari (test on real device if possible)
- [ ] Reduced motion: hover still works but without jarring movement

**Implementation Note**: After completing this phase, pause for manual confirmation before proceeding.

---

## Phase 3: Button Micro-interaction Refinement

### Overview
Upgrade button animations to use spring physics for a snappier, more premium feel. High damping prevents bounciness while maintaining responsiveness.

### Changes Required:

#### 1. Add spring configuration to animations.ts
**File**: `src/lib/animations.ts`
**Changes**: Add spring config and update buttonAnimations

```ts
/**
 * Spring configuration for premium button feel
 * High stiffness + damping = snappy without bounce
 */
export const buttonSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
} as const;

/**
 * Standardized button animation values
 * Use with Framer Motion for consistent interactive feel
 */
export const buttonAnimations = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: buttonSpring,
};
```

#### 2. Update VignetteStaged button animations
**File**: `src/components/vignettes/VignetteStaged.tsx`
**Changes**: Import and use buttonSpring for existing hover animations

```tsx
import { timing, timingReduced, buttonSpring } from '@/lib/animations';

// Line ~81: Update reset button
<motion.button
  onClick={reset}
  className="btn-interactive btn-secondary"
  whileHover={{ x: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={buttonSpring}
>

// Line ~115-122: Update arrow animation
<motion.span
  className="material-icons-outlined text-body"
  initial={{ x: 0 }}
  whileHover={{ x: 4 }}
  transition={buttonSpring}
>
  arrow_forward
</motion.span>
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No TypeScript errors

#### Manual Verification:
- [ ] Click any CTA button → feels snappy, no bounce
- [ ] Hover on "Watch again" button → arrow shifts left with spring feel
- [ ] Hover on "See how I thought about it" → arrow shifts right with spring feel
- [ ] Tap/click feedback feels immediate and responsive
- [ ] Compare before/after: spring version should feel more "alive" but not bouncy

**Implementation Note**: After completing this phase, the premium polish implementation is complete.

---

## Testing Strategy

### Unit Tests:
- None required - these are CSS/animation changes

### Integration Tests:
- None required - visual changes only

### Manual Testing Steps:
1. Load homepage, scroll through all vignettes
2. Hover each vignette container - verify lift and shadow
3. Click through Problem → Solution → Design Notes flow
4. Test on mobile viewport (Chrome DevTools)
5. Test with `prefers-reduced-motion: reduce` in DevTools
6. Verify no performance issues (check for jank during scroll)

## Performance Considerations

- Multi-layer shadows are slightly more expensive to render
- CSS `transition-shadow` is GPU-accelerated when combined with `will-change` (not needed here, shadow is simple enough)
- Spring physics in Framer Motion are efficient but avoid animating too many elements simultaneously
- Test on actual mobile device if possible - Safari can be sensitive to shadow complexity

## Rollback Plan

If issues arise:
1. **Shadow issues**: Revert `globals.css` shadow variables to original single-layer versions
2. **Hover issues**: Remove `whileHover`, `shadow-md`, `hover:shadow-[var(--shadow-hover)]` from VignetteContainer
3. **Spring issues**: Revert `buttonAnimations.transition` to original `{ opacity: { duration: 0.3 }, y: { duration: 0.3 } }`

## References

- Research document: `thoughts/shared/research/2025-12-29-premium-polish-patterns.md`
- Current shadows: `src/app/globals.css:62-65`
- VignetteContainer: `src/components/vignettes/VignetteContainer.tsx`
- Animation presets: `src/lib/animations.ts`
