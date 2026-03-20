import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Peregrino Coffee Roasters | Café de Especialidad",
  description:
    "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Costa Rica y Brasil. Envíos a todo Chile.",
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "es-CL",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/products?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo-peregrino.jpg`,
  description: siteConfig.description,
  foundingDate: `${siteConfig.foundedYear}`,
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    contactType: "customer service",
    areaServed: "CL",
    availableLanguage: "Spanish",
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.youtube,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ricardo Lyon 126, local 7",
    addressLocality: "Providencia",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroCarousel />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <Testimonials />
      <StatsBar />
      <AboutSection />
      <Newsletter />
    </>
  );
}
