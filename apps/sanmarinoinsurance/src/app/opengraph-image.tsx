import { ImageResponse } from "next/og";
import { getFullAddressLine, site } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#f2c94c",
          backgroundImage:
            "radial-gradient(1200px 630px at 20% 10%, rgba(0,0,0,0.09), transparent), radial-gradient(900px 600px at 70% 80%, rgba(0,0,0,0.04), transparent)",
          color: "#0b0b0b",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
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
          <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>
                {site.brand.name}
              </div>
            <div style={{ fontSize: 18, color: "rgba(11,11,11,0.7)" }}>
              {`${site.agent.location} • ${site.agent.phone.display}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 58, fontWeight: 750, lineHeight: 1.05, letterSpacing: -1 }}>
            Insurance that fits your life—without the runaround.
          </div>
          <div style={{ fontSize: 22, color: "rgba(11,11,11,0.72)", lineHeight: 1.45 }}>
            Auto • Home • Renters • Condo • Life • Business • Motorcycle • Boat • ATV
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            alignItems: "flex-end",
            borderTop: "1px solid rgba(11,11,11,0.18)",
            paddingTop: 22,
          }}
        >
          <div style={{ fontSize: 18, color: "rgba(11,11,11,0.7)" }}>
            {getFullAddressLine()}
          </div>
          <div style={{ fontSize: 18, color: "rgba(11,11,11,0.7)" }}>
            {`${site.agent.rating.reviewCount} five‑star reviews`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
