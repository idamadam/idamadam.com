# Typography & Spacing Scale Migration

## Overview

Replace 80+ hardcoded typography values and 24+ hardcoded spacing values with a semantic, Tailwind v4-integrated design system.

## Progress Tracking

### Phase 1: Foundation (must complete first)
- [x] **TASK-01**: Update `globals.css` with tokens and composed classes

### Phase 2: Component Migrations (parallelizable after Phase 1)
- [x] **TASK-02**: `src/app/page.tsx`
- [x] **TASK-03**: `src/components/SectionHeader.tsx`
- [x] **TASK-04**: `src/components/vignettes/VignetteSplit.tsx`
- [x] **TASK-05**: `src/components/vignettes/VignetteStaged.tsx`
- [x] **TASK-06**: `src/components/vignettes/VignetteContainer.tsx`
- [x] **TASK-07**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
- [x] **TASK-08**: `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`
- [x] **TASK-09**: `src/components/vignettes/home-connect/HomeConnectPanel.tsx`
- [x] **TASK-10**: `src/components/vignettes/home-connect/ProblemPanel.tsx`
- [x] **TASK-11**: `src/components/vignettes/home-connect/TransitionPanel.tsx`
- [x] **TASK-12**: `src/components/vignettes/multilingual/ProblemPanel.tsx`
- [x] **TASK-13**: `src/components/vignettes/multilingual/TransitionPanel.tsx`
- [x] **TASK-14**: `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`
- [x] **TASK-15**: `src/components/vignettes/prototyping/SandboxPanel.tsx`
- [x] **TASK-16**: `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx`
- [x] **TASK-17**: `src/components/vignettes/shared/DesignNotesButton.tsx`
- [x] **TASK-18**: `src/components/vignettes/shared/RedlineOverlay.tsx`
- [x] **TASK-19**: `src/components/vignettes/shared/StageIndicator.tsx`
- [x] **TASK-20**: `src/components/demos/RichTextEditor.tsx`

### Phase 3: Cleanup (after all Phase 2 tasks)
- [x] **TASK-21**: Remove old CSS variables from `globals.css`
- [x] **TASK-22**: Update `design-notes.css`
- [x] **TASK-23**: Final verification

---

## How Agents Should Use This Plan

1. Read this file to find uncompleted tasks (`[ ]`)
2. Pick any uncompleted task from current phase
3. Read the task definition below for exact changes
4. Make the changes
5. Mark task complete: change `[ ]` to `[x]` in Progress Tracking
6. Add notes if any issues encountered
7. Clear context and pick next task

**Token Reference** (memorize or copy):
| Composed Class | Use For |
|----------------|---------|
| `type-display` | Hero heading only |
| `type-h2` | Section titles, vignette titles |
| `type-body` | Descriptions, paragraphs |
| `type-body-sm` | UI text, buttons, smaller body |
| `type-caption` | Metadata, timestamps (13px) |
| `type-label` | Badges, micro text (11px) |

**Color Reference**:
| Old | New |
|-----|-----|
| `text-[#0f172a]` | `text-primary` |
| `text-[#4b5563]` | `text-secondary` |
| `text-[#6b7280]` | `text-secondary` |
| `text-[#9ca3af]` | `text-tertiary` |

---

## Task Definitions

---

### TASK-01: Update globals.css

**File**: `src/app/globals.css`
**Status**: Foundation task - must complete before all others

**Changes**:

1. Replace `@theme inline` block (lines 57-74) with:

```css
@theme inline {
  /* Colors (existing) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted-tertiary: var(--muted-tertiary);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-warm-accent: var(--warm-accent);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-tertiary: var(--tertiary);
  --color-success: var(--success);
  --color-warning: var(--warning);

  /* Fonts - switch to Inter */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);

  /* Typography - font sizes */
  --font-size-display: clamp(2.75rem, 8vw, 4.5rem);
  --font-size-h2: 1.625rem;
  --font-size-h3: 1.125rem;
  --font-size-body: 1.125rem;
  --font-size-body-sm: 0.9375rem;
  --font-size-caption: 0.8125rem;
  --font-size-label: 0.6875rem;

  /* Typography - line heights */
  --line-height-display: 0.95;
  --line-height-tight: 1.15;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;

  /* Typography - letter spacing */
  --letter-spacing-tighter: -0.04em;
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;

  /* Spacing */
  --spacing-2xs: 0.125rem;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;
}
```

2. Add composed typography classes after `@theme inline` block:

```css
/* Composed typography classes */
.type-display {
  @apply text-display leading-display tracking-tighter font-bold text-primary;
}

.type-h2 {
  @apply text-h2 leading-tight tracking-tight font-semibold text-primary;
}

.type-h3 {
  @apply text-h3 leading-snug font-semibold text-primary;
}

.type-body {
  @apply text-body leading-relaxed text-secondary;
}

.type-body-sm {
  @apply text-body-sm leading-normal text-secondary;
}

.type-caption {
  @apply text-caption leading-normal text-tertiary;
}

.type-label {
  @apply text-label leading-normal tracking-wide text-tertiary;
}
```

**Verify**: Run `npm run build` - must succeed before other tasks can start.

---

### TASK-02: page.tsx

**File**: `src/app/page.tsx`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 12 | `text-[#0f172a]` | `text-primary` |
| 18 | `className="text-[clamp(44px,8vw,72px)] leading-[0.95] tracking-[-0.04em] font-bold text-[#0f172a]"` | `className="type-display"` |
| 21 | `className="text-[clamp(18px,3vw,22px)] leading-[1.6] text-[#4b5563] max-w-2xl"` | `className="type-body max-w-2xl"` |
| 30 | `className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl"` | `className="type-body max-w-3xl"` |
| 33 | `className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl"` | `className="type-body max-w-3xl"` |
| 53 | `className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl"` | `className="type-body max-w-3xl"` |

---

### TASK-03: SectionHeader.tsx

**File**: `src/components/SectionHeader.tsx`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 12 | `className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]"` | `className="type-h2"` |

---

### TASK-04: VignetteSplit.tsx

**File**: `src/components/vignettes/VignetteSplit.tsx`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 25 | `className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]"` | `className="type-h2"` |
| 30 | `className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl"` | `className="type-body max-w-xl"` |

---

### TASK-05: VignetteStaged.tsx

**File**: `src/components/vignettes/VignetteStaged.tsx`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 62 | `className="text-[26px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-[#0f172a] font-[family-name:var(--font-ibm-plex-sans)]"` | `className="type-h2"` |
| 66 | `className="text-[18px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-xl"` | `className="type-body max-w-xl"` |
| 78 | `className="flex items-center gap-2 text-[16px] text-[#4b5563] hover:text-[#0f172a] transition-colors font-[family-name:var(--font-ibm-plex-sans)]"` | `className="flex items-center gap-2 type-body-sm hover:text-primary transition-colors"` |
| 82 | `text-[20px]` | `text-h3` |
| 110 | `className="flex items-center gap-2 text-[16px] text-[#4b5563] hover:text-[#0f172a] transition-colors font-[family-name:var(--font-ibm-plex-sans)] group"` | `className="flex items-center gap-2 type-body-sm hover:text-primary transition-colors group"` |
| 112 | `text-[20px]` | `text-h3` |
| 115 | `text-[18px]` | `text-body` |

---

### TASK-06: VignetteContainer.tsx

**File**: `src/components/vignettes/VignetteContainer.tsx`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 34 | `className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]"` | `className="type-h2"` |
| 38 | `className="text-[16px] leading-[1.6] text-gray-600"` | `className="type-body-sm"` |

---

### TASK-07: HighlightsPanel.tsx

**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`

**Token mapping for this file**:
- `text-[20px]` → `type-h3` or `text-h3`
- `text-[18px]` → `type-body` or `text-body`
- `text-[16px]` → `type-body-sm` or `text-body-sm`
- `text-[14px]`, `text-[15px]` → `text-body-sm`
- `text-[13px]`, `text-[12px]` → `text-caption`
- `text-[#2f2438]` → `text-primary`
- `text-[#524e56]` → `text-secondary`
- `leading-[16px]`, `leading-[18px]`, `leading-[20px]`, `leading-[24px]`, `leading-[30px]` → `leading-normal` or `leading-snug`

**Note**: This file has 40+ instances. Replace systematically. Keep `p-[2px]` for gradient borders.

---

### TASK-08: SuggestionsPanel.tsx

**File**: `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`

**Token mapping**:
- `text-[20px]` → `text-h3`
- `text-[16px]` → `text-body-sm`
- `text-[#2f2438]` → `text-primary`
- `text-[#524e56]` → `text-secondary`
- Keep `p-[2px]` for gradient borders

---

### TASK-09: HomeConnectPanel.tsx

**File**: `src/components/vignettes/home-connect/HomeConnectPanel.tsx`

**Token mapping**:
- `text-[22px]` → `text-h3`
- `text-[16px]` → `text-body-sm`
- `text-[15px]` → `text-body-sm`
- `text-[13px]` → `text-caption`
- `text-[12px]` → `text-caption`
- `text-[11px]` → `text-label`
- `text-[#2F2438]` → `text-primary`

**Note**: Keep dynamic `fontSize: size * 0.45` as-is (line 18).

---

### TASK-10: home-connect/ProblemPanel.tsx

**File**: `src/components/vignettes/home-connect/ProblemPanel.tsx`

**Token mapping**:
- `text-[18px]` → `text-body`
- `text-[15px]` → `text-body-sm`
- `text-[12px]` → `text-caption`
- `text-[11px]` → `text-label`
- `text-[#2F2438]` → `text-primary`

---

### TASK-11: home-connect/TransitionPanel.tsx

**File**: `src/components/vignettes/home-connect/TransitionPanel.tsx`

**Token mapping**:
- `text-[22px]` → `text-h3`
- `text-[15px]` → `text-body-sm`
- `text-[12px]` → `text-caption`
- `text-[11px]` → `text-label`

---

### TASK-12: multilingual/ProblemPanel.tsx

**File**: `src/components/vignettes/multilingual/ProblemPanel.tsx`

**Token mapping**:
- `text-[20px]` → `text-h3`
- `text-[18px]` → `text-body`
- `text-[15px]` → `text-body-sm`
- `text-[14px]` → `text-body-sm`
- `text-[13px]` → `text-caption`
- `text-[12px]` → `text-caption`
- `text-[11px]` → `text-label`

---

### TASK-13: multilingual/TransitionPanel.tsx

**File**: `src/components/vignettes/multilingual/TransitionPanel.tsx`

**Token mapping**:
- `text-[18px]` → `text-body`
- `text-[15px]` → `text-body-sm`
- `text-[14px]` → `text-body-sm`
- `text-[13px]` → `text-caption`

---

### TASK-14: multilingual/TranslationManagementPanel.tsx

**File**: `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`

**Token mapping**:
- `text-[14px]` → `text-body-sm`
- `text-[#2f2438]` → `text-primary`
- `text-[#6b7280]` → `text-secondary`
- `leading-[20px]`, `leading-[24px]` → `leading-normal`

**Spacing**:
- `px-[10px]` → `px-sm`
- `py-[6px]` → keep as-is or `py-xs`
- `py-[8px]` → `py-sm`
- `px-[14px]` → `px-md`
- `h-[36px]` → `h-9`

---

### TASK-15: prototyping/SandboxPanel.tsx

**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx`

**Token mapping**:
- `text-[20px]` → `text-h3`
- `text-[16px]` → `text-body-sm`
- `text-[15px]` → `text-body-sm`
- `text-[14px]` → `text-body-sm`
- `text-[13px]` → `text-caption`
- `text-[12px]` → `text-caption`
- `text-[10px]` → `text-label`

**Spacing**:
- `mb-[18px]` → `mb-lg`
- `gap-[18px]` → `gap-lg`

---

### TASK-16: vibe-coding/VibeCodingVignette.tsx

**File**: `src/components/vignettes/vibe-coding/VibeCodingVignette.tsx`

**Token mapping**:
- `text-[15px]` → `text-body-sm`
- `leading-[1.4]` → `leading-normal`

---

### TASK-17: shared/DesignNotesButton.tsx

**File**: `src/components/vignettes/shared/DesignNotesButton.tsx`

**Token mapping**:
- `text-[14px]` → `text-body-sm`
- `text-[18px]` → `text-body`
- `text-[#0f172a]` → `text-primary`

---

### TASK-18: shared/RedlineOverlay.tsx

**File**: `src/components/vignettes/shared/RedlineOverlay.tsx`

**Token mapping**:
- `text-[13px]` → `text-caption`
- `leading-[1.3]` → `leading-snug`
- `leading-[1.5]` → `leading-normal`
- `text-[#475569]` → `text-secondary`

---

### TASK-19: shared/StageIndicator.tsx

**File**: `src/components/vignettes/shared/StageIndicator.tsx`

**Token mapping**:
- `text-[13px]` → `text-caption`

---

### TASK-20: demos/RichTextEditor.tsx

**File**: `src/components/demos/RichTextEditor.tsx`

**Token mapping**:
- `text-[20px]` → `text-h3`
- `text-[#2f2438]` → `text-primary`
- `text-[rgba(47,36,56,0.7)]` → `text-secondary`

---

### TASK-21: Remove old CSS variables

**File**: `src/app/globals.css`

**Delete** these variable definitions from `:root` (lines 22-44):
- `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`, `--space-3xl`
- `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-4xl`
- `--leading-tight`, `--leading-normal`, `--leading-relaxed`

**Keep** these (still used):
- All color variables
- Shadow variables
- Border radius variables

---

### TASK-22: Update design-notes.css

**File**: `src/components/vignettes/shared/design-notes.css`

**Find and replace**:

| Line | Before | After |
|------|--------|-------|
| 123 | `font-size: 12px;` | `font-size: var(--font-size-caption);` |

---

### TASK-23: Final verification

**Run these commands**:

```bash
# Build must succeed
npm run build

# Should return 0 results (excluding color hex values)
grep -rE "text-\[[0-9]" src/ | grep -v "text-\[#"

# Should return 0 results
grep -rE "(p|m|gap)-\[[0-9]" src/
```

**Manual checks**:
1. Open http://localhost:3000
2. Verify hero renders correctly
3. Scroll through all vignettes
4. Click through Problem → Solution → Design Notes on each
5. Check mobile layout

---

## Reference: Token Definitions

### Typography Scale

| Token | Size | Use |
|-------|------|-----|
| `display` | clamp(44px, 8vw, 72px) | Hero only |
| `h2` | 26px (1.625rem) | Section titles |
| `h3` | 18px (1.125rem) | Subheadings |
| `body` | 18px (1.125rem) | Paragraphs |
| `body-sm` | 15px (0.9375rem) | UI text |
| `caption` | 13px (0.8125rem) | Metadata |
| `label` | 11px (0.6875rem) | Badges |

### Line Heights

| Token | Value |
|-------|-------|
| `display` | 0.95 |
| `tight` | 1.15 |
| `snug` | 1.3 |
| `normal` | 1.5 |
| `relaxed` | 1.65 |

### Spacing Scale

| Token | Size |
|-------|------|
| `2xs` | 2px |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |
| `4xl` | 96px |
