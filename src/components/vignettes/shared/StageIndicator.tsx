'use client';

import { VignetteStage } from '@/lib/vignette-stage-context';

interface StageIndicatorProps {
  stage: VignetteStage;
  onStageChange: (stage: VignetteStage) => void;
}

export default function StageIndicator({ stage, onStageChange }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 text-caption text-gray-400 select-none">
      <button
        onClick={() => onStageChange('problem')}
        className={`hover:text-gray-500 transition-colors ${stage === 'problem' ? 'text-gray-600' : ''}`}
      >
        Problem
      </button>
      <span className={`w-2 h-2 rounded-full ${stage === 'problem' ? 'bg-gray-600' : 'bg-gray-300'}`} />
      <span className="w-6 h-px bg-gray-300" />
      <span className={`w-2 h-2 rounded-full ${stage === 'solution' ? 'bg-gray-600' : 'bg-gray-300'}`} />
      <button
        onClick={() => onStageChange('solution')}
        className={`hover:text-gray-500 transition-colors ${stage === 'solution' ? 'text-gray-600' : ''}`}
      >
        Solution
      </button>
    </div>
  );
}
