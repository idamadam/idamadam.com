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
