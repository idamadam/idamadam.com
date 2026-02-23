import React from "react";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

export const ErrorPreview: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 8,
        fontFamily: interFamily,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.red50,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: colors.red500,
          }}
        >
          !
        </span>
      </div>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: colors.text,
        }}
      >
        Error
      </p>
      <p
        style={{
          fontSize: 12,
          color: colors.text2,
        }}
      >
        Auto-fix in progress...
      </p>
    </div>
  );
};
