export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-base animate-pulse" role="status" aria-label="Cargando producto">
      {/* Breadcrumb skeleton */}
      <div className="bg-base-warm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="h-4 bg-base-dark rounded w-64" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image skeleton */}
          <div className="aspect-square bg-base-dark" />

          {/* Info skeleton */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 bg-base-dark rounded w-28" />
              <div className="h-6 bg-base-dark rounded-full w-16" />
            </div>
            <div className="h-10 bg-base-dark rounded w-3/4 mb-3" />
            <div className="h-5 bg-base-dark rounded w-1/2 mb-8" />
            <div className="h-10 bg-base-dark rounded w-32 mb-8" />

            {/* Size pills */}
            <div className="mb-6">
              <div className="h-4 bg-base-dark rounded w-16 mb-3" />
              <div className="flex gap-2">
                <div className="h-10 bg-base-dark rounded-full w-20" />
                <div className="h-10 bg-base-dark rounded-full w-20" />
                <div className="h-10 bg-base-dark rounded-full w-16" />
              </div>
            </div>

            {/* Grind pills */}
            <div className="mb-8">
              <div className="h-4 bg-base-dark rounded w-20 mb-3" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-9 bg-base-dark rounded-full w-24" />
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 bg-base-dark rounded-full w-28" />
              <div className="h-12 bg-base-dark rounded-full flex-1" />
            </div>

            {/* Description */}
            <div className="mb-8">
              <div className="h-5 bg-base-dark rounded w-28 mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-base-dark rounded w-full" />
                <div className="h-4 bg-base-dark rounded w-5/6" />
                <div className="h-4 bg-base-dark rounded w-3/4" />
              </div>
            </div>

            {/* Tasting notes */}
            <div className="bg-base-dark/50 h-24 mb-6" />

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-base-dark" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
