import Link from "next/link";
import { Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-base flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-md relative z-10">
        <div className="relative inline-block mb-6">
          <p className="text-accent/10 font-heading text-[10rem] font-bold leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <Coffee size={48} className="text-accent" />
          </div>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">
          Página no encontrada
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o fue movida.
          Explora nuestros cafés de especialidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-full transition-all duration-300"
          >
            Volver al inicio
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-surface border border-border hover:border-accent text-dark font-medium px-6 py-3 rounded-full transition-all duration-300"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
