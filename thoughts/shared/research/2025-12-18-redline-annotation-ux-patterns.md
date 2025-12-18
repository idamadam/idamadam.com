---
date: 2025-12-18T21:01:39+11:00
git_commit: a8f151aaf600ad59a7730be4ca85c75eceefa069
branch: iteration-18dec
repository: idamadam.com
topic: "Redline Annotation UX - Viewport Clipping, Text Overlap, and Activation Patterns"
tags: [research, ux-patterns, redline, annotations, ai-highlights]
status: complete
last_updated: 2025-12-18
last_updated_by: claude
---

# Research: Redline Annotation UX Improvements

Three issues to solve:
1. Right-side annotations clip on laptop screens
2. Left-side annotations overlap VignetteSplit text, looking unintentional
3. Toggle activation feels modal-but-not-modal, no natural dismissal

## Recommendation

Use **Floating UI's flip + shift middleware** to handle viewport collision detection, constraining annotations within the vignette bounds rather than extending into the viewport edge. For the activation model, switch to a **hover-reveal pattern** (like Figma's annotation visibility) with keyboard shortcut support (`Escape` to dismiss). This removes the toggle button friction while making the interaction feel exploratory rather than modal.

## Quick Comparison

| Option | Clipping Fix | Overlap Fix | Activation | Effort | Verdict |
|--------|-------------|-------------|------------|--------|---------|
| A: Floating UI + Hover | Flip/shift middleware | Constrain to panel | Hover + Escape | 4-5h | **Recommended** |
| B: Side Panel List | N/A (fixed position) | N/A | Click marker | 6-8h | More work, less elegant |
| C: CSS-only containment | `position-try-fallbacks` | Manual clamp | Keep toggle | 2-3h | Partial fix only |

## Constraints Considered

- **Stack**: Next.js 16, Framer Motion, CSS anchor positioning already in use
- **Existing patterns**: `useRedlineMode` hook, `RedlineOverlay` component, anchor-based positioning
- **Priority**: Natural interaction feel, avoid clipping, maintain "show don't tell" philosophy
- **Browser support**: CSS anchor positioning already in use; Floating UI would add fallback safety

## Option A: Floating UI + Hover Activation (Recommended)

### Why this works
Floating UI is battle-tested for exactly this problem. Radix UI adopted it and fixed 7 positioning bugs in one go. The hover activation aligns with how Figma and other annotation tools work. Users expect to explore annotations by hovering, not by entering a "mode."

### Implementation sketch
```tsx
// Replace CSS anchor positioning with Floating UI
import { useFloating, flip, shift, offset } from '@floating-ui/react';

function AnnotationCallout({ note, anchorRef, isVisible }) {
  const { refs, floatingStyles } = useFloating({
    placement: note.position === 'right' ? 'right' : 'left',
    middleware: [
      offset(16), // gap from anchor
      flip({
        fallbackPlacements: ['top', 'bottom'], // if side doesn't fit
        padding: 20 // viewport padding
      }),
      shift({
        padding: 20,
        crossAxis: true
      })
    ],
    whileElementsMounted: autoUpdate
  });

  return (
    <motion.div
      ref={refs.setFloating}
      style={floatingStyles}
      // ... rest of annotation UI
    />
  );
}

// Activation: hover on panel reveals annotations
function AIHighlightsContent() {
  const [showAnnotations, setShowAnnotations] = useState(false);

  // Escape to dismiss
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && setShowAnnotations(false);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <VignetteSplit>
      <motion.div
        onMouseEnter={() => setShowAnnotations(true)}
        onMouseLeave={() => setShowAnnotations(false)}
      >
        <HighlightsPanel />
        <RedlineOverlay isActive={showAnnotations && stage === 'solution'} />
      </motion.div>
    </VignetteSplit>
  );
}
```

### Collision behavior
- **Right-side clips?** Flip to left, or shift up/down
- **Left-side overlaps text?** Constrain to panel bounds, flip to right if needed
- **Both sides blocked?** Fall back to top/bottom positioning

### Gotchas
- Need to add `@floating-ui/react` package (~15kb gzipped)
- Must replace CSS anchor positioning with JS-based positioning (anchor API still experimental)
- Hover activation needs mobile fallback (keep tap-to-reveal for touch)
- Consider adding subtle visual cue that annotations exist (e.g., small indicator dots)

## Option B: Side Panel List

Move annotations from floating callouts to a collapsible side panel that lists all notes. Click a note to highlight its anchor on the panel.

### Why consider it
- Completely eliminates viewport clipping issues
- Works perfectly on all screen sizes
- Similar to how Figma DevMode shows annotations in a sidebar

### Implementation sketch
```tsx
function AnnotationPanel({ notes, onHighlight }) {
  return (
    <motion.aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
      {notes.map(note => (
        <button
          key={note.id}
          onClick={() => onHighlight(note.anchor)}
          className="p-4 hover:bg-gray-50 text-left"
        >
          <h4 className="font-semibold text-red-600">{note.label}</h4>
          <p className="text-sm text-gray-600">{note.detail}</p>
        </button>
      ))}
    </motion.aside>
  );
}
```

### Gotchas
- Loses the "inline redline" aesthetic that makes this vignette distinctive
- More implementation work for the panel + highlight coordination
- May feel less immediate/exploratory than hover

## Option C: CSS-only Containment (Partial Fix)

Keep current approach but add viewport constraints using CSS containment and fallback positioning.

### Implementation
```css
.design-note[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;

  /* Constrain to visible area */
  max-width: min(230px, calc(100vw - anchor(right) - 32px));

  /* Fallback when clipped */
  position-try-fallbacks: flip-inline;
}
```

### Why it's partial
- CSS anchor positioning fallbacks are still experimental
- Doesn't solve the left-side text overlap (would need to manually adjust VignetteSplit padding)
- Doesn't address the activation UX issue at all

## What I Ruled Out

- **Modal with backdrop**: Too heavy for exploratory annotations, breaks the inline feel
- **Always-visible annotations**: Creates visual clutter, defeats the progressive disclosure
- **Numbered markers only (click to reveal)**: Already have this on mobile; on desktop users expect hover
- **Popover component (Radix)**: Overkill for this use case, designed for menus not annotations

## Sources

- [Floating UI flip middleware](https://floating-ui.com/docs/flip) - Collision detection with fallback placements
- [Floating UI shift middleware](https://floating-ui.com/docs/shift) - Viewport edge shifting with padding
- [Radix UI adopted Floating UI](https://x.com/floating_ui/status/1549691590083747840) - Fixed 7 positioning bugs
- [Radix Popover positioning](https://www.radix-ui.com/primitives/docs/components/popover) - collisionBoundary props
- [Modal UX best practices](https://blog.logrocket.com/ux-design/modal-ux-design-patterns-examples-best-practices/) - Click outside and Escape to dismiss patterns
- [Figma Annotations Overlay](https://forum.figma.com/suggest-a-feature-11/launched-annotations-overlay-35609) - Toggle annotation visibility patterns
- [Side Panel pattern (Workday Canvas)](https://canvas.workday.com/components/containers/side-panel) - Alternative to floating annotations
