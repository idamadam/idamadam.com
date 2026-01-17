export interface DesignDetail {
  number: number;
  text: string;
}

export interface HomeConnectContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  processNotes: string[];

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: DesignDetail[];
}

export const homeConnectContent: HomeConnectContent = {
  // Left panel content
  projectName: 'Home Connect',
  headline: 'Actions organized around people, not features',
  body: 'Managers were missing signals about their direct reports. Goals going stale, feedback sitting unread. I advocated for organizing around people instead of features. The original approach matched the org chart, not how managers think.',
  processNotes: [
    'To get buy-in, we ran a small experiment first. The data convinced people.',
    '255% increase in managers scheduling a 1-on-1 for the first time. We were not expecting that magnitude.',
    'Customer: "Seeing that someone has an inactive goal gives me the prompt to ask a question."',
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
