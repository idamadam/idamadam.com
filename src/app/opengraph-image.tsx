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

  // Load fonts
  const interRegular = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
    )
  ).then((res) => res.arrayBuffer());

  const interSemiBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff"
    )
  ).then((res) => res.arrayBuffer());

  const instrumentSerif = await fetch(
    new URL(
      "https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-normal.woff"
    )
  ).then((res) => res.arrayBuffer());

  const cards = [
    { number: "01", heading: "I don\u2019t stop at the user problem" },
    { number: "02", heading: "I design in the material of software" },
    { number: "03", heading: "I build trust so people challenge my thinking" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#FAFAFA",
          padding: "56px 60px",
        }}
      >
        {/* Left column — identity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "460px",
            paddingRight: "48px",
            flexShrink: 0,
          }}
        >
          {/* Headshot */}
          <div
            style={{
              display: "flex",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              marginBottom: "28px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={headshotBase64}
              alt="Idam Adam"
              width={100}
              height={100}
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "46px",
              fontFamily: "Instrument Serif",
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Idam Adam
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "20px",
              fontFamily: "Inter",
              fontWeight: 400,
              color: "#666666",
              marginTop: "10px",
            }}
          >
            Lead Product Designer
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "17px",
              fontFamily: "Inter",
              fontWeight: 400,
              color: "#888888",
              lineHeight: 1.5,
              marginTop: "20px",
            }}
          >
            Intelligent software that makes complex, high-stakes problems feel
            simple.
          </div>

          {/* URL */}
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: 400,
              color: "#999999",
              marginTop: "28px",
            }}
          >
            idamadam.com
          </div>
        </div>

        {/* Right column — approach cards */}
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.number}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                left: `${i * 24}px`,
                top: `${i * 72 + 40}px`,
                width: "540px",
                borderRadius: "16px",
                border: "1px solid rgba(107, 114, 128, 0.18)",
                padding: "24px 28px",
                backgroundImage:
                  "linear-gradient(170deg, #F4F5F7 0%, #FFFFFF 50%)",
                boxShadow:
                  "0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Number + accent line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "Inter",
                    fontWeight: 600,
                    color: "#6B7280",
                    letterSpacing: "0.05em",
                  }}
                >
                  {card.number}
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    height: "1px",
                    backgroundColor: "rgba(107, 114, 128, 0.18)",
                  }}
                />
              </div>

              {/* Heading */}
              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "Instrument Serif",
                  color: "#1a1a1a",
                  lineHeight: 1.35,
                }}
              >
                {card.heading}
              </div>
            </div>
          ))}
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
        {
          name: "Instrument Serif",
          data: instrumentSerif,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
