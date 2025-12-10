'use client';

import { motion } from 'framer-motion';
import { DesignIteration } from '@/lib/vignette-data';
import { iterationsStagger, iterationCard } from '@/lib/animations';

interface IterationsPanelProps {
  iterations: DesignIteration[];
  className?: string;
}

export default function IterationsPanel({ iterations, className = '' }: IterationsPanelProps) {
  return (
    <motion.div
      className={`space-y-6 ${className}`}
      variants={iterationsStagger}
      initial="initial"
      animate="animate"
    >
      {iterations.map((iteration, index) => (
        <motion.div
          key={iteration.id}
          variants={iterationCard}
          className="relative"
        >
          {/* Timeline connector */}
          {index < iterations.length - 1 && (
            <div className="absolute left-[19px] top-[48px] bottom-[-24px] w-[2px] bg-gradient-to-b from-gray-200 to-gray-100" />
          )}

          <div className="flex gap-5">
            {/* Version badge */}
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                  iteration.id === 'final'
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-gray-100 text-[#4b5563] border border-gray-200'
                }`}
              >
                {iteration.id === 'final' ? (
                  <span className="material-icons-outlined text-[18px]">check</span>
                ) : (
                  `V${index + 1}`
                )}
              </div>
            </div>

            {/* Content card */}
            <div className="flex-1 pb-2">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
                {/* Image placeholder - will show actual image when available */}
                {iteration.imageUrl && (
                  <div className="relative aspect-[16/9] bg-gray-50 border-b border-gray-100">
                    <img
                      src={iteration.imageUrl}
                      alt={`${iteration.label} design iteration`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Hide image on error, show placeholder
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback placeholder that shows when image fails to load */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <span className="material-icons-outlined text-[48px]">image</span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <h4 className="text-[16px] font-semibold text-[#0f172a] mb-2 font-[family-name:var(--font-ibm-plex-sans)]">
                    {iteration.label}
                  </h4>
                  <p className="text-[15px] leading-[1.6] text-[#4b5563] font-[family-name:var(--font-ibm-plex-sans)]">
                    {iteration.annotation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
