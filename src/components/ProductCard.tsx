"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Check } from "lucide-react";
import { type Product, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { parseTastingNotes } from "@/lib/tasting-notes";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  headingLevel?: "h2" | "h3";
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
        {/* Image container with flip effect */}
        <div className="relative aspect-square overflow-hidden bg-[#EDE7DE]">
          {/* Front image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-in-out",
              notes.length > 0 && "md:group-hover:opacity-0 md:group-hover:scale-105",
              !product.inStock && "opacity-50"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRURFN0RFIi8+PC9zdmc+"
          />

          {/* Back: editorial overlay on hover (desktop) */}
          {notes.length > 0 && (
            <div
              className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-5 pointer-events-none"
              style={{ backgroundColor: product.labelColor ?? "#0D2030" }}
            >
              {/* Top: Origin + Process */}
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-[11px] uppercase tracking-wider">
                    <span className="text-[#B8912A] font-bold">Origen</span>{" "}
                    <span className="text-white">{product.origin}</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-wider">
                    <span className="text-[#B8912A] font-bold">Proceso</span>{" "}
                    <span className="text-white">{product.process}</span>
                  </p>
                </div>
                <div className="text-right space-y-0.5">
                  {product.acidity && (
                    <p className="text-[11px] uppercase tracking-wider">
                      <span className="text-[#B8912A] font-bold">Acidez</span>{" "}
                      <span className="text-white">{product.acidity}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Center: Name + tasting notes */}
              <div className="text-center px-2">
                <p className="text-white text-xl font-bold uppercase tracking-wider mb-2 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {product.name}
                </p>
                <p className="text-white/50 text-sm italic">
                  {notes.map((n) => n.label.toLowerCase()).join(", ")}
                </p>
              </div>

              {/* Bottom: Category */}
              <div>
                <span className="text-[#B8912A] text-[11px] uppercase tracking-wider font-semibold">
                  {product.category === "granos" ? "Café de Especialidad" : product.category}
                </span>
              </div>
            </div>
          )}

          {/* Origin badge */}
          {product.origin && product.origin !== "Chile" && product.origin !== "N/A" && (
            <div className="absolute top-3 left-3 z-10 bg-[#0D2030]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {product.origin}
            </div>
          )}

          {/* Product badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10 bg-[#8B6914] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {product.badge}
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && !product.badge && (
            <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1">
              -{getDiscountPercentage(mainVariant.price, mainVariant.originalPrice!)}%
            </div>
          )}

          {/* Out of stock */}
          {!product.inStock && (
            <div className="absolute top-3 right-3 z-10 bg-[#0D2030]/80 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              Agotado
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className={cn(
              "absolute bottom-3 right-3 z-10 p-3 shadow-lg transition-all duration-300 focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/60",
              added
                ? "bg-green-600 text-white scale-110 opacity-100 translate-y-0"
                : "bg-[#0D2030] text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 hover:bg-[#8B6914] hover:scale-110"
            )}
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

        {/* Content below image */}
        <div className="pt-4 pb-2">
          <Heading
            className="text-sm font-bold text-[#0D2030] uppercase tracking-[0.15em] line-clamp-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.name}
          </Heading>
          {notes.length > 0 && (
            <p className="text-xs text-[#0D2030]/50 italic mt-1 line-clamp-1">
              {notes.map((n) => n.label.toLowerCase()).join(", ")}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[#0D2030] text-sm font-semibold">
                {formatPrice(mainVariant.price)}
              </span>
              {hasDiscount && (
                <span className="text-[#0D2030]/40 text-xs line-through">
                  {formatPrice(mainVariant.originalPrice!)}
                </span>
              )}
            </div>
            <button
              onClick={handleQuickAdd}
              className="text-[10px] font-bold uppercase tracking-wider bg-[#8B6914] hover:bg-[#B8912A] text-white px-3 py-1.5 transition-colors btn-press"
              aria-label={`Agregar ${product.name} al carrito`}
            >
              Agregar
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
