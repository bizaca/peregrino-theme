import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-base flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-accent font-heading text-8xl font-bold mb-4">404</p>
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
