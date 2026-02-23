import React from "react";
import { colors } from "../lib/colors";
import { interFamily } from "../lib/fonts";

const cards = [
  {
    name: "Basic",
    price: "$9",
    popular: false,
    features: ["5 projects", "1 GB"],
    cta: "Choose",
  },
  {
    name: "Pro",
    price: "$29",
    popular: true,
    features: ["Unlimited", "10 GB"],
    cta: "Get Pro",
  },
  {
    name: "Team",
    price: "$79",
    popular: false,
    features: ["Everything+", "50 GB"],
    cta: "Choose",
  },
];

export const PricingCardV2: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
        fontFamily: interFamily,
      }}
    >
      {cards.map((c) => (
        <div
          key={c.name}
          style={{
            width: 190,
            borderRadius: 12,
            padding: 18,
            textAlign: "center",
            position: "relative",
            backgroundColor: c.popular ? colors.text : colors.card,
            border: c.popular ? "none" : `1px solid ${colors.border}`,
          }}
        >
          {c.popular && (
            <span
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "2px 10px",
                borderRadius: 10,
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                backgroundColor: colors.card,
                color: colors.text,
              }}
            >
              Popular
            </span>
          )}
          <p
            style={{
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: c.popular ? "rgba(255,255,255,0.6)" : colors.text2,
            }}
          >
            {c.name}
          </p>
          <p
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginTop: 4,
              color: c.popular ? "#fff" : colors.text,
            }}
          >
            {c.price}
            <span
              style={{
                fontSize: 17,
                fontWeight: 400,
                color: c.popular ? "rgba(255,255,255,0.5)" : colors.text2,
              }}
            >
              /mo
            </span>
          </p>
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: c.popular
                ? "1px solid rgba(255,255,255,0.15)"
                : `1px solid ${colors.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {c.features.map((f) => (
              <p
                key={f}
                style={{
                  fontSize: 16,
                  color: c.popular ? "rgba(255,255,255,0.6)" : colors.text2,
                }}
              >
                {f}
              </p>
            ))}
          </div>
          <button
            style={{
              marginTop: 14,
              width: "100%",
              padding: "8px 0",
              borderRadius: 6,
              fontSize: 17,
              fontWeight: 500,
              fontFamily: interFamily,
              ...(c.popular
                ? { backgroundColor: "#fff", color: colors.text, border: "none" }
                : {
                    backgroundColor: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }),
            }}
          >
            {c.cta}
          </button>
        </div>
      ))}
    </div>
  );
};
