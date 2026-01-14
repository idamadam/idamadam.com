import { DesignNote, VignetteStages } from '../types';

export interface FeedbackSource {
  id: string;
  content: string;
  from?: string;
  avatarUrl?: string;
}

interface AIHighlightsContent {
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
  problemCards: FeedbackSource[];
}

export const aiHighlightsContent: AIHighlightsContent = {
  stages: {
    solution: {
      title: 'Designed AI summaries managers could verify and trust'
    },
    designNotes: {
      title: 'Design notes'
    }
  },
  designNotes: {
    notes: [
      {
        id: 'context-first',
        detail: 'Managers are busy so the summary lets them know the key details before diving in.',
        x: '-4%',
        y: '18%',
        popoverSide: 'left' as const,
      },
      {
        id: 'verification',
        detail: "Tuned the prompts to include specifics like project names, based on user feedback.",
        x: '-4%',
        y: '45%',
        popoverSide: 'left' as const,
      },
      {
        id: 'sources',
        detail: "Try expanding the sources. Avatars and clear affordances make it easy to verify AI output.",
        x: '104%',
        y: '72%',
        popoverSide: 'right' as const,
      }
    ]
  },
  problemCards: [
    {
      id: 'feedback1',
      content: "Idam's user research helped us understand why managers weren't trusting the AI summaries. That insight shaped how we approached the whole feature.",
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback2',
      content:
        'Good collaboration between design and engineering on the verification UX. The solution worked within our technical constraints.',
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback3',
      content:
        "Idam ran thorough testing with real managers and real feedback. The insights about trust were valuable for the team.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback4',
      content:
        'The inline source expansion lets managers verify AI output without breaking their flow. Useful addition to the feature.',
      from: 'Jordan Lee',
      avatarUrl: '/avatars/jordan-lee.svg'
    },
    {
      id: 'feedback5',
      content:
        'Idam pushed for verification features when we were considering cutting scope. Turned out to be the right call for user trust.',
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback6',
      content: "Built prototyping tools that helped the team iterate faster. Other designers have started using them too.",
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback7',
      content:
        "Design decisions were backed by user testing data. Idam was open to changing direction when the research pointed elsewhere.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback8',
      content:
        "Idam paid close attention to the details of the verification interaction. Small things like showing avatars helped managers trust the sources.",
      from: 'Jordan Lee',
      avatarUrl: '/avatars/jordan-lee.svg'
    }
  ]
};
