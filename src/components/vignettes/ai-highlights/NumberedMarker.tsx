'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface NumberedMarkerProps {
  number: number;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  hasBeenDiscovered?: boolean;
  onDiscover?: () => void;
}

export default function NumberedMarker({
  number,
  onClick,
  isActive = false,
  className = '',
  hasBeenDiscovered = false,
  onDiscover,
}: NumberedMarkerProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Start subtle animation after delay (user has had time to scan content)
  useEffect(() => {
    if (prefersReducedMotion || hasBeenDiscovered) {
      setShouldAnimate(false);
      return;
    }
    const timer = setTimeout(() => setShouldAnimate(true), 1500);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, hasBeenDiscovered]);

  const handleClick = () => {
    setShouldAnimate(false);
    onDiscover?.();
    onClick?.();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`
        flex items-center justify-center
        size-8 rounded-full
        bg-white border border-accent-300 shadow-sm
        text-accent-600 text-[13px] font-medium
        cursor-pointer
        transition-all duration-200
        hover:bg-accent-50 hover:border-accent-400 hover:text-accent-700
        focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2
        ${isActive ? 'bg-accent-50 border-accent-400' : ''}
        ${shouldAnimate ? 'breathe-glow' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {number}
    </motion.button>
  );
}
