"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-base flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 rounded-full bg-accent-red/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-accent-red" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-dark mb-2">
          No pudimos cargar el producto
        </h1>
        <p className="text-text-secondary max-w-sm mx-auto mb-6">
          Ha ocurrido un error al cargar este producto. Intenta de nuevo o vuelve al catálogo.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-5 py-2.5 rounded-full transition-all btn-press"
          >
            <RefreshCw size={15} className="group-hover:rotate-180 transition-transform duration-500" />
            Reintentar
          </button>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
