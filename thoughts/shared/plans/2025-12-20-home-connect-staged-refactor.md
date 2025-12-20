# HomeConnect Vignette Staged Refactor Implementation Plan

## Overview

Refactor the HomeConnect vignette from a simple VignetteSplit layout to a full staged presentation (Problem → Transition → Solution) with design notes, matching the established Multilingual vignette pattern.

## Current State Analysis

The HomeConnect vignette is the simplest in the portfolio:
- Uses only `VignetteSplit` with no stage management
- 200-line `HomeConnectPanel.tsx` with hardcoded content
- Minimal 13-line `content.ts` with just title/description
- No design notes, no staged flow, no transition animation

### Key Files:
- `src/components/vignettes/home-connect/HomeConnectVignette.tsx` (32 lines)
- `src/components/vignettes/home-connect/HomeConnectPanel.tsx` (200 lines)
- `src/components/vignettes/home-connect/content.ts` (13 lines)

## Desired End State

A fully staged HomeConnect vignette with:
1. **Problem stage**: Empty state showing a directionless homepage with no clear vision
2. **Transition stage**: Fragments (Goals, Performance, Surveys, 1-on-1s) consolidating into a unified feed
3. **Solution stage**: The existing feed mockup with design note anchors
4. **Design notes**: Progressive disclosure and Visual cohesion annotations

### Verification:
- All three stages render and transition smoothly
- Design notes appear on desktop and mobile
- Stage indicator allows navigation between Problem/Solution
- Transition animation completes with staggered fragment movement
- `npm run build` passes without errors

## What We're NOT Doing

- Not changing the visual design of the solution panel (HomeConnectPanel)
- Not adding new feed items or changing the mockup content
- Not implementing Design Notes stage toggle (only Problem/Solution indicators)
- Not adding loading states beyond the transition animation

---

## Phase 1: Content Layer

### Overview
Extract all hardcoded content from HomeConnectPanel and create comprehensive content.ts with stages, design notes, and transition data.

### Changes Required:

#### 1. content.ts (Rewrite)
**File**: `src/components/vignettes/home-connect/content.ts`
**Changes**: Complete rewrite with full type definitions and content

```typescript
import { DesignNote, VignetteStages } from '../types';

interface TransitionFragment {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface TransitionContent {
  fragments: TransitionFragment[];
  ctaLabel: string;
  ctaLoadingLabel: string;
  continueLabel: string;
}

interface FeedItem {
  id: string;
  type: 'performance' | 'oneOnOne' | 'goal';
  title: string;
  subtitle?: string;
  progress?: number;
  avatar?: { initials: string };
  alert?: { message: string; color: string };
  goalText?: string;
}

interface FeedSection {
  label: string;
  items: FeedItem[];
}

export interface HomeConnectContent {
  title: string;
  description: string;
  stages: VignetteStages;
  designNotes: {
    accent: string;
    notes: DesignNote[];
  };
  transitionContent: TransitionContent;
  feedSections: FeedSection[];
}

export const homeConnectContent: HomeConnectContent = {
  title: 'Created a cohesive homepage system to bring all of Culture Amp into one place',
  description: "A centralized navigation hub that reduced platform fragmentation and improved feature discoverability across Culture Amp's product suite.",

  stages: {
    problem: {
      title: 'There was no clear vision for what Culture Amp\'s homepage should be',
      description: '',
      cta: 'Show the solution'
    },
    solution: {
      title: 'Designed a system to show user\'s their world of work',
      description: 'A unified feed centered around you and your direct reports. Performance, goals, surveys, and 1-on-1s in one place.'
    }
  },

  designNotes: {
    accent: '#5F3361',
    notes: [
      {
        id: 'progressive-disclosure',
        label: 'Progressive disclosure',
        detail: 'Feed items show just enough context at a glance. Details expand on interaction, reducing cognitive load.',
        anchor: 'feed-card-performance',
        position: 'right' as const
      },
      {
        id: 'visual-cohesion',
        label: 'Visual cohesion',
        detail: 'Consistent card structure with type-specific accents. Each module retains identity while feeling unified.',
        anchor: 'feed-card-goal',
        position: 'left' as const
      }
    ]
  },

  transitionContent: {
    fragments: [
      { id: 'goals', icon: 'flag', label: 'Goals', color: '#FFB600' },
      { id: 'performance', icon: 'trending_up', label: 'Performance', color: '#5F3361' },
      { id: 'surveys', icon: 'poll', label: 'Surveys', color: '#0168b3' },
      { id: 'oneOnOnes', icon: 'people', label: '1-on-1s', color: '#10B981' }
    ],
    ctaLabel: 'Consolidate into feed',
    ctaLoadingLabel: 'Building feed...',
    continueLabel: 'See unified home'
  },

  feedSections: [
    {
      label: 'Upcoming',
      items: [
        {
          id: 'perf-1',
          type: 'performance',
          title: '2023 Performance Cycle',
          subtitle: 'feedback closes in 3 days',
          progress: 80
        },
        {
          id: 'oneOnOne-1',
          type: 'oneOnOne',
          title: 'Aisha Patel',
          subtitle: '1-on-1 today',
          avatar: { initials: 'AP' },
          alert: {
            message: 'Wellbeing has gone down since last 1-on-1',
            color: '#A82433'
          }
        }
      ]
    },
    {
      label: 'Recent',
      items: [
        {
          id: 'goal-1',
          type: 'goal',
          title: 'Malik Williams',
          subtitle: 'has an inactive goal',
          avatar: { initials: 'MW' },
          progress: 25,
          goalText: 'Learn how to handle multiple priorities'
        }
      ]
    }
  ]
};
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No type errors in content.ts

#### Manual Verification:
- [ ] Content structure matches existing panel content

---

## Phase 2: Problem Panel

### Overview
Create ProblemPanel showing an empty, directionless homepage representing lack of vision.

### Changes Required:

#### 1. ProblemPanel.tsx (Create)
**File**: `src/components/vignettes/home-connect/ProblemPanel.tsx`
**Changes**: New component showing sparse empty state

```typescript
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface ProblemPanelProps {
  onTransition: () => void;
}

export default function ProblemPanel({ onTransition }: ProblemPanelProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#F9F9F9] rounded-xl overflow-hidden">
      {/* Purple header - same as solution */}
      <div className="bg-[#5F3361] px-5 pt-4 pb-4 relative">
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-[11px] font-semibold">Culture Amp</span>
        </div>
        <h1 className="text-white text-[22px] font-bold leading-tight !m-0">Home</h1>
      </div>

      {/* Empty content area */}
      <div className="px-5 py-8 space-y-4">
        <motion.p
          className="text-[15px] text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.3 }}
        >
          Welcome back
        </motion.p>

        {/* Empty placeholder cards */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-12 bg-gray-100 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: reducedMotion ? 0 : 0.4 + i * 0.1 }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={onTransition}
          className="w-full mt-4 py-3 px-4 rounded-xl text-white font-medium text-[15px] flex items-center justify-center gap-2"
          style={{ backgroundColor: '#5F3361' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          See the solution
          <span className="material-icons-outlined text-[18px]">arrow_forward</span>
        </motion.button>
      </div>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Component renders without errors

#### Manual Verification:
- [ ] Empty state visually conveys "no direction"
- [ ] CTA button triggers transition

---

## Phase 3: Transition Panel

### Overview
Create TransitionPanel with fragments consolidating animation.

### Changes Required:

#### 1. TransitionPanel.tsx (Create)
**File**: `src/components/vignettes/home-connect/TransitionPanel.tsx`
**Changes**: New component with fragment consolidation animation

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { homeConnectContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface TransitionPanelProps {
  onComplete: () => void;
}

type TransitionState = 'ready' | 'consolidating' | 'complete';

// Scattered positions for fragments (relative to center)
const fragmentPositions = [
  { x: -80, y: -60, rotate: -8 },
  { x: 80, y: -40, rotate: 6 },
  { x: -70, y: 60, rotate: -4 },
  { x: 90, y: 50, rotate: 10 }
];

export default function TransitionPanel({ onComplete }: TransitionPanelProps) {
  const { transitionContent } = homeConnectContent;
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<TransitionState>('ready');

  const staggerDelay = reducedMotion ? 50 : 200;
  const fragmentCount = transitionContent.fragments.length;

  const handleConsolidate = useCallback(() => {
    if (state !== 'ready') return;
    setState('consolidating');
  }, [state]);

  useEffect(() => {
    if (state !== 'consolidating') return;

    const completeTimer = setTimeout(() => {
      setState('complete');
    }, staggerDelay * fragmentCount + 600);

    return () => clearTimeout(completeTimer);
  }, [state, staggerDelay, fragmentCount]);

  return (
    <div className="w-full bg-[#F9F9F9] rounded-xl overflow-hidden">
      {/* Purple header */}
      <div className="bg-[#5F3361] px-5 pt-4 pb-4 relative">
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-[11px] font-semibold">Culture Amp</span>
        </div>
        <h1 className="text-white text-[22px] font-bold leading-tight !m-0">Home</h1>
      </div>

      {/* Fragments area */}
      <div className="relative h-[280px] flex items-center justify-center">
        {transitionContent.fragments.map((fragment, index) => (
          <motion.div
            key={fragment.id}
            className="absolute flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md"
            initial={{
              x: fragmentPositions[index].x,
              y: fragmentPositions[index].y,
              rotate: fragmentPositions[index].rotate,
              scale: 1,
              opacity: 1
            }}
            animate={
              state === 'consolidating' || state === 'complete'
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: state === 'complete' ? 0 : 0.9,
                    opacity: state === 'complete' ? 0 : 1
                  }
                : undefined
            }
            transition={{
              delay: state === 'consolidating' ? index * (staggerDelay / 1000) : 0,
              duration: reducedMotion ? 0.2 : 0.5,
              ease: 'easeInOut'
            }}
          >
            <span
              className="material-icons-outlined text-[20px]"
              style={{ color: fragment.color }}
            >
              {fragment.icon}
            </span>
            <span className="text-[14px] font-medium text-gray-800">{fragment.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Action button */}
      <div className="px-5 pb-5">
        <AnimatePresence mode="wait">
          {state === 'complete' ? (
            <motion.button
              key="continue"
              onClick={onComplete}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-[15px]"
              style={{ backgroundColor: '#5F3361' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {transitionContent.continueLabel}
              <span className="material-icons-outlined text-[18px]">arrow_forward</span>
            </motion.button>
          ) : (
            <motion.button
              key="consolidate"
              onClick={handleConsolidate}
              disabled={state === 'consolidating'}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-[15px] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#5F3361' }}
              whileHover={state === 'ready' ? { scale: 1.02 } : undefined}
              whileTap={state === 'ready' ? { scale: 0.98 } : undefined}
            >
              {state === 'consolidating' ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {transitionContent.ctaLoadingLabel}
                </>
              ) : (
                <>
                  <span className="material-icons-outlined text-[18px]">merge</span>
                  {transitionContent.ctaLabel}
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Component renders without errors

#### Manual Verification:
- [ ] Fragments start scattered with slight rotations
- [ ] Click "Consolidate" triggers staggered animation to center
- [ ] Fragments fade out and "See unified home" button appears
- [ ] Animation feels smooth and intentional

---

## Phase 4: Modify HomeConnectPanel

### Overview
Add anchor support for design notes and accept redlineMode props.

### Changes Required:

#### 1. HomeConnectPanel.tsx (Modify)
**File**: `src/components/vignettes/home-connect/HomeConnectPanel.tsx`
**Changes**: Add props and anchor styling

Add new props interface and getAnchorStyle helper:

```typescript
interface HomeConnectPanelProps {
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

export default function HomeConnectPanel({
  redlineModeActive = false,
  focusedAnchor = null
}: HomeConnectPanelProps) {

  const getAnchorStyle = (anchorName: string): React.CSSProperties => ({
    anchorName: `--${anchorName}`,
    opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
    boxShadow: focusedAnchor === anchorName ? '0 0 0 2px rgba(95, 51, 97, 0.3)' : 'none',
    transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties);

  // ... rest of component
}
```

Add `data-anchor` and `style` to key elements:
- Performance Cycle FeedCard: `data-anchor="feed-card-performance"` + `style={getAnchorStyle('feed-card-performance')}`
- Goal FeedCard: `data-anchor="feed-card-goal"` + `style={getAnchorStyle('feed-card-goal')}`

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No breaking changes to existing rendering

#### Manual Verification:
- [ ] Panel renders identically when props not provided
- [ ] Anchors highlight correctly when redlineMode active

---

## Phase 5: HomeConnectContent Component

### Overview
Create inner component managing panel stage transitions.

### Changes Required:

#### 1. HomeConnectContent.tsx (Create)
**File**: `src/components/vignettes/home-connect/HomeConnectContent.tsx`
**Changes**: New component following MultilingualContent pattern

```typescript
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeConnectPanel from './HomeConnectPanel';
import TransitionPanel from './TransitionPanel';
import ProblemPanel from './ProblemPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { homeConnectContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';

type PanelStage = 'problem' | 'transition' | 'solution';

interface HomeConnectContentProps {
  redlineNotes: DesignNote[];
  accent: string;
  redlineMode: ReturnType<typeof useRedlineMode>;
  mobileIndex: number;
  onMobileIndexChange: (index: number) => void;
}

export default function HomeConnectContent({
  redlineNotes,
  accent,
  redlineMode,
  mobileIndex,
  onMobileIndexChange,
}: HomeConnectContentProps) {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [panelStage, setPanelStage] = useState<PanelStage>('problem');
  const reducedMotion = useReducedMotion();
  const animations = reducedMotion ? redlineAnimationsReduced : redlineAnimations;

  const handleTransition = useCallback(() => {
    setPanelStage('transition');
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setPanelStage('solution');
    goToSolution();
  }, [goToSolution]);

  // Sync panelStage when stage indicator is clicked directly
  const prevStageRef = useRef(stage);
  useEffect(() => {
    if (prevStageRef.current !== stage) {
      if (stage === 'problem') {
        setPanelStage('problem');
      } else if (stage === 'solution') {
        setPanelStage('solution');
      }
      prevStageRef.current = stage;
    }
  }, [stage]);

  const currentStageContent = stage === 'problem'
    ? homeConnectContent.stages.problem
    : homeConnectContent.stages.solution;

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
                animate={{ opacity: 1 }}
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
              animate={{ opacity: 1 }}
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
              color: redlineMode.isActive ? '#5F3361' : undefined
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
          {panelStage === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TransitionPanel onComplete={handleTransitionComplete} />
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
              <HomeConnectPanel
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
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] Component renders without errors

#### Manual Verification:
- [ ] Stage indicator shows Problem/Solution
- [ ] Clicking stage buttons navigates correctly
- [ ] Panel transitions smoothly between stages
- [ ] Design notes toggle works in solution stage

---

## Phase 6: HomeConnectVignette Wrapper

### Overview
Rewrite main vignette component to use VignetteStaged with full redline support.

### Changes Required:

#### 1. HomeConnectVignette.tsx (Rewrite)
**File**: `src/components/vignettes/home-connect/HomeConnectVignette.tsx`
**Changes**: Full rewrite following Multilingual pattern

```typescript
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import HomeConnectContent from './HomeConnectContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteStaged from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { homeConnectContent } from './content';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import '../ai-highlights/design-notes.css';

export default function HomeConnectVignette() {
  const designNotes = homeConnectContent.designNotes;
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
  const accent = designNotes?.accent ?? '#5F3361';

  return (
    <VignetteContainer id="home-connect" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={homeConnectContent.stages}>
            <HomeConnectContent
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
- [ ] No console errors on page load
- [ ] Linting passes: `npm run lint` (Note: lint command has config issue, but build passes)

#### Manual Verification:
- [ ] Vignette loads on homepage
- [ ] Problem → Transition → Solution flow works
- [ ] Stage indicator navigation works
- [ ] Design notes appear on desktop (right side annotations)
- [ ] Mobile bottom sheet tour works
- [ ] Reduced motion preferences respected

---

## Testing Strategy

### Unit Tests:
- Content structure matches expected types
- Stage transitions trigger correctly

### Integration Tests:
- Full flow from Problem → Transition → Solution
- Design notes toggle and display

### Manual Testing Steps:
1. Load homepage, scroll to HomeConnect vignette
2. Verify empty state Problem panel displays
3. Click "See the solution" → verify transition to fragments panel
4. Click "Consolidate into feed" → watch fragments animate to center
5. Click "See unified home" → verify solution panel with feed
6. Click stage indicator to switch between Problem/Solution
7. In Solution, click "Show design details"
8. Verify annotations appear on Performance and Goal cards
9. On mobile, verify bottom sheet tour works
10. Test with reduced motion enabled

## References

- Multilingual Vignette: `src/components/vignettes/multilingual/MultilingualVignette.tsx`
- Transition pattern: `src/components/vignettes/multilingual/TransitionPanel.tsx`
- Content structure: `src/components/vignettes/multilingual/content.ts`
- Redline system: `src/components/vignettes/shared/RedlineOverlay.tsx`
