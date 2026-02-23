import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { colors } from "../lib/colors";
import { FPS, WIDTH, HEIGHT } from "../lib/constants";
import { BrowserFrame } from "../components/BrowserFrame";
import { ChatPanel } from "../components/ChatPanel";
import { ChatMessages, type ChatStatus } from "../components/ChatMessages";
import { PreviewArea, type PreviewState } from "../components/PreviewArea";
import { AgentTerminal } from "../components/AgentTerminal";
import { DemoPanel } from "../components/DemoPanel";
import { CursorPointer } from "../components/CursorPointer";
import { Caption } from "../components/Caption";

/*
  Combined scene: Agent Scan (0-180) + Panel Reveal (180-300) + Preset Cycling (300-660)

  Agent Scanning (0-180):
    - Browser scales in over first ~20 frames
    - Chat fills with 4 messages, preview shows v2 (3 pricing cards)
    - Agent terminal slides in at bottom-right (frame 10)
    - Terminal lines appear: frame 15, 45, 75, 105
    - Terminal fades out: frames 135-165

  Panel Reveal (180-300):
    - State Explorer panel scales in at top-left
    - "Previous" preset auto-activates
    - Preview cross-fades to v1

  Preset Cycling (300-660):
    - Cursor clicks through presets:
    - "Latest" (300-390): v2
    - "Generating" (390-480): skeleton
    - "Error" (480-570): error state
    - "Latest" again (570-660): v2 return
*/

// Preset button positions relative to the DemoPanel (top-left of preview area)
// Panel is at top:12 left:12, header ~44px, padding 12px, grid starts
// Each button is ~147px wide, 32px tall, 6px gap, grid is 2x2
const PANEL_LEFT = 12;
const PANEL_TOP = 12 + 44 + 12; // panel offset + header + padding
const BTN_W = 147;
const BTN_H = 32;
const BTN_GAP = 6;

// Button centers relative to the preview area left edge
// Offset by chat panel width (280) in the browser
const PREVIEW_OFFSET_X = 280;

const presetPositions = {
  Latest: {
    x: PREVIEW_OFFSET_X + PANEL_LEFT + BTN_W / 2,
    y: PANEL_TOP + BTN_H / 2,
  },
  Previous: {
    x: PREVIEW_OFFSET_X + PANEL_LEFT + BTN_W + BTN_GAP + BTN_W / 2,
    y: PANEL_TOP + BTN_H / 2,
  },
  Generating: {
    x: PREVIEW_OFFSET_X + PANEL_LEFT + BTN_W / 2,
    y: PANEL_TOP + BTN_H + BTN_GAP + BTN_H / 2,
  },
  Error: {
    x: PREVIEW_OFFSET_X + PANEL_LEFT + BTN_W + BTN_GAP + BTN_W / 2,
    y: PANEL_TOP + BTN_H + BTN_GAP + BTN_H / 2,
  },
};

// Browser frame offset within the 1080 canvas (centered, with title bar ~52px)
const BROWSER_TITLE_BAR = 52;

// Caption definitions: [enterFrame, exitFrame, text]
const CAPTIONS: [number, number, string][] = [
  [10, 170, "Agent scans your prototype and maps every state"],
  [190, 290, "One-click presets for any state combination"],
  [340, 380, "Latest version"],
  [430, 470, "Mid-generation"],
  [520, 560, "Error state"],
  [610, 650, "Back to latest"],
];

export const BrowserDemoScene: React.FC = () => {
  const frame = useCurrentFrame();

  // === Browser scale-in animation (first ~20 frames) ===
  const scaleProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 30, stiffness: 100, mass: 0.8 },
  });
  const browserScale = 0.96 + scaleProgress * 0.04;
  const browserOpacity = scaleProgress;

  // === Determine current state based on frame ===

  // Message count
  const messageCount = 4; // All messages visible from start

  // Active preset & preview state
  let activePreset = "";
  let previewState: PreviewState = "v2";
  let prevPreviewState: PreviewState | undefined;
  let transitionFrame = 0;
  let chatStatus: ChatStatus = "normal";
  let statusChangeFrame = 0;

  // Show explorer button after agent is done
  const showExplorerButton = frame >= 180;
  const explorerActive = frame >= 180;

  if (frame < 180) {
    // Agent scanning phase: show v2 (3 pricing cards)
    previewState = "v2";
    activePreset = "";
  } else if (frame < 300) {
    // Panel reveal: auto-activate "Previous", cross-fade to v1
    activePreset = "Previous";
    previewState = "v1";
    prevPreviewState = "v2";
    transitionFrame = 180;
  } else if (frame < 390) {
    // Cursor clicks "Latest" -> v2
    activePreset = frame >= 330 ? "Latest" : "Previous";
    if (frame >= 330) {
      previewState = "v2";
      prevPreviewState = "v1";
      transitionFrame = 330;
    } else {
      previewState = "v1";
    }
  } else if (frame < 480) {
    // Cursor clicks "Generating" -> skeleton
    activePreset = frame >= 420 ? "Generating" : "Latest";
    if (frame >= 420) {
      previewState = "skeleton";
      prevPreviewState = "v2";
      transitionFrame = 420;
      chatStatus = "generating";
      statusChangeFrame = 420;
    } else {
      previewState = "v2";
    }
  } else if (frame < 570) {
    // Cursor clicks "Error" -> error
    activePreset = frame >= 510 ? "Error" : "Generating";
    if (frame >= 510) {
      previewState = "error";
      prevPreviewState = "skeleton";
      transitionFrame = 510;
      chatStatus = "error";
      statusChangeFrame = 510;
    } else {
      previewState = "skeleton";
      chatStatus = "generating";
      statusChangeFrame = 420;
    }
  } else {
    // Cursor clicks "Latest" again -> v2
    activePreset = frame >= 600 ? "Latest" : "Error";
    if (frame >= 600) {
      previewState = "v2";
      prevPreviewState = "error";
      transitionFrame = 600;
      chatStatus = "normal";
    } else {
      previewState = "error";
      chatStatus = "error";
      statusChangeFrame = 510;
    }
  }

  // Cursor moves for preset cycling
  const cursorMoves = [
    {
      startFrame: 300,
      x: presetPositions.Latest.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Latest.y - 5,
      clickFrame: 330,
    },
    {
      startFrame: 390,
      x: presetPositions.Generating.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Generating.y - 5,
      clickFrame: 420,
    },
    {
      startFrame: 480,
      x: presetPositions.Error.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Error.y - 5,
      clickFrame: 510,
    },
    {
      startFrame: 570,
      x: presetPositions.Latest.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Latest.y - 5,
      clickFrame: 600,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          opacity: browserOpacity,
          transform: `scale(${browserScale})`,
        }}
      >
        <BrowserFrame>
          <ChatPanel
            showExplorerButton={showExplorerButton}
            explorerActive={explorerActive}
          >
            <ChatMessages
              messageCount={messageCount}
              activeVersion={previewState === "v1" ? 1 : 2}
              chatStatus={chatStatus}
              statusChangeFrame={statusChangeFrame}
            />
          </ChatPanel>
          <PreviewArea
            state={previewState}
            prevState={prevPreviewState}
            transitionFrame={transitionFrame}
            transitionDuration={15}
          >
            {/* Agent terminal overlay */}
            {frame < 180 && (
              <AgentTerminal enterFrame={10} exitFrame={135} />
            )}

            {/* State Explorer panel */}
            {frame >= 180 && (
              <DemoPanel enterFrame={180} activePreset={activePreset} />
            )}
          </PreviewArea>
        </BrowserFrame>

        {/* Animated cursor */}
        {frame >= 300 && (
          <CursorPointer moves={cursorMoves} enterFrame={300} />
        )}
      </div>

      {/* Captions below browser frame */}
      {CAPTIONS.map(([enter, exit, text]) => (
        <Caption
          key={text}
          text={text}
          enterFrame={enter}
          exitFrame={exit}
        />
      ))}
    </div>
  );
};
