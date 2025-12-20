# Multilingual Vignette VignetteStaged Refactor

## Overview

Refactor the Multilingual vignette from a simple VignetteSplit layout to the full VignetteStaged pattern, adding Problem → Solution staged reveal and redline design annotations. This brings the Multilingual vignette in line with the AI Highlights, AI Suggestions, and Prototyping vignettes.

## Current State Analysis

The Multilingual vignette currently:
- Uses only `VignetteSplit` (no `VignetteStaged` wrapper)
- Has a single static view with `TranslationManagementPanel`
- Panel manages internal state for translation simulation (idle → translating → complete)
- No problem/solution staged reveal
- No design annotations

### Key Files:
- `src/components/vignettes/multilingual/MultilingualVignette.tsx` (30 lines)
- `src/components/vignettes/multilingual/TranslationManagementPanel.tsx` (180 lines)
- `src/components/vignettes/multilingual/content.ts` (104 lines)

## Desired End State

After implementation:
1. Vignette follows Problem → Solution staged pattern
2. Problem stage shows 3 cascading language cards (French, Spanish, Dhivehi) with empty fields
3. Solution stage shows enhanced TranslationManagementPanel with pre-filled translation
4. "Show design details" button reveals 3 redline annotations on desktop
5. Mobile users see bottom sheet tour for design notes

### Verification:
- [ ] Problem stage displays cascading cards correctly
- [ ] CTA transitions to solution with loading animation
- [ ] Solution shows completed translation state
- [ ] Redline overlay displays 3 annotations on desktop (1024px+)
- [ ] Mobile bottom sheet tour works
- [ ] Stage indicator allows navigation between Problem/Solution

## What We're NOT Doing

- Not implementing the designNotes stage (just redline annotations on solution)
- Not changing the translation simulation logic (only initial state)
- Not modifying shared vignette components
- Not adding new CSS files (reusing `design-notes.css` from ai-highlights)

## Implementation Approach

Follow the AI Highlights vignette pattern exactly, adapting for Multilingual's specific content.

---

## Phase 1: Update content.ts with Stage and Design Notes Data

### Overview
Add all required data structures for staged vignette pattern.

### Changes Required:

#### 1. Add imports and type definitions
**File**: `src/components/vignettes/multilingual/content.ts`

```typescript
import { DesignNote, VignetteStages } from '../types';

interface ProblemCard {
  code: string;
  name: string;
  cycleNumber: number;
}

interface MultilingualContent {
  // ... existing fields
  stages: VignetteStages;
  designNotes: {
    accent: string;
    notes: DesignNote[];
  };
  problemCards: ProblemCard[];
}
```

#### 2. Add stages configuration
```typescript
stages: {
  problem: {
    title: 'Each language required a separate performance review cycle',
    description: '',
    cta: 'Show the solution'
  },
  solution: {
    title: 'Designed a simple way to bring multiple languages into a single cycle',
    description: 'This was a milestone for me. I incorporated my native language, Dhivehi, into my work for the first time. I designed a flexible translation workflow that supports three input methods: manual editing for quick tweaks, CSV uploads for translation agencies, and machine translation for speed.'
  }
}
```

#### 3. Add design notes
```typescript
designNotes: {
  accent: '#0168b3',  // Blue accent matching translation theme
  notes: [
    {
      id: 'unified-cycle',
      label: 'Single unified cycle',
      detail: 'All languages share one performance cycle. Eliminates duplicate setup and parallel admin work.',
      anchor: 'language-dropdown',
      position: 'right' as const
    },
    {
      id: 'ai-translate',
      label: 'AI translation placement',
      detail: 'Auto-translate button placed prominently with the language selector. Contextual placement reduces cognitive load.',
      anchor: 'auto-translate-btn',
      position: 'right' as const
    },
    {
      id: 'source-reference',
      label: 'Source text reference',
      detail: 'English source text displayed below each field so translators have full context without switching screens.',
      anchor: 'source-text',
      position: 'left' as const
    }
  ]
}
```

#### 4. Add problem cards data
```typescript
problemCards: [
  { code: 'fr', name: 'French', cycleNumber: 1 },
  { code: 'es', name: 'Spanish', cycleNumber: 2 },
  { code: 'dv', name: 'Dhivehi', cycleNumber: 3 }
]
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors: `npm run build`
- [x] No linting errors in content.ts

#### Manual Verification:
- [x] N/A (data only, no visual changes yet)

---

## Phase 2: Create ProblemPanel Component

### Overview
Create new component showing 3 cascading language cards representing separate cycles.

### Changes Required:

#### 1. Create ProblemPanel.tsx
**File**: `src/components/vignettes/multilingual/ProblemPanel.tsx` (new file)

```typescript
'use client';

import { motion } from 'framer-motion';
import { multilingualContent } from './content';

interface ProblemPanelProps {
  onTransition: () => void;
}

// Cascading card positions (offset, rotation for stacked effect)
const cardPositions = [
  { x: 0, y: 0, rotate: -2, zIndex: 3 },      // French (front)
  { x: 16, y: 12, rotate: 1, zIndex: 2 },     // Spanish (middle)
  { x: 32, y: 24, rotate: 3, zIndex: 1 },     // Dhivehi (back)
];

function LanguageCycleCard({
  card,
  position,
  index
}: {
  card: { code: string; name: string; cycleNumber: number };
  position: typeof cardPositions[0];
  index: number;
}) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      style={{
        zIndex: position.zIndex,
      }}
      initial={{ opacity: 0, x: position.x - 20, y: position.y + 20, rotate: position.rotate }}
      animate={{ opacity: 1, x: position.x, y: position.y, rotate: position.rotate }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-gray-900">{card.name}</span>
        </div>
        <span className="text-[12px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
          Cycle {card.cycleNumber} of 3
        </span>
      </div>

      {/* Empty translation field */}
      <div className="space-y-2">
        <label className="text-[12px] text-gray-500">Performance review question</label>
        <div className="h-[60px] border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-[13px] text-gray-400 italic">Awaiting translation...</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const { problemCards } = multilingualContent;

  return (
    <div className="relative">
      {/* Cards container with fixed height for stacking */}
      <div className="relative h-[200px] mb-8">
        {problemCards.map((card, index) => (
          <LanguageCycleCard
            key={card.code}
            card={card}
            position={cardPositions[index]}
            index={index}
          />
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={onTransition}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-[15px]"
        style={{ backgroundColor: '#0168b3' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="material-icons-outlined text-[18px]">auto_awesome</span>
        Show the solution
      </motion.button>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] File exists at correct path

#### Manual Verification:
- [ ] Cards display with cascading effect
- [ ] Each card shows language name and cycle number
- [ ] Empty field placeholder visible
- [ ] CTA button appears and is clickable

---

## Phase 3: Modify TranslationManagementPanel for Redline Mode

### Overview
Add data-anchor attributes and redline mode support to the solution panel. Also fix layout cramping by reducing button sizes.

### Changes Required:

#### 1. Fix button sizing (layout jank)
Reduce button sizes from 48px height to 36px, and reduce text/padding proportionally:

**Auto translate button** (line ~100-117):
```typescript
// Before: h-[48px] px-[22px] text-[18px]
// After:
className="bg-[#0168b3] hover:bg-[#015a99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[14px] leading-[20px] h-[36px] px-[14px] py-[8px] rounded-[6px] flex items-center gap-1.5 transition-colors"
```

**Import XLSX button** (line ~118-123):
```typescript
// Before: h-[48px] px-[10px] text-[16px]
// After:
className="text-[#0168b3] hover:bg-gray-50 font-medium text-[14px] leading-[20px] h-[36px] px-[10px] py-[8px] rounded-[6px] flex items-center gap-1.5 transition-colors"
```

**Icon sizes**: Reduce from `w-5 h-5` to `w-4 h-4`

#### 2. Update props interface
**File**: `src/components/vignettes/multilingual/TranslationManagementPanel.tsx`

```typescript
interface TranslationManagementPanelProps {
  className?: string;
  initialComplete?: boolean;           // NEW: Start in complete state
  redlineModeActive?: boolean;          // NEW: Redline mode active
  focusedAnchor?: string | null;        // NEW: Which anchor is focused
}
```

#### 2. Add getAnchorStyle helper
```typescript
const getAnchorStyle = (anchorName: string): React.CSSProperties => ({
  anchorName: `--${anchorName}`,
  opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
  boxShadow: focusedAnchor === anchorName ? '0 0 0 2px rgba(1, 104, 179, 0.2)' : 'none',
  transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
} as React.CSSProperties);
```

#### 3. Add data-anchor attributes to key elements

On language dropdown wrapper:
```typescript
<div
  className="flex flex-col gap-1.5 w-full sm:w-[240px] relative"
  style={getAnchorStyle('language-dropdown')}
  data-anchor="language-dropdown"
>
```

On auto-translate button:
```typescript
<motion.button
  style={getAnchorStyle('auto-translate-btn')}
  data-anchor="auto-translate-btn"
  // ... existing props
>
```

On source text reference area:
```typescript
<div
  className="flex items-start gap-2"
  style={getAnchorStyle('source-text')}
  data-anchor="source-text"
>
```

#### 4. Initialize in complete state when requested
```typescript
const [translationState, setTranslationState] = useState<TranslationState>(
  initialComplete ? 'complete' : 'idle'
);

// Don't auto-reset when initialComplete is true
useEffect(() => {
  if (translationState === 'complete' && !initialComplete) {
    const timer = setTimeout(() => setTranslationState('idle'), 8000);
    return () => clearTimeout(timer);
  }
}, [translationState, initialComplete]);
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No prop type errors

#### Manual Verification:
- [ ] Panel accepts new props without breaking existing behavior
- [ ] data-anchor attributes visible in DOM inspector
- [ ] Opacity changes when redline mode is active and anchor is focused/unfocused

---

## Phase 4: Refactor MultilingualVignette with VignetteStaged

### Overview
Complete refactor to use VignetteStaged pattern with stage transitions and redline overlay.

### Changes Required:

**File**: `src/components/vignettes/multilingual/MultilingualVignette.tsx`

Replace entire file with:

```typescript
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationManagementPanel from './TranslationManagementPanel';
import ProblemPanel from './ProblemPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { multilingualContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';
import '../ai-highlights/design-notes.css';

type PanelStage = 'problem' | 'loading' | 'solution';

function MultilingualContent({
  redlineNotes,
  accent,
  redlineMode,
  mobileIndex,
  onMobileIndexChange,
}: {
  redlineNotes: DesignNote[];
  accent: string;
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}) {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [isLoading, setIsLoading] = useState(false);
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  const panelStage: PanelStage = isLoading ? 'loading' : (stage === 'problem' ? 'problem' : 'solution');

  const handleTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToSolution();
    }, 1500);
  }, [goToSolution]);

  const currentStageContent = stage === 'problem'
    ? multilingualContent.stages.problem
    : multilingualContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

  const focusedAnchor = redlineMode.focusedAnnotation
    ? redlineNotes.find(n => n.id === redlineMode.focusedAnnotation)?.anchor ?? null
    : null;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          {/* Stage Indicator */}
          <div className="flex items-center gap-1.5 text-[13px] text-gray-400 select-none">
            <button
              onClick={() => setStage('problem')}
              className={`hover:text-gray-500 transition-colors ${stage === 'problem' ? 'text-gray-600' : ''}`}
            >
              Problem
            </button>
            <span className={`w-2 h-2 rounded-full ${stage === 'problem' ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <span className="w-6 h-px bg-gray-300" />
            <span className={`w-2 h-2 rounded-full ${stage === 'solution' ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <button
              onClick={() => setStage('solution')}
              className={`hover:text-gray-500 transition-colors ${stage === 'solution' ? 'text-gray-600' : ''}`}
            >
              Solution
            </button>
          </div>

          <span className="relative block">
            <AnimatePresence mode="sync" initial={false}>
              <motion.span
                key={stage}
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0.3 : 1 }}
                exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {title}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      }
      description={
        <span className="relative block">
          <AnimatePresence mode="sync" initial={false}>
            <motion.span
              key={stage}
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0.3 : 1 }}
              exit={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut", delay: reducedMotion ? 0 : 0.05 }}
            >
              {description}
            </motion.span>
          </AnimatePresence>
        </span>
      }
      actions={
        stage === 'solution' && (
          <button
            onClick={redlineMode.toggleRedlineMode}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            style={{
              backgroundColor: redlineMode.isActive ? `${accent}12` : 'white',
              borderColor: redlineMode.isActive ? `${accent}50` : undefined,
              color: redlineMode.isActive ? '#0369a1' : undefined
            }}
          >
            <span className="material-icons-outlined text-[18px]" style={{ color: redlineMode.isActive ? accent : '#0f172a' }}>
              {redlineMode.isActive ? 'close' : 'edit'}
            </span>
            {redlineMode.isActive ? 'Hide design details' : 'Show design details'}
          </button>
        )
      }
    >
      <motion.div
        className="relative"
        style={{ overflow: 'visible' }}
        animate={redlineMode.isActive ? animations.panelTransform.active : animations.panelTransform.inactive}
        transition={animations.panelTransform.transition}
      >
        <AnimatePresence mode="wait">
          {panelStage === 'problem' && (
            <motion.div
              key="problem"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProblemPanel onTransition={handleTransition} />
            </motion.div>
          )}
          {panelStage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center py-16"
            >
              <div className="flex items-center gap-3 text-gray-500">
                <span className="material-icons-outlined text-[24px] animate-spin">autorenew</span>
                <span className="text-[15px]">Unifying cycles...</span>
              </div>
            </motion.div>
          )}
          {panelStage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TranslationManagementPanel
                initialComplete
                redlineModeActive={redlineMode.isActive}
                focusedAnchor={focusedAnchor}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop annotations */}
        <RedlineOverlay
          isActive={redlineMode.isActive && stage === 'solution'}
          notes={redlineNotes}
          accent={accent}
          focusedAnnotation={redlineMode.focusedAnnotation}
          onFocusAnnotation={redlineMode.setFocusedAnnotation}
        />

        {/* Mobile markers */}
        {redlineMode.isActive && stage === 'solution' && (
          <MobileRedlineMarkers
            notes={redlineNotes}
            accent={accent}
            currentIndex={mobileIndex}
            onMarkerClick={onMobileIndexChange}
          />
        )}
      </motion.div>
    </VignetteSplit>
  );
}

export default function MultilingualVignette() {
  const designNotes = multilingualContent.designNotes;
  const redlineMode = useRedlineMode();
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleExit = () => {
    redlineMode.exitRedlineMode();
    setMobileIndex(0);
  };

  const handleScrollToAnchor = useCallback((anchor: string) => {
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const redlineNotes = designNotes?.notes ?? [];
  const accent = designNotes?.accent ?? '#0168b3';

  return (
    <VignetteContainer id="multilingual" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={multilingualContent.stages}>
            <MultilingualContent
              redlineNotes={redlineNotes}
              accent={accent}
              redlineMode={redlineMode}
              mobileIndex={mobileIndex}
              onMobileIndexChange={setMobileIndex}
            />
          </VignetteStaged>
        </motion.div>
      </div>

      {/* Mobile bottom sheet tour */}
      <MobileRedlineTour
        isActive={redlineMode.isActive}
        notes={redlineNotes}
        accent={accent}
        onExit={handleExit}
        currentIndex={mobileIndex}
        onIndexChange={setMobileIndex}
        onScrollToAnchor={handleScrollToAnchor}
      />
    </VignetteContainer>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Dev server runs: `npm run dev`
- [ ] No console errors on page load

#### Manual Verification:
- [ ] Problem stage shows cascading cards
- [ ] Clicking CTA shows loading state briefly
- [ ] Solution reveals translation panel with completed translation
- [ ] Stage indicator dots reflect current stage
- [ ] Clicking Problem/Solution in indicator navigates between stages
- [ ] "Show design details" button appears in solution stage
- [ ] Clicking design details shows 3 annotations on desktop
- [ ] Annotations point to correct elements (dropdown, button, source text)
- [ ] Hovering annotations highlights corresponding element
- [ ] Mobile shows bottom sheet tour instead of overlay
- [ ] Reduced motion preferences respected

---

## Testing Strategy

### Manual Testing Steps:
1. Navigate to homepage and scroll to Multilingual vignette
2. Verify Problem stage shows 3 cascading cards
3. Click "Show the solution" CTA
4. Verify loading animation appears briefly
5. Verify Solution stage shows completed translation
6. Click "Show design details" button
7. Verify 3 annotations appear on desktop
8. Hover each annotation and verify element highlighting
9. Resize to mobile and verify bottom sheet appears
10. Navigate between annotations using bottom sheet
11. Click stage indicator to switch between Problem/Solution
12. Verify animations work smoothly

### Accessibility Testing:
- Enable "Reduce motion" in OS settings
- Verify animations are reduced/disabled
- Test keyboard navigation through annotations

## References

- Primary pattern: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- Stage context: `src/lib/vignette-stage-context.tsx`
- Redline components: `src/components/vignettes/shared/`
- Types: `src/components/vignettes/types.ts`
