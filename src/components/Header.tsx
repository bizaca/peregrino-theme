"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Instagram, Facebook, Youtube, User } from "lucide-react";
import { mainNavItems } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNavActive = (href: string) => {
    const [itemPath, itemQuery] = href.split("?");
    if (itemQuery) {
      // Items with query params: match pathname + query exactly
      const params = new URLSearchParams(itemQuery);
      if (pathname !== itemPath) return false;
      return Array.from(params).every(([k, v]) => searchParams.get(k) === v);
    }
    // Items without query params: exact match or sub-route match (except "/")
    if (itemPath === "/") return pathname === "/";
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-muted hover:text-accent transition-colors"
            aria-label="Menú"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-dark tracking-wider group-hover:text-accent transition-colors">
                PEREGRINO
              </span>
              <span className="text-[10px] md:text-xs text-text-secondary tracking-[0.3em] uppercase">
                Coffee Roasters
              </span>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Social links - desktop only */}
            <div className="hidden lg:flex items-center gap-1 mr-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={17} />
              </a>
            </div>

            <div className="w-px h-5 bg-border hidden lg:block" />

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-dark-muted hover:text-accent transition-colors"
              aria-label="Mi cuenta"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-dark-muted hover:text-accent transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center justify-center gap-1 pb-3 -mt-1">
          {mainNavItems.map((item) => {
            const isActive = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "accent-underline px-3 py-1 text-sm transition-colors tracking-wide",
                  isActive ? "text-accent font-medium" : "text-text-secondary hover:text-dark"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile navigation — extends below sticky header to cover viewport */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-surface border-t border-border-light overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {mainNavItems.map((item, i) => {
                const isActive = isNavActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-3 rounded-lg transition-colors text-sm tracking-wide",
                        isActive
                          ? "text-accent bg-accent-bg font-medium"
                          : "text-text-secondary hover:text-accent hover:bg-base-warm"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-4 px-3 pt-4 border-t border-border-light mt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-accent transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-accent transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
