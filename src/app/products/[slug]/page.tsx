import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, formatPrice } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  const price = formatPrice(product.variants[0].price);

  return {
    title: product.name,
    description: `${product.name} — ${product.tastingNotes}. ${product.origin}, ${product.region}. Desde ${price}.`,
    openGraph: {
      title: `${product.name} | Peregrino Coffee`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
