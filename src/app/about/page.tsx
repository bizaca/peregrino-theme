import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Conoce la historia de Peregrino Coffee Roasters. Desde 2016 tostando café de especialidad con granos de Latinoamérica.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Nuestra Historia | Peregrino Coffee",
    description:
      "Tostadores de café de especialidad desde 2016. Trabajamos con productores de Perú, Colombia, Bolivia, Costa Rica y Brasil.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
