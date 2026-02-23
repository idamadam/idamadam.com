import React from "react";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

export const PricingCardV1: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontFamily: interFamily,
      }}
    >
      <div
        style={{
          width: 180,
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: colors.text2,
          }}
        >
          Basic
        </p>
        <p
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginTop: 4,
            color: colors.text,
          }}
        >
          $9
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: colors.text2,
            }}
          >
            /mo
          </span>
        </p>
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <p style={{ fontSize: 12, color: colors.text2 }}>5 projects</p>
          <p style={{ fontSize: 12, color: colors.text2 }}>1 GB storage</p>
        </div>
        <button
          style={{
            marginTop: 12,
            width: "100%",
            padding: "6px 0",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            fontFamily: interFamily,
          }}
        >
          Get started
        </button>
      </div>
    </div>
  );
};
