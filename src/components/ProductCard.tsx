"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Star, Award, Check } from "lucide-react";
import { type Product, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";

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
        className="group block bg-surface rounded-2xl overflow-hidden border border-border-light hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 card-shine"
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-base-warm">
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
            <div className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {product.badge}
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && !product.badge && (
            <div className="absolute top-3 left-3 bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full">
              -{getDiscountPercentage(mainVariant.price, mainVariant.originalPrice!)}%
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-2 right-2 p-3.5 rounded-full shadow-lg transition-all duration-300 focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark/50 ${
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

        {/* Content */}
        <div className="p-4 group-hover:bg-accent-bg/50 transition-colors duration-300">
          {/* Rating + SCA */}
          <div className="flex items-center gap-2 mb-2">
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }
                  />
                ))}
                <span className="text-text-tertiary text-xs ml-1">
                  ({product.reviewCount})
                </span>
              </div>
            )}
            {product.cupScore && (
              <div className="flex items-center gap-1 bg-sage-bg text-sage px-2 py-0.5 rounded-full ml-auto">
                <Award size={10} />
                <span className="text-xs font-semibold">{product.cupScore}</span>
              </div>
            )}
          </div>

          {/* Name */}
          <Heading className="font-heading text-lg font-semibold text-dark group-hover:text-accent transition-colors duration-300 mb-1 line-clamp-1">
            {product.name}
          </Heading>

          {/* Origin */}
          <p className="text-text-tertiary text-xs mb-3 tracking-wide">
            {product.origin} · {product.process}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-accent-dark font-semibold text-lg">
              {product.variants.length > 1 ? "Desde " : ""}
              {formatPrice(mainVariant.price)}
            </span>
            {hasDiscount && (
              <span className="text-text-tertiary text-sm line-through">
                {formatPrice(mainVariant.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
