export interface FeedbackSource {
  quote: string;
  reviewer: string;
  reviewerRole: string;
  avatarUrl?: string;
}

export interface HighlightItem {
  theme: string;
  description: string;
  sources: FeedbackSource[];
}

import { DecisionStory } from '../shared/DecisionStories';

interface AIHighlightsContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  keyResult?: string;
  decisionStories: DecisionStory[];

  // Right panel content (fictional employee review)
  employee: {
    name: string;
    role: string;
    initials: string;
    avatarColor: string;
  };
  summary: string;
  highlights: HighlightItem[];
  opportunities: HighlightItem[];
}

export const aiHighlightsContent: AIHighlightsContent = {
  // Left panel content
  projectName: 'Highlights and Opportunities',
  headline: 'AI summaries to make performance reviews easier',
  body: 'Managers spent hours synthesizing feedback each review cycle. I designed a summary that helped managers understand what impact their direct report had and made it easy to verify the AI output.',
  keyResult: '93% of feedback was positive about the feature.',
  decisionStories: [
    {
      id: 'reframing-summary',
      title: 'What framing is useful for managers?',
      story:
        "Early explorations surfaced themes, but they read as generic buckets. Managers don't think in themes. They think in highlights and opportunities. I reframed around that lens and worked with data science to tune prompts for specificity: real project names, concrete behaviors, not abstractions.",
      highlightSection: 1,
    },
    {
      id: 'trust-verification',
      title: 'How do managers verify AI output?',
      story:
        "Managers needed to trust the AI but not drown in detail. Showing everything upfront defeated the point. Hiding everything broke trust. We landed on a progressive flow: orient on the summary, review themes, then expand to verify against source quotes.",
      highlightSection: 2,
    },
  ],

  // Right panel content - fictional employee review
  employee: {
    name: 'Maya Chen',
    role: 'Senior Software Engineer',
    initials: 'MC',
    avatarColor: '#6366F1',
  },
  summary:
    'Maya consistently demonstrates strong technical expertise and a collaborative approach to problem-solving. Her peers highlight her reliability in high-pressure situations, though there\'s opportunity to increase her visibility in cross-team initiatives.',
  highlights: [
    {
      theme: 'Technical problem-solving',
      description:
        'Excels at diagnosing complex issues, like identifying a critical race condition during the Q3 payments migration.',
      sources: [
        {
          quote:
            'Maya spotted an edge case in our retry logic that nobody else caught during code review. Her attention to detail saved us from a potential incident.',
          reviewer: 'David Park',
          reviewerRole: 'Staff Engineer',
          avatarUrl: '/avatars/david-park.svg',
        },
        {
          quote:
            'When our deployment pipeline broke at 6pm before a major release, Maya stayed calm and walked the team through debugging it systematically. We shipped on time because of her.',
          reviewer: 'Rachel Torres',
          reviewerRole: 'Engineering Manager',
          avatarUrl: '/avatars/rachel-torres.svg',
        },
      ],
    },
    {
      theme: 'Mentorship and knowledge sharing',
      description:
        'Actively invests in growing junior engineers, creating an onboarding guide that cut ramp-up time from 6 weeks to 4.',
      sources: [
        {
          quote:
            'Maya spent three weeks pairing with me on the authentication service rewrite. I learned more from her in that time than in my previous year on the team.',
          reviewer: 'James Liu',
          reviewerRole: 'Software Engineer II',
          avatarUrl: '/avatars/james-liu.svg',
        },
        {
          quote:
            'She doesn\'t just fix problems—she explains the \'why\' behind her decisions. Her API design doc became required reading for the whole backend guild.',
          reviewer: 'Priya Sharma',
          reviewerRole: 'Senior Software Engineer',
          avatarUrl: '/avatars/priya-sharma.svg',
        },
      ],
    },
  ],
  opportunities: [
    {
      theme: 'Visibility in cross-functional work',
      description:
        'Well-recognized within engineering, but could speak up earlier in product discussions to shape technical direction.',
      sources: [
        {
          quote:
            'Maya often has great insights about technical constraints, but she usually shares them in Slack after meetings instead of raising them in the room. Her perspective would be valuable earlier in the process.',
          reviewer: 'Kevin Wright',
          reviewerRole: 'Product Manager',
          avatarUrl: '/avatars/kevin-wright.svg',
        },
        {
          quote:
            'I\'d love to see Maya present at our architecture review more often. She has the expertise—she just doesn\'t always put herself forward for those opportunities.',
          reviewer: 'Rachel Torres',
          reviewerRole: 'Engineering Manager',
          avatarUrl: '/avatars/rachel-torres.svg',
        },
      ],
    },
  ],
};
