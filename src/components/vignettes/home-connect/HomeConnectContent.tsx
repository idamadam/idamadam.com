'use client';

import HomeConnectPanel from './HomeConnectPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { useVignetteStage } from '@/components/vignettes/VignetteStaged';
import { homeConnectContent } from './content';
import type { DesignNote } from '@/components/vignettes/types';
import AnimatedStageText from '@/components/vignettes/shared/AnimatedStageText';
import { DesignNotesOverlay } from '@/components/vignettes/shared/DesignNotesOverlay';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface HomeConnectContentProps {
  notes: DesignNote[];
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  onActiveNoteChange?: (noteId: string | null) => void;
}

export default function HomeConnectContent({
  notes,
  highlightedSection = null,
  onNoteOpenChange,
  onActiveNoteChange,
}: HomeConnectContentProps) {
  const { stage } = useVignetteStage();
  const reducedMotion = useReducedMotion();

  const title = homeConnectContent.stages.solution.title;

  return (
    <VignetteSplit
      title={
        <div className="space-y-4">
          <AnimatedStageText
            stage={stage}
            text={title}
            reducedMotion={reducedMotion}
          />
        </div>
      }
    >
      <div className="relative w-full max-w-[672px] mx-auto min-h-[400px]" style={{ overflow: 'visible' }}>
        <HomeConnectPanel
          highlightedSection={highlightedSection}
          onNoteOpenChange={onNoteOpenChange}
          notes={notes}
        />
      </div>
      {/* Mobile: Design notes button (desktop markers are embedded in panel) */}
      {stage === 'solution' && (
        <DesignNotesOverlay
          notes={notes}
          onActiveNoteChange={onActiveNoteChange}
        />
      )}
    </VignetteSplit>
  );
}
