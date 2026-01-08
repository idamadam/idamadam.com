'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent, introContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import CharacterReveal, { calculateTextDuration } from './CharacterReveal';

// Character delays for different content types
const CHAR_DELAY = {
  role: 0.025,
  tagline: 0.035,
};

export default function IntroPanel() {
  const reducedMotion = useReducedMotion();
  const { setStage, isSplashComplete } = useIntroSequence();

  // Calculate cumulative timing for each section
  const sectionTiming = useMemo(() => {
    const roleDuration = calculateTextDuration(introContent.role, CHAR_DELAY.role);
    const taglineDuration = calculateTextDuration(introContent.tagline, CHAR_DELAY.tagline);

    // Tagline starts after role + company fade in
    const taglineStart = roleDuration + 0.5;

    return {
      role: { start: 0, duration: roleDuration },
      tagline: { start: taglineStart, duration: taglineDuration },
      total: taglineStart + taglineDuration + 0.3,
    };
  }, []);

  // Set complete stage after all animations finish
  useEffect(() => {
    if (!isSplashComplete || reducedMotion) {
      if (reducedMotion) setStage('complete');
      return;
    }

    const timer = setTimeout(() => {
      setStage('complete');
    }, sectionTiming.total * 1000);

    return () => clearTimeout(timer);
  }, [isSplashComplete, reducedMotion, setStage, sectionTiming.total]);

  // Always render for reduced motion, otherwise wait for splash
  const shouldShow = reducedMotion || isSplashComplete;
  if (!shouldShow) return null;

  return (
    <div className="flex flex-col justify-center shrink-0">
      {/* Role + Company */}
      <div className="flex items-center gap-2">
        <CharacterReveal
          text={introContent.role}
          baseDelay={sectionTiming.role.start}
          charDelay={CHAR_DELAY.role}
          className="type-h3 inline !m-0 !leading-[24px]"
          as="h3"
          isActive={shouldShow}
        />
        <motion.a
          href={heroContent.companies[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 transition-all duration-200"
          title={heroContent.companies[0].name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: sectionTiming.role.start + sectionTiming.role.duration,
            duration: 0.3
          }}
        >
          <Image
            src={heroContent.companies[0].logo}
            alt={heroContent.companies[0].name}
            width={103}
            height={15}
            className="h-[15px] w-auto"
          />
        </motion.a>
      </div>

      {/* Tagline */}
      <CharacterReveal
        text={introContent.tagline}
        baseDelay={sectionTiming.tagline.start}
        charDelay={CHAR_DELAY.tagline}
        className="type-h3 !m-0 !leading-[30px]"
        as="p"
        isActive={shouldShow}
      />
    </div>
  );
}
