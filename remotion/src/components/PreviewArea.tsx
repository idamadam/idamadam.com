import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { PricingCardV1 } from "./PricingCardV1";
import { PricingCardV2 } from "./PricingCardV2";
import { SkeletonPreview } from "./SkeletonPreview";
import { ErrorPreview } from "./ErrorPreview";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

export type PreviewState = "empty" | "v1" | "v2" | "skeleton" | "error";

interface PreviewAreaProps {
  /** Current preview state */
  state: PreviewState;
  /** Previous state for cross-fade */
  prevState?: PreviewState;
  /** Frame at which transition started */
  transitionFrame?: number;
  /** Duration of cross-fade in frames */
  transitionDuration?: number;
  children?: React.ReactNode;
}

function PreviewContent({ state }: { state: PreviewState }) {
  switch (state) {
    case "v1":
      return <PricingCardV1 />;
    case "v2":
      return <PricingCardV2 />;
    case "skeleton":
      return <SkeletonPreview />;
    case "error":
      return <ErrorPreview />;
    case "empty":
    default:
      return <EmptyPreview />;
  }
}

function EmptyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 6,
        fontFamily: interFamily,
      }}
    >
      {/* Box icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.text2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
      <p style={{ fontSize: 13, color: colors.text2, fontFamily: interFamily }}>
        Component appears here
      </p>
    </div>
  );
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  state,
  prevState,
  transitionFrame = 0,
  transitionDuration = 12,
  children,
}) => {
  const frame = useCurrentFrame();

  // If we have a previous state, cross-fade
  if (prevState && prevState !== state) {
    const progress = interpolate(
      frame,
      [transitionFrame, transitionFrame + transitionDuration],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Outgoing */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - progress,
          }}
        >
          <PreviewContent state={prevState} />
        </div>
        {/* Incoming */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: progress,
          }}
        >
          <PreviewContent state={state} />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      <PreviewContent state={state} />
      {children}
    </div>
  );
};
