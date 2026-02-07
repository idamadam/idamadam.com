# Marker Stories Session

## What this is
A summary of the Feb 7 conversation about repurposing vignette annotations, plus an interview guide to extract better marker stories for each vignette. When you're ready, tell Claude to "interview me for marker stories" and work through these one vignette at a time.

---

## Summary of findings

### The problem
Your 3 numbered markers per vignette are currently **labels** — they describe what UI elements do, not why they exist. Examples:
- "Summary surfaces themes across all feedback" (describes what)
- "One-click translation built in" (describes what)
- "Improve button lives in the editor, not buried in a menu" (describes what)

### What they should be
Windows into **decisions** — 2-3 sentence micro-narratives about what was considered, what was tried, and what evidence drove the choice. These are what separate a Staff portfolio from a Senior one.

The difference:
- **Label:** "Unified dropdown replaces separate cycles per language"
- **Story:** "Admins were running 4 separate review cycles to support 4 languages. We almost shipped a 'duplicate cycle' button. Research showed the real pain was keeping translations in sync, not the setup itself. One dropdown, one cycle."

### The three-layer model
| Layer | Time | Audience | Your current state |
|---|---|---|---|
| Homepage scan | 5-30s | Recruiter | Strong |
| Interactive exploration | 1-3 min | Hiring manager browsing | Strong |
| Strategic narrative | 5-15 min | HM prepping for interview | Missing |

The markers can serve layer 2 better (thinking, not labels). Layer 3 might need a separate artifact (interview deck, expandable section, or linked page) — but that's a separate decision.

### What VPs/recruiters/staff designers all agreed on
1. **Craft is table stakes at Staff level.** Your interactive demos prove craft. The markers need to prove judgment.
2. **The portfolio website's job is to get a conversation.** Don't try to make it do the interview's job.
3. **55 seconds.** That's how long a recruiter spends. The markers need to reward a quick hover, not require deep reading.
4. **Show influence and ambiguity navigation.** The process notes on the left panel already hint at this ("I advocated for...", "I played an active part in managing up...") but the markers don't.
5. **No carousels needed.** Your current VignetteSplit format (always visible, no staged reveals) is correct for the scan-first audience.

### Key sources worth reading
- Mark Parnell (Atlassian): "How focusing on process is ruining your design portfolio" — the pendulum swung too far on process documentation
- Brian Lovin: "How to give a great product design portfolio presentation" — lead with judgment and decision-making demonstrated through real artifacts
- Helena Seo (DoorDash): T-shaped leadership — breadth across responsibilities + depth in one craft area
- Dan Saffer: Online portfolio vs interview presentation are two different artifacts for two different audiences
- Capital One: "The Trouble with Show Don't Tell" — pure demonstration without narrative leaves too much work for the reviewer

---

## Interview guide: finding marker stories

For each vignette, I'll ask questions designed to surface the **decision behind each marker point**. The goal is to replace each label with a 1-3 sentence story that reveals your thinking.

A good marker story has:
- **What was considered** (the alternative, the original plan, the assumption)
- **What shifted** (the research, the insight, the constraint, the pushback)
- **Why this answer** (the reasoning, the evidence, the trade-off)

Not every marker needs all three, but it needs at least the "why" — something a label doesn't give you.

---

### Vignette 1: AI Highlights

**Current markers:**
1. "Summary surfaces themes across all feedback"
2. "Each theme links behavior to situation"
3. "Themes link back to source quotes, expand one to see."

**Current process notes (left panel):**
- Joined after initial discovery, owned design through validation, iteration, and launch
- Defined the interaction model, worked with data science on prompt quality
- High visibility project with heavy exec feedback, managed up on framing

**Interview questions:**

**Marker 1 — Themes across feedback:**
- The AI could have surfaced feedback in many ways — individual quotes, sentiment scores, a word cloud, a summary paragraph. Why themes? What did you try before landing on this structure?
- How did you decide what level of abstraction was right? Too high and it's generic, too low and you're just quoting back to the manager.
- Was there a moment in testing or iteration where the structure changed?

**Marker 2 — Behavior linked to situation:**
- This is a specific framing choice — not just "what they did" but "what they did in what context." Where did that come from? Was it informed by the People Scientists? By feedback best practices?
- What was the prompt engineering challenge here? How much of this was design vs. working with data science to get the output right?
- Did managers trust the behavioral descriptions? What happened when the AI got it wrong?

**Marker 3 — Source quotes / verifiability:**
- This seems like a trust mechanism — showing your work. Was trust the primary concern? What research or feedback told you managers needed to verify?
- Was there tension between showing sources (transparency) and the whole point of the summary (saving time)?
- The "expand to see" interaction — was there a version where sources were always visible? What made you hide them behind a click?

**Bonus — the exec feedback story:**
- You mention heavy exec feedback and managing up. What did the execs want that you pushed back on? What did they see that you didn't?
- How did you get the framing right? What was the framing before and after?

---

### Vignette 2: AI Suggestions

**Current markers:**
1. "Improve button lives in the editor, not buried in a menu"
2. "AI gradient signals assistance without being intrusive"
3. "Each suggestion explains what makes feedback effective"

**Current process notes (left panel):**
- Worked with People Scientists to craft suggestions grounded in feedback best practices
- Designed to fit into any Rich Text Editor at Culture Amp — other teams adopted it

**Interview questions:**

**Marker 1 — Button placement:**
- "Not buried in a menu" implies you considered a menu. What were the other placement options? Why was inline the winner?
- Was there pushback on putting AI this prominently in the writing flow? Did anyone worry about it being distracting or pushy?
- How did you decide when to show the button? Is it always there, or does it appear contextually?

**Marker 2 — AI gradient:**
- You designed a visual language for "AI is here but not taking over." What were the other visual approaches you tried?
- How did you balance "this is AI-powered" (which some users want to know) with "this isn't scary" (which some users need)?
- The gradient specifically — what other visual treatments did you explore? Why gradient over an icon, a label, a different color?

**Marker 3 — Suggestions that teach:**
- The suggestions explain WHY the feedback is weak, not just HOW to fix it. That's a deliberate pedagogical choice. Where did that come from?
- "We didn't want AI to take over critical thinking" — how did you draw that line? What would "AI taking over" have looked like?
- Was there a version that just rewrote the feedback for the manager? Why didn't you ship that?

**Bonus — the Rich Text Editor portability story:**
- You designed this to be portable across Culture Amp's products. That's a systems thinking move. Was that the plan from the start, or did you see the opportunity and advocate for it?
- What did it take to make it portable? Was there a technical or design constraint that shaped the approach?

---

### Vignette 3: Prototyping / Design Sandbox

**Current markers:**
1. "Shared library shows all prototypes across the org"
2. "Each designer gets a personal homepage for their work"
3. "Custom slash commands make onboarding fast and easy"

**Current process notes (left panel):**
- Built the tools + wrote documentation + ran onboarding sessions
- Introduced remix workflow (pull and remix existing prototypes)
- One team prototyped a feature that got exec buy-in on a major release

**Interview questions:**

**Marker 1 — Shared library:**
- What was happening before the shared library? Were prototypes living in individual repos, Figma files, Slack threads?
- Why visibility across the org? Was there a specific problem with prototypes being duplicated or invisible?
- Did you have to convince anyone that prototypes should be visible to everyone, not just the creator's team?

**Marker 2 — Personal homepage:**
- Why personal homepages? What's the design thinking behind giving each person their own space inside a shared tool?
- Was this about ownership, discovery, or something else?
- Did usage patterns change when people had their own page?

**Marker 3 — Slash commands:**
- Slash commands are an opinionated interaction choice. What was the alternative? A GUI? A template picker?
- How did you decide the onboarding UX for a tool built for designers (who may or may not be comfortable with CLIs)?
- "Make onboarding fast and easy" — how fast? What was the before and after?

**Bonus — the exec buy-in story:**
- One team used this to prototype something that convinced executives. What was the feature? Why did a prototype succeed where a deck or mockup wouldn't have?
- Did that moment change how the org viewed prototyping?

**Bonus — the personal project origin:**
- Your vibe-coding vignette mentions this was the proving ground for the Design Sandbox. What specifically did you learn personally that you brought to the team tool?

---

### Vignette 4: Multilingual

**Current markers:**
1. "Unified dropdown replaces separate cycles per language"
2. "One-click translation built in"
3. "Importing & exporting a spreadsheet fit the existing workflows admins used to manage translations"

**Current process notes (left panel):**
- Advocated for machine translation + spreadsheet import/export. Original scope was just a basic form.
- Designed translation layer to fit into existing performance cycle setup
- Workflow became a template for multilingual content across Culture Amp

**Interview questions:**

**Marker 1 — Unified dropdown:**
- The old way was separate cycles per language. How painful was that actually? What did admins tell you?
- Was there resistance to the unified approach? Did anyone argue for keeping cycles separate?
- What breaks when you unify? What new problems did this create that you had to solve?

**Marker 2 — One-click translation:**
- You advocated for machine translation when it wasn't in scope. What did you see that the team didn't?
- Was there concern about translation quality? How did you address that?
- "One-click" is a strong simplification. What complexity is hidden behind that click?

**Marker 3 — Spreadsheet import/export:**
- This came from research — admins were already managing translations in spreadsheets. Tell me about that research. What did you see?
- The original scope was "a basic form." How did you expand it? Did you have to fight for it?
- Why was meeting admins in their existing workflow the right move vs. giving them a better tool inside the product?

**Bonus — the template story:**
- Your workflow became the template for multilingual content across Culture Amp. Did you design it with that in mind, or did it happen organically?
- What made it reusable? Was there a deliberate abstraction, or did another team just copy it?

---

### Vignette 5: Home Connect

**Current markers:**
1. "A unified feed brings critical updates from across the product"
2. "Cards surface people who need attention, not feature categories"
3. "New notification type nudges managers about stale goals"

**Current process notes (left panel):**
- Team originally considering dashboard (each feature team gets their own section). Advocated for people-centered approach.
- Ran a small experiment to prove hypothesis

**Interview questions:**

**Marker 1 — Unified feed:**
- What did the homepage look like before? What were managers actually seeing when they logged in?
- A feed is a strong structural choice — it implies chronology, priority, and editorial decisions about what surfaces. How did you decide what goes in the feed vs. what doesn't?
- Was there a risk of the feed becoming noisy? How did you handle signal vs. noise?

**Marker 2 — People, not features:**
- This is a major reframe — from "here's what the product can do" to "here are the people who need you." Tell me how you got there.
- The team wanted a dashboard with feature sections. How did you argue against that? What was the conversation like?
- "Cards surface people who need attention" — how do you decide who needs attention? What signals drive that?

**Marker 3 — Stale goals notification:**
- This is a specific, pointed intervention. What made stale goals the thing to nudge about?
- Was there data showing that managers didn't know goals were going stale, or that they knew and didn't act?
- A new notification type is a product decision, not just a design decision. How did you drive that?

**Bonus — the experiment:**
- You ran a small experiment to get buy-in. What was the experiment? What did it prove? How did it change the conversation?
- 255% increase in 1-on-1 scheduling — was that from the experiment or from launch? What was the mechanism?

---

### Vignette 6: Vibe Coding (Exploration)

**No numbered markers currently.** Uses narrative notes instead. Questions for potential markers or to strengthen the notes:

- What was the specific problem you were solving for yourself? What was prototyping like before this tool?
- "Figured out how to bring a coding agent CLI into a browser" — what was hard about that? What did you try that didn't work?
- How did this change your own design process? Can you point to a specific project where this tool made the difference?
- "I can design and build" — what does that actually mean in practice? What can you do that a designer who can't code can't?

---

## How to run the session

1. Pick up the conversation and say **"interview me for marker stories"**
2. We'll go vignette by vignette
3. I'll ask the questions above, plus follow-ups based on your answers
4. For each marker, we'll draft a 1-3 sentence replacement that captures the decision, not the description
5. Once we have all the stories, we can update the `content.ts` files

## Open questions to think about
- Do you want 3 markers per vignette, or could some have 2 or 4?
- Are there markers pointing at the wrong things entirely? (e.g., should a marker point at something not currently highlighted?)
- Is there a vignette where the left-panel process notes are actually the better story, and the markers should echo that instead of pointing at UI?
- Do you want to tackle the "Layer 3" depth question (expandable sections, linked pages, video) as part of this, or separately?
