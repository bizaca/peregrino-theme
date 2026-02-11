export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando productos">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-12 w-80 mx-auto bg-white/10 rounded-lg animate-shimmer mb-4" />
          <div className="h-5 w-96 mx-auto bg-white/10 rounded-lg animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search skeleton */}
        <div className="h-12 bg-surface border border-border-light rounded-full animate-shimmer mb-8" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-2xl overflow-hidden border border-border-light">
              <div className="aspect-square bg-base-warm animate-shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-24 bg-base-warm rounded animate-shimmer" />
                <div className="h-5 w-40 bg-base-warm rounded animate-shimmer" />
                <div className="h-3 w-20 bg-base-warm rounded animate-shimmer" />
                <div className="h-6 w-28 bg-base-warm rounded animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
