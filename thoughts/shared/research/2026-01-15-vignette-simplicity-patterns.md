---
date: 2026-01-15
git_commit: 9895457c72ff7ae7faa1c6abac7e3aa4e0ffd275
branch: address-feedback
repository: idamadam.com
topic: "Restoring Simplicity to Portfolio Vignettes While Preserving Depth"
tags: [research, ux-patterns, progressive-disclosure, portfolio, vignettes]
status: complete
last_updated: 2026-01-15
last_updated_by: claude
---

# Research: Restoring Simplicity to Portfolio Vignettes While Preserving Depth

Feedback indicated the toggle-based UI for showing depth content (Design Details / Process Notes) felt "busier" than the original staged approach. The challenge: keep all the added content (context, decisions, impact) while restoring visual simplicity.

## Recommendation

Replace the toggle pattern with narrative body text plus a single expandable "Process notes" section. This uses proper progressive disclosure (content hidden until requested) rather than parallel tabs (both views always available). The body text should weave in key context and decisions, with process notes available for users who want to go deeper.

## Quick Comparison

| Option | Simplicity | Depth Preserved | Mobile-Friendly | Verdict |
|--------|------------|-----------------|-----------------|---------|
| Toggle (current) | Low | Yes | Yes | Too busy |
| 4th Stage | Medium | Yes | Yes | Anticlimactic |
| Learn More Expansion | **High** | Yes | Yes | **Recommended** |
| Modal/Sheet | Medium | Yes | Partial | Interrupts flow |
| Tooltip | High | Partial | No | A11y issues |

## Constraints Considered

- **Stack**: React 19, Framer Motion, Tailwind CSS
- **Existing patterns**: VignetteSplit, ProcessNotesExpander (new)
- **Priority**: Restore visual simplicity while keeping all depth content

## Why the Toggle Felt Busy

1. **Multiple visual elements competing**: Project badge + headline + body + toggle buttons + list items
2. **Toggle implies equal weight**: Two options suggest both are equally important
3. **Always-visible list**: Numbered items or process notes always in view
4. **No progression**: Everything laid out flat rather than revealed progressively
5. **Information density**: Left panel went from ~2 text elements to ~6+

## Implemented Solution: Narrative + Expandable Process Notes

### Visual Structure (Before → After)

**Before (toggle pattern):**
```
Left Panel:
├── ProjectName
├── Headline
├── Body
├── [Toggle: Design Details | Process Notes]
└── List of 3-4 items (always visible)
```

**After (expandable pattern):**
```
Left Panel:
├── ProjectName
├── Headline
├── Body (enriched with context/decisions)
└── [▶ Process notes] (collapsed by default)
    └── Bullet list (hidden until clicked)
```

### Content Strategy

1. **Richer body text**: Key context and decisions woven into 2-3 sentences
2. **Design details on markers only**: Numbered markers on panel show callouts on hover/tap
3. **Process notes expandable**: Available for those who want to go deeper

### Example Transformation (AI Highlights)

**Before:**
```
Headline: "AI summaries built for verification"
Body: "Managers spent hours reading feedback during performance reviews.
       This generates summaries they can verify against the source feedback."
```

**After:**
```
Headline: "AI summaries managers can verify and trust"
Body: "Managers spent hours synthesizing feedback each review cycle.
       I focused on transparency—showing sources, surfacing concrete examples,
       and keeping humans in the loop."
```

## UX Research Findings

- **Progressive disclosure**: Reduces cognitive load by revealing info gradually (NN/G)
- **Single secondary screen**: Typically sufficient for each disclosure level
- **Tabs vs accordions**: Tabs suit few long sections; accordions fit many short ones
- **Critical info accessibility**: Shouldn't require expansion to access
- **Linear design**: Minimal, direct, single focus reduces cognitive load

## Implementation Details

### New Component: ProcessNotesExpander

Simple collapsible that:
- Shows "▶ Process notes" link by default
- Expands to show bullet list on click
- Uses Framer Motion for smooth height animation
- Toggles arrow rotation when expanded

### Files Modified

1. `src/components/vignettes/shared/ProcessNotesExpander.tsx` (new)
2. All `content.ts` files - restructured from toggle to narrative format
3. All `*TextPanel.tsx` files - simplified to use ProcessNotesExpander
4. All `*Vignette.tsx` files - removed toggle state

## What I Ruled Out

- **4th Stage (Problem → Solution → Design Notes → Process Notes)**: Would feel anticlimactic - the stages work because each has a distinct visual state
- **Modal/Sheet for Process Notes**: Interrupts flow, makes content feel supplementary
- **Tooltip for Process Notes**: A11y issues on mobile, content too substantial

## Sources

- [NN/G Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) - Core principle validation
- [Baymard Accordion and Tab Design](https://baymard.com/blog/accordion-and-tab-design) - When to use each pattern
- [Linear UI Redesign](https://linear.app/now/how-we-redesigned-the-linear-ui) - Minimal, focused design
- [UX Patterns - Expandable Text](https://uxpatterns.dev/patterns/content-management/expandable-text) - Implementation reference
