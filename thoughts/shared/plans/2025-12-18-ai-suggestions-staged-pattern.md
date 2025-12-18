# AI Suggestions Vignette - Staged Pattern Implementation

## Overview

Bring the AI Suggestions vignette in line with the AI Highlights pattern: Problem → Solution → Design Notes staged flow with redline annotations. This creates consistency across the AI-focused vignettes and better demonstrates the design thinking behind the feature.

## Current State Analysis

**AI Suggestions currently:**
- Uses simple `VignetteSplit` with no staging
- Has internal `before → improving → after` state for the AI demo
- No problem framing, no design notes
- Content structure is flat (title, description, recommendations)

**AI Highlights pattern we're adopting:**
- `VignetteStaged` wrapper with Problem/Solution stages
- Clickable stage indicator UI
- Loading transition between states
- `useRedlineMode` hook + `RedlineOverlay` for desktop annotations
- Mobile redline tour support
- Rich content structure with `stages`, `designNotes`

### Key Files:
- `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx` - Main component (29 lines)
- `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx` - Panel with improve interaction (219 lines)
- `src/components/vignettes/ai-suggestions/content.ts` - Content definitions (54 lines)

### Shared components to reuse:
- `src/components/vignettes/VignetteStaged.tsx`
- `src/components/vignettes/shared/useRedlineMode.ts`
- `src/components/vignettes/shared/RedlineOverlay.tsx`
- `src/components/vignettes/shared/MobileRedlineTour.tsx`
- `src/components/vignettes/shared/MobileRedlineMarkers.tsx`

## Desired End State

1. AI Suggestions vignette follows the same staged pattern as AI Highlights
2. Problem state shows a static "bad review" card with CTA to trigger AI
3. Clicking CTA plays loading animation → lands on solution with recommendations visible
4. Design notes mode reveals 3 annotations about design thinking
5. Mobile experience matches Highlights (bottom sheet tour)

### Verification:
- Vignette renders with Problem/Solution stage indicators
- Clicking between stages works correctly
- Loading animation plays during problem → solution transition
- Design notes toggle shows/hides annotations
- Mobile tour works on small screens
- No regressions to existing AI Highlights vignette

## What We're NOT Doing

- No iterations section (no v1 → v2 → final screenshots)
- Not making loading animation triggerable from design notes (keeping simple)
- Not changing the actual recommendations content
- Not modifying shared redline components

## Implementation Approach

Restructure the vignette to use `VignetteStaged`, move the improve animation to be part of the problem → solution transition, and add redline mode support. The existing `SuggestionsPanel` will be refactored to support staged rendering.

---

## Phase 1: Update Content Structure

### Overview
Add staged content structure and design notes definitions to `content.ts`.

### Changes Required:

#### 1. Update content.ts
**File**: `src/components/vignettes/ai-suggestions/content.ts`
**Changes**: Add stages and designNotes to content structure

```typescript
import { DesignNote, VignetteStages } from '../types';

interface AISuggestionsRecommendation {
  title: string;
  description: string;
}

export interface AISuggestionsContent {
  stages: VignetteStages;
  designNotes: {
    accent: string;
    notes: DesignNote[];
  };
  questionNumber: number;
  questionText: string;
  instructionText: string;
  beforeText: string;
  recommendations: AISuggestionsRecommendation[];
  sharingNote: string;
}

export const aiSuggestionsContent: AISuggestionsContent = {
  stages: {
    problem: {
      title: 'Managers struggled to write constructive, actionable feedback',
      description: '',
      cta: 'See how AI helped'
    },
    solution: {
      title: 'Designed AI coaching grounded in people science',
      description:
        'I partnered with organizational psychologists to create AI suggestions backed by research. The system scans for specific, impactful, objective, and actionable qualities, giving managers structured guidance to improve their feedback.'
    },
    designNotes: {
      title: 'Design notes',
      description: 'Annotated notes showing the thinking behind the design.'
    }
  },
  designNotes: {
    accent: '#9A36B2', // Purple to match the gradient
    notes: [
      {
        id: 'editor-integration',
        label: 'Contextual placement',
        detail: 'The Improve button lives inside the editor, right where managers are writing. No context switch needed.',
        anchor: 'improve-button',
        position: 'left'
      },
      {
        id: 'people-science',
        label: 'People science foundation',
        detail: 'Partnered with org psych to ground suggestions in research. The 4 qualities (specific, impact, actions, objective) are evidence-based.',
        anchor: 'recommendations-header',
        position: 'right'
      },
      {
        id: 'loading-state',
        label: 'Processing feedback',
        detail: 'The animated gradient border signals AI is working. Designed to feel premium and build anticipation for the suggestions.',
        anchor: 'feedback-footer',
        position: 'left'
      }
    ]
  },
  questionNumber: 2,
  questionText: 'How has this person progressed over this review period?',
  instructionText:
    "Explain how this growth has helped this person achieve their goals...",
  beforeText:
    "Alex Johnson has made some progress, but it's not really enough. They still have a long way to go. Their performance hasn't improved much, and they haven't met their goals in a meaningful way. They should try to be better next review period.",
  recommendations: [
    {
      title: 'Be specific:',
      description:
        "The feedback is too general and lacks specific context. It mentions 'progress' and 'goals' but doesn't provide any examples or details about what those goals were, what actions were taken, or what the specific outcomes were."
    },
    {
      title: 'Identify impact:',
      description:
        "The feedback focuses on the lack of progress and unmet goals, but it doesn't explicitly describe the impact of Alex's actions. It doesn't clarify how their performance affected the team, objectives, or the organization."
    },
    {
      title: 'Suggest actions:',
      description:
        'The feedback is vague and does not provide specific, actionable steps for improvement. It states that Alex should "try to be better" but doesn\'t offer concrete suggestions on how to achieve that.'
    },
    {
      title: 'Be objective:',
      description:
        'The feedback uses subjective language like "not really enough", "long way to go", and "meaningful way." It lacks specific examples of actions and their impact.'
    }
  ],
  sharingNote: 'May be shared with Lena'
};
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors: `npm run build`
- [x] No linting errors in content.ts

#### Manual Verification:
- [ ] Content structure matches the pattern used in AI Highlights

**Implementation Note**: This phase is content-only. No visual changes yet.

---

## Phase 2: Refactor SuggestionsPanel for Staged Rendering

### Overview
Split `SuggestionsPanel` into Problem and Solution states, similar to `HighlightsPanel`.

### Changes Required:

#### 1. Update SuggestionsPanel.tsx
**File**: `src/components/vignettes/ai-suggestions/SuggestionsPanel.tsx`
**Changes**:
- Accept `stage` prop instead of managing internal state
- Add `ProblemState` component showing static bad review
- Add `LoadingState` component (reuse existing loading animation)
- `SolutionState` shows editor with recommendations already visible
- Accept `onTransition` callback for problem → solution
- Add redline mode props (`redlineModeActive`, `focusedAnchor`)
- Add `data-anchor` attributes to annotatable elements

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import type { AISuggestionsContent } from './content';
import { VignetteStage } from '@/lib/vignette-stage-context';

type PanelStage = VignetteStage | 'loading';

interface SuggestionsPanelProps {
  className?: string;
  content: AISuggestionsContent;
  stage?: PanelStage;
  onTransition?: () => void;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

function ProblemState({
  content,
  onTransition
}: {
  content: AISuggestionsContent;
  onTransition?: () => void;
}) {
  return (
    <div className="relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-[18px] text-gray-700">
            edit_note
          </span>
          <span className="text-[15px] font-semibold text-gray-900">
            Performance Review Draft
          </span>
        </div>
      </div>

      {/* Bad review content */}
      <div className="px-5 py-6">
        <p className="text-[15px] leading-[22px] text-gray-700 italic">
          "{content.beforeText}"
        </p>
      </div>

      {/* CTA Footer */}
      <div className="border-t-2 border-gray-200 bg-gray-50 px-5 py-4">
        <motion.button
          onClick={onTransition}
          className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white px-5 py-3 rounded-lg text-[14px] font-semibold shadow-sm hover:bg-[#1e293b] transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="material-icons-outlined text-[20px]">auto_awesome</span>
          See how AI helped
        </motion.button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <>
      <style jsx global>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateGradient {
          to {
            --gradient-angle: 360deg;
          }
        }

        .suggestions-loading-border {
          position: absolute;
          inset: 0;
          border-radius: 7px;
          background: conic-gradient(
            from var(--gradient-angle),
            #A6E5E7,
            #64D2D7,
            #9A36B2,
            #64D2D7,
            #A6E5E7
          );
          animation: rotateGradient 3s linear infinite;
          filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.5));
        }

        .suggestions-loading-content {
          position: relative;
          background: white;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          z-index: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .suggestions-loading-border {
            animation: none;
          }
        }
      `}</style>

      <div className="relative p-[2px] rounded-[7px]">
        <div className="suggestions-loading-border"></div>
        <div className="suggestions-loading-content px-6 py-8">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-[20px] text-[#2f2438]">
              auto_awesome
            </span>
            <span className="text-lg font-semibold text-[#2f2438]">
              Looking for ways to improve...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function SolutionState({
  content,
  redlineModeActive = false,
  focusedAnchor = null
}: {
  content: AISuggestionsContent;
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}) {
  // Helper for anchor styles (dimming when another is focused)
  const getAnchorStyle = (anchorName: string): React.CSSProperties => ({
    anchorName: `--${anchorName}`,
    opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
    boxShadow: focusedAnchor === anchorName ? '0 0 0 2px rgba(154, 54, 178, 0.2)' : 'none',
    transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties);

  return (
    <div className="space-y-2 font-[family-name:var(--font-inter)]">
      {/* Editor with Improve button - anchored */}
      <div
        style={getAnchorStyle('improve-button')}
        data-anchor="improve-button"
      >
        <RichTextEditor
          content={content.beforeText}
          placeholder="Write feedback..."
          showImproveButton={true}
          isImproving={false}
          disabled={true}
        />
      </div>

      {/* Recommendations panel - always visible in solution */}
      <div
        className="recommendation-panel"
        style={{
          position: 'relative',
          borderRadius: '7px',
          padding: '2px',
          background: 'linear-gradient(135deg, #A6E5E7, #64D2D7, #9A36B2)',
        }}
      >
        <div
          className="recommendation-content bg-white rounded-[5px] p-6 space-y-4"
        >
          {/* Header - anchored */}
          <div
            className="flex items-center justify-between"
            style={getAnchorStyle('recommendations-header')}
            data-anchor="recommendations-header"
          >
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                auto_awesome
              </span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-[#2f2438] leading-6">
                  {content.recommendations.length} suggested improvements
                </span>
                <span className="text-base font-normal text-[#2f2438] leading-6">
                  based on Culture Amp People Science
                </span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            {content.recommendations.map((rec, index) => (
              <div key={index}>
                <p className="text-base leading-6 text-[#2f2438]">
                  <span className="font-semibold">{rec.title}</span>
                  <span className="font-normal"> {rec.description}</span>
                </p>
                {index < content.recommendations.length - 1 && (
                  <div className="h-px bg-[#eaeaec] mt-4" />
                )}
              </div>
            ))}
          </div>

          {/* Footer - anchored */}
          <div
            className="flex items-center justify-between pt-2"
            style={getAnchorStyle('feedback-footer')}
            data-anchor="feedback-footer"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#524e56]">Is this helpful?</span>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="material-icons-outlined text-[16px] text-[#2f2438]">
                  thumb_up
                </span>
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="material-icons-outlined text-[16px] text-[#2f2438]">
                  thumb_down
                </span>
              </button>
            </div>
            <span className="text-sm text-[#524e56]">
              Review AI-generated suggestions for accuracy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuggestionsPanel({
  className = '',
  content,
  stage = 'solution',
  onTransition,
  redlineModeActive = false,
  focusedAnchor = null
}: SuggestionsPanelProps) {
  const renderStage = () => {
    switch (stage) {
      case 'problem':
        return (
          <motion.div
            key="problem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProblemState content={content} onTransition={onTransition} />
          </motion.div>
        );
      case 'loading':
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SolutionState
              content={content}
              redlineModeActive={redlineModeActive}
              focusedAnchor={focusedAnchor}
            />
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderStage()}
    </AnimatePresence>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles: `npm run build`
- [x] No linting errors

#### Manual Verification:
- [ ] Problem state shows static bad review card
- [ ] Loading state shows animated gradient
- [ ] Solution state shows editor + recommendations

**Implementation Note**: After this phase, test the panel in isolation before integrating with the vignette wrapper.

---

## Phase 3: Update AISuggestionsVignette with Staged Wrapper

### Overview
Replace `VignetteSplit` with `VignetteStaged` pattern and add redline mode integration.

### Changes Required:

#### 1. Update AISuggestionsVignette.tsx
**File**: `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`
**Changes**:
- Import and use `VignetteStaged` and `useVignetteStage`
- Add stage indicator UI
- Add loading transition logic
- Integrate redline mode with overlay components
- Pattern matches `AIHighlightsVignette.tsx`

```typescript
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { aiSuggestionsContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import { useRedlineMode } from '@/components/vignettes/shared/useRedlineMode';
import RedlineOverlay from '@/components/vignettes/shared/RedlineOverlay';
import MobileRedlineTour from '@/components/vignettes/shared/MobileRedlineTour';
import MobileRedlineMarkers from '@/components/vignettes/shared/MobileRedlineMarkers';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { redlineAnimations, redlineAnimationsReduced } from '@/lib/redline-animations';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function AISuggestionsContent({
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

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const handleTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToSolution();
    }, 1500);
  }, [goToSolution]);

  const currentStageContent = stage === 'problem'
    ? aiSuggestionsContent.stages.problem
    : aiSuggestionsContent.stages.solution;

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
              color: redlineMode.isActive ? '#7c3aed' : undefined
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
        <SuggestionsPanel
          content={aiSuggestionsContent}
          stage={panelStage}
          onTransition={handleTransition}
          redlineModeActive={redlineMode.isActive}
          focusedAnchor={focusedAnchor}
        />
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

export default function AISuggestionsVignette() {
  const designNotes = aiSuggestionsContent.designNotes;
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
  const accent = designNotes?.accent ?? '#9A36B2';

  return (
    <VignetteContainer id="ai-suggestions" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged
            stages={aiSuggestionsContent.stages}
          >
            <AISuggestionsContent
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
- [x] Build succeeds: `npm run build`
- [x] No TypeScript errors
- [x] No linting errors

#### Manual Verification:
- [ ] Problem → Solution stage indicator works
- [ ] Clicking CTA triggers loading → solution transition
- [ ] Design notes button appears in solution state
- [ ] Redline annotations appear on desktop
- [ ] Mobile tour works on small screens
- [ ] Animations respect reduced motion preference

**Implementation Note**: After completing this phase and all automated verification passes, test the full flow manually before considering complete.

---

## Testing Strategy

### Unit Tests:
- Content structure matches types
- Panel renders each stage correctly

### Integration Tests:
- Stage transitions work correctly
- Redline mode toggle functions
- Mobile tour navigation

### Manual Testing Steps:
1. Load homepage, scroll to AI Suggestions vignette
2. Verify Problem state shows with stage indicator
3. Click "See how AI helped" - verify loading animation plays
4. Verify Solution state shows with recommendations visible
5. Click "Show design details" - verify annotations appear
6. Click each annotation - verify corresponding element highlights
7. Test on mobile viewport - verify bottom sheet tour works
8. Test with "prefers-reduced-motion" - verify animations are disabled
9. Verify AI Highlights vignette still works correctly (no regressions)

## Performance Considerations

- Reusing existing shared components (no new bundle size)
- CSS animations use GPU-accelerated properties
- Loading state uses CSS `@property` which is well-supported

## References

- AI Highlights pattern: `src/components/vignettes/ai-highlights/AIHighlightsVignette.tsx`
- Shared redline components: `src/components/vignettes/shared/`
- Vignette types: `src/components/vignettes/types.ts`
