---
description: Research UX patterns comprehensively with web research and concrete recommendations
---

# Research Design Patterns

You are tasked with conducting comprehensive UX pattern research to answer design questions by searching the web, analyzing patterns, and providing actionable recommendations.

## Initial Setup:

When this command is invoked, respond with:
```
I'm ready to research UX patterns. Describe your design challenge, and I'll explore patterns, check what's already in your codebase, and give you a concrete recommendation.
```

Then wait for the user's design question.

## Steps to follow after receiving the design question:

1. **Gather constraints before researching:**
   - Ask clarifying questions if needed:
     - What's the core interaction problem?
     - What platform/context? (mobile, desktop, responsive)
     - What are the hard constraints? (framework, performance budget, a11y requirements)
     - What matters most? (polish vs. speed, novel vs. conventional, etc.)
   - If the user has already provided sufficient context, proceed directly

2. **Quick codebase pattern discovery (optional):**
   - Scan for similar patterns already implemented in the codebase
   - Check available primitives (animations, components, utilities)
   - Reference: `CLAUDE.md`, `src/lib/`, `src/components/`
   - Note: Skip or abbreviate if no relevant patterns exist - this is helpful context, not a requirement

3. **Conduct targeted web research:**
   - Run 3-5 parallel WebSearch queries covering:
     - Implementations and real examples (not generic definitions)
     - Design system approaches (Material Design, Apple HIG, Radix UI, shadcn/ui)
     - Real-world examples (Mobbin, Page Flows, best-in-class products like Linear, Stripe, Vercel)
     - Mobile/responsive considerations if relevant
     - Accessibility and performance implications
   - Focus on "how do the best products solve this?" not "what is this pattern?"

4. **Synthesize into 2-3 viable options:**
   - For each option, determine:
     - Why it works for this specific context
     - Implementation sketch (pseudo-code or component structure)
     - Similar patterns in codebase (if any exist)
     - Effort estimate in hours (be concrete: "3-4h" not "medium")
     - Gotchas and edge cases to watch for

5. **Make a decisive recommendation:**
   - Lead with: "Given your constraints, I'd do X because..."
   - Tie rationale to specific constraints the user mentioned
   - Suggest what to try first (smallest viable experiment)

6. **Gather metadata for the research document:**
   - Get current date: `date -Iseconds`
   - Get git info: `git rev-parse HEAD && git branch --show-current`
   - Filename: `thoughts/shared/research/YYYY-MM-DD-[topic]-patterns.md`
     - Format: `YYYY-MM-DD-topic-patterns.md` where:
       - YYYY-MM-DD is today's date
       - topic is a brief kebab-case description
     - Examples:
       - `2025-12-16-mobile-annotation-patterns.md`
       - `2025-12-16-bottom-sheet-ux-patterns.md`

7. **Generate research document:**
   - Use the metadata gathered in step 6
   - Structure the document with YAML frontmatter followed by content:

     ```markdown
     ---
     date: [Current date and time with timezone in ISO format]
     git_commit: [Current commit hash]
     branch: [Current branch name]
     repository: [Repository name]
     topic: "[User's Design Question]"
     tags: [research, ux-patterns, relevant-component-names]
     status: complete
     last_updated: [Current date in YYYY-MM-DD format]
     last_updated_by: claude
     ---

     # Research: [User's Design Question]

     [Summary of the user's design question]

     ## Recommendation

     [One paragraph: what I'd do and why, given your constraints. Be decisive, not hedged.]

     ## Quick Comparison

     | Option | A11y | Uses Existing | Risk | Verdict |
     |--------|------|---------------|------|---------|
     | A      |  ✓   | Framer ✓      | Low  | **Recommended** |
     | B      | 2h   | ~    | New primitive | Med  | Quick fallback |
     | C      | 6-8h | ✓    | Custom        | High | Skip unless polish critical |

     ## Constraints Considered

     - **Stack**: [What's available - React, Framer Motion, etc.]
     - **Existing patterns**: [What's already built that's similar, or "None directly applicable"]
     - **Priority**: [What matters most - speed, polish, a11y, etc.]

     ## Option A: [Name] (Recommended)

     ### Why this works
     [2-3 sentences connecting to constraints]

     ### Implementation sketch
     ```tsx
     // Rough approach showing component structure
     ```

     ### Similar to in codebase (if applicable)
     [Link to existing pattern - omit section if none]


     ### Gotchas
     - [Specific issue to watch for]
     - [Browser/device consideration]

     ## Option B: [Name]

     [Same structure, can be shorter]

     ## What I Ruled Out

     - **[Pattern X]**: [One line why - e.g., "Too complex for the payoff"]
     - **[Pattern Y]**: [One line why - e.g., "Doesn't work on mobile Safari"]

     ## Sources

     - [Title](URL) - [one line on what's useful here]
     ```

8. **Present findings and handle follow-ups:**
   - Present a concise summary with your recommendation
   - Ask if they want to explore any option further
   - If the user has follow-up questions, append to the same research document:
     - Add `## Follow-up: [topic]` section
     - Update frontmatter `last_updated` field

## Important notes:

- **Be decisive**: Lead with a recommendation, not a menu of equal options
- **Be concrete**: Hours not "complexity", specific gotchas not vague considerations
- **Be practical**: Implementation sketches show you've thought through the approach
- **Focus on implementations**: Skip generic pattern definitions - find how real products solve this
- **Cite sources**: Every claim should link to where you found it
- **Know when to stop**: 2-3 good options is better than 6 superficial ones

## Key sources to search:

**For pattern research:**
- Mobbin - real app screenshots and flows
- Page Flows - user journey recordings
- NN/g (Nielsen Norman Group) - research-backed guidelines
- Smashing Magazine - in-depth UX articles

**For implementation reference:**
- Radix UI - accessibility-first primitives
- shadcn/ui - modern React patterns with code
- Material Design 3 - comprehensive component specs
- Apple Human Interface Guidelines - platform conventions

**For inspiration:**
- Linear, Vercel, Stripe - best-in-class web products
- Awwwards - creative implementations
- Native platform examples (iOS Settings, Apple Maps, etc.)

## Output quality checklist:

- [ ] Recommendation is decisive and at the top
- [ ] Effort estimates are in hours, not abstract levels
- [ ] Implementation sketches show component structure
- [ ] Gotchas are specific, not generic warnings
- [ ] Sources are linked with brief descriptions of what's useful
- [ ] Ruled-out patterns have one-line dismissal rationale
