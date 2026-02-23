import React from "react";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

const presets = ["Latest", "Previous", "Generating", "Error"];

interface PresetGridProps {
  activePreset: string;
}

export const PresetGrid: React.FC<PresetGridProps> = ({ activePreset }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
      }}
    >
      {presets.map((label) => {
        const isActive = activePreset === label;
        return (
          <div
            key={label}
            style={{
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 18,
              fontWeight: 500,
              fontFamily: interFamily,
              textAlign: "center",
              border: isActive
                ? `2px solid ${colors.black}`
                : `1px solid ${colors.border}`,
              backgroundColor: isActive ? "#f5f5f5" : colors.card,
              boxShadow: isActive ? `0 0 0 1px ${colors.black}` : "none",
              color: colors.text,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
