export interface DesignIteration {
  id: string;
  label: string;
  annotation: string;
  imageUrl?: string;
}

export interface DesignNote {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  align?: 'left' | 'right';
}

export interface DesignNotesMode {
  id: 'redline' | 'inspector';
  label: string;
  description: string;
  accent: string;
  notes: DesignNote[];
  specs?: {
    label: string;
    value: string;
  }[];
}

export interface StageContent {
  title?: string;
  description?: string;
  cta?: string;
}

export interface VignetteStages {
  problem?: StageContent;
  solution?: StageContent;
  designNotes?: StageContent;
}

export type ProblemCardType = 'slack' | 'goal' | 'note' | 'feedback' | 'calendar';

export interface ProblemCard {
  id: string;
  type: ProblemCardType;
  content: string;
  from?: string;
  time?: string;
  date?: string;
  status?: string;
  avatarUrl?: string;
}
