import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          IA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
