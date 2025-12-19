import type { VignetteStages } from '../types';

export interface PrototypeItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface ProblemQuestion {
  id: string;
  text: string;
  delay: number; // stagger delay for animation
}

export interface PrototypingContent {
  stages: VignetteStages;
  sandboxTitle: string;
  prototypes: PrototypeItem[];
  problemQuestions: ProblemQuestion[];
  adoptionStats: {
    designers: number;
    prototypes: number;
  };
}

export const prototypingContent: PrototypingContent = {
  stages: {
    problem: {
      title: 'Designers & PMs did not know where to start with coding agents',
      description: '',
      cta: 'See how I enabled this'
    },
    solution: {
      title: 'Created shared infrastructure to unlock AI prototyping at Culture Amp',
      description: 'I built a common repository that made it easy for designers and PMs to create, share, and remix React prototypes using coding agents. The sandbox removed technical barriers and established a new prototyping discipline.'
    }
  },
  sandboxTitle: 'Culture Amp Design Sandbox',
  prototypes: [
    { id: 1, name: 'Performance AI', thumbnail: '#d9d9d9' },
    { id: 2, name: 'Skills Coach', thumbnail: '#d9d9d9' },
    { id: 3, name: 'Goals Assistant', thumbnail: '#d9d9d9' },
    { id: 4, name: 'Feedback Helper', thumbnail: '#d9d9d9' },
    { id: 5, name: 'Review Writer', thumbnail: '#d9d9d9' },
    { id: 6, name: '1-on-1 Prep', thumbnail: '#d9d9d9' }
  ],
  problemQuestions: [
    { id: 'q1', text: 'Where do I start?', delay: 0 },
    { id: 'q2', text: 'What tools do I use?', delay: 0.15 },
    { id: 'q3', text: 'How do I set up an environment?', delay: 0.3 },
    { id: 'q4', text: 'How do I share this?', delay: 0.45 }
  ],
  adoptionStats: {
    designers: 12,
    prototypes: 30
  }
};
