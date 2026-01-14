'use client';

import { motion } from 'framer-motion';

interface NumberedMarkerProps {
  number: number;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export default function NumberedMarker({
  number,
  onClick,
  isActive = false,
  className = '',
}: NumberedMarkerProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center
        size-6 rounded-full
        bg-[#f0d9c8] border border-[rgba(138,85,48,0.25)]
        text-[#8a5530] text-[11px] font-medium
        cursor-pointer
        transition-all duration-200
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-[#8a5530] focus:ring-offset-2
        ${isActive ? 'ring-2 ring-[#8a5530] ring-offset-2' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {number}
    </motion.button>
  );
}
