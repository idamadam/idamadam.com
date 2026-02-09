import type { DecisionStory } from '../shared/DecisionStories';

export interface HomeConnectContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;

  // Decision stories
  decisionStories: DecisionStory[];
}

export const homeConnectContent: HomeConnectContent = {
  // Left panel content
  projectName: 'Home Connect',
  headline: 'A unified homepage for Culture Amp organised around people',
  body: 'Managers were missing signals about their direct reports. Goals going stale, feedback sitting unread. I advocated for organizing the homepage around people rather than features, and ran an experiment to prove it. Managers who used the new homepage were 255% more likely to schedule their first 1-on-1.',

  // Decision stories
  decisionStories: [
    {
      id: 'people-centric',
      title: 'Why organize around people, not features?',
      story:
        'The team was originally considering a dashboard structure to give each feature team their own real-estate on the page. I advocated for a different approach organized around the people you work with and updates about them. Instead of siloed feature cards, the homepage surfaces signals across performance, goals, and 1-on-1s in a unified feed.',
      highlightSection: 1,
      toggleLabels: ['Before', 'After'],
    },
    {
      id: 'experiment',
      title: 'How did you prove the approach?',
      story:
        'To get buy-in for this direction, we ran a small experiment to prove our hypothesis around a people-centric homepage. The results were clear. Managers who used the new homepage were 255% more likely to schedule 1-on-1s for the first time.',
      highlightSection: 2,
    },
  ],
};
