import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { locations } from "@/data/locations";
import LocationsContent from "@/components/LocationsContent";

export const metadata: Metadata = {
  title: "Nuestros Locales",
  description:
    "Visita nuestros cafés de especialidad en Santiago, Chile. Horarios, direcciones y cómo llegar.",
  alternates: { canonical: "/locations" },
};

function buildOpeningHours(location: (typeof locations)[number]) {
  const specs = [
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: location.hours.weekdays,
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Saturday"],
      opens: location.hours.saturday,
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Sunday"],
      opens: location.hours.sunday,
      closes: location.slug === "bilbao" || location.slug === "apoquindo" ? "19:00" : "15:30",
    },
  ];
  return specs;
}

const locationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  location: locations.map((loc) => ({
    "@type": "CoffeeShop",
    name: loc.name,
    image: `${siteConfig.url}${loc.image}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.commune,
      addressRegion: loc.region,
      addressCountry: "CL",
    },
    telephone: loc.phone.replace(/\s/g, ""),
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    url: loc.googleMapsUrl,
    openingHoursSpecification: buildOpeningHours(loc),
  })),
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
