---
date: 2026-01-06T21:31:25+11:00
git_commit: 988937f2f5501715cd3da0a86410cc468e8969c0
branch: claude/improve-button-visibility-rf4XF
repository: idamadam.com
topic: "Vignette split layout - text, panel, and button placement feeling awkward"
tags: [research, ux-patterns, vignette-layout, split-column, content-hierarchy]
status: complete
last_updated: 2026-01-06
last_updated_by: claude
---

# Research: Vignette Split Layout Improvements

The current `VignetteSplit` layout uses a two-column grid with text on the left (320-360px) and an interactive panel on the right. The text column contains only a small `StageIndicator` (Problem/Solution pills) and the title - but no description or context. The buttons appear separately via `VignetteStaged`. This creates visual imbalance and awkward placement.

## Recommendation

**Go with Option A: Add description + anchor buttons to left column.** The current layout is starved for content on the left side - it only has a stage indicator and title, leaving significant empty vertical space that makes the two-column layout feel unbalanced. By adding a brief description paragraph and moving the primary CTA button into the left column (below the description), you create a proper content hierarchy: stage indicator → title → description → action. This matches how best-in-class products like Linear, Stripe, and Vercel structure their split layouts. The right panel then becomes purely visual/interactive without needing to handle content flow. Implementation is straightforward since `VignetteSplit` already accepts `actions` as a prop - you just need to populate it and add description content.

## Quick Comparison

| Option | Complexity | Matches Patterns | Impact | Verdict |
|--------|------------|------------------|--------|---------|
| A: Add description + button to left | Low (2-3h) | Strong | High | **Recommended** |
| B: Increase left column width | Low (1h) | Weak | Medium | Quick fallback |
| C: Stack layout (full-width) | Medium (4-5h) | Mixed | High | Major change |

## Constraints Considered

- **Stack**: React, Framer Motion, Tailwind CSS 4
- **Existing patterns**: `VignetteSplit` accepts `title` and `actions` props; `VignetteStaged` handles buttons separately
- **Priority**: Balance and visual polish without major restructuring

---

## Option A: Add Description + Anchor Buttons to Left Column (Recommended)

### Why this works

Best-in-class product pages (Stripe, Linear, Vercel) consistently pair headlines with supporting copy and CTAs on the left, creating a complete content block that guides users through: **what it is → why it matters → what to do**. Your current layout skips the "why it matters" step, making the left column feel incomplete. The 320-360px width is actually standard for this pattern - the problem isn't the width, it's the content density.

### Implementation sketch

```tsx
// content.ts - add description to stage content
export const aiHighlightsContent = {
  stages: {
    problem: {
      title: "Feedback gets scattered across...",
      description: "Managers spend hours hunting through emails, docs, and Slack to piece together context before writing reviews.",
      cta: "See the solution"
    },
    solution: {
      title: "AI-powered summaries surface key moments",
      description: "One click surfaces relevant highlights with source attribution, cutting prep time by 60%.",
      cta: "View design notes"
    }
  }
}

// VignetteSplit usage - populate both title and actions
<VignetteSplit
  title={
    <div className="space-y-4">
      <StageIndicator stage={stage} onStageChange={setStage} />
      <AnimatedStageText stage={stage} text={title} />
      <p className="type-body text-secondary">{description}</p>
    </div>
  }
  actions={
    <Button onClick={handleAction} variant="primary">
      {currentStageContent.cta}
    </Button>
  }
>
  <Panel ... />
</VignetteSplit>
```

### Content hierarchy (top to bottom)

1. **Stage indicator** (small, muted) - orients user in the flow
2. **Title** (h3, bold) - what this is about
3. **Description** (body, secondary color) - why it matters
4. **CTA button** (primary) - what to do next
5. **Gap** → Panel on right handles visual demo

### Changes needed

1. Add `description` field to `StageContent` type in `types.ts`
2. Add descriptions to each vignette's `content.ts`
3. Update vignette components to pass description in `title` slot
4. Move CTA button from `VignetteStaged` overlay to `VignetteSplit` `actions` prop

### Gotchas

- Ensure button state logic (disabled until solution revealed) still works when moved
- May need to adjust `space-y-4` to `space-y-6` for breathing room
- Mobile: Verify description doesn't make left column too tall before panel

---

## Option B: Increase Left Column Width

### Why this might help

A wider left column (400-450px instead of 320-360px) gives more breathing room for the existing title text. However, this treats a symptom (awkward spacing) rather than the cause (insufficient content).

### Implementation sketch

```tsx
// VignetteSplit.tsx - adjust grid template
const gridClass = compact
  ? 'grid grid-cols-1 gap-8'
  : 'grid grid-cols-1 xl:grid-cols-[400px_1fr] 2xl:grid-cols-[450px_1fr] gap-8 xl:gap-16 xl:items-start';
//                        ^^^^ wider     ^^^^^ wider         ^^^^^^ changed from items-center
```

### Changes needed

1. Update grid column widths in `VignetteSplit`
2. Consider `items-start` instead of `items-center` for better vertical alignment

### Gotchas

- Wider left column means narrower panel - might cramp interactive demos
- Still doesn't address the "empty space" feeling if content stays sparse
- May require panel width adjustments across all vignettes

---

## Option C: Full-Width Stacked Layout

### Why this might work

Some portfolios (like Gina's mentioned in research) use full-width sections where text appears above the interactive panel. This eliminates the left-right balance issue entirely.

### Implementation sketch

```tsx
// New VignetteStacked component
<VignetteContainer>
  <div className="space-y-8">
    {/* Full-width header */}
    <div className="max-w-2xl space-y-4">
      <StageIndicator ... />
      <h3 className="type-h3">{title}</h3>
      <p className="type-body text-secondary">{description}</p>
      <Button>{cta}</Button>
    </div>

    {/* Full-width panel below */}
    <div className="w-full">
      <Panel ... />
    </div>
  </div>
</VignetteContainer>
```

### Gotchas

- Major layout change affecting all vignettes
- Loses the "text-beside-demo" effect that works well for interactive content
- Panels would need to be redesigned for full-width presentation
- Significantly increases page height (worse scroll experience)

---

## What I Ruled Out

- **Asymmetric grids (60/40, 40/60)**: The current column sizes are fine - the issue is content density, not proportions
- **Floating/sticky text column**: Adds complexity without solving the core issue
- **Card-within-card nesting**: Overcomplicates the visual hierarchy
- **Removing the split layout entirely**: The two-column pattern is effective for interactive demos - just needs content

---

## Sources

- [Evil Martians: 100 Dev Tool Landing Pages Study](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025) - Hero visual options and CTA best practices
- [LogRocket: Hero Section Examples](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/) - Split-column layout analysis
- [Linear Design: Landing Page Layout](https://lineardesign.com/blog/landing-page-layout/) - Ideal landing page structure
- [Eleken: Card UI Examples](https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners) - Visual hierarchy and spacing
- [UX Collective: Card Design Best Practices](https://uxdesign.cc/8-best-practices-for-ui-card-design-898f45bb60cc) - Content hierarchy within cards
- [Cieden: Spacing Best Practices](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices) - 8pt grid and internal/external spacing rules
- [Ramotion: Alignment in Web Design](https://www.ramotion.com/blog/alignment-in-web-design/) - Text alignment and button positioning
- [Webflow: UX Portfolio Examples](https://webflow.com/blog/ux-designer-portfolio) - Interactive demo patterns in portfolios
