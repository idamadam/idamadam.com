# Annotation Viewport Collision Detection Implementation Plan

## Overview

Add CSS `position-try-fallbacks` to existing anchor positioning to enable native browser collision detection for redline annotations. When annotations would clip at viewport edges, they automatically flip to an alternative position. This is a CSS-only change that progressively enhances the current behavior.

## Current State Analysis

### Existing Implementation
- **File**: `src/components/vignettes/ai-highlights/design-notes.css`
- **Approach**: CSS Anchor Positioning API with `anchor()` functions
- **Position variants**: right, left, top, bottom (lines 14-36)
- **Problem**: No collision detection - annotations clip at viewport edges on smaller screens

### Key Discoveries
- Only AI Highlights vignette uses redline annotations (`AIHighlightsVignette.tsx:18`)
- Annotation label boxes have `min-w-[230px]` (`RedlineOverlay.tsx:89`)
- Existing `@supports` fallback for browsers without anchor positioning (lines 38-46)
- Mobile has separate handling via `MobileRedlineTour` - this change only affects desktop

## Desired End State

After implementation:
1. Right-side annotations flip to left when approaching right viewport edge
2. Left-side annotations flip to right when approaching left viewport edge
3. Top/bottom variants shift or flip when approaching top/bottom edges
4. Browsers without `position-try-fallbacks` support see current behavior (acceptable degradation)
5. No changes to existing animation behavior or visual design

### Verification
- Resize browser to 1024px width - right annotations should flip to left or stay visible
- Test on Chrome 125+, Safari 26+, Firefox 147+ for full behavior
- Test on older browsers to confirm graceful degradation

## What We're NOT Doing

- Changing the annotation visual design (dot, connector line, label box)
- Modifying mobile behavior (MobileRedlineTour remains unchanged)
- Adding JavaScript-based collision detection
- Replacing CSS Anchor Positioning with another library
- Adding indicator dots when annotations are hidden (separate feature)

## Implementation Approach

Use CSS `position-try-fallbacks` with built-in flip tactics (`flip-inline`, `flip-block`) to let the browser automatically reposition annotations when they'd overflow the viewport. Define custom `@position-try` rules for more control over fallback positions.

---

## Phase 1: Add Position Try Fallbacks to CSS

### Overview
Add `position-try-fallbacks` property to existing `.design-note` position variants, enabling automatic flipping when annotations would clip.

### Changes Required:

#### 1. Update design-notes.css
**File**: `src/components/vignettes/ai-highlights/design-notes.css`

Replace the position variants section (lines 13-36) with collision-aware versions:

```css
/* Position variants - annotation appears on this side of the anchor */
/* With position-try-fallbacks for viewport collision detection */

.design-note[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;
  /* Flip to left side if right side clips */
  position-try-fallbacks: flip-inline;
}

.design-note[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -16px -50%;
  /* Flip to right side if left side clips */
  position-try-fallbacks: flip-inline;
}

.design-note[data-position="top"] {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -16px;
  /* Flip to bottom if top clips */
  position-try-fallbacks: flip-block;
}

.design-note[data-position="bottom"] {
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 16px;
  /* Flip to top if bottom clips */
  position-try-fallbacks: flip-block;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] No CSS syntax errors
- [ ] No TypeScript errors

#### Manual Verification:
- [ ] On Chrome 125+: Annotations flip when resizing viewport to 1024px
- [ ] On older browsers: Annotations render in original positions (no errors)
- [ ] Animation behavior unchanged when annotations appear/disappear

---

## Phase 2: Add Custom Fallback Positions (Optional Enhancement)

### Overview
Add custom `@position-try` rules for finer control over fallback positions, including the ability to adjust annotation width when flipped.

### Changes Required:

#### 1. Add @position-try rules to design-notes.css
**File**: `src/components/vignettes/ai-highlights/design-notes.css`

Add after the position variants section:

```css
/* Custom fallback positions for more control */
@position-try --flip-to-left {
  right: anchor(left);
  top: anchor(center);
  translate: -16px -50%;
}

@position-try --flip-to-right {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;
}

@position-try --flip-to-top {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -16px;
}

@position-try --flip-to-bottom {
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 16px;
}
```

#### 2. Update position variants to use custom fallbacks with multiple options
```css
.design-note[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 16px -50%;
  /* Try flipping inline first, then try top/bottom */
  position-try-fallbacks:
    flip-inline,
    --flip-to-top,
    --flip-to-bottom;
}

.design-note[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -16px -50%;
  position-try-fallbacks:
    flip-inline,
    --flip-to-top,
    --flip-to-bottom;
}
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] No CSS syntax errors

#### Manual Verification:
- [ ] Annotations try multiple positions before giving up
- [ ] Flipped annotations still look correct visually
- [ ] No janky position jumping during animations

---

## Phase 3: Reduce Annotation Width for Better Fit

### Overview
Optionally reduce annotation width to make them less likely to clip, especially when flipped.

### Changes Required:

#### 1. Update RedlineOverlay label box width
**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`

Change the label box class (line 89):

```tsx
// From:
className="rounded-xl px-3 py-2 shadow-sm min-w-[230px] bg-white"

// To (optional - only if needed after testing Phase 1):
className="rounded-xl px-3 py-2 shadow-sm min-w-[180px] max-w-[220px] bg-white"
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`

#### Manual Verification:
- [ ] Annotation text still readable without excessive wrapping
- [ ] Annotations fit better on narrow viewports
- [ ] Visual appearance still polished

---

## Testing Strategy

### Browser Testing Matrix

| Browser | Version | Expected Behavior |
|---------|---------|-------------------|
| Chrome | 125+ | Full flip behavior |
| Safari | 26+ | Full flip behavior |
| Firefox | 147+ | Full flip behavior |
| Older browsers | Any | Graceful degradation (current behavior) |

### Manual Testing Steps

1. **Desktop (Chrome 125+)**:
   - Navigate to AI Highlights vignette
   - Click through to solution stage
   - Click "Show design details"
   - Resize browser window to 1024px width
   - Verify right-side annotations flip to left (or stay visible)

2. **Cross-browser verification**:
   - Repeat above in Safari 26+ and Firefox 147+
   - Test in older browser to confirm no errors

3. **Animation verification**:
   - Toggle redline mode on/off multiple times
   - Verify animations still work correctly after flip
   - Check hover states on flipped annotations

### Edge Cases
- Annotation near corner (both horizontal and vertical edges)
- Multiple annotations that might collide after flipping
- Very narrow viewport (< 1024px) - should use mobile mode instead

## Performance Considerations

- `position-try-fallbacks` is handled by the browser's layout engine - no JavaScript cost
- No impact on animation performance
- No additional DOM elements or complexity

## References

- Research document: `thoughts/shared/research/2025-12-18-annotation-viewport-collision-patterns.md`
- [MDN: position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks)
- [CSS-Tricks: CSS Anchor Positioning Guide](https://css-tricks.com/css-anchor-positioning-guide/)
- Current implementation: `src/components/vignettes/ai-highlights/design-notes.css`
