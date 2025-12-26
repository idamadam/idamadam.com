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
            <h2 className="type-h2">
              {title}
            </h2>
            {subtitle && (
              <p className="type-body-sm">
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
