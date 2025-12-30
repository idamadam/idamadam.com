'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { heroContent } from '@/components/vignettes/hero/content';

export default function IntroPanels() {
  return (
    <section className="w-full pb-12 lg:pb-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Panel 1: Experience */}
        <motion.div
          className="bg-white rounded-2xl border border-border/60 shadow-sm p-8 lg:p-10"
          {...fadeInUp}
        >
          <div className="space-y-6">
            <p className="type-h3">
              8+ years designing products
            </p>

            {/* Company logos + LinkedIn */}
            <div className="flex items-center gap-4">
              {heroContent.companies.map((company) => (
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
                    className={`h-5 w-auto ${company.hoverColor ? 'group-hover/logo:opacity-0' : ''}`}
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

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/idamadam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover-linkedin transition-colors duration-200"
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
            </div>
          </div>
        </motion.div>

        {/* Panel 2: Philosophy */}
        <motion.div
          className="bg-white rounded-2xl border border-border/60 shadow-sm p-8 lg:p-10"
          {...fadeInUp}
        >
          <div className="space-y-3">
            <p className="type-h3">
              Show, don&apos;t tell
            </p>
            <p className="type-body text-secondary">
              I prototype ideas to get alignment faster than decks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
