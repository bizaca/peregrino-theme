"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Generalidades",
    content: (
      <>
        <p>
          Los presentes términos y condiciones regulan el uso del sitio web peregrinocoffee.cl y la adquisición de productos
          ofrecidos por Peregrino Coffee Roasters (en adelante, &quot;Peregrino&quot;), con domicilio en Santiago, Chile.
        </p>
        <p className="mt-2">
          Al utilizar este sitio web o realizar una compra, usted acepta estos términos en su totalidad.
          Si no está de acuerdo, le rogamos no utilizar nuestros servicios.
        </p>
      </>
    ),
  },
  {
    title: "2. Productos y Precios",
    content: (
      <>
        <p>
          Los precios publicados incluyen IVA y están expresados en pesos chilenos (CLP). Peregrino se reserva el derecho
          de modificar los precios sin previo aviso. Los productos están sujetos a disponibilidad.
        </p>
        <p className="mt-2">
          Las imágenes de los productos son referenciales. Las características del producto, como notas de cata y perfil
          de sabor, pueden variar entre lotes debido a la naturaleza artesanal del café de especialidad.
        </p>
      </>
    ),
  },
  {
    title: "3. Proceso de Compra",
    content: (
      <p>
        Las compras se realizan a través de WhatsApp, donde coordinamos pago y envío. Al enviar su pedido,
        usted se compromete a proporcionar información veraz y completa. Peregrino confirmará la recepción
        y disponibilidad de su pedido.
      </p>
    ),
  },
  {
    title: "4. Envíos",
    content: (
      <p>
        Los plazos de envío son estimativos y pueden variar según disponibilidad del transportista.
        Peregrino no se responsabiliza por retrasos ocasionados por el servicio de courier.
        Los envíos son gratuitos dentro de la Región Metropolitana para compras sobre $35.000.
      </p>
    ),
  },
  {
    title: "5. Cambios y Devoluciones",
    content: (
      <p>
        Las solicitudes de cambio o devolución deben realizarse dentro de los 3 días hábiles
        posteriores a la recepción del producto. Para más detalles, consulte nuestra{" "}
        <a href="/returns" className="text-accent hover:underline">política de cambios y devoluciones</a>.
      </p>
    ),
  },
  {
    title: "6. Propiedad Intelectual",
    content: (
      <p>
        Todo el contenido del sitio web, incluyendo textos, imágenes, logotipos y diseño, es propiedad
        de Peregrino Coffee Roasters y está protegido por las leyes de propiedad intelectual de Chile.
        Su reproducción total o parcial sin autorización está prohibida.
      </p>
    ),
  },
  {
    title: "7. Limitación de Responsabilidad",
    content: (
      <p>
        Peregrino no será responsable por daños indirectos derivados del uso del sitio web
        o de la imposibilidad de acceder al mismo. La información del sitio se proporciona
        &quot;tal cual&quot;, sin garantías de ningún tipo.
      </p>
    ),
  },
  {
    title: "8. Legislación Aplicable",
    content: (
      <p>
        Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia
        será sometida a los tribunales ordinarios de justicia de Santiago.
      </p>
    ),
  },
  {
    title: "9. Contacto",
    content: (
      <p>
        Para consultas sobre estos términos, contáctenos en{" "}
        <a href="mailto:hola@peregrinocoffee.cl" className="text-accent hover:underline">
          hola@peregrinocoffee.cl
        </a>.
      </p>
    ),
  },
];

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-base">
      <div className="bg-dark-soft py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Términos y Condiciones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            Última actualización: enero 2025
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8 text-text-secondary leading-relaxed text-sm">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <h2 className="font-heading text-xl font-semibold text-dark mb-3">{section.title}</h2>
              {section.content}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
