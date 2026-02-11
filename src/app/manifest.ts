import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Peregrino Coffee Roasters",
    short_name: "Peregrino",
    description: "Café de especialidad desde 2016. Granos frescos de Latinoamérica.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#2D2926",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
