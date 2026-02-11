import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Peregrino Coffee Roasters | Café de Especialidad",
  description:
    "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Bolivia, Costa Rica y Brasil. Envíos a todo Chile.",
  alternates: { canonical: "https://peregrinocoffee.cl" },
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <AboutSection />
      <Newsletter />
    </>
  );
}
