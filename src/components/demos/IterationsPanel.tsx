'use client';

import { motion } from 'framer-motion';
import { DesignIteration } from '@/components/vignettes/types';
import { iterationsStagger, iterationCard } from '@/lib/animations';

interface IterationsPanelProps {
  iterations: DesignIteration[];
  className?: string;
}

export default function IterationsPanel({ iterations, className = '' }: IterationsPanelProps) {
  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 ${className}`}
      variants={iterationsStagger}
      initial="initial"
      animate="animate"
    >
      {iterations.map((iteration, index) => {
        const isFinal = iteration.id === 'final';

        return (
          <motion.div
            key={iteration.id}
            variants={iterationCard}
          >
            <div
              className={`border rounded-xl bg-white overflow-hidden ${
                isFinal ? 'border-[#0f172a] shadow-sm shadow-[#0f172a]/5' : 'border-gray-200'
              }`}
            >
              <div className="p-4 lg:p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                      isFinal
                        ? 'bg-[#0f172a] text-white'
                        : 'bg-gray-100 text-[#0f172a] border border-gray-200'
                    }`}
                  >
                    {isFinal ? (
                      <span className="material-icons-outlined text-[18px]">check</span>
                    ) : (
                      `V${index + 1}`
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[12px] uppercase tracking-[0.08em] text-gray-500">
                      {isFinal ? 'Final design' : 'Iteration'}
                    </p>
                    <h4 className="text-[16px] font-semibold text-[#0f172a] leading-[1.3] font-[family-name:var(--font-ibm-plex-sans)]">
                      {iteration.label}
                    </h4>
                  </div>
                </div>

                {iteration.imageUrl && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    <img
                      src={iteration.imageUrl}
                      alt={`${iteration.label} design iteration`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/35 pointer-events-none" />
                  </div>
                )}

                <p className="text-[14px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)]">
                  {iteration.annotation}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
