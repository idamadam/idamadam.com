'use client';

import { motion } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import { homeConnectContent } from '@/lib/vignette-data';

export default function HomeConnectVignette() {
  return (
    <VignetteContainer
      id="home-connect"
      title={homeConnectContent.title}
      backgroundColor="#fafafa"
    >
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden shadow-lg">
          {/* Placeholder for actual screenshot */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
            {/* Mock Homepage Interface */}
            <div className="w-full h-full p-8 space-y-4">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-purple-600 h-16 rounded-lg flex items-center px-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-full" />
                  <div className="flex gap-6">
                    <div className="w-16 h-4 bg-purple-400 rounded" />
                    <div className="w-16 h-4 bg-purple-400 rounded" />
                    <div className="w-16 h-4 bg-purple-400 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 p-4 col-span-2"
                >
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                    <div className="w-3/4 h-2 bg-gray-100 rounded" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  <div className="space-y-2">
                    <div className="w-16 h-4 bg-gray-200 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-200 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 p-4 col-span-2"
                >
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-gray-200 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {homeConnectContent.description}
            </p>
          </div>
        </div>
      </motion.div>
    </VignetteContainer>
  );
}
