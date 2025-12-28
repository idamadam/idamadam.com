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
  questionNumber: number;
  questionText: string;
  instructionText: string;
  beforeText: string;
  recommendations: AISuggestionsRecommendation[];
  sharingNote: string;
}

export const aiSuggestionsContent: AISuggestionsContent = {
  stages: {
    problem: {
      title: 'Managers struggled to write constructive, actionable feedback',
      description: ''
    },
    solution: {
      title: 'Designed AI coaching grounded in people science',
      description:
        'I partnered with organizational psychologists to create AI suggestions backed by research. The system scans for specific, impactful, objective, and actionable qualities, giving managers structured guidance to improve their feedback.'
    },
    designNotes: {
      title: 'Design notes',
      description: 'Annotated notes showing the thinking behind the design.'
    }
  },
  designNotes: {
    notes: [
      {
        id: 'editor-integration',
        label: 'Contextual placement',
        detail: 'The Improve button lives inside the editor, right where managers are writing. No context switch needed.',
        x: '-4%',
        y: '12%',
        popoverSide: 'left' as const,
      },
      {
        id: 'people-science',
        label: 'People science foundation',
        detail: 'Partnered with org psych to ground suggestions in research. The 4 qualities (specific, impact, actions, objective) are evidence-based.',
        x: '104%',
        y: '52%',
        popoverSide: 'right' as const,
      },
      {
        id: 'loading-state',
        label: 'Processing feedback',
        detail: 'The animated gradient border signals AI is working. Designed to feel premium and build anticipation for the suggestions.',
        x: '-4%',
        y: '88%',
        popoverSide: 'left' as const,
      }
    ]
  },
  questionNumber: 2,
  questionText: 'How has this person progressed over this review period?',
  instructionText:
    "Explain how this growth has helped this person achieve their goals...",
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
  ],
  sharingNote: 'May be shared with Lena'
};
