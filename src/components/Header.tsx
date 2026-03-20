"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Menu, X, Instagram, Facebook, Youtube, User, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { mainNavItems } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const noop = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(noop, getTrue, getFalse);
  const { totalItems, toggleCart } = useCart();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [hideLogoBar, setHideLogoBar] = useState(false);
  const lastScrollY = useRef(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchResults = searchQuery.length >= 2
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tastingNotes.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  // Close mobile menu on route changes (render-phase derived state)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Track scroll position for header shadow + logo bar hide/show
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Only hide logo bar after scrolling past its height
      if (currentY > 150) {
        setHideLogoBar(currentY > lastScrollY.current);
      } else {
        setHideLogoBar(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu
  const handleMobileMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isMobileMenuOpen || !mobileNavRef.current) return;
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isMobileMenuOpen]
  );

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
    <header className={cn(
      "sticky z-50 bg-white border-b transition-all duration-300",
      scrolled ? "border-border shadow-md shadow-dark/5" : "border-border-light",
      hideLogoBar ? "-top-32 md:-top-36" : "top-0"
    )}>
      <div className="mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-32 md:h-36">
          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 ml-2 text-dark-muted hover:text-accent hover:scale-110 active:scale-95 transition-all"
            aria-label="Menú"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Spacer for desktop to balance layout */}
          <div className="hidden md:flex items-center w-32" />

          {/* Logo — centered */}
          <Link href="/" className="flex items-center justify-center group absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo-peregrino.jpg"
              alt="Peregrino Coffee Roasters"
              width={144}
              height={144}
              className="h-32 md:h-36 w-auto"
            />
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-2 mr-4 md:mr-6">
            {/* Social links - desktop only */}
            <div className="hidden lg:flex items-center gap-1 mr-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-accent hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={17} />
              </a>
            </div>

            <div className="w-px h-5 bg-border hidden lg:block" />

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-3 text-dark-muted hover:text-accent transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-3 text-dark-muted hover:text-accent transition-colors"
              aria-label="Mi cuenta"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-3 -mr-2 text-dark-muted hover:text-accent transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {mounted && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Desktop navigation — full width accent bar */}
      <div className="hidden md:block bg-accent">
        <nav className="flex items-center justify-center gap-0.5 py-0" aria-label="Navegación principal">
          {mainNavItems.map((item) => {
            const isActive = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-0.5 text-xs font-medium transition-colors tracking-wide",
                  isActive ? "text-white bg-white/20" : "text-white/70 hover:text-white hover:bg-white/10"
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
            ref={mobileNavRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-surface border-t border-border-light overflow-hidden"
            onKeyDown={handleMobileMenuKeyDown}
            role="dialog"
            aria-label="Menú de navegación"
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
                        "block px-3 py-3 transition-colors text-sm tracking-wide",
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
              <div className="flex items-center gap-2 px-1 pt-4 border-t border-border-light mt-4">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 text-text-tertiary hover:text-accent hover:scale-110 transition-all" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="p-3 text-text-tertiary hover:text-accent hover:scale-110 transition-all" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="p-3 text-text-tertiary hover:text-accent hover:scale-110 transition-all" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-4 sm:mx-auto mt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white shadow-2xl overflow-hidden rounded-lg">
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light">
                  <Search size={20} className="text-text-tertiary shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchResults.length > 0) {
                        router.push(`/products/${searchResults[0].slug}`);
                        setSearchOpen(false);
                      }
                    }}
                    className="flex-1 text-dark placeholder:text-text-tertiary outline-none text-base bg-transparent"
                    autoComplete="off"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-text-tertiary hover:text-dark transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Results */}
                {searchQuery.length >= 2 && (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-base-warm transition-colors"
                        >
                          <div className="w-12 h-12 bg-base rounded overflow-hidden shrink-0 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark truncate">{product.name}</p>
                            <p className="text-xs text-text-tertiary capitalize">{product.category}</p>
                          </div>
                          <p className="text-sm font-medium text-accent shrink-0">
                            ${product.variants[0].price.toLocaleString("es-CL")}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-8 text-center text-text-tertiary text-sm">
                        No se encontraron productos para &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}

                {/* Hint */}
                {searchQuery.length < 2 && (
                  <div className="px-5 py-6 text-center text-text-tertiary text-sm">
                    Escribe al menos 2 caracteres para buscar
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
