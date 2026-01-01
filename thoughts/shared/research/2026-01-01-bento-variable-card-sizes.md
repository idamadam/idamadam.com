---
date: 2026-01-01T23:07:26+11:00
git_commit: 81547768c454dd829d24c3795d36094587268540
branch: change-colours
repository: idamadam.com
topic: "Handling vignettes of different sizes in bento grid layout"
tags: [research, ux-patterns, bento-grid, visual-hierarchy, layout]
status: complete
last_updated: 2026-01-01
last_updated_by: claude
---

# Research: Variable Card Sizes in Bento Layouts

How to make vignettes of naturally different sizes look intentional and cohesive rather than chaotic in a bento grid.

## Recommendation

**Embrace the size variation as intentional hierarchy, not a problem to solve.** Apple's bento grids use varying box sizes to signal importance ("big box = big deal"). Your larger vignettes (AI Highlights, Multilingual) are complex because they're showcasing richer interactions—that's a feature. Use `align-items: start` so cards have natural heights, maintain consistent gaps (24-32px), and group the smaller cards together so they feel like a deliberate cluster rather than orphaned elements.

## Quick Comparison

| Option | Effort | Visual Impact | Risk | Verdict |
|--------|--------|---------------|------|---------|
| A: Natural heights + strategic grouping | 1-2h | High | Low | **Recommended** |
| B: Fixed aspect ratios per size class | 3-4h | Medium | Medium | Good fallback |
| C: Equal height rows | 1h | Low | High | Fights content nature |

## Constraints Considered

- **Stack**: CSS Grid with Tailwind, Framer Motion animations
- **Content reality**: 5 vignettes with genuinely different complexity levels
- **Priority**: Dynamic modern feel, not uniformity

## Option A: Natural Heights + Strategic Grouping (Recommended)

### Why this works
Apple averages 6-9 boxes per bento slide, using size to signal importance. Your 5 vignettes fit this perfectly. The key is making size differences feel *designed* rather than accidental by:
1. Using `align-items: start` so cards don't awkwardly stretch
2. Grouping smaller cards together (they become a visual unit)
3. Keeping gaps consistent (uniform 24px or 32px)

### Implementation sketch

```tsx
// SelectedWorkSection.tsx
<div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 lg:gap-8 items-start">
  {/* Featured row: 2 medium cards stacked left, 1 tall card right */}
  <div className="col-span-12 md:col-span-6 space-y-6 lg:space-y-8">
    <AIHighlightsVignette />
    <AISuggestionsVignette />
  </div>
  <div className="col-span-12 md:col-span-6">
    <PrototypingVignette />
  </div>

  {/* Large workflow vignettes */}
  <div className="col-span-12 lg:col-span-8">
    <MultilingualVignette />
  </div>
  <div className="col-span-12 lg:col-span-8 lg:col-start-5">
    <HomeConnectVignette />
  </div>
</div>
```

### Key CSS change
Add `items-start` to the grid container:
```css
.bento-grid {
  align-items: start; /* Cards keep natural heights */
}
```

### Gotchas
- Without `items-start`, CSS Grid stretches cards to match row height (often undesirable)
- The stacked cards need their own gap (use `space-y-6` or `space-y-8` to match grid gap)
- On mobile, natural stacking works fine—grid becomes single column

## Option B: Fixed Aspect Ratios Per Size Class

### Why it could work
Force cards into defined size buckets (small, medium, large) with aspect-ratio constraints. Creates visual rhythm but may clip content.

### Implementation sketch
```tsx
// Size variants
const sizeClasses = {
  small: 'aspect-[4/3]',      // 1.33:1
  medium: 'aspect-[3/2]',     // 1.5:1
  large: 'aspect-[16/9]',     // 1.78:1
  featured: 'aspect-[2/1]',   // 2:1
};

<div className={`${sizeClasses.medium} overflow-hidden`}>
  <VignetteContainer>...</VignetteContainer>
</div>
```

### Gotchas
- Content may get clipped or need scrolling
- Harder to maintain across breakpoints
- Fights against natural content sizing

## What I Ruled Out

- **Equal height rows (`grid-auto-rows: 1fr`)**: Forces all cards to match tallest in row—creates awkward whitespace in shorter cards
- **True masonry (CSS columns)**: Loses control over card order and featured placement
- **JavaScript-based masonry**: Overkill for 5 static cards, adds complexity

## Key Principles from Research

1. **Size signals importance**: "Larger tiles highlight priority content, while smaller ones complement them—guiding the user's attention smoothly" ([Galaxy UX](https://www.galaxyux.studio/bento-grids-the-new-standard-for-modular-ui-design/))

2. **Consistent gaps are essential**: "Maintaining consistent margins and padding between modules is crucial for creating a visually appealing Bento Grid" ([Mockplus](https://www.mockplus.com/blog/post/bento-box-design))

3. **Limit compartments**: "Limit each grid section to 4-8 compartments to avoid overwhelming users" ([OneCodSoft](https://www.onecodesoft.com/blogs/the-bento-box-effect-why-modular-grids-dominate-2025-design))

4. **Group related content**: "Group related content in a section to facilitate quick access" ([Mockplus](https://www.mockplus.com/blog/post/bento-box-design))

## Sources

- [Mockplus: 20 Inspiring Bento Box Design Examples](https://www.mockplus.com/blog/post/bento-box-design) - Comprehensive best practices for visual hierarchy
- [Medium: Apple's Bento Grid Secret](https://medium.com/@jefyjery10/apples-bento-grid-secret-how-a-lunchbox-layout-sells-premium-tech-7c118ce898aa) - How Apple uses size variation intentionally
- [Galaxy UX: Bento Grids Standard](https://www.galaxyux.studio/bento-grids-the-new-standard-for-modular-ui-design/) - Visual hierarchy with different sizes
- [MDN: CSS Grid Alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Box_alignment) - Technical reference for align-items
- [Modern CSS: Equal Height Elements](https://moderncss.dev/equal-height-elements-flexbox-vs-grid/) - When to use vs avoid equal heights
