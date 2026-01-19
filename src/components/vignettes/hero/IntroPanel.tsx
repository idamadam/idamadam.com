'use client';

import { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { introContent, IntroLink } from './content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIntroSequence } from '@/lib/intro-sequence-context';
import { timing, timingReduced } from '@/lib/animations';

// Parse paragraph and render with inline links
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
