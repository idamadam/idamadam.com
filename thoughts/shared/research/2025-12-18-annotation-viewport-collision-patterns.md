---
date: 2025-12-18T21:47:34+11:00
git_commit: 8d9e0e02f1aaa5ba9ec60d85f3f39a1f6ab24b51
branch: iteration-18dec
repository: idamadam.com
topic: "How to prevent redline annotations from clipping at viewport edges"
tags: [research, ux-patterns, annotations, css-anchor-positioning, viewport-collision]
status: complete
last_updated: 2025-12-18
last_updated_by: claude
---

# Research: Viewport-Aware Annotation Positioning

Redline annotations (design notes positioned alongside UI elements) clip at viewport edges on smaller laptop screens. Right-side annotations get cut off, and left-side annotations can overlap the VignetteSplit text column. Floating UI was attempted but abandoned due to React render cycle timing issues with anchor element references.

## Recommendation

**Use CSS `position-try-fallbacks` with the existing anchor positioning.** This is a 1-2 hour change that adds native collision detection to your current CSS approach. Browser support is now at 75% (Chrome 125+, Safari 26+, Firefox 147+), and browsers without support gracefully degrade to current behavior (annotations may clip, which is acceptable). This avoids the React timing complexity that killed the Floating UI approach.

## Quick Comparison

| Option | Browser Support | Uses Existing | Effort | Verdict |
|--------|----------------|---------------|--------|---------|
| A: CSS `position-try-fallbacks` | 75% | CSS anchors | 1-2h | **Recommended** |
| B: Reduce annotation width | 100% | CSS anchors | 30min | Quick fallback |
| C: Radix Popover primitives | 100% | New dependency | 4-6h | Overkill |
| D: Keep current behavior | 100% | CSS anchors | 0h | Acceptable |

## Constraints Considered

- **Stack**: Next.js, React 19, Tailwind CSS 4, Framer Motion, CSS Anchor Positioning
- **Existing patterns**: CSS anchor positioning in `design-notes.css` with `anchor()` functions
- **What failed**: Floating UI due to React render cycle timing with DOM element references
- **Priority**: Minimal complexity, progressive enhancement over full replacement

## Option A: CSS `position-try-fallbacks` (Recommended)

### Why this works

CSS `position-try-fallbacks` is the native browser solution for exactly this problem. It integrates directly with your existing `anchor()` positioning without needing JavaScript for collision detection. The browser handles all the flip/shift logic declaratively. Since you already have CSS anchor positioning working, this is an incremental enhancement rather than a rewrite.

### Implementation sketch

```css
/* design-notes.css */

.design-note[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;

  /* Add fallback positions when right side clips */
  position-try-fallbacks:
    flip-inline,           /* Try left side */
    --top-position,        /* Try above */
    --bottom-position;     /* Try below */
}

.design-note[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -16px -50%;

  position-try-fallbacks:
    flip-inline,           /* Try right side */
    --top-position,
    --bottom-position;
}

/* Custom fallback positions for more control */
@position-try --top-position {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -16px;
  /* Optionally reduce width when repositioned */
  max-width: 200px;
}

@position-try --bottom-position {
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 16px;
  max-width: 200px;
}

/* For browsers without support, current behavior continues */
@supports not (position-try-fallbacks: flip-inline) {
  /* Optional: reduce annotation width as graceful degradation */
  .design-note {
    max-width: 200px;
  }
}
```

### Browser support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 125+ | Full support |
| Edge | 125+ | Full support |
| Safari | 26+ | Full support |
| Firefox | 147+ | Full support |
| **Global** | **75%** | Baseline emerging |

Source: [Can I Use - CSS Anchor Positioning](https://caniuse.com/css-anchor-positioning)

### Gotchas

- Property was renamed from `position-try-options` to `position-try-fallbacks` in Chrome 129. Use the `position-try` shorthand for better compatibility
- The 25% without support will see annotations clip (current behavior) - this is acceptable graceful degradation
- `@position-try` custom rules let you adjust width when flipping, useful if flipped annotations need to be narrower
- Test on Safari 26+ specifically since it was the last major browser to add support

## Option B: Reduce Annotation Width

### Why this works

The annotations have `min-w-[230px]` on the label box. On a 1024px viewport with a ~400px left column, that leaves ~624px for the right panel. Right-side annotations positioned 16px from anchors may clip if the anchor is on the right edge. Simply reducing width from 230px to 180-200px could prevent most clipping without any collision detection logic.

### Implementation sketch

```css
/* In RedlineOverlay.tsx, change: */
.rounded-xl.px-3.py-2.shadow-sm.min-w-[230px].bg-white
/* to: */
.rounded-xl.px-3.py-2.shadow-sm.min-w-[180px].max-w-[200px].bg-white
```

Or make it responsive:
```tsx
<motion.div
  className="rounded-xl px-3 py-2 shadow-sm bg-white
             min-w-[180px] max-w-[200px]
             xl:min-w-[230px] xl:max-w-none"
>
```

### Gotchas

- Annotations with longer text may wrap more
- Doesn't truly solve the positioning problem, just reduces its severity
- May need to adjust line-height or truncate long annotations

## Option C: Radix Popover Primitives

### Why this might work

Radix UI's Popover/Tooltip primitives have built-in collision detection via Floating UI under the hood, but they manage the React lifecycle internally. This could avoid the timing issues encountered with raw Floating UI.

### Why I'd skip it

- Adds a dependency for one component's positioning needs
- You'd need to refactor annotations to use Radix's component structure
- The CSS-native solution (`position-try-fallbacks`) is cleaner for this use case
- 4-6 hours of work for something CSS can handle in 1-2 hours

## Option D: Keep Current Behavior

### Why this might be acceptable

The clipping only affects:
- Desktop viewports (mobile has separate MobileRedlineTour)
- Smaller laptop screens (~1024-1280px)
- Annotations near viewport edges

If your analytics show most desktop users have larger screens, the impact is minimal. The annotations still convey their information even when partially clipped.

### When to choose this

- If you have higher priority work
- If user testing shows clipping isn't a real pain point
- As a temporary decision while browser support for `position-try-fallbacks` improves

## What I Ruled Out

- **Floating UI**: Already attempted and abandoned due to React render cycle timing issues with anchor element references causing infinite loops or incorrect positions
- **jQuery UI position()**: Legacy approach, not appropriate for a modern React/Next.js codebase
- **Manual JS collision detection**: Reimplements what CSS `position-try-fallbacks` does natively, with more code to maintain
- **Portals**: Useful for escaping overflow containers, but your issue is viewport edges, not container clipping

## Sources

- [MDN: position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks) - Complete syntax reference and examples
- [CSS-Tricks: CSS Anchor Positioning Guide](https://css-tricks.com/css-anchor-positioning-guide/) - Best practices for flip/shift with `@position-try`
- [Can I Use: CSS Anchor Positioning](https://caniuse.com/css-anchor-positioning) - 75% global browser support
- [MDN: position-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-visibility) - Alternative for hiding overflowing elements
- [Chrome Blog: Anchor Positioning API](https://developer.chrome.com/blog/anchor-positioning-api) - Implementation details and naming changes
- [OddBird: Anchor Position Updates Fall 2025](https://www.oddbird.net/2025/10/13/anchor-position-area-update/) - Recent spec changes and browser updates
- [Figma Blog: Annotations in Dev Mode](https://www.figma.com/blog/annotations-in-dev-mode/) - How Figma handles annotation positioning (bumps into edges, adjusts based on zoom)
- [Radix UI: Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) - Reference implementation with collision detection
