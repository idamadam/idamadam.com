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

Use native CSS Anchor Positioning with a **hybrid CSS + inline style approach**:

- **Inline styles** for `anchor-name` (on panel elements) and `position-anchor` (on annotations) - these work as inline styles because they're simple CSS custom property values
- **CSS file** for `anchor()` function positioning - these **cannot** work as inline styles because React passes them as string literals, not CSS function calls

**Why not pure inline styles?** When you write `style={{ left: 'anchor(right)' }}`, React passes the literal string `"anchor(right)"` to the DOM. The browser's CSS parser never sees this as a CSS function, so it's treated as invalid and falls back to default positioning (0,0 = top-left clustering).

**Solution:** Define `anchor()` positioning rules in a CSS file using data attributes, then apply `position-anchor` via inline styles for dynamic anchor association.

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

## Phase 3: Create CSS File for Anchor Positioning

### Overview
Create a CSS file with `anchor()` positioning rules. These **must** be in CSS (not inline styles) because `anchor()` is a CSS function that React inline styles cannot parse.

### Changes Required:

#### 1. Create Design Notes CSS File
**File**: `src/components/vignettes/ai-highlights/design-notes.css` (new file)
**Changes**: Define anchor positioning rules using data attributes

```css
/* Design Notes Anchor Positioning
 *
 * Note: anchor() functions MUST be in CSS, not inline styles.
 * React inline styles pass "anchor(right)" as a literal string,
 * which the browser treats as invalid CSS (causing top-left clustering).
 */

.design-note {
  position: absolute;
  /* position-anchor is applied via inline style for dynamic anchor binding */
}

/* Position variants - annotation appears on this side of the anchor */
.design-note[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;
}

.design-note[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -16px -50%;
}

.design-note[data-position="top"] {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -16px;
}

.design-note[data-position="bottom"] {
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 16px;
}

/* Fallback for browsers without anchor positioning support */
@supports not (anchor-name: --test) {
  .design-note {
    /* Fall back to percentage-based positioning via CSS custom properties */
    top: var(--fallback-y, 50%);
    left: var(--fallback-x, 50%);
    translate: -50% -50%;
  }
}
```

### Success Criteria:

#### Automated Verification:
- [ ] CSS file created at correct path
- [ ] No CSS syntax errors: `npm run build`

#### Manual Verification:
- [ ] N/A for this phase (CSS-only, no visual changes yet)

---

## Phase 4: Update InlineRedlines Component

### Overview
Modify the annotation rendering to use the CSS classes and data attributes instead of percentage coordinates.

### Changes Required:

#### 1. Import CSS and Update Component
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
**Changes**: Import CSS file, use data attributes for positioning, inline style for position-anchor

```tsx
import './design-notes.css';

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
            className="design-note"
            data-position={note.position}
            style={{
              positionAnchor: `--${note.anchor}`,
            } as React.CSSProperties}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className={`flex items-start gap-3 ${alignRight ? 'flex-row-reverse text-right' : 'text-left'}`}>
              {/* Dot and line */}
              <div className={`flex items-center ${alignRight ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 0 8px ${accent}1a`
                  }}
                />
                <div
                  className={`h-px w-10 ${alignRight ? 'mr-2' : 'ml-2'}`}
                  style={{ backgroundColor: accent }}
                />
              </div>

              {/* Label box */}
              <div
                className="rounded-xl px-3 py-2 shadow-sm max-w-[230px] bg-white"
                style={{
                  border: `1px solid ${accent}33`,
                  boxShadow: '0 12px 40px rgba(248, 113, 113, 0.15)'
                }}
              >
                <p className="text-[13px] font-semibold leading-[1.3]" style={{ color: accent }}>
                  {note.label}
                </p>
                <p className="text-[13px] leading-[1.5] mt-1 text-[#475569]">
                  {note.detail}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

**Key changes from original plan:**
- Import CSS file instead of defining inline position styles
- Use `className="design-note"` for base positioning rules
- Use `data-position={note.position}` for position variant (left/right/top/bottom)
- Use inline `style={{ positionAnchor: ... }}` for dynamic anchor binding (this works as inline style)
- Remove `anchor()` function calls from inline styles (these are now in CSS)

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `npm run build`
- [ ] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] Annotations appear attached to their target elements (not clustered at top-left)
- [ ] Annotations follow elements when expand/collapse happens
- [ ] Animations feel smooth during expand/collapse

**Implementation Note**: After completing this phase, pause for manual verification that annotations are positioning correctly before proceeding.

---

## Phase 5: Update Content Data

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
4. Verify all four annotations appear attached to correct elements (not clustered at top-left!)
5. Expand the Highlight sources - verify annotations move smoothly
6. Expand the Opportunity sources - verify annotations move smoothly
7. Collapse both - verify annotations return smoothly
8. Resize browser window - verify annotations stay attached
9. Test on Chrome (primary - full support since v125)
10. Test on Safari (coming soon, check current support status)
11. Test on Firefox (no native support yet, verify fallback works)

### Edge Cases:
- Very narrow viewport (annotations may need overflow handling)
- Both highlight and opportunity expanded simultaneously
- Rapid toggling of expand/collapse

### Browser Support Testing:
CSS Anchor Positioning is part of **Interop 2025** and has varying support:
- **Chrome 125+**: Full support ✅
- **Edge 125+**: Full support ✅
- **Safari**: Coming soon (check webkit.org for status)
- **Firefox**: No native support yet (polyfill available from Oddbird)

The `@supports not (anchor-name: --test)` fallback in the CSS ensures graceful degradation.

## Troubleshooting: Top-Left Clustering

If annotations cluster at (0,0) instead of anchoring correctly, check these common causes:

| Symptom | Cause | Fix |
|---------|-------|-----|
| All notes at top-left | `anchor()` in inline styles | Move `anchor()` rules to CSS file |
| All notes at top-left | Missing `position: absolute` | Add to `.design-note` class in CSS |
| Single note at top-left | Typo in anchor name | Verify `--anchor-name` matches exactly |
| Notes at top-left in Firefox | No browser support | Check `@supports` fallback is working |
| Notes ignore anchor | Missing `position-anchor` | Add inline style `positionAnchor: '--name'` |
| Notes positioned wrong axis | Axis mismatch in `anchor()` | Use `anchor(left/right)` for horizontal, `anchor(top/bottom)` for vertical |

**Debug checklist:**
1. Open DevTools → Elements → select the annotation element
2. Check Computed styles for `position-anchor` (should show `--anchor-name`)
3. Check that `left`/`right`/`top`/`bottom` shows `anchor(...)` not a fallback value
4. If values show as "invalid", the `anchor()` is in inline styles (move to CSS)

## Performance Considerations

CSS Anchor Positioning is native browser functionality and more performant than JavaScript-based positioning calculations. No resize observers or scroll listeners needed.

## References

- Research document: `thoughts/shared/research/2025-12-16-design-notes-element-anchoring.md`
- MDN CSS Anchor Positioning: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- Current implementation: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx:13-68`
