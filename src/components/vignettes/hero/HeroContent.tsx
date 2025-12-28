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
        </span>
      }
      variant="hero"
    >
      <HeroShaderPanel />
    </VignetteSplit>
  );
}
