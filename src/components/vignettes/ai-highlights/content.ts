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
    accent: string;
    notes: DesignNote[];
    description?: string;
  };
  problemCards: FeedbackSource[];
  sourceAvatars: Record<string, string>;
}

export const aiHighlightsContent: AIHighlightsContent = {
  stages: {
    problem: {
      title: 'Collating and synthesizing feedback was one of the most time-intensive tasks of writing a performance review',
      description: '',
      cta: 'See how AI helped'
    },
    solution: {
      title: 'Designed AI summaries managers could verify and trust',
      description:
        "I designed an AI system that surfaces key highlights and opportunities from feedback. Managers can expand to see direct quotes, verifying AI outputs while saving significant time during review season."
    },
    designNotes: {
      title: 'Design notes',
      description: 'Sharpie-style redlines that show the messy thinking behind the polished surface.'
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
    accent: '#ef4444',
    description: 'Annotated, human notes that show the messy thinking behind the polished surface.',
    notes: [
      {
        id: 'context-first',
        label: 'Summary paragraph',
        detail: 'The summary orients the managers before diving into the details below.',
        anchor: 'summary-anchor',
        position: 'left',
      },
      {
        id: 'verification',
        label: 'AI generated themes',
        detail: "Design research revealed opportunities to refine the model output. Managers wanted richer summaries that show when a behaviour occurred, e.g. project names.",
        anchor: 'highlight-anchor',
        position: 'left',
      },
      {
        id: 'sources',
        label: 'Expandable sources',
        detail: "Avatars of people and clear affordances make it easy to verify AI output.",
        anchor: 'sources-anchor',
        position: 'left',
      }
    ]
  },
  problemCards: [
    {
      id: 'feedback1',
      channel: 'feedback',
      content: "Idam's user research uncovered the core trust issue with AI summaries. This insight shaped our entire product direction.",
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback2',
      channel: 'feedback',
      content:
        'Outstanding collaboration across design and engineering. The verification UX is both elegant and technically feasible.',
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback3',
      channel: 'feedback',
      content:
        "Idam ran the most rigorous AI testing process I've seen. Real feedback, real managers, real insights about trust.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback4',
      channel: 'feedback',
      content:
        'The inline source expansion is brilliant. Managers can verify AI output without leaving their flow. This will save hours.',
      from: 'Jordan Lee',
      avatarUrl: '/avatars/jordan-lee.svg'
    },
    {
      id: 'feedback5',
      channel: 'feedback',
      content:
        'Idam advocated strongly for verification features when we wanted to ship faster. That user-first mindset prevented a trust disaster.',
      from: 'Sarah Chen',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback6',
      channel: 'feedback',
      content: "Built custom prototyping infrastructure to iterate faster. This unlocked velocity we didn't know was possible.",
      from: 'Mike Torres',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback7',
      channel: 'feedback',
      content:
        "Every design iteration was grounded in user testing data. No ego, just evidence. That's how you ship AI features people trust.",
      from: 'Alex Kim',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback8',
      channel: 'feedback',
      content:
        "Idam's attention to the verification interaction details made the difference. AI summaries are worthless if managers don't trust them.",
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
