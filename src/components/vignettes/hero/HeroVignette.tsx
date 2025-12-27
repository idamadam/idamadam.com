'use client';

import { motion } from 'framer-motion';
import HeroShaderPanel from './HeroShaderPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { heroContent } from './content';

export default function HeroVignette() {
  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <VignetteContainer id="hero">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <VignetteSplit
              title={heroContent.name}
              description={`${heroContent.role}.`}
              variant="hero"
            >
              <HeroShaderPanel />
            </VignetteSplit>
          </motion.div>
        </VignetteContainer>
      </div>
    </section>
  );
}
