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
  anchor: string;  // Reference to anchor name (e.g., 'highlights-header')
  position: 'top' | 'bottom' | 'left' | 'right';  // Which side of anchor
  align?: 'start' | 'center' | 'end';  // Alignment along the edge
}

export interface StageContent {
  title?: string;
  description?: string;
  cta?: string;
}

export interface VignetteStages {
  problem: StageContent;
  solution: StageContent;
  designNotes?: StageContent;
}
