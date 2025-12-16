---
date: 2025-12-16T22:55:11+11:00
git_commit: 361297b82e4bf24bcd7aeeae31b8704cfcd89eb7
branch: refine-notes
repository: idamadam.com
topic: "How to adapt desktop redline annotations for mobile screens while maintaining the interactive case study feel"
tags: [research, ux-patterns, ai-highlights, design-notes, responsive, mobile]
status: complete
last_updated: 2025-12-16
last_updated_by: claude
---

# Research: Mobile Annotation Patterns for Design Redlines

## Recommendation

**Use numbered markers with a stacked annotation list below the panel on mobile.** This preserves the "peek behind the curtains" feel by keeping visual markers on the UI mockup while moving the detailed callout text to a tappable accordion below. The bidirectional tap-to-highlight interaction maintains interactivity without fighting the vertical mobile layout. This approach reuses your existing anchor positioning for marker placement and leverages Framer Motion patterns already in your codebase.

## Quick Comparison

| Option | Effort | A11y | Uses Existing | Risk | Verdict |
|--------|--------|------|---------------|------|---------|
| A: Numbered markers + stacked list | 4-6h | ✓ | Anchor positions, Framer ✓ | Low | **Recommended** |
| B: Bottom sheet overlay | 3-4h | ✓ | New primitive needed | Med | Quick fallback |
| C: Coach marks (sequential) | 6-8h | ~ | Custom overlay system | High | Skip - feels tutorial-y |

## Constraints Considered

- **Stack**: React 19, Framer Motion, CSS anchor positioning (with fallbacks)
- **Existing patterns**: `VignetteSplit` stacks vertically on mobile (`lg:grid-cols-[360px_1fr]`), `InlineRedlines` uses CSS anchor() for positioning
- **Priority**: Maintain "interactive case study" spirit, show design thinking, keep it explorable rather than passive

## Option A: Numbered Markers + Stacked List (Recommended)

### Why this works

Your existing CSS anchor positioning already knows where each annotation should appear on the mockup. On mobile, you keep those coordinates but swap the extended callout boxes for small numbered circles. The detailed text moves below the panel in an accordion-style list. Tapping a number in the list pulses the corresponding marker on the mockup (and vice versa), creating a two-way "show me where" interaction that feels like a designer walking someone through their work.

### Implementation sketch

```tsx
// MobileDesignNotes.tsx - shown only on mobile
function MobileDesignNotes({ notes, accent }: { notes: DesignNote[], accent: string }) {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  return (
    <>
      {/* Markers overlaid on the panel - small numbered circles */}
      <div className="lg:hidden pointer-events-auto">
        {notes.map((note, i) => (
          <motion.button
            key={note.id}
            className="design-note-marker"
            data-position={note.position}
            style={{ positionAnchor: `--${note.anchor}` }}
            animate={{
              scale: activeNote === note.id ? 1.3 : 1,
              boxShadow: activeNote === note.id
                ? `0 0 0 8px ${accent}40`
                : `0 0 0 4px ${accent}1a`
            }}
            onClick={() => setActiveNote(note.id)}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      {/* Stacked list below panel */}
      <div className="lg:hidden mt-6 space-y-2">
        {notes.map((note, i) => (
          <motion.button
            key={note.id}
            className="w-full text-left p-3 rounded-xl border flex items-start gap-3"
            style={{
              borderColor: activeNote === note.id ? accent : '#e5e7eb',
              backgroundColor: activeNote === note.id ? `${accent}08` : 'white'
            }}
            onClick={() => setActiveNote(note.id)}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
              style={{ backgroundColor: accent }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-sm" style={{ color: accent }}>{note.label}</p>
              <p className="text-sm text-gray-600 mt-0.5">{note.detail}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
```

```css
/* design-notes.css additions */
.design-note-marker {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

/* Reuse existing anchor positioning for markers */
.design-note-marker[data-position="right"] {
  left: anchor(right);
  top: anchor(center);
  translate: 8px -50%;
}

.design-note-marker[data-position="left"] {
  right: anchor(left);
  top: anchor(center);
  translate: -8px -50%;
}

@media (min-width: 1024px) {
  .design-note-marker { display: none; }
}
```

### Effort

4-6 hours to MVP: Create `MobileDesignNotes` component, add CSS for markers, wire up state for highlighting. Add 1-2 hours for polish (smooth scroll to marker, entry animations for list items).

### Gotchas

- **Tap target size**: Markers need to be at least 44px tap target (the visual can be 24px but hit area should be larger via padding)
- **Anchor positioning fallback**: Your CSS already has `@supports not (anchor-name: --test)` - the markers need fallback percentage positions too
- **Overlapping markers**: If two anchors are close vertically, markers might overlap - consider slight offset or grouping

## Option B: Bottom Sheet Overlay

### Why this works

Bottom sheets are a native mobile pattern users already understand. Tapping "Show design details" slides up a sheet with all annotations. Each annotation row could highlight its corresponding area on the mockup via a dim overlay with spotlight cutout.

### Implementation sketch

```tsx
// Uses a modal/sheet pattern
<AnimatePresence>
  {showDesignNotes && (
    <motion.div
      className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl z-50 max-h-[60vh] overflow-auto"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
    >
      <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
        <span className="font-semibold">Design Details</span>
        <button onClick={toggleDesignNotes}>Close</button>
      </div>
      <div className="p-4 space-y-3">
        {notes.map((note, i) => (
          <div key={note.id} className="flex gap-3">
            <NumberBadge>{i + 1}</NumberBadge>
            <div>
              <p className="font-semibold">{note.label}</p>
              <p className="text-sm text-gray-600">{note.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

### Effort

3-4 hours - simpler than Option A since it doesn't require syncing highlighted states between markers and list.

### Gotchas

- **Disconnection from UI**: The mockup scrolls away or gets obscured when the sheet is open, breaking the visual connection
- **No spatial context**: Users can't see which annotation refers to which part of the UI without numbered markers on the mockup
- **Feels more like docs than "peeking behind curtains"**: Less interactive, more reference material

## Option C: Coach Marks (Sequential)

### Why this works

Coach marks dim the entire screen except a spotlighted element, with a callout pointing to it. This is the most "guided tour" approach - users tap through annotations one by one.

### Why I'd skip it

- Feels like onboarding/tutorial, not "exploration"
- Users can't jump to specific annotations
- Sequential flow fights against the "glanceable" nature of redlines
- Requires building a full overlay + spotlight system (6-8h)

## What I Ruled Out

- **Horizontal scroll carousel**: Breaks the "all visible at once" benefit of redlines, feels disconnected
- **Hover tooltips on markers**: No hover on mobile, tap-and-hold is awkward and undiscoverable
- **Keeping desktop layout on mobile**: Callout boxes extending left/right would overflow or require horizontal scroll
- **Hiding annotations entirely on mobile**: Loses the "peek behind the curtains" differentiator

## Sources

- [Mobbin - Bottom Sheet Examples](https://mobbin.com/explore/mobile/ui-elements/bottom-sheet) - Real app patterns for bottom sheets
- [NN/g - Bottom Sheet Guidelines](https://www.nngroup.com/articles/bottom-sheet/) - When and how to use bottom sheets effectively
- [NN/g - Mobile Instructional Overlays](https://www.nngroup.com/articles/mobile-instructional-overlay/) - Research on coach marks effectiveness
- [Smashing Magazine - Mobile Tooltips](https://www.smashingmagazine.com/2021/02/designing-tooltips-mobile-user-interfaces/) - Mobile-specific tooltip considerations
- [Material Design 3 - Bottom Sheets](https://m3.material.io/components/bottom-sheets) - Platform conventions for sheets
- [FreeFrontend - CSS Hotspots](https://freefrontend.com/css-hotspots/) - Implementation examples for image markers
- [Accordion Design Best Practices](https://blog.hubspot.com/website/accordion-design) - When accordion pattern works well
- [Plotline - Coachmarks and Spotlight](https://www.plotline.so/blog/coachmarks-and-spotlight-ui-mobile-apps) - Mobile coach mark patterns
