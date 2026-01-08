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
    <div className="flex items-center gap-[60px]">
      {/* Photo with layered shadow effect */}
      <motion.div
        className="relative shrink-0 w-[109px] h-[109px] cursor-pointer"
        whileTap={{ scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15,
        }}
      >
        {/* Shadow layer */}
        <div className="absolute top-[3px] left-[3px] w-24 h-24 bg-[#1e293b] rounded-[2px]" />
        {/* Photo layer */}
        <div className="absolute top-[13px] left-[13px] w-24 h-24 rounded-[2px] overflow-hidden">
          <Image
            src="/avatars/headshot.jpg"
            alt={heroContent.name}
            width={96}
            height={96}
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
