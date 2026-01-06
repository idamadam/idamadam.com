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
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
  transitionContent: TransitionContent;
  feedSections: FeedSection[];
}

export const homeConnectContent: HomeConnectContent = {
  stages: {
    problem: {
      title: 'Valuable context was scattered across Culture Amp\'s products',
      cta: 'Connect the dots'
    },
    solution: {
      title: 'A unified feed that surfaces what matters'
    }
  },

  designNotes: {
    notes: [
      {
        id: 'card-system',
        label: 'Card system',
        detail:
          'I designed a system of cards to bring critical updates from across the app to a single, unified feed.',
        x: '104%',
        y: '35%',
        popoverSide: 'right' as const,
      },
      {
        id: 'inactive-goal',
        label: 'Inactive goal nudge',
        detail:
          "This notification didn't exist before, I designed it to nudge managers when their reports' goals have stalled.",
        x: '-4%',
        y: '80%',
        popoverSide: 'left' as const,
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
          progress: 40
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
          title: 'Malik John Williams',
          subtitle: 'has an inactive goal',
          avatar: { initials: 'MW' },
          progress: 25,
          goalText: 'Learn how to handle multiple priorities'
        }
      ]
    }
  ]
};
