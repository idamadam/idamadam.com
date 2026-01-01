---
date: 2026-01-01T17:41:40+11:00
git_commit: fdbd6bd68d1f8df603d24f7ff9e217a3089551a5
branch: change-colours
repository: idamadam.com
topic: "Reduce visual weight from overused cards"
tags: [research, ux-patterns, card-design, visual-hierarchy]
status: complete
last_updated: 2026-01-01
last_updated_by: claude
---

# Research: Reduce Card Visual Weight

The portfolio page feels heavy due to ~35+ card-like elements with 5-6 levels of nesting. Every vignette uses the same `.card-elevated` treatment (white bg + border + triple-layer shadow), and internal cards repeat borders and shadows.

## Recommendation

**Strip borders and shadows from internal elements. Reserve visual decoration for vignette containers only. Use whitespace and background contrast for internal hierarchy.**

The current approach treats every nested container with equal importance. This flattens hierarchy and creates visual noise. By removing borders/shadows from problem cards, feed cards, and solution panels—and relying on spacing plus background contrast—you'll reduce clutter while maintaining clear grouping.

## Quick Comparison

| Option | Effort | Uses Existing | Risk | Verdict |
|--------|--------|---------------|------|---------|
| A: Strip internal decoration | 3-4h | bg-background-subtle ✓ | Low | **Recommended** |
| B: Reduce shadow layers | 1-2h | CSS vars ✓ | Low | Quick win, partial fix |
| C: Borderless vignettes | 4-5h | New approach | Med | More dramatic change |

## Constraints Considered

- **Stack**: Tailwind CSS 4, semantic CSS variables already defined
- **Existing patterns**: `bg-background-subtle` and `bg-background-elevated` already create contrast
- **Priority**: Simplify without losing interaction depth or scannability

## Option A: Strip Internal Decoration (Recommended)

### Why this works

The page already has three background levels: page (`--background`), vignette (`--background-elevated`), and subtle (`--background-subtle`). These create sufficient contrast without needing borders. Refactoring UI recommends using "contrasting background colors or simply adding more space" instead of borders.

### Implementation sketch

```css
/* Current internal cards */
.problem-card {
  bg-background-elevated px-4 py-3 rounded-lg shadow-sm border border-border
}

/* Simplified */
.problem-card {
  bg-background-elevated px-4 py-3 rounded-lg
  /* No border, no shadow - relies on bg contrast with container */
}
```

```tsx
/* Current: Every level has decoration */
<VignetteContainer>           {/* border + shadow */}
  <div bg-background-subtle>  {/* dashed border */}
    <Card border shadow-sm>   {/* border + shadow */}
    </Card>
  </div>
</VignetteContainer>

/* Simplified: Only container has decoration */
<VignetteContainer>           {/* border + subtle shadow */}
  <div>                       {/* whitespace only */}
    <Card bg-background-elevated rounded-lg>
      {/* no border, no shadow */}
    </Card>
  </div>
</VignetteContainer>
```

### Changes by file

1. **globals.css**: Simplify `.card-elevated` shadow from triple-layer to single subtle shadow
2. **HighlightsPanel.tsx**: Remove `border border-border shadow-sm` from problem cards
3. **SuggestionsPanel.tsx**: Remove borders from floating cards
4. **SandboxPanel.tsx**: Remove borders from question cards
5. **HomeConnectPanel.tsx**: Remove `shadow-md` from feed cards, keep rounded corners
6. **ProblemPanel.tsx** (all vignettes): Remove `border-2 border-dashed` from containers

### Gotchas

- Problem cards rely on scattered positioning—without shadows, depth perception may decrease (mitigate with slight scale differences or z-index stacking)
- AI solution panels use gradient borders as feature indicators—may want to keep these for emphasis
- Test on both light and dark mode if dark mode support is planned

## Option B: Reduce Shadow Layers

### Why this works

Quick win—modify `.card-elevated` in one place to reduce visual weight across all vignettes. Less dramatic change, easier to roll back.

### Implementation sketch

```css
/* Current */
.card-elevated {
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.03),      /* outline */
    0 4px 24px rgba(0, 0, 0, 0.08),     /* drop shadow */
    inset 0 1px 0 rgba(255, 255, 255, 0.8);  /* inset highlight */
}

/* Simplified */
.card-elevated {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);  /* single subtle shadow */
}
```

### Gotchas

- Only addresses vignette-level weight, not internal nesting
- Keeps borders on internal cards

## What I Ruled Out

- **Remove vignette containers entirely**: Loses the visual cohesion and scannability of the page
- **Increase spacing between vignettes**: Already generous (gap-8/10), more would break the grid
- **Use dividers instead of cards**: Doesn't fit the "vignette as self-contained module" pattern

## Sources

- [Refactoring UI](https://www.refactoringui.com/) - "Use fewer borders... try shadows, contrasting background colors, or more space"
- [Shopify Polaris Card Layout](https://polaris-react.shopify.com/patterns/card-layout) - Spacing hierarchy principle (deeper = smaller padding)
- [8 Best Practices for UI Card Design](https://uxdesign.cc/8-best-practices-for-ui-card-design-898f45bb60cc) - "Borders cause unnecessary visual noise"
- [Apple HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials) - "Deference" principle—minimize visual clutter
- [Material Design Elevation](https://m2.material.io/design/environment/elevation.html) - Coplanar surfaces = equal importance
- [LogRocket Shadows in UI Design](https://blog.logrocket.com/ux-design/shadows-ui-design-tips-best-practices/) - Remove shadows from less important elements
