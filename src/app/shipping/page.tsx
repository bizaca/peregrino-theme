import type { Metadata } from "next";
import ShippingContent from "@/components/ShippingContent";

export const metadata: Metadata = {
  title: "Políticas de Despacho y Retiro en Tienda",
  description:
    "Políticas de despacho a todo Chile y retiro en tienda. Envío gratis en la RM para compras sobre $35.000. Retiro gratis en Loreley, Apoquindo y Providencia.",
  alternates: { canonical: "/shipping" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el envío de café a domicilio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El envío es gratis en la Región Metropolitana para compras sobre $35.000. Para pedidos menores en la RM el costo es $3.990. Otras regiones: Valparaíso/O'Higgins $4.990, Biobío/Maule/Araucanía/Ñuble $5.990, Antofagasta/Atacama/Coquimbo/Los Ríos/Los Lagos $6.990, y zonas extremas $8.990.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo funciona el retiro en tienda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El retiro en tienda es gratuito y está disponible en nuestros locales de Loreley, Apoquindo y Providencia. Los pedidos se preparan en bodega y se envían a la sucursal seleccionada, estando listos en un máximo de 2 días hábiles. Recibirás un email cuando tu pedido esté listo para retirar. Además, todos los retiros incluyen un 15% de descuento en consumo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto demora el envío de café en Chile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En comunas urbanas de la Región Metropolitana el envío demora 1-2 días hábiles. Valparaíso y O'Higgins 2-3 días, Biobío/Maule/Araucanía/Ñuble 3-4 días, Antofagasta/Atacama/Coquimbo/Los Ríos/Los Lagos 4-6 días, y zonas extremas 5-8 días hábiles. Los pedidos de viernes a domingo se despachan el lunes.",
      },
    },
    {
      "@type": "Question",
      name: "¿El café llega fresco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, todos nuestros cafés se despachan dentro de los primeros 14 días desde su fecha de tueste. Cada bolsa incluye válvula unidireccional y fecha de tueste. Si tu pedido llega en mal estado, lo reponemos sin costo.",
      },
    },
  ],
};

export default function ShippingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ShippingContent />
    </>
  );
}
