'use client';

import { VignetteStage } from '@/lib/vignette-stage-context';

interface StageIndicatorProps {
  stage: VignetteStage;
  onStageChange: (stage: VignetteStage) => void;
}

export default function StageIndicator({ stage, onStageChange }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-[0.8125rem] select-none">
      <button
        onClick={() => onStageChange('problem')}
        className={`transition-all duration-200 ${
          stage === 'problem'
            ? 'text-primary font-medium'
            : 'text-tertiary hover:text-secondary'
        }`}
      >
        Problem
      </button>
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            stage === 'problem' ? 'bg-accent-600' : 'bg-border-strong'
          }`}
        />
        <span className="w-5 h-px bg-border-strong" />
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            stage === 'solution' ? 'bg-accent-600' : 'bg-border-strong'
          }`}
        />
      </div>
      <button
        onClick={() => onStageChange('solution')}
        className={`transition-all duration-200 ${
          stage === 'solution'
            ? 'text-primary font-medium'
            : 'text-tertiary hover:text-secondary'
        }`}
      >
        Solution
      </button>
    </div>
  );
}
