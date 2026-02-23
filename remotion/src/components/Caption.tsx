import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface CaptionProps {
  text: string;
  enterFrame: number;
  exitFrame: number;
  fadeDuration?: number;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  enterFrame,
  exitFrame,
  fadeDuration = 10,
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
    [12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = fadeIn * fadeOut;

  if (frame < enterFrame || frame > exitFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 40,
          fontWeight: 400,
          color: "#666666",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};
