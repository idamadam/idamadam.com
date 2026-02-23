import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";
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
  Combined scene: Agent Scan (0-180) + Panel Reveal (180-300) + Preset Cycling (300-540)

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

  Preset Cycling (300-540):
    - Cursor clicks through presets (60 frames each):
    - "Latest" (300-360): v2
    - "Generating" (360-420): skeleton
    - "Error" (420-480): error state
    - "Latest" again (480-540): v2 return
*/

// Preset button positions relative to the DemoPanel (top-left of preview area)
// Panel is at top:16 left:16, header ~58px, padding 16px, grid starts
// Each button is ~183px wide, 42px tall, 10px gap, grid is 2x2
const PANEL_LEFT = 16;
const PANEL_TOP = 16 + 58 + 16; // panel offset + header + padding
const BTN_W = 183;
const BTN_H = 42;
const BTN_GAP = 10;

// Button centers relative to the preview area left edge
// Offset by chat panel width (350) in the browser
const PREVIEW_OFFSET_X = 350;

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

// Browser frame offset within the 1080 canvas (centered, with title bar ~70px)
const BROWSER_TITLE_BAR = 70;

// Caption definitions with positional awareness
interface CaptionDef {
  enterFrame: number;
  exitFrame: number;
  text: string;
  position?: React.CSSProperties;
}

// Canvas-level caption — centered on full canvas, visible before scrim
const CANVAS_CAPTIONS: CaptionDef[] = [
  {
    enterFrame: 0,
    exitFrame: 15,
    text: "Start with an existing prototype",
    position: { top: 0, left: 0, right: 0, bottom: 0, alignItems: "center" },
  },
];

// Browser-level captions — positioned relative to browser wrapper
const BROWSER_CAPTIONS: CaptionDef[] = [
  {
    // Below the centered terminal
    enterFrame: 60,
    exitFrame: 170,
    text: "Agent scans your prototype and maps every state",
    position: { top: 640, left: 0, right: 0 },
  },
  {
    // Below DemoPanel, aligned with preview area
    enterFrame: 190,
    exitFrame: 290,
    text: "An in-context control panel for important states",
    position: { top: 320, left: 350, right: 0 },
  },
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
  } else if (frame < 360) {
    // Cursor clicks "Latest" -> v2
    activePreset = frame >= 320 ? "Latest" : "Previous";
    if (frame >= 320) {
      previewState = "v2";
      prevPreviewState = "v1";
      transitionFrame = 320;
    } else {
      previewState = "v1";
    }
  } else if (frame < 420) {
    // Cursor clicks "Generating" -> skeleton
    activePreset = frame >= 380 ? "Generating" : "Latest";
    if (frame >= 380) {
      previewState = "skeleton";
      prevPreviewState = "v2";
      transitionFrame = 380;
      chatStatus = "generating";
      statusChangeFrame = 380;
    } else {
      previewState = "v2";
    }
  } else if (frame < 480) {
    // Cursor clicks "Error" -> error
    activePreset = frame >= 440 ? "Error" : "Generating";
    if (frame >= 440) {
      previewState = "error";
      prevPreviewState = "skeleton";
      transitionFrame = 440;
      chatStatus = "error";
      statusChangeFrame = 440;
    } else {
      previewState = "skeleton";
      chatStatus = "generating";
      statusChangeFrame = 380;
    }
  } else {
    // Cursor clicks "Latest" again -> v2
    activePreset = frame >= 500 ? "Latest" : "Error";
    if (frame >= 500) {
      previewState = "v2";
      prevPreviewState = "error";
      transitionFrame = 500;
      chatStatus = "normal";
    } else {
      previewState = "error";
      chatStatus = "error";
      statusChangeFrame = 440;
    }
  }

  // Cursor moves for preset cycling (60 frames per preset, click at +20)
  const cursorMoves = [
    {
      startFrame: 300,
      x: presetPositions.Latest.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Latest.y - 5,
      clickFrame: 320,
    },
    {
      startFrame: 360,
      x: presetPositions.Generating.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Generating.y - 5,
      clickFrame: 380,
    },
    {
      startFrame: 420,
      x: presetPositions.Error.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Error.y - 5,
      clickFrame: 440,
    },
    {
      startFrame: 480,
      x: presetPositions.Latest.x - 5,
      y: BROWSER_TITLE_BAR + presetPositions.Latest.y - 5,
      clickFrame: 500,
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
            {/* State Explorer panel */}
            {frame >= 180 && (
              <DemoPanel enterFrame={180} activePreset={activePreset} />
            )}
          </PreviewArea>

          {/* Agent terminal — centered on full browser content */}
          {frame < 180 && (
            <AgentTerminal enterFrame={10} exitFrame={135} />
          )}

          {/* Dark scrim during agent scan to focus attention on terminal */}
          {frame < 180 && (() => {
            const scrimIn = interpolate(
              frame, [10, 25], [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const scrimOut = interpolate(
              frame, [135, 165], [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: `rgba(0,0,0,${0.4 * scrimIn * scrimOut})`,
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
            );
          })()}
        </BrowserFrame>

        {/* Animated cursor */}
        {frame >= 300 && (
          <CursorPointer moves={cursorMoves} enterFrame={300} />
        )}

        {/* Browser-level captions — positioned relative to browser wrapper */}
        {BROWSER_CAPTIONS.map(({ enterFrame: enter, exitFrame: exit, text, position }) => (
          <Caption
            key={text}
            text={text}
            enterFrame={enter}
            exitFrame={exit}
            position={position}
          />
        ))}
      </div>

      {/* Canvas-level captions */}
      {CANVAS_CAPTIONS.map(({ enterFrame: enter, exitFrame: exit, text, position }) => (
        <Caption
          key={text}
          text={text}
          enterFrame={enter}
          exitFrame={exit}
          position={position}
        />
      ))}
    </div>
  );
};
