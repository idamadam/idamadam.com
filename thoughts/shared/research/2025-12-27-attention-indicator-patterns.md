---
date: 2025-12-27T23:28:24+11:00
git_commit: e72fb1db5a33d09177e9b9fff532f5d6a6c9a190
branch: refine-iteration-27dec
repository: idamadam.com
topic: "Attention indicators for interactive buttons and design note dots"
tags: [research, ux-patterns, btn-primary-pulse, design-notes, animation]
status: complete
last_updated: 2025-12-27
last_updated_by: claude
---

# Research: Attention Indicators for Interactive Buttons and Design Notes

The current implementation uses `btn-primary-pulse` (a continuous shimmer animation) on all primary CTA buttons. When multiple vignettes are visible on screen, the effect becomes visually overwhelming. Need a simpler, tasteful approach that draws attention without competing for it.

## Recommendation

**Use a one-shot entrance animation + static accent color for buttons, and a subtle breathing glow for design note dots.** The key insight from research: continuous animations lose their effect when always present ("if it's always there, it might as well not be there"). Replace infinite shimmer with a brief, one-time attention-grab when elements enter view, then let color and contrast do the work.

## Quick Comparison

| Option | A11y | Uses Existing | Effort | Risk | Verdict |
|--------|------|---------------|--------|------|---------|
| A: One-shot entrance + static contrast | ✓ | Framer ✓ | 1-2h | Low | **Recommended** |
| B: Subtle border glow (no shimmer) | ✓ | CSS ✓ | 2-3h | Low | Good alternative |
| C: Interactive-only pulse (hover trigger) | ✓ | CSS ✓ | 1h | Low | Minimal change |

## Constraints Considered

- **Stack**: React 19, Framer Motion 12, Tailwind CSS 4
- **Existing patterns**: `fadeInUp` entrance animations, `btn-primary-pulse` shimmer, `@keyframes btn-shimmer`
- **Priority**: Reduce visual noise while maintaining discoverability
- **A11y**: Must respect `prefers-reduced-motion`

## Option A: One-Shot Entrance Animation + Static Contrast (Recommended)

### Why this works

Continuous animations cause "notification fatigue" - users become desensitized or annoyed. Research shows that animated attention indicators work best when they're triggered by events (element entering viewport, state change) rather than running infinitely. Your existing `fadeInUp` animation already draws attention on scroll. Adding a brief scale/glow pulse at the end of entrance, then settling into a high-contrast static state, captures attention without sustained visual noise.

### Implementation sketch

```css
/* Remove infinite shimmer */
.btn-primary {
  background-color: var(--accent-interactive);
  /* Keep solid, no animation */
}

/* One-shot entrance animation */
@keyframes btn-entrance {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(24, 24, 27, 0.3); }
  50% { transform: scale(1.03); box-shadow: 0 0 12px 4px rgba(24, 24, 27, 0.15); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(24, 24, 27, 0); }
}

.btn-primary-entrance {
  animation: btn-entrance 0.6s ease-out forwards;
}

/* Design note dot - subtle breathing */
@keyframes dot-breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.15); }
}

.design-note-marker-dot {
  background-color: var(--warm-accent);
  animation: dot-breathe 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary-entrance { animation: none; }
  .design-note-marker-dot { animation: none; }
}
```

```tsx
// In panel components, trigger entrance class on mount/inView
<motion.button
  className="btn-interactive btn-primary"
  initial={{ opacity: 0, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
>
```

### Existing patterns to leverage
- `fadeInUp` from `src/lib/animations.ts` already handles entrance
- Framer Motion's `whileInView` for triggering animations on scroll
- CSS custom properties for consistent colors

### Gotchas
- Need to coordinate timing between Framer entrance and CSS animation
- Consider using Framer Motion for both (cleaner, single animation system)
- Test on mobile where multiple vignettes may stack

## Option B: Subtle Border Glow (No Shimmer)

### Why this works

Border animations highlight "button boundaries with a clean, professional effect" and "draw attention to calls-to-action without overwhelming surrounding content." A subtle outer glow via box-shadow creates depth without the movement of shimmer.

### Implementation sketch

```css
.btn-primary {
  background-color: var(--accent-interactive);
  box-shadow: 0 0 0 1px rgba(24, 24, 27, 0.1),
              0 2px 8px -2px rgba(24, 24, 27, 0.15);
  transition: box-shadow 0.2s ease;
}

.btn-primary:hover {
  box-shadow: 0 0 0 1px rgba(24, 24, 27, 0.15),
              0 4px 16px -4px rgba(24, 24, 27, 0.25);
}

/* Optional: very subtle ambient glow */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  background: radial-gradient(ellipse at center,
    rgba(24, 24, 27, 0.08) 0%,
    transparent 70%);
  z-index: -1;
  pointer-events: none;
}
```

### Gotchas
- May need to adjust glow color for different backgrounds
- Keep glow subtle - "use transparency to create a subtle glow effect that adds depth without being too harsh"

## Option C: Hover/Focus-Only Animation

### Why this works

The simplest change: keep shimmer but only trigger it on hover/focus. This respects the principle that animations should "respond to user actions" rather than run continuously.

### Implementation sketch

```css
.btn-primary-pulse {
  background: var(--accent-interactive);
  /* No animation by default */
}

.btn-primary-pulse:hover,
.btn-primary-pulse:focus-visible {
  background: linear-gradient(
    90deg,
    var(--accent-interactive) 0%,
    var(--accent-interactive) 40%,
    var(--neutral-600) 50%,
    var(--accent-interactive) 60%,
    var(--accent-interactive) 100%
  );
  background-size: 200% 100%;
  animation: btn-shimmer 1.5s ease-in-out infinite;
}
```

### Gotchas
- Loses "first glance" attention-grabbing
- Requires user to discover the button first
- Could combine with Option A (entrance pulse + hover shimmer)

## Design Note Dots: Additional Recommendations

For the design note dots specifically:

1. **Use warm accent color** (`--warm-accent: #f59e0b`) to visually differentiate from button CTAs
2. **Consider a "badge" approach**: small number or icon inside the dot on desktop
3. **Stagger entrance**: dots should animate in sequentially (0.1s delay between each) to guide the eye
4. **Reduce animation speed**: current breathing at 2.5s is comfortable; faster feels anxious

```css
.design-note-marker-dot {
  background-color: var(--warm-accent);
  box-shadow: 0 0 0 2px white, 0 0 8px rgba(245, 158, 11, 0.4);
}

/* Staggered entrance via CSS custom property */
.design-note-marker-dot {
  animation-delay: calc(var(--note-index, 0) * 0.15s);
}
```

## What I Ruled Out

- **Continuous shimmer on multiple buttons**: Creates visual noise when 4+ are visible
- **Red notification dots**: Implies urgency/errors, not appropriate for design exploration
- **Bouncing/shaking animations**: Too playful, doesn't match portfolio's professional tone
- **Complex rotating border gradients**: Over-engineered for the use case

## Sources

- [NN/G - Animation Purpose in UX](https://www.nngroup.com/articles/animation-purpose-ux/) - "Brief, unobtrusive animations improve UX; overuse becomes overwhelming"
- [Signifiers in UX Design](https://sparklin.com/blog/signifiers-in-ux-design-the-subtle-cues-that-make-interfaces-intuitive) - Subtle cues for intuitive interfaces
- [Microinteractions & Animations](https://rifledesign.co.uk/articles/microinteractions-animations-enhancing-ux-one-subtle-motion-at-a-time/) - Responding to user actions vs continuous animation
- [CSS Border Animation](https://www.sliderrevolution.com/resources/css-border-animation/) - Border glow for clean, professional attention
- [Red Dot Blindness](https://www.braze.com/resources/articles/beware-red-dot-badging) - "If it's always there, it might as well not be there"
- [UXPin Discoverability](https://www.uxpin.com/studio/blog/discoverability-in-ux/) - Visual cues and affordances for element discovery
- [CSS Glow Effects](https://www.lambdatest.com/blog/glowing-effects-in-css/) - Box-shadow techniques for subtle attention
- [Prismic CSS Button Animations](https://prismic.io/blog/css-button-animations) - Hover effects and tactile feedback patterns
