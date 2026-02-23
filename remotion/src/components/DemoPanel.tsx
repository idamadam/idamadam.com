import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";
import { PresetGrid } from "./PresetGrid";

interface DemoPanelProps {
  /** Frame at which panel appears */
  enterFrame: number;
  /** Currently active preset label */
  activePreset: string;
}

export const DemoPanel: React.FC<DemoPanelProps> = ({
  enterFrame,
  activePreset,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [enterFrame, enterFrame + 20],
    [0.95, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(
    frame,
    [enterFrame, enterFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const translateY = interpolate(
    frame,
    [enterFrame, enterFrame + 20],
    [-4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const gradientAngle = ((frame - enterFrame) * 4) % 360;
  const shimmerGradient = `conic-gradient(from ${gradientAngle}deg, #FFB600, #FF5C0B, #9A36B2, #FF5C0B, #FFB600)`;

  if (frame < enterFrame) return null;

  return (
    // Layer 1: Positioning + entrance animation
    <div
      style={{
        position: "absolute",
        zIndex: 50,
        top: 16,
        left: 16,
        width: 410,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transformOrigin: "top left",
        fontFamily: interFamily,
        isolation: "isolate",
      }}
    >
      {/* Glow layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: shimmerGradient,
          filter: "blur(24px)",
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      {/* Layer 2: Gradient border */}
      <div
        style={{
          borderRadius: 16,
          padding: 2,
          background: shimmerGradient,
        }}
      >
        {/* Layer 3: Inner content */}
        <div
          style={{
            borderRadius: 14,
            backgroundColor: colors.card,
            overflow: "hidden",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "17px 20px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: colors.text,
              }}
            >
              State Explorer
            </span>
            {/* X icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.text2}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>

          {/* Presets */}
          <div style={{ padding: 16 }}>
            <PresetGrid activePreset={activePreset} />
          </div>
        </div>
      </div>
    </div>
  );
};
