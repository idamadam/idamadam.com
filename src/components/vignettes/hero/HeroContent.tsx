'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent, introContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced } from '@/lib/animations';
import TextReveal from './TextReveal';

export default function HeroContent() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const { isSplashComplete } = useIntroSequence();

  // Show role+logo after name reveals (during splash, before move)
  const shouldShowRole = true;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 lg:gap-10">
      {/* Profile photo */}
      <motion.div
        className="shrink-0 w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer"
        whileTap={{ scale: 0.92 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
      >
        <Image
          src="/avatars/headshot.jpg"
          alt={heroContent.name}
          width={120}
          height={120}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* All text in single column */}
      <div className="flex flex-col gap-3">
        {/* Name with pixel font */}
        <h1 className="type-pixel whitespace-nowrap !m-0">
          <TextReveal
            text={heroContent.name}
            mode="characters"
            staggerDelay={t.intro.nameStagger}
            duration={0.4}
          />
        </h1>

        {/* Role + Company */}
        {shouldShowRole && (
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: t.intro.stageDuration,
              delay: t.intro.nameReveal,
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
