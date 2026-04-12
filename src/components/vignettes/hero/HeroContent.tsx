'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent, introContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { timing, timingReduced } from '@/lib/animations';
import TextReveal from './TextReveal';

export default function HeroContent() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      {/* Profile photo */}
      <motion.div
        className="shrink-0 w-10 h-10 rounded-full overflow-hidden cursor-pointer"
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
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* All text in single column */}
      <div className="flex flex-col gap-1">
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
        <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: t.intro.stageDuration,
              delay: t.intro.nameReveal,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <span className="text-secondary">
              {introContent.role}
            </span>
            <a
              href={heroContent.companies[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-200"
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
      </div>
    </div>
  );
}
