import type { Metadata } from "next";
import ShippingContent from "@/components/ShippingContent";

export const metadata: Metadata = {
  title: "Políticas de Despacho y Retiro en Tienda",
  description:
    "Políticas de despacho a todo Chile y retiro en tienda. Envío gratis en la RM para compras sobre $35.000. Retiro gratis en Loreley, Apoquindo y Providencia.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return <ShippingContent />;
}
