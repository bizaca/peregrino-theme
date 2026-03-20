"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import NewsletterForm from "./NewsletterForm";

const footerLinks = {
  tienda: [
    { label: "Granos", href: "/products?category=granos" },
    { label: "Accesorios", href: "/products?category=accesorios" },
    { label: "Packs", href: "/products?category=packs" },
    { label: "Infusiones", href: "/products?category=infusiones" },
    { label: "Suscripciones", href: "/subscriptions" },
    { label: "Ofertas", href: "/products?filter=offers" },
  ],
  empresa: [
    { label: "Nuestra Historia", href: "/about" },
    { label: "Locales", href: "/locations" },
    { label: "Mayoristas", href: "/wholesale" },
    { label: "Contacto", href: "/contact" },
  ],
  ayuda: [
    { label: "Envíos y Retiro", href: "/shipping" },
    { label: "Cambios y Devoluciones", href: "/returns" },
    { label: "Preguntas Frecuentes", href: "/faq" },
    { label: "Términos y Condiciones", href: "/terms" },
    { label: "Política de Privacidad", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#EDE7DE] text-[#0D2030] relative">
      {/* Subtle top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#8B6914]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer content — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-[#0D2030] tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                PEREGRINO
              </span>
              <br />
              <span className="text-xs text-[#0D2030]/50 tracking-[0.3em] uppercase">
                Coffee Roasters
              </span>
            </Link>
            <p className="text-[#0D2030]/60 text-sm leading-relaxed mb-6 max-w-sm">
              Tostadores de café de especialidad desde 2016. Trabajamos directamente
              con productores latinoamericanos para traerte lo mejor en cada taza.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0D2030]/5 hover:bg-[#8B6914] text-[#0D2030]/50 hover:text-white hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0D2030]/5 hover:bg-[#8B6914] text-[#0D2030]/50 hover:text-white hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0D2030]/5 hover:bg-[#8B6914] text-[#0D2030]/50 hover:text-white hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#0D2030]/60 text-sm">
                <Mail size={14} className="text-[#8B6914]" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0D2030]/60 text-sm">
                <Phone size={14} className="text-[#8B6914]" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0D2030]/60 text-sm">
                <MapPin size={14} className="text-[#8B6914]" />
                <span>{siteConfig.contact.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Tienda column */}
          <motion.nav
            aria-label="Tienda"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[#0D2030] font-bold text-sm uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Tienda
              <span className="block w-6 h-0.5 bg-[#8B6914]/40 mt-2" />
            </p>
            <ul className="space-y-0 md:space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3.5 md:py-0 text-sm text-[#0D2030]/50 hover:text-[#8B6914] hover:translate-x-0.5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Empresa column */}
          <motion.nav
            aria-label="Empresa"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[#0D2030] font-bold text-sm uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Empresa
              <span className="block w-6 h-0.5 bg-[#8B6914]/40 mt-2" />
            </p>
            <ul className="space-y-0 md:space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3.5 md:py-0 text-sm text-[#0D2030]/50 hover:text-[#8B6914] hover:translate-x-0.5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Ayuda + Newsletter column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <nav aria-label="Ayuda">
              <p className="text-[#0D2030] font-bold text-sm uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Ayuda
                <span className="block w-6 h-0.5 bg-[#8B6914]/40 mt-2" />
              </p>
              <ul className="space-y-0 md:space-y-2.5">
                {footerLinks.ayuda.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3.5 md:py-0 text-sm text-[#0D2030]/50 hover:text-[#8B6914] hover:translate-x-0.5 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[#0D2030] font-bold text-sm uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0D2030]/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#0D2030]/40 text-sm">
            &copy; {new Date().getFullYear()} Peregrino Coffee Roasters. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-[#0D2030]/40 text-sm">
            <Link href="/terms" className="py-3 px-2 hover:text-[#8B6914] transition-colors">
              Términos
            </Link>
            <Link href="/privacy" className="py-3 px-2 hover:text-[#8B6914] transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
