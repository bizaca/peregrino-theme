export default function SubscriptionsLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-80 mx-auto bg-white/10 animate-shimmer mb-4" />
          <div className="h-5 w-96 max-w-full mx-auto bg-white/10 animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Pricing cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border-light p-6">
              <div className="h-6 w-32 bg-base-warm rounded animate-shimmer mb-3" />
              <div className="h-10 w-40 bg-base-warm rounded animate-shimmer mb-4" />
              <div className="space-y-2 mb-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-4 w-full bg-base-warm rounded animate-shimmer" />
                ))}
              </div>
              <div className="h-12 bg-base-warm rounded-full animate-shimmer" />
            </div>
          ))}
        </div>

        {/* How it works skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto bg-base-warm rounded-full animate-shimmer mb-4" />
              <div className="h-5 w-32 mx-auto bg-base-warm rounded animate-shimmer mb-2" />
              <div className="h-4 w-48 mx-auto bg-base-warm rounded animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
