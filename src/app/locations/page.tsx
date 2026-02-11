import type { Metadata } from "next";
import LocationsContent from "@/components/LocationsContent";

export const metadata: Metadata = {
  title: "Nuestros Locales",
  description:
    "Visita nuestros cafés de especialidad en Santiago, Chile. Horarios, direcciones y cómo llegar.",
};

export default function LocationsPage() {
  return <LocationsContent />;
}
