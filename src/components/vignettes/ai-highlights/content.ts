import {
  DesignIteration,
  DesignNotesMode,
  ProblemCard,
  VignetteStages
} from '../types';

interface AIHighlightsContent {
  title: string;
  description: string;
  stages: VignetteStages;
  iterations: DesignIteration[];
  designNotes: {
    modes: DesignNotesMode[];
  };
  problemCards: ProblemCard[];
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
      description: 'Choose between a redline pass or a technical inspector to see how the solution came together.'
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
    modes: [
      {
        id: 'redline',
        label: 'Sharpie redlines',
        description: 'Annotated, human notes that show the messy thinking behind the polished surface.',
        accent: '#ef4444',
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
      {
        id: 'inspector',
        label: 'System inspector',
        description: 'A technical pass that shows tokens, spacing, and how verification data flows.',
        accent: '#0ea5e9',
        notes: [
          {
            id: 'ai-surface',
            label: 'AI surface token',
            detail: 'Reused gradient shell to unify AI features and set expectations for model output.',
            x: 22,
            y: 14,
            align: 'left'
          },
          {
            id: 'expansion',
            label: 'Progressive disclosure',
            detail: 'Chevron motion + snap-back keep focus while exposing quotes only when needed.',
            x: 72,
            y: 42,
            align: 'right'
          },
          {
            id: 'signal-density',
            label: 'Signal density',
            detail: 'Two quotes per expand fit inside a 16px vertical rhythm so lists stay scannable.',
            x: 68,
            y: 64,
            align: 'right'
          },
          {
            id: 'quality-loop',
            label: 'Quality loop',
            detail: 'Thumb reactions log per-highlight telemetry to retrain prompts post-launch.',
            x: 30,
            y: 86,
            align: 'left'
          }
        ],
        specs: [
          { label: 'Spacing', value: '24px shell padding, 16px internal rhythm, 12px chips' },
          { label: 'Grid', value: '12-col, 960px max width, 2-column cards on desktop' },
          { label: 'Data', value: 'Quotes mapped to highlights, source count as confidence signal' }
        ]
      }
    ]
  },
  problemCards: [
    {
      id: 'feedback1',
      type: 'feedback',
      content: "Idam's user research uncovered the core trust issue with AI summaries. This insight shaped our entire product direction.",
      from: 'Product Manager',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback2',
      type: 'feedback',
      content:
        'Outstanding collaboration across design and engineering. The verification UX is both elegant and technically feasible.',
      from: 'Engineering Partner',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback3',
      type: 'feedback',
      content:
        "Idam ran the most rigorous AI testing process I've seen. Real feedback, real managers, real insights about trust.",
      from: 'User Researcher',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback4',
      type: 'feedback',
      content:
        'The inline source expansion is brilliant. Managers can verify AI output without leaving their flow. This will save hours.',
      from: 'Design Manager',
      avatarUrl: '/avatars/jordan-lee.svg'
    },
    {
      id: 'feedback5',
      type: 'feedback',
      content:
        'Idam advocated strongly for verification features when we wanted to ship faster. That user-first mindset prevented a trust disaster.',
      from: 'Product Lead',
      avatarUrl: '/avatars/sarah-chen.svg'
    },
    {
      id: 'feedback6',
      type: 'feedback',
      content: "Built custom prototyping infrastructure to iterate faster. This unlocked velocity we didn't know was possible.",
      from: 'Engineering Lead',
      avatarUrl: '/avatars/mike-torres.svg'
    },
    {
      id: 'feedback7',
      type: 'feedback',
      content:
        "Every design iteration was grounded in user testing data. No ego, just evidence. That's how you ship AI features people trust.",
      from: 'Research Partner',
      avatarUrl: '/avatars/alex-kim.svg'
    },
    {
      id: 'feedback8',
      type: 'feedback',
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
