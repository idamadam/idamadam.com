# Vignette Depth Transformation Plan

## Overview

Transform all vignettes to match the AI Highlights pattern, adding three content layers that signal lead-level design: Context (the "before"), Decisions (the "how"), and Impact (the "after"). Work executed via subagents to conserve main context.

## Current State Analysis

### AI Highlights (Reference Implementation)
The AI Highlights vignette has been transformed with:
- **New content structure**: `projectName`, `headline`, `body`, `designDetails[]`, `processNotes[]`
- **Toggle pattern**: Switch between "Design details" (UI annotations) and "Process notes" (narrative)
- **Numbered markers**: Link left panel annotations to right panel UI elements
- **Mobile bottom sheet**: Touch-friendly annotation viewing
- **No Problem stage**: Solution shows immediately (6-8 second scan optimization)

Key files:
- `src/components/vignettes/ai-highlights/content.ts` (content structure)
- `src/components/vignettes/ai-highlights/HighlightsTextPanel.tsx` (left panel with toggle)
- `src/components/vignettes/ai-highlights/NumberedMarker.tsx` (reusable badge)
- `src/components/vignettes/ai-highlights/MobileDesignTooltip.tsx` (bottom sheet)

### Other Vignettes (Need Transformation)

| Vignette | Current Structure | Missing |
|----------|-------------------|---------|
| **AI Suggestions** | `stages.solution` + `designNotes[]` (x/y) | Context, process notes, numbered markers |
| **Prototyping** | `stages.solution` only, no design notes | All three layers + annotations |
| **Multilingual** | `stages.solution` + `designNotes[]` (x/y) | Context, process notes, numbered markers |
| **Home Connect** | `stages.solution` + 2 `designNotes` | Context, process notes, expand annotations |
| **Vibe Coding** | `title` + `description` only | Everything (uses simpler format) |

## Desired End State

Each vignette (except Vibe Coding) should have:
1. Clear headline visible on load
2. 3-4 design details linking to UI elements
3. 3-4 process notes showing ownership/impact
4. Working toggle between Design Details and Process Notes
5. Mobile bottom sheet for annotations
6. Voice/tone matching AI Highlights

**Vibe Coding exception**: No toggle. Simpler narrative-only format appropriate for personal project.

### Verification:
- Each vignette loads with headline immediately visible
- Toggle switches between Design Details and Process Notes
- Numbered markers highlight corresponding UI on hover
- Mobile bottom sheet works for all vignettes
- Voice is consistent: short sentences, active voice, concrete specifics

## What We're NOT Doing

- Changing the visual design of the right panels (the "solutions")
- Adding new interactive features beyond the toggle/markers
- Refactoring shared components (reuse existing from AI Highlights)
- Creating a shared TextPanel component (each vignette gets its own for flexibility)

## Implementation Approach

Each vignette transformation runs in a dedicated subagent. Start with AI Suggestions (most similar), then proceed through the others.

---

## Phase 1: AI Suggestions (Subagent)

### Overview
Transform AI Suggestions to match AI Highlights pattern. Most similar vignette—both are AI features with inline interactions.

### Content Source
From `thoughts/shared/research/2026-01-12-portfolio-depth-and-impact.md` (lines 202-225):

**Context**:
- Who: Managers writing feedback. Feedback quality varied widely.
- Why now: Competitive pressure. First AI feature at Culture Amp.
- Constraint: Respect manager's agency. Encourage critical thinking.

**Decisions**:
- Maintaining agency from the start
- Inline activation (Improve button in text editor, not buried)
- AI gradient pattern as signifier for AI features

**Impact**:
- 80% of managers who used Improve made changes
- AI gradient pattern spread to other AI features org-wide

### Changes Required

#### 1. Update content.ts
**File**: `src/components/vignettes/ai-suggestions/content.ts`

New structure:
```typescript
export interface DesignDetail {
  number: number;
  text: string;
}

export interface ProcessNote {
  text: string;
}

export const aiSuggestionsContent = {
  projectName: 'AI Suggestions',
  headline: 'AI assistance that respects agency',
  body: 'Managers writing feedback needed help improving quality without losing their voice. This keeps them in control.',

  designDetailsLabel: 'Design details',
  designDetails: [
    { number: 1, text: 'Improve button lives in the editor, not hidden in a menu' },
    { number: 2, text: 'Gradient signals AI is helping without being intrusive' },
    { number: 3, text: 'Suggestions appear inline, easy to accept or ignore' },
  ],

  processNotesLabel: 'Process notes',
  processNotes: [
    { text: 'Focused on maintaining agency. The question was how to make AI feel like a tool you reach for, not something imposed.' },
    { text: 'Early 2024 meant limited model quality. Kept the approach minimal because we didn\'t trust the LLMs enough to be aggressive.' },
    { text: '80% of managers who used Improve made changes to their feedback.' },
    { text: 'The gradient pattern I created here spread to other AI features across the product.' },
  ],

  // ... keep existing panel content for right side
};
```

#### 2. Create SuggestionsTextPanel.tsx
**File**: `src/components/vignettes/ai-suggestions/SuggestionsTextPanel.tsx`

Adapt from `HighlightsTextPanel.tsx`:
- Same toggle structure (Design Details ↔ Process Notes)
- Same numbered marker list
- Update content references

#### 3. Update AISuggestionsPanel.tsx
**File**: `src/components/vignettes/ai-suggestions/AISuggestionsPanel.tsx`

Add numbered markers at key UI positions:
- Marker 1: Near the "Improve" button
- Marker 2: On the gradient area
- Marker 3: Near suggestion text

Wire up hover highlighting with `activeNumber` state.

#### 4. Update AISuggestionsVignette.tsx
**File**: `src/components/vignettes/ai-suggestions/AISuggestionsVignette.tsx`

- Add state: `activeNumber`, `showProcessNotes`, `isMobile`
- Replace left panel with `SuggestionsTextPanel`
- Pass state and handlers to both panels
- Integrate `MobileDesignTooltip` for mobile

### Success Criteria

#### Automated:
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser

#### Manual:
- [ ] Headline "AI assistance that respects agency" visible on load
- [ ] Toggle switches between Design Details and Process Notes
- [ ] Hover on numbered item highlights corresponding UI element
- [ ] Mobile: bottom sheet opens when tapping numbered item
- [ ] Voice matches AI Highlights (short, active, concrete)

---

## Phase 2: Home Connect (Subagent)

### Overview
Strong impact data (255% increase). Clear story about challenging engineering-led approach.

### Content Source
From research document (lines 282-304):

**Context**: Managers missing signals. Homepage highest traffic.
**Decisions**: Challenged engineering-led approach. Ran experiment first.
**Impact**: 255% increase in managers scheduling 1-on-1s.

### Changes Required
Same pattern as Phase 1:
1. Update `content.ts` with new structure
2. Create `HomeConnectTextPanel.tsx`
3. Update panel with numbered markers
4. Update vignette with state management

---

## Phase 3: Multilingual (Subagent)

### Overview
Clear constraint/decision story. Research-driven advocacy.

### Content Source
From research document (lines 257-279):

**Context**: Enterprise customers. 12 parallel cycles. Major ARR blocker.
**Decisions**: Pushed for machine translation + Excel export based on research.
**Impact**: Zero support tickets. Pattern became reference.

### Changes Required
Same pattern as Phase 1.

---

## Phase 4: Prototyping (Subagent)

### Overview
"Built it myself" narrative. No roadmap slot, proactive initiative.

### Content Source
From research document (lines 228-254):

**Context**: Leading AI prototyping. No way to deploy/share. No budget.
**Decisions**: No roadmap slot. Built it. Did adoption work.
**Impact**: 12 designers, 30+ prototypes. Shifted how designers prototype.

### Changes Required
Same pattern as Phase 1. Note: This vignette currently has no design notes, so adding the full system.

---

## Phase 5: Vibe Coding (Subagent)

### Overview
Personal project. **Different approach**: No toggle. Simpler narrative-only format.

### Content Source
From research document (lines 307-328):

**Context**: Personal learning. Building prototyping tool.
**What I built**: Prototyping tool with versioning and "Scrubber".
**Takeaway**: Can design and build. Deep fluency from actual experience.

### Changes Required

#### 1. Update content.ts
Simpler structure without toggle:
```typescript
export const vibeCodingContent = {
  projectName: 'Personal Exploration',
  headline: 'Building my own tools',
  body: 'Learning new tech. Figuring out how to build things myself. I have an eye on doing my own thing at some point.',

  // No toggle - just narrative
  notes: [
    { text: 'Built a prototyping tool. Give it an idea, it builds a prototype. Has versioning and a "Scrubber" to review like a movie.' },
    { text: 'Figured out how to bring a coding agent CLI into a browser context. Designed interactions around that behavior.' },
    { text: 'This is how I learned to build the Design Sandbox at work. Personal project was the proving ground.' },
    { text: 'I can design and build. Deep fluency from actual experience, not just curiosity.' },
  ],
};
```

#### 2. Update VibeCodingVignette.tsx
Simpler left panel without toggle. Just headline, body, and narrative notes.

### Success Criteria
- [ ] Headline visible on load
- [ ] Notes appear below body (no toggle)
- [ ] Voice matches other vignettes

---

## Phase 6: Polish (Main Context)

After all subagents complete:

1. **Voice/tone review**: Read all vignettes sequentially, ensure consistency
2. **Mobile testing**: Check bottom sheet on all vignettes
3. **Animation performance**: Verify smooth transitions
4. **Copy tightening**: Final pass to cut unnecessary words

---

## Testing Strategy

### Per-Vignette Verification:
1. Load page, scroll to vignette
2. Verify headline visible immediately
3. Test toggle (except Vibe Coding)
4. Test numbered marker hover
5. Test mobile bottom sheet

### Cross-Browser:
- Chrome (primary)
- Safari (mobile Safari especially)
- Firefox

### Accessibility:
- Verify with `prefers-reduced-motion: reduce`
- Check keyboard navigation in toggle and bottom sheet

---

## Voice and Tone Reference

From AI Highlights—preserve this style:

### Design Details (What the design does)
- Short, factual statements
- UI-focused, linking to visible elements
- Example: "Summary surfaces themes across all feedback"

### Process Notes (How you led)
- First-person, active voice
- Concrete specifics, not generic claims
- 1-2 sentences max per note
- Shows ownership, challenges, outcomes

**Examples:**
> "Focused on making AI trustworthy. That meant showing sources, surfacing concrete examples, and keeping humans in the loop."

> "High visibility meant heavy exec feedback. I refined the storytelling until the concept clicked."

> "User feedback: 'just the right amount of AI.'"

---

## References

- Research document: `thoughts/shared/research/2026-01-12-portfolio-depth-and-impact.md`
- Reference implementation: `src/components/vignettes/ai-highlights/`
- Vignette architecture: `CLAUDE.md`
