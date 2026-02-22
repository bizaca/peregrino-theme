import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import ProductsContent from "@/components/ProductsContent";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestra selección de cafés de especialidad: granos de origen, packs de degustación, cápsulas e infusiones. Envíos a todo Chile.",
  alternates: { canonical: "/products" },
  openGraph: {
    description:
      "Granos frescos de Perú, Colombia, Costa Rica y Brasil. Tostados semanalmente.",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cafés de Especialidad",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${siteConfig.url}/products/${product.slug}`,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Suspense
      fallback={
        <div className="min-h-screen bg-base" role="status" aria-label="Cargando productos">
          <div className="bg-dark-soft py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <div className="h-12 w-80 mx-auto bg-white/10 animate-shimmer mb-4" />
              <div className="h-5 w-96 max-w-full mx-auto bg-white/10 animate-shimmer" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="h-12 bg-surface border border-border-light rounded-full animate-shimmer mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-surface overflow-hidden border border-border-light">
                  <div className="aspect-square bg-base-warm animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-24 bg-base-warm rounded" />
                    <div className="h-5 w-40 bg-base-warm rounded" />
                    <div className="h-6 w-28 bg-base-warm rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
    </>
  );
}
