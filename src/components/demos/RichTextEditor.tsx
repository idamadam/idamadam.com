'use client';

import { motion } from 'framer-motion';

interface RichTextEditorProps {
  content: string;
  placeholder?: string;
  readOnly?: boolean;
  showImproveButton?: boolean;
  onImprove?: () => void;
  isImproving?: boolean;
  className?: string;
  pulseImproveButton?: boolean;
}

export default function RichTextEditor({
  content,
  placeholder = 'Start typing...',
  readOnly = true,
  showImproveButton = false,
  onImprove,
  isImproving = false,
  className = '',
  pulseImproveButton = false
}: RichTextEditorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="bg-white border-2 border-[#878792] rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white flex items-center gap-1.5 p-1.5">
          {/* Text formatting */}
          <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
            <span className="material-icons-outlined text-h3 text-primary">format_bold</span>
          </button>
          <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
            <span className="material-icons-outlined text-h3 text-primary">format_italic</span>
          </button>
          <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
            <span className="material-icons-outlined text-h3 text-primary">format_underlined</span>
          </button>

          {/* Divider */}
          <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />

          {/* List button */}
          <button className="bg-white hover:bg-gray-50 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
            <span className="material-icons-outlined text-h3 text-primary">format_list_bulleted</span>
          </button>

          {/* Divider */}
          <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />

          {/* Improve button */}
          {showImproveButton && (
            <motion.button
              onClick={onImprove}
              disabled={isImproving}
              className="flex items-center gap-1.5 h-10 px-3 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--accent-interactive-bg)',
              }}
              whileHover={{ backgroundColor: 'var(--accent-interactive-bg-hover)' }}
              animate={pulseImproveButton ? {
                boxShadow: [
                  '0 0 0 0 rgba(154, 54, 178, 0)',
                  '0 0 0 6px rgba(154, 54, 178, 0.12)',
                  '0 0 0 0 rgba(154, 54, 178, 0)'
                ]
              } : undefined}
              transition={pulseImproveButton ? {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined}
            >
              <span className="material-icons-outlined text-h3" style={{ color: 'var(--accent-interactive)' }}>auto_awesome</span>
              <span className="text-sm font-medium" style={{ color: 'var(--accent-interactive)' }}>Improve</span>
            </motion.button>
          )}
        </div>

        {/* Separator */}
        <div className="h-0.5 bg-[#878792] w-full" />

        {/* Content Area */}
        <div className="bg-white p-3.5 min-h-[80px]">
          {content ? (
            <p className="text-base leading-6 text-primary whitespace-pre-wrap">
              {content}
            </p>
          ) : (
            <p className="text-base text-secondary">{placeholder}</p>
          )}
        </div>
      </div>
    </div>
  );
}
