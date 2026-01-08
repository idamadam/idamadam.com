'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function HeroContent() {
  const reducedMotion = useReducedMotion();

  // Split name into characters, preserving spaces
  const characters = heroContent.name.split('');

  return (
    <div className="flex items-center gap-12 lg:gap-14">
      {/* Photo with layered shadow effect */}
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
    </div>
  );
}
