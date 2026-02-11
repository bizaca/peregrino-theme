import type { Metadata } from "next";
import ReturnsContent from "@/components/ReturnsContent";

export const metadata: Metadata = {
  title: "Cambios y Devoluciones",
  description:
    "Política de cambios y devoluciones de Peregrino Coffee Roasters. Tu satisfacción es nuestra prioridad.",
};

export default function ReturnsPage() {
  return <ReturnsContent />;
}
