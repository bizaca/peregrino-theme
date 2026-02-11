import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2D2926 0%, #1A1A1A 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#FAFAF8",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          P
        </div>
      </div>
    ),
    { ...size }
  );
}
