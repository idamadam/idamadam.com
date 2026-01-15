export interface DesignDetail {
  number: number;
  text: string;
}

export interface ProcessNote {
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
  designDetailsLabel: string;
  designDetails: DesignDetail[];
  processNotesLabel: string;
  processNotes: ProcessNote[];

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
  body: 'Designers had no way to deploy or share AI prototypes internally. I saw the gap coming and filled it before it became a blocker.',
  designDetailsLabel: 'Design details',
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
  processNotesLabel: 'Process notes',
  processNotes: [
    {
      text: 'No roadmap slot, no formal project. I just built it.',
    },
    {
      text: 'Evaluated Replit but there was no budget. We had access to Claude Code, so I built around that.',
    },
    {
      text: 'Built the tool, then did the harder work of driving adoption. Documentation, onboarding sessions, walking teams through how to use it.',
    },
    {
      text: '12 designers now actively use it. One team used it to prototype a significant feature that got executives bought in on a major company release.',
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
