'use client';

import { useCallback } from 'react';
import type { CSSProperties } from 'react';

interface UseAnchorStyleOptions {
  focusedAnchor: string | null;
}

// Hardcoded: rgba(239, 68, 68, 0.2) = #ef4444 at 20% opacity
const BOX_SHADOW_COLOR = 'rgba(239, 68, 68, 0.2)';

export function useAnchorStyle({
  focusedAnchor,
}: UseAnchorStyleOptions) {
  const getAnchorStyle = useCallback(
    (anchorName: string): CSSProperties => ({
      anchorName: `--${anchorName}`,
      opacity: focusedAnchor && focusedAnchor !== anchorName ? 0.4 : 1,
      boxShadow: focusedAnchor === anchorName ? `0 0 0 2px ${BOX_SHADOW_COLOR}` : 'none',
      transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
    } as CSSProperties),
    [focusedAnchor]
  );

  return { getAnchorStyle };
}
