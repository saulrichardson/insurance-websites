import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#f2c94c",
          backgroundImage:
            "radial-gradient(900px 600px at 20% 10%, rgba(0,0,0,0.09), transparent), radial-gradient(900px 600px at 70% 80%, rgba(0,0,0,0.04), transparent)",
          color: "#0b0b0b",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(200,212,255,0.9))",
              color: "#0B1020",
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            TZ
          </div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>
            {`${site.brand.shortName} • ${site.agent.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 52, fontWeight: 750, lineHeight: 1.05, letterSpacing: -1 }}>
            Local insurance help in San Marino, CA.
          </div>
          <div style={{ fontSize: 22, color: "rgba(11,11,11,0.72)" }}>
            {`Call ${site.agent.phone.display} • Multi‑language support available`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            alignItems: "flex-end",
            borderTop: "1px solid rgba(11,11,11,0.18)",
            paddingTop: 20,
            fontSize: 18,
            color: "rgba(11,11,11,0.7)",
          }}
        >
          <div>Auto • Home • Renters • Condo • Life • Business</div>
          <div>
            {`Rated ${site.agent.rating.score.toFixed(1)} / ${site.agent.rating.outOf} (${site.agent.rating.reviewCount} reviews)`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
