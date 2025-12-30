'use client';

import { heroContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function HeroContent() {
  const reducedMotion = useReducedMotion();

  // Split name into characters, preserving spaces
  const characters = heroContent.name.split('');

  return (
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
  );
}
