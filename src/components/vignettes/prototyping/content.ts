import type { VignetteStages } from '../types';

export interface PrototypeItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface DesignerItem {
  id: number;
  name: string;
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
  designers: DesignerItem[];
  problemQuestions: ProblemQuestion[];
  transitionSteps: TransitionStep[];
  adoptionStats: {
    designers: number;
    prototypes: number;
  };
}

export const prototypingContent: PrototypingContent = {
  stages: {
    solution: {
      title: 'A shared sandbox that makes AI prototyping easy'
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
  designers: [
    { id: 1, name: 'Sarah Chen' },
    { id: 2, name: 'Marcus Johnson' },
    { id: 3, name: 'Priya Patel' },
    { id: 4, name: 'Alex Kim' },
    { id: 5, name: 'Jordan Rivera' },
    { id: 6, name: 'Taylor Brooks' }
  ],
  problemQuestions: [
    { id: 'q1', text: 'Everyone starting from scratch', delay: 0 },
    { id: 'q2', text: 'No shared components', delay: 0.1 },
    { id: 'q3', text: "Can't build on others' work", delay: 0.2 },
    { id: 'q4', text: 'Complex setup every time', delay: 0.3 },
    { id: 'q5', text: 'Hours lost on configuration', delay: 0.4 },
    { id: 'q6', text: 'Knowledge siloed in individuals', delay: 0.5 }
  ],
  transitionSteps: [
    { id: 'clone-cmd', type: 'command', command: 'git clone culture-amp/design-sandbox', delay: 0 },
    { id: 'clone-status', type: 'status', status: 'Cloned — Components ready', delay: 0.8 },
    { id: 'designer-cmd', type: 'command', command: '/add-designer "Sarah Chen"', delay: 1.8 },
    { id: 'designer-status', type: 'status', status: 'Created designer profile', delay: 2.6 },
    { id: 'homepage-status', type: 'status', status: 'Generating personal homepage...', isLoading: true, delay: 3.4 },
  ],
  adoptionStats: {
    designers: 12,
    prototypes: 30
  }
};
