'use client';

import { motion } from 'framer-motion';

interface RichTextEditorProps {
  content: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export default function RichTextEditor({
  content,
  placeholder = 'Start typing...',
  readOnly = true,
  className = ''
}: RichTextEditorProps) {
  return (
    <motion.div
      className={`bg-white border border-black rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toolbar */}
      <div className="border-b border-black p-2 flex gap-2 bg-white">
        <div className="flex gap-0.5">
          {/* Bold */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4.375v11.25h4.219c1.719 0 3.125-1.406 3.125-3.125 0-1.094-.547-2.031-1.406-2.578.547-.469.937-1.172.937-1.953 0-1.406-1.172-2.594-2.578-2.594H5zm1.875 1.563h2.344c.547 0 .937.391.937.937s-.39.938-.937.938H6.875V5.937zm0 4.687h2.344c.78 0 1.406.626 1.406 1.407 0 .78-.625 1.406-1.406 1.406H6.875v-2.813z" />
            </svg>
          </button>
          {/* Italic */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.125 4.375v1.563h1.797l-1.875 7.5H6.25v1.562h5.625v-1.563h-1.797l1.875-7.5h1.797V4.376H8.125z" />
            </svg>
          </button>
          {/* Underline */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.625 4.375v5.625c0 2.422 1.953 4.375 4.375 4.375s4.375-1.953 4.375-4.375V4.375h-1.563v5.625c0 1.563-1.25 2.813-2.812 2.813S7.187 11.563 7.187 10V4.375H5.625zm-.625 11.25v1.25h10v-1.25H5z" />
            </svg>
          </button>
          {/* Strikethrough */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6.25c-1.172 0-2.188.625-2.188 1.406h-1.25c0-1.406 1.406-2.656 3.438-2.656s3.438 1.25 3.438 2.656c0 .781-.391 1.485-1.016 1.953h1.484c.547-.703.875-1.563.875-2.453 0-2.422-2.266-3.906-4.781-3.906s-4.781 1.484-4.781 3.906c0 .547.117 1.055.313 1.531H3.75v1.25h12.5v-1.25h-1.781C14.883 8.977 15 8.516 15 8c0-1.406-1.406-2.656-3.438-2.656H10zM10 11.25c1.172 0 2.188.625 2.188 1.406h1.25c0-1.406-1.406-2.656-3.438-2.656s-3.438 1.25-3.438 2.656c0 1.406 1.406 2.656 3.438 2.656s3.438-1.25 3.438-2.656h-1.25c0 .781-1.016 1.406-2.188 1.406z" />
            </svg>
          </button>
        </div>

        <div className="w-px bg-gray-300" />

        <div className="flex gap-0.5">
          {/* Bullet list */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3.125 5.625c0 .625.5 1.125 1.125 1.125s1.125-.5 1.125-1.125S4.875 4.5 4.25 4.5s-1.125.5-1.125 1.125zm3.75-.625v1.25h9.375V5h-9.375zm0 4.375v1.25h9.375v-1.25H6.875zm0 4.375v1.25h9.375V13.75H6.875zM3.125 10c0 .625.5 1.125 1.125 1.125s1.125-.5 1.125-1.125-.5-1.125-1.125-1.125S3.125 9.375 3.125 10zm0 4.375c0 .625.5 1.125 1.125 1.125s1.125-.5 1.125-1.125-.5-1.125-1.125-1.125-1.125.5-1.125 1.125z" />
            </svg>
          </button>
          {/* Numbered list */}
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3.125 5h1.25v3.125h-.625V5.625h-.625V5zm.625 8.125v-.625c.328 0 .625-.297.625-.625s-.297-.625-.625-.625-.625.297-.625.625h-.625c0-.672.547-1.25 1.25-1.25s1.25.578 1.25 1.25c0 .344-.156.672-.406.891.25.219.406.547.406.891 0 .672-.547 1.25-1.25 1.25s-1.25-.578-1.25-1.25h.625c0 .328.297.625.625.625s.625-.297.625-.625-.297-.625-.625-.625v-.625zm0-8.75v-.625h1.25v.625h-1.25zm0 10.625h1.25v.625h-1.875v-.313l.938-1.062c.187-.219.312-.391.312-.625 0-.328-.297-.625-.625-.625s-.625.297-.625.625h-.625c0-.672.547-1.25 1.25-1.25s1.25.578 1.25 1.25c0 .438-.203.781-.5 1.094l-.75.844zM6.875 5v1.25h9.375V5H6.875zm0 4.375v1.25h9.375v-1.25H6.875zm0 4.375v1.25h9.375V13.75H6.875z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 min-h-[120px]">
        {content ? (
          <p className="text-[14px] leading-[1.5] text-[#212529] whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <p className="text-[14px] text-[#9ca3af]">{placeholder}</p>
        )}
      </div>
    </motion.div>
  );
}
