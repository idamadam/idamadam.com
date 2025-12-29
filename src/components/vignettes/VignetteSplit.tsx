'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { VignetteEntranceProvider } from '@/lib/vignette-entrance-context';

interface VignetteSplitProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'hero';
  /** Disable entrance animations (useful if parent handles it) */
  animateEntrance?: boolean;
  /** Force stacked layout (useful for compact containers) */
  compact?: boolean;
}

export default function VignetteSplit({
  title,
  description,
  actions,
  children,
  variant = 'default',
  animateEntrance = true,
  compact = false,
}: VignetteSplitProps) {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  const hasTitle = Boolean(title);
  const textStackClass = hasTitle ? 'space-y-4' : 'space-y-3';

  const titleClass = variant === 'hero' ? 'type-display' : 'type-h3';
  const descriptionClass = 'type-body';

  // Grid classes - compact forces single column, otherwise responsive
  const gridClass = compact
    ? 'grid grid-cols-1 gap-8'
    : 'grid grid-cols-1 xl:grid-cols-[320px_1fr] 2xl:grid-cols-[360px_1fr] gap-8 xl:gap-10 xl:items-center';

  // Animation variants for text column (appears first)
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: t.duration.slow,
        delay: t.entrance.text,
        ease: 'easeOut' as const,
      },
    },
  };

  // Animation variants for panel column (appears after text)
  const panelVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: t.duration.slow,
        delay: t.entrance.panel,
        ease: 'easeOut' as const,
      },
    },
  };

  // When animations are disabled, render static
  if (!animateEntrance) {
    return (
      <div className={gridClass}>
        <div className={textStackClass}>
          {title && <h3 className={titleClass}>{title}</h3>}
          {description && <p className={descriptionClass}>{description}</p>}
          {actions}
        </div>
        <div className="w-full">
          <VignetteEntranceProvider delay={0}>
            {children}
          </VignetteEntranceProvider>
        </div>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {/* Text column - animates first */}
      <motion.div
        className={textStackClass}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={textVariants}
      >
        {title && <h3 className={titleClass}>{title}</h3>}
        {description && <p className={descriptionClass}>{description}</p>}
        {actions}
      </motion.div>

      {/* Panel column - animates after text */}
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={panelVariants}
      >
        <VignetteEntranceProvider>
          {children}
        </VignetteEntranceProvider>
      </motion.div>
    </div>
  );
}
