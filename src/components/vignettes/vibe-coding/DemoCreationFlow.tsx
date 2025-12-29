'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  delay: number;
  text: string;
  type: 'user' | 'assistant' | 'tool' | 'success';
  icon?: string;
}

const DEMO_MESSAGES: Message[] = [
  { delay: 0, text: 'Create a vignette for my portfolio homepage', type: 'user' },
  { delay: 400, text: 'I\'ll create an interactive vignette with staged reveals and design annotations.', type: 'assistant' },
  { delay: 1000, text: 'Writing Vignette.tsx', type: 'tool', icon: '📝' },
  { delay: 1400, text: 'Writing Panel.tsx', type: 'tool', icon: '📝' },
  { delay: 1800, text: 'Writing content.ts', type: 'tool', icon: '✏️' },
  { delay: 2200, text: 'Adding animations', type: 'tool', icon: '✨' },
  { delay: 2600, text: '✓ Vignette created successfully', type: 'success' }
];

const RESULT_DELAY = 3200;

interface DemoCreationFlowProps {
  onComplete?: () => void;
}

export default function DemoCreationFlow({ onComplete }: DemoCreationFlowProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasPlayedRef = useRef(false);

  const startDemo = () => {
    console.log('[DemoCreationFlow] startDemo called');

    // Allow replays
    hasPlayedRef.current = true;

    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset state
    setVisibleMessages([]);
    setShowResult(false);
    setIsPlaying(true);
    setMobileView('chat');

    // Schedule messages
    DEMO_MESSAGES.forEach((message) => {
      const timeout = setTimeout(() => {
        console.log('[DemoCreationFlow] Showing message:', message.text);
        setVisibleMessages((prev) => [...prev, message]);
      }, message.delay);
      timeoutsRef.current.push(timeout);
    });

    // Schedule result reveal
    const resultTimeout = setTimeout(() => {
      console.log('[DemoCreationFlow] Showing result');
      setShowResult(true);
      setIsPlaying(false);
      setHasPlayed(true);

      // Notify parent that demo is complete
      if (onComplete) {
        onComplete();
      }
    }, RESULT_DELAY);
    timeoutsRef.current.push(resultTimeout);
  };

  // Transition mobile view to preview when result is shown
  useEffect(() => {
    if (showResult) {
      setMobileView('preview');
    }
  }, [showResult]);

  // Auto-play on scroll into view
  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            console.log('[DemoCreationFlow] Element in view, auto-starting demo');
            startDemo();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Mini Prototype Page Layout */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden h-[650px] lg:h-[550px]">

        {/* Mini Header */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-sm font-medium text-gray-600">Vignette Demo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">
              Desktop
            </div>
          </div>
        </div>

        {/* Desktop Layout: Side-by-side Command Panel + Preview */}
        <div className="hidden lg:flex lg:flex-row w-full h-[calc(100%-3rem)]">

          {/* Command Panel (Left Side) - mimics real CommandPanel */}
          <div className="w-60 shrink-0 border-r border-gray-200 bg-gray-50/50 flex flex-col">

            {/* Output Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {visibleMessages.length === 0 && !isPlaying && (
                <div className="flex items-center justify-center h-full">
                  <button
                    onClick={startDemo}
                    className="btn-interactive btn-primary"
                  >
                    <span className="material-icons-outlined">play_arrow</span>
                    Start Demo
                  </button>
                </div>
              )}

              {visibleMessages.map((message, index) => (
                <div
                  key={index}
                  className="animate-fadeIn"
                  style={{
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}
                >
                  {message.type === 'user' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-gray-500 font-medium mb-1.5">You</div>
                      <div className="text-sm text-gray-900">{message.text}</div>
                    </div>
                  )}

                  {message.type === 'assistant' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="text-xs text-gray-500 font-medium mb-1.5">Agent</div>
                      <div className="text-sm text-gray-700">{message.text}</div>
                    </div>
                  )}

                  {message.type === 'tool' && (
                    <div className="flex items-center space-x-2 text-sm text-gray-400 pl-3">
                      <span className="opacity-60">{message.icon}</span>
                      <span>{message.text}</span>
                    </div>
                  )}

                  {message.type === 'success' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="text-sm text-gray-700 font-medium">
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isPlaying && visibleMessages.length > 0 && (
                <div className="flex items-center space-x-2 text-gray-400 text-sm pl-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                  <span>Generating...</span>
                </div>
              )}
            </div>

            {/* Command Input (Bottom) */}
            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-400">
                <span>Type a command...</span>
              </div>
            </div>
          </div>

          {/* Prototype Preview (Right Side) */}
          <div className="flex-1 w-full bg-gray-100 flex items-center justify-center p-4">
            <div
              className={`w-full max-w-[240px] transition-all duration-700 ${
                showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {showResult ? (
                <div className="border border-neutral-200 rounded-2xl bg-white shadow-xl overflow-hidden ring-1 ring-amber-500/20">
                  <div className="p-4">
                    {/* Mini VignetteSplit layout */}
                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start">
                      {/* Left: Title + Description */}
                      <div className="space-y-1">
                        <h4 className="text-[11px] font-semibold text-gray-900 leading-tight">
                          AI Suggestions
                        </h4>
                        <p className="text-[9px] text-gray-500 leading-relaxed">
                          Contextual improvements for reviews
                        </p>
                        {/* Mini CTA */}
                        <button className="mt-2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-md">
                          See solution
                        </button>
                      </div>

                      {/* Right: Mini Panel */}
                      <div className="bg-neutral-50 rounded-lg p-2.5 border border-neutral-100">
                        {/* Mini text editor area */}
                        <div className="bg-white rounded border border-neutral-200 p-2 mb-2">
                          <div className="space-y-1">
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                            <div className="h-1.5 bg-amber-200 rounded w-3/5"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                        {/* Mini suggestion card */}
                        <div className="bg-white rounded border border-amber-200 p-1.5">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-amber-100 flex items-center justify-center">
                              <span className="text-[6px]">💡</span>
                            </div>
                            <div className="h-1 bg-gray-300 rounded flex-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-xl bg-white shadow-lg p-8 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-gray-500">Building prototype...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout: Transitioning single view */}
        <div className="lg:hidden w-full h-[calc(100%-3rem)]">
          <AnimatePresence mode="wait">
            {mobileView === 'chat' ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-gray-50/50 flex flex-col"
              >
                {/* Output Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {visibleMessages.length === 0 && !isPlaying && (
                    <div className="flex items-center justify-center h-full">
                      <button
                        onClick={startDemo}
                        className="btn-interactive btn-primary"
                      >
                        <span className="material-icons-outlined">play_arrow</span>
                        Start Demo
                      </button>
                    </div>
                  )}

                  {visibleMessages.map((message, index) => (
                    <div
                      key={index}
                      className="animate-fadeIn"
                      style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                      }}
                    >
                      {message.type === 'user' && (
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                          <div className="text-xs text-gray-500 font-medium mb-1.5">You</div>
                          <div className="text-sm text-gray-900">{message.text}</div>
                        </div>
                      )}

                      {message.type === 'assistant' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <div className="text-xs text-gray-500 font-medium mb-1.5">Agent</div>
                          <div className="text-sm text-gray-700">{message.text}</div>
                        </div>
                      )}

                      {message.type === 'tool' && (
                        <div className="flex items-center space-x-2 text-sm text-gray-400 pl-3">
                          <span className="opacity-60">{message.icon}</span>
                          <span>{message.text}</span>
                        </div>
                      )}

                      {message.type === 'success' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <div className="text-sm text-gray-700 font-medium">
                            {message.text}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isPlaying && visibleMessages.length > 0 && (
                    <div className="flex items-center space-x-2 text-gray-400 text-sm pl-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                      <span>Generating...</span>
                    </div>
                  )}
                </div>

                {/* Command Input (Bottom) */}
                <div className="border-t border-gray-200 bg-white p-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-400">
                    <span>Type a command...</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-gray-100 flex items-center justify-center p-6"
              >
                <div className="w-full max-w-[280px]">
                  <div className="border border-neutral-200 rounded-2xl bg-white shadow-xl overflow-hidden ring-1 ring-amber-500/20">
                    <div className="p-5">
                      {/* Mini VignetteSplit layout */}
                      <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                        {/* Left: Title + Description */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-semibold text-gray-900 leading-tight">
                            AI Suggestions
                          </h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed">
                            Contextual improvements for reviews
                          </p>
                          {/* Mini CTA */}
                          <button className="mt-2 px-2.5 py-1 bg-gray-900 text-white text-[9px] font-medium rounded-md">
                            See solution
                          </button>
                        </div>

                        {/* Right: Mini Panel */}
                        <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
                          {/* Mini text editor area */}
                          <div className="bg-white rounded border border-neutral-200 p-2 mb-2">
                            <div className="space-y-1.5">
                              <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                              <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                              <div className="h-1.5 bg-amber-200 rounded w-3/5"></div>
                              <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            </div>
                          </div>
                          {/* Mini suggestion card */}
                          <div className="bg-white rounded border border-amber-200 p-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                                <span className="text-[8px]">💡</span>
                              </div>
                              <div className="h-1.5 bg-gray-300 rounded flex-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Replay button */}
      {hasPlayed && !isPlaying && (
        <div className="mt-6 text-center">
          <button
            onClick={startDemo}
            className="btn-interactive btn-primary mx-auto"
          >
            <span className="material-icons-outlined">replay</span>
            Replay
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}