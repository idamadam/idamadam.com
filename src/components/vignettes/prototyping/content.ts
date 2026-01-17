export interface DesignDetail {
  number: number;
  text: string;
}

export interface PrototypeItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface DesignerItem {
  id: number;
  name: string;
}

export interface PrototypingContent {
  // Left panel content
  projectName: string;
  headline: string;
  body: string;
  processNotes: string[];

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: DesignDetail[];

  // Right panel content
  sandboxTitle: string;
  prototypes: PrototypeItem[];
  designers: DesignerItem[];
  adoptionStats: {
    designers: number;
    prototypes: number;
  };
}

export const prototypingContent: PrototypingContent = {
  // Left panel content
  projectName: 'Design Sandbox',
  headline: 'AI prototyping infrastructure I built from scratch',
  body: 'Designers had no way to deploy or share AI prototypes. I saw the gap coming and filled it before it became a blocker. No roadmap slot, no formal project. I just built it.',
  processNotes: [
    'Evaluated Replit but there was no budget. Built around Claude Code instead.',
    'Built the tool, then did the harder work: documentation, onboarding, walking teams through it.',
    '12 designers now actively use it. One team prototyped a feature that got executives bought in on a major release.',
  ],

  // Marker callouts (shown on hover/tap on panel markers)
  designDetails: [
    {
      number: 1,
      text: 'Shared library shows all prototypes across the org',
    },
    {
      number: 2,
      text: 'Each designer gets a personal homepage for their work',
    },
    {
      number: 3,
      text: 'Fork command lets you build on existing prototypes',
    },
  ],

  // Right panel content
  sandboxTitle: 'Culture Amp Design Sandbox',
  prototypes: [
    { id: 1, name: 'Performance AI', thumbnail: '#d9d9d9' },
    { id: 2, name: 'Skills Coach', thumbnail: '#d9d9d9' },
    { id: 3, name: 'Goals Assistant', thumbnail: '#d9d9d9' },
    { id: 4, name: 'Feedback Helper', thumbnail: '#d9d9d9' },
    { id: 5, name: 'Review Writer', thumbnail: '#d9d9d9' },
    { id: 6, name: '1-on-1 Prep', thumbnail: '#d9d9d9' },
  ],
  designers: [
    { id: 1, name: 'Sarah Chen' },
    { id: 2, name: 'Marcus Johnson' },
    { id: 3, name: 'Priya Patel' },
    { id: 4, name: 'Alex Kim' },
    { id: 5, name: 'Jordan Rivera' },
    { id: 6, name: 'Taylor Brooks' },
  ],
  adoptionStats: {
    designers: 12,
    prototypes: 30,
  },
};
