# Font & Color System Cleanup Implementation Plan

## Overview

Clean up unused fonts and refine the color system based on typeface research. This simplifies the codebase to a single loaded font (Inter) with system mono fallback, and establishes a flexible Zinc-based neutral palette with an accent slot ready for future personality.

## Current State Analysis

### Fonts Currently Loaded (4 fonts)
| Font | Variable | Status |
|------|----------|--------|
| Inter | `--font-inter` | USED - primary sans |
| Geist Mono | `--font-geist-mono` | Used in 5 places (SandboxPanel) |
| Geist Sans | `--font-geist-sans` | NOT USED |
| IBM Plex Sans | `--font-ibm-plex-sans` | NOT USED |

### Current Colors
```css
--background: #fefefe;
--foreground: #1a1d23;
--primary: #1a1d23;
--secondary: #6b7280;
--tertiary: #9ca3af;
--muted: #f8f9fa;
--border: #e5e7eb;
--accent: #2563eb;
```

## Desired End State

### Fonts (1 loaded font + system mono)
- **Inter**: Only loaded font (400, 600 weights)
- **System mono stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Colors (Zinc-based neutrals + flexible accent)
```css
/* Full neutral scale for flexibility */
--neutral-50: #fafafa;
--neutral-100: #f4f4f5;
--neutral-200: #e4e4e7;
--neutral-300: #d4d4d8;
--neutral-400: #a1a1aa;
--neutral-500: #71717a;
--neutral-600: #52525b;
--neutral-700: #3f3f46;
--neutral-800: #27272a;
--neutral-900: #18181b;
--neutral-950: #09090b;

/* Semantic mapping */
--background: var(--neutral-50);   /* was #fefefe */
--foreground: var(--neutral-900);  /* was #1a1d23 */
--primary: var(--neutral-900);
--secondary: var(--neutral-600);   /* was #6b7280 */
--tertiary: var(--neutral-400);    /* was #9ca3af */
--muted: var(--neutral-100);       /* was #f8f9fa */
--border: var(--neutral-200);      /* was #e5e7eb */

/* Accent - ready for future personality */
--accent: #2563eb;                 /* keeping blue for now */
```

## What We're NOT Doing

- Not changing typography tokens (already migrated)
- Not touching component logic
- Not adding dark mode
- Not changing the accent color yet (that's for later experimentation)

---

## Phase 1: Font Cleanup

### Overview
Remove unused font imports and switch to system mono stack.

### Changes Required:

#### 1. Update layout.tsx
**File**: `src/app/layout.tsx`

**Remove imports and configurations:**
```diff
- import { Geist, Geist_Mono, IBM_Plex_Sans, Inter } from "next/font/google";
+ import { Inter } from "next/font/google";

- const geistSans = Geist({
-   variable: "--font-geist-sans",
-   subsets: ["latin"],
- });
-
- const geistMono = Geist_Mono({
-   variable: "--font-geist-mono",
-   subsets: ["latin"],
- });
-
- const ibmPlexSans = IBM_Plex_Sans({
-   variable: "--font-ibm-plex-sans",
-   subsets: ["latin"],
-   weight: ["400", "500", "600"],
- });
-
  const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
-   weight: ["400", "600"],
+   weight: ["400", "500", "600"],
  });
```

**Update body className:**
```diff
- className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} ${inter.variable} antialiased`}
+ className={`${inter.variable} antialiased`}
```

#### 2. Update globals.css font reference
**File**: `src/app/globals.css`

**Change mono font to system stack:**
```diff
  /* Fonts - switch to Inter */
  --font-sans: var(--font-inter);
- --font-mono: var(--font-geist-mono);
+ --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

#### 3. Remove redundant font overrides
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`

Find and remove `font-[family-name:var(--font-inter)]` from className (line ~290).

**File**: `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`

Find and remove `font-[family-name:var(--font-inter)]` from className (line ~184).

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] No references to removed fonts: `grep -r "geist-sans\|ibm-plex" src/`
- [x] No references to Geist_Mono import: `grep -r "Geist_Mono" src/`

#### Manual Verification:
- [x] Homepage renders correctly
- [x] Terminal text in Prototyping vignette still looks appropriate with system mono
- [x] No visual regressions in vignette panels

---

## Phase 2: Color System Refinement

### Overview
Establish Zinc-based neutral scale with semantic mapping, keeping accent flexible for future.

### Changes Required:

#### 1. Update globals.css color variables
**File**: `src/app/globals.css`

**Replace the `:root` color block with:**
```css
:root {
  /* Neutral scale (Zinc-based, slightly warm) */
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
  --neutral-950: #09090b;

  /* Semantic color mapping */
  --background: var(--neutral-50);
  --foreground: var(--neutral-900);
  --muted: var(--neutral-100);
  --muted-foreground: var(--neutral-600);
  --muted-tertiary: var(--neutral-400);
  --border: var(--neutral-200);

  /* Accent - swap this for personality later */
  --accent: #2563eb;
  --accent-foreground: #ffffff;
  --warm-accent: #f59e0b;

  /* Semantic text colors */
  --primary: var(--neutral-900);
  --secondary: var(--neutral-600);
  --tertiary: var(--neutral-400);

  /* Status colors */
  --success: #059669;
  --warning: #f59e0b;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

### Success Criteria:

#### Automated Verification:
- [x] Build succeeds: `npm run build`
- [x] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [x] Background has subtle warm tint (not pure white)
- [x] Text hierarchy is clear (primary darker than secondary)
- [x] Borders are visible but subtle
- [x] Accent color (blue) still works for links/focus states
- [ ] All vignettes render correctly

---

## Phase 3: Final Verification

### Automated Checks
```bash
# Build must succeed
npm run build

# No hardcoded font references to removed fonts
grep -rE "geist-sans|ibm-plex|Geist_Mono|IBM_Plex" src/

# Should return empty (all font variables cleaned up)
```

### Manual Testing Checklist
1. [ ] Open http://localhost:3000
2. [ ] Hero text renders in Inter
3. [ ] Scroll through all vignettes - no visual regressions
4. [ ] Prototyping vignette terminal text uses system mono (should look similar)
5. [ ] Color palette feels slightly warmer but still professional
6. [ ] Check mobile layout

---

## Performance Impact

**Font loading reduction:**
- Before: 4 font families (Inter, Geist Sans, Geist Mono, IBM Plex Sans)
- After: 1 font family (Inter with 3 weights)

**Expected improvement:**
- Fewer HTTP requests
- Smaller initial bundle
- Faster First Contentful Paint

---

## Future: Fun Color System

The neutral scale is now in place. To add personality later:

1. **Change accent color**: Simply update `--accent: #2563eb` to any color
2. **Add gradient accents**: Create `--accent-gradient` variable
3. **Seasonal themes**: Swap accent programmatically
4. **Multiple accent palette**: Add `--accent-secondary`, `--accent-tertiary`

Example fun palettes to try later:
- Coral: `--accent: #f97316`
- Electric purple: `--accent: #8b5cf6`
- Teal: `--accent: #14b8a6`
- Anthropic rust: `--accent: #c2410c`

---

## References

- Typeface research: `thoughts/shared/research/2025-12-26-portfolio-typeface-selection.md`
- Font cleanup research: `thoughts/shared/research/2025-12-26-font-typeface-cleanup.md`
- Typography migration: `thoughts/shared/plans/2025-12-26-typography-spacing-scale-migration.md`
