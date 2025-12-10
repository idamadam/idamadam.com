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

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 }
};

export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 }
};

export const textReveal = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const }
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

export const interactiveHover = {
  whileHover: {
    scale: 1.01,
    borderColor: '#9ca3af',
    transition: { duration: 0.2 }
  },
  transition: { duration: 0.2 }
};

// Stage transition animations for vignettes
export const stageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

export const problemToSolution = {
  // For scattered cards coalescing into solution
  scattered: {
    initial: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  },
  solution: {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  }
};

export const cardScatter = {
  // Animation variants for scattered problem state cards
  container: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  item: (custom: { x: number; y: number; rotate: number }) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      x: custom.x,
      y: custom.y,
      rotate: custom.rotate,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.3 }
    }
  })
};

export const iterationCard = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

export const iterationsStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};
