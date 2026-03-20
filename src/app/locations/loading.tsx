export default function LocationsLoading() {
  return (
    <div className="min-h-screen bg-base" role="status" aria-label="Cargando">
      {/* Hero skeleton */}
      <div className="bg-dark-soft py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-10 w-72 mx-auto bg-white/10 animate-shimmer mb-4" />
          <div className="h-5 w-80 mx-auto bg-white/10 animate-shimmer" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Location cards skeleton */}
        <div className="space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-surface border border-border-light overflow-hidden">
              <div className="h-64 md:h-auto md:col-span-2 bg-base-warm animate-shimmer" />
              <div className="md:col-span-3 p-6 md:p-8 space-y-4">
                <div className="h-7 w-56 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-72 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-48 bg-base-warm rounded animate-shimmer" />
                <div className="h-4 w-40 bg-base-warm rounded animate-shimmer" />
                <div className="flex gap-2 mt-4">
                  <div className="h-7 w-24 bg-base-warm rounded-full animate-shimmer" />
                  <div className="h-7 w-28 bg-base-warm rounded-full animate-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
