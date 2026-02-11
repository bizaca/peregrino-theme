import type { Metadata } from "next";
import WholesaleContent from "@/components/WholesaleContent";

export const metadata: Metadata = {
  title: "Mayoristas",
  description:
    "Programa mayorista de café de especialidad Peregrino Coffee. Soluciones para cafeterías, restaurantes y oficinas.",
  alternates: { canonical: "/wholesale" },
};

export default function WholesalePage() {
  return <WholesaleContent />;
}
