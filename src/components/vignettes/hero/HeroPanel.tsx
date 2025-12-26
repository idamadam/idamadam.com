'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroContent, DesignPrinciple } from './content';

interface PrincipleCardProps {
  principle: DesignPrinciple;
  isExpanded: boolean;
  onToggle: () => void;
}

function PrincipleCard({ principle, isExpanded, onToggle }: PrincipleCardProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="w-full text-left p-4 rounded-xl border border-gray-200 bg-gray-50/50
                 hover:bg-gray-100/80 transition-colors cursor-pointer"
      layout
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      aria-expanded={isExpanded}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">{principle.label}</span>
            <motion.span
              className="material-icons-outlined text-body text-secondary"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              expand_more
            </motion.span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="type-body-sm text-secondary"
              >
                {principle.detail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
}

export default function HeroPanel() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {heroContent.principles.map((principle, index) => (
        <motion.div
          key={principle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
        >
          <PrincipleCard
            principle={principle}
            isExpanded={expandedId === principle.id}
            onToggle={() => handleToggle(principle.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}
