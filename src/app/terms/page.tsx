import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de Peregrino Coffee Roasters.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="bg-dark-soft py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-white/60">Última actualización: enero 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8 text-text-secondary leading-relaxed text-sm">
          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">1. Generalidades</h2>
            <p>
              Los presentes términos y condiciones regulan el uso del sitio web peregrinocoffee.cl y la adquisición de productos
              ofrecidos por Peregrino Coffee Roasters (en adelante, &quot;Peregrino&quot;), con domicilio en Santiago, Chile.
            </p>
            <p className="mt-2">
              Al utilizar este sitio web o realizar una compra, usted acepta estos términos en su totalidad.
              Si no está de acuerdo, le rogamos no utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">2. Productos y Precios</h2>
            <p>
              Los precios publicados incluyen IVA y están expresados en pesos chilenos (CLP). Peregrino se reserva el derecho
              de modificar los precios sin previo aviso. Los productos están sujetos a disponibilidad.
            </p>
            <p className="mt-2">
              Las imágenes de los productos son referenciales. Las características del producto, como notas de cata y perfil
              de sabor, pueden variar entre lotes debido a la naturaleza artesanal del café de especialidad.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">3. Proceso de Compra</h2>
            <p>
              Las compras se realizan a través de WhatsApp, donde coordinamos pago y envío. Al enviar su pedido,
              usted se compromete a proporcionar información veraz y completa. Peregrino confirmará la recepción
              y disponibilidad de su pedido.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">4. Envíos</h2>
            <p>
              Los plazos de envío son estimativos y pueden variar según disponibilidad del transportista.
              Peregrino no se responsabiliza por retrasos ocasionados por el servicio de courier.
              Los envíos son gratuitos dentro de la Región Metropolitana para compras sobre $35.000.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">5. Cambios y Devoluciones</h2>
            <p>
              Las solicitudes de cambio o devolución deben realizarse dentro de los 3 días hábiles
              posteriores a la recepción del producto. Para más detalles, consulte nuestra{" "}
              <a href="/returns" className="text-accent hover:underline">política de cambios y devoluciones</a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">6. Propiedad Intelectual</h2>
            <p>
              Todo el contenido del sitio web, incluyendo textos, imágenes, logotipos y diseño, es propiedad
              de Peregrino Coffee Roasters y está protegido por las leyes de propiedad intelectual de Chile.
              Su reproducción total o parcial sin autorización está prohibida.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">7. Limitación de Responsabilidad</h2>
            <p>
              Peregrino no será responsable por daños indirectos derivados del uso del sitio web
              o de la imposibilidad de acceder al mismo. La información del sitio se proporciona
              &quot;tal cual&quot;, sin garantías de ningún tipo.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">8. Legislación Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia
              será sometida a los tribunales ordinarios de justicia de Santiago.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">9. Contacto</h2>
            <p>
              Para consultas sobre estos términos, contáctenos en{" "}
              <a href="mailto:hola@peregrinocoffee.cl" className="text-accent hover:underline">
                hola@peregrinocoffee.cl
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
