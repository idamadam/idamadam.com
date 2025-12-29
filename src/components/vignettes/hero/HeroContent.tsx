'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroContent } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { timing, timingReduced } from '@/lib/animations';

export default function HeroContent() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  // Split name into characters, preserving spaces
  const characters = heroContent.name.split('');

  // Calculate when credentials should appear (after name finishes)
  const nameAnimationEnd = characters.length * t.stagger.tight + t.duration.medium;

  return (
    <div className="space-y-6">
      {/* Name with staggered character reveal */}
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

      {/* Single row: Role + Previous + LinkedIn */}
      <motion.p
        className="flex items-center gap-3 flex-wrap text-secondary"
        style={{ willChange: 'transform, opacity' }}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: t.duration.medium,
          delay: nameAnimationEnd,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
      >
        {/* Current role */}
        <span className="flex items-center gap-2">
          <span>Lead Product Designer at</span>
          <a
            href={heroContent.companies[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
            title={heroContent.companies[0].name}
          >
            <Image
              src={heroContent.companies[0].logo}
              alt={heroContent.companies[0].name}
              width={100}
              height={28}
              className="h-5 w-auto"
            />
          </a>
        </span>

        <span className="text-tertiary">·</span>

        {/* Previously */}
        <span className="flex items-center gap-2">
          <span className="text-tertiary">Previously</span>
          {heroContent.companies.slice(1).map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/logo relative opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              title={company.name}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={80}
                height={24}
                className={`h-4 w-auto ${company.hoverColor ? 'group-hover/logo:opacity-0' : ''}`}
              />
              {company.hoverColor && (
                <span
                  className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200"
                  style={{
                    backgroundColor: company.hoverColor,
                    maskImage: `url(${company.logo})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${company.logo})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
              )}
            </a>
          ))}
        </span>

        <span className="text-tertiary">·</span>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/idamadam/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-tertiary hover-linkedin transition-colors duration-200"
          aria-label="Connect on LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </a>
      </motion.p>
    </div>
  );
}
