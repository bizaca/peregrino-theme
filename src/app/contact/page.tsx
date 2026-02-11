import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para consultas sobre café de especialidad, pedidos mayoristas o servicio al cliente. Estamos en Santiago, Chile.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
