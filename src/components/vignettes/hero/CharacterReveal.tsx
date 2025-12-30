'use client';

import { useReducedMotion } from '@/lib/useReducedMotion';

interface CharacterRevealProps {
  text: string;
  baseDelay?: number;
  charDelay?: number;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
  isActive?: boolean;
}

export default function CharacterReveal({
  text,
  baseDelay = 0,
  charDelay = 0.04,
  className = '',
  as: Tag = 'span',
  isActive = true,
}: CharacterRevealProps) {
  const reducedMotion = useReducedMotion();

  // Split text into characters, preserving spaces
  const characters = text.split('');

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={isActive ? 'intro-char' : 'intro-char-hidden'}
          style={{
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            animationDelay: isActive ? `${baseDelay + index * charDelay}s` : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}

export function calculateTextDuration(text: string, charDelay: number = 0.04): number {
  return text.length * charDelay;
}
