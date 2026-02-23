import React from "react";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

interface ChatPanelProps {
  children: React.ReactNode;
  showExplorerButton?: boolean;
  explorerActive?: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  children,
  showExplorerButton = false,
  explorerActive = false,
}) => {
  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${colors.border}`,
        backgroundColor: colors.card,
        fontFamily: interFamily,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* VibeUI icon */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: colors.black,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.text,
            }}
          >
            VibeUI
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {showExplorerButton && (
            <div
              style={{
                padding: 4,
                borderRadius: 4,
                backgroundColor: explorerActive ? colors.bg : "transparent",
                color: explorerActive ? colors.text : colors.text2,
              }}
            >
              {/* SlidersHorizontal icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" x2="14" y1="4" y2="4" />
                <line x1="10" x2="3" y1="4" y2="4" />
                <line x1="21" x2="12" y1="12" y2="12" />
                <line x1="8" x2="3" y1="12" y2="12" />
                <line x1="21" x2="16" y1="20" y2="20" />
                <line x1="12" x2="3" y1="20" y2="20" />
                <line x1="14" x2="14" y1="2" y2="6" />
                <line x1="8" x2="8" y1="10" y2="14" />
                <line x1="16" x2="16" y1="18" y2="22" />
              </svg>
            </div>
          )}
          {/* Plus icon */}
          <div style={{ padding: 4, color: colors.text2 }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "12px 16px",
        }}
      >
        {children}
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 10px",
            borderRadius: 8,
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              backgroundColor: colors.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Send icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
