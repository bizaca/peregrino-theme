"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <footer className="bg-gradient-to-b from-dark-soft to-dark text-white/70 relative">
      {/* Subtle top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-white tracking-wider">
                PEREGRINO
              </span>
              <br />
              <span className="text-xs text-white/50 tracking-[0.3em] uppercase">
                Coffee Roasters
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Tostadores de café de especialidad desde 2016. Trabajamos directamente
              con productores latinoamericanos para traerte lo mejor en cada taza.
            </p>
            <div className="flex items-center gap-3 mb-8">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Newsletter */}
            <NewsletterForm />
          </motion.div>

          {/* Links columns */}
          <motion.nav
            aria-label="Tienda"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 after:content-[''] after:block after:w-6 after:h-0.5 after:bg-accent/40 after:mt-2">
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light hover:translate-x-0.5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            aria-label="Empresa"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 after:content-[''] after:block after:w-6 after:h-0.5 after:bg-accent/40 after:mt-2">
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light hover:translate-x-0.5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            aria-label="Ayuda"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 after:content-[''] after:block after:w-6 after:h-0.5 after:bg-accent/40 after:mt-2">
              Ayuda
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light hover:translate-x-0.5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={14} />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={14} />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={14} />
                <span>{siteConfig.contact.location}</span>
              </div>
            </div>
          </motion.nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Peregrino Coffee Roasters. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
