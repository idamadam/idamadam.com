'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { DecisionStory } from '../shared/DecisionStories';
import {
  aiHighlightsContent,
  storyInteractions,
  FeedbackSource,
  HighlightItem,
  BeforeSummaryItem,
  SummaryPart,
} from './content';

interface HighlightsPanelProps {
  className?: string;
  activeStory?: DecisionStory | null;
  showBeforeState?: boolean;
}

interface SourceCardProps {
  source: FeedbackSource;
}

function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="pt-4 border-t border-border">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-1 mb-3 sm:hidden">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: getAvatarColor(source.reviewer) }}
          >
            {getInitials(source.reviewer)}
          </div>
          <span className="text-body-sm font-semibold text-primary">
            {source.reviewer}
          </span>
        </div>
        <div className="flex items-center gap-2 text-caption text-secondary">
          <span>{source.reviewerRole}</span>
        </div>
      </div>
      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: getAvatarColor(source.reviewer) }}
        >
          {getInitials(source.reviewer)}
        </div>
        <span className="text-body-sm font-semibold text-primary">
          {source.reviewer}
        </span>
        <span className="text-caption text-secondary">•</span>
        <span className="text-caption text-secondary">
          {source.reviewerRole}
        </span>
      </div>
      <p className="text-body-sm text-primary mb-3">{source.quote}</p>
    </div>
  );
}

// Helper functions for avatar colors
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors: Record<string, string> = {
    'David Park': '#6366F1',
    'Rachel Torres': '#EC4899',
    'James Liu': '#10B981',
    'Priya Sharma': '#F59E0B',
    'Kevin Wright': '#8B5CF6',
  };
  return colors[name] || '#6366F1';
}

function LoadingStyles() {
  return (
    <style jsx global>{`
      @property --gradient-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }

      @keyframes rotateGradient {
        to {
          --gradient-angle: 360deg;
        }
      }

      .loading-panel-border {
        position: absolute;
        inset: 0;
        border-radius: 7px;
        background: conic-gradient(
          from var(--gradient-angle),
          var(--ai-gradient-1),
          var(--ai-gradient-2),
          var(--ai-gradient-3),
          var(--ai-gradient-2),
          var(--ai-gradient-1)
        );
        animation: rotateGradient 3s linear infinite;
        filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.5));
      }

      .loading-panel-content {
        position: relative;
        background: var(--background-elevated);
        width: 100%;
        height: 100%;
        border-radius: 5px;
        z-index: 1;
      }

      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }

      .skeleton-bar {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.06) 25%,
          rgba(0, 0, 0, 0.1) 50%,
          rgba(0, 0, 0, 0.06) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .loading-panel-border {
          animation: none;
          filter: drop-shadow(0 0 20px rgba(166, 229, 231, 0.3));
        }
        .skeleton-bar {
          animation: none;
        }
      }
    `}</style>
  );
}

function SkeletonContent() {
  return (
    <>
      {/* Header Section */}
      <div className="border-b-2 border-border px-6 py-8">
        <p className="text-body-sm font-semibold text-primary mb-3">
          Loading highlights and opportunities
        </p>
        <div className="space-y-3">
          <div className="skeleton-bar h-[15px] w-full rounded-[7px]" />
          <div className="skeleton-bar h-[15px] w-full rounded-[7px]" />
          <div className="skeleton-bar h-[15px] w-[85%] rounded-[7px]" />
        </div>
      </div>

      {/* Skeleton Items */}
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`px-6 py-8 ${index < 2 ? 'border-b-2 border-border' : ''}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1">
                <div className="skeleton-bar w-5 h-5 rounded-full" />
                <div className="skeleton-bar h-[15px] w-20 sm:w-[85px] rounded-[7px]" />
              </div>
              <div className="skeleton-bar h-[15px] w-full max-w-[240px] rounded-[7px]" />
            </div>
            <div className="flex items-center gap-4 sm:gap-12">
              <div className="flex items-center gap-1">
                <div className="skeleton-bar w-5 h-5 rounded-full" />
                <div className="skeleton-bar h-[15px] w-14 sm:w-[60px] rounded-[7px]" />
              </div>
              <div className="skeleton-bar w-5 h-5 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function LoadingState() {
  return (
    <>
      <LoadingStyles />
      <div className="relative p-[2px] rounded-[7px]">
        <div className="loading-panel-border"></div>
        <div className="loading-panel-content">
          <SkeletonContent />
        </div>
      </div>
    </>
  );
}

const WIREFRAME_GRAY = '#C4C4C4';

function BeforeSummaryItemRow({ item }: { item: BeforeSummaryItem }) {
  return (
    <div className="border-b-2 border-border">
      <div className="px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-body-sm text-primary">{item.summary}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0 px-2 py-2 -mx-2">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {item.sources.slice(0, 2).map((source, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-background-elevated flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: WIREFRAME_GRAY }}
                  >
                    {getInitials(source.reviewer)}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-secondary">
                {item.sources.length} sources
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailSpan({
  detail,
  animateExpand,
  delayIndex,
}: {
  detail: string;
  animateExpand: boolean;
  delayIndex: number;
}) {
  const highlightDelay = 0.1 + delayIndex * 0.15;
  return (
    <motion.span
      className="rounded-sm"
      style={{ display: 'inline', boxDecorationBreak: 'clone' }}
      initial={
        animateExpand
          ? { backgroundColor: 'rgba(253, 224, 71, 0.45)' }
          : false
      }
      animate={{ backgroundColor: 'rgba(253, 224, 71, 0)' }}
      transition={{
        backgroundColor: {
          duration: 1.4,
          delay: animateExpand ? highlightDelay + 0.4 : 0,
          ease: 'easeOut',
        },
      }}
    >
      {detail}
    </motion.span>
  );
}

function FocusedItem({
  item,
  summaryParts,
  animateExpand,
}: {
  item: HighlightItem;
  summaryParts?: SummaryPart[];
  animateExpand: boolean;
}) {
  const isHighlight = item.type === 'highlight';
  const label = isHighlight ? 'Highlight' : 'Opportunity';
  const icon = isHighlight ? 'star_outline' : 'lightbulb';
  const iconColor = isHighlight ? '#22594A' : 'rgba(135, 100, 0, 1)';

  const renderSummary = () => {
    if (!summaryParts || !animateExpand) {
      return (
        <p className="text-body-sm text-primary">{item.summary}</p>
      );
    }

    let detailIndex = 0;
    return (
      <p className="text-body-sm text-primary">
        {summaryParts.map((part, i) => {
          if (typeof part === 'string') {
            return <span key={i}>{part}</span>;
          }
          const idx = detailIndex++;
          return (
            <DetailSpan
              key={i}
              detail={part.detail}
              animateExpand={animateExpand}
              delayIndex={idx}
            />
          );
        })}
      </p>
    );
  };

  return (
    <div className="border-b-2 border-border">
      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              <span
                className="material-icons-outlined text-h3"
                style={{ color: iconColor }}
              >
                {icon}
              </span>
              <span className="text-body-sm font-semibold text-primary">
                {label}
              </span>
            </div>
            {renderSummary()}
          </div>

          <div className="flex items-center gap-3 shrink-0 px-2 py-2 -mx-2 opacity-30">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {item.sources.slice(0, 2).map((source, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-background-elevated flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: getAvatarColor(source.reviewer) }}
                  >
                    {getInitials(source.reviewer)}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-secondary">
                {item.sources.length} sources
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- Floating Thumbs Animation ---

interface FloatingThumb {
  id: number;
  /** Horizontal offset from center in px */
  startX: number;
  /** Horizontal drift destination in px */
  driftX: number;
  /** Vertical rise distance in px */
  riseDistance: number;
  /** Total animation duration in seconds */
  duration: number;
  /** Font size in px */
  size: number;
  /** Fixed rotation in degrees */
  rotation: number;
  /** Starting scale */
  startScale: number;
  /** Ending scale */
  endScale: number;
}

let thumbIdCounter = 0;

function createFloatingThumb(): FloatingThumb {
  const id = thumbIdCounter++;
  // Spawn within ~40px horizontal band around center
  const startX = (Math.random() - 0.5) * 40;
  // Horizontal drift: 20-50px amplitude, alternating direction
  const driftDirection = Math.random() > 0.5 ? 1 : -1;
  const driftX = driftDirection * (20 + Math.random() * 30);
  // Vertical rise: 120-180px
  const riseDistance = 120 + Math.random() * 60;
  // Duration: 2.5-3.5s
  const duration = 2.5 + Math.random() * 1.0;
  // Size: 14-18px
  const size = 14 + Math.random() * 4;
  // Fixed rotation: -25 to +25 degrees
  const rotation = (Math.random() - 0.5) * 50;
  // Scale: start 0.6-0.9, end 0.6-0.8
  const startScale = 0.6 + Math.random() * 0.3;
  const endScale = 0.6 + Math.random() * 0.2;

  return {
    id,
    startX,
    driftX,
    riseDistance,
    duration,
    size,
    rotation,
    startScale,
    endScale,
  };
}

function FloatingThumbParticle({
  thumb,
  onComplete,
}: {
  thumb: FloatingThumb;
  onComplete: (id: number) => void;
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        pointerEvents: 'none',
        fontSize: thumb.size,
        lineHeight: 1,
        willChange: 'transform, opacity',
        rotate: thumb.rotation,
      }}
      initial={{
        x: thumb.startX,
        y: 0,
        opacity: 0,
        scale: thumb.startScale,
      }}
      animate={{
        x: thumb.startX + thumb.driftX,
        y: -thumb.riseDistance,
        opacity: [0, 1, 1, 0],
        scale: [thumb.startScale, 1, thumb.endScale + 0.1, thumb.endScale],
      }}
      transition={{
        y: {
          duration: thumb.duration,
          ease: [0.2, 0.6, 0.4, 1],
        },
        x: {
          duration: thumb.duration,
          ease: 'easeInOut',
        },
        opacity: {
          duration: thumb.duration,
          times: [0, 0.1, 0.7, 1],
          ease: 'linear',
        },
        scale: {
          duration: thumb.duration,
          times: [0, 0.15, 0.7, 1],
          ease: 'easeOut',
        },
      }}
      onAnimationComplete={() => onComplete(thumb.id)}
    >
      <span className="material-icons-outlined text-emerald-400" style={{ fontSize: 'inherit' }}>
        thumb_up
      </span>
    </motion.div>
  );
}

function FloatingThumbs({ active, burstTrigger = 0 }: { active: boolean; burstTrigger?: number }) {
  const [particles, setParticles] = useState<FloatingThumb[]>([]);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    if (!active || reducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setParticles([]);
      return;
    }

    // Spawn first particle immediately
    setParticles([createFloatingThumb()]);

    // Then spawn every 350ms
    intervalRef.current = setInterval(() => {
      setParticles((prev) => {
        if (prev.length >= 10) return prev;
        return [...prev, createFloatingThumb()];
      });
    }, 350);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active, reducedMotion]);

  // Burst: spawn 3-4 extra particles on click
  useEffect(() => {
    if (burstTrigger === 0 || !active || reducedMotion) return;
    const burst = Array.from({ length: 3 + Math.floor(Math.random() * 2) }, () => createFloatingThumb());
    setParticles((prev) => [...prev, ...burst]);
  }, [burstTrigger, active, reducedMotion]);

  if (reducedMotion || !active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '100%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      <AnimatePresence>
        {particles.map((thumb) => (
          <FloatingThumbParticle
            key={thumb.id}
            thumb={thumb}
            onComplete={removeParticle}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- End Floating Thumbs Animation ---

interface SolutionStateProps {
  className?: string;
  activeStory?: DecisionStory | null;
  showBeforeState?: boolean;
}

function CollapsibleItem({
  item,
  sectionIndex,
  isExpanded,
  onToggle,
  blockStyle,
}: {
  item: HighlightItem;
  sectionIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  blockStyle: React.CSSProperties;
}) {
  const isHighlight = item.type === 'highlight';
  const label = isHighlight ? 'Highlight' : 'Opportunity';
  const icon = isHighlight ? 'star_outline' : 'lightbulb';
  const iconColor = isHighlight ? '#22594A' : 'rgba(135, 100, 0, 1)';

  return (
    <div
      className="border-b-2 border-border"
      data-section-id={`${item.type}-${sectionIndex}`}
      style={blockStyle}
    >
      <div className="px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              <span
                className="material-icons-outlined text-h3"
                style={{ color: iconColor }}
              >
                {icon}
              </span>
              <span className="text-body-sm font-semibold text-primary">
                {label}
              </span>
            </div>
            <p className="text-body-sm text-primary">
              {item.summary}
            </p>
          </div>

          <button
            onClick={onToggle}
            className="flex items-center gap-3 shrink-0 hover:bg-black/5 rounded-lg px-2 py-2 -mx-2 transition-colors cursor-pointer"
            aria-label={
              isExpanded ? `Collapse ${item.type}` : `Expand ${item.type}`
            }
            aria-expanded={isExpanded}
          >
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                {item.sources.slice(0, 2).map((source, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-background-elevated flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: getAvatarColor(source.reviewer) }}
                  >
                    {getInitials(source.reviewer)}
                  </div>
                ))}
              </div>
              <span className="text-body-sm text-secondary">
                {item.sources.length} sources
              </span>
            </div>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="material-icons-outlined text-h3 text-primary block"
            >
              keyboard_arrow_down
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {item.sources.map((source, idx) => (
                  <SourceCard key={idx} source={source} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SolutionState({
  className = '',
  activeStory = null,
  showBeforeState = true,
}: SolutionStateProps) {
  const { employee, summary, highlights, opportunities } = aiHighlightsContent;
  const allItems = [...highlights, ...opportunities];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [thumbsClicked, setThumbsClicked] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const [borderAnimating, setBorderAnimating] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  // 0 = all v1, totalSections = all v2
  // Sections: 0=header, 1..N=items
  const totalSections = allItems.length + 1;
  const [upgradedSections, setUpgradedSections] = useState(0);
  const prevBeforeStateRef = useRef(showBeforeState);
  const reducedMotion = useReducedMotion();

  const highlightedSection = activeStory?.highlightSection ?? null;

  const isReframingStory = activeStory?.id === 'reframing-summary';
  const isRefiningStory = activeStory?.id === 'refining-output';
  const isMeasuringStory = activeStory?.id === 'measuring-success';
  const hasToggle = isReframingStory || isRefiningStory;

  // Reset per-story state when activeStory changes
  useEffect(() => {
    setThumbsClicked(false);
    setShowStat(false);
    setBorderAnimating(false);
    setBurstTrigger(0);
    // When a new story opens, show the correct initial state instantly
    setUpgradedSections(showBeforeState ? 0 : totalSections);
    prevBeforeStateRef.current = showBeforeState;

    if (activeStory?.id === 'trust-verification') {
      setExpandedIndex(0);
    } else {
      setExpandedIndex(null);
    }

    if (activeStory?.id === 'measuring-success') {
      const timer = setTimeout(() => {
        setThumbsClicked(true);
        setShowStat(true);
      }, 400);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStory]);

  // Staggered v1 → v2 streaming upgrade
  useEffect(() => {
    const isToggleStory = isReframingStory || isRefiningStory;
    const wasBeforeNowAfter =
      prevBeforeStateRef.current === true && showBeforeState === false;

    prevBeforeStateRef.current = showBeforeState;

    // v2 → v1: instant reset
    if (showBeforeState) {
      setUpgradedSections(0);
      setBorderAnimating(false);
      return;
    }

    if (isToggleStory && wasBeforeNowAfter) {
      if (reducedMotion) {
        setUpgradedSections(totalSections);
        return;
      }

      // 1. Border starts glowing
      setBorderAnimating(true);

      const timers: ReturnType<typeof setTimeout>[] = [];

      if (isRefiningStory) {
        // Header doesn't visually change — upgrade it immediately
        setUpgradedSections(1);
        const itemDelay = 400;
        const itemInterval = 900;
        const itemCount = totalSections - 1; // exclude header
        for (let i = 0; i < itemCount; i++) {
          timers.push(
            setTimeout(
              () => setUpgradedSections(i + 2),
              itemDelay + i * itemInterval
            )
          );
        }
        // Settle after last expand animation finishes
        timers.push(
          setTimeout(() => setBorderAnimating(false),
            itemDelay + (itemCount - 1) * itemInterval + 1500
          )
        );
      } else {
        // Reframing: upgrade all sections at once for a simple crossfade
        setUpgradedSections(totalSections);
        // Brief border glow flash, then stop
        timers.push(
          setTimeout(() => setBorderAnimating(false), 1200)
        );
      }

      return () => timers.forEach(clearTimeout);
    }
  }, [showBeforeState, isReframingStory, isRefiningStory, reducedMotion, totalSections]);

  // Derived: is the panel fully in v1 mode?
  const isFullyBefore = hasToggle && upgradedSections === 0;

  // Get block-level style: dimming + optional background highlight
  const getBlockStyle = (sectionNumber: number) => {
    const transition = 'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out';

    if (!activeStory || hasToggle) {
      return { opacity: 1, transition };
    }

    if (highlightedSection == null) {
      return { opacity: 0.4, transition };
    }

    if (sectionNumber === highlightedSection) {
      return { opacity: 1, transition };
    }

    return { opacity: 0.4, transition };
  };

  const getFooterStyle = () => {
    const transition =
      'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out';
    if (!activeStory || hasToggle) return { opacity: 1, transition };
    if (isMeasuringStory) {
      return { opacity: 1, transition };
    }
    return { opacity: 0.4, transition };
  };

  // --- Reframing story: per-section before/after ---
  const reframingBefore = storyInteractions.reframingSummary.before;
  const refiningBefore = storyInteractions.refiningOutput.before;
  const refiningBeforeItems = [
    ...refiningBefore.highlights,
    ...refiningBefore.opportunities,
  ] as HighlightItem[];

  const isHeaderUpgraded = upgradedSections >= 1;
  const isItemUpgraded = (index: number) => upgradedSections >= index + 2;

  const renderContent = () => {
    // For non-toggle stories, render normal after content
    if (!hasToggle) {
      return (
        <>
          <div
            className="border-b-2 border-border px-6 py-6"
            style={getBlockStyle(1)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                style={{ backgroundColor: employee.avatarColor }}
              >
                {employee.initials}
              </div>
              <div>
                <p className="text-h3 font-normal text-primary" style={{ marginBottom: '0px' }}>
                  {employee.name}
                </p>
                <p className="text-body-sm text-primary mb-0">{employee.role}</p>
              </div>
            </div>
            <p className="text-body-sm text-primary mt-0">{summary}</p>
          </div>

          {allItems.map((item, index) => (
            <CollapsibleItem
              key={`default-${index}`}
              item={item}
              sectionIndex={index}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
              blockStyle={getBlockStyle(index + 2)}
            />
          ))}

          <div className="px-6 py-4 flex items-center gap-2" style={getFooterStyle()}>
            <span className="text-body-sm text-secondary">Is this helpful?</span>
            <div className="relative">
              <button
                className="p-2 rounded-lg transition-colors hover:bg-black/5"
                aria-label="Thumbs up"
                onClick={() => {
                  if (thumbsClicked && isMeasuringStory) {
                    setBurstTrigger((n) => n + 1);
                  }
                }}
              >
                <span
                  className={`material-icons-outlined text-h2 block transition-colors duration-300 ${
                    thumbsClicked ? 'text-emerald-600' : 'text-primary'
                  }`}
                >
                  thumb_up
                </span>
              </button>
              <FloatingThumbs active={thumbsClicked && isMeasuringStory} burstTrigger={burstTrigger} />
            </div>
            <AnimatePresence>
              {showStat && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="text-body-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"
                >
                  93% positive
                </motion.span>
              )}
            </AnimatePresence>
            {!thumbsClicked && (
              <button
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                aria-label="Thumbs down"
              >
                <span className="material-icons-outlined text-h2 text-primary">thumb_down</span>
              </button>
            )}
          </div>
        </>
      );
    }

    // --- Toggle stories: per-section streaming ---
    const headerSummaryText = isReframingStory
      ? isHeaderUpgraded ? summary : reframingBefore.summary
      : summary;
    const headerAvatarColor = isReframingStory
      ? isHeaderUpgraded ? employee.avatarColor : WIREFRAME_GRAY
      : employee.avatarColor;

    return (
      <>
        {/* Header Section — streams between v1/v2 */}
        <div className="border-b-2 border-border px-6 py-6">
          <div style={{ opacity: isRefiningStory ? 0.3 : 1, transition: 'opacity 0.3s ease-in-out' }}>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white transition-colors duration-500"
                style={{ backgroundColor: headerAvatarColor }}
              >
                {employee.initials}
              </div>
              <div>
                <p className="text-h3 font-normal text-primary" style={{ marginBottom: '0px' }}>
                  {employee.name}
                </p>
                <p className="text-body-sm text-primary mb-0">{employee.role}</p>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={headerSummaryText}
                initial={borderAnimating ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-body-sm text-primary mt-0"
              >
                {headerSummaryText}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Items — each streams independently */}
        {allItems.map((afterItem, index) => {
          const upgraded = isItemUpgraded(index);

          if (isReframingStory) {
            const beforeItem = reframingBefore.items[index];
            return (
              <AnimatePresence mode="wait" key={`reframing-${index}`}>
                {upgraded ? (
                  <motion.div
                    key={`after-${index}`}
                    initial={borderAnimating ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <CollapsibleItem
                      item={afterItem}
                      sectionIndex={index}
                      isExpanded={expandedIndex === index}
                      onToggle={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      blockStyle={{ opacity: 1 }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`before-${index}`}
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <BeforeSummaryItemRow item={beforeItem} />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          }

          // Refining story: simplified focused view, detail expands in
          const displayItem = upgraded ? afterItem : refiningBeforeItems[index];
          const afterParts = refiningBefore.afterParts?.[index];
          return (
            <AnimatePresence mode="wait" key={`refining-${index}`}>
              <motion.div
                key={`${upgraded}-${index}`}
                initial={borderAnimating ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FocusedItem
                  item={displayItem}
                  summaryParts={upgraded ? afterParts : undefined}
                  animateExpand={upgraded && borderAnimating}
                />
              </motion.div>
            </AnimatePresence>
          );
        })}

        {/* Footer */}
        <div
          className="px-6 py-4 flex items-center gap-2"
          style={{
            opacity: isRefiningStory ? 0.3 : isFullyBefore ? 0.4 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <span className="text-body-sm text-secondary">Is this helpful?</span>
          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors" aria-label="Thumbs up">
            <span className="material-icons-outlined text-h2 text-primary">thumb_up</span>
          </button>
          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors" aria-label="Thumbs down">
            <span className="material-icons-outlined text-h2 text-primary">thumb_down</span>
          </button>
        </div>
      </>
    );
  };

  const showWireframe = isFullyBefore;

  return (
    <div
      className={`relative rounded-[7px] p-[2px] ${className}`}
      style={
        borderAnimating
          ? {}
          : {
              background: showWireframe
                ? 'linear-gradient(135deg, #C4C4C4, #A8A8A8, #C4C4C4)'
                : 'linear-gradient(135deg, var(--ai-gradient-1), var(--ai-gradient-2), var(--ai-gradient-3))',
              transition: 'background 0.3s ease-in-out',
            }
      }
    >
      <LoadingStyles />
      {borderAnimating && <div className="loading-panel-border" />}
      <div className="bg-background-elevated rounded-[5px] overflow-visible relative z-[1]">
        {renderContent()}
      </div>
    </div>
  );
}

export default function HighlightsPanel({
  className = '',
  activeStory = null,
  showBeforeState = true,
}: HighlightsPanelProps) {
  const reducedMotion = useReducedMotion();
  const { isComplete } = useIntroSequence();
  const [showLoading, setShowLoading] = useState(true);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Only start timer once intro is complete AND we haven't started yet
    if (isComplete && showLoading && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // Small delay for fadeInUp to complete, then show loading for 1.5s
      const entranceDelay = reducedMotion ? 0 : 600;
      const loadingDuration = reducedMotion ? 0 : 1500;

      setTimeout(() => {
        setTimeout(() => {
          setShowLoading(false);
        }, loadingDuration);
      }, entranceDelay);
    }
  }, [isComplete, showLoading, reducedMotion]);

  return (
    <AnimatePresence mode="wait">
      {showLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingState />
        </motion.div>
      ) : (
        <motion.div
          key="solution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SolutionState
            className={className}
            activeStory={activeStory}
            showBeforeState={showBeforeState}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
