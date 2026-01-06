import { DesignNote, VignetteStages } from '../types';

export interface HomeConnectContent {
  stages: VignetteStages;
  designNotes: {
    notes: DesignNote[];
  };
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
        detail:
          'I designed a system of cards to bring critical updates from across the app to a single, unified feed.',
        x: '104%',
        y: '35%',
        popoverSide: 'right' as const,
      },
      {
        id: 'inactive-goal',
        detail:
          "This notification didn't exist before, I designed it to nudge managers when their reports' goals have stalled.",
        x: '-4%',
        y: '80%',
        popoverSide: 'left' as const,
      }
    ]
  }
};
