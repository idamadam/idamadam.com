---
date: 2026-01-01T22:25:55+11:00
git_commit: 81547768c454dd829d24c3795d36094587268540
branch: change-colours
repository: idamadam.com
topic: "Full-width bento/masonry layout for portfolio homepage"
tags: [research, ux-patterns, layout, bento-grid, masonry]
status: complete
last_updated: 2026-01-01
last_updated_by: claude
---

# Research: Full-Width Bento/Masonry Layout

Converting the portfolio homepage from a centered `max-w-6xl` (1024px) layout to a full-width bento-style grid for a more dynamic, modern feel.

## Recommendation

**Use a 12-column CSS Grid bento layout with Tailwind classes directly** (no custom CSS). This gives you explicit control over card sizing while keeping implementation simple. Featured vignettes span 12 columns, large vignettes span 8, and medium vignettes span 6. Increase max-width to 1600px and add scaled edge padding (`2xl:px-24`) to utilize wide screens without going edge-to-edge.

## Quick Comparison

| Option | A11y | Uses Existing | Effort | Verdict |
|--------|------|---------------|--------|---------|
| A: 12-col Bento Grid | ✓ | Tailwind Grid ✓ | 2-3h | **Recommended** |
| B: CSS Columns Masonry | ✓ | Tailwind Columns ✓ | 2h | Too unpredictable for interactive vignettes |
| C: CSS Grid + Custom Classes | ✓ | Needs new CSS | 3-4h | Over-engineered for 5 vignettes |

## Constraints Considered

- **Stack**: Next.js 16, React 19, Tailwind 4, Framer Motion 12
- **Existing patterns**: VignetteContainer (fluid), VignetteSplit (fixed left col), scroll-triggered fadeInUp
- **Priority**: Dynamic feel, open to vignette adjustments, keep mobile single-column

## Option A: 12-Column Bento Grid (Recommended)

### Why this works
Bento grids are the dominant trend for 2025 portfolios. They create visual hierarchy through card sizing while maintaining a clean, organized structure. The 12-column system maps perfectly to your 5 vignettes: 1 featured (12 cols), 2 medium (6 cols each), 2 large (8 cols).

### Proposed vignette sizing

| Vignette | Size | Columns | Rationale |
|----------|------|---------|-----------|
| AIHighlightsVignette | Featured | 12 | Lead vignette, rich 2-col interaction |
| AISuggestionsVignette | Medium | 6 | Compact mode, stacks vertically |
| PrototypingVignette | Medium | 6 | Compact mode, stacks vertically |
| MultilingualVignette | Large | 8 | Complex workflow needs horizontal space |
| HomeConnectVignette | Large | 8 | Complex workflow, offset for asymmetry |

### Implementation sketch

```tsx
// SelectedWorkSection.tsx
<section className="w-full pb-16 lg:pb-24 px-6 lg:px-12 2xl:px-24">
  <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 lg:gap-8">
    {/* Featured */}
    <div className="col-span-12">
      <AIHighlightsVignette />
    </div>

    {/* Row 2: Two medium cards */}
    <div className="col-span-12 md:col-span-6">
      <AISuggestionsVignette />
    </div>
    <div className="col-span-12 md:col-span-6">
      <PrototypingVignette />
    </div>

    {/* Row 3: Large card, left-aligned */}
    <div className="col-span-12 lg:col-span-8">
      <MultilingualVignette />
    </div>

    {/* Row 4: Large card, right-aligned for asymmetry */}
    <div className="col-span-12 lg:col-span-8 lg:col-start-5">
      <HomeConnectVignette />
    </div>
  </div>
</section>
```

### Gotchas
- VignetteSplit's fixed 320-360px left column may feel cramped at 8 columns on 1024-1280px screens. Consider adding a `bentoMode` prop that uses narrower left columns (280px) on large cards.
- `allowOverflow` vignettes (AI Highlights, Home Connect) have annotations extending beyond bounds. Test that grid gaps don't clip these.
- At exactly 1024px (lg breakpoint), the 8-column card is ~533px wide. VignetteSplit may need to stack at this width.

## Option B: CSS Columns Masonry

### Why it could work
True Pinterest-style masonry using `columns-2 md:columns-3` with `break-inside: avoid`. Items flow naturally based on height.

### Implementation sketch
```tsx
<div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
  {vignettes.map(v => <div className="break-inside-avoid">{v}</div>)}
</div>
```

### Why I ruled it out
CSS columns order items top-to-bottom, left-to-right. This means AIHighlights (your lead vignette) would appear in the first column, not spanning the full width. You lose control over visual hierarchy and featured placement.

## What I Ruled Out

- **Native CSS Masonry (`grid-template-rows: masonry`)**: Only works in Firefox. Chrome's experimental syntax differs. Not production-ready.
- **JavaScript masonry libraries (Masonry.js, react-masonry-css)**: Adds bundle size and complexity for 5 static vignettes. Overkill.
- **True full-edge-to-edge layout**: Removing all max-width feels too chaotic. The 1600px container with generous padding strikes a better balance.

## Sources

- [Cruip: Masonry Layouts with Tailwind CSS](https://cruip.com/masonry-layouts-with-tailwind-css/) - Clear comparison of CSS columns vs grid approaches with code examples
- [BentoGrids.com](https://bentogrids.com/) - Curated collection of bento designs showing portfolio implementations
- [The Bento Box Effect: Why Modular Grids Dominate 2025](https://www.onecodesoft.com/blogs/the-bento-box-effect-why-modular-grids-dominate-2025-design) - Trend analysis and best practices
- [Mockuuups: Best Bento Grid Examples 2025](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/) - Visual inspiration with sizing patterns
- [CSS-Tricks: Making Masonry Work Today](https://css-tricks.com/making-a-masonry-layout-that-works-today/) - Technical deep-dive on browser support
