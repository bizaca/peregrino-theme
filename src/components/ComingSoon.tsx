import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="text-center px-4">
        <Coffee size={48} className="text-accent mx-auto mb-6" />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-3">
          {title}
        </h1>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          {description || "Estamos preparando esta sección con el mismo cuidado que nuestro café. Vuelve pronto."}
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
