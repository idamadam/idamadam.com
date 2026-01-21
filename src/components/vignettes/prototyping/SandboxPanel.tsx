'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberedMarker from '../ai-highlights/NumberedMarker';
import MarkerTooltip from '../shared/MarkerTooltip';
import TerminalPanel from './TerminalPanel';
import PrototypePreview from './PrototypePreview';
import { useSandboxDemo } from './useSandboxDemo';
import { useReducedMotion } from '@/lib/useReducedMotion';
import type { PrototypingContent, DesignerItem } from './content';

interface SandboxPanelProps {
  className?: string;
  content: PrototypingContent;
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
}

// Get highlight style for a section
function getSectionHighlightStyle(
  sectionNumber: number,
  highlightedSection: number | null
) {
  if (highlightedSection === sectionNumber) {
    return {
      backgroundColor: 'rgba(240, 217, 200, 0.3)',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease-in-out',
    };
  }
  return {
    transition: 'background-color 0.3s ease-in-out',
  };
}

// Designer card component with refined styling
function DesignerCard({
  designer,
  isNew = false,
}: {
  designer: DesignerItem;
  isNew?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  const cardContent = (
    <div
      className={`
        group relative flex items-center gap-3 rounded-lg p-2.5 sm:p-3
        bg-white/60 backdrop-blur-sm
        border border-black/[0.04]
        shadow-[0_1px_2px_rgba(0,0,0,0.04)]
        hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]
        hover:border-black/[0.08]
        hover:bg-white/80
        transition-all duration-200 ease-out
        ${isNew ? 'ring-2 ring-offset-2 ring-offset-white' : ''}
      `}
      style={isNew ? { '--tw-ring-color': designer.avatarColor } as React.CSSProperties : undefined}
    >
      {/* Avatar with subtle gradient overlay */}
      <div className="relative flex-shrink-0">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${designer.avatarColor} 0%, ${designer.avatarColor}dd 100%)`,
          }}
        >
          {designer.initials}
        </div>
      </div>

      {/* Name and role */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] sm:text-sm text-neutral-800 font-medium truncate leading-tight !m-0">
          {designer.name}
        </p>
        <p className="text-[11px] text-neutral-400 truncate !m-0">Designer</p>
      </div>

      {/* Hover chevron */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );

  if (isNew) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0.1 : 0.35,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

// Stats badge component
function StatBadge({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-100/80 border border-neutral-200/50">
      <span className="text-[13px] font-semibold text-neutral-700 tabular-nums">{value}</span>
      <span className="text-[11px] text-neutral-400">{label}</span>
    </div>
  );
}

function SolutionState({
  content,
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: {
  content: PrototypingContent;
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
}) {
  const [markersDiscovered, setMarkersDiscovered] = useState(false);
  const demo = useSandboxDemo();

  return (
    <div className="w-full space-y-2">
      {/* Outer wrapper for markers - no overflow clipping */}
      <div className="relative">
        {/* Marker 1 - Shared library - desktop: left side, mobile: left edge */}
        <AnimatePresence>
          {!hideMarkers && (
            <>
              <motion.div
                key="marker-1-desktop"
                className="absolute -left-10 top-6 hidden xl:block z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => onMarkerHover?.(1)}
                onMouseLeave={() => onMarkerHover?.(null)}
              >
                <MarkerTooltip
                  number={1}
                  text={content.designDetails[0].text}
                  isVisible={highlightedSection === 1}
                  side="left"
                >
                  <NumberedMarker
                    number={1}
                    onClick={() => onMarkerClick?.(1)}
                    isActive={highlightedSection === 1}
                    hasBeenDiscovered={markersDiscovered}
                    onDiscover={() => setMarkersDiscovered(true)}
                  />
                </MarkerTooltip>
              </motion.div>
              <motion.div
                key="marker-1-mobile"
                className="absolute -left-4 top-6 xl:hidden z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NumberedMarker
                  number={1}
                  onClick={() => onMarkerClick?.(1)}
                  isActive={highlightedSection === 1}
                  hasBeenDiscovered={markersDiscovered}
                  onDiscover={() => setMarkersDiscovered(true)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Marker 2 - Designer homepage - desktop: right side, mobile: right edge */}
        <AnimatePresence>
          {!hideMarkers && (
            <>
              <motion.div
                key="marker-2-desktop"
                className="absolute -right-16 top-[140px] hidden xl:block z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                onMouseEnter={() => onMarkerHover?.(2)}
                onMouseLeave={() => onMarkerHover?.(null)}
              >
                <MarkerTooltip
                  number={2}
                  text={content.designDetails[1].text}
                  isVisible={highlightedSection === 2}
                  side="right"
                >
                  <NumberedMarker
                    number={2}
                    onClick={() => onMarkerClick?.(2)}
                    isActive={highlightedSection === 2}
                    hasBeenDiscovered={markersDiscovered}
                    onDiscover={() => setMarkersDiscovered(true)}
                  />
                </MarkerTooltip>
              </motion.div>
              <motion.div
                key="marker-2-mobile"
                className="absolute -right-4 top-[140px] xl:hidden z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                <NumberedMarker
                  number={2}
                  onClick={() => onMarkerClick?.(2)}
                  isActive={highlightedSection === 2}
                  hasBeenDiscovered={markersDiscovered}
                  onDiscover={() => setMarkersDiscovered(true)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Sandbox Container - Internal Tool Dashboard Style */}
        <div
          className="relative rounded-xl overflow-hidden w-full"
          data-section-id="sandbox-container"
          style={{
            backgroundImage: highlightedSection === 1
              ? 'none'
              : 'linear-gradient(to bottom, #fafafa 0%, #f5f5f5 100%)',
            backgroundColor: highlightedSection === 1
              ? 'rgba(240, 217, 200, 0.3)'
              : undefined,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          {/* App Bar Header */}
        <div
          className="px-3 py-2.5 border-b border-black/[0.06]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2.5">
              {/* Culture Amp Logo - refined square with icon */}
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #F0532D 0%, #E04420 100%)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-neutral-800 leading-tight !m-0">
                  Design Sandbox
                </h3>
                <p className="text-[10px] text-neutral-400 leading-tight !m-0">
                  Culture Amp
                </p>
              </div>
            </div>

            {/* Stats badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              <StatBadge value={content.adoptionStats.designers} label="designers" />
              <StatBadge value={`${content.adoptionStats.prototypes}+`} label="prototypes" />
            </div>
          </div>

        </div>

        {/* Content area - transitions between Designer Directory and Prototype Preview */}
        <div className="p-2.5">
        <AnimatePresence mode="wait">
          {demo.showPreview ? (
            <motion.div
              key="prototype-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PrototypePreview
                isVisible={demo.showPreview}
                prototypeName={demo.newPrototype.name}
                onReset={demo.reset}
                isComplete={demo.phase === 'prototypeCreated'}
              />
            </motion.div>
          ) : (
            <motion.div
              key="designer-directory"
              className="relative grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5"
              data-section-id="designer-directory"
              style={getSectionHighlightStyle(2, highlightedSection)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {content.designers.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}

              {/* New designer card - appears after /add-designer */}
              <AnimatePresence>
                {demo.showNewDesigner && (
                  <DesignerCard
                    key="new-designer"
                    designer={demo.newDesigner}
                    isNew
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        </div>
      </div>

      {/* Interactive Terminal */}
      <div
        className="relative"
        data-section-id="fork-command"
        style={getSectionHighlightStyle(3, highlightedSection)}
      >
        {/* Marker 3 - Fork command - desktop: left side, mobile: left edge */}
        <AnimatePresence>
          {!hideMarkers && (
            <>
              <motion.div
                key="marker-3-desktop"
                className="absolute -left-10 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onMouseEnter={() => onMarkerHover?.(3)}
                onMouseLeave={() => onMarkerHover?.(null)}
              >
                <MarkerTooltip
                  number={3}
                  text={content.designDetails[2].text}
                  isVisible={highlightedSection === 3}
                  side="left"
                >
                  <NumberedMarker
                    number={3}
                    onClick={() => onMarkerClick?.(3)}
                    isActive={highlightedSection === 3}
                    hasBeenDiscovered={markersDiscovered}
                    onDiscover={() => setMarkersDiscovered(true)}
                  />
                </MarkerTooltip>
              </motion.div>
              <motion.div
                key="marker-3-mobile"
                className="absolute -left-4 top-1/2 -translate-y-1/2 xl:hidden z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <NumberedMarker
                  number={3}
                  onClick={() => onMarkerClick?.(3)}
                  isActive={highlightedSection === 3}
                  hasBeenDiscovered={markersDiscovered}
                  onDiscover={() => setMarkersDiscovered(true)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <TerminalPanel
          messages={demo.terminalMessages}
          phase={demo.phase}
          onPromptName={demo.promptForName}
          onSubmitName={demo.submitDesignerName}
          onAddPrototype={demo.startAddPrototype}
          onReset={demo.reset}
          isAnimating={demo.isAnimating}
        />
      </div>

      {/* New designer notification */}
      <AnimatePresence>
        {demo.showNewDesigner && demo.phase === 'designerAdded' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="flex items-center justify-between bg-background-subtle rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-body-sm text-primary">
                {demo.newDesigner.name} added to the team
              </span>
            </div>
            <button
              onClick={demo.reset}
              className="text-caption text-muted-foreground hover:text-primary transition-colors"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SandboxPanel({
  className = '',
  content,
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: SandboxPanelProps) {
  return (
    <div className={className}>
      <SolutionState
        content={content}
        highlightedSection={highlightedSection}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
        hideMarkers={hideMarkers}
      />
    </div>
  );
}
