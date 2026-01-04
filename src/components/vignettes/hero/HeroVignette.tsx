'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import IntroPanel from './IntroPanel';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';

export default function HeroVignette() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const [isSplash, setIsSplash] = useState(!reducedMotion);
  const { setSplashComplete, setStage } = useIntroSequence();

  // Transition from splash to normal layout
  useEffect(() => {
    if (reducedMotion) {
      setSplashComplete();
      setStage('complete');
      return;
    }

    // End splash state
    const splashTimer = setTimeout(() => {
      setIsSplash(false);
    }, t.splash.duration * 1000);

    // Signal splash complete (position transition done)
    const transitionTimer = setTimeout(() => {
      setSplashComplete();
    }, (t.splash.duration + t.splash.transition) * 1000);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(transitionTimer);
    };
  }, [reducedMotion, t, setSplashComplete, setStage]);

  return (
    <motion.section
      className="w-full px-6 lg:px-12 2xl:px-24 pt-32 pb-12 lg:pt-32 lg:pb-12"
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
        className="max-w-[1280px] w-full mx-auto"
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
        <article id="hero" className="space-y-8">
          <HeroContent />
          <IntroPanel />
        </article>
      </motion.div>
    </motion.section>
  );
}
