import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para consultas sobre café de especialidad, pedidos mayoristas o servicio al cliente. Estamos en Santiago, Chile.",
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto — ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ricardo Lyon 126, local 7",
      addressLocality: "Providencia",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactContent />
    </>
  );
}
