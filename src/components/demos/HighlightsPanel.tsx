'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HighlightsPanelProps {
  className?: string;
}

export default function HighlightsPanel({ className = '' }: HighlightsPanelProps) {
  const [highlightExpanded, setHighlightExpanded] = useState(false);
  const [opportunityExpanded, setOpportunityExpanded] = useState(false);

  return (
    <div className={`bg-white border-2 border-[#a6e5e7] rounded-lg overflow-hidden font-[family-name:var(--font-inter)] ${className}`}>
      {/* Header Section */}
      <div className="border-b-2 border-[#eaeaec] px-6 py-8">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://www.figma.com/api/mcp/asset/1a127355-1cf2-4469-b9c8-398df34b3017"
            alt="Idam Adam"
            className="w-12 h-12 rounded-full shadow-sm"
          />
          <div>
            <p className="text-[20px] leading-[30px] font-normal text-[#2f2438]">
              Idam Adam
            </p>
            <p className="text-[16px] leading-[24px] text-[#2f2438]">
              Lead Product Designer
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-[24px] text-[#2f2438]">
          Idam designed 2 tools to help reduce the burden of the Performance Review Period.
          Highlights & Opportunities helps managers quickly understand what their direct reports
          did & verify AI output using direct quotes from feedback.
        </p>
      </div>

      {/* Highlight Item */}
      <div className="border-b-2 border-[#eaeaec]">
        <div className="px-6 py-8">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                  star
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Highlight
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>

              <AnimatePresence>
                {highlightExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-[#eaeaec]">
                      <p className="text-[14px] leading-[18px] text-[#524e56] font-semibold mb-2">
                        Sources:
                      </p>
                      <ul className="space-y-2 text-[14px] leading-[18px] text-[#524e56]">
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Direct feedback from user testing sessions showing positive model performance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Documentation of early feedback integration process.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[14px] leading-[18px] text-[#524e56]">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setHighlightExpanded(!highlightExpanded)}
                className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={highlightExpanded ? 'Collapse highlight' : 'Expand highlight'}
              >
                <motion.span
                  animate={{ rotate: highlightExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-icons-outlined text-[20px] text-[#2f2438] block"
                >
                  keyboard_arrow_down
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Item */}
      <div className="border-b-2 border-[#eaeaec]">
        <div className="px-6 py-8">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                  lightbulb
                </span>
                <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
                  Opportunity
                </span>
              </div>
              <p className="text-[16px] leading-[24px] text-[#2f2438]">
                Developed a process to get early feedback about model output during user testing.
              </p>

              <AnimatePresence>
                {opportunityExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-[#eaeaec]">
                      <p className="text-[14px] leading-[18px] text-[#524e56] font-semibold mb-2">
                        Sources:
                      </p>
                      <ul className="space-y-2 text-[14px] leading-[18px] text-[#524e56]">
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Opportunities identified for additional model output validation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-icons-outlined text-[16px] mt-0.5">
                            format_quote
                          </span>
                          <span>Feedback suggesting improvements to early testing process.</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://www.figma.com/api/mcp/asset/b06a70e3-eb2c-41d1-b6b1-5138056b1df2"
                    alt="Source"
                    className="w-5 h-5 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[14px] leading-[18px] text-[#524e56]">
                  2 sources
                </span>
              </div>
              <button
                onClick={() => setOpportunityExpanded(!opportunityExpanded)}
                className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={opportunityExpanded ? 'Collapse opportunity' : 'Expand opportunity'}
              >
                <motion.span
                  animate={{ rotate: opportunityExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-icons-outlined text-[20px] text-[#2f2438] block"
                >
                  keyboard_arrow_down
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Feedback Buttons */}
      <div className="px-6 py-4 flex items-center gap-2">
        <span className="text-[14px] leading-[18px] text-[#524e56]">
          Is this helpful?
        </span>
        <button
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Thumbs up"
        >
          <span className="material-icons-outlined text-[24px] text-[#2f2438]">
            thumb_up
          </span>
        </button>
        <button
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Thumbs down"
        >
          <span className="material-icons-outlined text-[24px] text-[#2f2438]">
            thumb_down
          </span>
        </button>
      </div>
    </div>
  );
}
