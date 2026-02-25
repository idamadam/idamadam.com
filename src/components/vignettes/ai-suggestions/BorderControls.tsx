import { colorPresets, speedPresets, glowPresets } from './content';
import type { BorderSettings } from './content';

interface BorderControlsProps {
  borderSettings: BorderSettings;
  onBorderSettingsChange: (settings: BorderSettings) => void;
  highlighted?: boolean;
}

export default function BorderControls({
  borderSettings,
  onBorderSettingsChange,
}: BorderControlsProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto">
      <span className="text-caption text-secondary shrink-0">
        Tweak the border
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
              className={`px-2.5 py-0.5 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
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
              className={`px-2.5 py-0.5 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
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
              className={`px-2.5 py-0.5 rounded-full text-caption font-medium transition-all duration-200 cursor-pointer ${
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
  );
}
