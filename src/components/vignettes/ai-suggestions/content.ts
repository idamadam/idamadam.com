export interface DesignDetail {
  number: number;
  text: string;
}

export interface ProcessNote {
  text: string;
}

interface AISuggestionsRecommendation {
  title: string;
  description: string;
}

export interface AISuggestionsContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  designDetailsLabel: string;
  designDetails: DesignDetail[];
  processNotesLabel: string;
  processNotes: ProcessNote[];

  // Right panel content
  questionText: string;
  beforeText: string;
  recommendations: AISuggestionsRecommendation[];
}

export const aiSuggestionsContent: AISuggestionsContent = {
  // Left panel content
  projectName: 'AI Suggestions',
  headline: 'AI assistance that respects agency',
  body: 'Managers needed help writing better feedback, but AI that takes over erodes critical thinking. I designed an approach that keeps humans in control.',
  designDetailsLabel: 'Design details',
  designDetails: [
    {
      number: 1,
      text: 'Improve button lives in the editor, not buried in a menu',
    },
    {
      number: 2,
      text: 'AI gradient signals assistance without being intrusive',
    },
    {
      number: 3,
      text: 'Each suggestion explains what makes feedback effective',
    },
  ],
  processNotesLabel: 'Process notes',
  processNotes: [
    {
      text: 'Focused on agency from the start. The question was how to make AI feel like a tool you reach for, not something imposed.',
    },
    {
      text: 'This was early 2024. Models were less capable, so a minimal approach made sense. We did not trust LLMs enough to be more aggressive.',
    },
    {
      text: 'I designed the AI gradient pattern here. It became Culture Amp\'s standard signifier for AI features.',
    },
    {
      text: '80% of managers who used Improve made changes to their feedback.',
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
