/**
 * Centralized animation configurations for Framer Motion
 * Used across all vignettes for consistent feel
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export const subtlePulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: 2,
      ease: "easeInOut" as const
    }
  }
};

/**
 * Standardized button animation values
 * Use with Framer Motion for consistent interactive feel
 */
export const buttonAnimations = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { opacity: { duration: 0.3 }, y: { duration: 0.3 } },
};

