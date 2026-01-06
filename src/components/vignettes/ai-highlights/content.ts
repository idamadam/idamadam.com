import { DesignIteration, DesignNote, VignetteStages } from '../types';

export interface FeedbackSource {
  id: string;
  channel?: string;
  content: string;
  from?: string;
  time?: string;
  date?: string;
  status?: string;
  avatarUrl?: string;
}

interface AIHighlightsContent {
  stages: VignetteStages;
  iterations: DesignIteration[];
  designNotes: {
    notes: DesignNote[];
  };
  problemCards: FeedbackSource[];
  sourceAvatars: Record<string, string>;
}

export const aiHighlightsContent: AIHighlightsContent = {
  stages: {
    problem: {
      title: 'Synthesizing feedback was the most time-intensive part of performance reviews',
      cta: 'Show me the summary'
    },
    solution: {
      title: 'Designed AI summaries managers could verify and trust'
    },
    designNotes: {
      title: 'Design notes'
    }
  },
  iterations: [
    {
      id: 'v1',
      label: 'First attempt',
      annotation:
        "AI summaries without sources. User testing revealed managers didn't trust unverifiable AI outputs. They wanted to see the evidence.",
      imageUrl: '/iterations/highlights-v1.png'
    },
    {
      id: 'v2',
      label: 'Added sources',
      annotation:
        "Added expandable source citations. Managers said 'now I can actually verify this' but the interaction felt clunky and broke their flow.",
      imageUrl: '/iterations/highlights-v2.png'
    },
    {
      id: 'final',
      label: 'Final design',
      annotation:
        'Streamlined inline expand with direct quotes. 100% of test users checked sources when easily accessible. Trust and efficiency, together.',
      imageUrl: '/iterations/highlights-final.png'
    }
  ],
  designNotes: {
    notes: [
      {
        id: 'context-first',
        label: 'Summary paragraph',
        detail: 'Managers are busy so the summary lets them know the key details before diving in.',
        x: '-4%',
        y: '18%',
        popoverSide: 'left' as const,
      },
      {
        id: 'verification',
        label: 'AI generated themes',
        detail: "Tuned the prompts to include specifics like project names, based on user feedback.",
        x: '-4%',
        y: '45%',
        popoverSide: 'left' as const,
      },
      {
        id: 'sources',
        label: 'Expandable sources',
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
      channel: 'feedback',
      content: "Idam's user research helped us understand why managers weren't trusting the AI summaries. That insight shaped how we approached the whole feature.",
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback2',
      channel: 'feedback',
      content:
        'Good collaboration between design and engineering on the verification UX. The solution worked within our technical constraints.',
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback3',
      channel: 'feedback',
      content:
        "Idam ran thorough testing with real managers and real feedback. The insights about trust were valuable for the team.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback4',
      channel: 'feedback',
      content:
        'The inline source expansion lets managers verify AI output without breaking their flow. Useful addition to the feature.',
      from: 'Jordan Lee',
      avatarUrl: '/avatars/jordan-lee.svg'
    },
    {
      id: 'feedback5',
      channel: 'feedback',
      content:
        'Idam pushed for verification features when we were considering cutting scope. Turned out to be the right call for user trust.',
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback6',
      channel: 'feedback',
      content: "Built prototyping tools that helped the team iterate faster. Other designers have started using them too.",
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback7',
      channel: 'feedback',
      content:
        "Design decisions were backed by user testing data. Idam was open to changing direction when the research pointed elsewhere.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback8',
      channel: 'feedback',
      content:
        "Idam paid close attention to the details of the verification interaction. Small things like showing avatars helped managers trust the sources.",
      from: 'Jordan Lee',
      avatarUrl: '/avatars/jordan-lee.svg'
    }
  ],
  sourceAvatars: {
    idam: '/avatars/idam.svg',
    'sarah-chen': '/avatars/sarah-chen.svg',
    'mike-torres': '/avatars/mike-torres.svg',
    'alex-kim': '/avatars/alex-kim.svg',
    'jordan-lee': '/avatars/jordan-lee.svg'
  }
};
