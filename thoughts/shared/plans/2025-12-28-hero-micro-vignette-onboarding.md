# Hero as Micro-Vignette Onboarding Implementation Plan

## Overview

Transform the hero section from a standalone "Add color" gimmick into a micro-vignette that teaches the Problem → Solution interaction pattern. The stained glass shader transition becomes a visual metaphor for "flipping through iterations" - grayscale sketches becoming polished, colorful work.

## Current State Analysis

**What exists:**
- `HeroShaderPanel.tsx` manages its own toggle state (`isActive`)
- ColorPanels shader transitions between grayscale (CALM) and vivid (ACTIVE) colors
- Button text: "Add color" / "Remove color" - bidirectional toggle
- `HeroVignette.tsx` uses `VignetteSplit` with static content from `content.ts`
- Left side shows: "Idam Adam" (title) + "Lead Product Designer." (description)

**What's missing:**
- No connection to the vignette interaction vocabulary
- "Add color" doesn't teach anything about Problem → Solution pattern
- No indication that scrolling reveals more interactive content

### Key Discoveries:
- VignetteStaged system exists but is overkill for hero (no Design Notes stage needed)
- AnimatedStageText component available for smooth text transitions
- Shader animation code already handles smooth color/speed lerping

## Desired End State

The hero functions as a compressed micro-vignette:
1. **Problem state**: Grayscale shader, intro copy, CTA button teaches "click to reveal"
2. **Solution state**: Vivid shader, updated copy reinforcing the metaphor, scroll indicator

Visitors learn the interaction vocabulary (click → reveal) before encountering vignettes.

### Verification:
- Hero starts in grayscale with problem-state copy
- Clicking CTA transitions shader to vivid + updates copy
- Transition is one-directional (no reset button visible initially)
- Scroll indicator appears after reveal
- Pattern mirrors first vignette's interaction model

## What We're NOT Doing

- Not using full VignetteStaged system (hero doesn't need Design Notes)
- Not adding a third "Design Notes" stage to hero
- Not changing the shader type (keeping ColorPanels)
- Not adding localStorage for "first visit" tracking (keep it simple)

## Implementation Approach

Use local component state with a simple two-stage model. The hero gets its own lightweight stage management without the full VignetteStaged context. This keeps it self-contained while teaching the same interaction pattern.

---

## Phase 1: Update Content Structure

### Overview
Add staged content to `content.ts` to support problem/solution copy.

### Changes Required:

#### 1. Hero Content
**File**: `src/components/vignettes/hero/content.ts`
**Changes**: Add staged content structure

```typescript
export interface HeroContent {
  name: string;
  role: string;
  stages: {
    problem: {
      tagline: string;
      cta: string;
    };
    solution: {
      tagline: string;
      scrollHint: string;
    };
  };
}

export const heroContent: HeroContent = {
  name: 'Idam Adam',
  role: 'Lead Product Designer',
  stages: {
    problem: {
      tagline: 'A portfolio that shows, not tells.',
      cta: 'See it in action',
    },
    solution: {
      tagline: 'Each project below is interactive.',
      scrollHint: 'Scroll to explore',
    },
  },
};
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No linting errors

#### Manual Verification:
- [ ] Content structure matches expected shape

---

## Phase 2: Refactor HeroShaderPanel

### Overview
Convert HeroShaderPanel from self-managed toggle to controlled component that receives stage as a prop.

### Changes Required:

#### 1. HeroShaderPanel Props
**File**: `src/components/vignettes/hero/HeroShaderPanel.tsx`
**Changes**: Accept `isActive` and `onActivate` props instead of internal state

```typescript
interface HeroShaderPanelProps {
  isActive: boolean;
  onActivate: () => void;
}

export default function HeroShaderPanel({ isActive, onActivate }: HeroShaderPanelProps) {
  // Remove: const [isActive, setIsActive] = useState(false);
  // Remove: const handleToggle = () => setIsActive(!isActive);

  // Keep all shader animation logic (useEffect for color lerping)
  // Keep dimension handling
  // Keep mounted state for hydration

  // The button moves to parent component
  // This component only renders the shader
}
```

#### 2. Remove Button from HeroShaderPanel
The toggle button moves to the parent `HeroVignette` so it can be replaced with staged CTAs.

```typescript
return (
  <div className="flex flex-col items-center">
    <div
      ref={containerRef}
      className="w-full aspect-[2/1] rounded-xl overflow-hidden"
    >
      {mounted && (
        <ColorPanels
          // ... existing props
          colors={currentColors}
          speed={currentSpeed}
        />
      )}
    </div>
    {/* Button removed - handled by parent */}
  </div>
);
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles with new props interface
- [x] No unused variable warnings

#### Manual Verification:
- [ ] Shader still animates when `isActive` prop changes

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation before proceeding.

---

## Phase 3: Create HeroContent Component

### Overview
Create a new component that manages hero stage state and renders both the left-side content and the shader panel.

### Changes Required:

#### 1. New HeroContent Component
**File**: `src/components/vignettes/hero/HeroContent.tsx`
**Changes**: New file

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroShaderPanel from './HeroShaderPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { heroContent } from './content';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

type HeroStage = 'problem' | 'solution';

export default function HeroContent() {
  const [stage, setStage] = useState<HeroStage>('problem');
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  const isActive = stage === 'solution';
  const currentStage = heroContent.stages[stage];

  const handleActivate = () => {
    setStage('solution');
  };

  return (
    <VignetteSplit
      title={heroContent.name}
      description={
        <div className="space-y-4">
          <span className="block">{heroContent.role}.</span>

          {/* Animated tagline */}
          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              className="block text-secondary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: t.stage.textDuration }}
            >
              {stage === 'problem'
                ? currentStage.tagline
                : heroContent.stages.solution.tagline}
            </motion.span>
          </AnimatePresence>

          {/* CTA or Scroll Hint */}
          <AnimatePresence mode="wait">
            {stage === 'problem' ? (
              <motion.button
                key="cta"
                onClick={handleActivate}
                className="btn-interactive btn-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="material-icons-outlined">palette</span>
                {heroContent.stages.problem.cta}
              </motion.button>
            ) : (
              <motion.div
                key="scroll"
                className="flex items-center gap-2 text-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  className="material-icons-outlined text-base"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  expand_more
                </motion.span>
                {heroContent.stages.solution.scrollHint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
      variant="hero"
    >
      <HeroShaderPanel isActive={isActive} onActivate={handleActivate} />
    </VignetteSplit>
  );
}
```

#### 2. Update HeroVignette
**File**: `src/components/vignettes/hero/HeroVignette.tsx`
**Changes**: Use new HeroContent component

```typescript
'use client';

import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import { fadeInUp } from '@/lib/animations';

export default function HeroVignette() {
  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <VignetteContainer id="hero">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <HeroContent />
          </motion.div>
        </VignetteContainer>
      </div>
    </section>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No linting errors

#### Manual Verification:
- [ ] Hero displays problem state on load (grayscale shader, tagline, CTA button)
- [ ] Clicking CTA triggers shader transition to vivid colors
- [ ] Tagline animates from problem to solution text
- [ ] CTA button is replaced by scroll indicator with bounce animation
- [ ] Transition feels smooth and intentional

**Implementation Note**: After completing this phase, pause for manual testing of the full interaction flow.

---

## Phase 4: Polish and Edge Cases

### Overview
Handle reduced motion, ensure mobile works, and add subtle reset capability.

### Changes Required:

#### 1. Reduced Motion Support
**File**: `src/components/vignettes/hero/HeroContent.tsx`
**Changes**: Respect `prefers-reduced-motion`

Already using `useReducedMotion()` hook. Ensure:
- Text transitions use `timingReduced` values
- Scroll indicator bounce respects preference

```typescript
// In scroll indicator animation
animate={reducedMotion ? {} : { y: [0, 4, 0] }}
```

#### 2. Optional Reset (Subtle)
**File**: `src/components/vignettes/hero/HeroContent.tsx`
**Changes**: Add subtle reset on shader click (optional, for repeat visitors)

```typescript
// In HeroShaderPanel, add optional onClick
<div
  onClick={isActive ? () => setStage('problem') : undefined}
  className={isActive ? 'cursor-pointer' : ''}
  // ... rest of container props
>
```

This allows clicking the shader itself to reset, but it's not obvious - just a hidden affordance for repeat visitors.

#### 3. Mobile Considerations
Ensure button and scroll indicator are touch-friendly:
- Minimum 44px tap target
- Adequate spacing

### Success Criteria:

#### Automated Verification:
- [x] Build passes: `npm run build`
- [ ] Lighthouse accessibility audit passes

#### Manual Verification:
- [ ] Works with `prefers-reduced-motion: reduce` enabled
- [ ] Touch targets are adequate on mobile
- [ ] Reset by clicking shader works (subtle feature)

---

## Testing Strategy

### Manual Testing Steps:
1. Load homepage - hero should be in grayscale with "See it in action" CTA
2. Click CTA - shader transitions to vivid, copy updates, scroll indicator appears
3. Scroll down - first vignette (AI Highlights) has similar CTA pattern
4. Verify the interaction vocabulary feels familiar: "click button → reveal"
5. Test with reduced motion enabled
6. Test on mobile viewport

### Edge Cases:
- Fast double-click on CTA (should not break)
- Scrolling before clicking CTA (should still work)
- Page refresh after reveal (resets to problem state - intentional)

## Performance Considerations

- Shader animation uses `requestAnimationFrame` - already optimized
- AnimatePresence handles cleanup of exiting elements
- No additional network requests or heavy dependencies

## References

- Research: `thoughts/shared/research/2025-12-28-hero-onboarding-patterns.md`
- VignetteStaged pattern: `src/components/vignettes/VignetteStaged.tsx`
- AnimatedStageText reference: `src/components/vignettes/shared/AnimatedStageText.tsx`
- Shader config: `src/components/vignettes/hero/HeroShaderPanel.tsx`
