import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos personales de Peregrino Coffee Roasters.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="bg-dark-soft py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Privacidad
          </h1>
          <p className="text-white/60">Última actualización: enero 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8 text-text-secondary leading-relaxed text-sm">
          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">1. Información que Recopilamos</h2>
            <p>
              Peregrino Coffee Roasters (en adelante, &quot;Peregrino&quot;) recopila información personal que usted
              nos proporciona voluntariamente al realizar un pedido, suscribirse a nuestro newsletter o contactarnos.
              Esta información puede incluir:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío</li>
              <li>Historial de pedidos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">2. Uso de la Información</h2>
            <p>Utilizamos su información personal para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Procesar y gestionar sus pedidos</li>
              <li>Enviar confirmaciones y actualizaciones de envío</li>
              <li>Enviar ofertas y novedades (solo si dio su consentimiento)</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Responder a sus consultas y solicitudes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal
              contra acceso no autorizado, pérdida o alteración. No almacenamos datos de tarjetas de crédito
              en nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">4. Compartir Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos su información personal con terceros, salvo cuando sea
              necesario para procesar su pedido (por ejemplo, compartir su dirección con el servicio de courier)
              o cuando la ley lo requiera.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">5. Cookies</h2>
            <p>
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación.
              Estas cookies nos permiten recordar sus preferencias y analizar el uso del sitio. Puede configurar
              su navegador para rechazar cookies, aunque algunas funcionalidades pueden verse limitadas.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">6. Sus Derechos</h2>
            <p>De acuerdo con la Ley 19.628 de Protección de Datos Personales de Chile, usted tiene derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Acceder a sus datos personales</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Revocar su consentimiento para el uso de sus datos</li>
            </ul>
            <p className="mt-2">
              Para ejercer estos derechos, contáctenos en{" "}
              <a href="mailto:hola@peregrinocoffee.cl" className="text-accent hover:underline">
                hola@peregrinocoffee.cl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">7. Newsletter</h2>
            <p>
              Si se suscribe a nuestro newsletter, utilizaremos su email exclusivamente para enviarle
              información sobre nuevos productos, ofertas y contenido relacionado con el café.
              Puede cancelar su suscripción en cualquier momento mediante el enlace incluido en cada correo.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">8. Cambios a esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios serán
              publicados en esta página con la fecha de actualización correspondiente. Le recomendamos
              revisar esta política periódicamente.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-dark mb-3">9. Contacto</h2>
            <p>
              Para consultas sobre esta política de privacidad o el tratamiento de sus datos personales,
              contáctenos en{" "}
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
