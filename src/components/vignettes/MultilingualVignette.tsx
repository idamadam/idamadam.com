'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VignetteContainer from './VignetteContainer';
import Button from '../demos/Button';
import RichTextEditor from '../demos/RichTextEditor';
import { multilingualContent } from '@/lib/vignette-data';

type TranslationState = 'idle' | 'translating' | 'complete';

export default function MultilingualVignette() {
  const [translationState, setTranslationState] = useState<TranslationState>('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (translationState === 'complete') {
      const timer = setTimeout(() => {
        setTranslationState('idle');
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [translationState]);

  const handleTranslate = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTranslationState('translating');

    setTimeout(() => {
      setTranslationState('complete');
      setIsAnimating(false);
    }, 1500);
  };

  const handleReset = () => {
    if (translationState === 'complete') {
      setTranslationState('idle');
    }
  };

  return (
    <VignetteContainer
      id="multilingual"
      title={multilingualContent.title}
      backgroundColor="#ffffff"
    >
      <div className="w-full max-w-2xl space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            }
          >
            Import XLSX
          </Button>
          <Button
            onClick={handleTranslate}
            variant="primary"
            loading={translationState === 'translating'}
            disabled={isAnimating}
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
          >
            Translate
          </Button>
        </div>

        {/* English Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RichTextEditor
            content={multilingualContent.englishText}
            placeholder="Enter text to translate..."
          />
        </motion.div>

        {/* Spanish Editor */}
        <AnimatePresence mode="wait">
          {translationState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RichTextEditor
                content=""
                placeholder="Translation will appear here..."
              />
            </motion.div>
          )}

          {translationState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleReset}
              className="cursor-pointer"
              title="Click to reset"
            >
              <RichTextEditor
                content={multilingualContent.spanishText}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Translation Status */}
        <AnimatePresence>
          {translationState === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-800">
                Successfully translated to Spanish
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </VignetteContainer>
  );
}
