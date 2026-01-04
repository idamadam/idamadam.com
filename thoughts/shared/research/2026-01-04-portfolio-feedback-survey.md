---
date: 2026-01-04
topic: "Portfolio Feedback Survey - Non-Leading Question Design"
tags: [research, ux-research, survey-design, feedback, portfolio]
status: complete
last_updated: 2026-01-04
last_updated_by: claude
---

# Research: Portfolio Feedback Survey Design

Goal: Create a short Google Form to collect feedback from design professionals and recruiters about the portfolio website. The survey must use non-leading questions to get unbiased, actionable insights.

## Key Methodology Principles

1. **Neutrality**: Questions allow for positive, neutral, and negative responses equally
2. **Single-construct questions**: Each question measures one thing
3. **Avoid hypotheticals**: Don't ask people to compare to experiences they didn't have
4. **Mix qualitative and quantitative**: Scales provide measurable data; open-ends provide context
5. **Outcome-focused**: Measure what matters (would they hire you?) not just opinions
6. **Actionable insights**: Every question should inform a decision or improvement
7. **Respect respondent time**: 5-6 questions is appropriate for an informal portfolio survey

---

## Problems with Initial Draft Questions

| Original Question | Issue |
|-------------------|-------|
| "How clear was it what kind of designer I am..." | Assumes clarity exists; double-barreled (two concepts in one question) |
| "The vignettes helped me understand better than traditional case studies would have" | Asks to compare against something they didn't experience; positive framing biases toward agreement |
| "What would make this more compelling" | Presupposes insufficiency; primes respondents for criticism |
| "Which vignette resonated most" | Assumes all resonated to some degree; uses internal names users don't see |

---

## Final Recommended Survey

**Title:** Help improve this portfolio (2 minutes)

**Introduction:**
> Thanks for taking a couple minutes to share your feedback on my portfolio. Your perspective is invaluable.

---

### Question 1: Segmentation
**Which best describes you?**
- Designer (Product, UX, UI, Visual, etc.)
- Recruiter or Hiring Manager
- Product Manager
- Engineering/Technical
- Other: ___________

*Why: Enables filtering responses by audience type for targeted insights.*

---

### Question 2: Clarity
**After viewing this portfolio, how clearly could you identify what this designer is skilled at?**

Scale: Not at all clear → Extremely clear (1-5)

*Why: Neutral framing ("how clearly could you identify") doesn't assume clarity exists. Single focus on skills/expertise.*

---

### Question 3: Effectiveness
**How well does this portfolio demonstrate the designer's capabilities?**

Scale: Not at all well → Extremely well (1-5)

*Why: Focuses on the outcome (demonstrating capabilities) rather than specific format. Allows for full range of responses.*

---

### Question 4: Engagement
**Which example(s), if any, did you find most valuable?** (Check all that apply)

- The AI summary with highlighted quotes
- The AI writing suggestions for feedback
- The prototype sharing sandbox
- The translation management system
- The home feed with tasks and direct reports
- The "vibe coding" personal project
- None stood out

Optional follow-up: *Why did these stand out?* (Open-ended)

*Why: Uses descriptions users actually saw, not internal names. "If any" and "None stood out" option prevents forced choice. Brief descriptions aid recall.*

---

### Question 5: Intent (Key Success Metric)
**Based on this portfolio, how likely would you be to reach out for an interview or collaboration?**

Scale: Very unlikely → Very likely (1-5)

**What influenced your answer?** (Optional, open-ended)

*Why: Measures actual intent, which is the ultimate success metric for a portfolio. The "why" reveals decision-making factors.*

---

### Question 6: Open Feedback
**Any other thoughts or feedback?** (All optional)

- What worked well:
- What could be improved:
- Information you expected but didn't find:

*Why: Balanced framing captures both positives and negatives. Three separate fields help respondents organize thoughts without biasing toward criticism.*

---

## Mapping Internal Names to User-Visible Descriptions

| Internal Name | User-Friendly Description |
|---------------|---------------------------|
| AI Highlights | The AI summary with highlighted quotes |
| AI Suggestions | The AI writing suggestions for feedback |
| Prototyping | The prototype sharing sandbox |
| Multilingual | The translation management system |
| Home Connect | The home feed with tasks and direct reports |
| Vibe Coding | The "vibe coding" personal project |

---

## Supplementary Recommendation: Analytics

Survey data is self-reported and subject to bias. Supplement with behavioral analytics:

- Which vignettes get the most interactions (clicks, stage progressions)?
- Where do people drop off?
- Time spent per vignette
- Scroll depth on the page

Behavioral data often reveals what users actually do vs. what they say they prefer.

---

## Survey Timing

- Don't interrupt the experience - show survey link after they've had time to browse
- Consider exit-intent trigger or footer placement
- A/B test survey placement to optimize completion rate

---

## Expected Outcomes

- **Estimated completion time:** 2-3 minutes
- **Estimated completion rate:** 60-70% if well-timed and properly introduced
- **Segmented data:** Filter by designer vs. recruiter for role-specific insights
