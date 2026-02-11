import type { Metadata } from "next";
import SubscriptionsContent from "@/components/SubscriptionsContent";

export const metadata: Metadata = {
  title: "Suscripciones",
  description:
    "Suscríbete a Peregrino Coffee y recibe café de especialidad fresco cada semana, quincenal o mensualmente. 10% de descuento permanente.",
  alternates: { canonical: "/subscriptions" },
};

export default function SubscriptionsPage() {
  return <SubscriptionsContent />;
}
