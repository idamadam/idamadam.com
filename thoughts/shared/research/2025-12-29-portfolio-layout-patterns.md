---
date: 2025-12-29T23:58:45+11:00
git_commit: 6358210725b49e7c1e29c9d41d365fd1dfae2dfd
branch: small-fixes
repository: idamadam.com
topic: "Portfolio layout patterns beyond single column"
tags: [research, ux-patterns, layout, homepage, vignettes]
status: complete
last_updated: 2025-12-29
last_updated_by: claude
---

# Research: Portfolio Layout Patterns Beyond Single Column

You're looking to move beyond the traditional single card and column layout for your portfolio site, prioritizing **visual impact** and **content hierarchy**, with mobile responsiveness as a key constraint.

## Recommendation

**Use a Bento Grid layout** with varied card sizes to create visual hierarchy. Your "flagship" vignettes (AI Highlights, AI Suggestions) get 2-column spans, while supporting work uses standard 1-column cards. This creates natural emphasis without overhauling your component system, and collapses gracefully to single-column on mobile.

## Quick Comparison

| Option | Mobile | Uses Existing | Effort | Verdict |
|--------|--------|---------------|--------|---------|
| Bento Grid | ✓ Single-column collapse | VignetteContainer, Framer Motion | 3-4h | **Recommended** |
| Featured Hero + Grid | ✓ Stacks naturally | Minor container tweaks | 2-3h | Quick alternative |
| Asymmetric Split | ⚠️ Needs careful handling | Partial | 6-8h | Skip unless brand fit |

## Constraints Considered

- **Stack**: Next.js 16, Tailwind CSS 4, Framer Motion 12, React 19
- **Existing patterns**: VignetteContainer (rounded cards with shadow), VignetteSplit (two-column), fadeInUp animations
- **Priority**: Visual impact + content hierarchy, must work on mobile
- **Current layout**: max-w-5xl (1024px), space-y-12/14 vertical rhythm

## Option A: Bento Grid (Recommended)

### Why this works
Bento grids create natural visual hierarchy through card size variation. Your most impactful vignettes span two columns, drawing the eye immediately. The grid structure collapses to single-column on mobile without any layout gymnastics. You keep your existing VignetteContainer styling—just wrap them in a CSS Grid parent.

### Implementation sketch
```tsx
// src/app/page.tsx - Vignettes section
<section className="w-full pb-16 lg:pb-24 px-6 lg:px-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
    {/* Featured vignette - spans 2 columns */}
    <div className="lg:col-span-2">
      <AIHighlightsVignette />
    </div>

    {/* Standard vignettes - 1 column each */}
    <AISuggestionsVignette />
    <PrototypingVignette />

    {/* Another featured span */}
    <div className="lg:col-span-2">
      <MultilingualVignette />
    </div>

    <HomeConnectVignette />
    <VibeCodingVignette />
  </div>
</section>
```

### Changes needed
1. **page.tsx**: Replace `space-y-12` container with CSS Grid
2. **VignetteContainer**: May need `h-full` to equalize heights in grid cells
3. **VignetteSplit**: Consider if 2-col span vignettes should have different internal proportions
4. **Max-width**: Bump from `max-w-5xl` to `max-w-6xl` to accommodate grid

### Gotchas
- Vignettes with VignetteSplit (two internal columns) need testing at narrower widths when they're in a 1-col grid cell
- Height equalization—if cards have vastly different content lengths, consider `min-h-[500px]` or similar
- Stagger animations may need adjustment for 2-column reveal timing

## Option B: Featured Hero + Grid

### Why this works
Lead with your strongest vignette at full-width (hero treatment), then show remaining work in a 2-column grid below. Creates clear hierarchy without complex grid spanning.

### Implementation sketch
```tsx
<section>
  {/* Hero - full width, larger scale */}
  <div className="max-w-6xl mx-auto px-6 mb-12">
    <AIHighlightsVignette variant="hero" />
  </div>

  {/* Grid - remaining work */}
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
    <AISuggestionsVignette />
    <PrototypingVignette />
    {/* ... */}
  </div>
</section>
```

### Gotchas
- Need to create a "hero" variant for VignetteContainer/VignetteSplit with larger typography
- Less flexibility than bento for reordering content

## What I Ruled Out

- **Masonry layout**: Accessibility concerns with tab order, and native CSS masonry has poor browser support (Firefox/Safari only). Not worth the tradeoffs for a portfolio.
- **Horizontal scrolling**: Breaks mobile conventions and hides content. Works for timeline-specific use cases but not general portfolio.
- **Asymmetric/scattered layouts**: High visual impact but requires significant custom CSS per section, doesn't reuse your existing component system well, and mobile adaptation is complex.
- **Multi-column CSS**: Great for image galleries but your vignettes are interactive components that shouldn't break across columns.

## Sources

- [BentoGrids.com](https://bentogrids.com) - Curated bento design examples
- [Mockuuups Studio - Best Bento Grid Examples](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/) - Real-world bento implementations
- [One Page Love - Bento Collection](https://onepagelove.com/tag/bento) - 46 bento grid websites with full screenshots
- [Speckyboy - Asymmetrical Split Screens](https://speckyboy.com/asymmetrical-split-screens-web-design/) - Creative split layouts
- [618 Media - Asymmetrical Layouts](https://618media.com/en/blog/asymmetrical-layouts-dynamic-web-design/) - Dynamic asymmetric patterns
- [Smashing Magazine - Native CSS Masonry](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/) - Technical masonry deep-dive
- [Linkero - Website Layout Design Examples](https://linke.ro/blog/website-layout-design-examples) - Grid and hero patterns
