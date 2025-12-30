/**
 * Centralized animation configurations for Framer Motion
 * Used across all vignettes for consistent feel
 */

/**
 * Semantic timing system for "read then explore" animation sequencing
 * All values are in seconds
 */
export const timing = {
  entrance: {
    text: 0,        // Text column starts immediately
    panel: 0.4,     // Panel waits 400ms for text to settle
    cards: 0.5,     // Cards wait 500ms (after panel wrapper)
    afterHero: 2.8, // Elements below hero wait for splash + transition
  },
  duration: {
    fast: 0.25,     // Standard transitions
    medium: 0.4,    // Card reveals
    slow: 0.6,      // Major reveals (fadeInUp)
  },
  stagger: {
    tight: 0.08,    // Fast card sequences
    normal: 0.1,    // Standard stagger
  },
  stage: {
    textDuration: 0.2,    // How long text swap takes
    panelDelay: 0.2,      // Panel waits after text starts swapping
    panelDuration: 0.25,  // Panel transition duration
  },
  splash: {
    duration: 1.8,        // How long centered splash state lasts (pause after text)
    transition: 0.8,      // Position animation duration
  },
  intro: {
    nameReveal: 0.8,      // Matches CSS character animation total
    stageDelay: 0.4,      // Gap between staged content reveals
    stageDuration: 0.5,   // Each element's fade-in duration
  },
} as const;

/**
 * Reduced motion timing - respects prefers-reduced-motion
 */
export const timingReduced = {
  entrance: { text: 0, panel: 0, cards: 0, afterHero: 0 },
  duration: { fast: 0.1, medium: 0.15, slow: 0.2 },
  stagger: { tight: 0, normal: 0 },
  stage: { textDuration: 0.1, panelDelay: 0, panelDuration: 0.15 },
  splash: { duration: 0, transition: 0 },
  intro: { nameReveal: 0, stageDelay: 0.1, stageDuration: 0.15 },
} as const;

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

