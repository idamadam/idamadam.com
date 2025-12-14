'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FeedItem {
  id: number;
  title: string;
  metadata?: string;
  time?: string;
  badge?: string;
  description: string;
  descriptionSecondary?: string;
  actionItems?: string[];
  tags?: string[];
  actionLink?: string;
  expanded?: boolean;
}

const feedItems: FeedItem[] = [
  {
    id: 1,
    title: '2023 Performance Cycle feedback closes in 2 days',
    badge: '3 of 5',
    metadata: 'Performance Cycle',
    time: '2 days',
    description: 'Submit your 2023 self-reflection and gather feedback from your peers before the review period closes.',
    descriptionSecondary: 'Feedback you need to give:',
    actionItems: [
      'Alex Williams - Mark Rogers - Give feedback',
      'Katie Hunt - Mark Rogers - Give feedback',
      'Lucy Hamilton - Mark Rogers - Give feedback'
    ],
    tags: ['Feedback', 'Performance', 'Due soon']
  },
  {
    id: 2,
    title: 'Anna Patel gave you feedback Level 1',
    metadata: 'Feedback given',
    time: '1 hour ago',
    description: 'In our retrospective, you facilitated really well. You asked good questions that helped us uncover the root issues and made everyone feel safe to share.',
    tags: ['Positive']
  },
  {
    id: 3,
    title: 'Maria Juric Williams has scheduled a 1-on-1 with you',
    metadata: '1-on-1 Meeting',
    time: 'Tomorrow',
    description: 'Catch up • Wednesday, December 15 • 2:00 PM (AEDT)',
    tags: ['Upcoming']
  },
  {
    id: 4,
    title: "It doesn't look like you have a 1-on-1 set up yet",
    description: 'Regular 1-on-1 check-ins with your manager help build trust and open communication. Set one up with your manager or direct reports.',
    actionLink: 'Set up 1-on-1'
  }
];

export default function HomeConnectPanel() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([1]);

  const toggleExpand = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-[#F8F8F8] rounded-[4px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#5B3D6F] h-[32px] px-4 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/20 rounded-[4px]" />
          <span className="text-white text-[12px] font-semibold">Culture Amp</span>
        </div>
      </div>

      {/* Navigation/Search Bar */}
      <div className="bg-white h-[48px] px-4 flex items-center border-b border-[#EEEEEE]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-[32px] bg-[#F8F8F8] border border-[#EEEEEE] rounded-[4px] px-3 text-[13px] text-[#1A1A1A] placeholder:text-[#999999]"
        />
      </div>

      {/* Your feed Section */}
      <div className="p-4">
        <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-4 leading-[1.2]">Your feed</h2>

        <div className="space-y-3">
          {feedItems.map((item, index) => {
            const isExpanded = expandedItems.includes(item.id);
            const isHovered = hoveredItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="bg-white border border-[#EEEEEE] rounded-[4px] p-4 transition-all"
                style={{
                  boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-[#E8E2F0] rounded-[4px] flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#5B3D6F] rounded-[2px]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Badge */}
                    <div className="flex items-start justify-between gap-2 mb-[2px]">
                      <h3 className="text-[14px] font-semibold text-[#1A1A1A] leading-[1.4]">
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-[12px] text-[11px] font-medium bg-[#E8E2F0] text-[#5B3D6F]">
                            {item.badge}
                          </span>
                        )}
                      </h3>
                      {item.actionItems && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex-shrink-0 w-5 h-5 text-[#999999] hover:text-[#666666] transition-colors"
                        >
                          <svg
                            className="w-5 h-5 transition-transform"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Metadata */}
                    {(item.metadata || item.time) && (
                      <div className="flex items-center gap-2 mb-2 text-[12px] text-[#666666]">
                        {item.metadata && <span>{item.metadata}</span>}
                        {item.metadata && item.time && <span>•</span>}
                        {item.time && <span className="text-[#999999]">{item.time}</span>}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-[13px] text-[#1A1A1A] leading-[1.5] mb-2">
                      {item.description}
                    </p>

                    {/* Expandable Content */}
                    {item.actionItems && isExpanded && (
                      <div className="mb-2">
                        {item.descriptionSecondary && (
                          <p className="text-[13px] text-[#666666] mb-2">{item.descriptionSecondary}</p>
                        )}
                        <ul className="ml-4 space-y-1">
                          {item.actionItems.map((actionItem, i) => (
                            <li key={i} className="text-[13px] text-[#1A1A1A] leading-[1.6] flex items-start gap-2">
                              <span className="text-[#5B3D6F] mt-1">•</span>
                              <span>{actionItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Link */}
                    {item.actionLink && (
                      <div className="mb-2">
                        <button className="text-[13px] font-medium text-[#5B3D6F] hover:text-[#4A2F5A] hover:underline transition-colors inline-flex items-center gap-1">
                          {item.actionLink}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-[6px] mt-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-1 rounded-[12px] text-[11px] font-medium bg-[#E8E2F0] text-[#5B3D6F]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-4 text-center">
          <button className="text-[13px] font-medium text-[#5B3D6F] hover:text-[#4A2F5A] hover:underline transition-colors">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}
