import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { interFamily } from "../lib/fonts";

interface CaptionProps {
  text: string;
  enterFrame: number;
  exitFrame: number;
  fadeDuration?: number;
  /** Override default positioning. Replaces the default bottom-centered placement. */
  position?: React.CSSProperties;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  enterFrame,
  exitFrame,
  fadeDuration = 10,
  position,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(
    frame,
    [enterFrame, enterFrame + fadeDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fadeOut = interpolate(
    frame,
    [exitFrame - fadeDuration, exitFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const slideUp = interpolate(
    frame,
    [enterFrame, enterFrame + fadeDuration],
    [6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = fadeIn * fadeOut;

  if (frame < enterFrame || frame > exitFrame) return null;

  const basePosition: React.CSSProperties = position
    ? { position: "absolute", display: "flex", justifyContent: "center", ...position }
    : { position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center" };

  return (
    <div
      style={{
        ...basePosition,
        opacity,
        transform: `translateY(${slideUp}px)`,
        zIndex: 200,
      }}
    >
      <span
        style={{
          fontFamily: interFamily,
          fontSize: 24,
          fontWeight: 500,
          color: "#ffffff",
          backgroundColor: "rgba(0,0,0,0.75)",
          padding: "10px 24px",
          borderRadius: 100,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};
