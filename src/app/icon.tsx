import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
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
          background: "#2D2926",
          borderRadius: 32,
        }}
      >
        <div
          style={{
            fontSize: 100,
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
