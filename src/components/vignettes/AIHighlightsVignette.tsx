'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import VignetteStaged, { useVignetteStage } from './VignetteStaged';
import HighlightsPanel from '../demos/HighlightsPanel';
import { aiHighlightsContent } from '@/lib/vignette-data';
import { fadeInUp } from '@/lib/animations';
import VignetteSplit from './VignetteSplit';
import type { DesignNote } from '@/lib/vignette-data';

function InlineRedlines({
  notes,
  accent
}: {
  notes: DesignNote[];
  accent: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" style={{ overflow: 'visible' }}>
      {notes.map((note) => {
        const alignRight = note.align === 'right';
        return (
          <motion.div
            key={note.id}
            className="absolute"
            style={{ top: `${note.y}%`, left: `${note.x}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className={`flex items-start gap-3 ${alignRight ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <div className={`flex items-center ${alignRight ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 0 8px ${accent}1a`
                  }}
                />
                <div
                  className={`h-px w-10 ${alignRight ? 'mr-2' : 'ml-2'}`}
                  style={{ backgroundColor: accent }}
                />
              </div>

              <div
                className="rounded-xl px-3 py-2 shadow-sm max-w-[230px] bg-white"
                style={{
                  border: `1px solid ${accent}33`,
                  boxShadow: '0 12px 40px rgba(248, 113, 113, 0.15)'
                }}
              >
                <p className="text-[13px] font-semibold leading-[1.3]" style={{ color: accent }}>
                  {note.label}
                </p>
                <p className="text-[13px] leading-[1.5] mt-1 text-[#475569]">
                  {note.detail}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function AIHighlightsContent({
  showDesignNotes,
  toggleDesignNotes,
  redlineNotes,
  accent
}: {
  showDesignNotes: boolean;
  toggleDesignNotes: () => void;
  redlineNotes: DesignNote[];
  accent: string;
}) {
  const { stage, goToSolution } = useVignetteStage();

  // Get stage-specific content
  const currentStageContent = stage === 'problem'
    ? aiHighlightsContent.stages?.problem
    : aiHighlightsContent.stages?.solution;

  const title = currentStageContent?.title || aiHighlightsContent.title;
  const description = currentStageContent?.description || aiHighlightsContent.description;
  const showNotesOverlay = stage === 'solution' && showDesignNotes && redlineNotes.length > 0;

  return (
    <VignetteSplit
      title={
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.span>
        </AnimatePresence>
      }
      description={
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {description}
          </motion.span>
        </AnimatePresence>
      }
      actions={
        stage === 'solution' && (
          <button
            onClick={toggleDesignNotes}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0f172a] px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            style={{
              backgroundColor: showDesignNotes ? `${accent}12` : 'white',
              borderColor: showDesignNotes ? `${accent}50` : undefined,
              color: showDesignNotes ? '#991b1b' : undefined
            }}
          >
            <span className="material-icons-outlined text-[18px]" style={{ color: showDesignNotes ? accent : '#0f172a' }}>
              {showDesignNotes ? 'close' : 'edit'}
            </span>
            {showDesignNotes ? 'Hide design notes' : 'Show redlines'}
          </button>
        )
      }
    >
      <div className="relative" style={{ overflow: 'visible' }}>
        <HighlightsPanel
          stage={stage}
          onTransition={goToSolution}
          problemCards={aiHighlightsContent.problemCards}
        />
        {showNotesOverlay && <InlineRedlines notes={redlineNotes} accent={accent} />}
      </div>
    </VignetteSplit>
  );
}

export default function AIHighlightsVignette() {
  const redlineMode = useMemo(
    () => aiHighlightsContent.designNotes?.modes.find((mode) => mode.id === 'redline') ?? aiHighlightsContent.designNotes?.modes?.[0],
    []
  );
  const [showDesignNotes, setShowDesignNotes] = useState(false);
  const toggleDesignNotes = () => setShowDesignNotes((prev) => !prev);

  return (
    <VignetteContainer id="ai-highlights" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteStaged
            stages={aiHighlightsContent.stages}
          >
            <AIHighlightsContent
              showDesignNotes={showDesignNotes}
              toggleDesignNotes={toggleDesignNotes}
              redlineNotes={redlineMode?.notes ?? []}
              accent={redlineMode?.accent ?? '#ef4444'}
            />
          </VignetteStaged>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
