---
date: 2025-12-28T02:44:06+11:00
git_commit: d80b94870fa1b5b84ed152737c6f4e04e25f1a94
branch: refine-iteration-27dec
repository: idamadam.com
topic: "How can the hero 'Add color' interaction onboard users to the vignette interaction model?"
tags: [research, ux-patterns, onboarding, hero, vignettes]
status: complete
last_updated: 2025-12-28
last_updated_by: claude
---

# Research: Hero Interaction as Vignette Onboarding

The current "Add color" button in the hero transforms grayscale panels into vivid colors. While delightful, it's disconnected from how vignettes work (Problem → Solution → Design Notes). The question: how can the hero's first interaction teach visitors the vignette interaction model?

## Recommendation

**Make the hero itself a micro-vignette.** Instead of "Add color" as a standalone gimmick, restructure it as a compressed Problem → Solution experience. The hero becomes a teaching moment: visitors learn "click to reveal" in a low-stakes, delightful context, then recognize the same pattern in the vignettes below.

Think Duolingo: they don't explain how the app works—they drop you into a mini-lesson immediately. Your hero should be a 10-second vignette that demonstrates the interaction vocabulary.

## Quick Comparison

| Option | Teaches Pattern | Implementation | Risk | Verdict |
|--------|-----------------|----------------|------|---------|
| A: Hero as micro-vignette | ✓ Full model | Restructure hero copy + add stage | Low | **Recommended** |
| B: First vignette as onboarding | ✓ Partial | Add subtle tooltip/hint | Low | Quick fallback |
| C: Persistent scroll indicator | ✗ Indirect | Add animated scroll hint | Med | Supplement only |

## Constraints Considered

- **Stack**: React, Framer Motion, VignetteStaged system already exists
- **Existing patterns**: VignetteStaged provides Problem → Solution → Design Notes flow
- **Priority**: Subtlety—shouldn't feel like a tutorial

## Option A: Hero as Micro-Vignette (Recommended)

### Why this works

The hero already has an interactive element ("Add color"). By reframing it as a Problem → Solution reveal, you create what Duolingo calls a "learn by doing" moment. Visitors experience the interaction vocabulary before they scroll to the vignettes. The pattern becomes familiar, not novel.

Key insight from [Duolingo's onboarding](https://userguiding.com/blog/duolingo-onboarding-ux): "From the very first moment in the flow, onboarding is hardly about the app, but instead has its focus on the user, who immediately starts using it."

### Implementation sketch

```tsx
// HeroShaderPanel.tsx - conceptual restructure

// Current: isolated color toggle
<button>Add color</button>

// Proposed: micro-vignette framing
<div className="hero-vignette">
  {!isActive && (
    <div className="problem-state">
      <p className="type-caption">A portfolio that shows, not tells</p>
      <button onClick={handleToggle}>
        <span>See it in action</span>
        <ArrowRight />
      </button>
    </div>
  )}

  {isActive && (
    <div className="solution-state">
      <p className="type-caption">Each project is interactive</p>
      <span className="hint">Scroll to explore ↓</span>
    </div>
  )}
</div>
```

The left side of `VignetteSplit` would update to reflect the stage:
- **Problem state**: "Lead Product Designer" + brief intro
- **Solution state**: Same content, but with a subtle cue that scroll reveals more

### Connection to vignettes

The magic is in the parallel structure:
1. Hero: Click button → grayscale becomes colorful (low stakes, immediate payoff)
2. Vignettes: Click button → problem becomes solution (same gesture, deeper content)

Visitors learn: "clicking reveals the good stuff."

### Gotchas

- Hero text needs to be rewritten to frame the color transition as a reveal, not a toggle
- "Remove color" breaks the metaphor—once revealed, keep it revealed (or make reset very subtle)
- Mobile: ensure the button is prominent without being intrusive

## Option B: First Vignette as Onboarding Beacon

### Why this works

If restructuring the hero feels heavy, the alternative is to make the first vignette (AI Highlights) more discoverable. Add a subtle animated affordance that draws attention to the CTA.

### Implementation sketch

```tsx
// First vignette gets a pulsing hint on the CTA
<motion.button
  animate={{
    boxShadow: isFirstVisit
      ? ['0 0 0 0 rgba(0,0,0,0)', '0 0 0 8px rgba(0,0,0,0.1)', '0 0 0 0 rgba(0,0,0,0)']
      : 'none'
  }}
  transition={{ repeat: 2, duration: 1.5 }}
>
  See how AI helps
</motion.button>
```

Use `localStorage` to track first visit and only show the pulse once.

### Gotchas

- Feels more "tutorial-y" than Option A
- Doesn't teach the pattern before they encounter it—teaches it as they encounter it
- Risk of being ignored if the pulse is too subtle

## Option C: Scroll Indicator (Supplement Only)

A small animated indicator below the hero that suggests scrolling. This is table stakes for long pages but doesn't teach the interaction pattern—it just encourages exploration.

### Implementation

```tsx
<motion.div
  className="scroll-indicator"
  animate={{ y: [0, 8, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  <span className="material-icons">expand_more</span>
</motion.div>
```

### Why it's not enough

Scroll indicators say "there's more below" but don't teach "click to reveal." Use as a supplement to Option A, not a replacement.

## What I Ruled Out

- **Tooltip walkthrough**: Too tutorial-y for a portfolio. Feels condescending. ([NN/g guidelines](https://www.nngroup.com/articles/tooltip-guidelines/) suggest tooltips for complex tools, not portfolios)
- **Intro modal/splash screen**: Friction before content. Portfolios should be zero-friction. ([Appcues research](https://www.appcues.com/blog/user-onboarding-ui-ux-patterns) shows modals increase bounce)
- **Animated hand/cursor demonstration**: Cheesy for a design portfolio. Works for apps, not personal sites.

## Sources

- [Duolingo Onboarding UX Breakdown](https://userguiding.com/blog/duolingo-onboarding-ux) - "learn by doing" pattern, immediate engagement
- [Progressive Disclosure for Onboarding](https://www.loginradius.com/blog/identity/progressive-disclosure-user-onboarding/) - revealing features gradually
- [Appcues: Onboarding UX Patterns](https://www.appcues.com/blog/user-onboarding-ui-ux-patterns) - pattern taxonomy, modal avoidance
- [LogRocket: Hero Section Best Practices](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/) - hero as first impression
- [IxDF: Progressive Disclosure](https://www.interaction-design.org/literature/topics/progressive-disclosure) - cognitive load reduction
- [DesignCode: Mobbin + Figma Course](https://designcode.io/mobbin-design-animation/) - interactive portfolio patterns
