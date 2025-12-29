---
date: 2025-12-29T21:16:29+11:00
git_commit: a533cdb0b5cad4dc248c336efcd19b617c0d26d3
branch: mobile-improvements
repository: mobile-improvements
topic: "Improving mobile vignette experience to match desktop quality"
tags: [research, ux-patterns, mobile, vignettes, responsive-design, bottom-sheet]
status: complete
last_updated: 2025-12-29
last_updated_by: claude
---

# Research: Improving Mobile Vignette Experience

The vignettes break on mobile in several key areas: scattered card layouts overlap, the TUI overlay clips off-screen, and the design notes system loses its spatial context. The goal is to make mobile feel as polished as desktop.

## Recommendation

Given your existing Framer Motion primitives and the fact that you already have a mobile bottom sheet pattern, I'd focus on four targeted fixes rather than a full mobile redesign:

1. **Replace scattered absolute positioning with responsive stacked layouts on mobile** - use CSS Grid with `auto-fit` to gracefully collapse cards
2. **Make the TUI overlay responsive** - either hide it on mobile or scale it to fit within bounds
3. **Add swipe gestures to the bottom sheet** - you have Framer Motion, so adding `drag="y"` with snap points is ~2h of work and brings the sheet to iOS-level polish
4. **Fix the RichTextEditor toolbar** - the "Improve" button clips on mobile; either hide the text label or collapse secondary formatting buttons

This approach uses patterns already in your codebase and avoids introducing new dependencies.

## Quick Comparison

| Option | Effort | Uses Existing | Risk | Verdict |
|--------|--------|---------------|------|---------|
| A: Targeted fixes (responsive cards + swipe sheet) | 4-6h | Framer Motion, existing sheet | Low | **Recommended** |
| B: Mobile-first rebuild with react-modal-sheet | 8-12h | New dependency | Medium | Consider if time allows |
| C: Separate mobile components | 12-16h | New architecture | High | Skip - maintenance burden |

## Constraints Considered

- **Stack**: Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4
- **Existing patterns**: `MobileDesignNotesSheet` (bottom sheet), `VignetteSplit` (responsive grid), `useReducedMotion` hook
- **Priority**: Polish and parity with desktop - the current mobile experience feels unfinished

## Issues Identified

### 1. Scattered Card Layouts Break on Mobile

**File**: `src/components/vignettes/ai-highlights/HighlightsPanel.tsx:186-192`

```tsx
const feedbackCardPositions = [
  { top: '5%', left: '5%', rotate: -4 },
  { top: '8%', right: '8%', rotate: 3 },
  // ...cards use absolute positioning with percentages
];
```

On narrow screens, these cards overlap and become unreadable. Same issue in `SandboxPanel.tsx:34-39`.

### 2. TUI Overlay Clips Off-Screen

**File**: `src/components/vignettes/prototyping/SandboxPanel.tsx:182-184`

```tsx
className="absolute bottom-0 right-0 bg-[#09090B] rounded-lg w-[420px]"
style={{ transform: 'translate(0, 50%)' }}
```

Fixed 420px width clips on mobile viewports. The overlay should either scale down or be hidden on small screens.

### 3. Bottom Sheet Lacks Touch Gestures

**File**: `src/components/vignettes/shared/MobileDesignNotesSheet.tsx`

The sheet has keyboard navigation and button-based prev/next, but no swipe-to-dismiss or drag-to-snap - standard mobile expectations per [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/modality) and [Mobbin patterns](https://mobbin.com/glossary/bottom-sheet).

### 4. No Intermediate Tablet Breakpoint

Layout jumps from fully stacked (mobile) to two-column (lg: 1024px). Tablets in the 768-1024px range get the mobile layout despite having room for more.

### 5. RichTextEditor Toolbar Clips "Improve" Button on Mobile

**File**: `src/components/demos/RichTextEditor.tsx:30-71`

```tsx
<div className="bg-white flex items-center gap-1.5 p-1.5">
  {/* Text formatting buttons: Bold, Italic, Underline, List */}
  {/* Dividers */}
  {/* Improve button at end */}
  <button className="btn-interactive btn-primary h-10 px-3 py-2">
    <span className="material-icons-outlined">auto_awesome</span>
    <span className="text-sm">Improve</span>
  </button>
</div>
```

The toolbar uses a horizontal `flex` layout with no wrapping or overflow handling. On narrow viewports, the "Improve" button at the end gets clipped. This is particularly visible in the AI Suggestions vignette where the button is the primary CTA.

**Fix options:**
1. **Collapse formatting buttons on mobile (recommended)**: Hide Bold/Italic/Underline/List on mobile since they're decorative in this demo - keeps the full "Improve" button visible as the hero CTA
2. **Responsive toolbar**: Wrap or stack buttons on mobile using `flex-wrap` or switch to a 2-row layout
3. **Horizontal scroll**: Add `overflow-x-auto` to allow swiping to reveal the button (not recommended - hidden affordance)
4. ~~**Icon-only on mobile**~~: Loses the clarity of the "Improve" label which is central to the vignette's message

---

## Option A: Targeted Fixes (Recommended)

### Why this works
Addresses the three most visible issues without architectural changes. Uses existing Framer Motion patterns. Can be shipped incrementally.

### Implementation sketch

**Fix 1: Responsive scattered cards**

```tsx
// Replace absolute positioning with responsive grid on mobile
function ProblemState({ cards }) {
  return (
    <div className="relative min-h-[400px] flex flex-col items-center justify-end p-8">
      {/* Mobile: stacked cards, Desktop: scattered absolute */}
      <div className="lg:absolute lg:inset-0 grid gap-3 lg:block mb-6 lg:mb-0">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`
              bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200
              lg:absolute lg:max-w-[220px]
            `}
            style={
              // Only apply absolute positioning on desktop (via CSS or JS check)
              isDesktop ? {
                top: positions[index].top,
                left: positions[index].left,
                transform: `rotate(${positions[index].rotate}deg)`,
              } : {}
            }
          >
            {/* card content */}
          </motion.div>
        ))}
      </div>
      <button>CTA</button>
    </div>
  );
}
```

Alternatively, use a `useMediaQuery` hook or Tailwind's responsive classes to conditionally render different layouts entirely.

**Fix 2: Responsive TUI overlay**

```tsx
// Scale or hide on mobile
<motion.div
  className="
    absolute bottom-0 right-0
    w-[280px] sm:w-[340px] lg:w-[420px]
    lg:translate-y-1/2
    hidden sm:block  /* or scale it down */
  "
>
```

Or: create a condensed mobile version that shows a "Remix" button that opens a modal with the TUI content.

**Fix 3: Swipe gestures for bottom sheet**

```tsx
// Add drag support to MobileDesignNotesSheet
<motion.div
  className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50"
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={{ top: 0, bottom: 0.5 }}
  onDragEnd={(_, info) => {
    // Dismiss if dragged down past threshold
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  }}
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
>
```

This matches iOS sheet behavior and uses your existing Framer Motion setup.

**Fix 4: Responsive RichTextEditor toolbar**

```tsx
// Collapse formatting buttons on mobile, keep full "Improve" button
<div className="bg-white flex items-center gap-1.5 p-1.5">
  {/* Hide decorative formatting buttons on mobile */}
  <div className="hidden sm:flex items-center gap-1.5">
    <button>Bold</button>
    <button>Italic</button>
    <button>Underline</button>
    <div className="divider" />
    <button>List</button>
    <div className="divider" />
  </div>
  {/* Improve button always visible with full label */}
  <button className="btn-interactive btn-primary h-10 px-3 py-2">
    <span className="material-icons-outlined">auto_awesome</span>
    <span className="text-sm">Improve</span>
  </button>
</div>
```

The formatting buttons are decorative in this demo context - hiding them on mobile keeps the "Improve" CTA front and center, which is the whole point of the vignette.

### Similar to in codebase
- `MobileDesignNotesSheet.tsx` already uses spring animations for the sheet
- `VignetteSplit.tsx` shows the responsive grid pattern with `lg:grid-cols-[360px_1fr]`

### Gotchas
- `drag="y"` requires `touch-action: none` on the element to prevent scroll interference
- Test on iOS Safari specifically - sheets can interact oddly with the browser chrome
- Consider `useDragControls` if you want the drag handle to be the only draggable area

---

## Option B: react-modal-sheet Integration

### Why consider this
If you want production-ready sheet behavior without building it yourself, [react-modal-sheet](https://github.com/Temzasse/react-modal-sheet) provides snap points, keyboard avoidance, and accessibility out of the box.

### Implementation sketch

```tsx
import Sheet from 'react-modal-sheet';

function MobileDesignNotes({ isOpen, onClose, notes }) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[400, 200, 0]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {/* Your existing note content */}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
```

### Gotchas
- Adds ~15KB to bundle (gzipped)
- Requires React 18+ (you have React 19, so fine)
- Style customization uses CSS variables which may conflict with your Tailwind setup

---

## What I Ruled Out

- **Separate mobile component tree**: Too much duplication and maintenance burden for a portfolio site
- **CSS-only scattered card animation**: Can't replicate the staggered Framer Motion animations
- **Vaul (Drawer)**: Similar to react-modal-sheet but less documented; your existing sheet is already close to feature parity
- **Full page takeover on mobile**: Loses the "vignette" feel - they should remain embedded experiences

---

## Sources

- [Mobbin Bottom Sheet UI Design](https://mobbin.com/glossary/bottom-sheet) - Best practices and 12,500+ real examples of bottom sheet patterns
- [Apple HIG: Modality](https://developer.apple.com/design/human-interface-guidelines/modality) - Sheet behavior expectations for iOS users
- [Framer Motion Gestures](https://www.framer.com/motion/gestures/) - `whileTap` as mobile fallback for `whileHover`, drag gesture implementation
- [react-modal-sheet](https://github.com/Temzasse/react-modal-sheet) - Production-ready sheet library with Framer Motion
- [CSS Grid Responsive Cards](https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/) - `auto-fit` + `minmax()` pattern for no-media-query responsiveness
- [Mobile vs Desktop UI Design](https://medium.com/design-bootcamp/mobile-vs-desktop-ui-design-key-differences-and-best-practices-727bfe8f9461) - Touch target sizing (20-25% larger on mobile)
- [Linear App](https://www.eleken.co/blog-posts/mobile-ux-design-examples) - Reference for tight transitions and focused mobile interactions
