'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function HeroVignette() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const [isSplash, setIsSplash] = useState(!reducedMotion);

  // Transition from splash to normal layout after splash duration
  useEffect(() => {
    if (reducedMotion) return;

    const timer = setTimeout(() => {
      setIsSplash(false);
    }, t.splash.duration * 1000);

    return () => clearTimeout(timer);
  }, [reducedMotion, t.splash.duration]);

  return (
    <motion.section
      className="w-full px-6 lg:px-12 pt-32 pb-12 lg:pt-32 lg:pb-12"
      initial={false}
      animate={{
        minHeight: isSplash ? '100vh' : 'auto',
      }}
      transition={{
        duration: 0.3,
        delay: isSplash ? 0 : t.splash.transition + 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      <motion.div
        className="max-w-6xl w-full mx-auto"
        style={{ willChange: 'transform' }}
        initial={false}
        animate={{
          y: isSplash ? 'calc(50vh - 8rem)' : 0,
        }}
        transition={{
          duration: t.splash.transition,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <article id="hero">
          <HeroContent />
        </article>
      </motion.div>
    </motion.section>
  );
}
