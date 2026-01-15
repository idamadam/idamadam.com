---
date: 2026-01-15T11:22:09+11:00
git_commit: 4d5f5833c990f8c98817e3267ca88be0c14272c5
branch: address-feedback
repository: idamadam.com
topic: "Toggle animation between Design Details and Process Notes doesn't feel natural"
tags: [research, ux-patterns, animation, framer-motion, tabs]
status: complete
last_updated: 2026-01-15
last_updated_by: claude
---

# Research: Toggle Content Animation

The current toggle between "Design details" and "Process notes" uses a simple fade + vertical slide (`y: 8` → `0` → `-8`) with `AnimatePresence mode="wait"`. The animation feels mechanical and unnatural.

## Recommendation

**Use a crossfade with spring easing and sliding pill indicator.** The current animation has two issues: (1) the content exits upward while entering from below, creating conflicting spatial direction, and (2) there's no visual continuity on the toggle itself. The fix: add a `layoutId` pill that slides between buttons, and switch content to a pure crossfade (no y-axis movement) with overlapped timing. This matches best-in-class patterns from Linear, Vercel, and iOS segmented controls.

## Quick Comparison

| Option | Effort | Uses Existing | Risk | Verdict |
|--------|--------|---------------|------|---------|
| A: Crossfade + sliding pill | 1-2h | Framer Motion ✓ | Low | **Recommended** |
| B: Direction-aware slide | 2-3h | Framer Motion ✓ | Med | Overkill for 2 tabs |
| C: Spring height animation | 3-4h | New primitive | Med | Complex, subtle gain |

## Constraints Considered

- **Stack**: Framer Motion 12.x, existing `easings.decel` and `timing.stage` in `animations.ts`
- **Existing patterns**: `fadeInUp` uses similar easing, but no tab/toggle pattern exists
- **Priority**: Polish—this is a portfolio piece demonstrating attention to interaction design

## Option A: Crossfade + Sliding Pill (Recommended)

### Why this works

The sliding pill gives immediate visual feedback on the toggle itself, creating continuity between interaction and state change. The crossfade (without y-axis motion) eliminates the spatial confusion of "content leaving one direction, entering from another." A slight overlap in timing (old content at 80% opacity when new content starts) prevents the jarring empty gap that `mode="wait"` creates.

### Implementation sketch

```tsx
// Toggle buttons with layoutId pill
<div className="flex items-center gap-1 mb-3 relative">
  {['designDetails', 'processNotes'].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className="relative px-3 py-1.5 ..."
    >
      {activeTab === tab && (
        <motion.div
          layoutId="toggle-pill"
          className="absolute inset-0 bg-accent-100 rounded-lg"
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        />
      )}
      <span className="relative z-10">{labels[tab]}</span>
    </button>
  ))}
</div>

// Content with pure crossfade (no y-movement)
<AnimatePresence mode="popLayout">
  <motion.ul
    key={activeTab}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.2,
      ease: easings.decel
    }}
  >
    {content}
  </motion.ul>
</AnimatePresence>
```

### Key details

1. **`layoutId="toggle-pill"`**: Framer Motion automatically animates the pill between button positions
2. **`mode="popLayout"`**: Removes exiting element from layout flow immediately, allowing overlap
3. **`type: "spring", bounce: 0.15`**: Subtle overshoot feels natural without being bouncy
4. **Remove y-axis movement**: Pure opacity change avoids spatial confusion

### Gotchas

- The pill needs `position: absolute` with `inset-0` and the button text needs `position: relative; z-index: 10` to layer correctly
- If you later add more toggle groups, wrap in `<LayoutGroup id="unique">` to prevent pill animations bleeding across
- Test with reduced motion—should disable spring and use instant transition

## Option B: Direction-Aware Slide

For carousels or multi-step flows, content should slide in the direction of navigation. For a 2-option toggle this is overkill and potentially confusing (which direction is "forward"?).

### When to use

Only if you expand to 3+ tabs with clear sequential relationship (e.g., steps in a flow).

### Implementation sketch

```tsx
const [[page, direction], setPage] = useState([0, 0]);

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
};

<AnimatePresence initial={false} custom={direction}>
  <motion.div
    key={page}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
  />
</AnimatePresence>
```

## What I Ruled Out

- **Height animation (auto-height)**: Animating container height as content changes adds complexity for minimal visual gain. The content lengths are similar enough that height shifts are negligible.
- **Blur transition**: Trendy but distracting for utilitarian content like design notes.
- **Staggered list items**: Already have stagger on page load; re-staggering on toggle feels slow and repetitive.

## Sources

- [Build UI: Animated Tabs](https://buildui.com/recipes/animated-tabs) - `layoutId` pattern with spring physics
- [Maxime Heckel: Layout Animations](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/) - Avoiding distortion, `LayoutGroup` for isolation
- [SetProduct: Tabs UI Design](https://www.setproduct.com/blog/tabs-ui-design) - "Cross-fade panes over 300ms, never use slide"
- [Motion.dev: Radix Integration](https://motion.dev/docs/radix) - `layoutDependency` pattern
- [iOS TTSegmentedControl](https://github.com/tapptitude/TTSegmentedControl) - Spring damping values (0.7 damping, 0.2 initial velocity)
