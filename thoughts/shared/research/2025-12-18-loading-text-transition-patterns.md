# Loading State Text Transition Patterns
**Research Date:** 2025-12-18
**Context:** Vignette component transitioning between "problem" and "solution" states with loading interstitial
**Framework:** React 19, Next.js 16, Framer Motion 12

## Problem Analysis

Current implementation in AIHighlightsVignette shows the core issue:

```tsx
// Lines 88-98 in AIHighlightsVignette.tsx
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

**The Issue:**
1. Text fades out when loading starts (good)
2. `AnimatePresence mode="wait"` waits for exit animation to complete before starting enter animation
3. During the 1.5s loading period, text is already invisible but exit animation creates "dead time"
4. When loading ends, new text enters but timing feels disconnected from panel transition

## Industry Research

### Premium Loading Patterns

Research from [6 Loading State Patterns That Feel Premium](https://medium.com/uxdworld/6-loading-state-patterns-that-feel-premium-716aa0fe63e8) identifies key principles:

1. **Skeleton Loading**: Shows structure while gradually revealing real content. Reduces perceived loading time by up to 40% vs spinners.
2. **Progressive Loading**: Users see something immediately while creating a polished, professional feel.
3. **Timing Standards**:
   - Consistent animation speeds: 1-2 seconds
   - Smooth transitions: 300-500ms for opacity/filter transitions
   - Fast motions preferred (slow motions increase perceived duration)

### Top Product Approaches

**Linear App:**
- Focuses on "smooth flows, lean visuals, and immediate state changes"
- Uses "tight transitions and focused interactions"
- Considered one of the cleanest UI examples

**Vercel Dashboard:**
- Caches loaded data to prevent showing spinners again (uses SWR)
- Improved Lighthouse score from 51 to 94 through performance optimization
- CSS transitions provide smooth fade effects between loading and content

**Stripe Dashboard:**
- "Introduces people to their dashboard with motion"
- Animation buys time to load data in the background
- Interactive loading states maintain engagement during wait times

### Skeleton UI Best Practices

From [LogRocket's Skeleton Loading Screen Design](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/) and [NN/G's Skeleton Screens](https://www.nngroup.com/articles/skeleton-screens/):

**Animation Timing:**
- Shimmer/pulse effects: 0.5s duration with 0.5s intervals
- Use for actions taking longer than a few hundred milliseconds
- Show skeleton when loading exceeds 3 seconds

**Transition Types:**
- **Pulse placeholders**: Low opacity transitions, good for unpredictable loading times
- **Waving placeholders**: More dynamic, used when content loads progressively
- Always prefer subtle animations over flashy effects

**Critical Rules:**
1. **Consistency**: No change in position, size, or type after content loads
2. **Progressive replacement**: Replace placeholders as content loads, don't leave skeleton too long
3. **Seamless transitions**: Reduce cognitive load with smooth state changes

## Framer Motion Specific Patterns

### AnimatePresence Modes

From [Motion Documentation](https://motion.dev/docs/react-animate-presence):

**mode="wait"** (current approach):
- Entering element waits until exiting child animates out
- Good for sequential animations
- **Problem**: Creates gap between exit and enter, feels disconnected

**mode="sync"** (default):
- Children animate in/out simultaneously as they're added/removed
- Exit and enter happen at the same time
- **Best for**: Crossfade transitions where old and new content overlap

**mode="popLayout"**:
- Exiting elements "popped" out with `position: absolute`
- Surrounding elements immediately reflow
- Pairs with `layout` prop for smooth layout animations
- **Best for**: List items, cards that affect surrounding layout

### Variants & Orchestration

From [Framer Motion Stagger Guide](https://motion.mighty.guide/some-examples/25-variants-staggered-animation/):

**Coordinating Multiple Elements:**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren" // or "afterChildren"
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

**Key Features:**
- `staggerChildren`: Delay between each child (in seconds)
- `delayChildren`: Initial delay before children animate
- `when`: Controls parent-child timing ("beforeChildren" | "afterChildren")
- `staggerDirection`: Can reverse stagger order (1 or -1)

### Exit Animation Coordination

From [Understanding AnimatePresence](https://medium.com/javascript-decoded-in-plain-english/understanding-animatepresence-in-framer-motion-attributes-usage-and-a-common-bug-914538b9f1d3):

**Best Practice:**
- Use `ease: "easeIn"` on exit animations
- Use `ease: "easeOut"` on enter animations
- Creates overall easeInOut effect

**Common Issues:**
- Direct children need changing keys to trigger animations
- Don't wrap in fragments inside AnimatePresence
- `onExitComplete` callback fires when all exits complete

## Accessibility Considerations

From [prefers-reduced-motion Guide](https://blog.greeden.me/en/2025/10/06/the-complete-accessibility-guide-to-animation-motion-designing-and-implementing-movement-as-comfortable-information/):

**Core Principle:**
- `prefers-reduced-motion: reduce` ≠ "remove all animations"
- Users expect motion from interactions to be disabled unless essential
- Animation can help accessibility (e.g., transitional interfaces showing where items go)

**WCAG Compliance:**
- Success Criterion 2.3.3: Disable nonessential animations triggered by user actions (AAA)
- Success Criterion 2.2.2: Provide pause/stop/hide controls for moving content
- Success Criterion 2.3.1: Avoid flashing more than 3 times per second

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
    transition: none;
  }
}
```

**Best Practices:**
1. Provide alternatives for status animations (replace spinner with "Loading..." text)
2. Use on-page controls (pause buttons) in addition to OS settings
3. Keep animations under 5 seconds
4. Prefer CSS and transform/opacity for smoothness
5. Take a "no-motion-first" approach (users may not know about settings)

**Your Implementation:**
```tsx
// Current good example from HighlightsPanel.tsx (lines 136-144)
@media (prefers-reduced-motion: reduce) {
  .loading-panel-border {
    animation: none;
    filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.3));
  }
  .skeleton-bar {
    animation: none;
  }
}
```

## Recommended Approaches

### Approach 1: Instant Text Swap with Crossfade (Recommended)

**Why it's smoother:**
- No dead time between exit and enter
- Text and panel transition feel coordinated
- Simpler mental model: content swaps when loading starts/ends

**Implementation:**
```tsx
// In VignetteSplit or wherever title/description are rendered
function TextTransition({ children, isLoading, transitionKey }) {
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.3 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Usage
<TextTransition isLoading={isLoading} transitionKey={stage}>
  {title}
</TextTransition>
```

**Benefits:**
- Old text fades to 30% opacity when loading starts (signals change happening)
- New text content is already in DOM but invisible during loading
- When loading ends, opacity goes to 100% (feels instant and responsive)
- Duration 0.2s is fast enough to feel immediate but smooth

**Framer Motion Features:**
- `mode="sync"`: Exit and enter happen simultaneously (crossfade)
- `initial={false}`: Prevents animation on mount (important for smooth transitions)
- Opacity-only transition (no y-movement) feels more stable during loading

---

### Approach 2: Staged Reveal with Layout Animation

**Why it's smoother:**
- Leverages Framer Motion's layout animations for automatic transitions
- Text and panel share same animation choreography
- Feels more "designed" with subtle position shifts

**Implementation:**
```tsx
function StagedTextReveal({ stage, isLoading, content }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div layout transition={{ layout: { duration: 0.3 } }}>
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={stage}
            layout
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{
              opacity: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              layout: { duration: 0.3 }
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Usage
<StagedTextReveal
  stage={stage}
  isLoading={isLoading}
  content={
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  }
/>
```

**Benefits:**
- Text completely disappears during loading (creates anticipation)
- `layout` prop animates position changes automatically
- Y-movement (8px) gives sense of content "sliding in"
- Respects reduced motion preferences
- Cubic bezier easing [0.4, 0, 0.2, 1] feels natural (iOS/Material Design standard)

**Framer Motion Features:**
- `layout`: Automatically animates layout changes
- `mode="wait"`: Text exits completely before new text enters
- Separate opacity/y transitions for fine control
- `useReducedMotion`: Disables y-movement for accessibility

---

### Approach 3: Variants-Based Orchestration (Most Advanced)

**Why it's smoother:**
- Single source of truth for all animation states
- Easy to coordinate title, description, and panel animations
- Staggered reveals feel polished and intentional

**Implementation:**
```tsx
const contentVariants = {
  loading: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

const itemVariants = {
  loading: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

function OrchestatedContent({ stage, isLoading, title, description }) {
  const animationState = isLoading ? "loading" : "visible";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        variants={contentVariants}
        initial="exit"
        animate={animationState}
        exit="exit"
      >
        <motion.h3 variants={itemVariants}>
          {title}
        </motion.h3>
        <motion.p variants={itemVariants}>
          {description}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Benefits:**
- Title and description stagger by 50ms (feels elegant)
- 100ms delay before children animate (gives loading state time to register)
- Different easing for exit (easeIn) vs enter (easeOut) creates smooth flow
- Loading state immediately triggers variant change (no dead time)
- All timing in one place (easy to adjust globally)

**Framer Motion Features:**
- **Variants**: Named animation states propagate to children
- **staggerChildren**: 0.05s delay between title and description
- **delayChildren**: 0.1s delay before any children animate
- Parent-child variant propagation (children automatically use parent's variant names)

**Advanced Options:**
```tsx
// Stagger from last child instead of first
transition: {
  staggerChildren: 0.05,
  staggerDirection: -1
}

// Coordinate with other animations
transition: {
  when: "beforeChildren", // parent animates before children
  // or when: "afterChildren"
}
```

## Implementation Comparison

### Current Implementation (Problem)
```tsx
// Title/description fade to opacity: 0 during loading
animate={{ opacity: isLoading ? 0 : 1, y: 0 }}

// Exit animation runs even though already invisible
exit={{ opacity: 0, y: -6 }}
```
- **Issue**: Exit animation creates 300ms of dead time
- **Total time**: 300ms exit + 1500ms loading + 300ms enter = 2100ms
- **Feels**: Disconnected, jerky

### Approach 1: Instant Swap
```tsx
animate={{ opacity: isLoading ? 0.3 : 1 }}
transition={{ duration: 0.2 }}
```
- **No dead time**: Text swaps immediately with loading state
- **Total time**: 200ms fade + 1500ms loading + 200ms fade = 1900ms
- **Feels**: Coordinated, responsive

### Approach 2: Staged Reveal
```tsx
{!isLoading && (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
  />
)}
```
- **Text disappears during loading**: Creates anticipation
- **Total time**: 250ms exit + 1500ms loading + 300ms enter = 2050ms
- **Feels**: Polished, intentional

### Approach 3: Variants
```tsx
variants={contentVariants}
animate={isLoading ? "loading" : "visible"}
```
- **Coordinated states**: All elements share animation timing
- **Total time**: 200ms exit + 1500ms loading + 300ms enter (staggered) = 2000ms
- **Feels**: Professional, cohesive

## Specific Recommendations for Your Codebase

### Quick Win (Approach 1)
**File:** `/home/idam/projects/idamadam.com/src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

**Change lines 88-98:**
```tsx
// FROM (mode="wait" with dead time):
<AnimatePresence mode="wait">
  <motion.span
    key={stage}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
  />
</AnimatePresence>

// TO (mode="sync" with instant swap):
<AnimatePresence mode="sync" initial={false}>
  <motion.span
    key={stage}
    initial={{ opacity: 0 }}
    animate={{ opacity: isLoading ? 0.3 : 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  />
</AnimatePresence>
```

**Why:**
- `mode="sync"` allows crossfade (no gap)
- `initial={false}` prevents first render animation
- Opacity 0.3 during loading signals "thinking" state
- Remove y-movement for stability during loading
- 200ms is fast enough to feel instant

### Better Solution (Approach 2)
If you want more polish with the current architecture:

```tsx
<AnimatePresence mode="wait">
  {!isLoading && (
    <motion.span
      key={stage}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        opacity: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
    />
  )}
</AnimatePresence>
```

**Why:**
- Conditional rendering removes dead time
- `layout` prop handles position changes smoothly
- Y-movement gives sense of content "sliding in"
- Separate transitions for opacity/y allows fine control

### Best Solution (Approach 3)
For maximum control and reusability, create a shared component:

**File:** `/home/idam/projects/idamadam.com/src/components/vignettes/shared/AnimatedText.tsx`

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

const variants = {
  loading: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

const variantsWithMotion = {
  loading: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

interface AnimatedTextProps {
  children: React.ReactNode;
  transitionKey: string;
  isLoading?: boolean;
  className?: string;
}

export function AnimatedText({
  children,
  transitionKey,
  isLoading = false,
  className = ''
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const animationState = isLoading ? 'loading' : 'visible';
  const selectedVariants = reducedMotion ? variants : variantsWithMotion;

  return (
    <AnimatePresence mode="wait">
      {!isLoading && (
        <motion.span
          key={transitionKey}
          variants={selectedVariants}
          initial="exit"
          animate={animationState}
          exit="exit"
          className={className}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
```

**Usage:**
```tsx
<AnimatedText transitionKey={stage} isLoading={isLoading}>
  {title}
</AnimatedText>
```

**Benefits:**
- Respects `prefers-reduced-motion`
- Reusable across all vignettes
- Consistent timing across portfolio
- Easy to maintain (change once, updates everywhere)

## Testing Checklist

- [ ] Test with `prefers-reduced-motion` enabled (should remove y-movement)
- [ ] Test rapid clicking (stage switching before animations complete)
- [ ] Test on low-end devices (animations should be performant)
- [ ] Verify no layout shift when text changes length
- [ ] Check timing coordination between text and panel
- [ ] Ensure loading state is visible long enough to register (1.5s seems good)
- [ ] Test with screen reader (content should be announced at right time)

## References

### UX Patterns & Best Practices
- [6 Loading State Patterns That Feel Premium](https://medium.com/uxdworld/6-loading-state-patterns-that-feel-premium-716aa0fe63e8)
- [Skeleton Loading Screen Design - LogRocket](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/)
- [Skeleton Screens 101 - NN/G](https://www.nngroup.com/articles/skeleton-screens/)
- [Executing UX Animations: Duration and Motion - NN/G](https://www.nngroup.com/articles/animation-duration/)

### Framer Motion Documentation
- [AnimatePresence - React Exit Animations](https://motion.dev/docs/react-animate-presence)
- [Understanding AnimatePresence in Framer Motion](https://medium.com/javascript-decoded-in-plain-english/understanding-animatepresence-in-framer-motion-attributes-usage-and-a-common-bug-914538b9f1d3)
- [Stagger - Stagger Multiple Animations](https://www.framer.com/motion/stagger/)
- [The Mighty Framer Motion Guide - Staggered Animation](https://motion.mighty.guide/some-examples/25-variants-staggered-animation/)
- [React Transitions - Configure Motion Animations](https://motion.dev/docs/react-transitions)

### Accessibility
- [The Complete Accessibility Guide to Animation & Motion](https://blog.greeden.me/en/2025/10/06/the-complete-accessibility-guide-to-animation-motion-designing-and-implementing-movement-as-comfortable-information/)
- [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Design Accessible Animation - Pope Tech Blog](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)
- [Accessible Animations - Practical Guide](https://annebovelett.eu/accessible-animations-a-practical-guide-for-designers-and-developers/)

### Industry Examples
- [Vercel Dashboard Optimization](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
- [Creating a Skeleton UI Loading Animation - ProtoPie](https://www.protopie.io/blog/how-to-create-a-skeleton-ui-loading-animation)
- [Charcoal Styles - React Animated List with Claude AI](https://www.charcoalstyles.com/blog/claude-ai-react/)

---

**Final Recommendation:** Start with **Approach 1** (Instant Swap with Crossfade) for immediate improvement, then consider refactoring to **Approach 3** (Variants-Based Orchestration) if you need to apply this pattern across multiple vignettes. The shared `AnimatedText` component ensures consistency and makes future updates easier.
