'use client';

import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import { fadeInUp } from '@/lib/animations';

export default function HeroVignette() {
  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <VignetteContainer id="hero">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <HeroContent />
          </motion.div>
        </VignetteContainer>
      </div>
    </section>
  );
}
