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
    <div className="flex items-end gap-4 lg:gap-6">
      <motion.div
        className="bg-white p-2 pb-6 lg:p-3 lg:pb-8 shadow-lg rounded-sm rotate-2 mb-1 lg:mb-3 cursor-pointer"
        whileTap={{ scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15,
        }}
      >
        <Image
          src="/avatars/headshot.jpg"
          alt={heroContent.name}
          width={120}
          height={120}
          className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-[2px]"
        />
      </motion.div>
      <h1 className="type-display">
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
