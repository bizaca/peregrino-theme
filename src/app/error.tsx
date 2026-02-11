"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
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
    <div className="min-h-screen bg-base flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-accent-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center px-4 relative z-10">
        <div className="w-20 h-20 rounded-full bg-accent-red/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={36} className="text-accent-red" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-dark mb-3">
          Algo salió mal
        </h1>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          Lo sentimos, ha ocurrido un error inesperado. Por favor intenta de nuevo.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-full transition-all"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="text-text-secondary hover:text-accent font-medium transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
