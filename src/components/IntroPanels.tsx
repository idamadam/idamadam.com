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
            <div className="space-y-1">
              <p className="type-h3">
                8+ years
              </p>
              <p className="type-body text-secondary">
                designing products
              </p>
            </div>

            {/* Company logos */}
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
