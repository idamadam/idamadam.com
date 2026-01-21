'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/lib/animations';
import { trackVignetteViewed, type VignetteId } from '@/lib/analytics';

interface VignetteContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  id: VignetteId;
  allowOverflow?: boolean;
  className?: string;
}

export default function VignetteContainer({
  title,
  subtitle,
  children,
  id,
  allowOverflow = false,
  className = ''
}: VignetteContainerProps) {
  const hasTrackedView = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackVignetteViewed(id);
    }
  }, [inView, id]);

  return (
    <motion.article
      ref={ref}
      id={id}
      className={`w-full h-full ${
        allowOverflow ? 'overflow-visible' : 'overflow-hidden'
      } ${className}`}
      {...fadeInUp}
    >
      <div className="space-y-6">
        {/* Title Section - Only show if title is provided */}
        {title && (
          <div className="space-y-2">
            <h2 className="type-h2">
              {title}
            </h2>
            {subtitle && (
              <p className="type-body text-secondary">
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
