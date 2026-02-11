import type { Metadata } from "next";
import ShippingContent from "@/components/ShippingContent";

export const metadata: Metadata = {
  title: "Envíos y Retiro",
  description:
    "Información sobre envíos a todo Chile y retiro en tienda. Envío gratis en la RM para compras sobre $35.000.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return <ShippingContent />;
}
