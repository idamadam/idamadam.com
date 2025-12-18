# Prototyping Vignette Restructure Implementation Plan

## Overview

Restructure the prototyping vignette to follow the same Problem → Solution staged pattern used by AI Highlights and AI Suggestions vignettes. This will transform a static showcase into an interactive narrative that demonstrates the value of creating prototyping infrastructure at Culture Amp.

## Current State Analysis

### What exists now:
- **PrototypingVignette.tsx** (34 lines): Simple `VignetteSplit` wrapper with static title/description
- **SandboxPanel.tsx** (97 lines): Shows a grid of prototype thumbnails with a TUI overlay demonstrating the `/remix` command
- **content.ts** (26 lines): Basic interface with title, description, and prototype items array

### What's missing:
- `VignetteStages` structure (problem/solution/designNotes)
- Problem state visualization
- Stage transition logic with loading state
- Stage indicator UI (Problem • — • Solution)

### Key Discoveries:
- AI Highlights/Suggestions both use `VignetteStaged` wrapper with `VignetteSplit` inside
- Panels receive `stage` prop and render different content based on state
- Both have a `PanelStage` type that includes `'loading'` state for transitions
- Stage indicator is rendered inside the `title` prop of `VignetteSplit`
- Redline mode is optional (user chose to skip design notes for now)

## Desired End State

After implementation:
1. The vignette opens in "Problem" stage showing floating questions over an empty canvas
2. User clicks "See how I enabled this" CTA to trigger transition
3. Loading state plays briefly (1.5s)
4. Solution stage reveals the sandbox UI with TUI overlay and adoption metrics
5. Stage indicator allows navigating between Problem and Solution

### Verification:
- Visual: Problem state shows floating questions animation
- Visual: Solution state shows existing sandbox panel
- Interaction: CTA button triggers smooth transition
- Interaction: Stage indicator allows switching between states

## What We're NOT Doing

- Design notes / redline annotations (user deferred this)
- Changing the existing sandbox/remix visual (keeping current TUI overlay)
- Adding real adoption numbers (using placeholders for now)
- Mobile-specific redline tour components

## Implementation Approach

Follow the exact pattern from AI Suggestions vignette (simpler than Highlights):
1. Update content.ts with stages structure
2. Update PrototypingVignette.tsx to use staged pattern
3. Update SandboxPanel.tsx to handle problem/loading/solution states

---

## Phase 1: Update Content Structure

### Overview
Add VignetteStages to content.ts and reorganize for the new staged flow.

### Changes Required:

#### 1. content.ts
**File**: `src/components/vignettes/prototyping/content.ts`
**Changes**: Add VignetteStages import and stages content

```typescript
import type { VignetteStages } from '../types';

export interface PrototypeItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface ProblemQuestion {
  id: string;
  text: string;
  delay: number; // stagger delay for animation
}

export interface PrototypingContent {
  stages: VignetteStages;
  sandboxTitle: string;
  prototypes: PrototypeItem[];
  problemQuestions: ProblemQuestion[];
  adoptionStats: {
    designers: number;
    prototypes: number;
  };
}

export const prototypingContent: PrototypingContent = {
  stages: {
    problem: {
      title: 'Culture Amp lacked an AI prototyping discipline',
      description: '',
      cta: 'See how I enabled this'
    },
    solution: {
      title: 'Created shared infrastructure to unlock AI prototyping at Culture Amp',
      description: 'I built a common repository that made it easy for designers and PMs to create, share, and remix React prototypes using coding agents. The sandbox removed technical barriers and established a new prototyping discipline.'
    }
  },
  sandboxTitle: 'Culture Amp Design Sandbox',
  prototypes: [
    { id: 1, name: 'Performance AI', thumbnail: '#d9d9d9' },
    { id: 2, name: 'Skills Coach', thumbnail: '#d9d9d9' },
    { id: 3, name: 'Goals Assistant', thumbnail: '#d9d9d9' },
    { id: 4, name: 'Feedback Helper', thumbnail: '#d9d9d9' },
    { id: 5, name: 'Review Writer', thumbnail: '#d9d9d9' },
    { id: 6, name: '1-on-1 Prep', thumbnail: '#d9d9d9' }
  ],
  problemQuestions: [
    { id: 'q1', text: 'Where do I start?', delay: 0 },
    { id: 'q2', text: 'What tools do I use?', delay: 0.15 },
    { id: 'q3', text: 'How do I set up an environment?', delay: 0.3 },
    { id: 'q4', text: 'How do I share this?', delay: 0.45 }
  ],
  adoptionStats: {
    designers: 12,
    prototypes: 30
  }
};
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors: `npm run build`
- [x] No linting errors: `npm run lint`

#### Manual Verification:
- [ ] Content structure matches AI Suggestions pattern

---

## Phase 2: Update Vignette Component

### Overview
Transform PrototypingVignette.tsx to use the staged pattern with VignetteStaged wrapper and stage indicator.

### Changes Required:

#### 1. PrototypingVignette.tsx
**File**: `src/components/vignettes/prototyping/PrototypingVignette.tsx`
**Changes**: Add VignetteStaged wrapper, stage indicator, and transition logic

```typescript
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SandboxPanel from './SandboxPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import VignetteStaged, { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { fadeInUp } from '@/lib/animations';
import { prototypingContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

function PrototypingContent() {
  const { stage, goToSolution, setStage } = useVignetteStage();
  const [isLoading, setIsLoading] = useState(false);
  const reducedMotion = useReducedMotion();

  const panelStage: PanelStage = isLoading ? 'loading' : stage;

  const handleTransition = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      goToSolution();
    }, 1500);
  }, [goToSolution]);

  const currentStageContent = stage === 'problem'
    ? prototypingContent.stages.problem
    : prototypingContent.stages.solution;

  const title = currentStageContent.title;
  const description = currentStageContent.description;

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
    >
      <SandboxPanel
        content={prototypingContent}
        stage={panelStage}
        onTransition={handleTransition}
      />
    </VignetteSplit>
  );
}

export default function PrototypingVignette() {
  return (
    <VignetteContainer id="prototyping">
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged stages={prototypingContent.stages}>
            <PrototypingContent />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors: `npm run build`
- [x] No linting errors: `npm run lint`

#### Manual Verification:
- [ ] Stage indicator renders and is clickable
- [ ] Title/description animate between stages

---

## Phase 3: Update Panel with Problem State

### Overview
Add problem state visualization with floating questions, loading state, and update solution state with adoption stats.

### Changes Required:

#### 1. SandboxPanel.tsx
**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx`
**Changes**: Add ProblemState, LoadingState components and stage-based rendering

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { PrototypingContent } from './content';

type PanelStage = 'problem' | 'loading' | 'solution' | 'designNotes';

interface SandboxPanelProps {
  className?: string;
  content: PrototypingContent;
  stage?: PanelStage;
  onTransition?: () => void;
}

function ProblemState({
  questions,
  onTransition
}: {
  questions: PrototypingContent['problemQuestions'];
  onTransition?: () => void;
}) {
  return (
    <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[320px] flex flex-col items-center justify-center p-8">
      {/* Floating questions */}
      <div className="relative w-full h-48 mb-6">
        {questions.map((q, index) => {
          // Position questions in a scattered pattern
          const positions = [
            { top: '10%', left: '5%', rotate: -5 },
            { top: '5%', right: '10%', rotate: 3 },
            { top: '45%', left: '15%', rotate: -2 },
            { top: '55%', right: '5%', rotate: 4 },
          ];
          const pos = positions[index % positions.length];

          return (
            <motion.div
              key={q.id}
              className="absolute bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-[15px] text-gray-600 font-medium"
              style={{
                ...pos,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
                delay: q.delay,
                ease: 'easeOut',
              }}
            >
              {q.text}
            </motion.div>
          );
        })}
      </div>

      {/* Empty state icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <span className="material-icons-outlined text-[48px] text-gray-300 mb-2 block">
          folder_open
        </span>
        <p className="text-gray-400 text-sm">No prototyping infrastructure</p>
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={onTransition}
        className="mt-6 flex items-center justify-center gap-2 bg-[rgba(154,54,178,0.08)] hover:bg-[rgba(154,54,178,0.14)] px-5 py-3 rounded-full text-[14px] font-semibold transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 0 0 rgba(154, 54, 178, 0)',
            '0 0 0 6px rgba(154, 54, 178, 0.12)',
            '0 0 0 0 rgba(154, 54, 178, 0)'
          ]
        }}
        transition={{
          opacity: { delay: 0.7, duration: 0.3 },
          y: { delay: 0.7, duration: 0.3 },
          boxShadow: { delay: 1.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="material-icons-outlined text-[20px] text-[#9A36B2]">auto_awesome</span>
        <span className="text-[#9A36B2]">See how I enabled this</span>
      </motion.button>
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

        .sandbox-loading-border {
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

        .sandbox-loading-content {
          position: relative;
          background: white;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          z-index: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .sandbox-loading-border {
            animation: none;
          }
        }
      `}</style>

      <div className="relative p-[2px] rounded-[7px] min-h-[320px]">
        <div className="sandbox-loading-border"></div>
        <div className="sandbox-loading-content px-6 py-8 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-[20px] text-[#2f2438]">
              auto_awesome
            </span>
            <span className="text-lg font-semibold text-[#2f2438]">
              Building the sandbox...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function SolutionState({ content }: { content: PrototypingContent }) {
  return (
    <div className="relative w-full">
      {/* Main Sandbox Container */}
      <div className="bg-white border border-black rounded-lg p-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-[18px]">
          <div>
            <h3 className="text-[16px] font-bold text-black font-[family-name:var(--font-inter)]">
              {content.sandboxTitle}
            </h3>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {content.adoptionStats.designers} designers • {content.adoptionStats.prototypes}+ prototypes
            </p>
          </div>
          <div className="w-[50px] h-[50px] bg-[#d9d9d9] rounded-full" />
        </div>

        {/* Prototype Grid */}
        <div className="grid grid-cols-3 gap-[18px]">
          {content.prototypes.map((item) => (
            <div
              key={item.id}
              className="rounded-[7px] h-[78px]"
              style={{ backgroundColor: item.thumbnail }}
              aria-label={item.name}
            />
          ))}
        </div>
      </div>

      {/* Claude Code TUI Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-0 right-0 bg-[#1a1d23] rounded-lg w-[420px] shadow-2xl border border-gray-700"
        style={{ transform: 'translate(0, 50%)' }}
      >
        {/* TUI Header */}
        <div className="bg-[#2a2d33] px-4 py-2 rounded-t-lg border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-[12px] text-gray-400 font-mono ml-2">claude-code</span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">~/.../sandbox</span>
        </div>

        {/* TUI Content */}
        <div className="p-4 font-mono text-[13px] leading-relaxed">
          {/* Command prompt */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-blue-400 select-none">❯</span>
            <span className="text-gray-100">/remix Idam&apos;s prototype and make it my own</span>
          </div>

          {/* Command output */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Found prototype in repository</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Creating your workspace...</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-blue-400"
              >
                ⟳
              </motion.span>
              <span className="text-gray-300">Customizing components...</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SandboxPanel({
  className = '',
  content,
  stage = 'solution',
  onTransition
}: SandboxPanelProps) {
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
            <ProblemState
              questions={content.problemQuestions}
              onTransition={onTransition}
            />
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
            <SolutionState content={content} />
          </motion.div>
        );
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compiles without errors: `npm run build`
- [x] No linting errors: `npm run lint`
- [x] Dev server runs without errors: `npm run dev`

#### Manual Verification:
- [ ] Problem state shows floating questions with staggered animation
- [ ] CTA button pulses and triggers transition on click
- [ ] Loading state shows animated gradient border
- [ ] Solution state shows sandbox with adoption stats
- [ ] TUI overlay animates in correctly
- [ ] Stage indicator allows switching between Problem and Solution
- [ ] Transitions feel smooth and match other vignettes

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that the vignette behaves correctly before considering the task complete.

---

## Testing Strategy

### Manual Testing Steps:
1. Navigate to homepage, scroll to Prototyping vignette
2. Verify Problem state loads with floating questions animation
3. Click "See how I enabled this" CTA
4. Verify loading state appears with gradient border
5. Verify Solution state appears with sandbox + TUI
6. Click "Problem" in stage indicator to go back
7. Click "Solution" to return
8. Test on mobile viewport widths
9. Test with reduced motion preferences enabled

## Performance Considerations

- Floating questions use simple CSS transforms (GPU accelerated)
- Gradient animation uses CSS @property (hardware accelerated where supported)
- AnimatePresence handles unmounting cleanly
- No heavy images or assets added

## References

- Similar implementation: `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx:1-224`
- Stage context: `src/lib/vignette-stage-context.tsx`
- Animation presets: `src/lib/animations.ts`
