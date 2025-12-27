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
      <div className="bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden" style={{ height: '550px' }}>

        {/* Mini Header */}
        <div className="h-12 bg-white border-b border-neutral-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
            <span className="text-sm font-medium text-neutral-600">Task Card Demo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-neutral-100 rounded-md text-xs text-neutral-600 font-medium">
              Desktop
            </div>
          </div>
        </div>

        {/* Main Layout: Command Panel + Preview */}
        <div className="flex h-[calc(100%-3rem)]">

          {/* Command Panel (Left Side) - mimics real CommandPanel */}
          <div className="w-72 border-r border-neutral-200 bg-neutral-50/50 flex flex-col">

            {/* Output Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {visibleMessages.length === 0 && !isPlaying && (
                <div className="flex items-center justify-center h-full">
                  <button
                    onClick={startDemo}
                    className="btn-interactive btn-primary btn-primary-pulse"
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
                    <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-neutral-500 font-medium mb-1.5">You</div>
                      <div className="text-sm text-neutral-900">{message.text}</div>
                    </div>
                  )}

                  {message.type === 'assistant' && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                      <div className="text-xs text-neutral-500 font-medium mb-1.5">Agent</div>
                      <div className="text-sm text-neutral-700">{message.text}</div>
                    </div>
                  )}

                  {message.type === 'tool' && (
                    <div className="flex items-center space-x-2 text-sm text-neutral-400 pl-3">
                      <span className="opacity-60">{message.icon}</span>
                      <span>{message.text}</span>
                    </div>
                  )}

                  {message.type === 'success' && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                      <div className="text-sm text-neutral-700 font-medium">
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isPlaying && visibleMessages.length > 0 && (
                <div className="flex items-center space-x-2 text-neutral-400 text-sm pl-3">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse"></div>
                  <span>Generating...</span>
                </div>
              )}
            </div>

            {/* Command Input (Bottom) */}
            <div className="border-t border-neutral-200 bg-white p-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-neutral-100 rounded-lg text-sm text-neutral-400">
                <span>Type a command...</span>
              </div>
            </div>
          </div>

          {/* Prototype Preview (Right Side) */}
          <div className="flex-1 bg-neutral-50 flex items-center justify-center p-4">
            <div
              className={`w-full max-w-sm transition-all duration-700 ${
                showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {showResult ? (
                <div className="border border-neutral-200 rounded-xl bg-white shadow-xl overflow-hidden">
                  {/* Task Card Example */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            High Priority
                          </span>
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Design
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-900">
                          Update landing page hero
                        </h4>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          Revise the main headline and add a compelling demo section to showcase the product in action.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <div className="flex items-center space-x-2 text-sm text-neutral-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due in 3 days</span>
                      </div>
                      <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-neutral-200 rounded-xl bg-white shadow-lg p-8 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-neutral-500">Building prototype...</p>
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