"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { label: "Granos",      href: "/products?category=granos" },
  { label: "Packs",       href: "/products?category=packs" },
  { label: "Accesorios",  href: "/products?category=accesorios" },
  { label: "Suscripcion", href: "/subscriptions" },
  { label: "Locales",     href: "/locations" },
  { label: "Ofertas",     href: "/products?filter=offers", highlight: true },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* STICKY NAV */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px", height: "74px",
          borderBottom: "1px solid rgba(12,35,48,0.2)",
          background: "rgba(13,32,48,0.97)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image
            src="https://assets.jumpseller.com/store/peregrino-coffee-roasters/themes/560099/settings/3a234517c1296458fbf1/185x200%20Logo%20Movil%202.png?1727368964"
            alt="Peregrino" width={38} height={42} style={{ display: "block" }}
          />
          <Image
            src="https://assets.jumpseller.com/store/peregrino-coffee-roasters/themes/560099/settings/60cd8a7ea2d80bba2f96/logo%20web.png?1727193528"
            alt="Peregrino Coffee Roasters" width={160} height={32} style={{ display: "block" }}
            className="hidden md:block"
          />
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  color: item.highlight ? "#D4AA40" : "rgba(244,238,228,0.65)",
                  textDecoration: "none", fontSize: "0.9rem",
                  letterSpacing: "0.04em", fontWeight: item.highlight ? 600 : 400,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = item.highlight ? "#FFD966" : "#F4EEE4")}
                onMouseLeave={e => (e.currentTarget.style.color = item.highlight ? "#D4AA40" : "rgba(244,238,228,0.65)")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => toggleCart()}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.85rem", letterSpacing: "0.06em",
              color: "#0D2030", background: "#B8912A",
              border: "none", padding: "0.6rem 1.25rem",
              cursor: "pointer", fontFamily: "Outfit, sans-serif",
              fontWeight: 500, borderRadius: "3px", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D4AA40")}
            onMouseLeave={e => (e.currentTarget.style.background = "#B8912A")}
          >
            <ShoppingBag size={16} />
            <span>Carro {totalItems > 0 && `(${totalItems})`}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#F4EEE4", background: "none", border: "none", cursor: "pointer" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed", top: "74px", left: 0, right: 0, bottom: 0,
              background: "rgba(13,32,48,0.98)", zIndex: 99,
              padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href} href={item.href}
                style={{
                  color: item.highlight ? "#D4AA40" : "#F4EEE4",
                  textDecoration: "none", fontSize: "1.3rem",
                  fontFamily: "Syne, sans-serif", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
