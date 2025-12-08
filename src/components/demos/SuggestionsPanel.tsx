'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

interface SuggestionsPanelProps {
  className?: string;
}

export default function SuggestionsPanel({ className = '' }: SuggestionsPanelProps) {
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(true);

  return (
    <div className={`space-y-2 font-[family-name:var(--font-inter)] ${className}`}>
      {/* Rich Text Editor */}
      <RichTextEditor
        content="This review period, Idam has designed some really great tools to help managers with their performance reviews."
        placeholder="Write your review..."
        readOnly={false}
      />

      {/* AI Suggestions Card */}
      <AnimatePresence>
        {suggestionsExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-white border-2 border-[#a6e5e7] rounded-lg p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-2">
                  <div className="flex items-center justify-center w-5 h-5 mt-0.5">
                    <span className="material-icons-outlined text-[20px] text-[#2f2438]">
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-1">
                    <span className="text-[18px] leading-[24px] font-semibold text-[#2f2438]">
                      2 suggested improvements
                    </span>
                    <span className="text-[16px] leading-[24px] text-[rgba(47,36,56,0.7)]">
                      based on Culture Amp People Science
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSuggestionsExpanded(false)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close suggestions"
                >
                  <span className="material-icons-outlined text-[16px] text-[#2f2438]">
                    close
                  </span>
                </button>
              </div>

              {/* Suggestion 1 */}
              <div className="mb-4">
                <p className="text-[16px] leading-[24px] text-[#2f2438]">
                  <span className="font-semibold">Suggest actions: </span>
                  <span className="font-normal">ABCD</span>
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#eaeaec] mb-4" />

              {/* Suggestion 2 */}
              <div>
                <p className="text-[16px] leading-[24px] text-[#2f2438]">
                  <span className="font-semibold">Be objective: </span>
                  <span className="font-normal">
                    Although the feedback is mostly objective, phrases like &quot;conscious
                    effort&quot; and &quot;constructively&quot; could be interpreted as slightly
                    subjective, as they infer intent rather than describing purely observable
                    behavior. While it mentions an observable behavior (interrupting), stating
                    overall that their communication has &quot;improved&quot; is a value judgment
                    and does not fit with the requirement of objectivity.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show suggestions button when collapsed */}
      {!suggestionsExpanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSuggestionsExpanded(true)}
          className="w-full bg-white border-2 border-[#a6e5e7] rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-icons-outlined text-[20px] text-[#2f2438]">
            auto_awesome
          </span>
          <span className="text-[16px] leading-[24px] font-semibold text-[#2f2438]">
            Show 2 AI suggestions
          </span>
        </motion.button>
      )}
    </div>
  );
}
