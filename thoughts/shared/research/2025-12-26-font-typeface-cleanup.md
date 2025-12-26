---
date: 2025-12-26T23:15:00+11:00
git_commit: fefc884c154ff0aef9a48fb3f30ed9c67404edc0
branch: styling-first-pass
repository: idamadam.com
topic: "Font/Typeface Cleanup After Typography Scale Migration"
tags: [research, codebase, fonts, typography, cleanup]
status: complete
last_updated: 2025-12-26
last_updated_by: Claude
---

# Research: Font/Typeface Cleanup After Typography Scale Migration

**Date**: 2025-12-26T23:15:00+11:00
**Git Commit**: fefc884c154ff0aef9a48fb3f30ed9c67404edc0
**Branch**: styling-first-pass
**Repository**: idamadam.com

## Research Question
After implementing the typography token system, are there unused fonts being loaded that should be cleaned up?

## Summary

**Yes, there are 2 unused fonts that should be removed:**

| Font | Variable | Status | Action |
|------|----------|--------|--------|
| Inter | `--font-inter` | USED | Keep (primary `--font-sans`) |
| Geist Mono | `--font-geist-mono` | USED | Keep (`--font-mono`) |
| Geist | `--font-geist-sans` | NOT USED | Remove |
| IBM Plex Sans | `--font-ibm-plex-sans` | NOT USED | Remove |

Additionally, there are 2 redundant inline font overrides that can be removed.

## Detailed Findings

### 1. Fonts Currently Loaded

**File:** `src/app/layout.tsx:2-25`

```typescript
import { Geist, Geist_Mono, IBM_Plex_Sans, Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});
```

All four are applied to the body (`layout.tsx:55`):
```typescript
className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} ${inter.variable} antialiased`}
```

### 2. Fonts Actually Used in Tailwind Theme

**File:** `src/app/globals.css:52-54`

```css
/* Fonts - switch to Inter */
--font-sans: var(--font-inter);
--font-mono: var(--font-geist-mono);
```

Only `Inter` and `Geist Mono` are wired into the design system.

### 3. Unused Fonts (Safe to Remove)

#### Geist Sans (`--font-geist-sans`)
- Defined in `layout.tsx:5-8`
- Variable applied to body but never referenced anywhere
- Was likely the original sans font before switching to Inter
- **Zero usages in codebase**

#### IBM Plex Sans (`--font-ibm-plex-sans`)
- Defined in `layout.tsx:15-19`
- Variable applied to body but never referenced anywhere
- Loads 3 weights (400, 500, 600) - significant unused payload
- Only appears in archive folder (2020 portfolio)
- **Zero usages in current codebase**

### 4. Redundant Inline Font Overrides

Found 2 components explicitly setting Inter font when it's already the default:

**File:** `src/components/vignettes/ai-highlights/HighlightsPanel.tsx:290`
```tsx
className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden font-[family-name:var(--font-inter)] ${className}`}
```

**File:** `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx:184`
```tsx
<div className="space-y-2 font-[family-name:var(--font-inter)]">
```

These overrides are redundant since Inter is already the default `--font-sans`.

### 5. Other Fonts (Keep As-Is)

#### Material Icons (CDN)
**File:** `src/app/layout.tsx:52`
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
```
This is an icon font, not a text font. Keep it.

#### SVG Embedded Fonts
- Avatar SVGs use `system-ui, -apple-system, sans-serif`
- `illustration.svg` uses `Arial, sans-serif`
These are embedded in SVG files for rendering and don't affect page load.

## Code References

- `src/app/layout.tsx:2` - Font imports from next/font/google
- `src/app/layout.tsx:5-25` - Font configurations
- `src/app/layout.tsx:55` - Font variables applied to body
- `src/app/globals.css:52-54` - Tailwind font mapping
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx:290` - Redundant Inter override
- `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx:184` - Redundant Inter override

## Recommended Cleanup

### Step 1: Remove Unused Font Imports

In `src/app/layout.tsx`:

```diff
- import { Geist, Geist_Mono, IBM_Plex_Sans, Inter } from "next/font/google";
+ import { Geist_Mono, Inter } from "next/font/google";

- const geistSans = Geist({
-   variable: "--font-geist-sans",
-   subsets: ["latin"],
- });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

- const ibmPlexSans = IBM_Plex_Sans({
-   variable: "--font-ibm-plex-sans",
-   subsets: ["latin"],
-   weight: ["400", "500", "600"],
- });

  const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "600"],
  });
```

Update body className:
```diff
- className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} ${inter.variable} antialiased`}
+ className={`${geistMono.variable} ${inter.variable} antialiased`}
```

### Step 2: Remove Redundant Inline Overrides

In `src/components/vignettes/ai-highlights/HighlightsPanel.tsx:290`:
```diff
- className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden font-[family-name:var(--font-inter)] ${className}`}
+ className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden ${className}`}
```

In `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx:184`:
```diff
- <div className="space-y-2 font-[family-name:var(--font-inter)]">
+ <div className="space-y-2">
```

## Performance Impact

Removing these unused fonts will:
- Reduce initial page load (2 fewer font downloads)
- IBM Plex Sans alone loads 3 weight variants
- Cleaner codebase with fewer unused imports

## Architecture Insights

The codebase appears to have gone through a font transition:
1. Originally used Geist Sans as primary font
2. IBM Plex Sans was likely from the 2020 portfolio iteration
3. Now standardized on Inter for body text
4. Old font imports were never cleaned up after the migration

## Open Questions

### Consider Single Typeface (Inter Only)

Geist Mono is only used in 5 places within `src/components/vignettes/prototyping/SandboxPanel.tsx` for terminal/code-like text. The system monospace fallback (`ui-monospace, Menlo, Monaco, Consolas`) would work equally well for this aesthetic.

**Potential simplification:** Go from 4 fonts → 1 font (Inter only) by:
1. Removing Geist Mono import
2. Updating `--font-mono` to use system stack: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

This would further reduce page load and simplify the typography system.
