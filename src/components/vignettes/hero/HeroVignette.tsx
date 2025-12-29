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
      className="w-full px-6 lg:px-12"
      initial={false}
      animate={{
        paddingTop: isSplash ? '40vh' : '8rem',
        paddingBottom: isSplash ? '40vh' : '6rem',
      }}
      transition={{
        duration: t.splash.transition,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      <div className="max-w-5xl w-full mx-auto">
        <article id="hero">
          <HeroContent />
        </article>
      </div>
    </motion.section>
  );
}
