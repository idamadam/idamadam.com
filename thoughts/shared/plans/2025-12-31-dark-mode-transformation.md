# Dark Mode Transformation Implementation Plan

## Overview

Transform the portfolio from a dated "2022-2023 SaaS template" light-mode aesthetic to a bleeding-edge 2025 dark mode design. Achieve the Linear/Vercel aesthetic: dark charcoal backgrounds, vibrant electric blue accent, tighter typography, glow effects, and refined depth.

## Current State Analysis

### What Exists Now
- Light gray background (`#F5F7FA`) with corporate blue accent (`#0066CC`)
- Inter + Space Grotesk fonts with conservative letter-spacing (`-0.05em` display)
- Flat shadows (`rgba(20,20,20,0.04)`) that barely register
- Cards use `rounded-[6px]` with `card-elevated` class
- Grain texture at 40% opacity (too subtle)
- **50+ instances** of hardcoded light-mode colors across 8 vignette components

### Key Discoveries from Codebase Audit:
- Dark mode variables exist but are commented out: `globals.css:250-266`
- `card-elevated` class defined: `globals.css:86-101`
- Background gradient: `globals.css:574-593` (`.css-gradient-background`)
- Button styles: `globals.css:371-460`
- Typography tokens: `globals.css:136-178`
- Font loading uses `next/font/google` with Inter + Space Grotesk: `layout.tsx`

### Files Requiring Updates (by priority):
1. `src/app/globals.css` - Core color system, shadows, buttons
2. `src/components/CSSGradientBackground.tsx` / globals.css - Background
3. `src/components/Header.tsx` - Sticky header
4. `src/components/Footer.tsx` - Footer border
5. `src/components/vignettes/hero/IntroPanel.tsx` - Hero card (`bg-white`)
6. `src/components/vignettes/hero/HeroContent.tsx` - Polaroid (`bg-white`)
7. `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx` - 4 white instances
8. `src/components/vignettes/ai-highlights/HighlightsPanel.tsx` - 15+ instances
9. `src/components/vignettes/home-connect/HomeConnectPanel.tsx` - 20+ instances
10. `src/components/vignettes/home-connect/ProblemPanel.tsx` - 10+ instances
11. `src/components/vignettes/prototyping/SandboxPanel.tsx` - 1 instance
12. `src/components/vignettes/multilingual/TranslationManagementPanel.tsx` - 5+ instances
13. `src/components/vignettes/vibe-coding/DemoCreationFlow.tsx` - 25+ instances
14. `src/components/vignettes/shared/MobileDesignNotesSheet.tsx` - 10+ instances
15. `src/components/demos/RichTextEditor.tsx` - 8+ instances

## Desired End State

After implementation:

1. **Dark charcoal base** (`#0A0A0B`) - not pure black (OLED-friendly)
2. **Elevated surfaces** (`#141416`, `#1C1C1F`) for cards and panels
3. **Vibrant electric blue accent** (`#3B82F6`) with glow on hover
4. **High-contrast text**: Primary `#FAFAFA`, Secondary `rgba(250,250,250,0.7)`
5. **Tighter typography**: Display `-0.08em` tracking, `0.85` line-height
6. **Glow shadows** on dark (not drop shadows)
7. **Refined grain texture** at 50% opacity with `soft-light` blend

### Verification Checklist:
- [ ] Page background is dark charcoal
- [ ] All vignettes render correctly on dark
- [ ] No hardcoded white/light colors visible
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large)
- [ ] Hover states show glow effects
- [ ] Grain texture visible but subtle
- [ ] Mobile layouts work correctly

## What We're NOT Doing

- **Light/dark toggle**: Going full dark, no system preference
- **Font changes**: Keeping Inter + Space Grotesk
- **Layout changes**: Only colors and styling
- **Animated backgrounds**: Would distract from vignettes
- **Complete vignette redesign**: Preserving structure and interactions

---

## Phase 1: Core Color System

### Overview
Replace the entire color system in globals.css with dark mode values. Update background gradient and grain texture.

### Changes Required:

#### 1.1 Color Variables
**File**: `src/app/globals.css`
**Lines**: 3-83

Replace `:root` color block:

```css
:root {
  /* Dark mode base palette */
  --neutral-950: #0A0A0B;
  --neutral-900: #141416;
  --neutral-800: #1C1C1F;
  --neutral-700: #2A2A2E;
  --neutral-600: #3F3F46;
  --neutral-500: #52525B;
  --neutral-400: #71717A;
  --neutral-300: #A1A1AA;
  --neutral-200: #D4D4D8;
  --neutral-100: #E4E4E7;
  --neutral-50: #FAFAFA;

  /* Vibrant accent - Electric Blue */
  --accent-50: rgba(59, 130, 246, 0.08);
  --accent-100: rgba(59, 130, 246, 0.12);
  --accent-200: rgba(59, 130, 246, 0.20);
  --accent-300: #93C5FD;
  --accent-400: #60A5FA;
  --accent-500: #3B82F6;
  --accent-600: #2563EB;
  --accent-700: #1D4ED8;

  /* Semantic colors - DARK MODE */
  --background: var(--neutral-950);
  --background-elevated: var(--neutral-900);
  --background-subtle: var(--neutral-800);
  --foreground: var(--neutral-50);
  --muted: var(--neutral-900);
  --muted-foreground: var(--neutral-300);
  --muted-tertiary: var(--neutral-400);
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.15);

  /* Accent */
  --accent: var(--accent-500);
  --accent-foreground: #ffffff;
  --accent-interactive: var(--accent-500);
  --accent-interactive-bg: var(--accent-50);
  --accent-interactive-bg-hover: var(--accent-100);
  --warm-accent: var(--accent-500);

  /* AI gradient - vibrant for dark */
  --ai-gradient-1: #22D3EE;
  --ai-gradient-2: #3B82F6;
  --ai-gradient-3: #A855F7;

  /* Text hierarchy */
  --primary: var(--neutral-50);
  --secondary: var(--neutral-300);
  --tertiary: var(--neutral-400);

  /* Status colors - brighter for dark */
  --success: #34D399;
  --warning: #FBBF24;
  --error: #F87171;

  /* Shadows become GLOWS */
  --shadow-sm: 0 0 0 1px rgba(255, 255, 255, 0.05);
  --shadow-md:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-hover:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(59, 130, 246, 0.15);
  --shadow-glow:
    0 0 20px rgba(59, 130, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.15);

  /* Tighter radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

#### 1.2 Card Elevated Class
**File**: `src/app/globals.css`
**Lines**: 86-101

Replace `.card-elevated`:

```css
.card-elevated {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 4px 24px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

#### 1.3 Background Gradient
**File**: `src/app/globals.css`
**Lines**: 574-593

Replace `.css-gradient-background`:

```css
.css-gradient-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.08), transparent),
    radial-gradient(ellipse 60% 50% at 80% 70%, rgba(139, 92, 246, 0.06), transparent),
    #0A0A0B;
  pointer-events: none;
}

.css-gradient-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.5;
  mix-blend-mode: soft-light;
  pointer-events: none;
}
```

#### 1.4 Typography Intensification
**File**: `src/app/globals.css`
**Lines**: 136-165

Update typography tokens:

```css
--text-display: clamp(3.5rem, 12vw, 6rem);
--text-display--line-height: 0.85;
--text-display--letter-spacing: -0.08em;
--text-display--font-weight: 800;

--text-h1: clamp(2.75rem, 7vw, 3.5rem);
--text-h1--line-height: 1.0;
--text-h1--letter-spacing: -0.06em;
--text-h1--font-weight: 700;

--text-h2: 2.25rem;
--text-h2--line-height: 1.05;
--text-h2--letter-spacing: -0.04em;

--text-h3: 1.5rem;
--text-h3--line-height: 1.25;
--text-h3--letter-spacing: -0.02em;
```

#### 1.5 Add Tailwind Theme Colors
**File**: `src/app/globals.css`
**Lines**: ~103-130 (in `@theme inline`)

Add new semantic colors:

```css
@theme inline {
  /* ... existing ... */
  --color-background-elevated: var(--background-elevated);
  --color-background-subtle: var(--background-subtle);
  --color-border-strong: var(--border-strong);
  --color-neutral-950: var(--neutral-950);
  --color-neutral-900: var(--neutral-900);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-600: var(--neutral-600);
}
```

#### 1.6 Selection Styling
**File**: `src/app/globals.css`
**Lines**: 312-315

Update for dark mode:

```css
::selection {
  background-color: rgba(59, 130, 246, 0.4);
  color: var(--neutral-50);
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors
- [x] `npm run dev` starts successfully

#### Manual Verification:
- [x] Page background is dark charcoal (#0A0A0B)
- [x] Grain texture visible with soft-light blend
- [x] Existing text appears white/light gray
- [x] Blue accent elements show vibrant electric blue

**Pause here for manual confirmation before Phase 2.**

---

## Phase 2: Buttons & Interactive Elements

### Overview
Update button styles with glow effects for dark mode.

### Changes Required:

#### 2.1 Primary Button
**File**: `src/app/globals.css`
**Lines**: 371-414

Replace `.btn-primary` styles:

```css
.btn-primary {
  background: linear-gradient(
    to bottom,
    var(--accent-500),
    var(--accent-600)
  );
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.5);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, box-shadow;
}

.btn-primary:hover {
  background: linear-gradient(
    to bottom,
    var(--accent-400),
    var(--accent-500)
  );
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
    0 0 20px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.6);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: linear-gradient(
    to bottom,
    var(--accent-600),
    var(--accent-700)
  );
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.4);
  transform: translateY(0);
}
```

#### 2.2 Secondary Button
**File**: `src/app/globals.css`
**Lines**: 422-439

Replace `.btn-secondary` styles:

```css
.btn-secondary {
  background-color: transparent;
  color: var(--secondary);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  will-change: transform;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  color: var(--primary);
  background-color: rgba(255, 255, 255, 0.05);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: translateY(0);
  background-color: rgba(255, 255, 255, 0.08);
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes

#### Manual Verification:
- [ ] Primary buttons show blue gradient
- [ ] Hover shows glow effect
- [ ] Active provides press feedback
- [ ] Secondary buttons have subtle border

**Pause for manual confirmation before Phase 3.**

---

## Phase 3: Header, Footer & Hero

### Overview
Update structural components for dark mode.

### Changes Required:

#### 3.1 Footer Border
**File**: `src/components/Footer.tsx`
**Line**: 13

```tsx
// FROM:
className="... border-neutral-300"
// TO:
className="... border-border"
```

#### 3.2 IntroPanel Card
**File**: `src/components/vignettes/hero/IntroPanel.tsx`
**Line**: 66

```tsx
// FROM:
<div className="bg-white rounded-[6px] border border-border/60 shadow-sm p-8 lg:p-10">
// TO:
<div className="bg-background-elevated rounded-lg border border-border shadow-md p-8 lg:p-10">
```

#### 3.3 HeroContent Polaroid
**File**: `src/components/vignettes/hero/HeroContent.tsx`
**Lines**: 16-23

```tsx
// FROM:
className="bg-white p-2 pb-6 lg:p-3 lg:pb-8 shadow-lg rounded-sm rotate-2 mb-1 lg:mb-3 cursor-pointer"
// TO:
className="bg-neutral-900 p-2 pb-6 lg:p-3 lg:pb-8 shadow-lg rounded-sm rotate-2 mb-1 lg:mb-3 cursor-pointer border border-border"
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes

#### Manual Verification:
- [x] Header blur works on dark background
- [x] Footer border is subtle
- [x] Intro panel is dark with border
- [x] Polaroid frame is dark
- [x] All hero text readable

**Pause for manual confirmation before Phase 4.**

---

## Phase 4: Vignette Panels

### Overview
The heavy lift - update all vignette components. Use find-and-replace patterns.

### Global Find/Replace Patterns:

| Find | Replace |
|------|---------|
| `bg-white` | `bg-background-elevated` |
| `bg-gray-50` | `bg-background-subtle` |
| `bg-gray-100` | `bg-white/10` |
| `hover:bg-gray-50` | `hover:bg-white/5` |
| `border-gray-200` | `border-border` |
| `border-gray-300` | `border-border` |
| `text-gray-900` | `text-primary` |
| `text-gray-700` | `text-secondary` |
| `text-gray-600` | `text-secondary` |
| `text-gray-500` | `text-muted-foreground` |
| `text-gray-400` | `text-tertiary` |
| `bg-[#eaeaec]` | `bg-border` |
| `bg-[#F5F5F5]` | `bg-neutral-800` |
| `bg-[#F9F9F9]` | `bg-background-subtle` |
| `border-[#eaeaec]` | `border-border` |

### File-Specific Changes:

#### 4.1 SuggestionsPanel.tsx
**File**: `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`

**Lines 56, 108** - Inline styles:
```css
/* FROM */ background: white;
/* TO */ background: var(--background-elevated);
```

**Line 195** - Recommendation content:
```tsx
// Apply bg-background-elevated
```

#### 4.2 HighlightsPanel.tsx
**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`

**Lines 103, 143** - Inline styles:
```css
/* FROM */ background: white;
/* TO */ background: var(--background-elevated);
```

Apply global patterns for remaining instances.

#### 4.3 HomeConnectPanel.tsx
**File**: `src/components/vignettes/home-connect/HomeConnectPanel.tsx`

**Line 17** - Avatar (design decision - darken or keep):
```tsx
// Option A: Darken
bg-[#3D2D35]
// Option B: Keep brand color
bg-[#FFF0E8] (may need text color adjustment)
```

**Line 40** - Status tag:
```tsx
// FROM: bg-[#E8F8F4]
// TO: bg-emerald-500/20
```

**Lines 57, 63, 84, 90** - SVG strokes:
```tsx
// FROM: stroke="#E8E2F0" or similar light
// TO: stroke="rgba(255,255,255,0.15)"
```

**Line 180** - Header stays `bg-[#5F3361]` (already dark)

**Line 259** - Alert text:
```tsx
// FROM: text-[#A82433]
// TO: text-red-400
```

#### 4.4 ProblemPanel.tsx
**File**: `src/components/vignettes/home-connect/ProblemPanel.tsx`

Apply global patterns. Keep macOS traffic lights as-is.

#### 4.5 SandboxPanel.tsx
**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx`

**Line 160**:
```tsx
// FROM: bg-white border border-black
// TO: bg-background-elevated border border-border
```

#### 4.6 TranslationManagementPanel.tsx
**File**: `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`

Apply global patterns for dropdown and hover states.

#### 4.7 DemoCreationFlow.tsx
**File**: `src/components/vignettes/vibe-coding/DemoCreationFlow.tsx`

Apply global patterns throughout (25+ instances).

#### 4.8 MobileDesignNotesSheet.tsx
**File**: `src/components/vignettes/shared/MobileDesignNotesSheet.tsx`

**Line 63** - Backdrop:
```tsx
// FROM: bg-black/20
// TO: bg-black/60
```

**Line 72** - Sheet:
```tsx
// FROM: bg-white rounded-t-2xl
// TO: bg-background-elevated rounded-t-2xl border-t border-border
```

**Line 85** - Handle:
```tsx
// FROM: bg-gray-300
// TO: bg-neutral-600
```

#### 4.9 RichTextEditor.tsx
**File**: `src/components/demos/RichTextEditor.tsx`

Apply global patterns for editor chrome.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run dev` works

#### Manual Verification:
- [ ] AI Highlights vignette correct
- [ ] AI Suggestions vignette correct
- [ ] Home Connect vignette correct
- [ ] Prototyping vignette correct
- [ ] Multilingual vignette correct
- [ ] Vibe Coding vignette correct
- [ ] All text readable
- [ ] All hover states work
- [ ] Mobile layouts work

**Pause for thorough testing before Phase 5.**

---

## Phase 5: Final Polish

### Overview
Verify grain texture, focus states, and overall cohesion.

### Changes Required:

#### 5.1 LinkedIn Hover
**File**: `src/app/globals.css`
**Lines**: 569-571

```css
.hover-linkedin:hover {
  color: #0A66C2;
  filter: brightness(1.3);
}
```

#### 5.2 Verify Focus States
Ensure `:focus-visible` uses `--accent` (should work automatically).

#### 5.3 Final Visual Audit
- Check all vignettes at mobile and desktop
- Verify grain texture visibility
- Test all interactive states
- Run Lighthouse accessibility

### Success Criteria:

#### Automated Verification:
- [ ] `npm run build` passes
- [ ] Lighthouse accessibility >= 90

#### Manual Verification:
- [ ] Text selection shows blue highlight
- [ ] Focus states visible on all elements
- [ ] LinkedIn icon visible and hoverable
- [ ] Grain adds depth without distraction
- [ ] Overall aesthetic cohesive and premium

---

## Testing Strategy

### Build Tests:
- `npm run build`
- `npm run dev`

### Manual Testing:
1. Load in Chrome, Firefox, Safari
2. Scroll through all vignettes
3. Test hover/click/focus states
4. Test mobile layouts (Chrome DevTools)
5. Check contrast with dev tools
6. Test keyboard navigation

### Accessibility:
- Lighthouse audit
- Color contrast (4.5:1 body, 3:1 large)
- Focus indicators visible
- Reduced motion preference

---

## References

- Research: `thoughts/shared/research/2025-12-31-modern-portfolio-aesthetic-refresh.md`
- Card styling: `thoughts/shared/research/2025-12-31-modern-card-styling-patterns.md`
- Linear design: https://blog.logrocket.com/ux-design/linear-design/
- Shadow design: https://www.joshwcomeau.com/css/designing-shadows/
