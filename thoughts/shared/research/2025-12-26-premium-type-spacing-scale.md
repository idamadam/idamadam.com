---
date: 2025-12-26T22:00:49+11:00
git_commit: e9953fbc8a0dcec0d1122d98f7ab9cc982602922
branch: styling-first-pass
repository: idamadam.com
topic: "Premium Type Scale & Spacing Scale for Designer Portfolio"
tags: [research, ux-patterns, typography, spacing, design-system, tailwind-v4]
status: complete
last_updated: 2025-12-26
last_updated_by: claude
---

# Research: Premium Type Scale & Spacing Scale

Creating a sleek, sophisticated typographic system suitable for a designer targeting roles at Anthropic, Apple, Stripe, Airbnb, and similar design-forward companies.

## Recommendation

**Use a semantic 7-size type scale with Major Third ratio (1.25), paired with an 8px-based spacing scale.** This matches what premium companies use: Vercel's Geist uses semantic naming (heading-24, copy-16, label-12), Airbnb uses named tokens referencing their DLS, and Apple uses text styles with clear hierarchy. The key differentiator isn't the sizes—it's the semantic naming that communicates intent and the disciplined constraint to just 7 levels.

## Quick Comparison

| Option | Sophistication | Tailwind v4 | Maintenance | Verdict |
|--------|----------------|-------------|-------------|---------|
| A: Semantic 7-scale | ★★★ | Native @theme | Low | **Recommended** |
| B: Vercel-style verbose | ★★★ | Native @theme | Medium | Overkill for portfolio |
| C: Keep abstract scale | ★☆☆ | Works | Low | Why you're here |

## Constraints Considered

- **Stack**: Tailwind CSS v4, Next.js 16, Geist font already configured
- **Existing patterns**: Abstract `--text-xs` to `--text-4xl` scale exists but unused (80+ hardcoded values)
- **Priority**: Sophistication, simplicity, and actually using the scale
- **Context**: Designer portfolio—not a product requiring 30 typography variants

---

## Option A: Semantic 7-Scale (Recommended)

### Why this works

Premium design systems use semantic naming because it communicates intent, not just size. When a developer sees `text-body` vs `text-[18px]`, they understand the role. This is what Airbnb's "TextTitle3" and Vercel's "text-heading-24" achieve. Seven sizes covers every real use case in your portfolio without bloat.

### The Type Scale

Based on a **Major Third ratio (1.25)** from a 16px base, then rounded to clean values:

| Token | Size | Role | Line Height | Letter Spacing |
|-------|------|------|-------------|----------------|
| `display` | clamp(44px, 8vw, 72px) | Hero name only | 1.05 | -0.03em |
| `h2` | 26px (1.625rem) | Section & vignette titles | 1.15 | -0.02em |
| `h3` | 18px (1.125rem) | Panel headings, subheadings | 1.3 | -0.01em |
| `body` | 18px (1.125rem) | Paragraphs, descriptions | 1.65 | 0 |
| `body-sm` | 15px (0.9375rem) | UI text, panel content | 1.5 | 0 |
| `caption` | 13px (0.8125rem) | Metadata, timestamps | 1.45 | 0.01em |
| `label` | 11px (0.6875rem) | Badges, micro text | 1.4 | 0.02em |

**Why these specific values:**
- `display`: Matches your existing hero clamp—responsive, dramatic
- `h2` at 26px: Midpoint between your current 24-28px range, provides clear hierarchy without shouting
- `h3` and `body` share 18px: Differentiated by weight (600 vs 400), matching Apple's approach where hierarchy comes from weight, not size
- `body-sm` at 15px: Between 14px (too small for portfolio) and 16px (too close to body)
- `caption` at 13px: Readable metadata size, Apple's minimum for secondary text
- `label` at 11px: Matches your existing badge text, absolute minimum

### Implementation (Tailwind v4)

```css
@theme inline {
  /* Type Scale - Semantic */
  --font-size-display: clamp(2.75rem, 8vw, 4.5rem);
  --font-size-h2: 1.625rem;
  --font-size-h3: 1.125rem;
  --font-size-body: 1.125rem;
  --font-size-body-sm: 0.9375rem;
  --font-size-caption: 0.8125rem;
  --font-size-label: 0.6875rem;

  /* Line Heights */
  --line-height-display: 1.05;
  --line-height-tight: 1.15;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;

  /* Letter Spacing */
  --letter-spacing-tighter: -0.03em;
  --letter-spacing-tight: -0.02em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.01em;
  --letter-spacing-wider: 0.02em;
}
```

### Usage

```tsx
// Before (current state)
<h2 className="text-[26px] lg:text-[28px] leading-[1.15] font-semibold tracking-tight">
  Vignette Title
</h2>
<p className="text-[18px] leading-[1.7] text-[#4b5563]">
  Description text here.
</p>

// After
<h2 className="text-h2 leading-tight font-semibold tracking-tight">
  Vignette Title
</h2>
<p className="text-body leading-relaxed text-secondary">
  Description text here.
</p>
```

### Why 7 sizes is enough

| Current hardcoded values | Maps to |
|--------------------------|---------|
| `clamp(44px, 8vw, 72px)` | `display` |
| `24px`, `26px`, `28px` | `h2` |
| `16px`, `18px` (headings) | `h3` |
| `18px` (body) | `body` |
| `14px`, `15px`, `16px` (UI) | `body-sm` |
| `12px`, `13px` | `caption` |
| `11px` | `label` |

---

## The Spacing Scale

### 8px Base with 4px Flexibility

Premium design systems (Atlassian, Material, Apple) use an 8px base grid with 4px available for fine-tuning. This creates visual rhythm while allowing precision.

| Token | Value | Use Case |
|-------|-------|----------|
| `2xs` | 2px | Hairline borders only |
| `xs` | 4px | Tight padding, icon gaps |
| `sm` | 8px | Default small gap |
| `md` | 16px | Component padding |
| `lg` | 24px | Section gaps |
| `xl` | 32px | Major section breaks |
| `2xl` | 48px | Page sections |
| `3xl` | 64px | Hero spacing |
| `4xl` | 96px | Major vertical rhythm |

### Implementation

```css
@theme inline {
  /* Spacing Scale */
  --spacing-2xs: 0.125rem;  /* 2px */
  --spacing-xs: 0.25rem;    /* 4px */
  --spacing-sm: 0.5rem;     /* 8px */
  --spacing-md: 1rem;       /* 16px */
  --spacing-lg: 1.5rem;     /* 24px */
  --spacing-xl: 2rem;       /* 32px */
  --spacing-2xl: 3rem;      /* 48px */
  --spacing-3xl: 4rem;      /* 64px */
  --spacing-4xl: 6rem;      /* 96px */
}
```

### Usage

```tsx
// Before
<div className="p-[18px] gap-[18px] mb-[18px]">

// After (use nearest scale value)
<div className="p-md gap-md mb-md">
```

---

## Option B: Vercel-Style Verbose Scale

Vercel's Geist defines 30+ typography classes (`text-heading-72`, `text-copy-14`, `text-label-13-mono`, etc.). This is appropriate for a product with many surfaces, but overkill for a portfolio.

### When to use this

- You're building a design system for a product team
- You need strict pixel-perfect control across dozens of views
- You have design tooling (Figma) that generates these tokens

### Why skip it here

Your portfolio has ~10 active components with ~7 distinct typography needs. Adding 30 tokens creates maintenance burden without benefit.

---

## What I Ruled Out

- **Tailwind defaults (`text-sm`, `text-lg`)**: Too generic, doesn't communicate design intent
- **Modular scale with Golden Ratio (1.618)**: Too dramatic for a portfolio—works for marketing sites, not product-focused work
- **Fluid typography everywhere**: The hero already uses clamp; adding fluid to body text creates unnecessary complexity for marginal gain
- **Numbered tokens (`text-100`, `text-200`)**: Material Design uses this, but semantic names are more intuitive for a one-person project

---

## Implementation Priority

1. **Add to `@theme inline`** in globals.css (5 min)
2. **Update vignette foundation components** first:
   - `VignetteStaged.tsx` - uses `text-[26px]`, `text-[18px]`
   - `VignetteSplit.tsx` - uses `text-[26px]`
   - `SectionHeader.tsx` - uses `text-[24px]`
3. **Migrate panel components** - highest hardcoded count:
   - `HighlightsPanel.tsx` (40+ instances)
   - `HomeConnectPanel.tsx` (15+ instances)
4. **Clean up spacing** - replace `p-[18px]`, `gap-[18px]` with scale values

---

## Sophistication Details

What makes this feel "Anthropic/Apple/Stripe-level":

1. **Negative letter-spacing on headings**: -0.02em to -0.03em creates the tight, refined look. Apple uses this heavily. Your current code has `tracking-tight` on some headings—make it consistent.

2. **Relaxed line-height on body**: 1.65 instead of 1.5 gives readable, airy paragraphs. Stripe's marketing copy uses this.

3. **Weight differentiation over size**: h3 and body share 18px—differentiated by weight (600 vs 400). This is how Apple's SF Text styles work.

4. **Semantic color pairing**: Your `text-secondary` (#6b7280) is already well-chosen—ensure it's used consistently with `body` and `caption` text.

5. **Consistent antialiasing**: You already have `-webkit-font-smoothing: antialiased`—this is essential for Geist font rendering.

---

## Sources

- [Vercel Geist Typography](https://vercel.com/geist/typography) - Semantic class naming pattern
- [Airbnb Design Language System](https://karrisaarinen.com/dls/) - Token-based typography with semantic names
- [Working Type at Airbnb](https://medium.com/airbnb-design/working-type-81294544608b) - Cereal font integration and scale decisions
- [Apple Human Interface Guidelines - Typography](https://developer.apple.com/design/human-interface-guidelines/typography) - Text styles and weight differentiation
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) - @theme inline configuration
- [Spacing Systems & Scales](https://blog.designary.com/p/spacing-systems-and-scales-ui-design) - 8px grid rationale
- [Modular Type Scales](https://cieden.com/book/sub-atomic/typography/establishing-a-type-scale) - Major Third ratio selection
- [Styrene at Anthropic](https://type.today/en/journal/anthropic) - Premium typography pairing inspiration
