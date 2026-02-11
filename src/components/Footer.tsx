import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";

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
    <footer className="bg-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-white tracking-wider">
                PEREGRINO
              </span>
              <br />
              <span className="text-xs text-white/40 tracking-[0.3em] uppercase">
                Coffee Roasters
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Tostadores de café de especialidad desde 2016. Trabajamos directamente
              con productores latinoamericanos para traerte lo mejor en cada taza.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-accent/20 rounded-full text-white/50 hover:text-accent-light transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Ayuda
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Mail size={14} />
                <span>hola@peregrinocoffee.cl</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Phone size={14} />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={14} />
                <span>Santiago, Chile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Peregrino Coffee Roasters. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-sm">
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
