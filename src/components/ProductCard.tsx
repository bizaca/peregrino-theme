"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Check } from "lucide-react";
import { type Product, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { parseTastingNotes } from "@/lib/tasting-notes";

interface ProductCardProps {
  product: Product;
  index?: number;
  headingLevel?: "h2" | "h3";
}

function RoastDots({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-[2px]">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-[6px] h-[6px] rounded-full ${
            i < level ? "bg-white" : "bg-white/30"
          }`}
        />
      ))}
    </span>
  );
}

export default function ProductCard({ product, index = 0, headingLevel: Heading = "h3" }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const mainVariant = product.variants[0];
  const hasDiscount = mainVariant.originalPrice && mainVariant.originalPrice > mainVariant.price;
  const notes = product.tastingNotes ? parseTastingNotes(product.tastingNotes) : [];

  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      size: mainVariant.size,
      grind: product.grindOptions.length > 0 ? product.grindOptions[0] : "N/A",
      price: mainVariant.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addItem, product, mainVariant]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`Ver ${product.name}`}
        className="group block"
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-base-warm border border-border-light group-hover:border-dark/20 transition-all duration-300">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGMEVCIi8+PC9zdmc+"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 bg-accent text-dark text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {product.badge}
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && !product.badge && (
            <div className="absolute top-3 left-3 z-10 bg-accent-red text-white text-[11px] font-bold px-2.5 py-1">
              -{getDiscountPercentage(mainVariant.price, mainVariant.originalPrice!)}%
            </div>
          )}

          {/* Madcap-style editorial hover overlay (desktop only, coffee products only) */}
          {notes.length > 0 && (
            <div
              className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 pointer-events-none"
              style={{ backgroundColor: product.labelColor ?? "#2D2926" }}
            >
              {/* Top: Origin + Process (left), Tueste + Acidez (right) */}
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-[11px] uppercase tracking-wider">
                    <span className="text-white/50 font-bold">Origen</span>{" "}
                    <span className="text-white">{product.origin}</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-wider">
                    <span className="text-white/50 font-bold">Proceso</span>{" "}
                    <span className="text-white">{product.process}</span>
                  </p>
                </div>
                <div className="text-right space-y-0.5">
                  {product.roastLevel && (
                    <p className="text-[11px] uppercase tracking-wider flex items-center gap-1.5 justify-end">
                      <span className="text-white/50 font-bold">Tueste</span>
                      <RoastDots level={product.roastLevel} />
                    </p>
                  )}
                  {product.acidity && (
                    <p className="text-[11px] uppercase tracking-wider">
                      <span className="text-white/50 font-bold">Acidez</span>{" "}
                      <span className="text-white">{product.acidity}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Center: Large name + tasting notes */}
              <div className="text-center px-2">
                <p className="text-white font-heading text-xl font-bold uppercase tracking-wider mb-2 leading-tight">
                  {product.name}
                </p>
                <p className="text-white/50 text-sm">
                  {notes.map((n) => n.label.toLowerCase()).join(", ")}
                </p>
              </div>

              {/* Bottom: Category */}
              <div>
                <span className="text-accent text-[11px] uppercase tracking-wider font-semibold">
                  {product.category === "granos" ? "Café de Especialidad" : product.category}
                </span>
              </div>
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-3 right-3 z-10 p-3 shadow-lg transition-all duration-300 focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/60 ${
              added
                ? "bg-green-600 text-white scale-110 opacity-100 translate-y-0"
                : "bg-dark-soft text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 hover:bg-accent hover:scale-110"
            }`}
            aria-label={added ? "Agregado al carrito" : "Agregar al carrito"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Check size={18} strokeWidth={3} />
                </motion.span>
              ) : (
                <motion.span
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <ShoppingBag size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {added ? "Producto agregado al carrito" : ""}
          </span>
        </div>

        {/* Content — centered below image, outside box */}
        <div className="text-center pt-4 pb-2">
          <Heading className="font-heading text-xs font-semibold text-dark uppercase tracking-[0.15em] line-clamp-1">
            {product.name}
          </Heading>
          <div className="flex items-baseline justify-center gap-2 mt-1">
            <span className="text-dark-muted text-xs uppercase tracking-wider">
              {formatPrice(mainVariant.price)}
            </span>
            {hasDiscount && (
              <span className="text-text-tertiary text-xs line-through">
                {formatPrice(mainVariant.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
