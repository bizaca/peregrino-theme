import HeroCarousel from "@/components/HeroCarousel";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";

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
