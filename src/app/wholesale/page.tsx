import type { Metadata } from "next";
import WholesaleContent from "@/components/WholesaleContent";

export const metadata: Metadata = {
  title: "Mayoristas",
  description:
    "Café mayorista Chile — distribución de café de especialidad para cafeterías, restaurantes y oficinas. Programa mayorista Peregrino Coffee con precios preferenciales y soporte técnico.",
  alternates: { canonical: "/wholesale" },
};

export default function WholesalePage() {
  return <WholesaleContent />;
}
