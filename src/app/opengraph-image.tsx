import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Idam Adam - Lead Product Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Load the headshot image
  const headshotPath = join(process.cwd(), "public/avatars/headshot.jpg");
  const headshotData = await readFile(headshotPath);
  const headshotBase64 = `data:image/jpeg;base64,${headshotData.toString("base64")}`;

  // Load Inter font for the body text
  const interRegular = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff")
  ).then((res) => res.arrayBuffer());

  const interSemiBold = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff")
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {/* Headshot */}
          <div
            style={{
              display: "flex",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={headshotBase64}
              alt="Idam Adam"
              width={240}
              height={240}
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          {/* Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                fontWeight: 600,
                color: "#1a1a1a",
                lineHeight: 1.1,
                fontFamily: "Inter",
              }}
            >
              Idam Adam
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 400,
                color: "#666666",
                marginTop: "12px",
                fontFamily: "Inter",
              }}
            >
              Lead Product Designer
            </div>
          </div>
        </div>

        {/* Subtle domain at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "#999999",
            fontFamily: "Inter",
          }}
        >
          idamadam.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
