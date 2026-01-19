'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DesktopMarkerTooltipProps {
  text: string;
  number: number;
  isVisible: boolean;
  /** Position relative to the marker */
  position?: 'left' | 'right';
}

/**
 * A refined tooltip that appears on desktop when hovering numbered markers.
 * Matches the portfolio's warm terracotta aesthetic with subtle animation.
 */
export default function DesktopMarkerTooltip({
  text,
  number,
  isVisible,
  position = 'left',
}: DesktopMarkerTooltipProps) {
  const isLeft = position === 'left';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            absolute top-1/2 -translate-y-1/2 z-50
            hidden xl:block
            ${isLeft ? 'right-full mr-3' : 'left-full ml-3'}
          `}
          initial={{
            opacity: 0,
            x: isLeft ? 8 : -8,
            scale: 0.96
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            x: isLeft ? 4 : -4,
            scale: 0.98
          }}
          transition={{
            duration: 0.18,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Tooltip card */}
          <div
            className={`
              relative flex items-start gap-2.5
              px-3.5 py-3
              bg-white
              rounded-lg
              border border-black/[0.04]
              w-[240px]
            `}
            style={{
              boxShadow: `
                0 1px 2px rgba(0, 0, 0, 0.04),
                0 4px 12px rgba(0, 0, 0, 0.06),
                0 0 0 1px rgba(138, 85, 48, 0.04)
              `,
            }}
          >
            {/* Number badge - matches the marker style */}
            <div
              className="
                flex items-center justify-center flex-shrink-0
                size-5 rounded-full
                bg-transparent border border-accent-300
                text-accent-600 text-[10px] font-semibold
                mt-px
              "
            >
              {number}
            </div>

            {/* Text content */}
            <p
              className="
                text-[14px] leading-[1.5] tracking-[-0.01em]
                text-neutral-800
                m-0
              "
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              {text}
            </p>

            {/* Subtle arrow pointing to marker */}
            <div
              className={`
                absolute top-1/2 -translate-y-1/2
                ${isLeft ? '-right-[6px]' : '-left-[6px]'}
              `}
            >
              <svg
                width="6"
                height="12"
                viewBox="0 0 6 12"
                fill="none"
                className={isLeft ? '' : 'rotate-180'}
              >
                <path
                  d="M0 0L6 6L0 12V0Z"
                  fill="white"
                />
                <path
                  d="M0 0L6 6L0 12"
                  stroke="rgba(0,0,0,0.04)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
