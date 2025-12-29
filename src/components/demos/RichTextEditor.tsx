'use client';

import { ReactNode } from 'react';

interface RichTextEditorProps {
  content: string;
  placeholder?: string;
  showImproveButton?: boolean;
  onImprove?: () => void;
  isImproving?: boolean;
  className?: string;
  improveButtonMarker?: ReactNode;
}

export default function RichTextEditor({
  content,
  placeholder = 'Start typing...',
  showImproveButton = false,
  onImprove,
  isImproving = false,
  className = '',
  improveButtonMarker
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
            <div className="relative">
              {improveButtonMarker}
              <button
                onClick={onImprove}
                disabled={isImproving}
                className="btn-interactive btn-primary h-10 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons-outlined">auto_awesome</span>
                <span className="text-sm">Improve</span>
              </button>
            </div>
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
