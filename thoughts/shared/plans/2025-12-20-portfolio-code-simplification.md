# Portfolio Code Simplification Implementation Plan

## Overview

Remove ~300+ lines of duplicate code across the vignette system without changing user-facing behavior. This refactoring extracts common patterns into shared components and hooks, improving maintainability.

## Current State Analysis

The vignette system has evolved organically, resulting in significant code duplication:

- **Stage Indicator**: 18-line pattern duplicated in 5 vignettes
- **Animated Stage Text**: 50+ line animation pattern in 5 vignettes
- **Design Notes Setup**: 52+ line boilerplate in 4 vignettes
- **Design Notes Button**: Identical toggle button in 4 vignettes
- **Loading Transition**: 7-line pattern in 3 vignettes
- **Anchor Styling**: Identical function in 3 panel components
- **Unused Animation Presets**: ~80 lines of dead code in animations.ts
- **Orphaned Demo Components**: 2 unused files

### Key Discoveries:
- `StageContent` type defined in both `types.ts:17-21` and `VignetteStaged.tsx:7-11`
- `design-notes.css` lives in ai-highlights but imported by 4 vignettes via relative paths
- All vignettes with redline mode duplicate identical setup logic
- Stage indicator JSX is byte-for-byte identical across 5 files

## Desired End State

After implementation:
1. All shared patterns extracted to `src/components/vignettes/shared/`
2. Types consolidated in single location
3. Dead code removed
4. Each vignette is concise, using shared utilities
5. No user-facing changes (verify by visual inspection)

### Verification:
- Run `npm run build` - should complete without errors
- Run `npm run lint` - no new warnings
- Visual diff: homepage should look and behave identically

## What We're NOT Doing

- Adding new features or capabilities
- Refactoring component internal logic (only extracting shared patterns)
- Modifying content.ts files
- Changing the VignetteContainer or VignetteSplit components

## Intentional Unifications

The following visual inconsistencies will be unified as part of this cleanup:

1. **Accent color**: Currently varies per vignette. Will unify to `#ef4444` (red) and hardcode in shared components, removing the `accent` prop chain entirely.
2. **DesignNotesButton text color**: Currently varies per vignette (hardcoded values). Will unify to use the accent color.
3. **Anchor box-shadow opacity**: Home Connect uses 0.3, others use 0.2. Will unify to 0.2 for all.

---

## Phase 1: Type & Utility Cleanup

### Overview
Low-risk cleanup of dead code and type consolidation.

### Changes Required:

#### 1. Consolidate StageContent Type
**File**: `src/components/vignettes/VignetteStaged.tsx`

Remove lines 7-11 (duplicate type definition) and import from types:

```typescript
// Remove this block (lines 7-11):
interface StageContent {
  title?: string;
  description?: string;
  cta?: string;
}

// Add import at top:
import type { StageContent } from './types';
```

**File**: `src/components/vignettes/types.ts`

Export the existing `StageContent` type (already defined correctly, no changes needed).

#### 2. Remove Unused Animation Presets
**File**: `src/lib/animations.ts`

Keep only the used exports and remove all others:

```typescript
/**
 * Centralized animation configurations for Framer Motion
 * Used across all vignettes for consistent feel
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export const subtlePulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: 2,
      ease: "easeInOut" as const
    }
  }
};
```

Delete all other exports (fadeIn, slideInFromRight, slideInFromLeft, staggerContainer, staggerItem, scaleOnHover, buttonHover, textReveal, interactiveHover, stageTransition, problemToSolution, cardScatter, iterationCard, iterationsStagger).

#### 3. Delete Orphaned Demo Components
**Files to delete**:
- `src/components/demos/Button.tsx`
- `src/components/demos/IterationsPanel.tsx`

Keep `src/components/demos/RichTextEditor.tsx` (used by ai-suggestions and multilingual).

#### 4. Create Shared Constants
**File**: `src/components/vignettes/shared/constants.ts`

```typescript
// Unified accent color for all design notes annotations
export const DESIGN_NOTES_ACCENT = '#ef4444';
```

#### 5. Move Shared CSS
**Action**: Move `src/components/vignettes/ai-highlights/design-notes.css` to `src/components/vignettes/shared/design-notes.css`

**Update imports in**:

`src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`:
```typescript
// Change from:
import './design-notes.css';
// To:
import '../shared/design-notes.css';
```

`src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`:
```typescript
// Change from:
import '../ai-highlights/design-notes.css';
// To:
import '../shared/design-notes.css';
```

`src/components/vignettes/multilingual/MultilingualVignette.tsx`:
```typescript
// Change from:
import '../ai-highlights/design-notes.css';
// To:
import '../shared/design-notes.css';
```

`src/components/vignettes/home-connect/HomeConnectVignette.tsx`:
```typescript
// Change from:
import '../ai-highlights/design-notes.css';
// To:
import '../shared/design-notes.css';
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [ ] Homepage loads and displays correctly
- [ ] All vignettes render properly

**Implementation Note**: Pause after Phase 1 for verification before proceeding.

---

## Phase 2: Create useDesignNotesSetup Hook

### Overview
Extract the 52+ lines of identical redline setup boilerplate used in 4 vignettes.

### Changes Required:

#### 1. Create New Hook
**File**: `src/components/vignettes/shared/useDesignNotesSetup.ts`

Note: Accent is no longer passed around - shared components import `DESIGN_NOTES_ACCENT` directly.

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useRedlineMode } from './useRedlineMode';
import type { DesignNote } from '../types';

interface DesignNotesConfig {
  notes?: DesignNote[];
}

interface UseDesignNotesSetupReturn {
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  setMobileIndex: (index: number) => void;
  handleExit: () => void;
  handleScrollToAnchor: (anchor: string) => void;
  redlineNotes: DesignNote[];
}

export function useDesignNotesSetup(
  designNotes: DesignNotesConfig | undefined
): UseDesignNotesSetupReturn {
  const redlineMode = useRedlineMode();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleExit = useCallback(() => {
    redlineMode.exitRedlineMode();
    setMobileIndex(0);
  }, [redlineMode]);

  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotes?.notes ?? [];

  return {
    redlineMode,
    mobileIndex,
    setMobileIndex,
    handleExit,
    handleScrollToAnchor,
    redlineNotes,
  };
}
```

#### 2. Update AIHighlightsVignette
**File**: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`

Replace lines 174-194 with:

```typescript
import { useDesignNotesSetup } from '@/components/vignettes/shared/useDesignNotesSetup';

export default function AIHighlightsVignette() {
  const {
    redlineMode,
    mobileIndex,
    setMobileIndex,
    handleExit,
    handleScrollToAnchor,
    redlineNotes,
  } = useDesignNotesSetup(aiHighlightsContent.designNotes);

  return (
    // ... rest unchanged, but remove accent prop from child components
  );
}
```

Remove the following imports (no longer needed directly in the main export):
- `useState` (if only used for mobileIndex)
- `useCallback` (if only used for handleScrollToAnchor)

#### 3. Update All Other Vignettes
Apply same pattern to:
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
- `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- `src/components/vignettes/home-connect/HomeConnectVignette.tsx`

#### 4. Update Existing Shared Components to Use Constant
**Files to update**:
- `src/components/vignettes/shared/RedlineOverlay.tsx` - import `DESIGN_NOTES_ACCENT`, remove `accent` prop
- `src/components/vignettes/shared/MobileRedlineTour.tsx` - import `DESIGN_NOTES_ACCENT`, remove `accent` prop
- `src/components/vignettes/shared/MobileRedlineMarkers.tsx` - import `DESIGN_NOTES_ACCENT`, remove `accent` prop

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [ ] Each vignette with redline mode works correctly
- [ ] Mobile redline tour functions properly
- [ ] Design notes toggle on/off correctly

**Implementation Note**: Pause after Phase 2 for verification before proceeding.

---

## Phase 3: Create StageIndicator Component

### Overview
Extract the identical 18-line stage indicator used in 5 vignettes.

### Changes Required:

#### 1. Create StageIndicator Component
**File**: `src/components/vignettes/shared/StageIndicator.tsx`

```typescript
'use client';

import { VignetteStage } from '@/lib/vignette-stage-context';

interface StageIndicatorProps {
  stage: VignetteStage;
  onStageChange: (stage: VignetteStage) => void;
}

export default function StageIndicator({ stage, onStageChange }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-gray-400 select-none">
      <button
        onClick={() => onStageChange('problem')}
        className={`hover:text-gray-500 transition-colors ${stage === 'problem' ? 'text-gray-600' : ''}`}
      >
        Problem
      </button>
      <span className={`w-2 h-2 rounded-full ${stage === 'problem' ? 'bg-gray-600' : 'bg-gray-300'}`} />
      <span className="w-6 h-px bg-gray-300" />
      <span className={`w-2 h-2 rounded-full ${stage === 'solution' ? 'bg-gray-600' : 'bg-gray-300'}`} />
      <button
        onClick={() => onStageChange('solution')}
        className={`hover:text-gray-500 transition-colors ${stage === 'solution' ? 'text-gray-600' : ''}`}
      >
        Solution
      </button>
    </div>
  );
}
```

#### 2. Update Vignettes to Use StageIndicator

In each of the 5 vignettes, replace the stage indicator JSX block with:

```typescript
import StageIndicator from '@/components/vignettes/shared/StageIndicator';

// In the component:
<StageIndicator stage={stage} onStageChange={setStage} />
```

**Files to update**:
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx` (lines 69-86)
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx` (lines 65-82)
- `src/components/vignettes/prototyping/PrototypingVignette.tsx` (lines 41-58)
- `src/components/vignettes/multilingual/MultilingualVignette.tsx` (lines ~81-98)
- `src/components/vignettes/home-connect/HomeConnectContent.tsx` (lines ~78-94)

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [ ] Stage indicator appears correctly in all vignettes
- [ ] Clicking Problem/Solution switches stages
- [ ] Active state styling works correctly

**Implementation Note**: Pause after Phase 3 for verification before proceeding.

---

## Phase 4: Create AnimatedStageText Component

### Overview
Extract the 50+ line animated title/description pattern used in 5 vignettes.

### Changes Required:

#### 1. Create AnimatedStageText Component
**File**: `src/components/vignettes/shared/AnimatedStageText.tsx`

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { VignetteStage } from '@/lib/vignette-stage-context';

interface AnimatedStageTextProps {
  stage: VignetteStage;
  text: string | undefined;
  isLoading?: boolean;
  reducedMotion?: boolean;
  delay?: number;
}

export default function AnimatedStageText({
  stage,
  text,
  isLoading = false,
  reducedMotion = false,
  delay = 0,
}: AnimatedStageTextProps) {
  return (
    <span className="relative block">
      <AnimatePresence mode="sync" initial={false}>
        <motion.span
          key={stage}
          className="block"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.3 : 1 }}
          exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.2,
            ease: "easeOut",
            delay: reducedMotion ? 0 : delay,
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
```

#### 2. Update Vignettes to Use AnimatedStageText

**Example for AIHighlightsVignette** (lines 88-118 become):

```typescript
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';

// In title prop:
title={
  <div className="space-y-4">
    <StageIndicator stage={stage} onStageChange={setStage} />
    <AnimatedStageText
      stage={stage}
      text={title}
      isLoading={isLoading}
      reducedMotion={reducedMotion}
    />
  </div>
}

// In description prop:
description={
  <AnimatedStageText
    stage={stage}
    text={description}
    isLoading={isLoading}
    reducedMotion={reducedMotion}
    delay={0.05}
  />
}
```

**Files to update**:
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
- `src/components/vignettes/prototyping/PrototypingVignette.tsx`
- `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- `src/components/vignettes/home-connect/HomeConnectContent.tsx`

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [ ] Title and description animate smoothly on stage change
- [ ] Loading state (dimmed text) works correctly
- [ ] Reduced motion preference is respected

**Implementation Note**: Pause after Phase 4 for verification before proceeding.

---

## Phase 5: Create Remaining Shared Utilities

### Overview
Extract remaining smaller shared patterns.

### Changes Required:

#### 1. Create useLoadingTransition Hook
**File**: `src/components/vignettes/shared/useLoadingTransition.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';

interface UseLoadingTransitionOptions {
  duration: number;
  onComplete: () => void;
}

export function useLoadingTransition({ duration, onComplete }: UseLoadingTransitionOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const startTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, duration);
  }, [duration, onComplete]);

  return { isLoading, startTransition };
}
```

#### 2. Create useAnchorStyle Hook
**File**: `src/components/vignettes/shared/useAnchorStyle.ts`

Note: Uses hardcoded accent color and unifies box-shadow opacity to 0.2 (20%) across all vignettes.

```typescript
'use client';

import { useCallback } from 'react';
import type { CSSProperties } from 'react';

interface UseAnchorStyleOptions {
  redlineModeActive: boolean;
  focusedAnchor: string | null;
}

// Hardcoded: rgba(239, 68, 68, 0.2) = #ef4444 at 20% opacity
const BOX_SHADOW_COLOR = 'rgba(239, 68, 68, 0.2)';

export function useAnchorStyle({
  redlineModeActive,
  focusedAnchor,
}: UseAnchorStyleOptions) {
  const getAnchorStyle = useCallback(
    (anchorName: string): CSSProperties => ({
      anchorName: `--${anchorName}`,
      opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
      boxShadow: focusedAnchor === anchorName ? `0 0 0 2px ${BOX_SHADOW_COLOR}` : 'none',
      transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
    } as CSSProperties),
    [redlineModeActive, focusedAnchor]
  );

  return { getAnchorStyle };
}
```

#### 3. Create DesignNotesButton Component
**File**: `src/components/vignettes/shared/DesignNotesButton.tsx`

```typescript
'use client';

import { DESIGN_NOTES_ACCENT } from './constants';

interface DesignNotesButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function DesignNotesButton({
  isActive,
  onToggle,
}: DesignNotesButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
      style={{
        backgroundColor: isActive ? `${DESIGN_NOTES_ACCENT}12` : 'white',
        borderColor: isActive ? `${DESIGN_NOTES_ACCENT}50` : undefined,
        color: isActive ? DESIGN_NOTES_ACCENT : undefined,
      }}
    >
      <span
        className="material-icons-outlined text-[18px]"
        style={{ color: isActive ? DESIGN_NOTES_ACCENT : '#0f172a' }}
      >
        {isActive ? 'close' : 'edit'}
      </span>
      {isActive ? 'Hide design details' : 'Show design details'}
    </button>
  );
}
```

#### 4. Update Panel Components to Use useAnchorStyle
**Files to update**:
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx` (lines 287-292)
- `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`
- `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`

#### 5. Update Vignettes to Use useLoadingTransition and DesignNotesButton

Replace loading transition pattern and button in:
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
- `src/components/vignettes/prototyping/PrototypingVignette.tsx`
- `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- `src/components/vignettes/home-connect/HomeConnectContent.tsx`

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`
- [ ] TypeScript passes: `npx tsc --noEmit`

#### Manual Verification:
- [ ] Loading transitions work correctly
- [ ] Design notes button toggles properly
- [ ] Anchor highlighting works on desktop

**Implementation Note**: Pause after Phase 5 for verification before proceeding.

---

## Phase 6: Homepage Cleanup

### Overview
Extract duplicate section header pattern from homepage.

### Changes Required:

#### 1. Create SectionHeader Component
**File**: `src/components/SectionHeader.tsx`

```typescript
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  children: ReactNode;
}

export default function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto border-t border-gray-200/80 pt-10 lg:pt-12 space-y-3">
        <h2 className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
```

#### 2. Update Homepage
**File**: `src/app/page.tsx`

Replace lines 27-42 and 55-66 with:

```typescript
import SectionHeader from '@/components/SectionHeader';

// Selected Work section:
<SectionHeader title="Selected Work">
  <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
    Product design at Culture Amp
  </p>
  <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
    I&apos;m a big believer in showing rather than telling, so I prototype until ideas feel
    real. Click through and play with each feature—these vignettes are built to be tried, not
    just read about.
  </p>
</SectionHeader>

// Explorations section:
<SectionHeader title="Explorations">
  <p className="text-[18px] leading-[1.7] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)] max-w-3xl">
    Personal products I design and build end-to-end. These projects help me
    understand technology at a deeper level while exploring entrepreneurial ideas.
  </p>
</SectionHeader>
```

### Success Criteria:

#### Automated Verification:
- [ ] Build passes: `npm run build`

#### Manual Verification:
- [ ] Homepage sections display correctly
- [ ] Typography and spacing unchanged

---

## Testing Strategy

### Unit Tests
Not applicable - this is a refactoring that should not change behavior.

### Integration Tests
Not applicable - no test infrastructure in this project.

### Manual Testing Steps
1. Run `npm run dev` and verify homepage loads
2. Test each vignette's Problem -> Solution transition
3. Test redline/design notes toggle on each applicable vignette
4. Test mobile redline tour navigation
5. Verify stage indicator clicks work
6. Check reduced motion preference is respected
7. Verify no console errors or warnings

## Performance Considerations

- No performance impact expected - only code organization changes
- Bundle size may slightly decrease due to removed dead code

---

## Files Changed Summary

**New files (9):**
- `src/components/vignettes/shared/constants.ts`
- `src/components/vignettes/shared/StageIndicator.tsx`
- `src/components/vignettes/shared/AnimatedStageText.tsx`
- `src/components/vignettes/shared/DesignNotesButton.tsx`
- `src/components/vignettes/shared/useLoadingTransition.ts`
- `src/components/vignettes/shared/useAnchorStyle.ts`
- `src/components/vignettes/shared/useDesignNotesSetup.ts`
- `src/components/vignettes/shared/design-notes.css` (moved)
- `src/components/SectionHeader.tsx`

**Deleted files (2):**
- `src/components/demos/Button.tsx`
- `src/components/demos/IterationsPanel.tsx`

**Modified files (15):**
- `src/lib/animations.ts` (remove unused presets)
- `src/components/vignettes/VignetteStaged.tsx` (import StageContent from types)
- `src/components/vignettes/shared/RedlineOverlay.tsx` (use DESIGN_NOTES_ACCENT, remove accent prop)
- `src/components/vignettes/shared/MobileRedlineTour.tsx` (use DESIGN_NOTES_ACCENT, remove accent prop)
- `src/components/vignettes/shared/MobileRedlineMarkers.tsx` (use DESIGN_NOTES_ACCENT, remove accent prop)
- `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- `src/components/vignettes/ai-highlights/HighlightsPanel.tsx`
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
- `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`
- `src/components/vignettes/prototyping/PrototypingVignette.tsx`
- `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`
- `src/components/vignettes/home-connect/HomeConnectVignette.tsx`
- `src/components/vignettes/home-connect/HomeConnectContent.tsx`
- `src/app/page.tsx`

## References

- Original planning: `/home/idam/.claude/plans/hazy-nibbling-book.md`
- Main vignette pattern: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- Shared components location: `src/components/vignettes/shared/`
