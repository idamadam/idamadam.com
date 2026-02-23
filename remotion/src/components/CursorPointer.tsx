import React from "react";
import { interpolate, useCurrentFrame, spring } from "remotion";
import { FPS } from "../lib/constants";

interface CursorMove {
  /** Frame to start moving */
  startFrame: number;
  /** Target X position */
  x: number;
  /** Target Y position */
  y: number;
  /** Frame to trigger click effect */
  clickFrame: number;
}

interface CursorPointerProps {
  moves: CursorMove[];
  /** Frame at which cursor first appears */
  enterFrame: number;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  moves,
  enterFrame,
}) => {
  const frame = useCurrentFrame();

  if (frame < enterFrame) return null;

  // Find the current move
  let currentX = moves[0]?.x ?? 0;
  let currentY = moves[0]?.y ?? 0;
  let isClicking = false;

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const prevX = i > 0 ? moves[i - 1].x : move.x;
    const prevY = i > 0 ? moves[i - 1].y : move.y;

    if (frame >= move.startFrame) {
      const moveProgress = spring({
        frame: frame - move.startFrame,
        fps: FPS,
        config: {
          damping: 28,
          stiffness: 120,
          mass: 0.8,
        },
      });

      currentX = interpolate(moveProgress, [0, 1], [prevX, move.x]);
      currentY = interpolate(moveProgress, [0, 1], [prevY, move.y]);

      // Click effect: small press-down at click frame
      if (
        frame >= move.clickFrame &&
        frame <= move.clickFrame + 6
      ) {
        isClicking = true;
      }
    }
  }

  const enterOpacity = interpolate(
    frame,
    [enterFrame, enterFrame + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const clickScale = isClicking ? 0.85 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        zIndex: 100,
        opacity: enterOpacity,
        transform: `scale(${clickScale})`,
        transformOrigin: "top left",
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
      }}
    >
      {/* macOS-style cursor */}
      <svg
        width="32"
        height="38"
        viewBox="0 0 24 28"
        fill="none"
      >
        <path
          d="M5.5 1L5.5 21.5L10.5 16.5L15 25L18.5 23.5L14 15L20.5 15L5.5 1Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
