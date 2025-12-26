'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface HomeConnectPanelProps {
  redlineModeActive?: boolean;
  focusedAnchor?: string | null;
}

// Avatar component with initials
function Avatar({ initials, size = 18 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-[#E8E2F0] flex items-center justify-center shrink-0 text-[#2F2438]"
      style={{ width: size, height: size }}
    >
      <span className="font-semibold" style={{ fontSize: size * 0.45 }}>{initials}</span>
    </div>
  );
}

// Progress ring component
function ProgressRing({ progress, size = 20 }: { progress: number; size?: number }) {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E8E2F0" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#5F3361"
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
  const size = 40;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#FFF0E8" strokeWidth={strokeWidth} />
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
    <div className="flex items-center gap-4 py-1">
      <span className="text-caption font-semibold text-primary/60 shrink-0">{label}</span>
      <div className="flex-1 h-px bg-[#524E56]/10 rounded-full" />
    </div>
  );
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <path d="M3 1L7 5L3 9" stroke="#2F2438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Down arrow icon for alerts
function DownArrowIcon() {
  return (
    <div className="w-4 h-4 rounded-full bg-[#A82433]/10 flex items-center justify-center shrink-0">
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M5 2V8M5 8L2 5M5 8L8 5" stroke="#A82433" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Feed card wrapper with optional anchor support
interface FeedCardProps {
  children: React.ReactNode;
  anchor?: string;
  style?: React.CSSProperties;
}

function FeedCard({ children, anchor, style }: FeedCardProps) {
  return (
    <div
      className="bg-white rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3"
      data-anchor={anchor}
      style={style}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <ArrowIcon />
    </div>
  );
}

export default function HomeConnectPanel({
  redlineModeActive = false,
  focusedAnchor = null
}: HomeConnectPanelProps) {
  const getAnchorStyle = (anchorName: string): React.CSSProperties => ({
    anchorName: `--${anchorName}`,
    opacity: redlineModeActive && focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
    boxShadow: focusedAnchor === anchorName ? '0 0 0 2px rgba(95, 51, 97, 0.3)' : 'none',
    transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties);

  return (
    <div className="w-full bg-[#F9F9F9] rounded-xl overflow-hidden">
      {/* Purple header */}
      <div className="bg-[#5F3361] px-5 pt-4 pb-4 relative">
        {/* Culture Amp Logo */}
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-label font-semibold">Culture Amp</span>
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

      {/* Content area with negative margin to overlap header */}
      <div className="px-5 -mt-10 pb-5">
        {/* Your feed section */}
        <motion.div
          className="space-y-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-body-sm font-bold text-primary leading-tight mb-2">Your feed</h2>

          <FeedDivider label="Upcoming" />

          {/* Performance Cycle Card */}
          <FeedCard
            anchor="feed-card-performance"
            style={getAnchorStyle('feed-card-performance')}
          >
            <div className="space-y-2">
              <p className="text-caption text-primary">
                <span className="font-semibold">2023 Performance Cycle</span> feedback closes in 3 days
              </p>
              <div className="flex items-center gap-1.5">
                <ProgressRing progress={80} />
                <span className="text-body-sm font-bold text-primary">4 of 5</span>
                <span className="text-caption text-primary/60">reports with completed feedback</span>
              </div>
            </div>
          </FeedCard>

          {/* 1-on-1 Card */}
          <FeedCard>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Avatar initials="AP" />
                <span className="text-caption font-semibold text-primary">Aisha Patel</span>
                <span className="text-caption text-primary">1-on-1 today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DownArrowIcon />
                <span className="text-caption font-medium text-[#A82433]">Wellbeing has gone down since last 1-on-1</span>
              </div>
            </div>
          </FeedCard>

          <FeedDivider label="Recent" />

          {/* Goal Card */}
          <FeedCard
            anchor="feed-card-goal"
            style={getAnchorStyle('feed-card-goal')}
          >
            <div className="flex items-center gap-3">
              <GoalDonut percentage={25} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Avatar initials="MW" size={16} />
                  <span className="text-caption font-semibold text-primary">Malik Williams</span>
                  <span className="text-caption text-primary/60">has an inactive goal</span>
                </div>
                <p className="text-caption text-primary">Learn how to handle multiple priorities</p>
              </div>
            </div>
          </FeedCard>
        </motion.div>
      </div>
    </div>
  );
}
