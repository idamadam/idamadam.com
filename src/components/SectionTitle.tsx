'use client';

import { motion } from 'framer-motion';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface SectionTitleProps {
  children: string;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  return (
    <section className="w-full pb-10 lg:pb-12 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto border-t border-border pt-10 lg:pt-12">
        <motion.h2
          className="type-h2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: t.duration.slow,
            delay: t.entrance.text,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.h2>
      </div>
    </section>
  );
}
