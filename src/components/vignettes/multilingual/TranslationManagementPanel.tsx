'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import NumberedMarker from '../ai-highlights/NumberedMarker';
import { multilingualContent } from '@/components/vignettes/multilingual/content';

interface TranslationManagementPanelProps {
  className?: string;
  initialComplete?: boolean;
  highlightedSection?: number | null;
  onMarkerClick?: (number: number) => void;
  onMarkerHover?: (number: number | null) => void;
  hideMarkers?: boolean;
}

type TranslationState = 'idle' | 'translating' | 'complete';

export default function TranslationManagementPanel({
  className = '',
  initialComplete = false,
  highlightedSection = null,
  onMarkerClick,
  onMarkerHover,
  hideMarkers = false,
}: TranslationManagementPanelProps) {
  const content = multilingualContent;
  const [translationState, setTranslationState] = useState<TranslationState>(
    initialComplete ? 'complete' : 'idle'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get highlight style for a section
  const getSectionHighlightStyle = (sectionNumber: number) => {
    if (highlightedSection === sectionNumber) {
      return {
        backgroundColor: 'rgba(240, 217, 200, 0.3)',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease-in-out',
      };
    }
    return {
      transition: 'background-color 0.3s ease-in-out',
    };
  };

  // Don't auto-reset when initialComplete is true
  useEffect(() => {
    if (translationState === 'complete' && !initialComplete) {
      const timer = setTimeout(() => {
        setTranslationState('idle');
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [translationState, initialComplete]);

  const handleTranslate = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTranslationState('translating');

    setTimeout(() => {
      setTranslationState('complete');
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Language & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-12">
        {/* Language Dropdown */}
        <div
          className="flex flex-col gap-1.5 w-full sm:w-auto relative"
          data-section-id="language-dropdown"
          style={getSectionHighlightStyle(1)}
        >
          {/* Marker 1 - Unified dropdown - desktop: left side, mobile: left edge */}
          <AnimatePresence>
            {!hideMarkers && (
              <>
                <motion.div
                  key="marker-1-desktop"
                  className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => onMarkerHover?.(1)}
                  onMouseLeave={() => onMarkerHover?.(null)}
                >
                  <NumberedMarker
                    number={1}
                    onClick={() => onMarkerClick?.(1)}
                    isActive={highlightedSection === 1}
                  />
                </motion.div>
                <motion.div
                  key="marker-1-mobile"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NumberedMarker
                    number={1}
                    onClick={() => onMarkerClick?.(1)}
                    isActive={highlightedSection === 1}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <label className="text-body-sm font-semibold text-primary">
            Translated language
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-background-elevated border border-border rounded-[6px] h-9 px-sm py-xs flex items-center justify-between gap-2 hover:border-accent transition-colors"
          >
            <span className="text-body-sm text-primary whitespace-nowrap">
              {content.languages[selectedLanguage].name}
            </span>
            <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1 bg-background-elevated border border-border rounded-[6px] shadow-lg z-10 min-w-full"
              >
                {content.languages.map((lang, index) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(index);
                      setIsDropdownOpen(false);
                      if (!initialComplete) {
                        setTranslationState('idle');
                      }
                    }}
                    className={`w-full px-sm py-sm text-left text-body-sm text-primary hover:bg-black/5 transition-colors whitespace-nowrap ${
                      index === selectedLanguage ? 'bg-black/5 font-semibold' : ''
                    } ${index === 0 ? 'rounded-t-[4px]' : ''} ${index === content.languages.length - 1 ? 'rounded-b-[4px]' : ''}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div
          className="relative"
          data-section-id="auto-translate-btn"
          style={getSectionHighlightStyle(2)}
        >
          {/* Marker 2 - Auto translate button - desktop: right side, mobile: right edge */}
          <AnimatePresence>
            {!hideMarkers && (
              <>
                <motion.div
                  key="marker-2-desktop"
                  className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  onMouseEnter={() => onMarkerHover?.(2)}
                  onMouseLeave={() => onMarkerHover?.(null)}
                >
                  <NumberedMarker
                    number={2}
                    onClick={() => onMarkerClick?.(2)}
                    isActive={highlightedSection === 2}
                  />
                </motion.div>
                <motion.div
                  key="marker-2-mobile"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <NumberedMarker
                    number={2}
                    onClick={() => onMarkerClick?.(2)}
                    isActive={highlightedSection === 2}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <button
            onClick={handleTranslate}
            disabled={isAnimating}
            className="bg-[#0168b3] hover:bg-[#015a99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-body-sm h-9 px-md py-sm rounded-[6px] flex items-center gap-1.5 transition-colors"
          >
            {translationState === 'translating' ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.554-.6 19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
              </svg>
            )}
            Auto translate
          </button>
        </div>
        <div
          className="relative"
          data-section-id="xlsx-import-btn"
          style={getSectionHighlightStyle(3)}
        >
          {/* Marker 3 - XLSX import - desktop: right side, mobile: right edge */}
          <AnimatePresence>
            {!hideMarkers && (
              <>
                <motion.div
                  key="marker-3-desktop"
                  className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  onMouseEnter={() => onMarkerHover?.(3)}
                  onMouseLeave={() => onMarkerHover?.(null)}
                >
                  <NumberedMarker
                    number={3}
                    onClick={() => onMarkerClick?.(3)}
                    isActive={highlightedSection === 3}
                  />
                </motion.div>
                <motion.div
                  key="marker-3-mobile"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 xl:hidden z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <NumberedMarker
                    number={3}
                    onClick={() => onMarkerClick?.(3)}
                    isActive={highlightedSection === 3}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <button className="text-[#0168b3] hover:bg-black/5 font-medium text-body-sm h-9 px-sm py-sm rounded-[6px] flex items-center gap-1.5 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Import XLSX
          </button>
        </div>
      </div>

      {/* Translation Fields */}
      <div className="space-y-6">
        {content.translationFields.map((field) => (
          <div key={field.id} className="space-y-3">
            <label className="text-sm font-semibold text-primary">
              {field.label}
            </label>

            {/* Translated Content with Shimmer Effect */}
            <motion.div
              animate={
                translationState === 'translating'
                  ? {
                      opacity: [1, 0.6, 1],
                    }
                  : { opacity: 1 }
              }
              transition={
                translationState === 'translating'
                  ? {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  : { duration: 0.5, ease: "easeOut" }
              }
            >
              <RichTextEditor
                content={
                  translationState === 'idle'
                    ? ''
                    : content.languages[selectedLanguage].text
                }
                placeholder="Translation will appear here..."
              />
            </motion.div>

            {/* Source Text Tag */}
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full text-xs text-primary">
                English (English US)
              </span>
              <p className="text-sm text-secondary">
                {field.sourceText}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
