'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroContent } from './vignettes/hero/content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { trackExternalLinkClicked } from '@/lib/analytics';

export default function Header() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  // Watch for when hero name scrolls out of view
  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show header when hero is NOT intersecting (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      {
        // Trigger when the top of hero leaves viewport
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 2xl:px-16 bg-background/85 backdrop-blur-xl border-b border-border/50"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.15 : 0.25,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="max-w-[1408px] mx-auto h-14 flex items-center justify-between">
            {/* Name */}
            <span className="text-[1rem] font-semibold text-primary tracking-[-0.01em]">{heroContent.name}</span>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/idamadam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-secondary hover:text-[#0A66C2] transition-colors duration-200"
              onClick={() => trackExternalLinkClicked('header-linkedin', 'https://www.linkedin.com/in/idamadam/')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-[18px] w-[18px]"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
