import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsContent from "@/components/ProductsContent";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestra selección de cafés de especialidad: granos de origen, packs de degustación, cápsulas e infusiones. Envíos a todo Chile.",
  openGraph: {
    title: "Productos | Peregrino Coffee",
    description:
      "Granos frescos de Perú, Colombia, Bolivia, Costa Rica y Brasil. Tostados semanalmente.",
  },
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
