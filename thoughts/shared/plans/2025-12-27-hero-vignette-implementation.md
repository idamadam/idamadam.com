# Hero Vignette Implementation Plan

## Overview

Transform the static hero section into an animated "title vignette" with scroll-triggered entrance animations. Keep the copy minimal and confident: name, role, and a simple invitation to try the work. Simplify SectionHeader to remove redundant "show don't tell" messaging.

## Current State Analysis

**Hero Section (`src/app/page.tsx:13-26`):**
- Static text: "Idam Adam" + "Product designer · Maker"
- ShaderBackground component (CSS gradient animation)
- No entry animations, no interactivity

**SectionHeader ("Selected Work", lines 29-38):**
- Contains narrative copy: "I'm a big believer in showing rather than telling..."
- This becomes redundant now that hero says "Try the work below"

**Problem:**
- Hero is disconnected from the vignette system
- No scroll-triggered reveal like the vignettes below

## Desired End State

1. **HeroVignette component** with staggered scroll-triggered animations
2. **Minimal, confident copy**: "Idam Adam / Product Designer / Try the work below."
3. **Simplified SectionHeader** with just "Selected Work" + "Product design at Culture Amp"
4. **Consistent animation patterns** using existing `fadeInUp` and stagger timing

**Verification:**
- Hero animates on scroll into view
- No redundant messaging between hero and SectionHeader
- Reduced motion respected via existing patterns

## What We're NOT Doing

- Cursor-reactive shader (future enhancement)
- Scroll-driven scene with sticky positioning
- Typewriter/role cycling effects
- New animation primitives (using existing patterns)
- Changing ShaderBackground component

## Implementation Approach

Use existing animation patterns (`fadeInUp`, stagger) to create a polished hero that feels part of the vignette system without overcomplicating. The hero doesn't need `VignetteContainer` (no white card treatment) but will use similar animation timing.

---

## Phase 1: Create HeroVignette Component

### Overview
Create a new client component that wraps the hero content with Framer Motion animations. Staggered reveal of name, role, and frame-setting copy.

### Changes Required:

#### 1. New Component
**File**: `src/components/HeroVignette.tsx`
**Create**: New client component

```tsx
'use client';

import { motion } from 'framer-motion';
import ShaderBackground from './ShaderBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function HeroVignette() {
  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
      <div className="relative max-w-5xl w-full mx-auto">
        <ShaderBackground />
        <motion.div
          className="space-y-5 lg:space-y-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h1 className="type-display" variants={itemVariants}>
            Idam Adam
          </motion.h1>
          <motion.p className="type-body" variants={itemVariants}>
            Product Designer
          </motion.p>
          <motion.p className="type-body" variants={itemVariants}>
            Try the work below.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Linting passes: `npm run lint` (note: `npm run lint` has pre-existing config issue, but `npx eslint` passes)
- [x] Component file exists at correct path

#### Manual Verification:
- [ ] Hero animates on page load (staggered fade-in-up)
- [ ] Animation feels smooth, not jarring
- [ ] Timing matches other vignette reveals

---

## Phase 2: Integrate and Simplify SectionHeader

### Overview
Replace inline hero markup with HeroVignette component. Simplify SectionHeader to remove the now-redundant narrative copy.

### Changes Required:

#### 1. Update Homepage
**File**: `src/app/page.tsx`
**Changes**: Import HeroVignette, replace hero section, simplify SectionHeader

```tsx
// Add import
import HeroVignette from '@/components/HeroVignette';

// Remove import (no longer used directly in page)
// ShaderBackground is now imported only by HeroVignette

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background text-primary">
      {/* Hero Section - now uses HeroVignette */}
      <HeroVignette />

      {/* Vignettes Introduction - simplified */}
      <SectionHeader title="Selected Work">
        <p className="type-body">
          Product design at Culture Amp
        </p>
      </SectionHeader>

      {/* Rest unchanged... */}
    </main>
  );
}
```

**Specific changes:**
- Replace lines 13-26 (hero section) with `<HeroVignette />`
- Remove ShaderBackground import (line 7)
- Simplify SectionHeader content (lines 30-37) to single line

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No unused imports warning

#### Manual Verification:
- [ ] Page renders correctly
- [ ] Hero appears with animation
- [ ] SectionHeader is now minimal ("Selected Work" + "Product design at Culture Amp")
- [ ] No duplicate "show don't tell" messaging

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that the layout and flow feel right before proceeding.

---

## Phase 3: Polish and Accessibility

### Overview
Add reduced motion support and fine-tune animation timing.

### Changes Required:

#### 1. Add Reduced Motion Support
**File**: `src/components/HeroVignette.tsx`
**Changes**: Import and use `useReducedMotion` hook

```tsx
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import ShaderBackground from './ShaderBackground';

// ... variants stay the same ...

export default function HeroVignette() {
  const reducedMotion = useReducedMotion();

  // If reduced motion preferred, show content immediately
  const animationProps = reducedMotion
    ? { initial: false, animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" }
      };

  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
      <div className="relative max-w-5xl w-full mx-auto">
        <ShaderBackground />
        <motion.div
          className="space-y-5 lg:space-y-7"
          variants={containerVariants}
          {...animationProps}
        >
          {/* ... content ... */}
        </motion.div>
      </div>
    </section>
  );
}
```

#### 2. (Optional) Fine-tune Animation Timing
If the stagger feels off, adjust:
- `staggerChildren`: 0.12-0.18 range
- `delayChildren`: 0.05-0.15 range
- `duration`: 0.5-0.7 range
- `margin`: "-30px" to "-100px" for earlier/later trigger

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No accessibility warnings in dev tools

#### Manual Verification:
- [ ] With `prefers-reduced-motion: reduce`, content appears immediately without animation
- [ ] Animation timing feels natural and not too slow/fast
- [ ] Hero doesn't feel disconnected from vignettes below

---

## Testing Strategy

### Unit Tests:
Not applicable - this is a presentational component with no logic to test.

### Manual Testing Steps:
1. Load homepage in browser
2. Verify hero animates on initial load (staggered reveal)
3. Refresh page - animation should trigger again
4. Scroll down and back up - animation should NOT retrigger (once: true)
5. Enable reduced motion in OS settings - verify content shows immediately
6. Check mobile viewport - verify layout stacks correctly
7. Verify "show don't tell" copy only appears once (in hero)

## Performance Considerations

- No new libraries added
- Using existing Framer Motion patterns
- ShaderBackground unchanged (already GPU-intensive with 80px blur)
- Reduced motion support prevents unnecessary animation for users who prefer it

## References

- Research document: `thoughts/shared/research/2025-12-26-hero-title-vignette-patterns.md`
- Existing animation patterns: `src/lib/animations.ts`
- Reduced motion hook: `src/lib/useReducedMotion.ts`
- VignetteContainer for reference timing: `src/components/vignettes/VignetteContainer.tsx`
