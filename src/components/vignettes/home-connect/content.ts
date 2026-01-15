export interface DesignDetail {
  number: number;
  text: string;
}

export interface ProcessNote {
  text: string;
}

export interface HomeConnectContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  designDetailsLabel: string;
  designDetails: DesignDetail[];
  processNotesLabel: string;
  processNotes: ProcessNote[];
}

export const homeConnectContent: HomeConnectContent = {
  // Left panel content
  projectName: 'Home Connect',
  headline: 'Actions organized around people, not features',
  body: 'Managers were missing signals about their direct reports. Goals going stale. Feedback sitting unread. The information existed in the product. It just was not surfaced where managers could act on it.',
  designDetailsLabel: 'Design details',
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
  processNotesLabel: 'Process notes',
  processNotes: [
    {
      text: 'The original approach was engineering-led. Each product team gets their section. It matched the org chart, not how managers think.',
    },
    {
      text: 'I advocated for organizing around people instead of features. To get buy-in, we ran a small experiment first. The data convinced people.',
    },
    {
      text: '255% increase in managers scheduling a 1-on-1 for the first time. We were not expecting something of that magnitude.',
    },
    {
      text: 'Customer quote: "Seeing people that have received feedback and seeing that someone has an inactive goal gives me the prompt to ask a question."',
    },
  ],
};
