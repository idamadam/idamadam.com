---
date: 2025-12-26T21:47:22+11:00
git_commit: e9953fbc8a0dcec0d1122d98f7ab9cc982602922
branch: main
repository: idamadam.com
topic: "Type Scale and Spacing Scale Consistency Audit"
tags: [research, codebase, typography, spacing, design-system, tailwind]
status: complete
last_updated: 2025-12-26
last_updated_by: claude
last_updated_note: "Added semantic analysis and simplified type scale proposal"
---

# Research: Type Scale and Spacing Scale Consistency Audit

**Date**: 2025-12-26T21:47:22+11:00
**Git Commit**: e9953fbc8a0dcec0d1122d98f7ab9cc982602922
**Branch**: main
**Repository**: idamadam.com

## Research Question

Where are type scale and spacing scale defined in the codebase, and are they being used consistently? What's the gap between what's defined and what's actually used?

## Summary

**The codebase has a well-defined type and spacing scale in `globals.css`, but it's almost entirely unused.** The CSS variables and semantic classes exist but components use hardcoded Tailwind arbitrary values instead.

| What's Defined | Usage |
|----------------|-------|
| Typography CSS vars (`--text-xs` to `--text-4xl`) | Only used within globals.css itself |
| Spacing CSS vars (`--space-xs` to `--space-3xl`) | Only used within globals.css itself |
| Semantic typography classes (`.text-body`, `.text-h1`, etc.) | Only used in archived case studies |
| Hardcoded `text-[...px]` values | **80+ instances across 10 files** |
| Hardcoded spacing `p-[...]`, `gap-[...]` | **24 instances across 4 files** |

## Detailed Findings

### 1. Typography CSS Variables (Defined but Not Used)

**Location**: `src/app/globals.css:31-44`

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

**Usage**: Only consumed within `globals.css` to define semantic classes. No components use `var(--text-...)` directly.

### 2. Spacing CSS Variables (Defined but Not Used)

**Location**: `src/app/globals.css:22-29`

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

**Usage**: Only consumed within `globals.css` for layout utility classes (`.case-study-container`, `.section-spacing`). Note: `--space-xs` and `--space-xl` are defined but never used.

### 3. Semantic Typography Classes (Only in Archives)

**Location**: `src/app/globals.css:152-193`

| Class | Definition | Usage Count |
|-------|------------|-------------|
| `.text-hero` | 2.25rem, weight 700 | 3 (archived only) |
| `.text-h1` | 1.875rem, weight 600 | 2 (archived only) |
| `.text-h2` | 1.5rem, weight 600 | 15 (archived only) |
| `.text-h3` | 1.25rem, weight 600 | 20 (archived only) |
| `.text-body` | 1.125rem, relaxed | 36 (archived only) |
| `.text-body-sm` | 1rem, normal | **0 (never used)** |
| `.text-caption` | 0.875rem, normal | 4 (archived only) |

**Key Finding**: These classes are used **120 times** but exclusively in `archive/2025-case-studies/`. The active vignette components don't use them at all.

### 4. Hardcoded Typography Values (The Actual Problem)

**80+ instances across 10 files** using arbitrary Tailwind values:

| File | Issues | Example Values |
|------|--------|----------------|
| `src/app/page.tsx` | 5 | `text-[clamp(44px,8vw,72px)]`, `text-[18px]` |
| `src/components/SectionHeader.tsx` | 1 | `text-[24px] lg:text-[26px]` |
| `src/components/vignettes/VignetteStaged.tsx` | 2 | `text-[26px] lg:text-[28px]`, `text-[18px]` |
| `src/components/vignettes/VignetteSplit.tsx` | 1 | `text-[26px] lg:text-[28px]` |
| `src/components/vignettes/home-connect/HomeConnectPanel.tsx` | 15 | `text-[11px]` to `text-[22px]` |
| `src/components/vignettes/ai-highlights/HighlightsPanel.tsx` | 40+ | `text-[14px]`, `text-[16px]`, `text-[20px]` |
| `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx` | 4 | `text-[16px]`, `text-[20px]` |
| `src/components/vignettes/multilingual/TranslationManagementPanel.tsx` | 4 | `text-[14px]` |
| `src/components/vignettes/prototyping/SandboxPanel.tsx` | 2 | Various |
| `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx` | 1 | `text-[15px]` |

**Common Hardcoded Sizes Observed**:
- Hero: `clamp(44px, 8vw, 72px)`
- H2: `24px`, `26px`, `28px`
- Body: `18px`, `16px`, `15px`
- Small: `14px`, `13px`, `12px`, `11px`

### 5. Hardcoded Spacing Values

**24 instances across 4 files**:

| File | Issues |
|------|--------|
| `ai-suggestions/SuggestionsPanel.tsx` | `p-[2px]` |
| `ai-highlights/HighlightsPanel.tsx` | `p-[2px]` |
| `prototyping/SandboxPanel.tsx` | `mb-[18px]`, `gap-[18px]` |
| `multilingual/TranslationManagementPanel.tsx` | `px-[10px]`, `py-[6px]`, `py-[8px]`, `px-[14px]` |

## Architecture Insights

### The Gap

```
globals.css defines:     Components actually use:
─────────────────────    ────────────────────────
--text-lg (18px)    →    text-[18px] leading-[1.7]
--text-xl (20px)    →    text-[20px]
--text-sm (14px)    →    text-[14px] leading-[20px]
.text-body          →    (not used in active code)
.text-h2            →    (not used in active code)
```

### Why This Happened

1. **Tailwind v4 Migration**: The `@theme inline` block (lines 57-74) registers colors but not typography or spacing to Tailwind's theme
2. **No Tailwind Integration**: CSS variables aren't accessible as Tailwind utilities (can't write `text-lg-custom`)
3. **Semantic Classes Not Adopted**: The `.text-body`, `.text-h1` classes exist but weren't adopted when building vignettes
4. **Historical Divergence**: Archive case studies use the semantic classes; newer vignettes use arbitrary values

## Recommendations

### Option A: Extend Tailwind Theme (Recommended)

Add typography and spacing to `@theme inline` in globals.css:

```css
@theme inline {
  /* Existing colors... */

  /* Typography */
  --font-size-body: var(--text-lg);
  --font-size-body-sm: var(--text-base);
  --font-size-caption: var(--text-sm);
  --font-size-h1: var(--text-3xl);
  --font-size-h2: var(--text-2xl);
  --font-size-h3: var(--text-xl);

  /* Spacing */
  --spacing-section: var(--space-3xl);
  --spacing-component: var(--space-lg);
  --spacing-element: var(--space-md);
}
```

Then use: `text-body`, `text-h2`, `gap-component`, etc.

### Option B: Component-Level Constants

Create a shared constants file:

```typescript
// src/lib/typography.ts
export const typography = {
  body: "text-lg leading-relaxed",
  bodySm: "text-base leading-normal",
  h2: "text-2xl font-semibold leading-tight tracking-tight",
  // ...
}
```

### Option C: Adopt Existing Semantic Classes

Simply start using the existing `.text-body`, `.text-h1`, etc. classes that are already defined in globals.css.

## Code References

- `src/app/globals.css:22-44` - Scale definitions
- `src/app/globals.css:152-193` - Semantic typography classes
- `src/app/page.tsx:18-53` - Homepage hardcoded values
- `src/components/vignettes/VignetteStaged.tsx:62-66` - Foundation component hardcoded values
- `src/components/vignettes/home-connect/HomeConnectPanel.tsx` - Most hardcoded values (15+)
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx` - Most typography violations (40+)

## Open Questions

1. ~~Should the responsive hero text (`clamp(44px, 8vw, 72px)`) be added to the type scale?~~ Yes, as `display`
2. Is IBM Plex Sans font only for certain text, or should it be integrated into the type scale?
3. ~~Should vignette "internal" typography (simulating UI) follow the scale, or is deviation acceptable for realism?~~ Yes, use the scale

---

## Follow-up: Semantic Analysis & Simplified Type Scale

### Semantic Roles in Current Codebase

Analysis of vignette components revealed typography serves these semantic roles:

| HTML Concept | Current Usage | Size | Where Used |
|--------------|---------------|------|------------|
| `display` | Hero (name) | clamp(44-72px) | `page.tsx` hero only |
| `h2` | Section headers, vignette titles | 24-28px | `SectionHeader`, `VignetteStaged`, `VignetteSplit` |
| `h3` | Panel headings, subheadings | 16px | Panel components |
| `body` | Descriptions, paragraphs | 18px | Vignette descriptions, section intros |
| `body-sm` | Panel content, UI text | 14px | Panel internals, buttons |
| `caption` | Metadata, timestamps | 12px | Feed items, dates |
| `label` | Micro badges, percentages | 11px | Donut charts, tags |

### The Problem with Current Scale

The existing `globals.css` defines an **abstract scale** (`--text-xs` through `--text-4xl`) that mirrors Tailwind's defaults. This doesn't communicate *what* each size is for, leading developers to use arbitrary values instead.

```
Abstract (current):          Semantic (proposed):
─────────────────────        ─────────────────────
--text-xs   (12px)      →    --text-caption
--text-sm   (14px)      →    --text-body-sm
--text-base (16px)      →    --text-h3
--text-lg   (18px)      →    --text-body
--text-xl   (20px)      →    (unused)
--text-2xl  (24px)      →    (merged into h2)
--text-3xl  (30px)      →    (unused)
--text-4xl  (36px)      →    (unused - hero uses clamp)
```

### Proposed Type Scale (7 Sizes)

Replace the abstract scale with semantic names based on HTML/CSS fundamentals:

```css
/* Type Scale - Semantic names */
--text-display: clamp(44px, 8vw, 72px);  /* Hero only */
--text-h2: 1.625rem;                      /* 26px - titles */
--text-h3: 1rem;                          /* 16px - subheadings */
--text-body: 1.125rem;                    /* 18px - readable text */
--text-body-sm: 0.875rem;                 /* 14px - UI text */
--text-caption: 0.75rem;                  /* 12px - metadata */
--text-label: 0.6875rem;                  /* 11px - badges */

/* Line Heights - 3 options */
--leading-tight: 1.15;                    /* Headings */
--leading-normal: 1.5;                    /* UI text */
--leading-relaxed: 1.65;                  /* Body copy */
```

### Why These Names

Names map directly to HTML elements and CSS conventions:

| Name | Rationale |
|------|-----------|
| `display` | CSS convention for oversized hero text (see: Bootstrap, Material) |
| `h2` | Standard heading level - used for section/vignette titles |
| `h3` | Standard heading level - used for panel subheadings |
| `body` | The `<body>` default, maps to `<p>` elements |
| `body-sm` | Smaller body variant for denser UI |
| `caption` | HTML `<caption>` element, used for metadata |
| `label` | HTML `<label>` element, smallest readable text |

No `h1` because the hero (`display`) serves that role. No `h4`-`h6` because the current design doesn't need that depth.

### Migration Path

**Before:**
```tsx
<h2 className="text-[26px] lg:text-[28px] leading-[1.15] font-semibold">
  Vignette Title
</h2>
<p className="text-[18px] leading-[1.7] text-[#4b5563]">
  Description text here.
</p>
```

**After:**
```tsx
<h2 className="text-h2 leading-tight font-semibold">
  Vignette Title
</h2>
<p className="text-body leading-relaxed text-secondary">
  Description text here.
</p>
```

### Tailwind v4 Integration

Add to `@theme inline` in `globals.css`:

```css
@theme inline {
  /* Existing colors... */

  /* Typography */
  --font-size-display: clamp(44px, 8vw, 72px);
  --font-size-h2: 1.625rem;
  --font-size-h3: 1rem;
  --font-size-body: 1.125rem;
  --font-size-body-sm: 0.875rem;
  --font-size-caption: 0.75rem;
  --font-size-label: 0.6875rem;

  --line-height-tight: 1.15;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;
}
```

This enables Tailwind utilities: `text-display`, `text-h2`, `text-body`, `leading-tight`, etc.

### Spacing Scale (Unchanged)

The existing spacing scale is fine, just needs Tailwind integration:

```css
@theme inline {
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
}
```

Enables: `gap-md`, `p-lg`, `mt-xl`, etc.
