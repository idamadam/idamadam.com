import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { colors } from "../lib/colors";
import { interFamily, instrumentSerifFamily } from "../lib/fonts";
import { FPS, WIDTH, HEIGHT } from "../lib/constants";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });

  const subtitleProgress = spring({
    frame: Math.max(0, frame - 15),
    fps: FPS,
    config: { damping: 200, stiffness: 100, mass: 1 },
  });

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
        gap: 24,
      }}
    >
      <h1
        style={{
          fontFamily: instrumentSerifFamily,
          fontSize: 108,
          fontWeight: 400,
          color: colors.text,
          opacity: titleProgress,
          transform: `translateY(${(1 - titleProgress) * 30}px)`,
          margin: 0,
        }}
      >
        Get the prompt.
      </h1>
      <p
        style={{
          fontFamily: interFamily,
          fontSize: 32,
          fontWeight: 400,
          color: colors.text2,
          opacity: subtitleProgress,
          transform: `translateY(${(1 - subtitleProgress) * 20}px)`,
          margin: 0,
        }}
      >
        idamadam.com/state-explorer
      </p>
    </div>
  );
};
