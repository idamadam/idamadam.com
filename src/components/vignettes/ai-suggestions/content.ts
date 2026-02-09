import { DecisionStory } from '../shared/DecisionStories';

interface AISuggestionsRecommendation {
  title: string;
  description: string;
}

export interface AISuggestionsContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  decisionStories: DecisionStory[];

  // Right panel content
  questionText: string;
  beforeText: string;
  recommendations: AISuggestionsRecommendation[];
}

export const aiSuggestionsContent: AISuggestionsContent = {
  // Left panel content
  projectName: 'AI Suggest Improvements',
  headline: 'AI suggestions to help managers write better feedback',
  body: "We saw AI assistance as a natural fit for making feedback better, but we didn't want AI to take over critical thinking. I designed suggestions that helped managers understand how to give better feedback.",
  decisionStories: [
    {
      id: 'improve-button-placement',
      title: 'Why does the Improve button live in the editor?',
      story:
        "We explored several approaches: a menu option, a Grammarly-style floating circle, and automatic review that would analyse text without any user action. Auto-review wasn't viable — calling the LLM on every keystroke was too costly. The floating circle conflicted with tools managers already used, like Grammarly itself. The explicit button in the editor toolbar felt most natural in context and had a crucial side benefit: it made the feature portable to any Rich Text Editor across Culture Amp.",
      highlightSection: 1,
    },
    {
      id: 'designing-feel-of-ai',
      title: 'How did I design the feel of AI?',
      story:
        'I prototyped every detail of this interaction — gradient colours, rotation speed, transition timing, micro-interactions — using an LLM-assisted workflow to iterate rapidly on the code directly. This let me tune the feel of the AI experience to be helpful without being aggressive, designing in the material rather than specifying from mockups.',
      highlightSection: 2,
    },
    {
      id: 'suggest-not-rewrite',
      title: 'Why suggest improvements instead of rewriting?',
      story:
        "This was early 2024 — LLM capabilities were uncertain and we were concerned about human autonomy. Managers needed to keep their own judgment, not outsource it to AI. Working with Culture Amp's People Scientists, we shaped suggestions that explain why feedback falls short, so managers learn the principle rather than accept a rewrite.",
      highlightSection: 3,
    },
    {
      id: 'measuring-success',
      title: 'How did I measure success?',
      story:
        '80% of managers made changes to their feedback after clicking Improve, validating that the suggestions were genuinely useful — not just novelty clicks.',
    },
  ],

  // Right panel content
  questionText: 'How has this person progressed over this review period?',
  beforeText:
    "Alex Johnson has made some progress, but it's not really enough. They still have a long way to go. Their performance hasn't improved much, and they haven't met their goals in a meaningful way. They should try to be better next review period.",
  recommendations: [
    {
      title: 'Be specific:',
      description:
        "The feedback is too general and lacks specific context. It mentions 'progress' and 'goals' but doesn't provide any examples or details about what those goals were, what actions were taken, or what the specific outcomes were.",
    },
    {
      title: 'Suggest actions:',
      description:
        'The feedback is vague and does not provide specific, actionable steps for improvement. It states that Alex should "try to be better" but doesn\'t offer concrete suggestions on how to achieve that.',
    },
  ],
};
