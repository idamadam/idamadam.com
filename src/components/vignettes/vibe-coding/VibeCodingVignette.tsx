'use client';

import { motion } from 'framer-motion';
import DemoCreationFlow from './DemoCreationFlow';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { vibeCodingContent } from './content';

export default function VibeCodingVignette() {
  return (
    <VignetteContainer
      id="vibe-coding"
    >
      <div className="w-full space-y-10 lg:space-y-12">
        {/* Section: Vibe Coding Demo */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <VignetteSplit
            title={vibeCodingContent.title}
            description={vibeCodingContent.description}
            actions={(
              <a
                href="https://studio.up.railway.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-body-sm transition-colors"
                style={{
                  backgroundColor: 'var(--accent-interactive-bg)',
                  color: 'var(--accent-interactive)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-interactive-bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-interactive-bg)'}
              >
                Join the waitlist
                <span className="material-icons-outlined text-base">arrow_forward</span>
              </a>
            )}
          >
            <DemoCreationFlow />
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
