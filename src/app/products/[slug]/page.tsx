"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ChevronRight, Minus, Plus, MapPin, Mountain, Droplets, Leaf, Award } from "lucide-react";
import { getProductBySlug, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug as string);
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-dark mb-4">
            Producto no encontrado
          </h1>
          <Link
            href="/products"
            className="text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const hasDiscount = variant.originalPrice && variant.originalPrice > variant.price;
  const grind = product.grindOptions.length > 0 ? product.grindOptions[selectedGrind] : "N/A";

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size: variant.size,
      grind,
      price: variant.price,
      image: product.image,
    }, quantity);
  };

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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-warm sticky top-28">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
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
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium py-3.5 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                <ShoppingBag size={18} />
                Agregar al Carrito
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
            <div className="bg-accent-bg rounded-2xl p-6 mb-6">
              <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                Notas de Cata
              </h3>
              <p className="text-accent-dark font-medium text-lg">
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
          </motion.div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border-light px-4 py-3 z-40 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-dark font-semibold text-sm truncate">{product.name}</p>
            <p className="text-accent-dark font-bold font-heading text-lg">{formatPrice(variant.price)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-5 py-3 rounded-full transition-all duration-300 shrink-0"
          >
            <ShoppingBag size={16} />
            <span className="text-sm">Agregar</span>
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky bar on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
