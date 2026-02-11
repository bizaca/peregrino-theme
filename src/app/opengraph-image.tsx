import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Peregrino Coffee Roasters - Café de Especialidad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #2D2926 0%, #1A1A1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Decorative accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #B8734A, #D4956B, #B8734A)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FAFAF8",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          PEREGRINO
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#A8A29E",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Coffee Roasters
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 2,
            background: "#B8734A",
            marginBottom: 40,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#D4956B",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Café de Especialidad desde 2016
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#7A7570",
            marginTop: 16,
          }}
        >
          peregrinocoffee.cl
        </div>
      </div>
    ),
    { ...size }
  );
}
