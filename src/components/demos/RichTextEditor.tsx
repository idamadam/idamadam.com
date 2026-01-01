'use client';

import { ReactNode } from 'react';

interface RichTextEditorProps {
  content: string;
  placeholder?: string;
  showImproveButton?: boolean;
  onImprove?: () => void;
  isImproving?: boolean;
  isImproveActivated?: boolean;
  className?: string;
  improveButtonMarker?: ReactNode;
  mobileFormatting?: 'show' | 'dots';
}

export default function RichTextEditor({
  content,
  placeholder = 'Start typing...',
  showImproveButton = false,
  onImprove,
  isImproving = false,
  isImproveActivated = false,
  className = '',
  improveButtonMarker,
  mobileFormatting = 'show'
}: RichTextEditorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="bg-white border-2 border-[#878792] rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-background-elevated flex items-center gap-1.5 p-1.5">
          {/* Mobile placeholder dots - shown when mobileFormatting="dots" */}
          {mobileFormatting === 'dots' && (
            <div className="flex sm:hidden items-center gap-1.5 px-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="size-2.5 rounded-full bg-gray-300" />
              ))}
            </div>
          )}

          {/* Formatting buttons */}
          <div className={`${mobileFormatting === 'dots' ? 'hidden sm:flex' : 'flex'} items-center gap-1.5`}>
            {/* Text formatting */}
            <button className="bg-background-elevated hover:bg-black/5 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
              <span className="material-icons-outlined text-h3 text-primary">format_bold</span>
            </button>
            <button className="bg-background-elevated hover:bg-black/5 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
              <span className="material-icons-outlined text-h3 text-primary">format_italic</span>
            </button>
            <button className="bg-background-elevated hover:bg-black/5 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
              <span className="material-icons-outlined text-h3 text-primary">format_underlined</span>
            </button>

            {/* Divider */}
            <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />

            {/* List button */}
            <button className="bg-background-elevated hover:bg-black/5 p-3.5 rounded-lg size-12 flex items-center justify-center transition-colors">
              <span className="material-icons-outlined text-h3 text-primary">format_list_bulleted</span>
            </button>

            {/* Divider */}
            <div className="h-12 w-px bg-[rgba(82,78,86,0.1)] mx-0.5" />
          </div>

          {/* Improve button */}
          {showImproveButton && (
            <div className="relative">
              {improveButtonMarker}
              <button
                onClick={onImprove}
                disabled={isImproving}
                className={
                  isImproveActivated
                    ? "bg-background-elevated hover:bg-black/5 h-10 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                    : "btn-interactive btn-primary h-10 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                }
              >
                <span className={`material-icons-outlined ${isImproveActivated ? 'text-primary' : ''}`}>auto_awesome</span>
                <span className={`text-sm ${isImproveActivated ? 'text-primary' : ''}`}>Improve</span>
              </button>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-0.5 bg-[#878792] w-full" />

        {/* Content Area */}
        <div className="bg-background-elevated p-3.5 min-h-[80px]">
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
