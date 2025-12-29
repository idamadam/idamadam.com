'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/demos/RichTextEditor';
import { subtlePulse } from '@/lib/animations';
import { multilingualContent } from '@/components/vignettes/multilingual/content';
import { SectionMarker } from '@/components/vignettes/shared/SectionMarker';

interface TranslationManagementPanelProps {
  className?: string;
  initialComplete?: boolean;
  highlightedSection?: string | null;
  onNoteOpenChange?: (noteId: string, isOpen: boolean) => void;
  notes?: Array<{ id: string; label?: string; detail: string }>;
}

type TranslationState = 'idle' | 'translating' | 'complete';

export default function TranslationManagementPanel({
  className = '',
  initialComplete = false,
  highlightedSection = null,
  onNoteOpenChange,
  notes = []
}: TranslationManagementPanelProps) {
  const content = multilingualContent;
  const [translationState, setTranslationState] = useState<TranslationState>(
    initialComplete ? 'complete' : 'idle'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0); // 0 = French, 1 = Dhivehi
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get opacity style for a section based on what's highlighted
  const getSectionStyle = (section: string) => {
    if (!highlightedSection) return {};
    return {
      opacity: highlightedSection === section ? 1 : 0.3,
      transition: 'opacity 0.2s ease-in-out',
    };
  };

  const handleNoteOpen = (noteId: string, isOpen: boolean) => {
    onNoteOpenChange?.(noteId, isOpen);
  };

  // Find notes by ID
  const getNote = (id: string) => notes.find(n => n.id === id) || { detail: '' };

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
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
        {/* Language Dropdown */}
        <div
          className="flex flex-col gap-1.5 w-full sm:w-auto relative"
          style={getSectionStyle('language-dropdown')}
          data-section-id="language-dropdown"
        >
          <SectionMarker
            index={0}
            noteId="unified-cycle"
            side="left"
            isActive={highlightedSection === 'language-dropdown'}
            onOpenChange={handleNoteOpen}
            note={getNote('unified-cycle')}
          />
          <label className="text-body-sm font-semibold text-primary">
            Translated language
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white border-2 border-[#878792] rounded-[6px] h-9 px-sm py-xs flex items-center justify-between gap-2 hover:border-[#0168b3] transition-colors"
          >
            <span className="text-body-sm text-primary whitespace-nowrap">
              {content.languages[selectedLanguage].name}
            </span>
            <svg className="w-4 h-4 text-[#2f2438] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                className="absolute top-full left-0 mt-1 bg-white border-2 border-[#878792] rounded-[6px] shadow-lg z-10 min-w-full"
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
                    className={`w-full px-sm py-sm text-left text-body-sm text-primary hover:bg-gray-50 transition-colors whitespace-nowrap ${
                      index === selectedLanguage ? 'bg-gray-100 font-semibold' : ''
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
        <div className="relative" style={getSectionStyle('auto-translate-btn')} data-section-id="auto-translate-btn">
          <SectionMarker
            index={1}
            noteId="ai-translate"
            side="right"
            isActive={highlightedSection === 'auto-translate-btn'}
            onOpenChange={handleNoteOpen}
            note={getNote('ai-translate')}
          />
          <motion.button
            onClick={handleTranslate}
            disabled={isAnimating}
            {...subtlePulse}
            className="bg-[#0168b3] hover:bg-[#015a99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-body-sm h-9 px-md py-sm rounded-[6px] flex items-center gap-1.5 transition-colors"
          >
            {translationState === 'translating' ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            )}
            Auto translate
          </motion.button>
        </div>
        <button className="text-[#0168b3] hover:bg-gray-50 font-medium text-body-sm h-9 px-sm py-sm rounded-[6px] flex items-center gap-1.5 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Import XLSX
        </button>
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
            <div
              className="flex items-start gap-2 relative"
              style={getSectionStyle('source-text')}
              data-section-id="source-text"
            >
              <SectionMarker
                index={2}
                noteId="source-reference"
                side="left"
                isActive={highlightedSection === 'source-text'}
                onOpenChange={handleNoteOpen}
                note={getNote('source-reference')}
              />
              <span className="inline-flex items-center px-3 py-1 bg-[#eaeaec] rounded-full text-xs text-primary">
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
