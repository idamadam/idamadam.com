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
        gap: 16,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 155,
            borderRadius: 12,
            padding: 14,
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              height: 14,
              width: 60,
              margin: "0 auto",
              borderRadius: 4,
              backgroundColor: skeletonColor,
            }}
          />
          <div
            style={{
              height: 20,
              width: 48,
              margin: "0 auto",
              borderRadius: 4,
              backgroundColor: skeletonColor,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div
              style={{
                height: 8,
                width: "100%",
                borderRadius: 4,
                backgroundColor: skeletonLightColor,
              }}
            />
            <div
              style={{
                height: 8,
                width: "75%",
                margin: "0 auto",
                borderRadius: 4,
                backgroundColor: skeletonLightColor,
              }}
            />
          </div>
          <div
            style={{
              height: 18,
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
