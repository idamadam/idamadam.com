---
date: 2025-12-28T14:53:55+11:00
git_commit: 0be47b9b14bdc5fcc964d6eb80dbbf2bcc596b4d
branch: refine-vignettes
repository: idamadam.com
topic: "Design Notes Annotation Patterns - Non-intrusive Positional Popups"
tags: [research, ux-patterns, design-notes, annotations, popover, hotspots]
status: complete
last_updated: 2025-12-28
last_updated_by: claude
---

# Research: Design Notes Annotation Patterns

The current design notes implementation uses CSS anchor positioning with dots that expand into label boxes with connector lines. The system has 4 visual states (subtle, focused, expanded, dimmed), requires separate mobile components (MobileRedlineMarkers + MobileRedlineTour), and the rendering obscures the actual content being showcased. The goal is to find a simpler, more optional pattern.

## Recommendation

**Given your constraints, I'd use numbered hotspot markers with Radix Popover.** Replace anonymous dots with numbered circles (1, 2, 3) that clearly signal "there's more info here." On click, show a Radix Popover positioned to avoid obscuring the content. On mobile, the same markers trigger a modal bottom sheet. This eliminates the complex 4-state system, removes connector lines entirely, and uses battle-tested primitives. The numbered markers also create a natural reading order and make the annotations feel like optional footnotes rather than always-visible overlays.

## Quick Comparison

| Option | Effort | A11y | Uses Existing | Risk | Verdict |
|--------|--------|------|---------------|------|---------|
| A: Numbered Markers + Popover | 4-6h | ✓ Built-in | Framer ✓ | Low | **Recommended** |
| B: Simplified Dots (current refactor) | 2-3h | ✓ | All existing | Low | Quick fallback |
| C: Design Notes as Separate Stage | 3-4h | ✓ | VignetteStaged | Med | Cleanest separation |

## Constraints Considered

- **Stack**: React 19, Next.js, Framer Motion, Tailwind CSS 4
- **Existing patterns**: VignetteStaged supports `designNotesPanel` prop (unused), RedlineOverlay with CSS anchor positioning, mobile tour bottom sheet
- **Priority**: Simplicity over polish, annotations should be optional and non-intrusive

---

## Current Implementation Analysis

### Complexity Issues Identified

1. **4 visual states for dots** (`subtle`, `focused`, `expanded`, `dimmed`) - excessive state management
2. **Connector lines** between dots and label boxes - visual clutter
3. **CSS anchor positioning** with complex fallback handling at 1350px breakpoint
4. **Separate mobile components** - MobileRedlineMarkers + MobileRedlineTour require coordinated state
5. **Design notes stage unused** - VignetteStaged supports a third stage but all vignettes show annotations inline during solution stage
6. **Always-visible dots** with animations that compete for attention with the actual content

### Files Involved

```
src/components/vignettes/shared/
├── RedlineOverlay.tsx          # Desktop overlay (164 lines)
├── MobileRedlineMarkers.tsx    # Mobile markers
├── MobileRedlineTour.tsx       # Bottom sheet tour
├── useRedlineMode.ts           # State management
├── useDesignNotesSetup.ts      # Setup orchestration
├── useAnchorStyle.ts           # CSS anchor helpers
├── design-notes.css            # Complex anchor positioning CSS
└── constants.ts                # Accent color
```

---

## Option A: Numbered Markers + Radix Popover (Recommended)

### Why this works

Numbered markers communicate "there's supplementary content here" without demanding attention. The Radix Popover primitive handles positioning, collision detection, and accessibility out of the box. Single interaction model (click to open) works on both desktop and mobile with the same component.

### Implementation sketch

```tsx
// DesignNoteMarker.tsx - single component for both platforms
import * as Popover from '@radix-ui/react-popover';

interface DesignNoteMarkerProps {
  index: number;
  note: DesignNote;
  accentColor?: string;
}

export function DesignNoteMarker({ index, note, accentColor = '#d4a012' }: DesignNoteMarkerProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [open, setOpen] = useState(false);

  // On mobile, use modal bottom sheet instead of popover
  if (isMobile) {
    return (
      <>
        <MarkerButton index={index} onClick={() => setOpen(true)} accent={accentColor} />
        <MobileSheet open={open} onClose={() => setOpen(false)} note={note} />
      </>
    );
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <MarkerButton index={index} accent={accentColor} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={note.position}
          align="center"
          sideOffset={8}
          collisionPadding={16}
          className="bg-white rounded-xl px-4 py-3 shadow-lg border max-w-[280px] z-50"
        >
          {note.label && <p className="font-semibold text-sm">{note.label}</p>}
          <p className="text-sm text-secondary">{note.detail}</p>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// Simple numbered circle button
function MarkerButton({ index, onClick, accent }: { index: number; onClick?: () => void; accent: string }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-full text-xs font-medium text-white flex items-center justify-center
                 hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2"
      style={{ backgroundColor: accent }}
      aria-label={`Design note ${index + 1}`}
    >
      {index + 1}
    </button>
  );
}
```

### Positioning approach

Instead of CSS anchor positioning (which requires complex fallbacks), use Radix's built-in collision detection:

```tsx
// Position markers using simple absolute positioning
// Radix handles collision detection for the popover content
<div
  className="absolute"
  style={{ left: note.x, top: note.y }}
>
  <DesignNoteMarker index={i} note={note} />
</div>
```

### State simplification

```tsx
// Before: 4 states (subtle, focused, expanded, dimmed)
// After: Just open/closed per marker

const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
```

### Gotchas

- **Radix dependency**: Need to install `@radix-ui/react-popover` (~8kb gzipped)
- **Mobile modal**: Still need a simple modal/sheet for mobile, but can be much simpler than MobileRedlineTour
- **Marker positioning**: Need to convert current anchor-based positions to x/y percentages

### Effort estimate: 4-6 hours

- 1h: Install Radix, create base DesignNoteMarker component
- 1h: Create simple mobile bottom sheet (reuse Dialog primitive)
- 2h: Update vignette content files to use x/y positioning instead of anchors
- 1h: Remove old components and CSS
- 0.5h: Testing and refinement

---

## Option B: Simplified Dots (Current Refactor)

### Why this works

Lowest effort - keeps existing architecture but strips complexity. Good if you want to ship quickly and iterate later.

### Changes required

1. **Remove focused/dimmed states** - just `idle` and `expanded`
2. **Remove connector lines** - label box appears directly adjacent to dot
3. **Keep CSS anchor positioning** - it works, just complex
4. **Simplify mobile** - keep bottom sheet, remove markers entirely (just use the tour)

### Implementation sketch

```tsx
// Simplified RedlineOverlay
const getDotState = (noteId: string) =>
  expandedAnnotations.has(noteId) ? 'expanded' : 'idle';

const dotStyles = {
  idle: { scale: 1, opacity: 0.8 },
  expanded: { scale: 1.1, opacity: 1 },
};
```

### Gotchas

- Doesn't solve the fundamental "annotations compete with content" problem
- CSS anchor positioning still requires maintenance

### Effort estimate: 2-3 hours

---

## Option C: Design Notes as Separate Stage

### Why this works

Cleanest separation of concerns. Solution stage shows pure content, design notes stage shows annotations as a list. Uses existing VignetteStaged infrastructure that's currently unused.

### Implementation sketch

```tsx
// In vignette component
<VignetteStaged
  stages={stages}
  designNotesPanel={
    <DesignNotesList notes={designNotes.notes} />
  }
>
  {/* Solution content without any annotation overlays */}
  <SolutionPanel />
</VignetteStaged>

// DesignNotesList - simple list view
function DesignNotesList({ notes }: { notes: DesignNote[] }) {
  return (
    <div className="space-y-4">
      {notes.map((note, i) => (
        <div key={note.id} className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-accent text-white text-xs
                           flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <div>
            {note.label && <p className="font-semibold">{note.label}</p>}
            <p className="text-secondary">{note.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Gotchas

- Loses spatial context - annotations not visually connected to what they describe
- Requires users to click through to see notes (more friction)
- May feel disconnected from the solution showcase

### Effort estimate: 3-4 hours

---

## What I Ruled Out

- **Hover tooltips**: Don't work on touch devices, conflict with scroll interactions
- **Always-visible labels**: Defeats the "optional" requirement, obscures content
- **Floating action button to toggle all**: Adds UI chrome, not contextual
- **Inline numbered footnotes**: Works for text, not for visual design showcases

---

## Sources

- [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover) - Accessible popover primitive with collision detection
- [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) - For comparison (hover-based, not suitable)
- [Apple HIG Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers) - One popover at a time, arrow points to trigger
- [Bottom Sheets - NN/g](https://www.nngroup.com/articles/bottom-sheet/) - Mobile pattern for progressive disclosure
- [Material Design Bottom Sheets](https://m3.material.io/components/bottom-sheets/overview) - Modal vs standard variants
- [Hotspot UX Examples](https://userguiding.com/blog/hotspot-ux) - Typeform's calm pulsing hotspots as reference
- [Mobbin Popover Examples](https://mobbin.com/glossary/popover) - Real-world popover implementations
- [Learn UI Design Portfolio Examples](https://www.learnui.design/blog/great-design-portfolio-examples.html) - Ueno's annotated designs pattern
- [Figma Annotations Blog](https://www.figma.com/blog/annotations-in-dev-mode/) - Context lives in one place philosophy

---

## Migration Path (if choosing Option A)

1. **Phase 1**: Create new DesignNoteMarker component alongside existing system
2. **Phase 2**: Migrate one vignette (AI Highlights) to new system
3. **Phase 3**: If successful, migrate remaining vignettes
4. **Phase 4**: Remove old RedlineOverlay, mobile components, and CSS

This allows rollback if issues arise.
