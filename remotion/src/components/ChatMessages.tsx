import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

interface Message {
  role: "user" | "ai";
  text: string;
  version?: number;
}

const allMessages: Message[] = [
  { role: "user", text: "Build a pricing card for our Basic plan" },
  {
    role: "ai",
    text: "Here's a clean pricing card with features and a CTA.",
    version: 1,
  },
  {
    role: "user",
    text: "Add Pro and Team tiers, mark Pro as most popular",
  },
  {
    role: "ai",
    text: "Added two more tiers! Pro is highlighted with a Popular badge.",
    version: 2,
  },
];

export type ChatStatus = "normal" | "generating" | "error";

interface ChatMessagesProps {
  messageCount: number;
  activeVersion?: number;
  /** Frame offset for stagger animation of messages appearing */
  messageAppearFrame?: number;
  /** Show generating/error status messages at the bottom of chat */
  chatStatus?: ChatStatus;
  /** Frame at which chatStatus changed (for fade-in) */
  statusChangeFrame?: number;
}

/** Shimmer text that pulses opacity using frame-driven animation */
function ShimmerText({ text, frame }: { text: string; frame: number }) {
  const shimmerOpacity = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.4, 1, 0.4]
  );
  return (
    <p
      style={{
        fontSize: 17,
        fontWeight: 500,
        color: colors.text2,
        opacity: shimmerOpacity,
        fontFamily: interFamily,
      }}
    >
      {text}
    </p>
  );
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messageCount,
  activeVersion,
  messageAppearFrame = 0,
  chatStatus = "normal",
  statusChangeFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const visible = allMessages.slice(0, messageCount);

  // Fade-in for status messages
  const statusOpacity = interpolate(
    frame,
    [statusChangeFrame, statusChangeFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {visible.map((msg, i) => {
        const staggerDelay = messageAppearFrame + i * 8;
        const opacity = interpolate(frame, [staggerDelay, staggerDelay + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isAi = msg.role === "ai";
        const isActive = isAi && msg.version === activeVersion;

        return (
          <div
            key={i}
            style={{
              opacity,
              padding: "4px 8px",
              fontFamily: interFamily,
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: isAi ? colors.text2 : colors.text,
                marginBottom: 2,
              }}
            >
              {isAi ? "VibeUI" : "You"}
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.4,
                color: colors.text,
              }}
            >
              {msg.text}
            </p>
            {isAi && msg.version && (
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 4,
                  padding: "5px 10px",
                  border: isActive
                    ? `2px solid ${colors.text}`
                    : `1px solid ${colors.border}`,
                  backgroundColor: isActive ? colors.bg : colors.card,
                }}
              >
                {/* File icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isActive ? colors.text : colors.text2}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 12h4" />
                  <path d="M10 16h4" />
                </svg>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  v{msg.version}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Generating status message */}
      {chatStatus === "generating" && (
        <div
          style={{
            padding: "4px 8px",
            fontFamily: interFamily,
            opacity: statusOpacity,
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: colors.text2,
              marginBottom: 2,
            }}
          >
            VibeUI
          </p>
          <ShimmerText text={"Generating\u2026"} frame={frame} />
        </div>
      )}

      {/* Error status messages */}
      {chatStatus === "error" && (
        <>
          <div
            style={{
              padding: "4px 8px",
              fontFamily: interFamily,
              opacity: statusOpacity,
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.text2,
                marginBottom: 2,
              }}
            >
              VibeUI
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.4,
                color: "#ef4444",
              }}
            >
              Error — attempting to fix.
            </p>
          </div>
          <div
            style={{
              padding: "4px 8px",
              fontFamily: interFamily,
              opacity: statusOpacity,
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.text2,
                marginBottom: 2,
              }}
            >
              VibeUI
            </p>
            <ShimmerText text={"Auto-fixing\u2026"} frame={frame} />
          </div>
        </>
      )}
    </div>
  );
};
