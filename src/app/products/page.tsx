"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const origins = ["Todos", ...new Set(products.map((p) => p.origin))];
const processes = ["Todos", ...new Set(products.map((p) => p.process))];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("Todos");
  const [selectedProcess, setSelectedProcess] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.origin.toLowerCase().includes(search.toLowerCase()) ||
        p.tastingNotes.toLowerCase().includes(search.toLowerCase());
      const matchesOrigin =
        selectedOrigin === "Todos" || p.origin === selectedOrigin;
      const matchesProcess =
        selectedProcess === "Todos" || p.process === selectedProcess;
      return matchesSearch && matchesOrigin && matchesProcess;
    });
  }, [search, selectedOrigin, selectedProcess]);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero banner */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Nuestra Selección
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            Cafés de especialidad tostados semanalmente con granos de los mejores
            orígenes de Latinoamérica
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, origen o notas..."
              aria-label="Buscar productos"
              className="w-full bg-surface border border-border rounded-full pl-11 pr-4 py-3 text-dark placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors text-sm"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all",
              showFilters
                ? "bg-accent text-white border-accent"
                : "bg-surface text-dark-muted border-border hover:border-accent"
            )}
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-surface border border-border-light rounded-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-dark mb-2 block">
                  Origen
                </label>
                <div className="flex flex-wrap gap-2">
                  {origins.map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setSelectedOrigin(origin)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        selectedOrigin === origin
                          ? "bg-accent text-white"
                          : "bg-base-warm text-text-secondary hover:text-dark"
                      )}
                    >
                      {origin}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-dark mb-2 block">
                  Proceso
                </label>
                <div className="flex flex-wrap gap-2">
                  {processes.map((process) => (
                    <button
                      key={process}
                      onClick={() => setSelectedProcess(process)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        selectedProcess === process
                          ? "bg-accent text-white"
                          : "bg-base-warm text-text-secondary hover:text-dark"
                      )}
                    >
                      {process}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-text-tertiary text-sm mb-6">
          {filteredProducts.length} producto
          {filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg mb-2">
              No se encontraron productos
            </p>
            <p className="text-text-tertiary text-sm">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
