'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import NumberedMarker from '../ai-highlights/NumberedMarker';
import DesktopMarkerTooltip from '../shared/DesktopMarkerTooltip';
import { homeConnectContent } from './content';

interface HomeConnectPanelProps {
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
}

// Avatar component with initials
function Avatar({ initials, size = 20 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-[#FFF0E8] flex items-center justify-center shrink-0 text-[#2F2438]"
      style={{ width: size, height: size }}
    >
      <span className="font-semibold" style={{ fontSize: size * 0.4 }}>{initials}</span>
    </div>
  );
}

// Grouped avatars component for overlapping avatar display
function GroupedAvatars({ avatars }: { avatars: Array<{ initials: string }> }) {
  return (
    <div className="flex items-center pl-0 pr-[10px]">
      {avatars.map((avatar, index) => (
        <div key={index} className="shrink-0" style={{ marginRight: -10 }}>
          <Avatar initials={avatar.initials} size={20} />
        </div>
      ))}
    </div>
  );
}

// Status tag component
function StatusTag({ label, variant = 'success' }: { label: string; variant?: 'success' }) {
  const bgColor = variant === 'success' ? 'bg-emerald-500/20' : 'bg-black/5';
  return (
    <div className={`${bgColor} px-[9px] py-[3px] rounded-[15px]`}>
      <span className="text-xs text-primary leading-[18px]">{label}</span>
    </div>
  );
}

// Progress ring component
function ProgressRing({ progress, size = 24 }: { progress: number; size?: number }) {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#44A289"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Goal donut component
function GoalDonut({ percentage }: { percentage: number }) {
  const strokeWidth = 4;
  const size = 48;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFB600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-label font-semibold text-primary/70">{percentage}%</span>
      </div>
    </div>
  );
}

// Divider with label
function FeedDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-1.5">
      <span className="text-base font-semibold text-primary/70 shrink-0 leading-6">{label}</span>
      <div className="flex-1 h-px bg-[#524E56]/10 rounded-full" />
    </div>
  );
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Down arrow icon for alerts
function DownArrowIcon() {
  return (
    <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M5 2V8M5 8L2 5M5 8L8 5" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Feed card wrapper
interface FeedCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function FeedCard({ children, style }: FeedCardProps) {
  return (
    <div
      className="bg-background-elevated rounded-[7px] shadow-md p-5 flex items-center gap-4 overflow-clip"
      style={style}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <ArrowIcon />
    </div>
  );
}

export default function HomeConnectPanel({
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: HomeConnectPanelProps) {
  // Get highlight style for a section based on number
  const getSectionHighlightStyle = (sectionNumber: number) => {
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
  };

  return (
    <div className="w-full bg-background-subtle rounded-2xl overflow-visible">
      {/* Purple header */}
      <div className="bg-[#5F3361] px-5 pt-4 pb-4 relative rounded-t-2xl">
        {/* Culture Amp Logo */}
        <div className="flex items-center gap-1.5 mb-4">
          <img
            src="/logos/cultureamp.svg"
            alt="Culture Amp"
            className="h-4 brightness-0 invert"
          />
        </div>

        {/* Home title */}
        <motion.h1
          className="text-white text-h3 font-bold leading-tight !m-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Home
        </motion.h1>
      </div>

      {/* Content area with marker 1 - unified feed */}
      <div
        className="px-5 pt-4 pb-5 relative"
        data-section-id="unified-feed"
        style={getSectionHighlightStyle(1)}
      >
        {/* Marker 1 - Unified feed - desktop: right side, mobile: right edge */}
        <AnimatePresence>
          {!hideMarkers && (
            <>
              <motion.div
                key="marker-1-desktop"
                className="absolute -right-8 top-6 hidden xl:block z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => onMarkerHover?.(1)}
                onMouseLeave={() => onMarkerHover?.(null)}
              >
                <NumberedMarker
                  number={1}
                  onClick={() => onMarkerClick?.(1)}
                  isActive={highlightedSection === 1}
                />
                <DesktopMarkerTooltip
                  number={1}
                  text={homeConnectContent.designDetails[0].text}
                  isVisible={highlightedSection === 1}
                  position="right"
                />
              </motion.div>
              <motion.div
                key="marker-1-mobile"
                className="absolute -right-3 top-6 xl:hidden z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NumberedMarker
                  number={1}
                  onClick={() => onMarkerClick?.(1)}
                  isActive={highlightedSection === 1}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Your feed section */}
        <motion.div
          className="space-y-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <FeedDivider label="Upcoming" />

          {/* Performance Cycle Card - with marker 2 for people-focused cards */}
          <div
            className="relative"
            data-section-id="people-card"
            style={getSectionHighlightStyle(2)}
          >
            {/* Marker 2 - People-focused cards - desktop: left side, mobile: left edge */}
            <AnimatePresence>
              {!hideMarkers && (
                <>
                  <motion.div
                    key="marker-2-desktop"
                    className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onMouseEnter={() => onMarkerHover?.(2)}
                    onMouseLeave={() => onMarkerHover?.(null)}
                  >
                    <NumberedMarker
                      number={2}
                      onClick={() => onMarkerClick?.(2)}
                      isActive={highlightedSection === 2}
                    />
                    <DesktopMarkerTooltip
                      number={2}
                      text={homeConnectContent.designDetails[1].text}
                      isVisible={highlightedSection === 2}
                      position="left"
                    />
                  </motion.div>
                  <motion.div
                    key="marker-2-mobile"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <NumberedMarker
                      number={2}
                      onClick={() => onMarkerClick?.(2)}
                      isActive={highlightedSection === 2}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <FeedCard>
              <div className="space-y-3">
                <p className="text-base text-primary leading-6">
                  <span className="font-semibold">2023 Performance Cycle</span> feedback closes in 3 days
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <ProgressRing progress={40} size={20} />
                    <span className="text-xl font-bold text-primary leading-6">2 of 5</span>
                  </div>
                  <p className="text-sm text-primary/70 leading-5">Direct reports with completed nominations</p>
                  <div className="flex items-center gap-1">
                    <GroupedAvatars avatars={[
                      { initials: 'MW' },
                      { initials: 'MN' },
                      { initials: 'AP' },
                      { initials: 'JR' },
                    ]} />
                    <span className="text-sm text-primary leading-5">Malik Williams, Maya Nguyen and 3 others have not submitted their nominations</span>
                  </div>
                </div>
              </div>
            </FeedCard>
          </div>

          {/* 1-on-1 Card */}
          <FeedCard>
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Avatar initials="AP" size={18} />
                <span className="text-base font-semibold text-primary leading-6">Aisha Patel</span>
                <span className="text-base text-primary leading-6">1-on-1 today</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-primary/70 leading-[18px]">To discuss</p>
                <div className="flex items-center gap-1.5">
                  <DownArrowIcon />
                  <span className="text-sm font-semibold text-red-400 leading-5">Wellbeing has gone down since the last 1-on-1</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Avatar initials="AP" size={18} />
                  <span className="text-sm text-primary leading-5">No topics from Aisha</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Avatar initials="CJ" size={18} />
                  <span className="text-sm text-primary leading-5">1 topic from you</span>
                </div>
              </div>
            </div>
          </FeedCard>

          <FeedDivider label="Recent" />

          {/* Goal Card - with marker 3 for inactive goal notification */}
          <div
            className="relative"
            data-section-id="inactive-goal"
            style={getSectionHighlightStyle(3)}
          >
            {/* Marker 3 - Inactive goal notification - desktop: right side, mobile: right edge */}
            <AnimatePresence>
              {!hideMarkers && (
                <>
                  <motion.div
                    key="marker-3-desktop"
                    className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    onMouseEnter={() => onMarkerHover?.(3)}
                    onMouseLeave={() => onMarkerHover?.(null)}
                  >
                    <NumberedMarker
                      number={3}
                      onClick={() => onMarkerClick?.(3)}
                      isActive={highlightedSection === 3}
                    />
                    <DesktopMarkerTooltip
                      number={3}
                      text={homeConnectContent.designDetails[2].text}
                      isVisible={highlightedSection === 3}
                      position="right"
                    />
                  </motion.div>
                  <motion.div
                    key="marker-3-mobile"
                    className="absolute -right-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <NumberedMarker
                      number={3}
                      onClick={() => onMarkerClick?.(3)}
                      isActive={highlightedSection === 3}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <FeedCard>
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Avatar initials="MW" size={18} />
                  <span className="text-base font-semibold text-primary leading-6">Malik John Williams</span>
                  <span className="text-base text-primary leading-6">has an inactive goal</span>
                </div>
                <div className="flex items-center gap-2">
                  <GoalDonut percentage={25} />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-sm font-semibold text-primary leading-5">Learn how to handle multiple priorities</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      <StatusTag label="On track" variant="success" />
                      <span className="text-xs text-[#CDCDD0] leading-[18px]">•</span>
                      <span className="text-xs text-primary/70 leading-[18px]">Updated just now</span>
                      <span className="text-xs text-[#CDCDD0] leading-[18px]">•</span>
                      <span className="text-xs text-primary/70 leading-[18px]">Due Dec 31, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </FeedCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
