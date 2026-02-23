import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";

const lines = [
  { text: "> running states prompt", frame: 5, green: false, dim: true },
  { text: "Exploring 6 components...", frame: 15, green: false, dim: false },
  { text: "Found 4 state dimensions", frame: 45, green: false, dim: false },
  { text: "Wiring presets and controls...", frame: 75, green: false, dim: false },
  { text: "\u2713 Done", frame: 105, green: true, dim: false },
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

  const gradientAngle = ((frame - enterFrame) * 4) % 360;
  const shimmerGradient = `conic-gradient(from ${gradientAngle}deg, #FFB600, #FF5C0B, #9A36B2, #FF5C0B, #FFB600)`;

  if (frame < enterFrame) return null;
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 30,
        opacity,
        transform: `translate(-50%, -50%) translateY(${slideIn}px)`,
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

      {/* Gradient border */}
      <div
        style={{
          borderRadius: 14,
          padding: 2,
          background: shimmerGradient,
        }}
      >
        <div
          style={{
            backgroundColor: colors.terminal,
            borderRadius: 12,
            padding: "28px 34px",
            width: 580,
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
        {/* Title bar dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.terminalDot,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.terminalDot,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.terminalDot,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 20,
              color: colors.terminalMuted,
              fontFamily: "monospace",
            }}
          >
            coding-agent
          </span>
        </div>

        {/* Lines */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
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
                    : line.dim
                      ? colors.terminalMuted
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
                width: 12,
                height: 25,
                backgroundColor: "#a3a3a3",
                opacity: interpolate(frame % 20, [0, 10, 20], [1, 0.3, 1]),
              }}
            />
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
