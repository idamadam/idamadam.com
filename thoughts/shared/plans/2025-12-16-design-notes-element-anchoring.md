# Design Notes Element-Based Anchoring Implementation Plan

## Overview

Replace the percentage-based x,y coordinate system for design note annotations with CSS Anchor Positioning. This allows annotations to be semantically tethered to specific UI elements within the HighlightsPanel, automatically repositioning when those elements move.

## Current State Analysis

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

**Rendering:** `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:13-68`
- `InlineRedlines` component renders annotations with absolute positioning
- Uses `style={{ top: \`${note.y}%\`, left: \`${note.x}%\` }}`

**Content:** `src/components/vignettes/ai-highlights/content.ts:70-103`
- Four design notes with hardcoded x,y percentages

**Panel Elements:** `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
- Header section (lines 168-189)
- Highlight item (lines 191-271)
- Opportunity item (lines 274-355)
- Feedback footer (lines 357-378)

## Desired End State

Design notes anchor to semantic elements in the panel using CSS Anchor Positioning:
- Each note references an anchor name (e.g., `highlights-header`)
- Panel elements define anchor names via `anchor-name` CSS property
- Annotations automatically reposition when anchors move (e.g., during expand/collapse)
- Clean, maintainable code with no percentage calculations

**Verification:**
1. Annotations visually attach to their target elements
2. When expanding a highlight/opportunity, annotations smoothly follow
3. No visual drift or misalignment at different viewport sizes

## What We're NOT Doing

- Supporting legacy coordinate-based positioning (clean replacement)
- Adding polyfills for older browsers
- Implementing anchoring for other vignettes (AI Highlights only)
- Adding multiple anchor points per annotation

## Implementation Approach

Use native CSS Anchor Positioning with inline styles. Each panel element gets an `anchor-name`, and annotations use `position-anchor` to attach to them.

---

## Phase 1: Update Type System

### Overview
Replace the x,y coordinate properties with anchor-based properties in the DesignNote type.

### Changes Required:

#### 1. Update DesignNote Interface
**File**: `src/components/vignettes/types.ts`
**Changes**: Replace x,y with anchor configuration

```typescript
export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  anchor: string;  // Reference to anchor name (e.g., 'highlights-header')
  position: 'top' | 'bottom' | 'left' | 'right';  // Which side of anchor
  align?: 'start' | 'center' | 'end';  // Alignment along the edge
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `npm run build`
- [ ] No type errors in IDE

#### Manual Verification:
- [ ] N/A for this phase (type-only change)

---

## Phase 2: Add Anchor Names to Panel Elements

### Overview
Add CSS anchor names to semantic elements in HighlightsPanel that annotations will attach to.

### Changes Required:

#### 1. Add Anchor Names to SolutionState Elements
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
**Changes**: Add `style={{ anchorName: '--anchor-name' }}` to key elements

**Header section (around line 168):**
```tsx
<div
  className="border-b-2 border-[#eaeaec] px-6 py-6"
  style={{ anchorName: '--highlights-header' } as React.CSSProperties}
>
```

**Highlight item container (around line 192):**
```tsx
<div
  className="border-b-2 border-[#eaeaec]"
  style={{ anchorName: '--highlight-item' } as React.CSSProperties}
>
```

**Opportunity item container (around line 275):**
```tsx
<div
  className="border-b-2 border-[#eaeaec]"
  style={{ anchorName: '--opportunity-item' } as React.CSSProperties}
>
```

**Feedback footer (around line 358):**
```tsx
<div
  className="px-6 py-4 flex items-center gap-2"
  style={{ anchorName: '--feedback-footer' } as React.CSSProperties}
>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `npm run build`
- [ ] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] Panel renders correctly with no visual changes
- [ ] Anchor names visible in browser DevTools (Elements panel, computed styles)

---

## Phase 3: Update InlineRedlines Component

### Overview
Modify the annotation rendering to use CSS Anchor Positioning instead of percentage coordinates.

### Changes Required:

#### 1. Add Position Style Mapping
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Changes**: Add a mapping object and update the component to use anchor positioning

```tsx
// Position-to-style mapping for anchor positioning
const positionStyles = {
  right: { left: 'anchor(right)', top: 'anchor(center)', transform: 'translateY(-50%)' },
  left: { right: 'anchor(left)', top: 'anchor(center)', transform: 'translateY(-50%)' },
  top: { bottom: 'anchor(top)', left: 'anchor(center)', transform: 'translateX(-50%)' },
  bottom: { top: 'anchor(bottom)', left: 'anchor(center)', transform: 'translateX(-50%)' },
};

function InlineRedlines({
  notes,
  accent
}: {
  notes: DesignNote[];
  accent: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" style={{ overflow: 'visible' }}>
      {notes.map((note) => {
        const alignRight = note.position === 'right';

        return (
          <motion.div
            key={note.id}
            className="absolute"
            style={{
              position: 'absolute',
              positionAnchor: `--${note.anchor}`,
              ...positionStyles[note.position],
              transition: 'all 0.3s ease-out',
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Annotation content unchanged */}
          </motion.div>
        );
      })}
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `npm run build`
- [ ] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] Annotations appear attached to their target elements
- [ ] Annotations follow elements when expand/collapse happens
- [ ] Animations feel smooth during expand/collapse

**Implementation Note**: After completing this phase, pause for manual verification that annotations are positioning correctly before proceeding.

---

## Phase 4: Update Content Data

### Overview
Update the design notes content to use anchor references instead of x,y coordinates.

### Changes Required:

#### 1. Update Design Notes Array
**File**: `src/components/vignettes/ai-highlights/content.ts`
**Changes**: Replace x,y with anchor and position

```typescript
designNotes: {
  accent: '#ef4444',
  description: 'Annotated, human notes that show the messy thinking behind the polished surface.',
  notes: [
    {
      id: 'context-first',
      label: 'Context first',
      detail: 'Name, role, and purpose up top to anchor managers before they scan AI output.',
      anchor: 'highlights-header',
      position: 'left',
    },
    {
      id: 'verification',
      label: 'Verification loop',
      detail: "Sources sit directly under each highlight so managers can trust without hunting.",
      anchor: 'highlight-item',
      position: 'right',
    },
    {
      id: 'mirror',
      label: 'Mirrored patterns',
      detail: 'Highlight and Opportunity share the same layout so scanning feels automatic.',
      anchor: 'opportunity-item',
      position: 'left',
    },
    {
      id: 'feedback-loop',
      label: 'Micro feedback',
      detail: "A lightweight 'Is this helpful?' keeps the model accountable without breaking flow.",
      anchor: 'feedback-footer',
      position: 'right',
    }
  ]
}
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `npm run build`
- [ ] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] All four annotations appear in correct positions
- [ ] "Context first" anchored to header section
- [ ] "Verification loop" anchored to highlight item
- [ ] "Mirrored patterns" anchored to opportunity item
- [ ] "Micro feedback" anchored to feedback footer

---

## Testing Strategy

### Manual Testing Steps:
1. Navigate to homepage, scroll to AI Highlights vignette
2. Toggle to "Solution" view
3. Click "Show design details" button
4. Verify all four annotations appear attached to correct elements
5. Expand the Highlight sources - verify annotations move smoothly
6. Expand the Opportunity sources - verify annotations move smoothly
7. Collapse both - verify annotations return smoothly
8. Resize browser window - verify annotations stay attached
9. Test on Chrome, Safari, and Firefox

### Edge Cases:
- Very narrow viewport (annotations may need overflow handling)
- Both highlight and opportunity expanded simultaneously
- Rapid toggling of expand/collapse

## Performance Considerations

CSS Anchor Positioning is native browser functionality and more performant than JavaScript-based positioning calculations. No resize observers or scroll listeners needed.

## References

- Research document: `thoughts/shared/research/2025-12-16-design-notes-element-anchoring.md`
- MDN CSS Anchor Positioning: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- Current implementation: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:13-68`
