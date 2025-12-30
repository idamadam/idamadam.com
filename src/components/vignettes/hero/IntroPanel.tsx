'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { heroContent, introContent } from './content';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import CharacterReveal, { calculateTextDuration } from './CharacterReveal';

// Character delays for different content types
const CHAR_DELAY = {
  headline: 0.035,
  bio: 0.012,
  cta: 0.025,
};

// Gap between sections
const SECTION_GAP = 0.15;

export default function IntroPanel() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const { stage, setStage, isSplashComplete } = useIntroSequence();

  // Calculate cumulative timing for each section
  const sectionTiming = useMemo(() => {
    const headlineDuration = calculateTextDuration(introContent.headline, CHAR_DELAY.headline);
    const bio1Duration = calculateTextDuration(introContent.bio[0], CHAR_DELAY.bio);
    const bio2Duration = calculateTextDuration(introContent.bio[1], CHAR_DELAY.bio);
    const ctaDuration = calculateTextDuration(introContent.cta, CHAR_DELAY.cta);

    return {
      headline: { start: 0, duration: headlineDuration },
      bio1: { start: headlineDuration + SECTION_GAP, duration: bio1Duration },
      bio2: { start: headlineDuration + SECTION_GAP + bio1Duration + 0.1, duration: bio2Duration },
      company: {
        start: headlineDuration + SECTION_GAP + bio1Duration + 0.1 + bio2Duration + SECTION_GAP,
        duration: ctaDuration
      },
      total: headlineDuration + SECTION_GAP + bio1Duration + 0.1 + bio2Duration + SECTION_GAP + ctaDuration + 0.3,
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
    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-8 lg:p-10">
      <div className="space-y-6">
        {/* Headline */}
        <CharacterReveal
          text={introContent.headline}
          baseDelay={sectionTiming.headline.start}
          charDelay={CHAR_DELAY.headline}
          className="type-h3 block"
          as="p"
          isActive={shouldShow}
        />

        {/* Bio paragraphs */}
        <div className="space-y-4">
          <CharacterReveal
            text={introContent.bio[0]}
            baseDelay={sectionTiming.bio1.start}
            charDelay={CHAR_DELAY.bio}
            className="type-body text-secondary block"
            as="p"
            isActive={shouldShow}
          />
          <CharacterReveal
            text={introContent.bio[1]}
            baseDelay={sectionTiming.bio2.start}
            charDelay={CHAR_DELAY.bio}
            className="type-body text-secondary/70 block"
            as="p"
            isActive={shouldShow}
          />
        </div>

        {/* Company info - uses character reveal for text, fade for images */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-secondary pt-2">
          <span className="flex items-center gap-2">
            <CharacterReveal
              text={introContent.cta}
              baseDelay={sectionTiming.company.start}
              charDelay={CHAR_DELAY.cta}
              className="inline"
              isActive={shouldShow}
            />
            <motion.a
              href={heroContent.companies[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              title={heroContent.companies[0].name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: sectionTiming.company.start + sectionTiming.company.duration,
                duration: 0.3
              }}
            >
              <Image
                src={heroContent.companies[0].logo}
                alt={heroContent.companies[0].name}
                width={100}
                height={28}
                className="h-5 w-auto"
              />
            </motion.a>
          </span>
          <motion.span
            className="text-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: sectionTiming.company.start + sectionTiming.company.duration + 0.1,
              duration: 0.2
            }}
          >
            ·
          </motion.span>
          <motion.a
            href="https://www.linkedin.com/in/idamadam/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover-linkedin transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: sectionTiming.company.start + sectionTiming.company.duration + 0.15,
              duration: 0.3
            }}
          >
            <span>Connect on</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
