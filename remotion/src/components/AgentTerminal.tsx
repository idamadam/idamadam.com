import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";

const lines = [
  { text: "Exploring 6 components...", frame: 15, green: false },
  { text: "Found 4 state dimensions", frame: 45, green: false },
  { text: "Wiring presets and controls...", frame: 75, green: false },
  { text: "\u2713 Done", frame: 105, green: true },
];

interface AgentTerminalProps {
  /** Frame at which terminal slides in */
  enterFrame?: number;
  /** Frame at which terminal fades out */
  exitFrame?: number;
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({
  enterFrame = 10,
  exitFrame = 135,
}) => {
  const frame = useCurrentFrame();

  // Slide in
  const slideIn = interpolate(
    frame,
    [enterFrame, enterFrame + 15],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const enterOpacity = interpolate(
    frame,
    [enterFrame, enterFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Fade out
  const exitOpacity = interpolate(
    frame,
    [exitFrame, exitFrame + 30],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = enterOpacity * exitOpacity;

  if (frame < enterFrame) return null;
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 30,
        opacity,
        transform: `translateY(${slideIn}px)`,
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          backgroundColor: colors.terminal,
          borderRadius: 12,
          border: `1px solid ${colors.terminalBorder}`,
          padding: "16px 20px",
          width: 320,
        }}
      >
        {/* Title bar dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.terminalDot,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.terminalDot,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.terminalDot,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 13,
              color: colors.terminalMuted,
              fontFamily: "monospace",
            }}
          >
            state-explorer
          </span>
        </div>

        {/* Lines */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            lineHeight: 1.7,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {lines.map((line, i) => {
            if (frame < line.frame) return null;

            const lineOpacity = interpolate(
              frame,
              [line.frame, line.frame + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const lineSlide = interpolate(
              frame,
              [line.frame, line.frame + 8],
              [4, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  transform: `translateY(${lineSlide}px)`,
                  color: line.green
                    ? colors.terminalTextBright
                    : colors.terminalText,
                  fontWeight: line.green ? 600 : 400,
                }}
              >
                {line.text}
              </div>
            );
          })}
          {/* Blinking cursor - show between first line and last line */}
          {frame >= 15 && frame < 105 && (
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 15,
                backgroundColor: "#a3a3a3",
                opacity: interpolate(frame % 20, [0, 10, 20], [1, 0.3, 1]),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
