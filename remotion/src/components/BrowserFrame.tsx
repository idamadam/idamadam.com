import React from "react";
import { colors } from "../lib/colors";
import { BROWSER_WIDTH } from "../lib/constants";
import { interFamily } from "../lib/fonts";

interface BrowserFrameProps {
  children: React.ReactNode;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({ children }) => {
  return (
    <div
      style={{
        width: BROWSER_WIDTH,
        height: 680,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        fontFamily: interFamily,
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#28c840",
            }}
          />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: 16,
            marginRight: 16,
            height: 28,
            borderRadius: 6,
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: colors.text2,
              fontFamily: interFamily,
            }}
          >
            localhost:3000
          </span>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
