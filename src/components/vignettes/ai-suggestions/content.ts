import type { DesignNote, VignetteStages } from '../types';

interface AISuggestionsRecommendation {
  title: string;
  description: string;
}

export interface AISuggestionsContent {
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
  questionText: string;
  beforeText: string;
  recommendations: AISuggestionsRecommendation[];
}

export const aiSuggestionsContent: AISuggestionsContent = {
  stages: {
    problem: {
      title: 'Managers struggled to write constructive, actionable feedback'
    },
    solution: {
      title: 'Designed AI coaching grounded in people science'
    },
    designNotes: {
      title: 'Design notes'
    }
  },
  designNotes: {
    notes: [
      {
        id: 'editor-integration',
        detail: "The button is placed as an extension of the text editor controls, so it's easy to find and use.",
        x: '-4%',
        y: '12%',
        popoverSide: 'left' as const,
      },
      {
        id: 'loading-state',
        detail: 'I designed the gradient border and animation as a way to signify AI, it became the standard across Culture Amp.',
        x: '-4%',
        y: '65%',
        popoverSide: 'left' as const,
      },
      {
        id: 'people-science',
        detail: "Each recommendation explains what's missing. Managers learn to fix their feedback over time through understanding what makes for good feedback.",
        x: '104%',
        y: '52%',
        popoverSide: 'right' as const,
      }
    ]
  },
  questionText: 'How has this person progressed over this review period?',
  beforeText:
    "Alex Johnson has made some progress, but it's not really enough. They still have a long way to go. Their performance hasn't improved much, and they haven't met their goals in a meaningful way. They should try to be better next review period.",
  recommendations: [
    {
      title: 'Be specific:',
      description:
        "The feedback is too general and lacks specific context. It mentions 'progress' and 'goals' but doesn't provide any examples or details about what those goals were, what actions were taken, or what the specific outcomes were."
    },
    {
      title: 'Suggest actions:',
      description:
        'The feedback is vague and does not provide specific, actionable steps for improvement. It states that Alex should "try to be better" but doesn\'t offer concrete suggestions on how to achieve that.'
    }
  ]
};
