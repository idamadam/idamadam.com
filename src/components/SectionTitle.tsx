'use client';

import { motion } from 'framer-motion';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface SectionTitleProps {
  children: string;
  disableScrollTrigger?: boolean;
}

export default function SectionTitle({ children, disableScrollTrigger = false }: SectionTitleProps) {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  const scrollTriggeredProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' as const },
  };

  const staticProps = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
  };

  const motionProps = disableScrollTrigger ? staticProps : scrollTriggeredProps;

  return (
    <section className="w-full pb-8 lg:pb-10 px-5 lg:px-10 2xl:px-16">
      <div className="max-w-[1400px] mx-auto border-t border-border/60 pt-10 lg:pt-14">
        <motion.h2
          className="text-[2rem] font-medium tracking-tight text-primary"
          {...motionProps}
          transition={{
            duration: t.duration.slow,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.h2>
      </div>
    </section>
  );
}
