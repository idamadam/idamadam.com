---
date: 2026-01-20T08:51:01+11:00
git_commit: 61ef8d147c8603ebfb80ee343035e6e9873c0dd7
branch: address-feedback
repository: idamadam.com
topic: "Making interactive markers discoverable without being intrusive"
tags: [research, ux-patterns, numbered-marker, affordance, animation]
status: complete
last_updated: 2026-01-20
last_updated_by: claude
---

# Research: Marker Discoverability Without Being Intrusive

The numbered design note markers need to feel clickable and invite exploration, but shouldn't "bonk users over the head." Good design should intuitively lead users there.

## Recommendation

**Use a delayed, subtle breathing animation that starts only after the user has had time to scan the content.** This creates a "there's more here when you're ready" signal rather than a "CLICK ME NOW" demand. The animation should be extremely gentle (2-3px shadow expansion over 3s), only trigger once the marker has been visible for 1-2 seconds, and stop permanently after the user interacts with any marker.

## Quick Comparison

| Option | Subtlety | Implementation | A11y | Verdict |
|--------|----------|----------------|------|---------|
| A: Delayed breathing glow | ✓✓✓ | Uses existing `breathe-subtle` | ✓ | **Recommended** |
| B: Staggered entrance animation | ✓✓ | New Framer Motion variants | ✓ | Good fallback |
| C: Hover-triggered tooltip hint | ✓✓✓ | Minor text addition | ✓ | Complementary |

## Constraints Considered

- **Stack**: Framer Motion available, `breathe-subtle` CSS animation exists in globals.css
- **Existing patterns**: `subtlePulse` in animations.ts, `breathe-glow` class already defined
- **Priority**: Discoverability without annoyance, respects reduced-motion preferences
- **Current state**: Markers are transparent outline style (recently changed from filled)

## Option A: Delayed Breathing Glow (Recommended)

### Why this works

Research shows micro-interactions increase engagement by 45% when functional, not decorative ([Beta Soft Technology](https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/)). The key insight from [NN/G on coach marks](https://www.nngroup.com/articles/mobile-instructional-overlay/) is that hints should focus on "particularly innovative or unexpected elements" - which your design note markers are.

The delay is crucial: it lets users read content first, then notice movement in peripheral vision. This mimics how Linear and Figma handle feature discovery - subtle, delayed, and respecting user attention.

### Implementation sketch

```tsx
// NumberedMarker.tsx
export default function NumberedMarker({ number, onClick, isActive, className }: Props) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Start animation after 1.5s delay (user has had time to scan)
  useEffect(() => {
    if (prefersReducedMotion || hasInteracted) return;
    const timer = setTimeout(() => setShouldAnimate(true), 1500);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, hasInteracted]);

  const handleClick = () => {
    setHasInteracted(true);
    setShouldAnimate(false);
    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        size-6 rounded-full
        bg-transparent border border-accent-300
        text-accent-600 text-[11px] font-medium
        ${shouldAnimate ? 'breathe-glow' : ''}
        ${className}
      `}
      // ... rest of props
    />
  );
}
```

### Similar to in codebase

- `breathe-glow` class in `globals.css:425` - already implements the subtle shadow pulse
- `btn-primary` uses same animation pattern

### Gotchas

- Must respect `prefers-reduced-motion` - animation should be disabled
- Animation should stop after ANY marker is clicked (shared state via context)
- On mobile, consider if animation is visible enough on small targets

## Option B: Staggered Entrance Animation

### Why this works

Instead of continuous animation, markers enter with a slight stagger and scale-up, creating visual interest during the initial reveal. This is a one-time effect that says "hey, these are here" without ongoing distraction.

### Implementation sketch

```tsx
// In the panel that renders markers
{notes.map((note, index) => (
  <motion.div
    key={note.id}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay: 0.8 + (index * 0.15), // Stagger after content loads
      type: "spring",
      stiffness: 300,
      damping: 20
    }}
  >
    <NumberedMarker number={index + 1} ... />
  </motion.div>
))}
```

### Gotchas

- Only works on first render - returning users won't see the hint
- Spring animation might feel too bouncy if not tuned carefully

## Option C: Contextual Tooltip Hint (Complementary)

Add a small text hint near the first marker or in the panel that says "Click markers to explore design decisions" - shown only on first visit.

This is more explicit but less elegant. Could combine with Option A for maximum discoverability on first visit.

## What I Ruled Out

- **Coach mark overlay**: Too heavy-handed for a portfolio; feels like onboarding software ([NN/G warns](https://www.nngroup.com/articles/mobile-instructional-overlay/) these can make apps "appear overly complicated")
- **Continuous scale pulse**: The existing `whileHover={{ scale: 1.1 }}` is good for hover, but continuous scale pulse feels more aggressive than shadow glow
- **Color change animation**: Would compete with the accent color system and feel inconsistent
- **Sound/haptic**: Way over the top for this context

## Sources

- [NN/G: Instructional Overlays and Coach Marks](https://www.nngroup.com/articles/mobile-instructional-overlay/) - Key insight: "hints one-by-one, at the right moment"
- [Beta Soft Technology: Motion UI Trends 2025](https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/) - "micro-interactions increase engagement by 45%"
- [Sparklin: Signifiers in UX Design](https://sparklin.com/blog/signifiers-in-ux-design-the-subtle-cues-that-make-interfaces-intuitive) - "affordances only become useful when signifiers make them perceivable"
- [NN/G: Beyond Blue Links](https://www.nngroup.com/articles/clickable-elements/) - "it's not enough to be clickable—it has to look clickable"
- [Medium: Coach Marks Secret](https://medium.com/design-bootcamp/coach-marks-the-secret-to-guiding-users-without-annoying-them-3b8495b60353) - best practices for subtle guidance
- [Figma Community: Pulse Interaction Components](https://www.figma.com/community/file/1064737386231706382/pulse-interaction-components) - implementation reference
