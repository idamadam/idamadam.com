import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { BrowserDemoScene } from "./scenes/BrowserDemoScene";
import { OutroScene } from "./scenes/OutroScene";
import {
  INTRO_DURATION,
  BROWSER_DEMO_DURATION,
  OUTRO_DURATION,
  TRANSITION_FRAMES,
} from "./lib/constants";

/*
  Scene layout with fade transitions:

  Intro:       0 -> 90
  Transition:  75 -> 90  (fade)
  BrowserDemo: 75 -> 735
  Transition:  720 -> 735 (fade)
  Outro:       720 -> 840
*/

const SCENE_2_START = INTRO_DURATION - TRANSITION_FRAMES; // 75
const SCENE_3_START =
  SCENE_2_START + BROWSER_DEMO_DURATION - TRANSITION_FRAMES; // 720

function FadeTransition({
  children,
  startFrame,
  endFrame,
  direction,
}: {
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  direction: "in" | "out";
}) {
  const frame = useCurrentFrame();
  const opacity =
    direction === "in"
      ? interpolate(frame, [startFrame, endFrame], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [startFrame, endFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa" }}>
      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <FadeTransition
          startFrame={INTRO_DURATION - TRANSITION_FRAMES}
          endFrame={INTRO_DURATION}
          direction="out"
        >
          <IntroScene />
        </FadeTransition>
      </Sequence>

      {/* Scene 2: Browser Demo */}
      <Sequence
        from={SCENE_2_START}
        durationInFrames={BROWSER_DEMO_DURATION}
      >
        <BrowserDemoWithFade />
      </Sequence>

      {/* Scene 3: Outro */}
      <Sequence
        from={SCENE_3_START}
        durationInFrames={OUTRO_DURATION}
      >
        <FadeTransition
          startFrame={0}
          endFrame={TRANSITION_FRAMES}
          direction="in"
        >
          <OutroScene />
        </FadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};

// Browser demo: fade in at start, fade out at end
function BrowserDemoWithFade() {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [
      BROWSER_DEMO_DURATION - TRANSITION_FRAMES,
      BROWSER_DEMO_DURATION,
    ],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BrowserDemoScene />
    </AbsoluteFill>
  );
}
