---
date: 2026-01-05T07:23:46+11:00
git_commit: d9b53bfe36ac9b9dd48d2fd4d6f4beb9e8264ea4
branch: visual-improvements
repository: visual-improvements
topic: "Visual patterns for distinguishing problem state containers"
tags: [research, ux-patterns, vignettes, containers, visual-hierarchy]
status: complete
last_updated: 2026-01-05
last_updated_by: claude
---

# Research: Problem State Container Visual Patterns

How to visually distinguish "problem state" containers in a portfolio's problem → solution flow, without using filled backgrounds (gray looked wireframey, blue tint didn't complement the page).

## Recommendation

**Remove the background fill entirely and use a subtle inset shadow** to create a recessed "well" effect. This signals "before/incomplete" semantically through depth rather than color, avoids the wireframe aesthetic, and leverages the existing strong card borders for contrast. The inset shadow creates visual separation without competing with the page's gradient background.

## Quick Comparison

| Option | Effort | Uses Existing | Risk | Verdict |
|--------|--------|---------------|------|---------|
| A: Inset shadow well | 0.5h | Tailwind ✓ | Low | **Recommended** |
| B: Remove container | 0.5h | ✓ | Med | Good fallback |
| C: Border-only (no fill) | 0.5h | ✓ | Low | Conservative option |

## Constraints Considered

- **Stack**: Tailwind CSS 4, Framer Motion, semantic design tokens
- **Existing patterns**: `card-elevated` glassmorphism class, `shadow-*` tokens defined
- **Priority**: Complement page gradient, avoid wireframe look, maintain problem/solution distinction
- **Already tried**: `bg-neutral-200` (too gray), `bg-accent-50` (clashed with page)

## Option A: Inset Shadow Well (Recommended)

### Why this works
Inset shadows create a "pressed in" or recessed appearance that semantically signals "before" or "incomplete" without needing a background color. This technique is commonly used for input fields and container wells. The effect is subtle and won't compete with the page's gradient background.

### Implementation sketch
```tsx
// Replace current container classes
<div className="relative bg-transparent border border-border-strong rounded-lg
  shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]
  min-h-[300px] flex flex-col items-center justify-center p-4">
```

Or with a slightly more pronounced effect:
```tsx
shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),inset_0_4px_8px_rgba(0,0,0,0.04)]
```

### Gotchas
- Inset shadows can cause performance issues if overused with animations
- Effect is very subtle - may need tuning per container size
- Combine with `border-border-strong` (not dashed) to avoid wireframe association

## Option B: Remove Container Entirely

### Why this works
Let the scattered/stacked cards float directly on the page background. The cards themselves (with their `border-border-strong`) provide enough visual structure. The "problem" state is communicated through the chaotic arrangement, not a container.

### Implementation sketch
```tsx
// Remove the outer container, just render cards with positioning
<div className="relative min-h-[300px] flex flex-col items-center justify-center p-4">
  {/* Cards render here with their existing borders */}
</div>
```

### Gotchas
- Loses the visual boundary that groups problem elements together
- May make the problem → solution transition less clear
- Works better if cards have strong individual presence

## Option C: Border-Only (No Fill)

### Why this works
Keep the border as a light boundary but remove the background fill. Use a solid border instead of dashed to reduce the "placeholder" association. The cards' white backgrounds provide contrast against the page gradient naturally.

### Implementation sketch
```tsx
<div className="relative bg-transparent border border-border rounded-lg
  min-h-[300px] flex flex-col items-center justify-center p-4">
```

### Gotchas
- Very subtle - may not provide enough distinction
- Solid border loses the "incomplete/fragmented" semantic that dashed provided

## What I Ruled Out

- **Neumorphism**: Too trendy/dated, requires specific background colors to work
- **Gradient fills**: Already have page gradient, would compete
- **Colored borders**: Would add accent color where problem state should feel neutral
- **Pattern backgrounds (dots, grids)**: High visual noise, looks busy

## Sources

- [Smashing Magazine: CSS Shadows](https://www.smashingmagazine.com/2023/08/interesting-ways-use-css-shadows/) - Creative shadow uses beyond depth
- [Tailwind CSS box-shadow](https://tailwindcss.com/docs/box-shadow) - Inset shadow utilities
- [Adobe: Dashed and Dotted Lines](https://blog.adobe.com/en/publish/2018/08/07/different-strokes-best-practices-for-designing-dashed-and-dotted-lines) - Dashed lines signify placeholder/incomplete content
- [GitHub Primer Empty States](https://primer.style/ui-patterns/empty-states/) - Border is optional, invisible by default
- [Vercel Geist Colors](https://vercel.com/geist/colors) - Background differentiation through subtle levels
- [NN/g Empty States](https://www.nngroup.com/articles/empty-state-interface-design/) - Empty state design guidelines
