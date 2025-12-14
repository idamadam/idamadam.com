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
