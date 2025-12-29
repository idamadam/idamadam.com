'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  delay: number;
  text: string;
  type: 'user' | 'assistant' | 'tool' | 'success';
  icon?: string;
}

const DEMO_MESSAGES: Message[] = [
  { delay: 0, text: 'Create a task card with priority badges', type: 'user' },
  { delay: 400, text: 'I\'ll create an interactive task card component with priority badges and a clean design.', type: 'assistant' },
  { delay: 1000, text: 'Writing App.tsx', type: 'tool', icon: '📝' },
  { delay: 1400, text: 'Writing Badge.tsx', type: 'tool', icon: '📝' },
  { delay: 1800, text: 'Writing styles.css', type: 'tool', icon: '🎨' },
  { delay: 2200, text: 'Compiling prototype', type: 'tool', icon: '⚡' },
  { delay: 2600, text: '✓ Prototype created successfully', type: 'success' }
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
            <span className="text-sm font-medium text-gray-600">Task Card Demo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">
              Desktop
            </div>
          </div>
        </div>

        {/* Main Layout: Command Panel + Preview */}
        <div className="flex flex-col lg:flex-row w-full h-[calc(100%-3rem)]">

          {/* Command Panel (Left Side) - mimics real CommandPanel */}
          <div className="w-full lg:w-60 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/50 flex flex-col max-h-[280px] lg:max-h-none">

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
          <div className="flex-1 w-full bg-gray-100 flex items-center justify-center p-4 min-h-[300px]">
            <div
              className={`w-full max-w-[240px] transition-all duration-700 ${
                showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {showResult ? (
                <div className="border border-gray-200 rounded-xl bg-white shadow-xl">
                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        High Priority
                      </span>
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        Design
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Update landing page hero
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Revise the main headline and add a compelling demo section to showcase the product in action.
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due in 3 days</span>
                      </div>
                      <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
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