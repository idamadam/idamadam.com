'use client';

import { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { introContent, IntroLink } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced, easings } from '@/lib/animations';

// Type for animatable units (word or link)
type AnimatableUnit =
  | { type: 'word'; content: string }
  | { type: 'link'; linkKey: string; link: IntroLink };

// Parse paragraph into animatable units (words and links)
function parseIntoAnimatableUnits(
  paragraph: string,
  links: Record<string, IntroLink>
): AnimatableUnit[] {
  const units: AnimatableUnit[] = [];
  const regex = /\{\{(\w+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(paragraph)) !== null) {
    // Add words before the link
    if (match.index > lastIndex) {
      const text = paragraph.slice(lastIndex, match.index);
      const words = text.split(/\s+/).filter(Boolean);
      words.forEach((word) => {
        units.push({ type: 'word', content: word });
      });
    }

    // Add the link as a single unit
    const linkKey = match[1];
    const link = links[linkKey];
    if (link) {
      units.push({ type: 'link', linkKey, link });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining words
  if (lastIndex < paragraph.length) {
    const text = paragraph.slice(lastIndex);
    const words = text.split(/\s+/).filter(Boolean);
    words.forEach((word) => {
      units.push({ type: 'word', content: word });
    });
  }

  return units;
}

// Parse paragraph and render with inline links (for reduced motion)
function renderParagraphWithLinks(
  paragraph: string,
  links: Record<string, IntroLink>
) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\{\{(\w+)\}\}/g;
  let match;

  while ((match = regex.exec(paragraph)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(paragraph.slice(lastIndex, match.index));
    }

    // Add the link
    const linkKey = match[1];
    const link = links[linkKey];
    if (link) {
      parts.push(
        <a
          key={linkKey}
          href={link.url}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
        >
          {link.text}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < paragraph.length) {
    parts.push(paragraph.slice(lastIndex));
  }

  return parts;
}

export default function IntroPanel() {
  const reducedMotion = useReducedMotion();
  const t = reducedMotion ? timingReduced : timing;
  const { setStage, isSplashComplete } = useIntroSequence();

  // Paragraph delay: after name reveal + role fade + small gap
  const paragraphDelay = t.intro.nameReveal + t.intro.stageDelay;

  // Set complete stage after splash ends AND slide-up finishes
  useEffect(() => {
    if (reducedMotion) {
      setStage('complete');
      return;
    }

    // Wait for: splash duration + slide-up transition + small buffer
    const totalDuration = t.splash.duration + t.splash.transition + 0.2;
    const timer = setTimeout(() => {
      setStage('complete');
    }, totalDuration * 1000);

    return () => clearTimeout(timer);
  }, [reducedMotion, setStage, t]);

  // For reduced motion, use simple fade
  if (reducedMotion) {
    return (
      <motion.p
        className="text-[1.375rem] leading-[1.55] text-primary tracking-[-0.01em] max-w-[620px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: t.intro.stageDuration,
          delay: paragraphDelay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {renderParagraphWithLinks(introContent.paragraph, introContent.links)}
      </motion.p>
    );
  }

  // Parse paragraph into animatable units
  const units = parseIntoAnimatableUnits(introContent.paragraph, introContent.links);

  // Create variants with actual values baked in
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: t.intro.paragraphStagger,
        delayChildren: paragraphDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: t.intro.stageDuration,
        ease: easings.decel,
      },
    },
  };

  return (
    <motion.p
      className="text-[1.375rem] leading-[1.55] text-primary tracking-[-0.01em] max-w-[620px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {units.map((unit, index) => {
        if (unit.type === 'link') {
          return (
            <motion.a
              key={`link-${unit.linkKey}`}
              href={unit.link.url}
              target={unit.link.external ? '_blank' : undefined}
              rel={unit.link.external ? 'noopener noreferrer' : undefined}
              className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
              variants={wordVariants}
              style={{ display: 'inline-block' }}
            >
              {unit.link.text}
            </motion.a>
          );
        }

        return (
          <motion.span
            key={`word-${index}`}
            variants={wordVariants}
            style={{ display: 'inline-block' }}
          >
            {unit.content}
            {index < units.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </motion.p>
  );
}
