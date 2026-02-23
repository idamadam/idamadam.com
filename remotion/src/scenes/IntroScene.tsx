import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { colors } from "../lib/colors";
import { interFamily, instrumentSerifFamily } from "../lib/fonts";
import { FPS, WIDTH, HEIGHT } from "../lib/constants";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Title: spring fade + slide up
  const titleProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });
  const titleOpacity = titleProgress;
  const titleY = (1 - titleProgress) * 30;

  // Subtitle: delayed spring
  const subtitleProgress = spring({
    frame: Math.max(0, frame - 10),
    fps: FPS,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });
  const subtitleOpacity = subtitleProgress;
  const subtitleY = (1 - subtitleProgress) * 20;

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontFamily: instrumentSerifFamily,
          fontSize: 108,
          fontWeight: 400,
          color: colors.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        Reach any prototype state in one click.
      </h1>
      <p
        style={{
          fontFamily: interFamily,
          fontSize: 32,
          fontWeight: 400,
          color: colors.text2,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          margin: 0,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        A prompt to make prototyping in code easier
      </p>
    </div>
  );
};
