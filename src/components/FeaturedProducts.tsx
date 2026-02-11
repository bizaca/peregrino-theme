"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="py-16 md:py-24 bg-base-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm tracking-[0.3em] uppercase font-medium"
            >
              Nuestra Selección
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-5xl font-bold text-dark mt-3"
            >
              Granos Destacados
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-0.5 bg-accent mt-4"
            />
          </div>

          {/* Navigation + View all */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/products"
              className="group flex items-center gap-1 text-sm text-accent hover:text-accent-dark font-medium transition-colors"
            >
              Ver todos
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 border border-border hover:border-accent rounded-full text-dark-muted hover:text-accent transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 border border-border hover:border-accent rounded-full text-dark-muted hover:text-accent transition-all"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product carousel */}
        <div className="relative">
          {/* Scroll fade indicators */}
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-base-warm to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-base-warm to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            role="region"
            aria-label="Productos destacados"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") scroll("left");
              if (e.key === "ArrowRight") scroll("right");
            }}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded-xl"
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] md:w-[290px] snap-start"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: view all link */}
        <div className="flex md:hidden justify-center mt-8">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm text-accent font-medium border border-accent rounded-full px-6 py-2.5 hover:bg-accent hover:text-white transition-all"
          >
            Ver todos los productos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
