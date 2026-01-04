'use client';

import { motion } from 'framer-motion';
import { timing, timingReduced } from '@/lib/animations';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;

  return (
    <footer className="w-full py-16 lg:py-20 px-6 lg:px-12 2xl:px-24">
      <div className="max-w-[1280px] mx-auto border-t border-border pt-10 lg:pt-12">
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: t.duration.slow,
            delay: t.entrance.text,
            ease: 'easeOut',
          }}
        >
          <p className="type-h2">Want to chat?</p>
          <a
            href="https://www.linkedin.com/in/idamadam/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-interactive btn-primary text-lg px-6 py-3 gap-3"
          >
            Connect on
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-auto"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
