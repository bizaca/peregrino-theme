"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, ChevronRight, Minus, Plus, MapPin, Mountain, Droplets, Leaf, Award, Check, Share2, Link as LinkIcon } from "lucide-react";
import { type Product, getRelatedProducts, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

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
  const hasDiscount = variant.originalPrice && variant.originalPrice > variant.price;
  const grind = product.grindOptions.length > 0 ? product.grindOptions[selectedGrind] : "N/A";

  const handleAddToCart = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      size: variant.size,
      grind,
      price: variant.price,
      image: product.image,
    }, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [addItem, product, variant, grind, quantity]);

  return (
    <div className="min-h-screen bg-base">
      {/* Breadcrumb */}
      <div className="bg-base-warm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/" className="hover:text-accent transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/products"
              className="hover:text-accent transition-colors"
            >
              Productos
            </Link>
            <ChevronRight size={14} />
            <span className="text-dark font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-warm sticky top-28 shadow-lg shadow-dark/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGMEVCIi8+PC9zdmc+"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Rating + SCA Score */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
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
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>
              {product.cupScore && (
                <div className="flex items-center gap-1.5 bg-sage-bg text-sage px-3 py-1 rounded-full">
                  <Award size={14} />
                  <span className="text-sm font-semibold">SCA {product.cupScore}</span>
                </div>
              )}
            </div>

            {/* Name */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-2">
              {product.name}
            </h1>

            {/* Origin subtitle */}
            <p className="text-text-secondary text-lg mb-6">
              {product.origin} · {product.region}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-accent-dark font-heading">
                {formatPrice(variant.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-text-tertiary text-xl line-through">
                    {formatPrice(variant.originalPrice!)}
                  </span>
                  <span className="bg-accent-red/10 text-accent-red text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    -{getDiscountPercentage(variant.price, variant.originalPrice!)}%
                  </span>
                </>
              )}
            </div>

            {/* Size selection */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-dark mb-3 block">
                  Tamaño
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(i)}
                      className={cn(
                        "px-4 py-2.5 rounded-full text-sm font-medium transition-all border",
                        selectedVariant === i
                          ? "bg-dark text-white border-dark"
                          : "bg-surface text-dark-muted border-border hover:border-dark"
                      )}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grind selection */}
            {product.grindOptions.length > 0 && (
              <div className="mb-8">
                <label className="text-sm font-medium text-dark mb-3 block">
                  Molienda
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.grindOptions.map((g, i) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrind(i)}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm transition-all border",
                        selectedGrind === i
                          ? "bg-dark text-white border-dark"
                          : "bg-surface text-dark-muted border-border hover:border-dark"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-base-warm rounded-full border border-border px-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-text-secondary hover:text-dark transition-colors"
                  aria-label="Reducir"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-text-secondary hover:text-dark transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 text-white font-medium py-3.5 rounded-full transition-all duration-300 btn-press",
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
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                Descripción
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tasting notes */}
            <div className="bg-accent-bg rounded-2xl p-6 mb-6 border-l-4 border-accent">
              <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                Notas de Cata
              </h3>
              <p className="text-accent-dark font-medium text-lg italic">
                {product.tastingNotes}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-base-warm rounded-xl">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-text-tertiary uppercase tracking-wide">Origen</div>
                  <div className="text-dark font-medium text-sm mt-0.5">{product.origin}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-base-warm rounded-xl">
                <Mountain size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-text-tertiary uppercase tracking-wide">Altitud</div>
                  <div className="text-dark font-medium text-sm mt-0.5">{product.altitude}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-base-warm rounded-xl">
                <Droplets size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-text-tertiary uppercase tracking-wide">Proceso</div>
                  <div className="text-dark font-medium text-sm mt-0.5">{product.process}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-base-warm rounded-xl">
                <Leaf size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-text-tertiary uppercase tracking-wide">Varietal</div>
                  <div className="text-dark font-medium text-sm mt-0.5">{product.varietals}</div>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-light">
              <Share2 size={16} className="text-text-tertiary" />
              <span className="text-text-tertiary text-sm">Compartir:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - Café de especialidad de ${product.origin} ☕ https://peregrinocoffee.cl/products/${product.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-base-warm hover:bg-accent-bg text-text-secondary hover:text-accent rounded-full transition-all"
                aria-label="Compartir por WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://peregrinocoffee.cl/products/${product.slug}`);
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                className={cn(
                  "p-2 rounded-full transition-all",
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
            <p className="text-dark font-semibold text-sm truncate">{product.name}</p>
            <p className="text-accent-dark font-bold font-heading text-lg">{formatPrice(variant.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center gap-2 text-white font-medium px-5 py-3 rounded-full transition-all duration-300 shrink-0",
              addedToCart ? "bg-sage" : "bg-accent hover:bg-accent-dark"
            )}
          >
            {addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span className="text-sm">{addedToCart ? "Listo" : "Agregar"}</span>
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
