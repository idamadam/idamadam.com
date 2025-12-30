'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent, introContent } from './content';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import CharacterReveal, { calculateTextDuration } from './CharacterReveal';

// Character delays for different content types
const CHAR_DELAY = {
  role: 0.025,
  bio: 0.012,
  tagline: 0.035,
};

// Gap between sections
const SECTION_GAP = 0.15;

export default function IntroPanel() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const { stage, setStage, isSplashComplete } = useIntroSequence();

  // Calculate cumulative timing for each section
  const sectionTiming = useMemo(() => {
    const roleDuration = calculateTextDuration(introContent.role, CHAR_DELAY.role);
    const taglineDuration = calculateTextDuration(introContent.tagline, CHAR_DELAY.tagline);
    const bio1Duration = calculateTextDuration(introContent.bio[0], CHAR_DELAY.bio);
    const bio2Duration = calculateTextDuration(introContent.bio[1], CHAR_DELAY.bio);

    // Tagline starts after role + company fade in
    const taglineStart = roleDuration + 0.5;
    const bioStart = taglineStart + taglineDuration + SECTION_GAP;

    return {
      role: { start: 0, duration: roleDuration },
      tagline: { start: taglineStart, duration: taglineDuration },
      bio1: { start: bioStart, duration: bio1Duration },
      bio2: { start: bioStart + bio1Duration + 0.1, duration: bio2Duration },
      total: bioStart + bio1Duration + 0.1 + bio2Duration + 0.3,
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
    <div className="bg-white rounded-[6px] border border-border/60 shadow-sm p-8 lg:p-10">
      <div className="space-y-6">
        {/* Role + Company + Tagline */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="flex items-center gap-2">
            <CharacterReveal
              text={introContent.role}
              baseDelay={sectionTiming.role.start}
              charDelay={CHAR_DELAY.role}
              className="type-h3 inline"
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
                delay: sectionTiming.role.start + sectionTiming.role.duration,
                duration: 0.3
              }}
            >
              <Image
                src={heroContent.companies[0].logo}
                alt={heroContent.companies[0].name}
                width={140}
                height={36}
                className="h-7 w-auto"
              />
            </motion.a>
          </span>
          <motion.span
            className="text-border type-h3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: sectionTiming.tagline.start - 0.1,
              duration: 0.2
            }}
          >
            ·
          </motion.span>
          <CharacterReveal
            text={introContent.tagline}
            baseDelay={sectionTiming.tagline.start}
            charDelay={CHAR_DELAY.tagline}
            className="type-h3 text-secondary/70 inline"
            isActive={shouldShow}
          />
        </div>

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
      </div>
    </div>
  );
}
