'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  icon?: string;
  /** Delay before entrance animation (seconds) */
  enterDelay?: number;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', icon, enterDelay, children, className = '', initial, animate, transition, ...props }, ref) => {
    const baseClass = 'btn-interactive';
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    // Hover/tap animations (secondary only - primary uses CSS)
    const hoverAnimation = variant === 'secondary' ? { x: -4 } : undefined;
    const tapAnimation = variant === 'secondary' ? { x: 0 } : undefined;

    // Entrance animation (can be overridden via props)
    const entranceInitial = initial ?? (enterDelay !== undefined ? { opacity: 0, y: 10 } : undefined);
    const entranceAnimate = animate ?? (enterDelay !== undefined ? { opacity: 1, y: 0 } : undefined);
    const entranceTransition = transition ?? (enterDelay !== undefined
      ? { delay: enterDelay, duration: 0.3 }
      : { duration: 0.2 }
    );

    return (
      <motion.button
        ref={ref}
        className={`${baseClass} ${variantClass} ${className}`}
        initial={entranceInitial}
        animate={entranceAnimate}
        transition={entranceTransition}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        {...props}
      >
        {icon && <span className="material-icons-outlined">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
