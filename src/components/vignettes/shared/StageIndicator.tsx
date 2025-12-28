'use client';

import { VignetteStage } from '@/lib/vignette-stage-context';

interface StageIndicatorProps {
  stage: VignetteStage;
  onStageChange: (stage: VignetteStage) => void;
}

export default function StageIndicator({ stage, onStageChange }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 text-caption select-none">
      <button
        onClick={() => onStageChange('problem')}
        className={`transition-colors ${stage === 'problem' ? 'text-gold-600 font-medium' : 'text-muted-tertiary hover:text-gold-500'}`}
      >
        Problem
      </button>
      <span className={`w-2 h-2 rounded-full transition-colors ${stage === 'problem' ? 'bg-gold-500' : 'bg-border'}`} />
      <span className="w-6 h-px bg-border" />
      <span className={`w-2 h-2 rounded-full transition-colors ${stage === 'solution' ? 'bg-gold-500' : 'bg-border'}`} />
      <button
        onClick={() => onStageChange('solution')}
        className={`transition-colors ${stage === 'solution' ? 'text-gold-600 font-medium' : 'text-muted-tertiary hover:text-gold-500'}`}
      >
        Solution
      </button>
    </div>
  );
}
