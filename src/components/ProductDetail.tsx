"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  MapPin,
  Mountain,
  Droplets,
  Leaf,
  Award,
  Check,
  Share2,
  Link as LinkIcon,
  Coffee,
  Sparkles,
} from "lucide-react";
import {
  type Product,
  getRelatedProducts,
  formatPrice,
  getDiscountPercentage,
} from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { parseTastingNotes } from "@/lib/tasting-notes";
import { CountrySilhouette, hasCountrySilhouette } from "@/lib/country-silhouettes";

// ── Roast level config ──

const roastLevels = [
  { level: 1 as const, label: "Brillante", description: "Tueste claro que resalta la acidez y notas frutales del origen." },
  { level: 2 as const, label: "Equilibrado", description: "Tueste medio que balancea acidez, dulzura y cuerpo." },
  { level: 3 as const, label: "Tradicional", description: "Tueste oscuro con cuerpo intenso y notas de chocolate amargo." },
];

// ── Brew guides ──

const brewGuides = [
  { method: "V60", ratio: "1:15", grind: "Media-fina", time: "2:30 - 3:00 min", temp: "92-96°C" },
  { method: "Prensa Francesa", ratio: "1:12", grind: "Gruesa", time: "4:00 min", temp: "93-96°C" },
  { method: "Espresso", ratio: "1:2", grind: "Fina", time: "25-30 seg", temp: "90-94°C" },
  { method: "AeroPress", ratio: "1:15", grind: "Media", time: "1:30 - 2:00 min", temp: "85-92°C" },
];

// ── Main component ──

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const variant = product.variants[selectedVariant];
  const hasDiscount =
    variant.originalPrice && variant.originalPrice > variant.price;
  const grind =
    product.grindOptions.length > 0
      ? product.grindOptions[selectedGrind]
      : "N/A";

  const tastingNotes = parseTastingNotes(product.tastingNotes);
  const activeRoast = product.roastLevel
    ? roastLevels.find((r) => r.level === product.roastLevel)
    : null;

  const handleAddToCart = useCallback(() => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        size: variant.size,
        grind,
        price: variant.price,
        image: product.image,
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [addItem, product, variant, grind, quantity]);

  return (
    <div className="min-h-screen bg-base">
      {/* Breadcrumb */}
      <div className="bg-base-warm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav
            aria-label="Migas de pan"
            className="flex items-center gap-2 text-sm text-text-tertiary"
          >
            <Link
              href="/"
              className="py-2 hover:text-accent transition-colors"
            >
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/products"
              className="py-2 hover:text-accent transition-colors"
            >
              Productos
            </Link>
            <ChevronRight size={14} />
            <span className="py-2 text-dark font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Left column: Product image ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-28 self-start"
          >
            <div className="relative aspect-[4/5] max-w-[500px] mx-auto overflow-hidden bg-base-warm shadow-lg shadow-dark/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGMEVCIi8+PC9zdmc+"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-accent text-white text-sm font-semibold px-4 py-1.5">
                  {product.badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right column: Product info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* 1. Header — SCA badge + stars, name, origin */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {product.cupScore && (
                <div className="flex items-center gap-1.5 bg-sage-bg text-sage px-3 py-1">
                  <Award size={14} />
                  <span className="text-sm font-semibold">
                    SCA {product.cupScore}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-accent text-accent"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <span className="text-text-secondary text-sm">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-1">
              {product.name}
            </h1>

            {product.origin && (
              <p className="text-text-secondary text-lg mb-6">
                {product.origin}
                {product.region ? ` · ${product.region}` : ""}
              </p>
            )}

            {/* Country silhouette map */}
            {hasCountrySilhouette(product.origin) && (
              <div className="mb-6">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                  Origen
                </p>
                <div className="flex justify-center py-3 bg-base-warm text-text-tertiary">
                  <CountrySilhouette country={product.origin} />
                </div>
              </div>
            )}

            {/* 2. Tasting Notes — pill badges with icons */}
            {tastingNotes.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                  Notas de Cata
                </p>
                <div className="flex flex-wrap gap-2">
                  {tastingNotes.map((note) => {
                    const Icon = note.icon;
                    return (
                      <span
                        key={note.label}
                        className="inline-flex items-center gap-1.5 bg-accent-bg border border-accent/20 text-accent-dark text-sm font-medium px-3 py-1.5"
                      >
                        <Icon size={14} className="shrink-0" />
                        {note.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Roast Level Scale */}
            {activeRoast && (
              <div className="mb-6">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                  Nivel de Tueste
                </p>
                <div className="flex gap-1.5 mb-2">
                  {roastLevels.map((r) => (
                    <div
                      key={r.level}
                      className={cn(
                        "flex-1 h-2.5 transition-colors",
                        r.level <= product.roastLevel!
                          ? "bg-dark"
                          : "bg-border-light"
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-text-tertiary mb-1.5">
                  {roastLevels.map((r) => (
                    <span
                      key={r.level}
                      className={cn(
                        "transition-colors",
                        r.level === product.roastLevel
                          ? "text-dark font-semibold"
                          : ""
                      )}
                    >
                      {r.label}
                    </span>
                  ))}
                </div>
                <p className="text-text-secondary text-sm">
                  {activeRoast.description}
                </p>
              </div>
            )}

            {/* 4. Size Dropdown */}
            {product.variants.length > 1 && (
              <div className="mb-4">
                <label
                  htmlFor="size-select"
                  className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-2 block"
                >
                  Tamaño
                </label>
                <div className="relative">
                  <select
                    id="size-select"
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(Number(e.target.value))}
                    className="w-full appearance-none bg-surface border border-border px-4 py-3 pr-10 text-dark font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors cursor-pointer"
                  >
                    {product.variants.map((v, i) => (
                      <option key={v.size} value={i}>
                        {v.size} — {formatPrice(v.price)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
                  />
                </div>
              </div>
            )}

            {/* 5. Grind Dropdown */}
            {product.grindOptions.length > 0 && (
              <div className="mb-6">
                <label
                  htmlFor="grind-select"
                  className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-2 block"
                >
                  Molienda
                </label>
                <div className="relative">
                  <select
                    id="grind-select"
                    value={selectedGrind}
                    onChange={(e) => setSelectedGrind(Number(e.target.value))}
                    className="w-full appearance-none bg-surface border border-border px-4 py-3 pr-10 text-dark font-medium text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors cursor-pointer"
                  >
                    {product.grindOptions.map((g, i) => (
                      <option key={g} value={i}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
                  />
                </div>
              </div>
            )}

            {/* 6. Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-accent-dark font-heading">
                {formatPrice(variant.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-text-tertiary text-xl line-through">
                    {formatPrice(variant.originalPrice!)}
                  </span>
                  <span className="bg-accent-red/10 text-accent-red text-sm font-semibold px-2.5 py-0.5">
                    -
                    {getDiscountPercentage(
                      variant.price,
                      variant.originalPrice!
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* 7. Quantity + Add to Cart */}
            <div className="bg-base-warm p-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-surface border border-border px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-text-secondary hover:text-dark transition-colors"
                    aria-label="Reducir cantidad"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="w-8 text-center font-medium text-dark"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(quantity + 1, 20))}
                    disabled={quantity >= 20}
                    className={`p-3 transition-colors ${quantity >= 20 ? "text-text-tertiary/40 cursor-not-allowed" : "text-text-secondary hover:text-dark"}`}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 text-white font-medium py-3.5 transition-all duration-300 btn-press",
                    addedToCart
                      ? "bg-sage"
                      : "bg-accent hover:bg-accent-dark hover:shadow-lg"
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {addedToCart ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} />
                        Agregado
                      </motion.span>
                    ) : (
                      <motion.span
                        key="bag"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={18} />
                        Agregar al Carrito
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <span role="status" aria-live="polite" className="sr-only">
                  {addedToCart ? "Producto agregado al carrito" : ""}
                </span>
              </div>
            </div>

            {/* 8. Sections — always visible */}
            <div className="space-y-6 border-t border-border-light pt-6">
              {/* Descripción */}
              <div>
                <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                  Descripción
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Detalles del Origen */}
              {product.origin && (
                <div>
                  <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                    Detalles del Origen
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 bg-base-warm">
                      <MapPin
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wide">
                          Origen
                        </div>
                        <div className="text-dark font-medium text-sm mt-0.5">
                          {product.origin}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-base-warm">
                      <Mountain
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wide">
                          Altitud
                        </div>
                        <div className="text-dark font-medium text-sm mt-0.5">
                          {product.altitude}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-base-warm">
                      <Droplets
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wide">
                          Proceso
                        </div>
                        <div className="text-dark font-medium text-sm mt-0.5">
                          {product.process}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-base-warm">
                      <Leaf
                        size={18}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      <div>
                        <div className="text-xs text-text-tertiary uppercase tracking-wide">
                          Varietal
                        </div>
                        <div className="text-dark font-medium text-sm mt-0.5">
                          {product.varietals}
                        </div>
                      </div>
                    </div>
                    {product.acidity && (
                      <div className="flex items-start gap-3 p-3 bg-base-warm">
                        <Sparkles
                          size={18}
                          className="text-accent mt-0.5 shrink-0"
                        />
                        <div>
                          <div className="text-xs text-text-tertiary uppercase tracking-wide">
                            Acidez
                          </div>
                          <div className="text-dark font-medium text-sm mt-0.5">
                            {product.acidity}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cómo Preparar */}
              {product.grindOptions.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
                    Cómo Preparar
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brewGuides.map((guide) => (
                      <div
                        key={guide.method}
                        className="p-3 bg-base-warm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee size={14} className="text-accent" />
                          <span className="text-dark font-semibold text-sm">
                            {guide.method}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-text-secondary">
                          <div className="flex justify-between">
                            <span>Ratio</span>
                            <span className="text-dark font-medium">
                              {guide.ratio}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Molienda</span>
                            <span className="text-dark font-medium">
                              {guide.grind}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tiempo</span>
                            <span className="text-dark font-medium">
                              {guide.time}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temperatura</span>
                            <span className="text-dark font-medium">
                              {guide.temp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 9. Share */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-light">
              <Share2 size={16} className="text-text-tertiary" />
              <span className="text-text-tertiary text-sm">Compartir:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - Café de especialidad de ${product.origin} ☕ ${siteConfig.url}/products/${product.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-base-warm hover:bg-accent-bg text-text-secondary hover:text-accent transition-all"
                aria-label="Compartir por WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${siteConfig.url}/products/${product.slug}`
                  );
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                className={cn(
                  "p-2 transition-all",
                  linkCopied
                    ? "bg-sage-bg text-sage"
                    : "bg-base-warm hover:bg-accent-bg text-text-secondary hover:text-accent"
                )}
                aria-label="Copiar enlace"
              >
                {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      <section className="bg-base-warm py-12 md:py-16 border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark shrink-0">
              También te puede gustar
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {getRelatedProducts(product.id, 4).map((related, index) => (
              <ProductCard key={related.id} product={related} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile add-to-cart bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/98 backdrop-blur-md border-t border-border-light px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-40 lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-dark font-semibold text-sm truncate">
              {product.name}
            </p>
            <p className="text-accent-dark font-bold font-heading text-lg">
              {formatPrice(variant.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center gap-2 text-white font-medium px-5 py-3 transition-all duration-300 shrink-0",
              addedToCart ? "bg-sage" : "bg-accent hover:bg-accent-dark"
            )}
          >
            {addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span className="text-sm">
              {addedToCart ? "Listo" : "Agregar"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
