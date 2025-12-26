---
date: 2025-12-26T23:50:17+11:00
git_commit: 9349c1e02e7e7a3a7cbc47b640c036280c443a69
branch: styling-first-pass
repository: idamadam.com
topic: "Hero section as interactive 'title' vignette - storytelling introduction"
tags: [research, ux-patterns, hero, vignette, animation, storytelling]
status: refined
last_updated: 2025-12-26
last_updated_by: claude
---

# Research: Hero Section as Interactive Title Vignette

You want to transform your hero from static text ("Idam Adam / Product designer - Maker") into an interactive "title vignette" that's larger than other vignettes and tells a narrative story of who you are, embodying the "show don't tell" philosophy that runs through your portfolio.

---

## Discovery Interview Summary

Through interview questions, we uncovered the following:

### Who You Are (The Real Differentiators)
| Dimension | Finding |
|-----------|---------|
| **Core edge** | High-trust relationships + complex projects with high design bar + deep technical understanding |
| **Superpowers** | Ambiguous 0-to-1 problems, AI/ML product challenges, cross-team alignment |
| **"Maker" means** | Codes production software, prototypes until indistinguishable from real, understands engineering deeply |
| **What's broken** | Designers don't understand tech, siloed from eng reality, don't use AI to increase ambition |
| **Your fix** | Leverage AI tools to explore MORE of the problem space, not just execute faster |

### What the Hero Should Do
| Dimension | Answer |
|-----------|--------|
| **Job** | Frame the story + establish presence |
| **First feeling** | Curious |
| **Curiosity type** | "What's different here?" |
| **NOT doing** | Duplicating vignette demos, leading with AI angle (feels trite) |
| **Key insight** | The vignettes below already prove skills. Hero's job is to signal the portfolio works differently. |

### The Reframe
The original "facet" idea (Designer/Maker/Collaborator with mini-demos) was **hollow** because:
1. The vignettes below already demonstrate those skills
2. It would feel redundant and create fatigue before the real content
3. Generic labels don't capture what's actually different about you

**The hero's real job**: Signal immediately that this portfolio is different. Create the frame that makes the vignettes land harder. The hero itself becomes the first proof of your "show don't tell" philosophy.

---

## Recommendation

**Build a "Frame-Setting" hero vignette** that doesn't duplicate skills shown below, but instead:
1. States who you are (name, role)
2. Immediately breaks the "static portfolio" expectation with something interactive
3. Creates curiosity through differentiation, not demonstration

The hero becomes **meta-proof**: it demonstrates "show don't tell" by being an interactive experience, not by showing your design work.

## Quick Comparison

| Option | A11y | Uses Existing | Effort | Risk | Verdict |
|--------|------|---------------|--------|------|---------|
| A: Interactive Frame Vignette | Fully accessible | VignetteContainer, animations | 3-5h | Low | **Recommended** |
| B: Typewriter + Role Cycling | Accessible with ARIA | New component, Framer Motion | 2-3h | Low | Lighter alternative |
| C: Scroll-Driven Scene | Needs work | Shader, new scroll hooks | 8-12h | Med | High polish, later |

## Constraints Considered

- **Stack**: Next.js, Framer Motion, existing vignette patterns
- **Existing patterns**: fadeInUp animations, ShaderBackground, VignetteContainer
- **Priority**: Create curiosity ("what's different here?"), frame the story, establish presence
- **NOT doing**: Skill demos (vignettes handle that), leading with AI angle
- **Performance**: Current shader is already GPU-intensive; keep hero light

---

## Option A: Interactive Frame Vignette (Recommended)

### Why this works
The hero signals "this portfolio is different" by being interactive itself. It doesn't try to prove your skills (vignettes do that). Instead, it establishes presence and creates anticipation.

### Concept directions to explore

**Direction 1: "Invitation" Hero**
The hero contains a subtle interactive element that invites exploration. Could be:
- Text that responds to cursor/scroll in unexpected ways
- A "pull to reveal" or "click to enter" moment
- The shader background responding to interaction

**Direction 2: "Portfolio as Product" Hero**
Frame the portfolio itself as a product you designed and built. Hero text could hint at this:
- "I believe in showing over telling. This portfolio is built to be tried, not read."
- With a subtle CTA like "Start exploring" that scrolls to first vignette

**Direction 3: "Presence-First" Hero**
Minimal text, maximum presence. Your name + role with an interactive flourish that makes visitors pause and think "this is different." The shader could be the interaction point.

### Implementation sketch (Direction 2 example)
```tsx
// HeroVignette.tsx
<VignetteContainer className="min-h-[60vh]">
  <motion.div {...fadeInUp} className="space-y-8">
    {/* Name with subtle entrance */}
    <motion.h1
      className="type-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Idam Adam
    </motion.h1>

    {/* Role - could have subtle animation */}
    <p className="type-body">Product designer · Maker</p>

    {/* The frame-setting line */}
    <motion.p
      className="type-body max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      I believe in showing over telling. Click through and play
      with each feature below.
    </motion.p>

    {/* Interactive element - scroll hint or explore CTA */}
    <ScrollInvitation />
  </motion.div>
</VignetteContainer>
```

### What makes this "interactive"
The interactivity doesn't need to be complex. Options:
1. **Cursor-reactive shader**: Background responds to mouse position
2. **Scroll-triggered name animation**: Name animates as you scroll past
3. **Hover states on text**: Subtle but unexpected responses
4. **"Explore" button with micro-interaction**: Click triggers smooth scroll + animation

### Similar to in codebase
- `VignetteContainer` for consistent wrapper
- `fadeInUp` animation preset
- `ShaderBackground` already exists, could be enhanced

### Gotchas
- Don't over-engineer the interaction - subtle is better than gimmicky
- The "frame-setting" copy needs to feel natural, not forced
- Mobile needs to feel equally intentional, not a degraded experience

---

## Option B: Typewriter + Role Cycling

### Why this works
Simpler implementation that adds dynamism without complex panels. Your title cycles through roles with a typewriter effect, creating rhythm and intrigue. Works well if you want movement without a full interactive panel.

### Implementation sketch
```tsx
// HeroTypewriter.tsx
const roles = [
  'Product Designer',
  'Maker',
  'Design Technologist',
  'Builder of things'
];

<section className="hero min-h-[50vh]">
  <h1 className="type-display">Idam Adam</h1>

  <motion.div className="type-body">
    <TypewriterCycle
      words={roles}
      typingSpeed={50}
      deletingSpeed={30}
      pauseDuration={2000}
    />
  </motion.div>

  {/* Optional: subtle visual that changes with each role */}
  <RoleVisual activeRole={currentRole} />
</section>
```

### Character-by-character animation pattern
```tsx
// From research: stagger animation technique
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,  // 50ms between each letter
      delayChildren: 0.1
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
};
```

### Gotchas
- Typewriter can feel gimmicky if overused - keep it to one element
- Need `aria-live="polite"` for screen reader users
- Consider a "pause on hover" for users who want to read

---

## Option C: Scroll-Driven Narrative Scene

### Why this works
Creates an immersive "Bruno Simon-style" scroll experience where scrolling reveals your story. Your ShaderBackground could evolve/morph as the user scrolls, with text and visuals appearing in sequence.

### Implementation sketch
```tsx
// HeroScene.tsx
const { scrollYProgress } = useScroll();

<section className="h-[200vh] relative">
  {/* Sticky container that stays in view during scroll */}
  <motion.div
    className="sticky top-0 h-screen"
    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
  >
    <ShaderBackground intensity={scrollYProgress} />

    {/* Name that scales/fades as you scroll */}
    <motion.h1
      style={{
        scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
        y: useTransform(scrollYProgress, [0, 0.5], [0, -100])
      }}
    >
      Idam Adam
    </motion.h1>
  </motion.div>

  {/* Story beats that appear on scroll */}
  <ScrollRevealSection threshold={0.3}>
    <StoryBeat>I design products that...</StoryBeat>
  </ScrollRevealSection>

  <ScrollRevealSection threshold={0.6}>
    <StoryBeat>And build them end-to-end...</StoryBeat>
  </ScrollRevealSection>
</section>
```

### Tools required
- `useScroll` and `useTransform` from Framer Motion
- Lenis or similar for smooth scroll (optional but recommended)
- GSAP ScrollTrigger if more complex timeline needed

### Gotchas
- Scroll-jacking can frustrate users if not done carefully
- Mobile performance is tricky with scroll-driven animations
- Requires more content to justify the scroll length
- Your existing shader might need optimization for scroll-driven updates

---

## What I Ruled Out

- **Faceted skill demos (Designer/Maker/Collaborator)**: Hollow and redundant - vignettes below already prove skills. Creates fatigue before the real content.
- **Leading with AI angle**: Feels trite in 2025. Let the work speak for itself.
- **3D/WebGL Hero (Three.js/R3F)**: Too heavy for a portfolio that already has shader effects and needs fast LCP
- **Full-page video background**: Conflicts with existing ShaderBackground and adds load time
- **Parallax multi-layer**: Often feels dated; your current minimal aesthetic is stronger
- **Draggable/physics-based interactions**: Cute but doesn't convey professional designer identity

---

## Next Steps

1. **Pick a direction** from Option A (Invitation, Portfolio as Product, or Presence-First)
2. **Sketch the copy** - what's the one line that frames the experience?
3. **Define the interaction** - what subtle thing makes visitors pause?
4. **Build it** - likely 3-5h with existing primitives

---

## Sources

- [Framer Blog: Text Animation Techniques](https://www.framer.com/blog/text-animations/) - Character stagger and spring physics patterns
- [Hover.dev Hero Components](https://www.hover.dev/components/heros) - React + Framer Motion hero examples
- [Awwwards Freelance Portfolios](https://www.awwwards.com/awwwards/collections/freelance-portfolio/) - Best-in-class portfolio hero examples
- [Creative Corner Studio: Scroll Animations](https://www.creativecorner.studio/blog/website-scroll-animations) - Scroll-triggered storytelling patterns
- [Three.js Forum: Interactive 3D Portfolio](https://discourse.threejs.org/t/interactive-3d-portfolio-an-immersive-scroll-experience/44520) - Immersive scroll experience example
- [Detachless: Hero Section Best Practices 2025](https://detachless.com/blog/hero-section-web-design-ideas) - Micro-animations and scroll-triggered patterns
- [Joseph Collicoat: Animating Text with Framer Motion](https://www.josephcollicoat.com/articles/animating-text-with-the-intersection-observer-api-and-framer-motion) - IntersectionObserver + text animation
