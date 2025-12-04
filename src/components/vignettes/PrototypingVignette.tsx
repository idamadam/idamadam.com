'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import { prototypingContent } from '@/lib/vignette-data';
import { scaleOnHover } from '@/lib/animations';

export default function PrototypingVignette() {
  return (
    <VignetteContainer
      id="prototyping"
      title={prototypingContent.title}
      backgroundColor="#fafafa"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white border border-black rounded-lg p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1a1d23]">
              {prototypingContent.sandboxTitle}
            </h3>
            <div className="w-16 h-16 bg-[#d9d9d9] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* Prototype Grid */}
          <div className="grid grid-cols-3 gap-4">
            {prototypingContent.prototypes.map((prototype, index) => (
              <motion.div
                key={prototype.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                {...scaleOnHover}
                className="bg-[#d9d9d9] rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:bg-[#c9c9c9] transition-colors"
                title={prototype.name}
              >
                <div className="text-center p-2">
                  <svg className="w-8 h-8 mx-auto mb-1 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <p className="text-xs text-gray-600 font-medium">{prototype.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VignetteContainer>
  );
}
