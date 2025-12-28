'use client';

import Image from 'next/image';
import HeroShaderPanel from './HeroShaderPanel';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { heroContent } from './content';

export default function HeroContent() {
  return (
    <VignetteSplit
      title={heroContent.name}
      description={
        <span className="space-y-4 block">
          {/* Role with inline Culture Amp logo */}
          <span className="flex items-center gap-2 flex-wrap">
            <span>Lead Product Designer at</span>
            <span
              className="inline-flex opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              title={heroContent.companies[0].name}
            >
              <Image
                src={heroContent.companies[0].logo}
                alt={heroContent.companies[0].name}
                width={100}
                height={28}
                className="h-6 w-auto"
              />
            </span>
          </span>

          {/* Previously logos */}
          <span className="flex items-center gap-3">
            <span className="text-sm text-tertiary">Previously</span>
            {heroContent.companies.slice(1).map((company) => (
              <span
                key={company.name}
                className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                title={company.name}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={80}
                  height={24}
                  className="h-5 w-auto"
                />
              </span>
            ))}
          </span>

          {/* Connect link */}
          <a
            href="https://www.linkedin.com/in/idamadam/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary font-medium hover:border-gold-500 hover:text-gold-500 transition-colors duration-200"
          >
            Connect on
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-auto"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
        </span>
      }
      variant="hero"
    >
      <HeroShaderPanel />
    </VignetteSplit>
  );
}
