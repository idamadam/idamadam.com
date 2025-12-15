---
date: 2025-12-16T07:17:34+11:00
git_commit: 39fc995c28bd8bc8fd66b43e28dd4e22c804b0aa
branch: main
repository: idamadam.com
topic: "Design Notes Element-Based Anchoring"
tags: [research, codebase, design-notes, annotations, css-anchor-positioning, vignettes]
status: complete
last_updated: 2025-12-16
last_updated_by: Claude
---

# Research: Design Notes Element-Based Anchoring

**Date**: 2025-12-16T07:17:34+11:00
**Git Commit**: 39fc995c28bd8bc8fd66b43e28dd4e22c804b0aa
**Branch**: main
**Repository**: idamadam.com

## Research Question

How to improve the Design Notes feature to anchor annotations to specific elements within vignette panels, rather than using the current x,y percentage coordinate system?

## Summary

The current implementation uses percentage-based x,y coordinates (0-100) to position annotations. There are three viable approaches to implement element-based anchoring:

1. **CSS Anchor Positioning** (Recommended) - Native CSS feature with excellent browser support as of 2025
2. **React Ref-Based Anchoring** - Use refs with getBoundingClientRect() for positioning
3. **Data Attribute Targeting** - Add data-annotation attributes to elements and query them

CSS Anchor Positioning is the recommended approach due to its simplicity, native browser support, and elimination of JavaScript positioning calculations.

## Detailed Findings

### Current Implementation Analysis

**Type Definition:** `src/components/vignettes/types.ts:8-15`

```typescript
export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  x: number;      // percentage position (0-100)
  y: number;      // percentage position (0-100)
  align?: 'left' | 'right';
}
```

**Rendering Component:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:13-68`

The `InlineRedlines` component renders annotations using absolute positioning with percentage-based coordinates:

```tsx
<motion.div
  style={{ top: `${note.y}%`, left: `${note.x}%` }}
  className="absolute"
>
```

**Current Limitations:**
- Requires manual calculation of x,y percentages
- No semantic connection between annotation and target element
- Positions can drift if panel layout changes
- Difficult to maintain as panel content evolves

### Approach 1: CSS Anchor Positioning (Recommended)

CSS Anchor Positioning is a modern CSS feature that tethers positioned elements to anchor elements. As of September 2025, it's supported in Chrome and Safari, with Firefox support in development.

**How It Works:**

1. Define an anchor element with `anchor-name`:
```css
.target-element {
  anchor-name: --my-anchor;
}
```

2. Position an element relative to the anchor:
```css
.annotation {
  position: absolute;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
}
```

**Implementation in Codebase:**

```typescript
// Updated DesignNote type
export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  anchorId: string;  // Reference to anchor name (e.g., 'highlight-header')
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

// In panel components, add anchor names to elements
<div style={{ anchorName: '--highlight-header' }} className="header">
  {/* header content */}
</div>

// Annotation component
function DesignAnnotation({ note }: { note: DesignNote }) {
  return (
    <div
      style={{
        position: 'absolute',
        positionAnchor: `--${note.anchorId}`,
        top: note.position === 'bottom' ? 'anchor(bottom)' : undefined,
        left: note.align === 'center' ? 'anchor(center)' : undefined,
      }}
    >
      {/* annotation content */}
    </div>
  );
}
```

**Advantages:**
- Native CSS, no JavaScript positioning calculations
- Automatic repositioning when anchor moves
- Built-in overflow handling via `position-try-fallbacks`
- Clean separation of concerns

**Considerations:**
- Firefox support still pending (polyfill available)
- Requires adding anchor names to target elements

### Approach 2: React Ref-Based Anchoring

Use React refs to track target elements and calculate annotation positions.

**Implementation:**

```typescript
// Registry for anchor elements
const AnnotationContext = createContext<{
  registerAnchor: (id: string, ref: RefObject<HTMLElement>) => void;
  getAnchorPosition: (id: string) => DOMRect | null;
}>({});

// Hook for registering anchors
function useAnnotationAnchor(id: string) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerAnchor } = useContext(AnnotationContext);

  useEffect(() => {
    registerAnchor(id, ref);
  }, [id, ref]);

  return ref;
}

// In panel component
function HighlightsPanel() {
  const headerRef = useAnnotationAnchor('highlight-header');

  return (
    <div ref={headerRef}>
      {/* header content */}
    </div>
  );
}

// Annotation renderer
function DesignAnnotation({ note }: { note: DesignNote }) {
  const { getAnchorPosition } = useContext(AnnotationContext);
  const [position, setPosition] = useState<{ top: number; left: number }>();

  useEffect(() => {
    const rect = getAnchorPosition(note.anchorId);
    if (rect) {
      setPosition({ top: rect.bottom, left: rect.left + rect.width / 2 });
    }
  }, [note.anchorId]);

  return position ? (
    <div style={{ position: 'absolute', ...position }}>
      {/* annotation content */}
    </div>
  ) : null;
}
```

**Advantages:**
- Full browser support
- Complete control over positioning logic
- Can handle complex positioning scenarios

**Disadvantages:**
- Requires resize/scroll listeners for repositioning
- More JavaScript overhead
- Manual cleanup of refs needed

### Approach 3: Data Attribute Targeting

Add data attributes to elements and query them for positioning.

**Implementation:**

```typescript
// Updated DesignNote type
export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  targetSelector: string;  // e.g., '[data-annotation="header"]'
  offset?: { x: number; y: number };
}

// In panel component
<div data-annotation="highlight-header">
  {/* header content */}
</div>

// Annotation renderer
function DesignAnnotation({ note, containerRef }: Props) {
  const [position, setPosition] = useState<{ top: number; left: number }>();

  useEffect(() => {
    const container = containerRef.current;
    const target = container?.querySelector(note.targetSelector);
    if (target) {
      const rect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPosition({
        top: rect.top - containerRect.top + (note.offset?.y ?? 0),
        left: rect.left - containerRect.left + (note.offset?.x ?? 0),
      });
    }
  }, [note.targetSelector]);

  return position ? (
    <div style={{ position: 'absolute', ...position }}>
      {/* annotation content */}
    </div>
  ) : null;
}
```

**Advantages:**
- Simple to understand and implement
- No context/registry needed
- Works with any existing DOM structure

**Disadvantages:**
- Querying DOM on each render
- Requires container ref passed through
- Less type-safe than ref-based approach

### Anchor Points Available in Panels

Based on codebase analysis, here are semantic elements that could serve as anchors:

**AIHighlightsPanel:** `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
- Header section (avatar + role + description)
- Highlight card headers
- Source avatar clusters
- Feedback buttons (thumbs up/down)
- CTA buttons

**SuggestionsPanel:** `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`
- RichTextEditor component
- "Improve" button
- Loading card
- Recommendation items
- Feedback footer

**HomeConnectPanel:** `src/components/vignettes/home-connect/HomeConnectPanel.tsx`
- Culture Amp header
- Search bar
- Individual feed items
- Action item lists
- Tag badges

## Recommended Implementation

### Phase 1: Type System Update

```typescript
// src/components/vignettes/types.ts

export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  // Support both legacy and new anchoring
  anchor?: string;           // element anchor name (new)
  position?: 'top' | 'bottom' | 'left' | 'right';
  // Legacy coordinate system (deprecated)
  x?: number;
  y?: number;
  align?: 'left' | 'right';
}
```

### Phase 2: CSS Anchor Positioning Component

```typescript
// src/components/vignettes/DesignAnnotation.tsx

interface DesignAnnotationProps {
  note: DesignNote;
  accent?: string;
}

export function DesignAnnotation({ note, accent = '#ef4444' }: DesignAnnotationProps) {
  // Fallback to legacy positioning if no anchor specified
  const positionStyle = note.anchor
    ? {
        position: 'absolute' as const,
        positionAnchor: `--${note.anchor}`,
        [note.position === 'top' ? 'bottom' : 'top']: 'anchor(bottom)',
        left: 'anchor(center)',
      }
    : {
        position: 'absolute' as const,
        top: `${note.y}%`,
        left: `${note.x}%`,
      };

  return (
    <motion.div
      style={positionStyle}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Annotation content */}
    </motion.div>
  );
}
```

### Phase 3: Add Anchors to Panel Elements

```tsx
// Example in HighlightsPanel.tsx

<div
  className="header"
  style={{ anchorName: '--highlights-header' }}
>
  {/* header content */}
</div>

<div
  className="highlight-card"
  style={{ anchorName: '--highlight-item-1' }}
>
  {/* highlight content */}
</div>
```

### Phase 4: Update Content Files

```typescript
// src/components/vignettes/ai-highlights/content.ts

designNotes: {
  accent: '#ef4444',
  notes: [
    {
      id: 'context-first',
      label: 'Context first',
      detail: 'Name, role, and purpose up top...',
      anchor: 'highlights-header',
      position: 'right',
    },
    {
      id: 'verification-loop',
      label: 'Verification loop',
      detail: 'Each highlight links back to sources...',
      anchor: 'highlight-item-1',
      position: 'right',
    },
  ]
}
```

## Browser Support

| Browser | CSS Anchor Positioning |
|---------|------------------------|
| Chrome  | Supported (v125+)      |
| Safari  | Supported (v26+)       |
| Firefox | In development         |
| Edge    | Supported (v125+)      |

For Firefox fallback, consider using the [CSS Anchor Positioning Polyfill](https://github.com/nickshanks/css-anchor-positioning-polyfill) or graceful degradation to coordinate-based positioning.

## Code References

- `src/components/vignettes/types.ts:8-15` - DesignNote type definition
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:13-68` - InlineRedlines component
- `src/components/vignettes/ai-highlights/content.ts:67-104` - Design notes content
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx` - Panel with potential anchor points
- `src/lib/vignette-stage-context.tsx:5` - VignetteStage type definition

## Related Resources

- [MDN: CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)
- [CSS-Tricks: Anchor Positioning Guide](https://css-tricks.com/css-anchor-positioning-guide/)
- [Chrome DevRel: Tether Elements](https://developer.chrome.com/blog/tether-elements-to-each-other-with-css-anchor-positioning)
- [React Aria Popover](https://react-spectrum.adobe.com/react-aria/Popover.html)
- [react-image-annotation](https://github.com/Secretmapper/react-image-annotation)

## Open Questions

1. Should Firefox users see coordinate-based fallback or no annotations at all?
2. How to handle annotations when target element is collapsed/hidden?
3. Should annotations animate when their anchor element moves (e.g., during expand/collapse)?
4. Do we need to support multiple anchors per annotation (e.g., drawing a line between two elements)?
