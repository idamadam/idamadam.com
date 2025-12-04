'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import { vibeCodingContent } from '@/lib/vignette-data';

export default function VibeCodingVignette() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullCode = vibeCodingContent.codeSnippet;

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayedCode('');

      const typeNextCharacter = () => {
        if (currentIndex < fullCode.length) {
          setDisplayedCode(fullCode.substring(0, currentIndex + 1));
          currentIndex++;
          typingTimer = setTimeout(typeNextCharacter, 30);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            currentIndex = 0;
            startTyping();
          }, 5000);
        }
      };

      typeNextCharacter();
    };

    startTyping();

    return () => {
      clearTimeout(typingTimer);
    };
  }, [fullCode]);

  return (
    <VignetteContainer
      id="vibe-coding"
      title={vibeCodingContent.title}
      backgroundColor="#ffffff"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#1e1e1e] border border-[#2c2c2c] rounded-lg overflow-hidden shadow-lg"
        >
          {/* Editor Header */}
          <div className="bg-[#2c2c2c] px-4 py-3 flex items-center justify-between border-b border-[#3e3e3e]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-sm text-gray-400 ml-2">vibe.js</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
          </div>

          {/* Code Editor Content */}
          <div className="p-6 font-mono text-sm">
            <pre className="text-gray-300 leading-relaxed">
              <code>
                {displayedCode}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-500 ml-0.5"
                  />
                )}
              </code>
            </pre>
          </div>

          {/* Status Bar */}
          <div className="bg-[#2c2c2c] px-4 py-2 flex items-center justify-between border-t border-[#3e3e3e] text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>{vibeCodingContent.language}</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span>Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
