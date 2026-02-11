import type { Metadata } from "next";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más frecuentes sobre café de especialidad, envíos, suscripciones y pedidos en Peregrino Coffee.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Cuánto tarda el envío?", acceptedAnswer: { "@type": "Answer", text: "Los envíos dentro de la Región Metropolitana se realizan en 1-2 días hábiles. Para el resto de Chile, los envíos tardan entre 3-5 días hábiles." } },
    { "@type": "Question", name: "¿El envío es gratis?", acceptedAnswer: { "@type": "Answer", text: "Sí, todos los pedidos superiores a $35.000 tienen envío gratis dentro de la Región Metropolitana. Para otras regiones, el costo se calcula según destino." } },
    { "@type": "Question", name: "¿Cada cuánto tuestan el café?", acceptedAnswer: { "@type": "Answer", text: "Tostamos semanalmente en lotes pequeños para garantizar la máxima frescura. Recomendamos consumir el café entre 7 y 30 días después del tueste." } },
    { "@type": "Question", name: "¿Qué significa café de especialidad?", acceptedAnswer: { "@type": "Answer", text: "El café de especialidad es aquel que obtiene un puntaje de 80 o más en la escala de la SCA (Specialty Coffee Association), resultando en sabores complejos y distintivos." } },
    { "@type": "Question", name: "¿Cómo funciona la suscripción?", acceptedAnswer: { "@type": "Answer", text: "Elige tu café favorito, selecciona la frecuencia (semanal, quincenal o mensual) y recibe café fresco en tu puerta. Puedes pausar, cambiar o cancelar en cualquier momento." } },
    { "@type": "Question", name: "¿La suscripción tiene descuento?", acceptedAnswer: { "@type": "Answer", text: "Sí, todos los suscriptores reciben un 10% de descuento en cada envío, además de acceso anticipado a ediciones limitadas y eventos exclusivos de cata." } },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqContent />
    </>
  );
}
