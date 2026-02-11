"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { type Product, formatPrice, getDiscountPercentage } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const mainVariant = product.variants[0];
  const hasDiscount = mainVariant.originalPrice && mainVariant.originalPrice > mainVariant.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-surface rounded-2xl overflow-hidden border border-border-light hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-base-warm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            className="absolute bottom-3 right-3 p-2.5 bg-dark-soft text-white rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:scale-110 shadow-lg"
            aria-label="Agregar al carrito"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
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

          {/* Name */}
          <h3 className="font-heading text-lg font-semibold text-dark group-hover:text-accent transition-colors duration-300 mb-1 line-clamp-1">
            {product.name}
          </h3>

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
