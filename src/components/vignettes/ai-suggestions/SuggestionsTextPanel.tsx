import { useCallback } from 'react';
import {
  aiSuggestionsContent,
  colorPresets,
  speedPresets,
  glowPresets,
} from './content';
import type { BorderSettings } from './content';
import DecisionStories, {
  DecisionStory,
} from '../shared/DecisionStories';

function ProjectName() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="size-1.5 rounded-full bg-neutral-400" />
      <span className="text-[13px] font-medium tracking-tight text-primary font-[family-name:var(--font-inter)]">
        {aiSuggestionsContent.projectName}
      </span>
    </div>
  );
}

interface SuggestionsTextPanelProps {
  onActiveStoryChange?: (story: DecisionStory | null) => void;
  borderSettings: BorderSettings;
  onBorderSettingsChange: (settings: BorderSettings) => void;
  showBeforeState: boolean;
  onBeforeAfterToggle: (before: boolean) => void;
}

export default function SuggestionsTextPanel({
  onActiveStoryChange,
  borderSettings,
  onBorderSettingsChange,
  showBeforeState,
  onBeforeAfterToggle,
}: SuggestionsTextPanelProps) {
  const renderStoryExtra = useCallback(
    (story: DecisionStory) => {
      if (story.id !== 'designing-feel-of-ai') return null;

      return (
        <div className="hidden lg:flex flex-col gap-2.5 -mt-1 pb-4">
          {/* Colours */}
          <div className="flex items-center gap-2">
            <span className="text-caption text-primary/70 w-14 shrink-0">
              Colours
            </span>
            <div className="inline-flex rounded-full bg-black/5 p-0.5">
              {colorPresets.map((preset) => {
                const isActive =
                  borderSettings.colors[0] === preset.colors[0] &&
                  borderSettings.colors[1] === preset.colors[1] &&
                  borderSettings.colors[2] === preset.colors[2];
                return (
                  <button
                    key={preset.name}
                    onClick={() =>
                      onBorderSettingsChange({
                        ...borderSettings,
                        colors: preset.colors,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-2">
            <span className="text-caption text-primary/70 w-14 shrink-0">
              Speed
            </span>
            <div className="inline-flex rounded-full bg-black/5 p-0.5">
              {speedPresets.map((preset) => {
                const isActive = borderSettings.speed === preset.value;
                return (
                  <button
                    key={preset.name}
                    onClick={() =>
                      onBorderSettingsChange({
                        ...borderSettings,
                        speed: preset.value,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glow */}
          <div className="flex items-center gap-2">
            <span className="text-caption text-primary/70 w-14 shrink-0">
              Glow
            </span>
            <div className="inline-flex rounded-full bg-black/5 p-0.5">
              {glowPresets.map((preset) => {
                const isActive = borderSettings.glow === preset.value;
                return (
                  <button
                    key={preset.name}
                    onClick={() =>
                      onBorderSettingsChange({
                        ...borderSettings,
                        glow: preset.value,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    },
    [borderSettings, onBorderSettingsChange, showBeforeState, onBeforeAfterToggle]
  );

  return (
    <div className="flex flex-col">
      <ProjectName />

      {/* Headline */}
      <h3 className="type-h2 text-primary">{aiSuggestionsContent.headline}</h3>

      {/* Body */}
      <p className="type-body text-primary mt-5">{aiSuggestionsContent.body}</p>

      {/* Decision stories */}
      <DecisionStories
        stories={aiSuggestionsContent.decisionStories}
        onActiveStoryChange={onActiveStoryChange}
        renderStoryExtra={renderStoryExtra}
      />
    </div>
  );
}
