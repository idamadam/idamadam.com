export interface DesignDetail {
  number: number;
  text: string;
}

export interface HomeConnectContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  keyResult?: string;
  processNotes: string[];

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: DesignDetail[];
}

export const homeConnectContent: HomeConnectContent = {
  // Left panel content
  projectName: 'Home Connect',
  headline: 'A unified homepage for Culture Amp organised around people',
  body: 'Managers were missing signals about their direct reports. Goals going stale, feedback sitting unread. I designed a new homepage for Culture Amp.',
  keyResult: '255% increase in managers scheduling 1-on-1s for the first time.',
  processNotes: [
    'The team were originally considering a dashboard style structure to give each feature team their own real-estate on the page. I advocated for a different approach organised around the people that you work with and updates about them',
    'To get buy-in, we ran a small experiment to prove our hypothesis around a new homepage',
    'I advocated for organizing around people instead of features',
  ],

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: [
    {
      number: 1,
      text: 'A unified feed brings critical updates from across the product',
    },
    {
      number: 2,
      text: 'Cards surface people who need attention, not feature categories',
    },
    {
      number: 3,
      text: 'New notification type nudges managers about stale goals',
    },
  ],
};
