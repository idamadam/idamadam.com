# Portfolio Project - Vignette Architecture

## Project Overview
Interactive portfolio for Lead Product Designer using a "vignette" approach that emphasizes showing over telling. Each design case study is presented as a self-contained, interactive component embedded directly on the homepage.

## Current Architecture

### Vignette-Based Portfolio (Primary Focus)
The main portfolio experience is on the homepage (`src/app/page.tsx`) featuring modular, interactive vignettes. Each vignette is a self-contained component that demonstrates a design solution through staged interactions rather than traditional long-form case studies.

**Active Vignettes:**
- **AI Highlights**: AI-powered feedback summaries with inline design annotations
- **AI Suggestions**: AI improvement suggestions for performance reviews
- **Prototyping**: Design sandbox for prototype sharing and remixing
- **Multilingual**: Translation management system workflow
- **Home Connect**: Platform cohesion system demo
- **Vibe Coding**: Personal product exploration (under "Explorations" section)

### Legacy Case Study Routes (Deprecated)
Traditional case study pages at `/performance-ai`, `/multilingual`, `/one-on-ones`, and `/home-connect` routes. These are text-heavy, static pages from the previous portfolio approach.

## Technical Stack

### Framework & Core Libraries
- **Next.js 16.0.7**: React 19, Turbopack
- **Tailwind CSS 4**: PostCSS configuration
- **TypeScript 5**: Full type safety across components
- **Framer Motion 12.23.25**: Animation engine
- **react-intersection-observer 10.0.0**: Scroll-triggered animations

### Vignette Component System

#### Foundation Components
Located in `src/components/vignettes/`:

1. **VignetteContainer** - Outer wrapper
   - Rounded borders, white background, subtle gray border
   - Optional padding for title/subtitle sections
   - `allowOverflow` prop for design note annotations that extend beyond bounds
   - Scroll-triggered fade-in-up animation

2. **VignetteSplit** - Two-column layout
   - Left: title (26-28px), description (18px), action buttons
   - Right: interactive content panel
   - Responsive: stacks on mobile, 360-400px left column on desktop
   - Fully customizable via React node props

3. **VignetteStaged** - Multi-stage presentation
   - Manages Problem → Solution → Design Notes flow
   - Integrates with VignetteStageContext for state management
   - Smart CTA unlocking (Design Notes only appear after Solution reveal)
   - Smooth transitions via Framer Motion layout animations

#### Shared Systems

**Type System** (`types.ts`):
```typescript
DesignIteration    // Design evolution steps with annotations
DesignNote         // Inline annotations with positioning
StageContent       // Title/description/CTA for each stage
VignetteStages     // Problem/Solution/Design Notes content
```

**Stage Context** (`src/lib/vignette-stage-context.tsx`):
- State: `problem | solution | designNotes`
- Actions: `goToSolution()`, `goToDesignNotes()`, `reset()`
- Tracks whether solution has been viewed to enable Design Notes CTA

**Animation Presets** (`src/lib/animations.ts`):
- `fadeInUp`: Scroll-triggered reveal (opacity 0→1, y 60→0)
- `stageTransition`: Stage switching animations
- `problemToSolution`: Card scatter to centered layout
- `cardScatter`: Staggered card animations
- `iterationCard`: Individual card reveals

### Vignette Implementation Pattern

Each vignette follows this structure:
```
/vignettes/[name]/
├── [Name]Vignette.tsx      # Main component (30-45 lines)
├── [Name]Panel.tsx         # Interactive content panel
└── content.ts              # All copy, data, and configuration
```

**Standard Composition:**
```tsx
VignetteContainer
└── motion.div (fadeInUp)
    └── VignetteStaged OR VignetteSplit
        └── Custom Panel Component
```

**Content Separation Philosophy:**
All text, data, and configuration lives in `content.ts` files. This creates a single source of truth and allows content updates without touching component logic.

## Design Philosophy

### Vignette vs. Case Study
**Traditional Case Studies:**
- Text-heavy, vertical scrolling pages
- Separate routes requiring navigation
- Linear narrative flow
- Static before/after comparisons

**Vignette Approach:**
- Interactive, component-based modules
- All embedded on homepage - no navigation required
- Staged reveals (Problem → Solution → Design Notes)
- Inline design annotations showing thinking process
- "Show don't tell" - clickable, explorable experiences
- Compact implementations (1-2 screen heights)

### Key Interaction Patterns

1. **Staged Revelation**: Most vignettes follow Problem → Solution → Design Notes flow
2. **Design Notes as Overlay**: Sharpie-style inline annotations positioned via percentages
3. **Scroll-Triggered Animations**: Staggered fade-in-up reveals as user scrolls
4. **Micro-interactions**: Button hover states, arrow movements, card expansions
5. **Responsive Grid**: Max-width 5xl (64rem), centered, consistent spacing

## Development Guidelines

### Adding a New Vignette

1. Create folder: `src/components/vignettes/[name]/`
2. Create files:
   - `[Name]Vignette.tsx` - main component
   - `[Name]Panel.tsx` - interactive content
   - `content.ts` - all copy and data
3. Define content types in `content.ts`
4. Choose layout: `VignetteStaged` (for multi-stage) or `VignetteSplit` (for simple two-column)
5. Import and add to `src/app/page.tsx`
6. Use animation presets from `src/lib/animations.ts`
7. Add scroll trigger with `useInView` hook

### Animation Timing
- Initial scroll reveal: 0.6-0.7s duration, 0.1s delay
- Stage transitions: 0.35s (35ms in LayoutGroup)
- Stagger children: 0.1s between items
- CTA unlock delay: 0.8s after solution reveal

### Responsive Breakpoints
- Mobile: Full-width stacked layout
- Desktop: Two-column at `lg:` breakpoint (1024px)
- Left column: 360-400px on desktop
- Content max-width: 64rem (1024px)

## Content Guidelines

### Writing Style
- **Simple sentences**: Use periods instead of em dashes
- **One idea per sentence**: Avoid complex subordinate clauses
- **Show don't tell**: Let interactive elements demonstrate concepts
- **Concise**: Vignettes should be scannable, not dense
- **Plain English**: Write for accessibility and comprehension

### Vignette Content Structure
Each `content.ts` should export:
- Stage content (problem, solution, design notes)
- Data arrays (cards, iterations, notes)
- Positioning coordinates for design annotations
- Button labels and CTAs

## Business Goals
- Demonstrate "show don't tell" design philosophy
- Showcase technical collaboration through interactive prototypes
- Highlight measurable business impact in compact format
- Display innovation in AI UX and system design
- Differentiate from traditional text-heavy portfolios

## Future Considerations
- The legacy case study routes may be removed entirely
- Consider migrating any valuable content from old routes to new vignettes
- Potential for adding more advanced interactions (3D elements, WebGL, physics-based animations)
- Explore video integration within vignette panels
