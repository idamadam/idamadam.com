'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp } from '@/lib/animations';

interface VignetteContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id: string;
}

export default function VignetteContainer({
  title,
  subtitle,
  children,
  id
}: VignetteContainerProps) {
  return (
    <motion.article
      id={id}
      className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden"
      {...fadeInUp}
    >
      <div className="p-6 lg:p-8 space-y-8">
        {/* Title Section */}
        <div className="space-y-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1d23] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content/Demo Section */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.article>
  );
}
