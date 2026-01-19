'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent, introContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';

const FADE_DURATION = 0.6;

export default function HeroContent() {
  const reducedMotion = useReducedMotion();
  const { isSplashComplete } = useIntroSequence();

  // Split name into characters, preserving spaces
  const characters = heroContent.name.split('');

  // Show role+logo after splash completes (or immediately for reduced motion)
  const shouldShowRole = reducedMotion || isSplashComplete;

  return (
    <div className="flex items-start gap-8 lg:gap-10">
      {/* Photo with layered shadow effect - aligned to top */}
      <motion.div
        className="relative shrink-0 w-[105px] h-[105px] cursor-pointer"
        whileTap={{ scale: 0.92 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
      >
        {/* Shadow layer */}
        <div className="absolute top-[3px] left-[3px] w-[92px] h-[92px] bg-neutral-800 rounded-[3px]" />
        {/* Photo layer */}
        <div className="absolute top-[12px] left-[12px] w-[92px] h-[92px] rounded-[3px] overflow-hidden">
          <Image
            src="/avatars/headshot.jpg"
            alt={heroContent.name}
            width={92}
            height={92}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* All text in single column */}
      <div className="flex flex-col gap-3">
        {/* Name with pixel font */}
        <h1 className="type-pixel whitespace-nowrap !m-0">
          <span aria-label={heroContent.name}>
            {characters.map((char, index) => (
              <span
                key={index}
                className={reducedMotion ? 'inline-block' : 'hero-char'}
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Role + Company */}
        {shouldShowRole && (
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : FADE_DURATION,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <span className="text-[1.125rem] font-medium text-primary tracking-[-0.01em]">
              {introContent.role}
            </span>
            <a
              href={heroContent.companies[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity duration-200"
              title={heroContent.companies[0].name}
            >
              <Image
                src={heroContent.companies[0].logo}
                alt={heroContent.companies[0].name}
                width={103}
                height={15}
                className="h-[14px] w-auto"
              />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
