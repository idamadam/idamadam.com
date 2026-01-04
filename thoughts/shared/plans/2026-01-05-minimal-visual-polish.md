# Minimal Visual Polish Implementation Plan

## Overview

Add subtle visual refinements to the portfolio following a "less is more" philosophy. These changes create polish that users *feel* without consciously noticing—scroll progress feedback, refined hover states, and better spacing.

## Current State Analysis

- **Sticky header**: Full-width with `max-w-6xl` (1024px) inner content, but page content uses `max-w-[1600px]`
- **Links**: Basic styling with `text-decoration: none`, some have `hover:underline`
- **Grid spacing**: Vignettes use `gap-6 lg:gap-8` (24px/32px)
- **Selection styling**: Blue accent at 40% opacity
- **No scroll progress indicator** exists

### Key Discoveries:
- Header uses IntersectionObserver for visibility (`src/components/Header.tsx:14-31`)
- Framer Motion `useScroll` is available but not currently used
- Button hover uses CSS transitions with 0.2s ease (`globals.css:348`)
- Reduced motion support exists throughout (`useReducedMotion` hook)

## Desired End State

1. Scroll progress line at top of viewport that scales with page scroll
2. Header width matches content width (1600px) with glassmorphism card styling
3. All links have animated underlines on hover (sweep from left)
4. Vignettes have more breathing room between them
5. Text selection is slightly more subtle

### Verification:
- Scroll the page and see a thin blue line grow at the top
- Header appears as a floating card aligned with content
- Hover any link and see underline animate in from left
- Visual inspection confirms more space between vignette cards

## What We're NOT Doing

- Custom cursors or cursor effects
- Additional background animations or particles
- Sound effects
- 3D transforms or parallax
- Dark mode

## Implementation Approach

Work in phases that can each be verified independently. Start with the scroll progress (most impactful), then header refinement, then link animations, then spacing adjustments.

---

## Phase 1: Scroll Progress Indicator (SKIPPED)

### Overview
Add a thin (2px) accent-colored line fixed to the top of the viewport that scales horizontally based on scroll progress.

**Decision**: Removed after testing - didn't add enough value to justify the visual addition.

### Changes Required:

#### 1. Create ScrollProgress Component
**File**: `src/components/ScrollProgress.tsx` (new)

```tsx
'use client';

import { motion, useScroll } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  // Skip rendering entirely for reduced motion users
  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-500 to-accent-400 origin-left z-[60] pointer-events-none opacity-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

#### 2. Add to Layout
**File**: `src/app/layout.tsx`
**Changes**: Import and render ScrollProgress after CSSGradientBackground

```tsx
import ScrollProgress from '@/components/ScrollProgress';

// In the body, after CSSGradientBackground:
<CSSGradientBackground />
<ScrollProgress />
{children}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `bun run build` (or dev server shows no errors)
- [ ] No console errors in browser

#### Manual Verification:
- [ ] Scroll down the page and see a thin blue line grow from left to right at the very top
- [ ] Line is subtle (50% opacity) and doesn't distract from content
- [ ] Line appears above the sticky header when header is visible
- [ ] With `prefers-reduced-motion: reduce` enabled, the line does not appear

---

## Phase 2: Header Width & Card Styling (SKIPPED)

### Overview
Make the sticky header match the content width (1600px) and style it as a floating glassmorphism card instead of full-width bar.

**Decision**: Reverted after testing - the floating card treatment made the header feel like a separate element rather than an integrated navigation. Original full-width style works better.

### Changes Required:

#### 1. Update Header Component
**File**: `src/components/Header.tsx`
**Changes**: Modify the header wrapper and inner container styling

Current structure:
```tsx
<motion.header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 bg-background/80 backdrop-blur-md border-b border-border/40">
  <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
```

New structure:
```tsx
<motion.header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 2xl:px-24 pt-4 pointer-events-none">
  <div className="max-w-[1600px] mx-auto">
    <div className="card-elevated h-14 px-6 flex items-center justify-between pointer-events-auto">
```

Full updated component:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroContent } from './vignettes/hero/content';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function Header() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 2xl:px-24 pt-4 pointer-events-none"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.15 : 0.3,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="card-elevated h-14 px-6 flex items-center justify-between pointer-events-auto">
              {/* Name */}
              <span className="type-h3 !font-bold">{heroContent.name}</span>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/idamadam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center link-animated text-secondary hover:text-primary transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors
- [ ] No console errors in browser

#### Manual Verification:
- [ ] Scroll down past hero section and header appears
- [ ] Header is a floating card with rounded corners and glassmorphism effect
- [ ] Header aligns with content below (same 1600px max-width)
- [ ] Header has subtle shadow and blur effect from `card-elevated` class
- [ ] Padding matches page horizontal padding (px-6, lg:px-12, 2xl:px-24)

---

## Phase 3: Animated Link Underlines (SKIPPED)

### Overview
Add CSS utility class for animated underlines that sweep in from left on hover. Apply to all text links.

**Decision**: Skipped - no text links in the portfolio that need this treatment.

### Changes Required:

#### 1. Add Link Animation CSS
**File**: `src/app/globals.css`
**Location**: After the `.hover-linkedin` class (around line 613)

```css
/* Animated underline link */
.link-animated {
  position: relative;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.link-animated:hover::after {
  transform: scaleX(1);
}

/* For icons/non-text links, skip the underline */
.link-animated-icon {
  transition: color 0.2s ease;
}

.link-animated-icon:hover {
  color: var(--primary);
}

@media (prefers-reduced-motion: reduce) {
  .link-animated::after {
    transition: none;
  }
}
```

#### 2. Update Footer Link
**File**: `src/components/Footer.tsx`
**Changes**: Add `link-animated` class to the LinkedIn button text portion

The Footer uses a button-style CTA, so the animated underline doesn't apply here (buttons have their own hover states). No changes needed.

#### 3. Update Header Link (already done in Phase 2)
The Header LinkedIn icon link was updated to use `link-animated` in Phase 2.

#### 4. Update any inline text links
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
**Line 60**: Update the "Learn more" link

```tsx
// Change from:
<a href="#" className="text-body-sm text-primary hover:underline inline-flex items-center gap-1">

// To:
<a href="#" className="text-body-sm text-primary link-animated inline-flex items-center gap-1">
```

Search for other `hover:underline` usages and replace with `link-animated` where appropriate.

### Success Criteria:

#### Automated Verification:
- [x] CSS compiles without errors (dev server runs)
- [ ] No console errors

#### Manual Verification:
- [ ] Hover over Header LinkedIn icon - color transition works
- [ ] Hover over any text link - underline sweeps in from left
- [ ] Underline sweep takes ~250ms (feels snappy, not sluggish)
- [ ] With reduced motion, underline appears instantly (no animation)

---

## Phase 4: Increased Grid Spacing

### Overview
Increase the gap between vignette cards for more breathing room.

### Changes Required:

#### 1. Update SelectedWorkSection Grid Gap
**File**: `src/components/SelectedWorkSection.tsx`
**Line 35**: Update gap classes

```tsx
// Change from:
<div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">

// To:
<div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
```

This increases:
- Mobile/tablet gap: 24px → 32px
- Desktop gap: 32px → 40px

### Success Criteria:

#### Automated Verification:
- [x] Dev server runs without errors

#### Manual Verification:
- [x] Vignette cards have noticeably more space between them
- [x] Spacing feels more "premium" and less cramped
- [x] Page doesn't feel too long or sparse

**Actual implementation:** Used asymmetric spacing (`gap-6 lg:gap-y-8 lg:gap-x-12`) based on UI research - larger horizontal gaps create distinct columns, tighter vertical gaps maintain row cohesion.

---

## Phase 5: Refined Text Selection (Optional)

### Overview
Make text selection slightly more subtle by reducing opacity.

### Changes Required:

#### 1. Update Selection Styling
**File**: `src/app/globals.css`
**Lines 299-302**: Update selection styling

```css
/* Change from: */
::selection {
  background-color: rgba(59, 130, 246, 0.4);
  color: var(--neutral-50);
}

/* To: */
::selection {
  background-color: rgba(59, 130, 246, 0.2);
  color: inherit;
}
```

This makes selection:
- Lower opacity (20% vs 40%) - more subtle
- Inherits text color instead of forcing white - better contrast

### Success Criteria:

#### Automated Verification:
- [x] CSS compiles without errors

#### Manual Verification:
- [ ] Select text on the page
- [ ] Selection highlight is subtle blue tint, not overwhelming
- [ ] Text remains readable when selected

---

## Testing Strategy

### Visual Regression Testing:
1. Take screenshots before implementation
2. Compare after each phase
3. Ensure changes are subtle, not dramatic

### Cross-Browser Testing:
- Chrome (primary)
- Safari (backdrop-filter support)
- Firefox (scroll behavior)

### Responsive Testing:
- Mobile (375px)
- Tablet (768px)
- Desktop (1440px)
- Large desktop (1920px+)

### Accessibility Testing:
- Verify with `prefers-reduced-motion: reduce`
- Check focus states still work
- Verify text contrast ratios

## Performance Considerations

- `useScroll` uses passive scroll listeners (no jank)
- CSS transitions are GPU-accelerated (transform, opacity)
- No additional JavaScript bundles required
- `pointer-events: none` on scroll progress prevents interaction blocking

## References

- Research: `thoughts/shared/research/2026-01-05-minimal-visual-polish-patterns.md`
- Previous polish research: `thoughts/shared/research/2025-12-29-premium-polish-patterns.md`
- Header component: `src/components/Header.tsx`
- Animations: `src/lib/animations.ts`
- Global styles: `src/app/globals.css`
