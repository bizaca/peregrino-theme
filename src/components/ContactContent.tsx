"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function ContactContent() {
  const [formState, setFormState] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message from form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const whatsappText = encodeURIComponent(
      `Hola, soy ${name}.\n\nAsunto: ${subject}\n\n${message}`
    );
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappText}`,
      "_blank"
    );
    setFormState("submitted");
  };

  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Contacto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            ¿Tienes preguntas? Nos encantaría escucharte. Escríbenos y te responderemos lo antes posible.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="font-heading text-2xl font-semibold text-dark mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-5">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-2.5 bg-[#25D366]/10 rounded-xl text-[#25D366] shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-dark group-hover:text-accent transition-colors">WhatsApp</p>
                    <p className="text-text-secondary text-sm">{siteConfig.contact.phone}</p>
                    <p className="text-accent text-xs mt-0.5">Respuesta rápida</p>
                  </div>
                </a>

                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-4 group">
                  <div className="p-2.5 bg-accent-bg rounded-xl text-accent shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-dark group-hover:text-accent transition-colors">Email</p>
                    <p className="text-text-secondary text-sm">{siteConfig.contact.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-accent-bg rounded-xl text-accent shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Teléfono</p>
                    <p className="text-text-secondary text-sm">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-accent-bg rounded-xl text-accent shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Ubicación</p>
                    <p className="text-text-secondary text-sm">{siteConfig.contact.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-accent-bg rounded-xl text-accent shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Horario de Atención</p>
                    <p className="text-text-secondary text-sm">
                      Lun - Vie: 9:00 - 18:00
                      <br />
                      Sáb: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface border border-border-light rounded-2xl p-6 md:p-8">
              {formState === "submitted" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-semibold text-dark mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Tu mensaje fue redirigido a nuestro WhatsApp. Te responderemos lo antes posible.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-accent hover:text-accent-dark font-medium transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                    Envíanos un Mensaje
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark mb-1.5">
                          Nombre
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Tu nombre"
                          className="w-full bg-base border border-border rounded-xl px-4 py-3 text-dark placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="tu@email.com"
                          className="w-full bg-base border border-border rounded-xl px-4 py-3 text-dark placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-dark mb-1.5">
                        Asunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full bg-base border border-border rounded-xl px-4 py-3 text-dark text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="Consulta sobre productos">Consulta sobre productos</option>
                        <option value="Estado de mi pedido">Estado de mi pedido</option>
                        <option value="Mayoristas">Mayoristas</option>
                        <option value="Suscripciones">Suscripciones</option>
                        <option value="Sugerencias">Sugerencias</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-dark mb-1.5">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full bg-base border border-border rounded-xl px-4 py-3 text-dark placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300"
                    >
                      <Send size={16} />
                      Enviar Mensaje
                    </button>
                    <p className="text-text-tertiary text-xs">
                      Al enviar, serás redirigido a WhatsApp para completar tu consulta.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
