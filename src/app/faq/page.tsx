import type { Metadata } from "next";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más frecuentes sobre café de especialidad, envíos, suscripciones y pedidos en Peregrino Coffee.",
};

export default function FaqPage() {
  return <FaqContent />;
}
