'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover } from '@/lib/animations';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  className = ''
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-base transition-all border';

  const variantStyles = {
    primary: 'bg-[#2c2c2c] text-white border-[#2c2c2c] hover:bg-[#1a1a1a]',
    secondary: 'bg-[#e3e3e3] text-[#1e1e1e] border-[#767676] hover:bg-[#d1d1d1]',
    outline: 'bg-white text-[#2c2c2c] border-[#e5e7eb] hover:border-gray-400 hover:shadow-sm'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled || loading ? disabledStyles : 'cursor-pointer'} ${className}`}
      {...buttonHover}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </motion.button>
  );
}
