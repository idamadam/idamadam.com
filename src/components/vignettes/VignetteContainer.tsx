'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp } from '@/lib/animations';

interface VignetteContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  id: string;
  allowOverflow?: boolean;
}

export default function VignetteContainer({
  title,
  subtitle,
  children,
  id,
  allowOverflow = false
}: VignetteContainerProps) {
  return (
    <motion.article
      id={id}
      className={`w-full bg-white rounded-2xl border border-gray-200/80 ${
        allowOverflow ? 'overflow-visible' : 'overflow-hidden'
      }`}
      {...fadeInUp}
    >
      <div className="p-7 lg:p-10 space-y-10">
        {/* Title Section - Only show if title is provided */}
        {title && (
          <div className="space-y-3">
            <h2 className="text-[24px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#0f172a]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[16px] leading-[1.6] text-gray-600 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content/Demo Section */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.article>
  );
}
