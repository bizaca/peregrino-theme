import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import LocationsContent from "@/components/LocationsContent";

export const metadata: Metadata = {
  title: "Nuestros Locales",
  description:
    "Visita nuestros cafés de especialidad en Santiago, Chile. Horarios, direcciones y cómo llegar.",
  alternates: { canonical: "/locations" },
};

const locationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  location: [
    {
      "@type": "CoffeeShop",
      name: "Peregrino Providencia",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Providencia 1234",
        addressLocality: "Providencia",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      telephone: "+56912345678",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "09:00", closes: "18:00" },
      ],
    },
    {
      "@type": "CoffeeShop",
      name: "Peregrino Lastarria",
      address: {
        "@type": "PostalAddress",
        streetAddress: "José Victorino Lastarria 56",
        addressLocality: "Santiago Centro",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      telephone: "+56912345678",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "19:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
      ],
    },
  ],
};

export default function LocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonLd) }}
      />
      <LocationsContent />
    </>
  );
}
