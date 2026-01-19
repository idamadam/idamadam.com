---
date: 2026-01-20T08:00:02+11:00
git_commit: 66c7b68ab33bde8e8688d79a4f14223b84be0e63
branch: address-feedback
repository: idamadam.com
topic: "Left panel typography consolidation"
tags: [research, ux-patterns, typography, vignettes]
status: complete
last_updated: 2026-01-20
last_updated_by: claude
---

# Research: Left Panel Typography Consolidation

The left side of vignettes has 7 different font sizes, creating a subtle but perceivable inconsistency. The question: how to consolidate toward a cleaner type scale?

## Recommendation

**Merge process notes into body text (16px instead of 15px).** The 16px → 15px → 13px progression is too subtle—three sizes within 3px creates visual noise rather than hierarchy. Consolidating to 16px → 13px gives clear contrast. This is a single-line change in `ProcessNotes.tsx` with high impact.

## Quick Comparison

| Option | Effort | Risk | Verdict |
|--------|--------|------|---------|
| A: Merge process notes to body | 1 min | None | **Recommended** |
| B: Create semantic type classes | 1-2h | Low | Nice cleanup, not urgent |
| C: Full type scale audit | 4-6h | Medium | Overkill for this issue |

## Constraints Considered

- **Stack**: Tailwind CSS 4, existing type system in globals.css
- **Existing patterns**: `type-body` (16px), `type-body-sm` (15px), `type-caption` (13px)
- **Priority**: Fix the "feels off" perception with minimal change

## Current State

| Element | Size | Source | Keep? |
|---------|------|--------|-------|
| Hero name | 72px | `type-pixel` | Yes (special) |
| Vignette headline | 28px | `type-h2` | Yes |
| Intro paragraph | 22px | Custom | Yes (lead text) |
| Hero role | 18px | Custom | Yes (distinct role) |
| Body text | 16px | `type-body` | Yes |
| Process notes | 15px | `type-body-sm` | **Change to 16px** |
| Project name | 13px | Custom | Yes |

## Option A: Merge Process Notes to Body (Recommended)

### Why this works
The 1px difference between body (16px) and process notes (15px) serves no semantic purpose—both are supporting content. Consolidating creates clearer hierarchy: headline → body → small text.

### Implementation
```tsx
// ProcessNotes.tsx line 13
// Before:
<span className="type-body-sm text-primary">{note}</span>

// After:
<span className="type-body text-primary">{note}</span>
```

### Result
Vignette left panel goes from 4 sizes to 3:
- 28px: Headline
- 16px: Body + Process notes
- 13px: Project name

### Gotchas
- None. The 1px change won't affect layout or readability.

## Option B: Create Semantic Type Classes

### Why this might help
Replace custom `text-[13px]` with a named class like `type-meta` for project names. Creates consistency and documents intent.

### Implementation
```css
/* globals.css */
.type-meta {
  font-size: 0.8125rem; /* 13px */
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--primary);
}
```

Then update all 6 TextPanel components to use `type-meta` instead of `text-[13px] font-medium tracking-tight text-primary`.

### Gotchas
- More files to touch (6 TextPanel components)
- `type-caption` already exists at 13px but has `color: var(--tertiary)` baked in

## What I Ruled Out

- **Changing intro paragraph (22px)**: It's intentionally larger as lead text—a common pattern
- **Changing hero role (18px)**: Distinct from body, serves its purpose
- **Using a strict mathematical ratio**: Your scale already works; the issue is the subtle 15px step, not the overall ratio
- **Full type system overhaul**: Overkill for fixing one perceivable issue

## Sources

- [Learn UI Design - Font Size Guidelines](https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html) - "Even the most interaction-heavy pages can typically look just fine with about 4 font sizes total"
- [Cieden - Type Scale Ratios](https://cieden.com/book/sub-atomic/typography/different-type-scale-types) - Ratio recommendations by use case
- [GOV.UK Design System - Type Scale](https://design-system.service.gov.uk/styles/type-scale/) - Recent updates on type scale for readability
- [EightShapes - Typography in Design Systems](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e) - Practical guidance on type hierarchies
