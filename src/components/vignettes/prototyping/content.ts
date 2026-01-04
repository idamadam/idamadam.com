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

export interface TransitionStep {
  id: string;
  type: 'command' | 'status' | 'tip';
  command?: string;
  status?: string;
  isLoading?: boolean;
  delay: number;
}

export interface PrototypingContent {
  stages: VignetteStages;
  sandboxTitle: string;
  prototypes: PrototypeItem[];
  problemQuestions: ProblemQuestion[];
  transitionSteps: TransitionStep[];
  adoptionStats: {
    designers: number;
    prototypes: number;
  };
}

export const prototypingContent: PrototypingContent = {
  stages: {
    problem: {
      title: 'Designers & PMs did not know where to start with coding agents',
      cta: 'See the solution'
    },
    solution: {
      title: 'Shared infrastructure unlocked AI prototyping across the team'
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
  transitionSteps: [
    { id: 'clone-cmd', type: 'command', command: 'git clone culture-amp/design-sandbox', delay: 0 },
    { id: 'clone-status', type: 'status', status: 'Cloned — Components ready', delay: 0.8 },
    { id: 'prototype-cmd', type: 'command', command: '/new-prototype "My feature idea"', delay: 1.8 },
    { id: 'prototype-status', type: 'status', status: 'Created workspace', delay: 2.6 },
    { id: 'opening-status', type: 'status', status: 'Opening your prototype...', isLoading: true, delay: 3.4 },
  ],
  adoptionStats: {
    designers: 12,
    prototypes: 30
  }
};
