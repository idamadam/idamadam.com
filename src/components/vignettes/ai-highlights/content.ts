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
  title: string;
  description: string;
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
  title: 'Designed AI summaries managers could actually verify and trust',
  description:
    "Performance reviews took hours gathering information from scattered sources. I designed an AI system that surfaces key highlights and opportunities from feedback, goals, and 1-on-1 notes. Managers can expand to see direct quotes, verifying AI outputs while saving significant time during review season.",
  stages: {
    problem: {
      title: 'Synthezising feedback took ages when completing manager reviews',
      description: '',
      cta: 'See how AI helped'
    },
    solution: {},
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
        label: 'Context first',
        detail: 'Name, role, and purpose up top to anchor managers before they scan AI output.',
        x: 18,
        y: 18,
        align: 'left'
      },
      {
        id: 'verification',
        label: 'Verification loop',
        detail: "Sources sit directly under each highlight so managers can trust without hunting.",
        x: 74,
        y: 46,
        align: 'right'
      },
      {
        id: 'mirror',
        label: 'Mirrored patterns',
        detail: 'Highlight and Opportunity share the same layout so scanning feels automatic.',
        x: 24,
        y: 68,
        align: 'left'
      },
      {
        id: 'feedback-loop',
        label: 'Micro feedback',
        detail: "A lightweight 'Is this helpful?' keeps the model accountable without breaking flow.",
        x: 72,
        y: 88,
        align: 'right'
      }
    ]
  },
  problemCards: [
    {
      id: 'feedback1',
      channel: 'feedback',
      content: "Idam's user research uncovered the core trust issue with AI summaries. This insight shaped our entire product direction.",
      from: 'Product Manager',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback2',
      channel: 'feedback',
      content:
        'Outstanding collaboration across design and engineering. The verification UX is both elegant and technically feasible.',
      from: 'Engineering Partner',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback3',
      channel: 'feedback',
      content:
        "Idam ran the most rigorous AI testing process I've seen. Real feedback, real managers, real insights about trust.",
      from: 'User Researcher',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback4',
      channel: 'feedback',
      content:
        'The inline source expansion is brilliant. Managers can verify AI output without leaving their flow. This will save hours.',
      from: 'Design Manager',
      avatarUrl: '/avatars/jordan-lee.svg'
    },
    {
      id: 'feedback5',
      channel: 'feedback',
      content:
        'Idam advocated strongly for verification features when we wanted to ship faster. That user-first mindset prevented a trust disaster.',
      from: 'Product Lead',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback6',
      channel: 'feedback',
      content: "Built custom prototyping infrastructure to iterate faster. This unlocked velocity we didn't know was possible.",
      from: 'Engineering Lead',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback7',
      channel: 'feedback',
      content:
        "Every design iteration was grounded in user testing data. No ego, just evidence. That's how you ship AI features people trust.",
      from: 'Research Partner',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback8',
      channel: 'feedback',
      content:
        "Idam's attention to the verification interaction details made the difference. AI summaries are worthless if managers don't trust them.",
      from: 'Product Designer',
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
