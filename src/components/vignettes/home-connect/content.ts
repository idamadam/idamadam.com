import { DesignNote, VignetteStages } from '../types';

interface TransitionFragment {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface TransitionContent {
  fragments: TransitionFragment[];
  ctaLabel: string;
  ctaLoadingLabel: string;
  continueLabel: string;
}

interface FeedItem {
  id: string;
  type: 'performance' | 'oneOnOne' | 'goal';
  title: string;
  subtitle?: string;
  progress?: number;
  avatar?: { initials: string };
  alert?: { message: string; color: string };
  goalText?: string;
}

interface FeedSection {
  label: string;
  items: FeedItem[];
}

export interface HomeConnectContent {
  title: string;
  description: string;
  stages: VignetteStages;
  designNotes: {
    accent: string;
    notes: DesignNote[];
  };
  transitionContent: TransitionContent;
  feedSections: FeedSection[];
}

export const homeConnectContent: HomeConnectContent = {
  title: 'Created a cohesive homepage system to bring all of Culture Amp into one place',
  description:
    "A centralized navigation hub that reduced platform fragmentation and improved feature discoverability across Culture Amp's product suite.",

  stages: {
    problem: {
      title: 'Valuable context was scattered across Culture Amp\'s products',
      description: 'Performance reviews, 1-on-1s, Goals, and Surveys each lived in their own silo. To piece together what was happening with your team, you had to hunt across four different tools.',
      cta: 'Show the solution'
    },
    solution: {
      title: 'A unified feed that surfaces what matters',
      description:
        'Performance, goals, surveys, and 1-on-1s brought together in one place. Context about your team, without the hunt.'
    }
  },

  designNotes: {
    accent: '#5F3361',
    notes: [
      {
        id: 'progressive-disclosure',
        label: 'Progressive disclosure',
        detail:
          'Feed items show just enough context at a glance. Details expand on interaction, reducing cognitive load.',
        anchor: 'feed-card-performance',
        position: 'right' as const
      },
      {
        id: 'visual-cohesion',
        label: 'Visual cohesion',
        detail:
          'Consistent card structure with type-specific accents. Each module retains identity while feeling unified.',
        anchor: 'feed-card-goal',
        position: 'left' as const
      }
    ]
  },

  transitionContent: {
    fragments: [
      { id: 'goals', icon: 'flag', label: 'Goals', color: '#FFB600' },
      { id: 'performance', icon: 'trending_up', label: 'Performance', color: '#5F3361' },
      { id: 'surveys', icon: 'poll', label: 'Surveys', color: '#0168b3' },
      { id: 'oneOnOnes', icon: 'people', label: '1-on-1s', color: '#10B981' }
    ],
    ctaLabel: 'Consolidate into feed',
    ctaLoadingLabel: 'Building feed...',
    continueLabel: 'See unified home'
  },

  feedSections: [
    {
      label: 'Upcoming',
      items: [
        {
          id: 'perf-1',
          type: 'performance',
          title: '2023 Performance Cycle',
          subtitle: 'feedback closes in 3 days',
          progress: 80
        },
        {
          id: 'oneOnOne-1',
          type: 'oneOnOne',
          title: 'Aisha Patel',
          subtitle: '1-on-1 today',
          avatar: { initials: 'AP' },
          alert: {
            message: 'Wellbeing has gone down since last 1-on-1',
            color: '#A82433'
          }
        }
      ]
    },
    {
      label: 'Recent',
      items: [
        {
          id: 'goal-1',
          type: 'goal',
          title: 'Malik Williams',
          subtitle: 'has an inactive goal',
          avatar: { initials: 'MW' },
          progress: 25,
          goalText: 'Learn how to handle multiple priorities'
        }
      ]
    }
  ]
};
