"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Tag, ArrowUpDown } from "lucide-react";
import { products, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const origins = ["Todos", ...new Set(products.map((p) => p.origin))];
const processes = ["Todos", ...new Set(products.map((p) => p.process))];

const categoryLabels: Record<ProductCategory, string> = {
  granos: "Granos",
  packs: "Packs",
  accesorios: "Accesorios",
  infusiones: "Infusiones",
  capsulas: "Cápsulas",
};

type SortOption = "featured" | "price-asc" | "price-desc" | "name" | "rating";
const sortLabels: Record<SortOption, string> = {
  featured: "Destacados",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  name: "Nombre A-Z",
  rating: "Mejor valorados",
};

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as ProductCategory | null;
  const urlFilter = searchParams.get("filter");

  const [search, setSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("Todos");
  const [selectedProcess, setSelectedProcess] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.origin.toLowerCase().includes(search.toLowerCase()) ||
        p.tastingNotes.toLowerCase().includes(search.toLowerCase());
      const matchesOrigin =
        selectedOrigin === "Todos" || p.origin === selectedOrigin;
      const matchesProcess =
        selectedProcess === "Todos" || p.process === selectedProcess;
      const matchesCategory = !urlCategory || p.category === urlCategory;
      const matchesFilter =
        !urlFilter ||
        (urlFilter === "offers" &&
          p.variants.some((v) => v.originalPrice && v.originalPrice > v.price));
      return matchesSearch && matchesOrigin && matchesProcess && matchesCategory && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.variants[0].price - b.variants[0].price;
        case "price-desc":
          return b.variants[0].price - a.variants[0].price;
        case "name":
          return a.name.localeCompare(b.name, "es");
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [search, selectedOrigin, selectedProcess, urlCategory, urlFilter, sortBy]);

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
            {urlFilter === "offers"
              ? "Ofertas"
              : urlCategory
                ? categoryLabels[urlCategory]
                : "Nuestra Selección"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto"
          >
            {urlFilter === "offers"
              ? "Aprovecha nuestras promociones y descuentos especiales en café de especialidad"
              : urlCategory
                ? `Explora nuestra selección de ${categoryLabels[urlCategory].toLowerCase()}`
                : "Cafés de especialidad tostados semanalmente con granos de los mejores orígenes de Latinoamérica"}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Active URL filter indicator */}
        {(urlCategory || urlFilter) && (
          <div className="flex items-center gap-2 mb-6">
            <Tag size={14} className="text-accent" />
            <span className="text-sm text-text-secondary">
              Filtrando por:{" "}
              <span className="font-medium text-accent">
                {urlFilter === "offers" ? "Ofertas" : categoryLabels[urlCategory!]}
              </span>
            </span>
            <Link
              href="/products"
              className="text-sm text-text-tertiary hover:text-accent-red transition-colors ml-1"
            >
              × Limpiar
            </Link>
          </div>
        )}

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

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="appearance-none bg-surface border border-border rounded-full pl-10 pr-8 py-3 text-sm text-dark-muted font-medium cursor-pointer focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ArrowUpDown
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Mostrar filtros de producto"
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
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por origen">
                  {origins.map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setSelectedOrigin(origin)}
                      aria-pressed={selectedOrigin === origin}
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
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por proceso">
                  {processes.map((process) => (
                    <button
                      key={process}
                      onClick={() => setSelectedProcess(process)}
                      aria-pressed={selectedProcess === process}
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
