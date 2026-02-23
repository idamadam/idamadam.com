import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";

export const SkeletonPreview: React.FC = () => {
  const frame = useCurrentFrame();
  // Frame-driven pulse: cycles every 30 frames
  const pulseOpacity = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.4, 0.8, 0.4]
  );

  const skeletonColor = `rgba(212, 212, 212, ${pulseOpacity})`;
  const skeletonLightColor = `rgba(229, 229, 229, ${pulseOpacity})`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 190,
            borderRadius: 12,
            padding: 18,
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              height: 18,
              width: 80,
              margin: "0 auto",
              borderRadius: 4,
              backgroundColor: skeletonColor,
            }}
          />
          <div
            style={{
              height: 28,
              width: 64,
              margin: "0 auto",
              borderRadius: 4,
              backgroundColor: skeletonColor,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                height: 12,
                width: "100%",
                borderRadius: 4,
                backgroundColor: skeletonLightColor,
              }}
            />
            <div
              style={{
                height: 12,
                width: "75%",
                margin: "0 auto",
                borderRadius: 4,
                backgroundColor: skeletonLightColor,
              }}
            />
          </div>
          <div
            style={{
              height: 26,
              width: "100%",
              borderRadius: 4,
              backgroundColor: skeletonColor,
            }}
          />
        </div>
      ))}
    </div>
  );
};
