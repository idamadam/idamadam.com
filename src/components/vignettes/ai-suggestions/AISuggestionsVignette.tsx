'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SuggestionsPanel from './SuggestionsPanel';
import SuggestionsTextPanel from './SuggestionsTextPanel';
import VignetteContainer from '@/components/vignettes/VignetteContainer';
import VignetteSplit from '@/components/vignettes/VignetteSplit';
import { fadeInUp } from '@/lib/animations';
import { aiSuggestionsContent, defaultBorderSettings } from './content';
import type { BorderSettings } from './content';
import type { DecisionStory } from '../shared/DecisionStories';

export default function AISuggestionsVignette() {
  const [activeStory, setActiveStory] = useState<DecisionStory | null>(null);
  const [borderSettings, setBorderSettings] =
    useState<BorderSettings>(defaultBorderSettings);
  const [showBeforeState, setShowBeforeState] = useState(true);

  const handleActiveStoryChange = useCallback(
    (story: DecisionStory | null) => {
      setActiveStory(story);
      setShowBeforeState(true);
      if (!story) {
        setBorderSettings(defaultBorderSettings);
      }
    },
    []
  );

  const handleBeforeAfterToggle = useCallback((before: boolean) => {
    setShowBeforeState(before);
  }, []);

  const handleBorderSettingsChange = useCallback(
    (settings: BorderSettings) => {
      setBorderSettings(settings);
    },
    []
  );

  return (
    <VignetteContainer id="ai-suggestions" allowOverflow>
      <div className="w-full space-y-10 lg:space-y-12">
        <motion.div {...fadeInUp}>
          <VignetteSplit
            title={
              <SuggestionsTextPanel
                onActiveStoryChange={handleActiveStoryChange}
                borderSettings={borderSettings}
                onBorderSettingsChange={handleBorderSettingsChange}
                showBeforeState={showBeforeState}
                onBeforeAfterToggle={handleBeforeAfterToggle}
              />
            }
          >
            <div
              className="relative w-full max-w-[680px] mx-auto"
              style={{ overflow: 'visible' }}
            >
              <SuggestionsPanel
                content={aiSuggestionsContent}
                activeStory={activeStory}
                borderSettings={borderSettings}
                showBeforeState={showBeforeState}
              />
            </div>
          </VignetteSplit>
        </motion.div>
      </div>
    </VignetteContainer>
  );
}
